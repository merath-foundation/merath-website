import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../assets/merath_logo_footer.png';
// ...existing code...
// Inline SVG will be used instead of external image for precise scaling and alignment

import { sanityClient } from '../lib/sanityClient';

interface SocialMedia {
  instagram?: string;
  twitter?: string;
  facebook?: string;
  linkedin?: string;
  youtube?: string;
}

interface FooterProps {
  language?: 'ar' | 'en';
}

const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const [siteTitle, setSiteTitle] = useState<string>('Merath');
  const [footerNote, setFooterNote] = useState<string>('');
  const [socialMedia, setSocialMedia] = useState<SocialMedia>({});

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const settings: any = await sanityClient.fetch('*[_type == "siteSettings"][0]{title, titleAr, footerNote, footerNoteAr, socialMedia}');
        if (settings?.title) setSiteTitle(language === 'ar' ? (settings.titleAr || settings.title) : (settings.title || settings.titleAr));
        if (settings?.footerNote) setFooterNote(language === 'ar' ? (settings.footerNoteAr || settings.footerNote) : (settings.footerNote || settings.footerNoteAr));
        if (settings?.socialMedia) setSocialMedia(settings.socialMedia);
      } catch (err) {
        console.error('Footer settings fetch failed', err);
      }
    };

    fetchFooter();
  }, [language]);

  const hasSocialLinks = socialMedia.instagram || socialMedia.twitter || socialMedia.facebook || socialMedia.linkedin || socialMedia.youtube;

  return (
    <footer className="footer">
      <div className="footer-decoration-wrapper" aria-hidden="true">
        {/* Inline meem decoration for guaranteed scale/position control */}
        <svg className="footer-decoration-svg" viewBox="0 0 367.73 29.14" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="img">
          <defs>
            <style>{`.cls-1 { fill: #dba923; } .cls-2 { fill: none; }`}</style>
          </defs>
          <g>
            <path className="cls-1" d="M317.14,16.31v6.48l-161.47.41c0-3.24.02-3.93,0-6.48l161.47-.41Z"/>
            <path className="cls-1" d="M337.38,22.66v6.48h-20.24c-.12-1.71-.03-3.65,0-6.48h20.24Z"/>
            <path className="cls-1" d="M360.46,13.16c-1.48,1.76,2.64,4.55,3.38,8.39-.2.46-.86.56-1.62.56-2.02,0-4.1-.66-6.02-1.47-3.04-1.26-5.62-2.88-7.13-5.16.82-1.88,1.96-3.21,3.3-4.02-.87-.94-1.67-1.93-2.43-2.96-1.45,1.73-2.47,3.49-2.95,5.21-1.82,6.37-4.76,8.95-8.5,8.95h-1.11c-2.73,0-3.54,1.87-3.54,3.09,0,1.37.76,3.39,3.54,3.39h.86c4.55,0,7.44-2.12,8.75-6.58h.35c5.01,3.69,10.02,5.97,15.03,5.97,2.43,0,4.3-1.92,5.36-6.53-.43-4.73-1.68-9.36-3.68-12.64-1.26,1.21-2.47,2.46-3.59,3.79Z"/>
            <path className="cls-1" d="M366.87,6.48v6.48h-6.57c0-3.24,0-3.93,0-6.48h6.57Z"/>
            <path className="cls-1" d="M360.73,0v6.48h-6.57c0-3.24,0-3.93,0-6.48h6.57Z"/>
            <path className="cls-1" d="M354.16,6v6.48h-6.57c0-3.24,0-3.93,0-6.48h6.57Z"/>
            <path className="cls-1" d="M330.28,16.31v6.48h-6.57c0-3.24,0-3.93,0-6.48h6.57Z"/>
            <path className="cls-1" d="M323.71,16.31v6.48h-6.57c0-3.24,0-3.93,0-6.48h6.57Z"/>
            <path className="cls-1" d="M161.47,16.69v6.48L0,23.57C0,20.33.02,19.64,0,17.09l161.47-.41Z"/>
            <rect className="cls-2" width="367.73" height="29.14"/>
          </g>
        </svg>

        {/* Generated continuous line that begins adjacent to the decal and spans the footer */}
        <div className="footer-decoration-line" />
      </div>
      <div className="footer-content">
        <div className="footer-logo-wrapper">
          <img src={logo} alt={`${siteTitle} Logo`} className="footer-logo" />
        </div>
        {hasSocialLinks && (
          <div className="footer-social">
            {socialMedia.instagram && (
              <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            )}
            {socialMedia.twitter && (
              <a href={socialMedia.twitter} target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
            {socialMedia.facebook && (
              <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            )}
            {socialMedia.linkedin && (
              <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {socialMedia.youtube && (
              <a href={socialMedia.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="footer-social-link">
                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
      {footerNote && <div className="footer-note">{footerNote}</div>}
    </footer>
  );
};

export default Footer;
