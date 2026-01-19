import React, { useEffect, useState, useMemo } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Card from '../components/Card';
import { sanityClient } from '../lib/sanityClient';
import './LandingPage.css';
import logo from '../assets/merath_logo_transparent.png';


interface LandingPageProps {
  direction?: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ direction = 'rtl', language, setLanguage }) => {
  const [heroSubtitle, setHeroSubtitle] = useState<string>('');
  const [heroDescription, setHeroDescription] = useState<string>('');
  const [heroDescriptionSecondary, setHeroDescriptionSecondary] = useState<string>('');
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const homeData = await sanityClient.fetch(`*[_type == "page" && slug.current == "home"] | order(_updatedAt desc)[0]{title, titleAr, body, bodyAr, sections[]{heading, headingAr, content, contentAr, images[]{asset->{url}}}}`);

        if (!homeData) {
          setError('Home page content is missing in Sanity (page slug "home")');
          setLoading(false);
          return;
        }

        const isArabic = language === 'ar';
        const pickBlocks = (blocks?: any[]) =>
          Array.isArray(blocks)
            ? blocks
                .map((b: any) => (b?.children || []).map((c: any) => c?.text || '').join(''))
                .filter(Boolean)
            : [];

        const bodyBlocks = pickBlocks(isArabic ? homeData?.bodyAr : homeData?.body);
        setHeroDescription(bodyBlocks[0] || '');
        setHeroSubtitle(bodyBlocks[1] || '');
        setHeroDescriptionSecondary(bodyBlocks[2] || bodyBlocks[1] || '');

        if (Array.isArray(homeData?.sections)) {
          const mapped = homeData.sections
            .filter((s: any) => s?.heading || s?.content)
            .map((s: any, idx: number) => ({
              title: isArabic ? (s.headingAr || s.heading || `Section ${idx + 1}`) : (s.heading || s.headingAr || `Section ${idx + 1}`),
              description: Array.isArray(isArabic ? s.contentAr : s.content)
                ? (isArabic ? s.contentAr : s.content).map((b: any) => (b.children || []).map((c: any) => c.text || '').join('')).join(' ')
                : '',
              order: idx,
            }))
            .slice(0, 6);
          setCards(mapped);
        }

        setLoading(false);
      } catch (err: any) {
        console.error('Failed to load home page', err);
        setError(err?.message || 'Failed to load home page');
        setLoading(false);
      }
    };

    fetchHome();
  }, [language]);

  const cardsToRender = cards;

  return (
    <div className="landing-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-subtitle">
            {heroSubtitle}
          </div>
          
          <div className="hero-description">
            {heroDescription}
          </div>
          
          <div className="hero-description-secondary">
            {heroDescriptionSecondary}
          </div>
          {error && <p className="hero-error">{error}</p>}
          {loading && <p className="hero-loading">Loading...</p>}
        </div>
      </section>
      
      <section className="cards-section">
        <div className="cards-container">
          {cardsToRender.map((card, idx) => (
            <Card
              key={idx}
              title={card.title}
              description={card.description}
              ctaLabel={card.ctaLabel}
              ctaHref={card.ctaHref}
            />
          ))}
        </div>
      </section>
      
      <section className="project-showcase">
        <div className="showcase-image"></div>
        <div className="showcase-image"></div>
      </section>
      
      <Footer language={language} />
    </div>
  );
};

export default LandingPage;
