import React from 'react';
import { Project } from '../types/project';
import { PortableTextRenderer } from './PortableTextRenderer';
import './ProjectTile.css';

interface ProjectTileProps {
  project: Project;
  direction: 'rtl' | 'ltr';
  language: 'ar' | 'en';
  variant?: 'standard' | 'featured';
  onSelect?: () => void;
}

const ProjectTile: React.FC<ProjectTileProps> = ({ project, direction, language, variant = 'standard', onSelect }) => {
  const { titleEn, titleAr, excerptEn, excerptAr, categoryEn, categoryAr, imageUrl } = project;

  // Strict pick: only show the current language; do not fall back to the other language to avoid double-language rendering
  const pickByLanguage = (enVal: any, arVal: any) => (language === 'ar' ? (arVal ?? '') : (enVal ?? ''));

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

  const titleValue = pickByLanguage(titleEn, titleAr);
  const categoryValue = pickByLanguage(categoryEn, categoryAr);
  const excerptValue = pickByLanguage(excerptEn, excerptAr);
  const dirOverride = language === 'ar' ? 'rtl' : undefined;

  const classes = ['project-tile'];
  if (variant === 'featured') classes.push('project-tile--featured');

  return (
    <article
      className={classes.join(' ')}
      dir={direction}
      onClick={onSelect}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : -1}
      onKeyDown={(e) => {
        if (!onSelect) return;
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
    >
      <div className="project-tile-image-col">
        {imageUrl ? (
          <img src={imageUrl} alt={titleEn || titleAr || 'Project image'} className="project-tile-image" />
        ) : (
          <div className="project-tile-placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="project-tile-text-col">
        <div className="project-tile-titles">
          {renderText(titleValue, language === 'ar' ? 'project-tile-title-ar' : 'project-tile-title-en', 'h3', dirOverride)}
        </div>

        <div className="project-tile-categories">
          {renderText(categoryValue, language === 'ar' ? 'project-tile-category-ar' : 'project-tile-category-en', 'p', dirOverride)}
        </div>

        <div className="project-tile-excerpts">
          {renderText(excerptValue, language === 'ar' ? 'project-tile-excerpt-ar' : 'project-tile-excerpt-en', 'p', dirOverride)}
        </div>
      </div>
    </article>
  );
};

export default ProjectTile;
