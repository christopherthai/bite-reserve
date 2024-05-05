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
import UserContext from "../UserContext";
import { useContext } from "react";

const useStyles = makeStyles({
  appBar: {
    backgroundColor: "LightBlue",
  },
});

function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { isLogin, setIsLogin } = useContext(UserContext); // Use the UserContext to access the user's login status

  // Handle the logout event
  const handleLogout = () => {
    fetch("/api/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        return response.json();
      })
      .then(() => {
        setIsLogin(false);
      });
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            BiteReserve
          </Typography>
          {isMobile ? (
            <Button color="inherit">Menu</Button>
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
              {isLogin ? (
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              ) : (
                <Button color="inherit" component={NavLink} to="/login">
                  Login
                </Button>
              )}
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default NavBar;
