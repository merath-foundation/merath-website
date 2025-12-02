import { useEffect, useRef } from 'react';

type Position = { x: number; y: number };

const GRID_SIZE = 8;
const CELL_SIZE = 4;
const ANIMATION_SPEED = 200;

// Predefined maze path for the snake to follow
const MAZE_PATH: Position[] = [
  { x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 1 }, { x: 4, y: 1 }, { x: 5, y: 1 }, { x: 6, y: 1 },
  { x: 6, y: 2 }, { x: 6, y: 3 }, { x: 5, y: 3 }, { x: 4, y: 3 }, { x: 3, y: 3 }, { x: 2, y: 3 },
  { x: 1, y: 3 }, { x: 1, y: 4 }, { x: 1, y: 5 }, { x: 2, y: 5 }, { x: 3, y: 5 }, { x: 4, y: 5 },
  { x: 5, y: 5 }, { x: 6, y: 5 }, { x: 6, y: 6 }, { x: 5, y: 6 }, { x: 4, y: 6 }, { x: 3, y: 6 },
  { x: 2, y: 6 }, { x: 1, y: 6 },
];

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pathIndexRef = useRef(0);

  // Animation loop - move snake along predefined maze path
  useEffect(() => {
    const interval = setInterval(() => {
      pathIndexRef.current = (pathIndexRef.current + 1) % MAZE_PATH.length;
    }, ANIMATION_SPEED);

    return () => clearInterval(interval);
  }, []);

  // Draw maze animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      // Clear canvas with white background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw border
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      // Draw maze path (subtle gray)
      ctx.fillStyle = '#f5f5f5';
      for (const pos of MAZE_PATH) {
        ctx.fillRect(
          pos.x * CELL_SIZE,
          pos.y * CELL_SIZE,
          CELL_SIZE,
          CELL_SIZE
        );
      }

      // Draw moving snake head (black dot)
      const currentPos = MAZE_PATH[pathIndexRef.current];
      ctx.fillStyle = '#000000';
      ctx.fillRect(
        currentPos.x * CELL_SIZE + 1,
        currentPos.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    };

    const animationFrame = requestAnimationFrame(function animate() {
      draw();
      requestAnimationFrame(animate);
    });

    return () => cancelAnimationFrame(animationFrame);
  });

  return (
    <canvas
      ref={canvasRef}
      width={GRID_SIZE * CELL_SIZE}
      height={GRID_SIZE * CELL_SIZE}
      className="border border-neutral-300"
      style={{ width: '32px', height: '32px' }}
    />
  );
}
