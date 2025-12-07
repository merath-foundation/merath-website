import { NavLink, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// Helper function to get mobile menu classes
function getMobileMenuClass(mobileMenuOpen: boolean, language: string): string {
  if (mobileMenuOpen) return 'translate-x-0';
  return language === 'ar' 
    ? 'translate-x-full lg:translate-x-0' 
    : '-translate-x-full lg:translate-x-0';
}

export function Sidebar() {
  const { language } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { 
      path: '/', 
      label: { en: 'Home', ar: 'الرئيسية' },
      eyebrow: { en: 'Foundation overview', ar: 'نظرة عامة على المؤسسة' }
    },
    { 
      path: '/projects', 
      label: { en: 'Projects', ar: 'المشاريع' },
      eyebrow: { en: 'Current initiatives', ar: 'المبادرات الحالية' }
    },
    { 
      path: '/archive', 
      label: { en: 'Archive', ar: 'الأرشيف' },
      eyebrow: { en: 'Research library', ar: 'مكتبة البحث' }
    },
    { 
      path: '/about', 
      label: { en: 'About', ar: 'عن' },
      eyebrow: { en: 'Mission & team', ar: 'الرؤية والفريق' }
    },
  ];

  const residencyLabel = language === 'en' ? 'Residencies & research' : 'الإقامات والبحوث';
  const foundationMeta = language === 'en' 
    ? 'Archiving culture since 2011'
    : 'توثيق الثقافة منذ 2011';
  const contactLabel = language === 'en' ? 'Contact' : 'تواصل';

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    globalThis.addEventListener('keydown', handleEscape);
    return () => globalThis.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="sidebar-toggle"
        aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={mobileMenuOpen}
        aria-controls="sidebar-nav"
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {mobileMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </>
          )}
        </svg>
      </button>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-[600] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        id="sidebar-nav"
        className={`
          fixed top-0 h-screen z-[650]
          transition-transform duration-300 ease-smooth
          ${language === 'ar' ? 'right-0' : 'left-0'}
          ${getMobileMenuClass(mobileMenuOpen, language)}
        `}
        style={{ 
          width: 'var(--sidebar-width)',
        }}
      >
        <div className="flex flex-col h-full p-8 gap-10">
          {/* Brand */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <NavLink 
              to="/" 
              className="block focus-ring rounded-md sidebar-brand"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div 
                className="text-2xl font-light tracking-tight mb-1 sidebar-brand__title"
                style={{ 
                  color: 'var(--color-text-primary)',
                  letterSpacing: 'var(--tracking-tight)'
                }}
              >
                MERATH
              </div>
              <div 
                className="text-xs uppercase tracking-widest sidebar-brand__subtitle"
                style={{ 
                  color: 'var(--color-accent-primary)',
                  letterSpacing: 'var(--tracking-widest)'
                }}
              >
                {language === 'en' ? 'Cultural Foundation' : 'مؤسسة ثقافية'}
              </div>
              <p className="sidebar-brand__tagline">
                {language === 'en' 
                  ? 'Independent platform for memory, art, and research.'
                  : 'منصة مستقلة للذاكرة والفن والبحث.'}
              </p>
            </NavLink>
          </motion.div>

          {/* Navigation */}
          <nav className="flex-1">
            <ul className="sidebar-nav__list">
              {navLinks.map((link, index) => {
                const isActive = location.pathname === link.path || 
                  (link.path !== '/' && location.pathname.startsWith(link.path));
                const orderLabel = (index + 1).toString().padStart(2, '0');

                return (
                  <motion.li
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  >
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`sidebar-link focus-ring ${isActive ? 'active' : ''}`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="sidebar-active-glow"
                          className="sidebar-link__highlight"
                          transition={{ type: 'spring', stiffness: 500, damping: 40 }}
                          aria-hidden="true"
                        />
                      )}
                      <div className="sidebar-link__inner">
                        <span className="sidebar-link__index">{orderLabel}</span>
                        <div className="sidebar-link__copy">
                          <span className="sidebar-link__label">{link.label[language]}</span>
                          <span className="sidebar-link__eyebrow">{link.eyebrow[language]}</span>
                        </div>
                        <span className="sidebar-link__chevron" aria-hidden="true">↗</span>
                      </div>
                    </NavLink>
                  </motion.li>
                );
              })}
            </ul>
          </nav>

          <div className="sidebar-footer">
            <div>
              <p className="sidebar-footer__eyebrow">{residencyLabel}</p>
              <p className="sidebar-footer__headline">{foundationMeta}</p>
            </div>
            <div className="sidebar-footer__cta">
              <span>{contactLabel}</span>
              <a href="mailto:hello@merath.org" className="sidebar-footer__link">
                hello@merath.org
              </a>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
}
