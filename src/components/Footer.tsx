import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../assets/merath_logo_transparent.png';
import { sanityClient } from '../lib/sanityClient';

type NavItem = {label: string; to: string};

interface FooterProps {
  language?: 'ar' | 'en';
}

const Footer: React.FC<FooterProps> = ({ language = 'en' }) => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [siteTitle, setSiteTitle] = useState<string>('Merath');
  const [footerNote, setFooterNote] = useState<string>('');

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const settings: any = await sanityClient.fetch('*[_type == "siteSettings"][0]{title, titleAr, footerNote, footerNoteAr, footerLinks[]{label, labelAr, href, order}}');
        if (settings?.title) setSiteTitle(language === 'ar' ? (settings.titleAr || settings.title) : (settings.title || settings.titleAr));
        if (settings?.footerNote) setFooterNote(language === 'ar' ? (settings.footerNoteAr || settings.footerNote) : (settings.footerNote || settings.footerNoteAr));
        if (settings?.footerLinks?.length) {
          const mapped = settings.footerLinks
            .filter((i: any) => i?.label)
            .map((i: any) => {
              const label = language === 'ar' ? (i.labelAr || i.label) : (i.label || i.labelAr);
              return {label, to: i.href || '#', order: i.order ?? 0};
            })
            .sort((a: any, b: any) => a.order - b.order);
          setNavItems(mapped.slice(0, 3));
          return;
        }
      } catch (err) {
        console.error('Footer settings fetch failed', err);
      }

      try {
        const nav: any = await sanityClient.fetch('*[_type == "navigation" && _id == "navigation-global"][0]{items[]{label, labelAr, href, order, pageRef->{slug}}}');
        if (nav?.items?.length) {
          const mapped = nav.items
            .filter((i: any) => i?.label)
            .map((i: any) => {
              const to = i.pageRef?.slug?.current ? `/${i.pageRef.slug.current}` : i.href || '#';
              const label = language === 'ar' ? (i.labelAr || i.label) : (i.label || i.labelAr);
              return {label, to};
            })
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
          setNavItems(mapped.slice(0, 3));
        }
      } catch (err) {
        console.error('Footer nav fetch failed', err);
      }
    };

    fetchFooter();
  }, [language]);

  return (
    <footer className="footer">
      <div className="footer-content">
        {navItems.map((item) => (
          <div key={item.label} className="footer-link-section">
            <a href={item.to} className="footer-title">{item.label}</a>
          </div>
        ))}
        <div className="footer-logo-wrapper">
          <img src={logo} alt={`${siteTitle} Logo`} className="footer-logo" />
        </div>
      </div>
      {footerNote && <div className="footer-note">{footerNote}</div>}
    </footer>
  );
};

export default Footer;
