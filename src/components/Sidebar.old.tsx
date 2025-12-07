import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Sidebar() {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);

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
        <button
          className="mobile-overlay active"
          onClick={() => setMobileMenuOpen(false)}
          onKeyDown={(e) => e.key === 'Escape' && setMobileMenuOpen(false)}
          aria-label="Close menu"
        />
      )}

      {/* Sidebar */}
      <motion.aside 
        id="sidebar-nav" 
        style={{ 
          transform: mobileMenuOpen ? 'translateX(0)' : undefined,
          opacity
        }}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Brand */}
        <motion.div
          initial={{ y: -30, opacity: 0, scale: 0.8 }}
          animate={{ 
            y: 0, 
            opacity: 1, 
            scale: 1,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 15,
              delay: 0.2
            }
          }}
          whileHover={{ 
            scale: 1.05,
            rotate: [0, -1, 1, 0],
            transition: { duration: 0.3 }
          }}
        >
          <NavLink to="/" onClick={() => setMobileMenuOpen(false)}>
            <motion.div 
              className="brand-name"
              initial={{ letterSpacing: "-0.05em" }}
              animate={{ letterSpacing: "0em" }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              MERATH
            </motion.div>
            <motion.div 
              className="brand-subtitle"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Cultural Foundation
            </motion.div>
          </NavLink>
        </motion.div>

        {/* Navigation */}
        <nav>
          <ul>
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.path}
                initial={{ x: -20, opacity: 0, rotateY: -15 }}
                animate={{ x: 0, opacity: 1, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: 0.3 + index * 0.15,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ 
                  x: 12,
                  scale: 1.05,
                  transition: { 
                    type: "spring",
                    stiffness: 400,
                    damping: 10
                  } 
                }}
                whileTap={{ scale: 0.98 }}
              >
                <NavLink
                  to={link.path}
                  className={({ isActive }) => isActive ? 'active' : ''}
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.15 }}
                  >
                    {link.label}
                  </motion.span>
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </nav>

        {/* Language toggle */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div>
            <motion.button
              onClick={() => {
                setLanguage('en');
                setMobileMenuOpen(false);
              }}
              aria-pressed={language === 'en'}
              className={language === 'en' ? 'active' : ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              EN
            </motion.button>
            <motion.button
              onClick={() => {
                setLanguage('ar');
                setMobileMenuOpen(false);
              }}
              aria-pressed={language === 'ar'}
              className={language === 'ar' ? 'active' : ''}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              العربية
            </motion.button>
          </div>
        </motion.div>
      </motion.aside>
    </>
  );
}
