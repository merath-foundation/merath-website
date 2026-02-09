import React from 'react';
import { Project } from '../types/project';
import ProjectTile from './ProjectTile';
import './ProjectsGrid.css';

interface ProjectsGridProps {
  projects: Project[];
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  onSelect?: (index: number) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, direction, language, onSelect }) => {
  const numCols = 2;
  const numRows = Math.ceil(projects.length / numCols);

  return (
    <div 
      className="projects-grid-layout" 
      style={{ 
        '--num-cols': numCols,
        '--num-rows': numRows,
        '--total-items': projects.length
      } as React.CSSProperties}
    >
      {projects.map((project, idx) => {
        const row = Math.floor(idx / numCols);
        const col = idx % numCols;
        const isLastRow = row === numRows - 1;
        const isLastCol = col === numCols - 1;
        const isLastItem = idx === projects.length - 1;
        
        return (
          <div 
            key={project.id} 
            className="projects-grid-cell"
            data-row={row}
            data-col={col}
            data-idx={idx}
            data-last-row={isLastRow}
            data-last-col={isLastCol}
            data-last-item={isLastItem}
          >
            <ProjectTile
              project={project}
              direction={direction}
              language={language}
              onSelect={onSelect ? () => onSelect(idx) : undefined}
              index={idx}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ProjectsGrid;
