import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import "./RegistrationForm.css"; // Import the CSS file
import UserContext from "../UserContext";

const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { setIsLogin } = useContext(UserContext); // Use the UserContext to access the user's login status
  const { setIsAdmin } = useContext(UserContext); // Use the UserContext to access the user's admin status

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    username: Yup.string().required("Username is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    phone: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    isAdmin: Yup.boolean(),
  });

  const initialValues = {
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    confirmPassword: "",
    phone: "",
    email: "",
    isAdmin: false,
  };

  const handleSubmit = (values, { setSubmitting }) => {
    const url = "api/signup";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...values,
        isAdmin: values.isAdmin ? 1 : 0,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((data) => {
        console.log("Registration was successful", data);
        setSubmitting(false);
        setIsLogin(true); // Set the login status to true
        if (values.isAdmin) {
          setIsAdmin(true); // Set the admin status to true
        }
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  };

  return (
    <div className="registration-form-container">
      <h2 className="registration-form-title">New Guest Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="registration-form">
            <div className="registration-form-field">
              <label htmlFor="first_name">First Name</label>
              <Field type="text" id="first_name" name="first_name" />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error"
              />
            </div>

            <div className="registration-form-field">
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" id="last_name" name="last_name" />
              <ErrorMessage
                name="last_name"
                component="div"
                className="error"
              />
            </div>

            <div className="registration-form-field">
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="registration-form-field">
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <div className="registration-form-field">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />
            </div>

            <div className="registration-form-field">
              <label htmlFor="phone">Phone</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div className="registration-form-field">
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="registration-form-field">
              {/* <label>
                <Field type="checkbox" name="isAdmin" />
                Register as Admin
              </label> */}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="registration-form-button"
            >
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
      <p className="registration-form-link">
        Already have an account? <Link to="/login">Login Here</Link>
      </p>
    </div>
  );
};

export default RegistrationForm;
