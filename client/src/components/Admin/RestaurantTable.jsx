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

function RestaurantTable() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch("/api/restaurants") // replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) {
          console.error("Failed to fetch data from server"); // if response status is not 200-299
        } else {
          return response.json();
        }
      })
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "30vh" }}
      sx={{
        position: "absolute",
        top: "100px",
        right: "-720px",
        marginLeft: 0,
        marginRight: 100,
        width: "80%",
      }}
    >
      <Grid item>
        <Typography variant="h4" component="h2" gutterBottom>
          <strong>Restaurant Lists</strong>
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right" }}
          >
            Add New Restaurant
          </Button>
        </Typography>
        <TableContainer component={Paper}>
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
                  {/* Add more table cells for other properties */}
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
