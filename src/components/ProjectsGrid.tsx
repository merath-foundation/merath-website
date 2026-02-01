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
  return (
    <div className="projects-grid-layout">
      {projects.map((project, idx) => (
        <ProjectTile
          key={project.id}
          project={project}
          direction={direction}
          language={language}
          onSelect={onSelect ? () => onSelect(idx) : undefined}
          index={idx}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
