import React from 'react';
import './Footer.css';
import logo from '../assets/merath_logo_transparent.png';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-link-section">
        <div className="footer-title">Use cases</div>
      </div>
      <div className="footer-link-section">
        <div className="footer-title">Explore</div>
      </div>
      <div className="footer-link-section">
        <div className="footer-title">Resources</div>
      </div>
      <div className="footer-logo-wrapper">
        <img src={logo} alt="Merath Logo" className="footer-logo" />
      </div>
    </footer>
  );
};

export default Footer;
