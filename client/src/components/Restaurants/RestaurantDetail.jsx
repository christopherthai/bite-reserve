import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ReviewsList from '../Reviews/ReviewsList';
import "./RestaurantDetail.css";

const RestaurantDetail = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [user, setUser] = useState(null);
  const [mapExpanded, setMapExpanded] = useState(true); // Change initial state to true
  const [showReviews, setShowReviews] = useState(false); // State to manage visibility of ReviewsList
  const navigate = useNavigate();
  const [averageRating, setAverageRating] = useState(0);

  useEffect(() => {
    fetch(`/api/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);
        calculateAverageRating(data.reviews); // Calculate average rating when restaurant data is fetched
      })
      .catch((error) => console.error("Error loading the restaurant", error));

    // Check user session
    fetch("/api/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, [id]);

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = reviews.length > 0 ? totalRating / reviews.length : 0;
    setAverageRating(average);
  };

  const handleReservationClick = () => {
    // Check user login status
    if (!user) {
      if (
        window.confirm(
          "You are not logged in. Would you like to go to the login page?"
        )
      ) {
        navigate("/login");
      } else {
        navigate("/");
      }
    } else {
      if (user.IsAdmin) {
        if (window.confirm("Admin users cannot make a reservation.")) {
          navigate("/");
        }
      } else {
        navigate(`/reservationsform/${restaurant.id}`);
      }
    }
  };

  if (!restaurant) return <div>Loading...</div>;

    // Function to render star rating based on average rating
    const renderStarRating = () => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < averageRating) {
                stars.push(<FontAwesomeIcon key={i} icon={solidStar} color="blue" />);
            } else {
                stars.push(<FontAwesomeIcon key={i} icon={regularStar} color="blue" />);
            }
        }
        return stars;
    };

    return (
        <div className="restaurant-detail-container">
            <div className="restaurant-page-container" style={{ height: 'calc(100vh - 100px)', overflowY: 'auto', position: 'center'}}>
                <div style={{ padding: '20px', textAlign: 'center' }}>
                    <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '300px', objectFit: 'cover', boxShadow: '0 4px 8px rgba(0, 0, 1, 1.4)' }} />
                    <h1 style={{ marginBottom: '10px' }}>{restaurant.name}</h1>
                    <div>
                        {renderStarRating()} {/* Render dynamic star rating */}
                    </div>
                    <h3>{restaurant.category}</h3>
                    <h3>
                        <a
                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${restaurant.address}, ${restaurant.city}, ${restaurant.zip}`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {restaurant.address}, {restaurant.city}, {restaurant.state} {restaurant.zip}
                        </a>
                    </h3>
                    <h3>Phone: {restaurant.phone}</h3>
                    
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <button onClick={handleReservationClick} style={{ margin: '0 5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>Make a Reservation</button>
                    <a href={restaurant.menu_link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <button style={{ margin: '0 5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>View Menu</button>
                    </a>
                    <a href={restaurant.website} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                        <button style={{ margin: '0 5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>View Website</button>
                    </a>
                    <button onClick={() => setShowReviews(!showReviews)} style={{ margin: '0 5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>{showReviews ? 'Close Reviews' : 'Reviews'}</button>
                </div>
            </div>
        </div>
        <div className="reviews-list-container" style={{ maxHeight: showReviews ? 'calc(100vh - 200px)' : 0, overflowY: 'auto', padding: showReviews ? '20px' : '0' }}>
            {showReviews && <ReviewsList restaurantId={id} />}
        </div>
    </div>
  );
};

export default RestaurantDetail;
