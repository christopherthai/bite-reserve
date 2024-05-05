import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetch('/api/restaurants')
      .then(res => res.json())
      .then(data => setRestaurants(data))
  }, []);

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {restaurants.map(restaurant => (
        <Link to={`/restaurant/${restaurant.id}`} key={restaurant.id} style={{ textDecoration: 'none', color: 'inherit' }}>
          <div style={{
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '300px',
              borderRadius: '10px',
              overflow: 'hidden',
              cursor: 'pointer'
          }}>
            <img src={restaurant.image} alt={restaurant.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '10px' }}>
              <h3>{restaurant.name}</h3>
              <h4>{restaurant.category}</h4>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default RestaurantList;