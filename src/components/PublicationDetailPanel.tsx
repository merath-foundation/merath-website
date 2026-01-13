/**
 * PublicationDetailPanel
 * Side panel that slides in from the right, displaying full publication details
 */

import React, { useEffect, useRef } from 'react';
import { Publication } from '../data/publicationsData';
import './PublicationDetailPanel.css';

interface PublicationDetailPanelProps {
  publication: Publication | null;
  isOpen: boolean;
  onClose: () => void;
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
}

const PublicationDetailPanel: React.FC<PublicationDetailPanelProps> = ({
  publication,
  isOpen,
  onClose,
  direction,
  language,
}) => {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Handle Escape key to close panel
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    globalThis.addEventListener('keydown', handleKeyDown);
    return () => globalThis.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Focus management: focus close button when panel opens
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  if (!publication) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`publication-detail-backdrop ${isOpen ? 'publication-detail-backdrop--visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Detail panel */}
      <section
        ref={panelRef}
        id={`publication-detail-${publication.id}`}
        className={`publication-detail-panel ${isOpen ? 'publication-detail-panel--open' : ''}`}
        dir={direction}
        aria-label={`Details for ${publication.title}`}
      >
        {/* Close button */}
        <button
          ref={closeButtonRef}
          className="publication-detail-close"
          onClick={onClose}
          aria-label={language === 'ar' ? 'إغلاق' : 'Close'}
        >
          ×
        </button>

        {/* Image section */}
        <div className="publication-detail-image-container">
          <img
            src={publication.imageUrl}
            alt={`Cover of ${publication.title}`}
            className="publication-detail-image"
            onError={(e) => {
              // Fallback placeholder styling if image fails
              (e.target as HTMLImageElement).style.backgroundColor = '#f0f0f0';
            }}
          />
        </div>

        {/* Content section */}
        <div className="publication-detail-content">
          {/* Title */}
          <h1 className="publication-detail-title">{publication.title}</h1>

          {/* Authors */}
          <p className="publication-detail-authors">{publication.authors}</p>

          {/* Year and tags */}
          <div className="publication-detail-meta">
            <span className="publication-detail-year">{publication.year}</span>
            {publication.tags.length > 0 && (
              <div className="publication-detail-tags">
                {publication.tags.map((tag) => (
                  <span key={tag} className="publication-detail-tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Description */}
          <p className="publication-detail-description">{publication.description}</p>

          {/* Links section */}
          {(publication.pdfUrl || publication.externalUrl) && (
            <div className="publication-detail-links">
              {publication.pdfUrl && (
                <a
                  href={publication.pdfUrl}
                  className="publication-detail-link publication-detail-link--pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === 'ar' ? 'تحميل PDF' : 'Download PDF'}
                </a>
              )}
              {publication.externalUrl && (
                <a
                  href={publication.externalUrl}
                  className="publication-detail-link publication-detail-link--external"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {language === 'ar' ? 'اقرأ أكثر' : 'Read More'}
                </a>
              )}
            </div>
          )}

          {/* Notes section */}
          {publication.notes && (
            <div className="publication-detail-notes">
              <p className="publication-detail-note-text">{publication.notes}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default PublicationDetailPanel;
