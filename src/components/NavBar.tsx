import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import MenuToggleIcon from './MenuToggleIcon';
import { sanityClient } from '../lib/sanityClient';
import meemDecoration from '../assets/meem-decoration.svg';
import './NavBar.css';

// The meem scale is now controlled by CSS variables and media queries in NavBar.css

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

  // Compute and set a CSS variable that nudges the footer top-line so its pattern aligns to the same seam
  useEffect(() => {
    if (typeof document === 'undefined') return;

    const computeFooterOffset = () => {
      const wrapper = document.querySelector('.navbar-meem-wrapper') as HTMLElement | null;
      if (!wrapper) return;
      // We assume the left-most visible stroke of the SVG sits at the wrapper's left edge
      const rect = wrapper.getBoundingClientRect();
      const strokeX = rect.left;
      const offsetPx = Math.round(window.innerWidth - strokeX);
      // Write to root so Footer CSS can read it
      document.documentElement.style.setProperty('--footer-line-offset', `${offsetPx}px`);
      
      // Also compute the pixel offset from the wrapper left to the visible left edge of the meem image
      const img = wrapper.querySelector('.navbar-meem-decoration') as HTMLElement | null;
      if (img) {
        const imgRect = img.getBoundingClientRect();
        const joinOffset = Math.round(imgRect.left - rect.left);
        // expose to CSS so the extension can align exactly to image
        document.documentElement.style.setProperty('--meem-extension-join', `${joinOffset}px`);
      }

      // Compute a reliable pixel `right` offset so the meem anchors to the centered content seam
      // regardless of page containers or direction. This is written to --meem-right-px.
      try {
        const rootStyles = getComputedStyle(document.documentElement);
        const contentMaxRaw = rootStyles.getPropertyValue('--content-max-width') || '1200px';
        const contentMax = parseInt(contentMaxRaw, 10) || 1200;
        const viewport = window.innerWidth;
        const seam = Math.max(viewport - contentMax, 0) / 2;

        let baseOffset = 80; // default desktop offset (matches original design)
        if (viewport <= 480) {
          const sidePaddingRaw = rootStyles.getPropertyValue('--page-side-padding') || '24px';
          const sidePadding = parseInt(sidePaddingRaw, 10) || 24;
          baseOffset = sidePadding + 12; // mobile offset uses page padding + small extra
        } else if (viewport <= 768) {
          baseOffset = 48;
        } else if (viewport <= 1024) {
          baseOffset = 64;
        }

        const meemRight = Math.round(seam + baseOffset);
        document.documentElement.style.setProperty('--meem-right-px', `${meemRight}px`);
      } catch (err) {
        // silently ignore; CSS fallback calc will apply
      }
    };

    // initial compute and on resize
    computeFooterOffset();
    window.addEventListener('resize', computeFooterOffset);
    window.addEventListener('orientationchange', computeFooterOffset);
    return () => {
      window.removeEventListener('resize', computeFooterOffset);
      window.removeEventListener('orientationchange', computeFooterOffset);
    };
  }, []);

  return (
    <div className="navbar-container">
      <div className="navbar-meem-wrapper" aria-hidden="true">
        <div className="navbar-meem-extension" />
        <img 
          src={meemDecoration} 
          alt="" 
          className="navbar-meem-decoration" 
        />
      </div>
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
    </div>
  );
};

export default NavBar;
