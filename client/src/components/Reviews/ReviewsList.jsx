import React, { useState, useEffect } from 'react';

function ReviewsList({ restaurantId }) {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/restaurants/${restaurantId}/reviews`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
            })
            .catch(err => console.error('Error fetching data: ', err));
    }, [restaurantId]);

    return (
        <div>
            <h1>Reviews for Restaurant ID: {restaurantId}</h1>
            {reviews.length > 0 ? (
                reviews.map(review => (
                    <div key={review.id}>
                        <p>{review.review}</p>
                        <p>Rating: {review.rating}</p>
                    </div>
                ))
            ) : (
                <p>No reviews available.</p>
            )}
            <AverageRating reviews={reviews} />
        </div>
    );
}

export default ReviewsList;