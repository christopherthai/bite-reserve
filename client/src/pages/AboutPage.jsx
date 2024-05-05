import React from "react";
import "./AboutPage.css";

function AboutPage() {
  return (
    <div className="about-page">
      <header className="site-header">
        <h1>Bite Reserve</h1>
        <nav>
          <ul>
            <li><a href="/home">Home</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
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
      <footer className="site-footer">
        <p>© 2024 Bite Reserve. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default AboutPage;