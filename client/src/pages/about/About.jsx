import React from 'react';
import './about.css';
// import aboutImage from './about-image.jpg'; // Import your about image

const About = () => {
  return (
    <div className="about-page">
      <div className="about-content">
        <div className="about-header">
          <h2>About Us</h2>
          <p>Welcome to our blog! We are a team of passionate writers and creators who love sharing our thoughts, experiences, and knowledge with the world.</p>
        </div>
        <div className="about-image">
          <img src="https://cdn.pixabay.com/photo/2020/04/03/06/35/work-4997565_1280.png" alt="About Us" />
        </div>
        <div className="about-details">
          <h3>Our Mission</h3>
          <p>Our mission is to inspire and engage readers with high-quality content on various topics, from technology and lifestyle to travel and culture.</p>
          <h3>What We Offer</h3>
          <ul>
            <li>Insightful articles</li>
            <li>Creative stories</li>
            <li>Expert opinions</li>
            <li>Entertaining content</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
