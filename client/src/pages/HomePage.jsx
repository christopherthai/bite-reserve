import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';




function HomePage() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/api/restaurants')
      .then((res) => res.json())
      .then((data) => {
        // Calculate average rating for each restaurant
        const restaurantsWithRating = data.map((restaurant) => ({
          ...restaurant,
          averageRating: calculateAverageRating(restaurant.reviews),
        }));
        setRestaurants(restaurantsWithRating);
      })
      .catch((error) => console.error('Error fetching restaurants:', error));
  }, []);

  // Function to calculate average rating
  const calculateAverageRating = (reviews) => {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    return reviews.length > 0 ? totalRating / reviews.length : 0;
  };

  // Function to render star rating based on average rating
  const renderStarRating = (averageRating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < averageRating) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="orange" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} color="gray" />);
      }
    }
    return stars;
  };

  return (
    <div className="page-container">
      <div className="home-header">
        <h1>Our Restaurants</h1>
      </div>
      <section>
        <div className="card-container">
          {restaurants.map((restaurant) => (
            <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="card">
                <img src={restaurant.image} alt={restaurant.name} />
                <div className="card-content">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <div className="category-container">
                    <span className="category">{restaurant.category}</span>
                    {renderStarRating(restaurant.averageRating)}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
     
    export default HomePage;






// import { Link } from 'react-router-dom';
// import './HomePage.css'; // CSS 파일 import
// import RestaurantList from '../components/Restaurants/RestaurantList.jsx';

// function HomePage() {
//   const restaurants = RestaurantList(); // RestaurantList를 함수로부터 데이터 받아오기
// }


{/* <>
      <p className="home-header">Find your table for any occasion</p>
      <div className="page-container">
        <div className="card-container">
          {restaurants.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </>
   */}