import { useState, useRef, useEffect, useCallback } from 'react';
import { useAnimationFrame } from '../hooks/useAnimationFrame';
import { useLanguage } from '../contexts/LanguageContext';

const PROMPTS = {
  en: ['Oral histories', 'Textile archives', 'Urban memory', 'Migration stories', 'Musical traditions'],
  ar: ['التواريخ الشفوية', 'أرشيف النسيج', 'الذاكرة الحضرية', 'قصص الهجرة', 'التقاليد الموسيقية']
};

const COMPLETION_MESSAGE = {
  en: 'Every path is a story. Explore the projects below.',
  ar: 'كل طريق هو قصة. استكشف المشاريع أدناه.'
};

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const MOVE_SPEED = 0.08;

// Maze walkable cells (approximation of logo corridors)
// 1 = walkable, 0 = wall
const MAZE_MAP = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,0,1,1,1,1,1,1,0,1,1,1,1,1,1,0],
  [0,1,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,1,0,0,1,0,1,0,0,0,0,1,0,1,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,0,1,1,0],
  [0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,0,0,0],
  [0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,1,0],
  [0,1,1,1,1,0,0,0,1,0,0,0,0,0,1,1,1,1,1,0],
  [0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,0,0,0,0],
  [0,1,1,1,1,0,1,0,0,0,0,0,1,0,1,1,1,1,1,0],
  [0,1,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0],
  [0,1,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0],
  [0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,1,0],
  [0,0,0,0,0,0,1,0,1,1,1,1,1,1,1,0,1,0,1,0],
  [0,1,1,1,1,1,1,0,1,0,0,0,0,0,1,1,1,1,1,0],
  [0,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

// Memory nodes positions (grid coordinates)
const MEMORY_NODES = [
  { x: 3, y: 4, id: 0 },
  { x: 10, y: 8, id: 1 },
  { x: 15, y: 6, id: 2 },
  { x: 7, y: 14, id: 3 },
  { x: 16, y: 11, id: 4 },
];

type Direction = 'up' | 'down' | 'left' | 'right' | null;

export function LogoSnakeExperience() {
  const { language } = useLanguage();
  const [position, setPosition] = useState({ x: 1, y: 1 });
  const [direction, setDirection] = useState<Direction>(null);
  const [collectedNodes, setCollectedNodes] = useState<Set<number>>(new Set());
  const [activePrompt, setActivePrompt] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const moveAccumulator = useRef(0);

  // Check if position is valid
  const isValidPosition = useCallback((x: number, y: number) => {
    if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return false;
    return MAZE_MAP[y][x] === 1;
  }, []);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused || isComplete) return;

      const keyMap: Record<string, Direction> = {
        'ArrowUp': 'up',
        'ArrowDown': 'down',
        'ArrowLeft': 'left',
        'ArrowRight': 'right',
        'w': 'up',
        'W': 'up',
        's': 'down',
        'S': 'down',
        'a': 'left',
        'A': 'left',
        'd': 'right',
        'D': 'right',
      };

      const newDirection = keyMap[e.key];
      if (newDirection) {
        e.preventDefault();
        setDirection(newDirection);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPaused, isComplete]);

  // Check for intersection observer to pause when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Animation loop
  const animate = useCallback((deltaTime: number) => {
    if (!direction || isPaused || isComplete || !isVisible) return;

    moveAccumulator.current += deltaTime * MOVE_SPEED;

    if (moveAccumulator.current >= 1) {
      moveAccumulator.current = 0;

      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        switch (direction) {
          case 'up': newY -= 1; break;
          case 'down': newY += 1; break;
          case 'left': newX -= 1; break;
          case 'right': newX += 1; break;
        }

        if (!isValidPosition(newX, newY)) {
          return prev;
        }

        return { x: newX, y: newY };
      });
    }
  }, [direction, isPaused, isComplete, isVisible, isValidPosition]);

  useAnimationFrame(animate, !isPaused && !isComplete && isVisible);

  // Check for node collection
  useEffect(() => {
    const node = MEMORY_NODES.find(n => n.x === position.x && n.y === position.y);
    if (node && !collectedNodes.has(node.id)) {
      setCollectedNodes(prev => new Set([...prev, node.id]));
      setActivePrompt(PROMPTS[language][node.id]);
      
      setTimeout(() => setActivePrompt(null), 2000);

      if (collectedNodes.size + 1 === MEMORY_NODES.length) {
        setTimeout(() => setIsComplete(true), 2000);
      }
    }
  }, [position, collectedNodes, language]);

  // Prefer reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsPaused(true);
    }
  }, []);

  return (
    <section 
      ref={containerRef}
      className="logo-maze-experience"
      aria-label="Interactive logo maze"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto var(--space-xxl)',
        aspectRatio: '1',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          border: '1px solid var(--border-primary)',
          background: 'var(--bg-primary)',
        }}
      >
        {/* Maze grid */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
            gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)`,
          }}
        >
          {MAZE_MAP.flat().map((cell, i) => (
            <div
              key={i}
              style={{
                background: cell === 1 ? 'transparent' : 'var(--text-primary)',
                opacity: cell === 1 ? 0 : 0.9,
              }}
            />
          ))}
        </div>

        {/* Memory nodes */}
        {MEMORY_NODES.map(node => (
          !collectedNodes.has(node.id) && (
            <div
              key={node.id}
              style={{
                position: 'absolute',
                left: `${(node.x / GRID_SIZE) * 100}%`,
                top: `${(node.y / GRID_SIZE) * 100}%`,
                width: `${(1 / GRID_SIZE) * 100}%`,
                height: `${(1 / GRID_SIZE) * 100}%`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '50%',
                  height: '50%',
                  borderRadius: '50%',
                  background: 'var(--accent-primary)',
                  opacity: 0.6,
                }}
              />
            </div>
          )
        ))}

        {/* Cursor */}
        <div
          style={{
            position: 'absolute',
            left: `${(position.x / GRID_SIZE) * 100}%`,
            top: `${(position.y / GRID_SIZE) * 100}%`,
            width: `${(1 / GRID_SIZE) * 100}%`,
            height: `${(1 / GRID_SIZE) * 100}%`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'left 0.1s linear, top 0.1s linear',
          }}
        >
          <div
            style={{
              width: '60%',
              height: '60%',
              borderRadius: '50%',
              background: 'var(--accent-primary)',
              border: '2px solid var(--bg-primary)',
            }}
          />
        </div>

        {/* Active prompt */}
        {activePrompt && (
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              padding: 'var(--space-md)',
              background: 'rgba(0, 0, 0, 0.9)',
              color: 'var(--bg-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              fontWeight: 500,
              borderRadius: '4px',
              animation: 'fadeIn 0.3s',
            }}
          >
            {activePrompt}
          </div>
        )}

        {/* Completion message */}
        {isComplete && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: 'var(--space-lg)',
            }}
          >
            <div
              style={{
                textAlign: 'center',
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-xl)',
                color: 'var(--text-primary)',
                maxWidth: '70%',
              }}
            >
              {COMPLETION_MESSAGE[language]}
            </div>
          </div>
        )}
      </div>

      {/* Controls hint */}
      <div
        style={{
          marginTop: 'var(--space-sm)',
          textAlign: 'center',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--text-muted)',
        }}
      >
        {language === 'en' 
          ? 'Use arrow keys or WASD to explore the maze' 
          : 'استخدم مفاتيح الأسهم أو WASD لاستكشاف المتاهة'
        }
      </div>

      {/* Pause button */}
      <button
        onClick={() => setIsPaused(!isPaused)}
        style={{
          marginTop: 'var(--space-sm)',
          padding: 'var(--space-xs) var(--space-md)',
          border: '1px solid var(--border-primary)',
          background: 'transparent',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
        aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
      >
        {isPaused 
          ? (language === 'en' ? 'Resume' : 'استئناف')
          : (language === 'en' ? 'Pause' : 'إيقاف مؤقت')
        }
      </button>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </section>
  );
}
