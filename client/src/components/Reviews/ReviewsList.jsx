import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./ReviewsList.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ReviewsList({ calculateAverageRating }) {
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`/api/restaurants/${id}/reviews`)
      .then((res) => res.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [id]);

  // user state to store the logged in user
  const [user, setUser] = useState(null);

  // check if the user is logged in
  useEffect(() => {
    // auto-login
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  // State to manage selected rating
  const [selectedRating, setSelectedRating] = useState(0);

  const validationSchema = Yup.object().shape({
    comment: Yup.string().required("Comment is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // Get current timestamp
    const timestamp = Date.now();

    // Assuming you have the user ID from the session
    const userId = user.id;
    const restaurantIdInteger = parseInt(id, 10);

    // Create review object
    const newReview = {
      timestamp,
      rating: selectedRating,
      comment: values.comment,
      user_id: userId,
      restaurant_id: restaurantIdInteger,
    };

    // Make POST request to add review
    const response = await fetch(`/api/restaurants/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    });

    if (response.ok) {
      // Clear form fields after successful submission
      resetForm();
      setSelectedRating(0); // Reset selectedRating to 0

      await fetchReviews();
      // Update reviews after adding new review
    } else {
      console.error("Failed to add review");
    }
  };

  const fetchReviews = async () => {
    try {
      // Fetch all reviews from the server
      const response = await fetch(`/api/restaurants/${id}/reviews`);
      if (response.ok) {
        const reviewsData = await response.json();
        setReviews(reviewsData);
        calculateAverageRating(reviewsData);
      } else {
        console.error("Failed to fetch reviews");
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <FontAwesomeIcon key={i} icon={solidStar} style={{ color: "blue" }} />
        );
      } else {
        stars.push(
          <FontAwesomeIcon
            key={i}
            icon={regularStar}
            style={{ color: "blue" }}
          />
        );
      }
    }
    return stars;
  };

  const handleStarClick = (rating) => {
    setSelectedRating(rating);
  };

  return (
    <div className="reviewslist-container">
      <div className="centered-heading">
        <h2>Add a Review </h2>
      </div>
      <div className="review-form-card">
        <Formik
          initialValues={{ rating: "", comment: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="review-form">
              <div className="star-rating">
                {[...Array(5)].map((_, index) => {
                  const ratingValue = index + 1;
                  return (
                    <FontAwesomeIcon
                      key={index}
                      icon={
                        ratingValue <= selectedRating ? solidStar : regularStar
                      }
                      onClick={() => handleStarClick(ratingValue)}
                      size="lg" // Increase the size of the stars
                      className="star-icon"
                    />
                  );
                })}
                <span className="select-rating">(Select Rating)</span>
              </div>
              <div className="comment-box">
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="error-message"
                />
                <Field
                  as="textarea"
                  name="comment"
                  placeholder="Write your review here..."
                  value={values.comment}
                  onChange={handleChange}
                  className="comment-input"
                />
              </div>
              <button type="submit">Submit Review</button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="centered-heading">
        <h2>Guest Reviews</h2>
      </div>
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div key={review.id} className="review-card">
            <p>Rating: {renderStarRating(review.rating)}</p>
            <p>Comment: {review.comment}</p>
            <p>Created: {new Date(review.timestamp).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p>No reviews available.</p>
      )}
    </div>
  );
}

export default ReviewsList;
