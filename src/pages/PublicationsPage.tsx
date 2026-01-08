import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './PublicationsPage.css';

const PublicationsPage: React.FC = () => {
  const publications = Array(9).fill(null);

  return (
    <div className="publications-page">
      <NavBar />
      
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
