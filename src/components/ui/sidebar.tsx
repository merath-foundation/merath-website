import { NavLink } from 'react-router-dom';
import { useState } from 'react';

export function Sidebar() {
  const [language, setLanguage] = useState('en');

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  return (
    <aside id="sidebar-nav">
      <NavLink to="/" className="brand-link">
        <div className="brand-name">MERATH</div>
        <div className="brand-subtitle">Cultural Foundation</div>
      </NavLink>
      
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/projects">Projects</NavLink>
        <NavLink to="/archive">Archive</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>

      <div className="lang-buttons">
        <button 
          onClick={() => handleLanguageChange('en')}
          className={language === 'en' ? 'active' : ''}
        >
          EN
        </button>
        <button 
          onClick={() => handleLanguageChange('ar')}
          className={language === 'ar' ? 'active' : ''}
        >
          العربية
        </button>
      </div>
    </aside>
  );
}
