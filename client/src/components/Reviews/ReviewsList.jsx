import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import "./ReviewsList.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function ReviewsList() {
  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
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

  const validationSchema = Yup.object().shape({
    rating: Yup.number()
      .required("Rating is required")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating cannot exceed 5"),
    comment: Yup.string().required("Comment is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // Get current timestamp
    const timestamp = Date.now();

    // Assuming you have the user ID from the session
    const userId = user.id;
    const ratingInteger = parseInt(values.rating, 10);
    const restaurantIdInteger = parseInt(id, 10);

    // Create review object
    const newReview = {
      timestamp,
      rating: ratingInteger,
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

  return (
    <div className="reviewslist-container">
      <div className="centered-heading">
        <h2>Add a Review </h2>
      </div>
      <div className="review-form-card">
        <Formik
          initialValues={{ rating: 0, comment: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div>
              <label>
                Rating:
                <Field type="number" name="rating" min="1" max="5" />
                <ErrorMessage
                  name="rating"
                  component="div"
                  className="error-message"
                />
              </label>
            </div>
            <div>
              <label>
                Comment:
                <Field as="textarea" name="comment" />
                <ErrorMessage
                  name="comment"
                  component="div"
                  className="error-message"
                />
              </label>
            </div>
            <button type="submit">Submit Review</button>
          </Form>
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
