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
import RestaurantTable from "./RestaurantTable";

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
    width: 200,
    height: "100vh",
    marginTop: "64px",
    backgroundColor: "#f5f5f5",
  },
}));

/*
This is the ManageRestaurant component that will display the Manage Restaurants page.
It will contain a Drawer component with links to the Manage Restaurants and Manage Reservations pages.
It will also contain a RestaurantTable component that will display the list of restaurants.
*/
function ManageRestaurant() {
  const classes = useStyles();
  const drawerItems = [
    { name: "Manage Restaurants", path: "/admindashboard/manage-restaurants" },
    {
      name: "Manage Reservations",
      path: "/admindashboard/manage-reservations",
    },
  ];

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
      <RestaurantTable />
    </>
  );
}

export default ManageRestaurant;
