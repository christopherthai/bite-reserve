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
          <div className="home-header">
            <h1>Our Restaurants</h1>
          </div>
          <section>
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
