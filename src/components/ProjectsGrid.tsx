import React from 'react';
import { Project } from '../types/project';
import ProjectTile from './ProjectTile';
import './ProjectsGrid.css';

interface ProjectsGridProps {
  projects: Project[];
  direction: 'rtl' | 'ltr';
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, direction }) => {
  return (
    <div className="projects-grid-layout">
      {projects.map((project) => (
        <ProjectTile key={project.id} project={project} direction={direction} />
      ))}
    </div>
  );
};

export default ProjectsGrid;
