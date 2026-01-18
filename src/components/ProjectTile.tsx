import React from 'react';
import { Project } from '../types/project';
import './ProjectTile.css';

interface ProjectTileProps {
  project: Project;
  direction: 'rtl' | 'ltr';
  variant?: 'standard' | 'featured';
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project, direction, variant = 'standard' }) => {
  const { titleEn, titleAr, excerptEn, excerptAr, categoryEn, categoryAr, imageUrl } = project;

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
          {titleEn && <h3 className="project-tile-title-en">{titleEn}</h3>}
          {titleAr && (
            <h3 className="project-tile-title-ar" dir="rtl">
              {titleAr}
            </h3>
          )}
        </div>

        <div className="project-tile-categories">
          {categoryEn && <p className="project-tile-category-en">{categoryEn}</p>}
          {categoryAr && (
            <p className="project-tile-category-ar" dir="rtl">
              {categoryAr}
            </p>
          )}
        </div>

        <div className="project-tile-excerpts">
          {excerptEn && <p className="project-tile-excerpt-en">{excerptEn}</p>}
          {excerptAr && (
            <p className="project-tile-excerpt-ar" dir="rtl">
              {excerptAr}
            </p>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectTile;
