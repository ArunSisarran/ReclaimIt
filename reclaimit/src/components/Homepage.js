import React, { useEffect } from 'react';
import Header from './Header';
import './Homepage.css';

const Homepage = () => {
  return (
    <div className="homepage-container">
      <Header />

      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Lost Something at Hunter?</h1>
            <p>Reconnect with your belongings through our campus-wide lost and found platform. Help fellow students find their items and discover what's been found.</p>
            <div className="cta-buttons">
              <a href="#submit" className="btn btn-primary">Report Found Item</a>
              <a href="#found" className="btn btn-secondary">Search Lost Items</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;