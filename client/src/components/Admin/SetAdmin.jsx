import { Link } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import { TextField, Button, Paper, Drawer,
    List,
    ListItem,
    ListItemText,
    makeStyles,
    Grid, } from '@material-ui/core';

    const useStyles = makeStyles((theme) => ({
        appBar: {
          backgroundColor: "#3f51b5",
        },
        drawer: {
          width: 240,
          flexShrink: 0,
        },
        drawerPaper: {
          width: 200,
          height: "100vh",
          marginTop: "64px",
          backgroundColor: "#f5f5f5",
        },
      }));

function SetAdmin() {
    const classes = useStyles();
    const drawerItems = [
        { name: "Manage Restaurants", path: "/admindashboard" },
        { name: "Manage Reservations", path: "/manage-reservations" },
        { name: "Manage Administrators", path: "/manage-administrators" }
      ];
    const [searchParams, setSearchParams] = useState({
        id: '',
        username: '',
        first_name: '',
        last_name: ''
    });
    const [users, setUsers] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const query = Object.entries(searchParams)
            .filter(([_, value]) => value)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        const response = await fetch(`/api/users?${query}`);
        const data = await response.json();
        setUsers(data);
    };

    const toggleAdminStatus = async (user) => {
        console.log(user.IsAdmin)
        const updatedStatus = !user.IsAdmin;
        console.log(updatedStatus)
        const response = await fetch(`/api/users/${user.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "IsAdmin": updatedStatus })
        });
        if (response.ok) {
            setUsers(users.map(u => u.id === user.id ? { ...u, IsAdmin: updatedStatus } : u));
        }
    };

    return (
        <>
        <Grid container direction="column">
          <Grid item>
            {/* <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <Typography variant="h6">Admin Dashboard</Typography>
            </Toolbar>
          </AppBar> */}
          </Grid>
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
        </Grid>     
            <Paper style={{ padding: '20px', margin: '20px', backgroundColor: 'white' }}>
                <form onSubmit={handleSubmit}>
                    <TextField name="id" label="User ID" value={searchParams.id} onChange={handleChange} />
                    <TextField name="username" label="Username" value={searchParams.username} onChange={handleChange} />
                    <TextField name="first_name" label="First Name" value={searchParams.first_name} onChange={handleChange} />
                    <TextField name="last_name" label="Last Name" value={searchParams.last_name} onChange={handleChange} />
                    <Button type="submit" color="primary" variant="contained" style={{ marginTop: '10px' }}>Search</Button>
                </form>
                <div style={{ marginTop: '20px' }}>
                    {users.map(user => (
                        <div key={user.id} style={{ marginTop: '10px' }}>
                            {user.username} ({user.first_name} {user.last_name}) - {user.IsAdmin ? 'Admin' : 'User'}
                            <Button onClick={() => toggleAdminStatus(user)} color="primary" variant="contained" style={{ marginLeft: '10px' }}>
                                {user.IsAdmin ? 'Revoke Admin' : 'Make Admin'}
                            </Button>
                        </div>
                    ))}
                </div>
            </Paper>
        </>
    );
}

export default SetAdmin;