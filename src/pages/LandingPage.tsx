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
  const [heroSubtitle, setHeroSubtitle] = useState<string>('merath operates between research and production.');
  const [heroDescription, setHeroDescription] = useState<string>('It engages archives, exhibitions, and collective study as methods for approaching how art can document, translate, and transform lived experience.');
  const [heroDescriptionSecondary, setHeroDescriptionSecondary] = useState<string>("The collective's work extends across Libya and its neighbouring countries.");
  const [cards, setCards] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHome = async () => {
      try {
        const pageDoc = await sanityClient.fetch(`*[_type == "page" && slug.current == "home"] | order(_updatedAt desc)[0]{title, body, sections[]{heading, content, images[]{asset->{url}}}}`);

        let homeData = pageDoc;
        if (!pageDoc) {
          homeData = await sanityClient.fetch(`*[_type == "homePage" && (slug.current == "home" || slug.current == "landing")]| order(_updatedAt desc)[0]{heroSubtitle, heroDescription, heroDescriptionSecondary, cards[]{title, description, ctaLabel, ctaHref, order}}`);
        }

        if (homeData?.heroSubtitle) setHeroSubtitle(homeData.heroSubtitle);
        if (homeData?.heroDescription) setHeroDescription(homeData.heroDescription);
        if (homeData?.heroDescriptionSecondary) setHeroDescriptionSecondary(homeData.heroDescriptionSecondary);

        if (Array.isArray(homeData?.cards)) {
          const sorted = [...homeData.cards].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)).slice(0, 6);
          setCards(sorted);
        } else if (Array.isArray(homeData?.sections)) {
          const mapped = homeData.sections
            .filter((s: any) => s?.heading || s?.content)
            .map((s: any, idx: number) => ({
              title: s.heading || `Section ${idx + 1}`,
              description: Array.isArray(s.content)
                ? s.content.map((b: any) => (b.children || []).map((c: any) => c.text || '').join('')).join(' ')
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
  }, []);

  const fallbackCards = useMemo(() => ([
    {title: 'Projects', description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."},
    {title: 'Archives/Exhibitions', description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."},
    {title: 'About Us', description: "Body text for whatever you'd like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story."},
  ]), []);

  const cardsToRender = cards.length ? cards : fallbackCards;

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
      
      <Footer />
    </div>
  );
};

export default LandingPage;
