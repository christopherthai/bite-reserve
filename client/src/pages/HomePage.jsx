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
}

export default HomePage;