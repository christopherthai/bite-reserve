import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './HomePage.css'; // CSS 파일 import
import RestaurantList from '../components/Restaurants/RestaurantList.jsx';






function HomePage() {

  //create state for the restaurant
  const [restaurant, setRestaurant] = useState([])

  //use useEffect to fetch restaurant and update state
  useEffect(() => {
    fetch('/restaurant-list')
    .then (res => {
      if(res.ok){
        return res.json()
      } else {
        console.log('restaurant-list not found')
      }
    })
    .then(data => setRestaurant(data))
  }, [])
  return

  // <>
  //   <p className="home-header">Find your table for any occasion</p>
  //   <div className="page-container">
  //     <div className={"card-container blue-card"}>
  //       <Card title="Card 1" content="Content for Card 1" />
  //       <Card title="Card 2" content="Content for Card 2" />
  //       <Card title="Card 3" content="Content for Card 3" />
  //       <Card title="Card 4" content="Content for Card 4" />
  //       <Card title="Card 5" content="Content for Card 5" />
  //       <Card title="Card 6" content="Content for Card 6" />
  //       <Card title="Card 7" content="Content for Card 7" />
  //       <Card title="Card 8" content="Content for Card 8" />
  //       <Card title="Card 9" content="Content for Card 9" />
  //     </div>
  //   </div>
  // </>
  

function Card({ title, content }) {
  return (
    <Link to="/restaurant/:id" className="card-link">
      <div className="card">
        <div className="card-content">
          <h2 className="card-title">{title}</h2>
          <img src="/src/test pic 002.jpeg" alt="Restaurant" />
          <p className="card-content">{content}</p>
        </div>
      </div>
    </Link>
  )
}
}

export default HomePage;
