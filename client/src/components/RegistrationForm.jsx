import React from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // For form validation

const RegistrationForm = () => {
  const history = useHistory(); // Initialize useHistory

  // Define validation schema using Yup
  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required('First Name is required'),
    last_name: Yup.string().required('Last Name is required'),
    username: Yup.string().required('Username is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    phone: Yup.string().required('Phone number is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    isAdmin: Yup.boolean(),
  });

  // Initial form values
  const initialValues = {
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirmPassword: '',
    phone: '',
    email: '',
    isAdmin: false,
  };

  // Function to handle form submission
  const handleSubmit = (values, { setSubmitting }) => {
    // You can perform registration logic here, e.g., send data to backend
    console.log('Form submitted with values:', values);
    setSubmitting(false);
    
    // Redirect to home page
    history.push('/');
  };

  return (
    <div>
      <h2>Registration</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="first_name">First Name</label>
              <Field type="text" id="first_name" name="first_name" />
              <ErrorMessage name="first_name" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="last_name">Last Name</label>
              <Field type="text" id="last_name" name="last_name" />
              <ErrorMessage name="last_name" component="div" className="error" />
            </div>

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

            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field type="password" id="confirmPassword" name="confirmPassword" />
              <ErrorMessage name="confirmPassword" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="phone">Phone</label>
              <Field type="text" id="phone" name="phone" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>

            <div>
              <label htmlFor="email">Email</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label>
                <Field type="checkbox" name="isAdmin" />
                Register as Admin
              </label>
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Registering...' : 'Register'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;