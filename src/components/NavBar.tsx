import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuToggleIcon from './MenuToggleIcon';
import { sanityClient } from '../lib/sanityClient';
import './NavBar.css';

interface NavBarProps {
  variant?: 'default' | 'white';
  direction?: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const NavBar: React.FC<NavBarProps> = ({ variant = 'default', direction, language, setLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [links, setLinks] = useState<{ label: string; to: string }[]>([
    { label: language === 'ar' ? 'الرئيسية' : 'Home', to: '/' },
    { label: language === 'ar' ? 'المشاريع' : 'Projects', to: '/projects' },
    { label: language === 'ar' ? 'حول' : 'About', to: '/about' },
    { label: language === 'ar' ? 'المنشورات' : 'Publications', to: '/publications' },
  ]);

  const resolvedDirection = useMemo<'rtl' | 'ltr'>(() => {
    if (direction) return direction;

    if (typeof document !== 'undefined') {
      const docDir = document.documentElement.getAttribute('dir');
      if (docDir === 'rtl' || docDir === 'ltr') return docDir;
    }

    return language === 'ar' ? 'rtl' : 'ltr';
  }, [direction, language]);

  useEffect(() => {
    if (typeof document === 'undefined') return;

    const currentDir = document.documentElement.getAttribute('dir');
    if (currentDir !== resolvedDirection) {
      document.documentElement.setAttribute('dir', resolvedDirection);
    }
  }, [resolvedDirection]);

  useEffect(() => {
    const fetchNav = async () => {
      try {
        const data: any = await sanityClient.fetch('*[_type == "navigation" && _id == "navigation-global"][0]{items[]{label, labelAr, href, order, pageRef->{slug}}}');
        if (data?.items?.length) {
          const mapped = data.items
            .filter((i: any) => i?.label)
            .map((i: any) => {
              const to = i.pageRef?.slug?.current ? `/${i.pageRef.slug.current}` : i.href || '#';
              const label = language === 'ar' ? (i.labelAr || i.label) : (i.label || i.labelAr);
              return { label, to };
            })
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
          setLinks(mapped);
        }
      } catch (err) {
        console.error('Nav fetch failed', err);
      }
    };
    fetchNav();
  }, [language]);

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);

  return (
    <div className="navbar-root" dir={resolvedDirection}>
      <button
        type="button"
        className={`navbar-overlay${menuOpen ? ' navbar-overlay--visible' : ''}`}
        onClick={closeMenu}
        aria-label={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
        tabIndex={menuOpen ? 0 : -1}
        aria-hidden={!menuOpen}
      />

      <nav
        className="navbar"
        aria-label={language === 'ar' ? 'التنقل الرئيسي' : 'Primary navigation'}
      >
        <button
          type="button"
          className={`navbar-icon navbar-icon--${variant}`}
          aria-label={language === 'ar' ? 'تبديل القائمة' : 'Toggle menu'}
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          <MenuToggleIcon isOpen={menuOpen} variant={variant} />
        </button>
      </nav>

      <div className="navbar-lang-switcher">
        <button
          className="navbar-lang-button"
          onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
          aria-label={language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
        >
          {language === 'ar' ? 'EN' : 'ع'}
        </button>
      </div>

      <aside
        className={`navbar-links${menuOpen ? ' navbar-links--open' : ''}`}
        aria-hidden={!menuOpen}
        aria-label={language === 'ar' ? 'قائمة التنقل' : 'Navigation menu'}
      >
        <button
          className="navbar-close"
          onClick={closeMenu}
          aria-label={language === 'ar' ? 'إغلاق القائمة' : 'Close menu'}
        >
          ×
        </button>
        <ul className="navbar-link-list">
          {links.map((link) => (
            <li key={link.to} className="navbar-link-item">
              <Link to={link.to} className="navbar-link" onClick={closeMenu}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
};

export default NavBar;
