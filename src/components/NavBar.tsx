import React from 'react';
import './NavBar.css';

interface NavBarProps {
  variant?: 'default' | 'white';
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'default' }) => {
  return (
    <nav className="navbar">
      <div className={`navbar-icon navbar-icon--${variant}`}>
        <div className="navbar-icon-bar"></div>
        <div className="navbar-icon-bar"></div>
        <div className="navbar-icon-bar"></div>
      </div>
    </nav>
  );
};

export default NavBar;
