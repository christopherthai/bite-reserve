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
import { useState, useEffect } from "react";

/*
This is a NavBar component that will be displayed at the top of the page.
It will contain links to the Home, About, Reservations, Admin, and Login pages.
Using Material-UI components, it will be styled with a light blue background.
*/
const useStyles = makeStyles({
  appBar: {
    backgroundColor: "Light Blue",
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

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // handle login
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // handle logout
  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        setIsLoggedIn(false);
        window.location.reload();
      });
  };

  // check if the user is logged in
  useEffect(() => {
    // auto-login
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then(() => handleLogin());
      }
    });
  }, []);

  // if the user is not logged in, display the login form
  //   if (!user) {
  //     return <LoginForm onLogin={setUser} />;
  //   } else if (user.role !== "admin") {
  //     // if the user is not an admin, display an error message
  //     return <div>You are not authorized to view this page.</div>;
  //   }

  return (
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
            {isLoggedIn ? (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            ) : (
              <Button
                color="inherit"
                onClick={handleLogin}
                component={NavLink}
                to="/login"
              >
                Login
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
