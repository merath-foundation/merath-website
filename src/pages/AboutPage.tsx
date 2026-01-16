import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import './AboutPage.css';
import logo from '../assets/merath_logo_transparent.png';

interface AboutPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const AboutPage: React.FC<AboutPageProps> = ({ direction, language, setLanguage }) => {
  const teamMembers = ['Jane Doe', 'John Doe', 'Moad Doe', 'Yusuf Doe'];

  return (
    <div className="about-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      <div className="about-text">
        <h1 className="about-heading">ABOUT</h1>
        <p className="about-paragraph">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      
      <div className="team-section">
        <h2 className="team-heading">Team</h2>
        {teamMembers.map((member, index) => (
          <div key={index} className="team-member">{member}</div>
        ))}
      </div>
      
      <Footer />
    </div>
  );
};

export default AboutPage;
