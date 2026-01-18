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
  const [headPos, setHeadPos] = useState<{x: number; y: number}>({x: 5, y: 38});
  const [tailPos, setTailPos] = useState<{x: number; y: number}>({x: 18, y: 18});
  const pathRef = useRef<SVGPathElement>(null);
  const dashRef = useRef<number>();
  const rafRef = useRef<number>();
  
  // Closed state: Compact zig-zag snake
  const closedBodyPath = 'M 18 18 L 42 18 L 42 32 L 52 32 L 52 48 L 28 48 L 28 38 L 10 38';
  
  // Open state: Extended snake eating its tail (final ouroboros pose)
  const openBodyPath = 'M 18 18 L 45 18 L 45 28 L 55 28 L 55 50 L 20 50 L 20 40 L 5 40';
  
  const currentBodyPath = isOpen ? openBodyPath : closedBodyPath;
  
  // Initialize positions and tail anchor once the path is ready.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();

    const tailPoint = path.getPointAtLength(0);
    setTailPos({x: tailPoint.x, y: tailPoint.y});

    if (dashRef.current === undefined) {
      dashRef.current = isOpen ? 0 : length;
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${dashRef.current}`;
      const headPoint = path.getPointAtLength(Math.max(0, length - dashRef.current));
      setHeadPos({x: headPoint.x, y: headPoint.y});
      setHasAnimated(true);
    }
  }, [currentBodyPath, isOpen]);

  // Animate head along the path on toggle while drawing the stroke behind it.
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;

    const from = dashRef.current ?? (isOpen ? length : 0);
    const to = isOpen ? 0 : length;
    const duration = 650;
    const easeOutBack = (t: number) => {
      const c1 = 1.7;
      const c3 = c1 + 1;
      return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    const start = performance.now();

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = easeOutBack(t);
      const offset = from + (to - from) * eased;
      dashRef.current = offset;
      path.style.strokeDashoffset = `${offset}`;

      const headAt = Math.max(0, Math.min(length, length - offset));
      const headPoint = path.getPointAtLength(headAt);
      setHeadPos({x: headPoint.x, y: headPoint.y});

      if (t < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        rafRef.current = undefined;
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen, currentBodyPath]);
  
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
          cx={headPos?.x ?? (isOpen ? 8 : 5)}
          cy={headPos?.y ?? 38}
          r="5"
        />
        
        {/* Tail tip - solid circle */}
        <circle
          className={`menu-toggle-snake-tail${hasAnimated ? ' menu-toggle-snake-tail--animated' : ''}`}
          cx={tailPos?.x ?? (isOpen ? 14 : 18)}
          cy={tailPos?.y ?? (isOpen ? 38 : 18)}
          r="2.5"
        />
      </g>
    </svg>
  );
};

export default MenuToggleIcon;
