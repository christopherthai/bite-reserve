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
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import React from "react";

// Convert Unix timestamp to Date time
function convertUnixToDateTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000);
  return date;
}

function ReservationTable() {
  const [restaurants, setRestaurants] = useState([]); // state to store restaurants
  const [expandedRowId, setExpandedRowId] = useState(null);

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
      style={{ minHeight: "30vh" }}
      sx={{
        position: "absolute",
        top: "100px",
        right: { xs: "0px", sm: "-720px" },
        marginLeft: 0,
        marginRight: 110,
        width: { xs: "100%", sm: "72%" },
      }}
    >
      <Grid item xs={12} sm={10}>
        <Typography variant="h4" component="h2" gutterBottom>
          <strong>Reservations List by Restaurants</strong>
          {/* <RestaurantForm onRestaurantChange={handleRestaurant} /> */}
        </Typography>
        <TableContainer component={Paper} style={{ maxWidth: "100%" }}>
          <Table sx={{ minWidth: 800 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Drop Down</strong>
                </TableCell>
                <TableCell align="right" style={{ width: "700px" }}>
                  <strong>Restaurants</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {restaurants.map((restaurant) => (
                <React.Fragment key={restaurant.id}>
                  <TableRow>
                    <TableCell>
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        style={{ width: "50px" }}
                        onClick={() =>
                          setExpandedRowId(
                            expandedRowId !== restaurant.id
                              ? restaurant.id
                              : null
                          )
                        }
                      >
                        {expandedRowId === restaurant.id ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row" align="right">
                      {restaurant.name}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell
                      style={{ paddingBottom: 0, paddingTop: 0 }}
                      colSpan={6}
                    >
                      <Collapse
                        in={expandedRowId === restaurant.id}
                        timeout="auto"
                        unmountOnExit
                      >
                        <Box margin={1}>
                          <Typography variant="h6" gutterBottom component="div">
                            Reservations
                          </Typography>
                          <Table size="small" aria-label="reservations">
                            <TableHead>
                              <TableRow>
                                <TableCell>Date & Time</TableCell>
                                <TableCell>Table Size</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Notes</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {restaurant.reservations.map(
                                (reservation, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      {convertUnixToDateTime(
                                        reservation.reservation_time
                                      ).toLocaleString()}
                                    </TableCell>
                                    <TableCell>
                                      {reservation.table_size}
                                    </TableCell>
                                    <TableCell>{reservation.status}</TableCell>
                                    <TableCell>{reservation.notes}</TableCell>
                                  </TableRow>
                                )
                              )}
                            </TableBody>
                          </Table>
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
}

export default ReservationTable;
