import { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  IconButton,
  Snackbar,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import React from "react";

// Alert component to display success message in snackbar after submitting restaurant data successfully
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

const RestaurantForm = ({ onRestaurantChange }) => {
  // prop types validation for onRestaurantChange function
  RestaurantForm.propTypes = {
    onRestaurantChange: PropTypes.func.isRequired,
  };

  const [open, setOpen] = useState(false); // state to control dialog
  const [isSubmitted, setIsSubmitted] = useState(false); // state to control success message
  const [openSnackbar, setOpenSnackbar] = useState(false); // state to control snackbar

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
    setIsSubmitted(false);
  };

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // close snackbar message after 6 seconds or on click of close button
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackbar(false);
  };

  // form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    phone: Yup.string()
      .required("Required")
      .matches(/^\d{10}$/, "Invalid phone number"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    website: Yup.string().required("Required").url("Invalid website URL"),
    menu_link: Yup.string().required("Required").url("Invalid menu link URL"),
    category: Yup.string().required("Required"),
    capacity: Yup.number().required("Required"),
    open_time: Yup.number().required("Required"),
    close_time: Yup.number().required("Required"),
    res_duration: Yup.number().required("Required"),
  });

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        style={{ float: "right", marginTop: "-41px" }}
        onClick={handleClickOpen}
      >
        Add New Restaurant
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          Add New Restaurant
        </DialogTitle>
        <IconButton
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{
            marginLeft: "auto",
            marginRight: "10px",
            marginTop: "-55px",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              phone: "",
              address: "",
              city: "",
              state: "",
              zip: "",
              image: "",
              website: "",
              menu_link: "",
              category: "",
              capacity: 0,
              open_time: 0,
              close_time: 0,
              res_duration: 0,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              fetch("/api/restaurants", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              })
                .then((response) => response.json())
                .then((restaurant_data) => {
                  onRestaurantChange(restaurant_data); // pass restaurant data to parent component
                  setOpenSnackbar(true);
                  setSubmitting(false);
                  resetForm();
                })
                .catch((error) => {
                  console.error("Error:", error);
                  setSubmitting(false);
                });
            }}
            validateOnChange={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <List>
                  <ListItem>
                    <Field
                      as={TextField}
                      name="name"
                      type="text"
                      label="Restaurant Name"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="name"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="phone"
                      type="text"
                      label="Phone Number"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="phone"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="address"
                      type="text"
                      label="Address"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="address"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="city"
                      type="text"
                      label="City"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="city"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="state"
                      type="text"
                      label="State"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="state"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="zip"
                      type="text"
                      label="Zip Code"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="zip"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="image"
                      type="text"
                      label="Image URL"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="image"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="website"
                      type="text"
                      label="Website URL"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="website"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="menu_link"
                      type="text"
                      label="Menu Link"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="menu_link"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="category"
                      type="text"
                      label="Type of Restaurant"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="category"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="capacity"
                      type="number"
                      label="Restaurant Capacity"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="capacity"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="open_time"
                      type="number"
                      label="Opening Time (24-hour format)"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="open_time"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="close_time"
                      type="number"
                      label="Closing Time (24-hour format)"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="close_time"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="res_duration"
                      type="number"
                      label="Reservation Duration (in minutes)"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="res_duration"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />

                  <ListItem style={{ justifyContent: "flex-end" }}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                  </ListItem>
                </List>
                <Snackbar
                  open={openSnackbar} // open snackbar message
                  autoHideDuration={6000} // close snackbar after 6 seconds
                  onClose={handleCloseSnackbar} // close snackbar on click of close button
                  anchorOrigin={{ vertical: "top", horizontal: "center" }} // position of snackbar
                  action={
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleCloseSnackbar} // close snackbar on click of close button
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <Alert onClose={handleCloseSnackbar} severity="success">
                    Restaurant submitted successfully
                  </Alert>
                </Snackbar>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RestaurantForm;
