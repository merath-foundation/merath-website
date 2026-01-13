import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProjectOverlay from '../components/ProjectOverlay';
import { PROJECTS_DATA, Project } from '../data/projectsData';
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
      
      {/* Main content wrapper - ensures consistent max-width and centering */}
      <main className="projects-main">
        
        {/* Featured section with two description blocks */}
        <section className="projects-featured">
          <div className="project-description-block">
            <div className="description-image"></div>
            <p className="description-text">
              {language === 'ar' 
                ? 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
                : 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.'
              }
            </p>
          </div>
          
          <div className="project-description-block">
            <div className="description-image"></div>
            <p className="description-text">
              {language === 'ar' 
                ? 'نحن نعمل مع بقايا منطقة في حركة - طريقة جماعية للتفكير والإنتاج من خلال كيفية تحرك الفن والذاكرة والعلاقات عبر الحدود والتواريخ.'
                : 'We work with the remains of a region in motion a collective method for thinking and making through how art, memory, and relation move across borders and histories.'
              }
            </p>
          </div>
        </section>

        {/* Interactive projects grid - numbered 1 through 6 */}
        <section className="projects-grid-section">
          <div className="projects-grid">
            {PROJECTS_DATA.map((project) => (
              <article key={project.id} className="project-grid-item">
                <div className="project-item-number">{project.id}</div>
                <button
                  className="project-item-button"
                  onClick={() => handleProjectClick(project.id)}
                  aria-label={`View project ${project.id}: ${language === 'ar' ? project.title.ar : project.title.en}`}
                >
                  <div className="project-item-image"></div>
                  <p className="project-item-text">
                    {language === 'ar' ? project.shortDescription.ar : project.shortDescription.en}
                  </p>
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
