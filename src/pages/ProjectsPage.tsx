import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProjectOverlay from '../components/ProjectOverlay';
import { PROJECTS_DATA, Project } from '../data/projectsData';
import './ProjectsPage.css';
import logo from '../assets/merath_logo_transparent.png';

interface ProjectsPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ direction, language, setLanguage }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const selectedProject = selectedProjectId
    ? PROJECTS_DATA.find(p => p.id === selectedProjectId)
    : null;

  const handleProjectClick = (projectId: number) => {
    setSelectedProjectId(projectId);
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
    setTimeout(() => {
      setSelectedProjectId(null);
    }, 300);
  };

  const handleProjectChange = (projectId: number) => {
    setSelectedProjectId(projectId);
  };

  return (
    <div className="projects-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      <img src={logo} alt="Merath Logo" className="projects-logo" />
      
      {/* Featured project tiles */}
      <div className="project-tile">
        <div className="project-tile-image"></div>
        <div className="project-tile-text">
          {language === 'ar' 
            ? 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
            : 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.'
          }
        </div>
      </div>
      
      <div className="project-tile">
        <div className="project-tile-image"></div>
        <div className="project-tile-text">
          {language === 'ar' 
            ? 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
            : 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.'
          }
        </div>
      </div>
      
      {/* Interactive project grid */}
      <div className="project-grid">
        {PROJECTS_DATA.map((project) => (
          <div key={project.id} className="project-grid-tile">
            <div className="project-number">{project.id}</div>
            <button
              className="project-grid-button"
              onClick={() => handleProjectClick(project.id)}
              aria-label={`View project ${project.id}: ${language === 'ar' ? project.title.ar : project.title.en}`}
            >
              <div className="project-grid-image"></div>
              <div className="project-grid-text">
                {language === 'ar' ? project.shortDescription.ar : project.shortDescription.en}
              </div>
            </button>
          </div>
        ))}
      </div>
      
      {/* Project overlay modal */}
      {selectedProject && (
        <ProjectOverlay
          project={selectedProject}
          isOpen={isOverlayOpen}
          onClose={handleOverlayClose}
          onProjectChange={handleProjectChange}
          language={language}
          direction={direction}
          totalProjects={PROJECTS_DATA.length}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
