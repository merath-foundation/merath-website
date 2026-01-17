/**
 * PublicationGrid
 * Responsive grid layout for displaying publication cards
 */

import React from 'react';
import { Publication } from '../types/publication';
import PublicationCard from './PublicationCard';
import './PublicationGrid.css';

interface PublicationGridProps {
  publications: Publication[];
  selectedId: string | null;
  onSelectPublication: (publication: Publication) => void;
  direction: 'rtl' | 'ltr';
}

const PublicationGrid: React.FC<PublicationGridProps> = ({
  publications,
  selectedId,
  onSelectPublication,
  direction,
}) => {
  return (
    <div className="publication-grid">
      {publications.map((publication) => (
        <PublicationCard
          key={publication.id}
          publication={publication}
          isSelected={selectedId === publication.id}
          onSelect={onSelectPublication}
          direction={direction}
        />
      ))}
    </div>
  );
};

export default PublicationGrid;
