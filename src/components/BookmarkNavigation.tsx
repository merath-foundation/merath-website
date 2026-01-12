import React from 'react';
import './BookmarkNavigation.css';

interface BookmarkNavigationProps {
  activeProjectId: number;
  onBookmarkClick: (projectId: number) => void;
  totalProjects: number;
}

const BookmarkNavigation: React.FC<BookmarkNavigationProps> = ({
  activeProjectId,
  onBookmarkClick,
  totalProjects
}) => {
  return (
    <nav className="bookmark-navigation">
      {Array.from({ length: totalProjects }, (_, i) => {
        const projectId = i + 1;
        return (
          <button
            key={projectId}
            className={`bookmark-tab ${activeProjectId === projectId ? 'bookmark-tab--active' : ''}`}
            onClick={() => onBookmarkClick(projectId)}
            aria-label={`Project ${projectId}`}
            aria-current={activeProjectId === projectId ? 'page' : undefined}
          >
            <span className="bookmark-number">{projectId}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default BookmarkNavigation;
