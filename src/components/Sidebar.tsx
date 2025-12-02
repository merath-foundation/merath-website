import { NavLink } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export function Sidebar() {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: '/', label: language === 'en' ? 'Home' : 'الرئيسية' },
    { path: '/projects', label: language === 'en' ? 'Projects' : 'المشاريع' },
    { path: '/archive', label: language === 'en' ? 'Archive' : 'الأرشيف' },
    { path: '/about', label: language === 'en' ? 'About' : 'عن' },
  ];

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="sidebar-nav"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {mobileMenuOpen ? (
            <path d="M18 6L6 18M6 6l12 12" />
          ) : (
            <path d="M3 12h18M3 6h18M3 18h18" />
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="mobile-overlay active"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        id="sidebar-nav" 
        style={{ transform: mobileMenuOpen ? 'translateX(0)' : undefined }}
      >
        {/* Brand */}
        <div>
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            <div className="brand-name">MERATH</div>
            <div className="brand-subtitle">Cultural Foundation</div>
          </NavLink>
        </div>

        {/* Navigation */}
        <nav>
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Language toggle */}
        <div>
          <div>
            <button
              onClick={() => {
                setLanguage('en');
                setMobileMenuOpen(false);
              }}
              aria-pressed={language === 'en'}
              className={language === 'en' ? 'active' : ''}
            >
              EN
            </button>
            <button
              onClick={() => {
                setLanguage('ar');
                setMobileMenuOpen(false);
              }}
              aria-pressed={language === 'ar'}
              className={language === 'ar' ? 'active' : ''}
            >
              العربية
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
