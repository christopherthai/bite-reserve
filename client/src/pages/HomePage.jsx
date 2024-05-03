import React from 'react';
import '/src/HomePage.css'; // CSS 파일 import

function HomePage() {
  return (
    <div>
      <h1>HomePage</h1>
      <div className="card-container">
        <Card title="Card 1" content="Content for Card 1" />
        <Card title="Card 2" content="Content for Card 2" />
        <Card title="Card 3" content="Content for Card 3" />
        <Card title="Card 4" content="Content for Card 4" />
        <Card title="Card 5" content="Content for Card 5" />
        <Card title="Card 6" content="Content for Card 6" />
        <Card title="Card 7" content="Content for Card 7" />
        <Card title="Card 8" content="Content for Card 8" />
        <Card title="Card 9" content="Content for Card 9" />
        {/* Add more Card components as needed */}
      </div>
    </div>
  );
}

function Card({ title, content }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <p>{content}</p>
    </div>
  );
}

export default HomePage;
