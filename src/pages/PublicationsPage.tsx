import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './PublicationsPage.css';

const PublicationsPage: React.FC = () => {
  // Default language is Arabic, so direction is 'rtl'.
  const direction: 'rtl' | 'ltr' = 'rtl';
  const publications = Array(9).fill(null);

  return (
    <div className="publications-page" dir={direction}>
      <NavBar direction={direction} />
      
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
