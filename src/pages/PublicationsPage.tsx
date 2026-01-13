import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PublicationGrid from '../components/PublicationGrid';
import PublicationDetailPanel from '../components/PublicationDetailPanel';
import { PUBLICATIONS_DATA, Publication } from '../data/publicationsData';
import './PublicationsPage.css';

interface PublicationsPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const PublicationsPage: React.FC<PublicationsPageProps> = ({ direction, language, setLanguage }) => {
  const [selectedPublication, setSelectedPublication] = useState<Publication | null>(null);

  const handleClosePanel = () => {
    setSelectedPublication(null);
  };

  return (
    <div className="publications-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <div className="publications-container">
        {/* Header section */}
        <div className="publications-header">
          <h1 className="publications-title">
            {language === 'ar' ? 'المنشورات' : 'Publications'}
          </h1>
          <p className="publications-subtitle">
            {language === 'ar'
              ? 'مجموعة مختارة من الأعمال والأبحاث المتعلقة بالثقافة والمعرفة والمشاعات'
              : 'A curated collection of writings and research related to culture, knowledge, and commons'}
          </p>
        </div>

        {/* Main grid and detail panel */}
        <div className="publications-main">
          <PublicationGrid
            publications={PUBLICATIONS_DATA}
            selectedId={selectedPublication?.id || null}
            onSelectPublication={setSelectedPublication}
            direction={direction}
          />
        </div>

        {/* Detail panel */}
        <PublicationDetailPanel
          publication={selectedPublication}
          isOpen={selectedPublication !== null}
          onClose={handleClosePanel}
          direction={direction}
          language={language}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default PublicationsPage;
