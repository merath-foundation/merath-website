import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

interface NavBarProps {
  variant?: 'default' | 'white';
  direction?: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'default', direction = 'rtl', language, setLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { label: language === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: language === 'ar' ? 'المشاريع' : 'Projects', to: '/projects' },
    { label: language === 'ar' ? 'حول' : 'About', to: '/about' },
    { label: language === 'ar' ? 'المنشورات' : 'Publications', to: '/publications' },
  ];

  return (
    <nav className="navbar" dir={direction}>
      <button
        className={`navbar-icon navbar-icon--${variant}`}
        aria-label="Toggle menu"
        onClick={() => setMenuOpen((open) => !open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
      >
        <div className="navbar-icon-bar"></div>
        <div className="navbar-icon-bar"></div>
        <div className="navbar-icon-bar"></div>
      </button>
      <ul className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`}>
        {links.map((link) => (
          <li key={link.to} className="navbar-link-item">
            <Link to={link.to} className="navbar-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <div className="navbar-lang-switcher">
        <label htmlFor="lang-switch" style={{ fontWeight: 500 }}>{language === 'ar' ? 'اللغة:' : 'Language:'}</label>
        <select
          id="lang-switch"
          value={language}
          onChange={e => setLanguage(e.target.value as 'ar' | 'en')}
        >
          <option value="ar">العربية</option>
          <option value="en">English</option>
        </select>
      </div>
    </nav>
  );
};

export default NavBar;
