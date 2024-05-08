import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  Typography,
} from "@mui/material";
import RestaurantForm from "../Restaurants/RestaurantForm";
import UpdateRestaurant from "./UpdateRestaurant";

function RestaurantTable() {
  const [restaurants, setRestaurants] = useState([]); // state to store restaurants

  // fetch data from server when component mounts
  useEffect(() => {
    fetch("/api/restaurants") // fetch data from server
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          return response.json();
        }
      })
      .then((data) => setRestaurants(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  //  Handle restaurant data from RestaurantForm component
  const handleRestaurant = (restaurant) => {
    setRestaurants([...restaurants, restaurant]);
  };

  // Handle delete restaurant
  const handleDeleteRestaurant = (id) => {
    fetch(`/api/restaurants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        } else {
          return response.text().then((text) => (text ? JSON.parse(text) : {})); // parse the response to JSON object if it is not empty
        }
      })
      .then(() => {
        // Remove the deleted restaurant from the state
        const updatedRestaurants = restaurants.filter(
          (restaurant) => restaurant.id !== id
        );
        setRestaurants(updatedRestaurants);
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleUpdateRestaurant = (restaurant) => {
    const updatedRestaurants = restaurants.map((r) =>
      r.id === restaurant.id ? restaurant : r
    );
    setRestaurants(updatedRestaurants);
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "30vh"}}
      sx={{
        position: "absolute",
        top: "100px",
        right: { xs: "0px", sm: "-720px" },
        marginLeft: 0,
        marginRight: 100,
        width: { xs: "100%", sm: "80%" },
        
      }}
    >
      <Grid item xs={12} sm={10}>
      <Typography
                variant="h4"
                component="h2"
                gutterBottom
                style={{
                  color: 'rgb(240, 236, 236)',
                  fontFamily: 'Boogaloo',
                  fontWeight: 'bold',
                  textShadow: '2px 4px 6px rgba(0, 0, 0, 2)' /* Adjusted alpha value */
                }}
              >
          <strong>Restaurants List</strong>
          <RestaurantForm onRestaurantChange={handleRestaurant} />
        </Typography>
        <TableContainer component={Paper} style={{ maxWidth: "100%", boxShadow: `0 4px 8px rgba(0, 0, 1, 1.4)` }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Restaurants</strong>
                </TableCell>
                <TableCell align="right" style={{ width: "700px" }}>
                  <strong>View</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>Delete</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell component="th" scope="row">
                    {restaurant.name}
                  </TableCell>
                  <TableCell align="right">
                    <UpdateRestaurant
                      restaurant={restaurant}
                      onRestaurantChange={handleUpdateRestaurant}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => handleDeleteRestaurant(restaurant.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default RestaurantTable;
