import React from 'react';
import RestaurantList from '../components/Restaurants/RestaurantList';

function HomePage() {
  return (
    <div>
      <section>
        <h1>Find your table for any occasion</h1>
        <RestaurantList className='card-container'/>
      </section>
    </div>
  );
}

export default HomePage;