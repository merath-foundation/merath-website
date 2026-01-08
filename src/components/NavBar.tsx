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

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {/* Overlay backdrop */}
      <div 
        className={`navbar-overlay${menuOpen ? ' navbar-overlay--visible' : ''}`}
        onClick={closeMenu}
        role="button"
        tabIndex={menuOpen ? 0 : -1}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') closeMenu();
        }}
      />
      
      <nav className="navbar" dir={direction}>
        <button
          className={`navbar-icon navbar-icon--${variant}${menuOpen ? ' navbar-icon--open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <div className="navbar-icon-bar"></div>
          <div className="navbar-icon-bar"></div>
          <div className="navbar-icon-bar"></div>
        </button>
      </nav>

      {/* Language switcher positioned below navbar */}
      <div className="navbar-lang-switcher" dir={direction}>
        <label htmlFor="lang-switch">{language === 'ar' ? 'اللغة' : 'Language'}</label>
        <select
          id="lang-switch"
          value={language}
          onChange={e => setLanguage(e.target.value as 'ar' | 'en')}
        >
          <option value="ar">ع</option>
          <option value="en">EN</option>
        </select>
      </div>

      {/* Sidebar navigation */}
      <aside className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`} dir={direction}>
        <button className="navbar-close" onClick={closeMenu} aria-label="Close menu">
          ×
        </button>
        {links.map((link) => (
          <li key={link.to} className="navbar-link-item">
            <Link to={link.to} className="navbar-link" onClick={closeMenu}>
              {link.label}
            </Link>
          </li>
        ))}
      </aside>
    </>
  );
};

export default NavBar;
