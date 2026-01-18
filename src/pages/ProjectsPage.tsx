import React, { useEffect, useMemo, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import ProjectOverlay from '../components/ProjectOverlay';
import { sanityClient, sanityConfig } from '../lib/sanityClient';
import { Project } from '../types/project';
import logo from '../assets/merath_logo_transparent.png';
import './ProjectsPage.css';

interface ProjectsPageProps {
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  setLanguage: (lang: 'ar' | 'en') => void;
}

const ProjectsPage: React.FC<ProjectsPageProps> = ({ direction, language, setLanguage }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refToImageUrl = (ref?: string) => {
    if (!ref) return undefined;
    const parts = ref.split('-');
    if (parts.length < 3) return undefined;
    const id = parts[1];
    const dim = parts[2];
    const format = parts[3] || 'jpg';
    return `https://cdn.sanity.io/images/${sanityConfig.projectId}/${sanityConfig.dataset}/${id}-${dim}.${format}`;
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data: any[] = await sanityClient.fetch(`*[_type == "project"] | order(coalesce(order, 999) asc, title asc) {
          _id,
          title,
          slug,
          subtitle,
          shortDescription,
          fullDescription,
          order,
          sourceUrl,
          "imageUrl": image.asset->url,
          "imageRef": image.asset->_ref
        }`);

        const mapped: Project[] = data.map((p, idx) => ({
          id: p.slug?.current || p._id,
          order: typeof p.order === 'number' ? p.order : idx + 1,
          title: { en: p.title, ar: p.title },
          subtitle: {
            en: p.subtitle?.en || p.subtitle?.ar || '',
            ar: p.subtitle?.ar || p.subtitle?.en || p.subtitle || '',
          },
          shortDescription: {
            en: p.shortDescription?.en || p.shortDescription?.ar || '',
            ar: p.shortDescription?.ar || p.shortDescription?.en || '',
          },
          fullDescription: {
            en: p.fullDescription?.en || [],
            ar: p.fullDescription?.ar || p.fullDescription?.en || [],
          },
          imageUrl: p.imageUrl || refToImageUrl(p.imageRef),
          sourceUrl: p.sourceUrl,
        }));

        setProjects(mapped);
        setLoading(false);
      } catch (err: any) {
        console.error('Failed to load projects', err);
        const message = err?.message || (language === 'ar' ? 'تعذر تحميل المشاريع' : 'Failed to load projects');
        setError(message);
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language]);

  const totalProjects = projects.length;
  const selectedProject = useMemo(
    () => (selectedProjectIndex !== null ? projects[selectedProjectIndex] : null),
    [selectedProjectIndex, projects]
  );
  const selectedProjectNumber = selectedProjectIndex !== null ? selectedProjectIndex + 1 : null;

  const handleProjectClick = (index: number) => {
    setSelectedProjectIndex(index);
    setIsOverlayOpen(true);
  };

  const handleOverlayClose = () => {
    setIsOverlayOpen(false);
    setTimeout(() => {
      setSelectedProjectIndex(null);
    }, 300);
  };

  const handleProjectChange = (projectNumber: number) => {
    if (totalProjects === 0) return;
    const nextIndex = (projectNumber - 1 + totalProjects) % totalProjects;
    setSelectedProjectIndex(nextIndex);
  };

  return (
    <div className="projects-page" dir={direction}>
      <NavBar direction={direction} language={language} setLanguage={setLanguage} />
      
      {/* Header with centered logo */}
      <header className="page-logo-header">
        <img src={logo} alt="Merath Logo" className="page-logo" />
        <h1 className="page-logo-title">MERATH</h1>
      </header>
      
      {/* Main content wrapper - ensures consistent max-width and centering */}
      <main className="projects-main">
        {loading && (
          <p className="projects-loading">{language === 'ar' ? 'جاري تحميل المشاريع...' : 'Loading projects...'}</p>
        )}
        {error && <p className="projects-error">{error}</p>}

        {!loading && !error && (
          <section className="projects-grid-section">
            <h2 className="projects-section-title">
              {language === 'ar' ? 'المشاريع' : 'Projects'}
            </h2>
            <div className="projects-grid">
              {projects.map((project, idx) => (
                <article key={project.id} className="project-grid-item">
                  <button
                    className="project-card-button"
                    onClick={() => handleProjectClick(idx)}
                    aria-label={`View project: ${language === 'ar' ? project.title?.ar : project.title?.en}`}
                  >
                    <div className="project-card-image">
                      {project.imageUrl ? (
                        <img src={project.imageUrl} alt={project.title?.en || project.title?.ar || 'Project'} />
                      ) : (
                        <span className="project-card-number">{idx + 1}</span>
                      )}
                    </div>
                    <div className="project-card-content">
                      <h3 className="project-card-title">
                        {language === 'ar' ? project.title?.ar : project.title?.en}
                      </h3>
                      <p className="project-card-subtitle">
                        {language === 'ar' ? project.subtitle?.ar : project.subtitle?.en}
                      </p>
                    </div>
                  </button>
                </article>
              ))}
              {projects.length === 0 && (
                <p className="projects-empty">{language === 'ar' ? 'لا توجد مشاريع منشورة بعد.' : 'No projects published yet.'}</p>
              )}
            </div>
          </section>
        )}
      </main>
      
      {/* Project overlay modal */}
      {selectedProject && selectedProjectNumber !== null && (
        <ProjectOverlay
          project={selectedProject}
          projectNumber={selectedProjectNumber}
          isOpen={isOverlayOpen}
          onClose={handleOverlayClose}
          onProjectChange={handleProjectChange}
          language={language}
          direction={direction}
          totalProjects={totalProjects}
        />
      )}
      
      <Footer />
    </div>
  );
};

export default ProjectsPage;
