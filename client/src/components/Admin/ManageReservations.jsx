import { Link } from "react-router-dom";
import {
  //   AppBar,
  //   Toolbar,
  //   Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Grid,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import ReservationTable from "../Admin/ReservationTable";
import LoginForm from "../LoginForm";

/*
useStyles is a function that will be used to style the components.
It uses the makeStyles hook from Material-UI to define the styles.
*/
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
}));

/*
This is the ManageReservations component that will display the Manage Reservation page.
It will contain a Drawer component with links to the Manage Restaurants and Manage Reservations pages.
It will also contain a RestaurantTable component that will display the list of restaurants.
*/
function ManageReservations() {
  const classes = useStyles();
  const drawerItems = [
    { name: "Manage Restaurants", path: "/admindashboard" },
    { name: "Manage Reservations", path: "/manage-reservations" },
    { name: "Manage Administrators", path: "/manage-administrators" },
  ];

  // user state to store the logged in user
  const [user, setUser] = useState(null);

  // check if the user is logged in
  useEffect(() => {
    // auto-login
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // if the user is not logged in, display the login form
  if (!user) {
    return <LoginForm />;
  } else if (user.IsAdmin !== true) {
    // if the user is not an admin, display an error message
    return (
      <div>
        <strong>You are not authorized to view this page.</strong>
      </div>
    );
  }

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
      <ReservationTable />
    </>
  );
}

export default ManageReservations;
