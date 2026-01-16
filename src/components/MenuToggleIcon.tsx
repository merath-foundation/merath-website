import React, { useEffect, useRef, useState } from 'react';
import './MenuToggleIcon.css';

interface MenuToggleIconProps {
  isOpen: boolean;
  variant?: 'default' | 'white';
  className?: string;
}

/**
 * MenuToggleIcon: Merath snake logo (ouroboros) that animates on initial mount
 * and morphs between menu states.
 * 
 * Initial animation: Snake extends from compact zig-zag shape to full ouroboros pose
 * where the head reaches toward the tail, creating the illusion of the snake extending
 * to eat its tail. Animation uses stroke-dasharray drawing technique and runs once.
 * 
 * Final pose must exactly match the brand logo design.
 * 
 * Toggle behavior: Morphs between closed (compact) and open (extended) states.
 */
const MenuToggleIcon: React.FC<MenuToggleIconProps> = ({ 
  isOpen, 
  variant = 'default',
  className = ''
}) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  
  // Closed state: Compact zig-zag snake
  const closedBodyPath = 'M 18 18 L 42 18 L 42 32 L 52 32 L 52 48 L 28 48 L 28 38 L 10 38';
  
  // Open state: Extended snake eating its tail (final ouroboros pose)
  const openBodyPath = 'M 18 18 L 45 18 L 45 28 L 55 28 L 55 50 L 20 50 L 20 40 L 5 40';
  
  const currentBodyPath = isOpen ? openBodyPath : closedBodyPath;
  
  // Run stroke-dash drawing animation on mount
  useEffect(() => {
    if (hasAnimated || !pathRef.current) return;
    
    const path = pathRef.current;
    const pathLength = path.getTotalLength();
    
    // Set up initial state (invisible)
    path.style.strokeDasharray = `${pathLength}`;
    path.style.strokeDashoffset = `${pathLength}`;
    
    // Trigger animation after a brief delay to ensure styles are applied
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        path.style.transition = 'stroke-dashoffset 1s ease-in-out';
        path.style.strokeDashoffset = '0';
      });
    });
    
    // Clean up after animation completes
    const timer = setTimeout(() => {
      if (path) {
        path.style.strokeDasharray = '';
        path.style.strokeDashoffset = '';
        path.style.transition = '';
      }
      setHasAnimated(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [hasAnimated]);
  
  return (
    <svg
      className={`menu-toggle-icon menu-toggle-icon--${variant}${isOpen ? ' menu-toggle-icon--open' : ''} ${className}`}
      width="50"
      height="50"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(45 30 30)">
        {/* Snake body - single continuous path that animates via stroke-dash drawing */}
        <path
          ref={pathRef}
          className="menu-toggle-snake-body"
          d={currentBodyPath}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Snake head - hollow circle that marks where the head meets the tail */}
        <circle
          className={`menu-toggle-snake-head${hasAnimated ? ' menu-toggle-snake-head--animated' : ''}`}
          cx={isOpen ? 8 : 5}
          cy={38}
          r="5"
        />
        
        {/* Tail tip - solid circle */}
        <circle
          className={`menu-toggle-snake-tail${hasAnimated ? ' menu-toggle-snake-tail--animated' : ''}`}
          cx={isOpen ? 14 : 18}
          cy={isOpen ? 38 : 18}
          r="2.5"
        />
      </g>
    </svg>
  );
};

export default MenuToggleIcon;
