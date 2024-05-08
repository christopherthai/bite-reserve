import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Paper,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#3f51b5",
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: 220,
    height: "100vh",
    marginTop: "64px",
    backgroundColor: "#f5f5f5",
  },
  scrollableGrid: {
    maxHeight: "1100px",
    overflowY: "auto",
  },
}));

function SetAdmin() {
  const classes = useStyles();
  const drawerItems = [
    { name: "Manage Restaurants", path: "/admindashboard" },
    { name: "Manage Reservations", path: "/manage-reservations" },
    { name: "Manage Administrators", path: "/manage-administrators" },
  ];
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  // Fetch users from the server
  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      }),
      [];
  });

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter users based on search input
  const filteredUsers = users.filter((user) => {
    return user.username.toLowerCase().includes(search.toLowerCase());
  });

  // Toggle admin status of a user (make admin or revoke admin)
  const toggleAdminStatus = async (user) => {
    console.log(user.IsAdmin);
    const updatedStatus = !user.IsAdmin;
    console.log(updatedStatus);
    const response = await fetch(`/api/users/${user.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ IsAdmin: updatedStatus }),
    });
    if (response.ok) {
      setUsers(
        users.map((u) =>
          u.id === user.id ? { ...u, IsAdmin: updatedStatus } : u
        )
      );
    }
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item>{/* ... existing code ... */}</Grid>
        <Grid item>
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            <List>
              {drawerItems.map((item, index) => (
                <ListItem button key={index} component={Link} to={item.path}>
                  <ListItemText primary={item.name} />
                </ListItem>
              ))}
            </List>
          </Drawer>
        </Grid>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            marginRight: "-200px",
            marginTop: "350px",
          }}
        >
          <Grid item style={{ marginTop: "-300px" }}>
            <Grid item>
              <TextField
                id="search"
                label="Search by Username"
                type="search"
                value={search}
                onChange={handleSearchChange}
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: "1110px",
                  margin: "0px",
                }}
              />
            </Grid>
            <Grid
              container
              direction="column"
              className={classes.scrollableGrid}
            >
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Username</TableCell>
                      <TableCell>First Name</TableCell>
                      <TableCell>Last Name</TableCell>
                      <TableCell>Phone Number</TableCell>
                      <TableCell>Email Address</TableCell>
                      <TableCell>Role</TableCell>
                      <TableCell>Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.username}</TableCell>
                        <TableCell>{user.first_name}</TableCell>
                        <TableCell>{user.last_name}</TableCell>
                        <TableCell>{user.phone}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.IsAdmin ? "Admin" : "User"}</TableCell>
                        <TableCell>
                          <Button
                            size="small"
                            variant="contained"
                            color={user.IsAdmin ? "secondary" : "primary"}
                            onClick={() => toggleAdminStatus(user)}
                          >
                            {user.IsAdmin ? "Revoke Admin" : "Make Admin"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </Grid>
    </>
  );
}

export default SetAdmin;
