


import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import ProjectDetailPage from './pages/ProjectDetailPage';

function App() {
  // Default language is Arabic
  const [language, setLanguage] = useState<'ar' | 'en'>('ar');
  const direction = language === 'ar' ? 'rtl' : 'ltr';

  return (
    <div style={{ minHeight: '100vh', background: '#F9F3E0' }} dir={direction}>
      <div style={{ padding: 16, textAlign: direction === 'rtl' ? 'right' : 'left' }}>
        <label htmlFor="lang-switch">Language: </label>
        <select
          id="lang-switch"
          value={language}
          onChange={e => setLanguage(e.target.value as 'ar' | 'en')}
        >
          <option value="ar">العربية (Arabic)</option>
          <option value="en">English</option>
        </select>
      </div>

      {/* Example: Show LandingPage and ProjectDetailPage with direction prop */}
      <LandingPage direction={direction} />
      {/* <ProjectDetailPage direction={direction} /> */}
    </div>
  );
}

export default App;
