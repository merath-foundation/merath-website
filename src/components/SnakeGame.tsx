import React, { useEffect, useMemo, useRef, useState } from 'react';
import './SnakeGame.css';

// SnakeGame aligns with Merath's identity: the snake is a thread of memory across a grid of regions;
// fragments represent artifacts; special "archive" items briefly slow time and reveal the trail of past paths.

type Direction = 'up' | 'down' | 'left' | 'right';

interface Position {
  x: number;
  y: number;
}

interface ThemeConfig {
  backgroundColor?: string;
  snakeColor?: string;
  fragmentColor?: string;
  specialItemColor?: string;
  trailColor?: string;
  borderColor?: string;
  textColor?: string;
}

interface Labels {
  gameOverTitle: string;
  gameOverSubtitle?: string;
  playAgainLabel: string;
  scoreLabel: string;
  controlsHint?: string;
  specialItemDescription?: string;
  caption?: string;
}

interface SnakeGameProps {
  language: 'ar' | 'en';
  gridSize: number;
  initialSpeedMs: number;
  maxSpeedMs?: number;
  enableSpecialItems?: boolean;
  showTouchControls?: boolean;
  theme?: ThemeConfig;
  labels: Labels;
  memoryFragments?: string[];
}

const clampGrid = (gridSize: number) => Math.max(6, Math.min(gridSize, 40));

