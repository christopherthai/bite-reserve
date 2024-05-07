import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./LoginForm.css"; // Import the CSS file
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { useContext, useState } from "react";
import UserContext from "../UserContext";

const LoginForm = () => {
  const navigate = useNavigate(); // Use the navigate function to navigate to different pages

  const [open, setOpen] = useState(false); // State to store the open status of the Snackbar
  const [errorMessage, setErrorMessage] = useState(""); // State to store the error message
  const { setIsLogin } = useContext(UserContext); // Use the UserContext to access the user's login status
  const { setIsAdmin } = useContext(UserContext); // Use the UserContext to access the user's admin status

  // Function to handle the close event of the Snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Initial values for the form
  const initialValues = {
    username: "",
    password: "",
  };

  // Function to handle the form submission
  const handleSubmit = (values, { setSubmitting }) => {
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid username or password"); // Throw an error if the response is not ok
        }
        return response.json(); // Return the response as JSON
      })
      .then((user_data) => {
        setSubmitting(false); // Set the submitting state to false
        setIsLogin(true); // Set the login status to true
        if (user_data.IsAdmin === true) {
          setIsAdmin(true); // Set the admin status to true
        }
        navigate("/"); // Navigate to the home page
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage(error.message); // Set the error message
        setOpen(true); // Open the Snackbar
        setSubmitting(false); // Set the submitting state to false
      });
  };

  return (
    <div className="login-form-container">
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity="error">
          {errorMessage}
        </MuiAlert>
      </Snackbar>
      <h2 className="login-form-title">Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="login-form-field">
              <label htmlFor="username" className="login-form-label">
                Username
              </label>
              <Field
                type="text"
                id="username"
                name="username"
                className="login-form-input"
              />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="login-form-field">
              <label htmlFor="password" className="login-form-label">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className="login-form-input"
              />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="login-form-button"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="login-form-link">
        Not registered? <Link to="/register">Register Here</Link>
      </p>
    </div>
  );
};

export default LoginForm;
