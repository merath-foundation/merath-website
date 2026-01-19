import React, { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import PublicationsPage from './pages/PublicationsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { sanityClient } from './lib/sanityClient';


function App() {
  // Default language is Arabic; hydrate from localStorage if available
  const [language, setLanguageState] = useState<'ar' | 'en'>(() => {
    if (typeof window !== 'undefined') {
      const stored = window.localStorage.getItem('merath-lang');
      if (stored === 'ar' || stored === 'en') return stored;
    }
    return 'ar';
  });
  const setLanguage = (lang: 'ar' | 'en') => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('merath-lang', lang);
    }
  };

  const direction = language === 'ar' ? 'rtl' : 'ltr';
  const [siteTitle, setSiteTitle] = useState<string>('Merath');

  // Fetch site title for document title
  useEffect(() => {
    const fetchTitle = async () => {
      try {
        const settings: any = await sanityClient.fetch('*[_type == "siteSettings"][0]{title, titleAr, defaultSeo{title, titleAr}}');
        const seoTitle = settings?.defaultSeo?.title;
        const seoTitleAr = settings?.defaultSeo?.titleAr;
        const baseTitle = settings?.title;
        const baseTitleAr = settings?.titleAr;
        const chosen = language === 'ar'
          ? (seoTitleAr || baseTitleAr || seoTitle || baseTitle || 'Merath')
          : (seoTitle || baseTitle || seoTitleAr || baseTitleAr || 'Merath');
        setSiteTitle(chosen);
        if (typeof document !== 'undefined') {
          document.title = chosen;
        }
      } catch (err) {
        console.error('Failed to load site title', err);
        if (typeof document !== 'undefined') {
          document.title = 'Merath';
        }
      }
    };

    fetchTitle();
  }, [language]);

  return (
    <div style={{ minHeight: '100vh', background: '#F9F3E0' }} dir={direction}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage direction={direction} language={language} setLanguage={setLanguage} />} />
          <Route path="/projects" element={<ProjectsPage direction={direction} language={language} setLanguage={setLanguage} />} />
          <Route path="/about" element={<AboutPage direction={direction} language={language} setLanguage={setLanguage} />} />
          <Route path="/publications" element={<PublicationsPage direction={direction} language={language} setLanguage={setLanguage} />} />
          <Route path="/detail" element={<ProjectDetailPage direction={direction} language={language} setLanguage={setLanguage} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;