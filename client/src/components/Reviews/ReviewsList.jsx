import React, { useState, useEffect } from 'react';

function ReviewsList({ restaurantId }) {
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const API_URL = `http://127.0.0.1:5555/restaurants/${restaurantId}/reviews`;

    useEffect(() => {
        setIsLoading(true);
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setReviews(data);
                setError(null); // Clear any previous errors.
            })
            .catch(err => {
                console.error('Error fetching data: ', err);
                setError('Failed to fetch data');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [restaurantId, API_URL]); // Adding API_URL here for completeness.

    return (
        <div>
            <h1>Reviews for Restaurant ID: {restaurantId}</h1>
            {isLoading ? (
                <p>Loading reviews...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id}>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
        </div>
    );
}

export default ReviewsList;