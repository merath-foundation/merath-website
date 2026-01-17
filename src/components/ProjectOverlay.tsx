import React, { useEffect, useState } from 'react';
import BookmarkNavigation from './BookmarkNavigation';
import { PortableTextRenderer } from './PortableTextRenderer';
import { Project } from '../types/project';
import './ProjectOverlay.css';

interface ProjectOverlayProps {
  project: Project;
  projectNumber: number;
  isOpen: boolean;
  onClose: () => void;
  onProjectChange: (projectNumber: number) => void;
  language: 'ar' | 'en';
  direction: 'rtl' | 'ltr';
  totalProjects: number;
}

const ProjectOverlay: React.FC<ProjectOverlayProps> = ({
  project,
  projectNumber,
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
        const nextNumber = e.key === 'ArrowRight'
          ? projectNumber < totalProjects ? projectNumber + 1 : 1
          : projectNumber > 1 ? projectNumber - 1 : totalProjects;
        onProjectChange(nextNumber);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, projectNumber, totalProjects, onProjectChange]);

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

  const title = language === 'ar' ? project.title?.ar : project.title?.en;
  const subtitle = language === 'ar' ? project.subtitle?.ar : project.subtitle?.en;
  const descriptionValue = language === 'ar' ? project.fullDescription?.ar : project.fullDescription?.en;
  const hasPortableText = Array.isArray(descriptionValue) && descriptionValue.length > 0;

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
          aria-label={language === 'ar' ? 'إغلاق' : 'Close project details'}
          title={language === 'ar' ? 'إغلاق (ESC)' : 'Close (ESC)'}
        >
          ×
        </button>

        {/* Content Container - Single column layout */}
        <div className="project-overlay-content">
          <div className="project-overlay-inner">
            {/* Title and subtitle */}
            <header className="project-overlay-header">
              <h2 id={`project-title-${project.id}`} className="project-overlay-title">
                {title}
              </h2>
              <p className="project-overlay-subtitle">
                {subtitle}
              </p>
            </header>

            {/* Main text content */}
            <div className="project-overlay-text">
              {hasPortableText ? (
                <PortableTextRenderer value={descriptionValue as any[]} />
              ) : (
                <p className="project-overlay-paragraph">{descriptionValue as string}</p>
              )}
            </div>

            {/* Bookmark Navigation */}
            <div className="project-overlay-bookmarks">
              <BookmarkNavigation
                activeProjectNumber={projectNumber}
                onBookmarkClick={onProjectChange}
                totalProjects={totalProjects}
              />
            </div>

            {/* Project Image */}
            <div className="project-overlay-image-container">
              <div className="project-overlay-image">
                {/* Placeholder for project image */}
                <div className="project-image-placeholder">
                  <span className="project-image-number">{projectNumber}</span>
                </div>
              </div>
            </div>

            {/* Meta information */}
            <div className="project-overlay-meta">
              <span className="project-counter">
                {language === 'ar' 
                  ? `مشروع ${projectNumber} من ${totalProjects}`
                  : `Project ${projectNumber} of ${totalProjects}`
                }
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
