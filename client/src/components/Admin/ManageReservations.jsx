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
    marginTop: "64px", // Add this line
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
