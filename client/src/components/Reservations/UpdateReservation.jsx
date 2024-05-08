import { useState } from "react";
import React from "react";
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
  MenuItem,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";
import { DatePicker } from "@mui/lab";

// Function to convert Unix timestamp to local datetime string
const convertUnixToLocalDateTime = (unixTime) => {
  return new Date(unixTime * 1000).toLocaleString();
};

// Function to convert local datetime string to Unix timestamp
const convertLocalDateTimeToUnix = (localDateTime) => {
  return Math.floor(new Date(localDateTime).getTime() / 1000);
};

// Alert component to display success message in snackbar after updating restaurant data
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} variant="filled" ref={ref} {...props} />;
});

function UpdateReservationForm({ reservation, onReservationChange }) {
  const { id, reservation_time, table_size, status, notes } = reservation;

  // Validate the props passed to the component
  UpdateReservationForm.propTypes = {
    reservation: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reservation_time: PropTypes.string.isRequired,
      table_size: PropTypes.number.isRequired,
    }).isRequired,
    onReservationChange: PropTypes.func.isRequired,
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

  // convert Unix timestamp to local datetime string
  const reservation_time_string = convertUnixToLocalDateTime(reservation_time);

  // form validation schema
  const validationSchema = Yup.object().shape({
    table_size: Yup.number().required("Required"),
    status: Yup.string().required("Required"),
    notes: Yup.string().required("Required"),
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
        <IconButton
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          style={{
            marginLeft: "auto",
            marginRight: "10px",
            marginTop: "-20px",
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Formik
            initialValues={{
              id: id,
              reservation_time: reservation_time,
              table_size: table_size,
              status: status,
              notes: notes,
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              fetch(`/api/reservation/${id}`, {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  ...values,
                  reservation_time: convertLocalDateTimeToUnix(
                    values.reservation_time
                  ),
                }),
              })
                .then((response) => response.json())
                .then((reservation_data) => {
                  onReservationChange(reservation_data); // pass reservation data to parent component
                  setOpenSnackbar(true);
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
                    {/* Display status as plain text */}
                    <span style={{ width: "100%" }}>Reservation Status: {reservation.status}</span>
                  </ListItem>
                  <ErrorMessage
                    name="status"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                    />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="reservation_time"
                      type="text"
                      label="Reservation Time"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="reservation_time"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  <ListItem>
                    <Field
                      as={TextField}
                      name="table_size"
                      type="number"
                      label="Table Size"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="table_size"
                    component="div"
                    style={{ marginLeft: "30px", color: "red" }}
                  />
                  
                  <ListItem>
                    <Field
                      as={TextField}
                      name="notes"
                      type="text"
                      label="Notes"
                      style={{ width: "100%" }}
                    />
                  </ListItem>
                  <ErrorMessage
                    name="notes"
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
                <Snackbar
                  open={openSnackbar} // open snackbar message
                  autoHideDuration={6000} // close snackbar message after 6 seconds
                  onClose={handleCloseSnackbar} // close snackbar message
                  anchorOrigin={{ vertical: "top", horizontal: "center" }} // position of snackbar
                  action={
                    <IconButton
                      size="small"
                      aria-label="close"
                      color="inherit"
                      onClick={handleCloseSnackbar} // close snackbar message on click of close button
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <Alert onClose={handleCloseSnackbar} severity="success">
                    Restaurant updated successfully
                  </Alert>
                </Snackbar>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default UpdateReservationForm;