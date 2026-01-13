import React from 'react';
import './MenuToggleIcon.css';

interface MenuToggleIconProps {
  isOpen: boolean;
  variant?: 'default' | 'white';
}

/**
 * MenuToggleIcon: Ouroboros (snake eating its tail) that morphs
 * Closed: Circular snake with prominent head biting tail
 * Open: Snake uncoiling into S-curve
 */
const MenuToggleIcon: React.FC<MenuToggleIconProps> = ({ isOpen, variant = 'default' }) => {
  // Closed state: Refined angular snake with balanced proportions
  const closedBodyPath = 'M 18 18 L 42 18 L 42 32 L 52 32 L 52 48 L 28 48 L 28 38 L 10 38';
  
  // Open state: S-curve 
  const openBodyPath = 'M 46 20 Q 34 15, 26 28 Q 20 40, 14 38';
  
  const currentBodyPath = isOpen ? openBodyPath : closedBodyPath;
  
  return (
    <svg
      className={`menu-toggle-icon menu-toggle-icon--${variant}${isOpen ? ' menu-toggle-icon--open' : ''}`}
      width="50"
      height="50"
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="rotate(45 30 30)">
        {/* Snake body - refined angular path */}
        <path
          className="menu-toggle-snake-body"
          d={currentBodyPath}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Snake head - hollow circle at the tail end, offset to avoid intersection */}
        <circle
          className="menu-toggle-snake-head"
          cx={isOpen ? 46 : 5}
          cy={isOpen ? 20 : 38}
          r="5"
        />
        
        {/* Tail tip */}
        <circle
          className="menu-toggle-snake-tail"
          cx={isOpen ? 14 : 18}
          cy={isOpen ? 38 : 18}
          r="2.5"
        />
      </g>
    </svg>
  );
};

export default MenuToggleIcon;
