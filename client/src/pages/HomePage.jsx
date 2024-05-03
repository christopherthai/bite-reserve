import { Link } from "react-router-dom";
import React from "react";
import "./HomePage.css"; // CSS 파일 import
import ReservationsPage from "./ReservationsPage"; // 예약 페이지 컴포넌트 import

function HomePage() {
  return (
    <div className="page-container">
      <div className={"card-container blue-card"}>
        <Card title="Card 1" content="Content for Card 1" />
        <Card title="Card 2" content="Content for Card 2" />
        <Card title="Card 3" content="Content for Card 3" />
        <Card title="Card 4" content="Content for Card 4" />
        <Card title="Card 5" content="Content for Card 5" />
        <Card title="Card 6" content="Content for Card 6" />
        <Card title="Card 7" content="Content for Card 7" />
        <Card title="Card 8" content="Content for Card 8" />
        <Card title="Card 9" content="Content for Card 9" />
      </div>
    </div>
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
  );
}

export default HomePage;
