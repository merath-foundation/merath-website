import React from 'react';
import { Project } from '../types/project';
import { PortableTextRenderer } from './PortableTextRenderer';
import './ProjectTile.css';

interface ProjectTileProps {
  project: Project;
  direction: 'rtl' | 'ltr';
  variant?: 'standard' | 'featured';
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project, direction, variant = 'standard' }) => {
  const { titleEn, titleAr, excerptEn, excerptAr, categoryEn, categoryAr, imageUrl } = project;

  const renderText = (
    value: any,
    className: string,
    as: 'p' | 'h3' = 'p',
    dirOverride?: 'rtl' | 'ltr'
  ) => {
    if (!value) return null;
    if (Array.isArray(value)) {
      return (
        <div className={className} dir={dirOverride}>
          <PortableTextRenderer value={value} />
        </div>
      );
    }
    const Tag = as as any;
    return (
      <Tag className={className} dir={dirOverride}>
        {value}
      </Tag>
    );
  };

  const classes = ['project-tile'];
  if (variant === 'featured') classes.push('project-tile--featured');

  return (
    <article className={classes.join(' ')} dir={direction}>
      <div className="project-tile-image-col">
        {imageUrl ? (
          <img src={imageUrl} alt={titleEn || titleAr || 'Project image'} className="project-tile-image" />
        ) : (
          <div className="project-tile-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="project-tile-text-col">
        <div className="project-tile-titles">
          {renderText(titleEn, 'project-tile-title-en', 'h3')}
          {renderText(titleAr, 'project-tile-title-ar', 'h3', 'rtl')}
        </div>

        <div className="project-tile-categories">
          {renderText(categoryEn, 'project-tile-category-en')}
          {renderText(categoryAr, 'project-tile-category-ar', 'p', 'rtl')}
        </div>

        <div className="project-tile-excerpts">
          {renderText(excerptEn, 'project-tile-excerpt-en')}
          {renderText(excerptAr, 'project-tile-excerpt-ar', 'p', 'rtl')}
        </div>
      </div>
    </article>
  );
};

export default ProjectTile;
