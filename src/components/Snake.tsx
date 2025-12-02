import { useEffect, useRef, useState } from 'react';

const SNAKE_LENGTH = 15;
const GRID_SIZE = 20; // pixels per grid cell
const MOVE_INTERVAL = 100; // ms between moves

interface Position {
  x: number;
  y: number;
}

export function Snake() {
  const [segments, setSegments] = useState<Position[]>([]);
  const [isGrowing, setIsGrowing] = useState(true);
  const targetGridPos = useRef<Position>({ x: 5, y: 5 });
  const pathHistory = useRef<Position[]>([{ x: 5, y: 5 }]);

  // Convert screen coordinates to grid coordinates
  const screenToGrid = (screenX: number, screenY: number): Position => ({
    x: Math.floor(screenX / GRID_SIZE),
    y: Math.floor(screenY / GRID_SIZE),
  });

  // Convert grid coordinates to screen coordinates
  const gridToScreen = (gridX: number, gridY: number): Position => ({
    x: gridX * GRID_SIZE,
    y: gridY * GRID_SIZE,
  });

  // Track mouse position and convert to grid
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetGridPos.current = screenToGrid(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Initial growth animation
  useEffect(() => {
    if (isGrowing && segments.length < SNAKE_LENGTH) {
      const timer = setTimeout(() => {
        const startPos = gridToScreen(5, 5);
        setSegments(prev => [...prev, startPos]);
        // Add to path history
        if (pathHistory.current.length === 0) {
          pathHistory.current = [{ x: 5, y: 5 }];
        }
      }, 100);
      return () => clearTimeout(timer);
    } else if (segments.length >= SNAKE_LENGTH) {
      setIsGrowing(false);
    }
  }, [segments, isGrowing]);

  // Main movement loop - grid-based movement
  useEffect(() => {
    if (isGrowing) return;

    const interval = setInterval(() => {
      const currentHead = pathHistory.current[0] || { x: 5, y: 5 };
      const target = targetGridPos.current;

      // Calculate next move (one grid cell at a time towards target)
      let nextX = currentHead.x;
      let nextY = currentHead.y;

      const dx = target.x - currentHead.x;
      const dy = target.y - currentHead.y;

      // Move one step at a time, prioritizing the larger distance
      if (Math.abs(dx) > Math.abs(dy)) {
        nextX = currentHead.x + Math.sign(dx);
      } else if (Math.abs(dy) > 0) {
        nextY = currentHead.y + Math.sign(dy);
      } else if (Math.abs(dx) > 0) {
        nextX = currentHead.x + Math.sign(dx);
      }

      const nextGridPos = { x: nextX, y: nextY };

      // Add new head position to path history
      pathHistory.current = [nextGridPos, ...pathHistory.current];

      // Keep only as many positions as we have segments
      if (pathHistory.current.length > SNAKE_LENGTH) {
        pathHistory.current = pathHistory.current.slice(0, SNAKE_LENGTH);
      }

      // Update segments to follow the path
      const newSegments = pathHistory.current.map(gridPos => 
        gridToScreen(gridPos.x, gridPos.y)
      );

      setSegments(newSegments);
    }, MOVE_INTERVAL);

    return () => clearInterval(interval);
  }, [isGrowing]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {segments.map((pos, index) => (
        <div
          key={index}
          className={`absolute ${
            index === 0 ? 'bg-black' : 'bg-black/90'
          }`}
          style={{
            width: GRID_SIZE - 2,
            height: GRID_SIZE - 2,
            left: pos.x + 1,
            top: pos.y + 1,
            opacity: isGrowing ? (index + 1) / SNAKE_LENGTH : 1,
          }}
        />
      ))}
    </div>
  );
}