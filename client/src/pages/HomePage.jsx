import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import './HomePage.css'; // CSS 파일 import
import RestaurantList from '../components/Restaurants/RestaurantList.jsx';

function HomePage() {
  const restaurants = RestaurantList(); // RestaurantList를 함수로부터 데이터 받아오기

  return (
    <>
      <p className="home-header">Find your table for any occasion</p>
      <div className="page-container">
        <div className="card-container">
          {restaurants.map((card, index) => (
            <Card key={index} title={card.title} content={card.content} />
          ))}
        </div>
      </div>
    </>
  );
}


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


export default HomePage;
