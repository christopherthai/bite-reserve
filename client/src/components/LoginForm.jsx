import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

import * as Yup from "yup";
import { Link } from "react-router-dom";
import "./LoginForm.css"; // Import the CSS file

const LoginForm = () => {
  const navigate = useNavigate();

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
    <div className="login-form-container">
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
