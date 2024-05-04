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

/*
useStyles is a function that will be used to style the components.
It uses the makeStyles hook from Material-UI to define the styles.
*/
const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "#f5f5f5",
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

function ManageReservations() {
  const classes = useStyles();
  const drawerItems = [
    { name: "Manage Restaurants", path: "/admindashboard/manage-restaurants" },
    {
      name: "Manage Reservations",
      path: "/admindashboard/manage-reservations",
    },
  ];

  return (
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
  );
}

export default ManageReservations;
