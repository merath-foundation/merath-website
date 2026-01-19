import React from 'react';
import { PortableTextRenderer } from './PortableTextRenderer';
import './Card.css';

interface CardProps {
  title: any;
  description: any;
  ctaLabel?: string;
  ctaHref?: string;
}

const Card: React.FC<CardProps> = ({ title, description, ctaLabel, ctaHref }) => {
  const renderContent = (value: any, className: string, as: 'h3' | 'p' = 'p') => {
    if (Array.isArray(value)) {
      return (
        <div className={className}>
          <PortableTextRenderer value={value} />
        </div>
      );
    }
    const Tag = as as any;
    return <Tag className={className}>{value}</Tag>;
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="card-content">
          {renderContent(title, 'card-title', 'h3')}
          {renderContent(description, 'card-description', 'p')}
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
