


import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import PublicationsPage from './pages/PublicationsPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  // Default language is Arabic
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

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