const SnakeGame: React.FC<SnakeGameProps> = ({
  language,
  gridSize,
  initialSpeedMs,
  maxSpeedMs,
  enableSpecialItems = true,
  showTouchControls = true,
  theme,
  labels,
  memoryFragments = [],
}) => {
  const size = clampGrid(gridSize || 20);
  const safeInitialSpeed = Math.max(80, initialSpeedMs || 220);
  const minSpeed = maxSpeedMs ? Math.max(60, maxSpeedMs) : 120;

  const [snake, setSnake] = useState<Position[]>(() => [
    {x: Math.floor(size / 2), y: Math.floor(size / 2)},
    {x: Math.floor(size / 2) - 1, y: Math.floor(size / 2)},
    {x: Math.floor(size / 2) - 2, y: Math.floor(size / 2)},
  ]);
  const [direction, setDirection] = useState<Direction>('right');
  const [food, setFood] = useState<Position>(() => randomEmptyCell(size, []));
  const [special, setSpecial] = useState<Position | null>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [tick, setTick] = useState(0);
  const [specialTicks, setSpecialTicks] = useState(0);
  const [trail, setTrail] = useState<Position[]>([]);
  const [fragmentHint, setFragmentHint] = useState<string | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [speedMs, setSpeedMs] = useState(safeInitialSpeed);

  const dirRef = useRef<Direction>('right');
  const queuedDirRef = useRef<Direction | null>(null);
  const runningRef = useRef<boolean>(true);

  useEffect(() => {
    dirRef.current = direction;
  }, [direction]);

  // Main loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => step(), specialTicks > 0 ? Math.min(speedMs * 1.6, speedMs + 200) : speedMs);
    return () => clearInterval(interval);
  }, [speedMs, specialTicks, gameOver]);

  // Keyboard controls
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const key = e.key.toLowerCase();
    const map: Record<string, Direction> = {
      arrowup: 'up',
      w: 'up',
      arrowdown: 'down',
      s: 'down',
      arrowleft: 'left',
      a: 'left',
      arrowright: 'right',
      d: 'right',
    };
    if (map[key]) {
      e.preventDefault();
      queueDirection(map[key]);
    }
  };

  const queueDirection = (dir: Direction) => {
    const current = dirRef.current;
    if (isOpposite(current, dir)) return;
    queuedDirRef.current = dir;
  };

  const step = () => {
    setSnake((prev) => {
      const currentDir = queuedDirRef.current && !isOpposite(dirRef.current, queuedDirRef.current)
        ? queuedDirRef.current
        : dirRef.current;
      queuedDirRef.current = null;
      dirRef.current = currentDir;

      const head = prev[0];
      const nextHead = move(head, currentDir);

      if (nextHead.x < 0 || nextHead.y < 0 || nextHead.x >= size || nextHead.y >= size) {
        setGameOver(true);
        runningRef.current = false;
        return prev;
      }

      const bodyToCheck = food && positionsEqual(nextHead, food) ? prev : prev.slice(0, prev.length - 1);
      if (collides(nextHead, bodyToCheck)) {
        setGameOver(true);
        runningRef.current = false;
        return prev;
      }

      const isEating = positionsEqual(nextHead, food);
      const reachedSpecial = special && positionsEqual(nextHead, special);

      const grown = [nextHead, ...prev];
      const nextSnake = isEating ? grown : grown.slice(0, grown.length - 1);

      if (isEating) {
        setScore((s) => s + 1);
        setFood(randomEmptyCell(size, nextSnake, special));
        setSpeedMs((ms) => Math.max(minSpeed, ms - 6));
      }

      if (enableSpecialItems && reachedSpecial) {
        setSpecial(null);
        setSpecialTicks(30); // slows for ~30 ticks
        setTrail(prev);
        if (memoryFragments.length > 0) {
          setFragmentHint(pickFragment(memoryFragments));
        }
      }

      // Decay special timer
      setSpecialTicks((t) => Math.max(0, t - 1));

      // Maybe spawn a special item
      if (enableSpecialItems && !special && Math.random() < 0.08) {
        const spot = randomEmptyCell(size, nextSnake, food);
        setSpecial(spot);
      }

      setTick((t) => t + 1);
      return nextSnake;
    });
  };

  const reset = () => {
    const start = [
      {x: Math.floor(size / 2), y: Math.floor(size / 2)},
      {x: Math.floor(size / 2) - 1, y: Math.floor(size / 2)},
      {x: Math.floor(size / 2) - 2, y: Math.floor(size / 2)},
    ];
    setSnake(start);
    setDirection('right');
    dirRef.current = 'right';
    queuedDirRef.current = null;
    setFood(randomEmptyCell(size, start));
    setSpecial(null);
    setScore(0);
    setGameOver(false);
    setTick(0);
    setSpecialTicks(0);
    setTrail([]);
    setFragmentHint(null);
    setSpeedMs(safeInitialSpeed);
    runningRef.current = true;
  };

  const cells = useMemo(() => buildCellMap(size, snake, trail, special, food), [size, snake, trail, special, food]);

  const themeVars = {
    '--snake-bg': theme?.snakeColor || '#2b4c7e',
    '--food-bg': theme?.fragmentColor || '#c47a2c',
    '--special-bg': theme?.specialItemColor || '#2b7e4c',
    '--trail-bg': theme?.trailColor || 'rgba(43, 76, 126, 0.12)',
    '--frame-bg': theme?.backgroundColor || 'var(--merath-background, #f9f3e0)',
    '--frame-border': theme?.borderColor || '#d7d7d7',
    '--frame-text': theme?.textColor || '#1f2937',
  } as React.CSSProperties;

  const overlayTitle = labels.gameOverTitle || 'Game over';
  const overlaySubtitle = fragmentHint || labels.gameOverSubtitle || '';

  return (
    <div className="snake-shell" style={themeVars}>
      <div
        className="snake-frame"
        tabIndex={0}
        aria-label="Snake game: use arrow keys or WASD to move"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
      >
        <div className="snake-topbar">
          <div className="snake-score">{labels.scoreLabel}: {score}</div>
          <div className="snake-status-text">{labels.controlsHint}</div>
          <div className="snake-mode">
            <button className="snake-chip" onClick={() => setSpeedMs(safeInitialSpeed)} aria-label="Normal speed">Normal</button>
            <button className="snake-chip" onClick={() => setSpeedMs(Math.max(minSpeed, safeInitialSpeed * 0.75))} aria-label="Rapid recollection">Rapid</button>
          </div>
        </div>

        <div
          className="snake-board"
          style={{
            gridTemplateColumns: `repeat(${size}, 1fr)`,
            gridTemplateRows: `repeat(${size}, 1fr)`,
          }}
        >
          {cells.map((cell) => (
            <div
              key={cell.key}
              className={`snake-cell ${cell.type}`}
              style={{ backgroundColor: cell.color || undefined, opacity: cell.opacity }}
            />
          ))}
        </div>

        {labels.caption && <div className="snake-caption">{labels.caption}</div>}

        {gameOver && (
          <div className="snake-overlay" role="dialog" aria-live="assertive">
            <div className="snake-overlay-card">
              <h3 className="snake-overlay-title">{overlayTitle}</h3>
              {overlaySubtitle && <p className="snake-overlay-subtitle">{overlaySubtitle}</p>}
              <p className="snake-overlay-score">{labels.scoreLabel}: {score}</p>
              <button className="snake-btn" onClick={reset}>{labels.playAgainLabel}</button>
            </div>
          </div>
        )}
      </div>

      {showTouchControls && (
        <div className="snake-touch">
          <button aria-label="Up" onClick={() => queueDirection('up')}>↑</button>
          <div className="snake-touch-row">
            <button aria-label="Left" onClick={() => queueDirection('left')}>←</button>
            <button aria-label="Down" onClick={() => queueDirection('down')}>↓</button>
            <button aria-label="Right" onClick={() => queueDirection('right')}>→</button>
          </div>
        </div>
      )}

      {labels.specialItemDescription && (
        <div className="snake-footnote">{labels.specialItemDescription}</div>
      )}
    </div>
  );
};

