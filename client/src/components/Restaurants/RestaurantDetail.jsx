import { Link } from 'react-router-dom';
import React from 'react';

function RestaurantDetail() {
  return (
    <div className="restaurant-detail">
      <div className="restaurant-image">
        {/* <img src={imageUrl} alt="Restaurant" /> */}
      </div>
      <div className="restaurant-info">
        <h2>Restaurant Name </h2>
        <p>Address</p>
        <p>Phone Number</p>
        <p>E-mail</p>
        <p>Web Site</p>
        <p>Rating</p>
      </div>
      <Link to="client/src/components/Reservations/ReservationForm.jsx">
        <button>reservation</button>
      </Link>
    </div>
  );
}

export default RestaurantDetail;
