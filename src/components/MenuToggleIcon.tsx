import React from 'react';
import './MenuToggleIcon.css';

interface MenuToggleIconProps {
  isOpen: boolean;
  variant?: 'default' | 'white';
}

/**
 * MenuToggleIcon: An ouroboros (snake eating its tail) icon that morphs
 * between a closed circular state and an open half-moon crescent state.
 * 
 * Closed: Nearly complete circle with small gap at "mouth", head dot positioned before gap
 * Open: Top half-moon arc with head dot sliding along the visible arc
 */
const MenuToggleIcon: React.FC<MenuToggleIconProps> = ({ isOpen, variant = 'default' }) => {
  // SVG viewBox is 60x60 centered on (30, 30)
  // Radius = 16 for good visibility at 50x50 size
  
  // Closed state: Nearly complete circle with small gap at the top
  // Draws a circle from right side, counter-clockwise, stopping just before top
  const closedPathD = 'M 46 30 A 16 16 0 1 1 30.5 14 A 16 16 0 0 1 46 30';
  
  // Open state: Top half-moon crescent only
  // Arc from top-right to top-left, showing only the top portion
  const openPathD = 'M 46 30 A 16 16 0 0 1 14 30 A 10 10 0 0 0 46 30';
  
  // Head dot position coordinates
  // In closed state: positioned at the gap (top of circle)
  const closedHeadX = 30;
  const closedHeadY = 13.5;
  
  // In open state: positioned at top-right of the crescent
  const openHeadX = 43;
  const openHeadY = 15;
  
  const currentPathD = isOpen ? openPathD : closedPathD;
  const currentHeadX = isOpen ? openHeadX : closedHeadX;
  const currentHeadY = isOpen ? openHeadY : closedHeadY;
  
  return (
    <svg
      className={`menu-toggle-icon menu-toggle-icon--${variant}${isOpen ? ' menu-toggle-icon--open' : ''}`}
      width="50"
      height="50"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main ouroboros path - morphs between states */}
      <path
        className="menu-toggle-snake"
        d={currentPathD}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Head dot - stays on the path */}
      <circle
        className="menu-toggle-head"
        cx={currentHeadX}
        cy={currentHeadY}
        r="2"
      />
    </svg>
  );
};

export default MenuToggleIcon;
