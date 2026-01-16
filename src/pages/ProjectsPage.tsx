import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProjectOverlay from '../components/ProjectOverlay';
import { PROJECTS_DATA } from '../data/projectsData';
import logo from '../assets/merath_logo_transparent.png';
import './ProjectsPage.css';

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
      
      {/* Header with centered logo */}
      <header className="projects-header">
        <img src={logo} alt="Merath Logo" className="projects-logo" />
        <h1 className="projects-title">MERATH</h1>
      </header>
      
      {/* Main content wrapper - ensures consistent max-width and centering */}
      <main className="projects-main">
        
        {/* Interactive projects grid - all 6 projects with images */}
        <section className="projects-grid-section">
          <h2 className="projects-section-title">
            {language === 'ar' ? 'المشاريع' : 'Projects'}
          </h2>
          <div className="projects-grid">
            {PROJECTS_DATA.map((project) => (
              <article key={project.id} className="project-grid-item">
                <button
                  className="project-card-button"
                  onClick={() => handleProjectClick(project.id)}
                  aria-label={`View project: ${language === 'ar' ? project.title.ar : project.title.en}`}
                >
                  <div className="project-card-image">
                    {/* Placeholder for project image - will use actual images when available */}
                    <span className="project-card-number">{project.id}</span>
                  </div>
                  <div className="project-card-content">
                    <h3 className="project-card-title">
                      {language === 'ar' ? project.title.ar : project.title.en}
                    </h3>
                    <p className="project-card-subtitle">
                      {language === 'ar' ? project.subtitle.ar : project.subtitle.en}
                    </p>
                  </div>
                </button>
              </article>
            ))}
          </div>
        </section>
      </main>
      
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
