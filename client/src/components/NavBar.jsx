import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";

/*
This is a NavBar component that will be displayed at the top of the page.
It will contain links to the Home, About, Reservations, Admin, and Login pages.
Using Material-UI components, it will be styled with a light blue background.
*/
const useStyles = makeStyles({
  appBar: {
    backgroundColor: "LightBlue",
  },
});

/*
This is the NavBar component that will display the navigation links.
It will be styled with the Material-UI AppBar component.
*/
function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BiteReserve
          </Typography>
          {isMobile ? (
            <Button color="inherit">Menu</Button> // This could be a MenuIcon inside a IconButton for a dropdown menu
          ) : (
            <>
              <Button color="inherit" component={NavLink} to="/" exact>
                Home
              </Button>
              <Button color="inherit" component={NavLink} to="/about">
                About
              </Button>
              <Button color="inherit" component={NavLink} to="/reservations">
                Reservations
              </Button>
              <Button color="inherit" component={NavLink} to="/admindashboard/">
                Admin
              </Button>
              <Button color="inherit" component={NavLink} to="/login">
                Login
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
