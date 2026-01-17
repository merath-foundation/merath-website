import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { PortableTextRenderer } from '../components/PortableTextRenderer';
import { sanityClient } from '../lib/sanityClient';
import './AboutPage.css';
import logo from '../assets/merath_logo_transparent.png';

interface AboutPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ direction, language, setLanguage }) => {
  const [pageTitle, setPageTitle] = useState<string | null>(null);
  const [body, setBody] = useState<any[] | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAboutPage = async () => {
      try {
        const data = await sanityClient.fetch(`*[_type == "page" && slug.current == "about"][0]{title, body, sections[]{heading, content}}`);
        setPageTitle(data?.title || null);
        setBody(data?.body || null);
        setSections(data?.sections || []);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(language === 'ar' ? 'تعذر تحميل صفحة التعريف' : 'Failed to load About page');
        setLoading(false);
      }
    };

    fetchAboutPage();
  }, [language]);

  return (
    <div className="about-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      <div className="about-text">
        <h1 className="about-heading">{pageTitle || (language === 'ar' ? 'حول' : 'ABOUT')}</h1>
        {loading && (
          <p className="about-paragraph">{language === 'ar' ? 'جاري التحميل...' : 'Loading...'}</p>
        )}
        {error && <p className="about-paragraph">{error}</p>}
        {!loading && !error && body && (
          <div className="about-paragraph">
            <PortableTextRenderer value={body} />
          </div>
        )}
        {!loading && !error && !body && (
          <p className="about-paragraph">{language === 'ar' ? 'لم يتم نشر محتوى صفحة التعريف بعد.' : 'About page content is not published yet.'}</p>
        )}
      </div>
      
      {sections.length > 0 && (
        <div className="team-section">
          {sections.map((section: any, idx: number) => (
            <div key={idx} className="team-member-wrapper">
              {section.heading && <h2 className="team-heading">{section.heading}</h2>}
              {section.content && <PortableTextRenderer value={section.content} />}
            </div>
          ))}
        </div>
      )}
      
      <Footer />
    </div>
  );
};

export default AboutPage;
