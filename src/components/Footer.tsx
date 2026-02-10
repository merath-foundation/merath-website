import React from 'react';
import './Footer.css';

// Footer simplified to only the extending decorative line that runs along the footer
const Footer: React.FC = () => {
  return (
    <footer className="footer" aria-hidden="true">
      <div className="footer-decoration-line" />
    </footer>
  );
};

export default Footer;
