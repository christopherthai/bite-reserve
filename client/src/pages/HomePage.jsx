<<<<<<< HEAD
import React from 'react';
import RestaurantList from '../components/Restaurants/RestaurantList'; // 경로는 실제 프로젝트 구조에 맞게 조정해야 합니다.

function HomePage() {
  return (
    <div>
      <section>
        <h2>Restaurants</h2>
        <RestaurantList />
      </section>
    </div>
  );
=======
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file


function HomePage() {
  const [restaurants, setRestaurants] = useState([]);

      useEffect(() => {
          fetch('/api/restaurants')
          .then((res) => res.json())
          .then((data) => setRestaurants(data))
      }, []);


      return (
        <div className="page-container">
          <section>
            <h2 className="home-header">Restaurants</h2>
            <div className="card-container">
              {restaurants.map(restaurant => (
                <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card">
                    <img src={restaurant.image} alt={restaurant.name} />
                    <div className="card-content">
                      <h3>{restaurant.name}</h3>
                      <h4>{restaurant.category}</h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>
      );
>>>>>>> development
}

export default HomePage;