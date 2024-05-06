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
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import MuiAlert from "@mui/material/Alert";

function AdminUpdateReservationForm({ reservation, onReservationChange }) {
  const { id, reservation_time, table_size, status, notes } = reservation;

  // Validate the props passed to the component
  AdminUpdateReservationForm.propTypes = {
    reservation: PropTypes.shape({
      id: PropTypes.number.isRequired,
      reservation_time: PropTypes.string.isRequired,
      table_size: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      notes: PropTypes.string.isRequired,
    }).isRequired,
    onReservationChange: PropTypes.func.isRequired,
  };

  const [open, setOpen] = useState(false);

  return (
    <Button variant="contained" color="primary">
      View
    </Button>
  );
}

export default AdminUpdateReservationForm;
