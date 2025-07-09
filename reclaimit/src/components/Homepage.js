import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import FirestoreService from './FirestoreService';
import './Homepage.css';

const Homepage = () => {
  const [recentItems, setRecentItems] = useState([]);
  const [stats, setStats] = useState({ totalItems: 0, itemsThisWeek: 0 });

  useEffect(() => {
    async function fetchRecentItems() {
      try {
        const items = await FirestoreService.getFoundItems();
        setRecentItems(items.slice(0, 3));
        
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        
        const itemsThisWeek = items.filter(item => {
          const itemDate = item.createdAt?.toDate();
          return itemDate && itemDate >= oneWeekAgo;
        }).length;
        
        setStats({
          totalItems: items.length,
          itemsThisWeek: itemsThisWeek
        });
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    }
    
    fetchRecentItems();
  }, []);

  const scrollToContent = () => {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
      statsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <div className="homepage-container">
      <Header />

      <section className="hero" id="home">
        <div className="container">
          <div className="hero-content">
            <h1>Lost Something at Hunter?</h1>
            <p>Reconnect with your belongings through our campus-wide lost and found platform. Help fellow students find their items and discover what's been found.</p>
            <div className="cta-buttons">
              <Link to="/submit" className="btn btn-primary">Report Found Item</Link>
              <Link to="/submit2" className="btn btn-secondary">Search Lost Items</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">{stats.totalItems}</div>
              <div className="stat-label">Items Found</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">{stats.itemsThisWeek}</div>
              <div className="stat-label">This Week</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Available</div>
            </div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <h2>How ReclaimIt Works</h2>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-icon">📱</div>
              <h3>1. Report</h3>
              <p>Found something? Submit details about the item including location, date, and description.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🔍</div>
              <h3>2. Search</h3>
              <p>Lost something? Browse through found items or filter by location to find your belongings.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">💬</div>
              <h3>3. Connect</h3>
              <p>Found a match? Contact the finder directly through our secure messaging system.</p>
            </div>
            <div className="step-card">
              <div className="step-icon">🤝</div>
              <h3>4. Reunite</h3>
              <p>Arrange a safe meetup on campus to return the item to its rightful owner.</p>
            </div>
          </div>
        </div>
      </section>

      {recentItems.length > 0 && (
        <section className="recent-items">
          <div className="container">
            <h2>Recently Found Items</h2>
            <div className="items-grid">
              {recentItems.map((item) => (
                <div key={item.id} className="item-preview">
                  {item.imageUrl && (
                    <div className="item-image">
                      <img src={item.imageUrl} alt={item.itemName} />
                    </div>
                  )}
                  <div className="item-info">
                    <h4>{item.itemName}</h4>
                    <p className="item-location">📍 {item.location}</p>
                    <p className="item-date">📅 {item.dateFound}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all-wrapper">
              <Link to="/submit2" className="btn btn-outline">View All Found Items</Link>
            </div>
          </div>
        </section>
      )}

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>ReclaimIt</h4>
              <p>Connecting the Hunter College community through lost and found.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/submit">Submit Item</Link></li>
                <li><Link to="/submit2">Find Items</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Campus Safety</h4>
              <p>Remember to report valuable items to Campus Security as well.</p>
              <p>Emergency: (212) 772-4444</p>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 ReclaimIt - Hunter College Lost & Found</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;