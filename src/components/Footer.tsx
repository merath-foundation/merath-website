import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../assets/merath_logo_transparent.png';
import { sanityClient } from '../lib/sanityClient';

interface FooterProps {
  language?: 'ar' | 'en';
}

const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const [siteTitle, setSiteTitle] = useState<string>('Merath');
  const [footerNote, setFooterNote] = useState<string>('');

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const settings: any = await sanityClient.fetch('*[_type == "siteSettings"][0]{title, titleAr, footerNote, footerNoteAr}');
        if (settings?.title) setSiteTitle(language === 'ar' ? (settings.titleAr || settings.title) : (settings.title || settings.titleAr));
        if (settings?.footerNote) setFooterNote(language === 'ar' ? (settings.footerNoteAr || settings.footerNote) : (settings.footerNote || settings.footerNoteAr));
      } catch (err) {
        console.error('Footer settings fetch failed', err);
      }
    };

    fetchFooter();
  }, [language]);

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo-wrapper">
          <img src={logo} alt={`${siteTitle} Logo`} className="footer-logo" />
        </div>
      </div>
      {footerNote && <div className="footer-note">{footerNote}</div>}
    </footer>
  );
};

export default Footer;
