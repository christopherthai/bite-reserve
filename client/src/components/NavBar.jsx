import { NavLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";

function NavBar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AppBar position="fixed">
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
            <Button
              color="inherit"
              component={NavLink}
              to="/admindashboard/manage-restaurants"
            >
              Admin
            </Button>
            <Button color="inherit" component={NavLink} to="/login">
              Login
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;
