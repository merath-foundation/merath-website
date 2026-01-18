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
      <svg className="card-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 21.3334V16.0001M16 10.6667H16.0133M29.3333 16.0001C29.3333 23.3639 23.3638 29.3334 16 29.3334C8.63616 29.3334 2.66663 23.3639 2.66663 16.0001C2.66663 8.63628 8.63616 2.66675 16 2.66675C23.3638 2.66675 29.3333 8.63628 29.3333 16.0001Z" stroke="#1E1E1E" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
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
