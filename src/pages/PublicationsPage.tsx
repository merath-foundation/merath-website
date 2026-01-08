import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './PublicationsPage.css';

interface PublicationsPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const PublicationsPage: React.FC<PublicationsPageProps> = ({ direction, language, setLanguage }) => {
  const publications = Array(9).fill(null);

  return (
    <div className="publications-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <div className="publications-grid">
        {publications.map((_, index) => (
          <div key={index} className="publication-item"></div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default PublicationsPage;
