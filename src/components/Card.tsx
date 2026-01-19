import React from 'react';
import './Card.css';

interface CardProps {
  title: string;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
}

const Card: React.FC<CardProps> = ({ title, description, ctaLabel, ctaHref }) => {
  return (
    <div className="card">
      <div className="card-body">
        <div className="card-content">
          <h3 className="card-title">{title}</h3>
          <p className="card-description">{description}</p>
          {ctaLabel && ctaHref && (
            <a href={ctaHref} className="card-cta" aria-label={ctaLabel}>
              {ctaLabel}
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
