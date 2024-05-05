import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { Link, useNavigate } from 'react-router-dom';
import './RegistrationForm.css'; // Import the CSS file


const RegistrationForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

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
    console.log("Form submitted with values:", values);
    setSubmitting(false);
    navigate("/"); // Redirect to home page after successful registration
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
                <ErrorMessage name="first_name" component="div" className="error" />
              </div>

              <div className="registration-form-field">
                <label htmlFor="last_name">Last Name</label>
                <Field type="text" id="last_name" name="last_name" />
                <ErrorMessage name="last_name" component="div" className="error" />
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
                <ErrorMessage name="confirmPassword" component="div" className="error" />
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
                <label>
                  <Field type="checkbox" name="isAdmin" />
                  Register as Admin
                </label>
              </div>

              <button type="submit" disabled={isSubmitting} className="registration-form-button">
                {isSubmitting ? "Registering..." : "Register"}
              </button>
            </Form>
          )}
        </Formik>
        <p className="registration-form-link">
          Already have an account? <Link to="/login">Login Here</Link>
        </p>
      </div>

<<<<<<< HEAD
=======
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
>>>>>>> development
  );
};

export default RegistrationForm;