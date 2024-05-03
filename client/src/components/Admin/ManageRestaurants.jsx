import { Link } from "react-router-dom";
import { useState } from "react";
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
  Paper,
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
    width: 200,
    height: "100vh",
    marginTop: "64px",
  },
}));

function ManageRestaurant() {
  const classes = useStyles();
  const drawerItems = [
    { name: "Manage Restaurants", path: "/admindashboard/manage-restaurants" },
    {
      name: "Manage Reservations",
      path: "/admindashboard/manage-reservations",
    },
  ];

  const [restaurants, setRestaurants] = useState([]);

  //   useEffect(() => {
  //     fetch("/api/restaurants") // replace with your actual API endpoint
  //       .then((response) => response.json())
  //       .then((data) => setRestaurants(data));
  //   }, []);

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
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item>
          <Paper elevation={3}>
            <List>
              {restaurants.map((restaurant, index) => (
                <ListItem button key={index}>
                  <ListItemText primary={restaurant.name} />{" "}
                  {/* replace 'name' with the actual property name */}
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default ManageRestaurant;
