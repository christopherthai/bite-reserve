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
} from "@mui/material";
import PropTypes from "prop-types";

function UpdateRestaurant({ restaurant, onRestaurantChange }) {
  const {
    id,
    name,
    phone,
    address,
    city,
    state,
    zip,
    image,
    website,
    menu_link,
    category,
    capacity,
    open_time,
    close_time,
    res_duration,
  } = restaurant;

  // Validate the props passed to the component
  UpdateRestaurant.propTypes = {
    restaurant: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      zip: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      website: PropTypes.string.isRequired,
      menu_link: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      capacity: PropTypes.number.isRequired,
      open_time: PropTypes.number.isRequired,
      close_time: PropTypes.number.isRequired,
      res_duration: PropTypes.number.isRequired,
    }).isRequired,
    onRestaurantChange: PropTypes.func.isRequired,
  };

  const [open, setOpen] = useState(false); // state to control dialog
  const [isSubmitted, setIsSubmitted] = useState(false); // state to control success message

  // open dialog
  const handleClickOpen = () => {
    setOpen(true);
    setIsSubmitted(false);
  };

  // close dialog
  const handleClose = () => {
    setOpen(false);
  };

  // form validation schema
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    address: Yup.string().required("Required"),
    city: Yup.string().required("Required"),
    state: Yup.string().required("Required"),
    zip: Yup.string().required("Required"),
    image: Yup.string().required("Required"),
    website: Yup.string().required("Required"),
    menu_link: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    capacity: Yup.number().required("Required"),
    open_time: Yup.number().required("Required"),
    close_time: Yup.number().required("Required"),
    res_duration: Yup.number().required("Required"),
  });

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        View
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth="md"
        fullWidth={true}
      >
        <DialogTitle style={{ textAlign: "center" }}>
          <strong>{name}</strong>
        </DialogTitle>

        <DialogContent>
          <img
            src={image}
            alt={name}
            style={{ width: "100%", marginBottom: "20px" }}
          />
          <Formik
            initialValues={{
              id: id,
              name: name,
              phone: phone,
              address: address,
              city: city,
              state: state,
              zip: zip,
              image: image,
              website: website,
              menu_link: menu_link,
              category: category,
              capacity: capacity,
              open_time: open_time,
              close_time: close_time,
              res_duration: res_duration,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              fetch(`/api/restaurants/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              })
                .then((response) => response.json())
                .then((restaurant_data) => {
                  onRestaurantChange(restaurant_data); // pass restaurant data to parent component
                  setSubmitting(false);
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
                      label="Opening Time (in 24-hour format)"
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
                      label="Closing Time (in 24-hour format)"
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
                      Update
                    </Button>
                  </ListItem>
                </List>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateRestaurant;