function move(pos: Position, dir: Direction): Position {
  switch (dir) {
    case 'up':
      return {x: pos.x, y: pos.y - 1};
    case 'down':
      return {x: pos.x, y: pos.y + 1};
    case 'left':
      return {x: pos.x - 1, y: pos.y};
    case 'right':
    default:
      return {x: pos.x + 1, y: pos.y};
  }
}

function isOpposite(a: Direction, b: Direction) {
  return (a === 'up' && b === 'down') || (a === 'down' && b === 'up') || (a === 'left' && b === 'right') || (a === 'right' && b === 'left');
}

function positionsEqual(a?: Position | null, b?: Position | null) {
  return !!a && !!b && a.x === b.x && a.y === b.y;
}

function collides(head: Position, body: Position[]) {
  return body.some((p) => positionsEqual(p, head));
}

function randomEmptyCell(size: number, occupied: Position[], avoid?: Position | null): Position {
  const occupiedKeys = new Set(occupied.map((p) => `${p.x}-${p.y}`));
  if (avoid) occupiedKeys.add(`${avoid.x}-${avoid.y}`);
  let attempts = 0;
  while (attempts < 500) {
    const x = Math.floor(Math.random() * size);
    const y = Math.floor(Math.random() * size);
    const key = `${x}-${y}`;
    if (!occupiedKeys.has(key)) return {x, y};
    attempts += 1;
  }
  return {x: 0, y: 0};
}

function buildCellMap(
  boardSize: number,
  snake: Position[],
  trail: Position[],
  special: Position | null,
  food: Position,
): {key: string; type: string; color?: string; opacity?: number}[] {
  const entries: {key: string; type: string; color?: string; opacity?: number}[] = [];
  const snakeSet = new Set(snake.map((p) => `${p.x}-${p.y}`));
  const trailSet = new Set(trail.map((p) => `${p.x}-${p.y}`));

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const key = `${x}-${y}`;
      let type = '';
      let color: string | undefined;
      let opacity: number | undefined;
      if (snakeSet.has(key)) {
        type = 'cell-snake';
      } else if (food && x === food.x && y === food.y) {
        type = 'cell-food';
      } else if (special && x === special.x && y === special.y) {
        type = 'cell-special';
      } else if (trailSet.has(key)) {
        type = 'cell-trail';
        opacity = 1;
      } else {
        type = 'cell-empty';
      }
      entries.push({key, type, color, opacity});
    }
  }
  return entries;
}

function pickFragment(list: string[]) {
  return list[Math.floor(Math.random() * list.length)];
}

export default SnakeGame;
