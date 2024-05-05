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
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setIsLogin } = useContext(UserContext); // Use the UserContext to access the user's login status

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const initialValues = {
    username: "",
    password: "",
  };

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
          throw new Error("Invalid username or password");
        }
        return response.json();
      })
      .then(() => {
        setSubmitting(false);
        setIsLogin(true);
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setErrorMessage(error.message);
        setOpen(true);
        setSubmitting(false);
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
