import React from 'react';
import { Project } from '../types/project';
import ProjectTile from './ProjectTile';
import './ProjectsGrid.css';

interface ProjectsGridProps {
  projects: Project[];
  direction: 'rtl' | 'ltr';
  onSelect?: (index: number) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, direction, onSelect }) => {
  return (
    <div className="projects-grid-layout">
      {projects.map((project, idx) => (
        <ProjectTile
          key={project.id}
          project={project}
          direction={direction}
          onSelect={onSelect ? () => onSelect(idx) : undefined}
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
