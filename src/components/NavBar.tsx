import React from 'react';
import './NavBar.css';

interface NavBarProps {
  variant?: 'default' | 'white';
  direction?: 'rtl' | 'ltr';
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'default', direction = 'rtl' }) => {
  return (
    <nav className="navbar" dir={direction}>
      <div className={`navbar-icon navbar-icon--${variant}`}>
        <div className="navbar-icon-bar"></div>
        <div className="navbar-icon-bar"></div>
        <div className="navbar-icon-bar"></div>
      </div>
    </nav>
  );
};

export default NavBar;
