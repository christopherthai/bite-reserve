import { useNavigate } from "react-router-dom";
import { Formik, Field, ErrorMessage, Form } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { Button, LinearProgress, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import { Link } from "react-router-dom";
import { useState } from "react";

const LoginForm = () => {
  const navigate = useNavigate();

  // Set up form validation using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  // Set up initial values
  const initialValues = {
    username: "",
    password: "",
  };

  // Handle form submission
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
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Success:", data);
        setSubmitting(false);
        navigate("/reservations");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "40px" }}>Login</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                <li style={{ marginBottom: "10px" }}>
                  <Field
                    component={TextField}
                    name="username"
                    type="text"
                    label="Username"
                    style={{ width: "300px" }}
                  />
                </li>
                <li style={{ marginBottom: "10px" }}>
                  <Field
                    component={TextField}
                    type="password"
                    label="Password"
                    name="password"
                    style={{ width: "300px" }}
                  />
                </li>
                {isSubmitting && <LinearProgress />}
                <li>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </li>
              </ul>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
