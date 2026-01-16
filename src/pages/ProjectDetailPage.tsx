import React from 'react';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import './ProjectDetailPage.css';
import logo from '../assets/merath_logo_transparent.png';

interface ProjectDetailPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ direction, language, setLanguage }) => {
  const tabs = [
    { name: 'PROJECT UNO', active: true },
    { name: 'PROJECT DUO', active: false },
    { name: 'PROJECT TRES', active: false },
    { name: 'PROJECT QUATTORE', active: false },
    { name: 'PROJECT QUINQUE', active: false },
    { name: 'PROJECT SEX', active: false },
  ];

  return (
    <div className="project-detail-page" dir={direction}>
      <div className="project-detail-navbar">
        <NavBar direction={direction} variant="white" language={language} setLanguage={setLanguage} />
      </div>
      
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      <div className="project-detail-grid">
        <img className="project-detail-main-image" alt="Project" />
        
        <div className="project-detail-tabs-wrapper">
          <div className="project-detail-tabs">
            {tabs.map((tab, index) => (
              <div key={index} className={`project-tab ${tab.active ? 'project-tab--active' : ''}`}>
                {tab.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="project-detail-article">
          <div className="project-detail-slideshow">
            <button className="slideshow-arrow slideshow-arrow--left">←</button>
            <div className="slideshow-image"></div>
            <button className="slideshow-arrow slideshow-arrow--right">→</button>
          </div>
          
          <div className="project-detail-text">
            <h1 className="article-heading">Main Heading</h1>
            <p className="article-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            
            <h2 className="article-heading">Subsection</h2>
            <p className="article-paragraph">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Curabitur blandit tempus porttitor.
            </p>
            
            <h2 className="article-heading">Details</h2>
            <p className="article-paragraph">
              Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Pellentesque in ipsum id orci porta dapibus. Proin eget tortor risus. Nulla porttitor accumsan tincidunt. Quisque velit nisi, pretium ut lacinia in, elementum id enim.
            </p>
            
            <h1 className="article-heading">Main Heading</h1>
            <p className="article-paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProjectDetailPage;
