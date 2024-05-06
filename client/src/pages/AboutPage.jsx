import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
        <h1>Bite Reserve</h1>
      <div className="about-content">
        <img
          src="/src/test pic 001.webp"
          alt="bite reserve"
          className="about-image"
        />
        <p className="about-description">
          Welcome to Bite Reserve, your go-to app for making restaurant reservations hassle-free. Discover new dining experiences, browse menus, and book tables with ease. Join our community of food enthusiasts and explore the culinary world like never before.
        </p>
      </div>
      
    </div>
  );
}

export default AboutPage;