/**
 * PublicationCylinder
 * 3D cascading cylinder-style publication display
 * Inspired by immersive scroll experiences
 */

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Publication } from '../types/publication';
import './PublicationCylinder.css';

interface PublicationCylinderProps {
  publications: Publication[];
  selectedId: string | null;
  onSelectPublication: (publication: Publication) => void;
  direction: 'rtl' | 'ltr';
}

const PublicationCylinder: React.FC<PublicationCylinderProps> = ({
  publications,
  selectedId,
  onSelectPublication,
  direction,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const container = containerRef.current;
    const scrollTop = container.scrollTop;
    const scrollHeight = container.scrollHeight - container.clientHeight;
    const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
    
    setScrollProgress(progress);
    
    // Calculate active index based on scroll
    const itemCount = publications.length;
    const newActiveIndex = Math.min(
      Math.floor(progress * itemCount),
      itemCount - 1
    );
    setActiveIndex(newActiveIndex);
  }, [publications.length]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const getItemStyle = (index: number): React.CSSProperties => {
    const itemCount = publications.length;
    const visibleItems = 3;
    
    // Calculate position relative to current scroll
    const scrollOffset = scrollProgress * (itemCount - 1);
    const relativePosition = index - scrollOffset;
    
    // Cylinder effect - items curve away from center
    const angle = relativePosition * 35; // degrees of rotation
    const zOffset = Math.abs(relativePosition) * -80; // push back items further from center
    const yOffset = relativePosition * 180; // vertical spacing
    const opacity = Math.max(0, 1 - Math.abs(relativePosition) * 0.35);
    const scale = Math.max(0.6, 1 - Math.abs(relativePosition) * 0.15);
    
    // Only show items within visible range
    const isVisible = Math.abs(relativePosition) <= visibleItems;
    
    return {
      '--item-index': index,
      '--relative-pos': relativePosition,
      transform: `
        translateY(${yOffset}px) 
        translateZ(${zOffset}px) 
        rotateX(${-angle}deg)
        scale(${scale})
      `,
      opacity: isVisible ? opacity : 0,
      zIndex: 100 - Math.abs(Math.round(relativePosition * 10)),
      pointerEvents: isVisible && Math.abs(relativePosition) < 1.5 ? 'auto' : 'none',
    } as React.CSSProperties;
  };

  return (
    <div className="publication-cylinder-wrapper" dir={direction}>
      {/* Scroll container */}
      <div 
        ref={containerRef}
        className="publication-cylinder-scroll"
      >
        {/* Spacer to enable scrolling */}
        <div 
          className="publication-cylinder-spacer"
          style={{ height: `${publications.length * 200 + 400}px` }}
        />
      </div>

      {/* 3D Scene */}
      <div className="publication-cylinder-scene">
        <div className="publication-cylinder-stage">
          {publications.map((publication, index) => (
            <button
              key={publication.id}
              className={`publication-cylinder-item ${
                selectedId === publication.id ? 'publication-cylinder-item--selected' : ''
              } ${index === activeIndex ? 'publication-cylinder-item--active' : ''}`}
              style={getItemStyle(index)}
              onClick={() => onSelectPublication(publication)}
              aria-label={publication.title}
            >
              <div className="publication-cylinder-card">
                <div className="publication-cylinder-monogram">
                  {publication.monogram}
                </div>
                <div className="publication-cylinder-info">
                  <h3 className="publication-cylinder-title">{publication.title}</h3>
                  <div className="publication-cylinder-meta">
                    {publication.month && `${publication.month} `}
                    {publication.year}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation indicators */}
      <div className="publication-cylinder-nav">
        {publications.map((pub, index) => (
          <button
            key={`nav-${pub.id}`}
            className={`publication-cylinder-dot ${
              index === activeIndex ? 'publication-cylinder-dot--active' : ''
            }`}
            onClick={() => {
              if (!containerRef.current) return;
              const scrollHeight = containerRef.current.scrollHeight - containerRef.current.clientHeight;
              const targetScroll = (index / (publications.length - 1)) * scrollHeight;
              containerRef.current.scrollTo({ top: targetScroll, behavior: 'smooth' });
            }}
            aria-label={`Go to publication ${index + 1}`}
          />
        ))}
      </div>

      {/* Scroll hint */}
      <div className={`publication-cylinder-hint ${scrollProgress > 0.1 ? 'publication-cylinder-hint--hidden' : ''}`}>
        <span>Scroll to explore</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </div>
  );
};

export default PublicationCylinder;
