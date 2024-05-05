import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
<<<<<<< HEAD
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import './LoginForm.css'; // Import the CSS file
=======
import * as Yup from "yup"; // For form validation
import { Link } from "react-router-dom";
>>>>>>> development

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
    console.log("Form submitted with values:", values);
    setSubmitting(false);
    navigate("/");
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
              <label htmlFor="username" className="login-form-label">Username</label>
              <Field type="text" id="username" name="username" className="login-form-input" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div className="login-form-field">
              <label htmlFor="password" className="login-form-label">Password</label>
              <Field type="password" id="password" name="password" className="login-form-input" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting} className="login-form-button">
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
