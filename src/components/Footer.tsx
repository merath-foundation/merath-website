import React, { useEffect, useState } from 'react';
import './Footer.css';
import logo from '../assets/merath_logo_transparent.png';
import { sanityClient } from '../lib/sanityClient';

type NavItem = {label: string; to: string};

const Footer: React.FC = () => {
  const [navItems, setNavItems] = useState<NavItem[]>([]);
  const [siteTitle, setSiteTitle] = useState<string>('Merath');

  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const nav: any = await sanityClient.fetch('*[_type == "navigation" && _id == "navigation-global"][0]{items[]{label, href, order, pageRef->{slug}}}');
        if (nav?.items?.length) {
          const mapped = nav.items
            .filter((i: any) => i?.label)
            .map((i: any) => {
              const to = i.pageRef?.slug?.current ? `/${i.pageRef.slug.current}` : i.href || '#';
              return {label: i.label, to};
            })
            .sort((a: any, b: any) => (a.order ?? 0) - (b.order ?? 0));
          setNavItems(mapped.slice(0, 3));
        }
      } catch (err) {
        console.error('Footer nav fetch failed', err);
      }

      try {
        const settings: any = await sanityClient.fetch('*[_type == "siteSettings"][0]{title}');
        if (settings?.title) setSiteTitle(settings.title);
      } catch (err) {
        console.error('Footer settings fetch failed', err);
      }
    };

    fetchFooter();
  }, []);

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
    </footer>
  );
};

export default Footer;
