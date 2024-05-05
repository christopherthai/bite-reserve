import React, { useState, useEffect } from "react";
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

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "30vh" }}
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
        <Typography variant="h4" component="h2" gutterBottom>
          <strong>Restaurant Lists</strong>
          <RestaurantForm onRestaurantChange={handleRestaurant} />
        </Typography>
        <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
          <Table sx={{ minWidth: 1090 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Restaurants</strong>
                </TableCell>
                <TableCell align="right">
                  <strong>View</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <TableRow key={restaurant.name}>
                  <TableCell component="th" scope="row">
                    {restaurant.name}
                  </TableCell>
                  <TableCell align="right">
                    <Button variant="contained" color="primary">
                      View
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
