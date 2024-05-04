import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For form validation

const LoginForm = () => {
  const history = useHistory(); // Initialize useHistory

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  // Initial form values
  const initialValues = {
    username: '',
    password: '',
  };

  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // You can perform login logic here, e.g., send data to backend
    console.log('Form submitted with values:', values);
    setSubmitting(false);
    
    // Redirect to home page
    history.push('/');
  };

  return (
    <div>
      <h2>Login</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Logging in...' : 'Login'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
