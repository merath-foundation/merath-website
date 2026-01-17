/**
 * PublicationCard
 * Flat, monogram-style card representing a single publication
 */

import React from 'react';
import { Publication } from '../types/publication';
import './PublicationCard.css';

interface PublicationCardProps {
  publication: Publication;
  isSelected: boolean;
  onSelect: (publication: Publication) => void;
  direction: 'rtl' | 'ltr';
}

const PublicationCard: React.FC<PublicationCardProps> = ({
  publication,
  isSelected,
  onSelect,
  direction,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(publication);
    }
  };

  return (
    <button
      className={`publication-card ${isSelected ? 'publication-card--selected' : ''}`}
      onClick={() => onSelect(publication)}
      onKeyDown={handleKeyDown}
      aria-expanded={isSelected}
      aria-controls={`publication-detail-${publication.id}`}
      title={publication.title}
      dir={direction}
    >
      <div className="publication-card-monogram">{publication.monogram}</div>
      <div className="publication-card-meta">
        <div className="publication-card-date">
          {publication.month && `${publication.month} `}
          {publication.year}
        </div>
      </div>
    </button>
  );
};

export default PublicationCard;
