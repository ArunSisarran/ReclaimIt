import React from 'react';
import Header from './Header';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <Header />
      <div className="about-container">
        <h2>About ReclaimIt</h2>
        <div className="about-content">
          <p>
            This website was designed to help students and community members return lost items
            to their rightful owners. Anyone who finds a lost item can post a description here,
            and the owner can reach out to reclaim it.
          </p>
          <p>
            The goal is to encourage responsibility and make a helpful environment where everyone
            looks out for each other. Together, we can build a stronger, more caring community
            at Hunter College.
          </p>
          <div className="features">
            <h3>How It Works</h3>
            <div className="feature-list">
              <div className="feature-item">
                <strong>Find an Item:</strong> Submit details about any lost item you discover on campus
              </div>
              <div className="feature-item">
                <strong>Search for Your Item:</strong> Browse through found items to see if yours is listed
              </div>
              <div className="feature-item">
                <strong>Connect:</strong> Contact the finder directly through the provided email
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;