import React, { useEffect, useState } from 'react';
import BookmarkNavigation from './BookmarkNavigation';
import { Project } from '../data/projectsData';
import './ProjectOverlay.css';

interface ProjectOverlayProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onProjectChange: (projectId: number) => void;
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  totalProjects: number;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({
  project,
  isOpen,
  onClose,
  onProjectChange,
  language,
  direction,
  totalProjects
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle keyboard events
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const nextId = e.key === 'ArrowRight' 
          ? project.id < totalProjects ? project.id + 1 : 1
          : project.id > 1 ? project.id - 1 : totalProjects;
        onProjectChange(nextId);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, project.id, totalProjects, onProjectChange]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isAnimating) return null;

  const description = language === 'ar' ? project.fullDescription.ar : project.fullDescription.en;
  const title = language === 'ar' ? project.title.ar : project.title.en;

  return (
    <>
      {/* Backdrop */}
      <div
        className={`project-overlay-backdrop ${isAnimating ? 'project-overlay-backdrop--visible' : ''}`}
        onClick={handleBackdropClick}
      />

      {/* Modal */}
      <div
        className={`project-overlay ${isAnimating ? 'project-overlay--open' : ''}`}
        dir={direction}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`project-title-${project.id}`}
      >
        {/* Close Button */}
        <button
          className="project-overlay-close"
          onClick={handleClose}
          aria-label="Close project details"
          title="Close (ESC)"
        >
          ×
        </button>

        {/* Content Container */}
        <div className="project-overlay-content">
          {/* Left side: Image */}
          <div className="project-overlay-image-section">
            <div className="project-overlay-image">
              {/* Placeholder for project image */}
              <div className="project-image-placeholder">
                <span>Project {project.id} Image</span>
              </div>
            </div>
          </div>

          {/* Center: Bookmarks */}
          <BookmarkNavigation
            activeProjectId={project.id}
            onBookmarkClick={onProjectChange}
            totalProjects={totalProjects}
          />

          {/* Right side: Text */}
          <div className="project-overlay-text-section">
            <h2 id={`project-title-${project.id}`} className="project-overlay-title">
              {title}
            </h2>
            <p className="project-overlay-description">
              {description}
            </p>
            <div className="project-overlay-meta">
              <span className="project-counter">
                Project {project.id} of {totalProjects}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation hints */}
        <div className="project-overlay-hints">
          <span className="hint-text">
            {direction === 'ltr' 
              ? '← → to navigate or click bookmarks'
              : 'انقر على الفواصل أو استخدم ← →'
            }
          </span>
        </div>
      </div>
    </>
  );
};

export default ProjectOverlay;
