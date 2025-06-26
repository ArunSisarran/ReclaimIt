import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  useEffect(() => {
    const clickThing = (e) => {
      if (e.target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault();
        const taget = document.querySelector(e.target.getAttribute('href'));
        if (taget) {
          taget.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    const scrolFunction = () => {
      const headerr = document.querySelector('header');
      if (headerr) {
        if (window.scrollY > 100) {
          headerr.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
          headerr.style.background = 'rgba(255, 255, 255, 0.95)';
        }
      }
    };

    document.addEventListener('click', clickThing);
    window.addEventListener('scroll', scrolFunction);

    return () => {
      document.removeEventListener('click', clickThing);
      window.removeEventListener('scroll', scrolFunction);
    };
  }, []);

  return (
    <header>
      <nav className="container">
        <Link to="/" className="logo">Reclaimit</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><a href="#found">Found Items</a></li>
          <li><Link to="/submit">Submit Item</Link></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;