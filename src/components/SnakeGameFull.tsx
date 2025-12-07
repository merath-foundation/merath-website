import { useEffect, useRef, useState, useCallback } from 'react';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const HIGH_SCORE_STORAGE_KEY = 'merath-snake-highscore';

export function SnakeGameFull() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);

  // Load high score from localStorage
  useEffect(() => {
    const savedHighScore = localStorage.getItem(HIGH_SCORE_STORAGE_KEY);
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10));
    }
  }, []);

  // Generate random food position
  const generateFood = useCallback((currentSnake: Position[]): Position => {
    let newFood: Position;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
    return newFood;
  }, []);

  // Check collision
  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    // Self collision
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameInterval = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        // Move head
        switch (direction) {
          case 'UP':
            head.y -= 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
        }

        // Check collision
        if (checkCollision(head, prevSnake)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check if food eaten
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem(HIGH_SCORE_STORAGE_KEY, newScore.toString());
            }
            return newScore;
          });
          setFood(generateFood(newSnake));
          setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT)); // Increase speed
          return newSnake;
        } else {
          newSnake.pop(); // Remove tail
          return newSnake;
        }
      });
    }, speed);

    return () => clearInterval(gameInterval);
  }, [direction, gameOver, isPaused, food, generateFood, checkCollision, speed, highScore]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameOver) return;

      switch (e.key) {
        case 'ArrowUp':
        case 'w':
        case 'W':
          e.preventDefault();
          setDirection(prev => (prev === 'DOWN' ? prev : 'UP'));
          if (isPaused) setIsPaused(false);
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          e.preventDefault();
          setDirection(prev => (prev === 'UP' ? prev : 'DOWN'));
          if (isPaused) setIsPaused(false);
          break;
        case 'ArrowLeft':
        case 'a':
        case 'A':
          e.preventDefault();
          setDirection(prev => (prev === 'RIGHT' ? prev : 'LEFT'));
          if (isPaused) setIsPaused(false);
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          e.preventDefault();
          setDirection(prev => (prev === 'LEFT' ? prev : 'RIGHT'));
          if (isPaused) setIsPaused(false);
          break;
        case ' ':
          e.preventDefault();
          setIsPaused(prev => !prev);
          break;
      }
    };

    globalThis.addEventListener('keydown', handleKeyPress);
    return () => globalThis.removeEventListener('keydown', handleKeyPress);
  }, [gameOver, isPaused]);

  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid (subtle)
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, GRID_SIZE * CELL_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(GRID_SIZE * CELL_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw snake with gradient
    for (let index = 0; index < snake.length; index++) {
      const segment = snake[index];
      const opacity = 1 - (index / snake.length) * 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    }

    // Draw food with pulsing effect
    const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
    ctx.fillStyle = `rgba(255, 255, 255, ${pulse})`;
    ctx.fillRect(
      food.x * CELL_SIZE + 3,
      food.y * CELL_SIZE + 3,
      CELL_SIZE - 6,
      CELL_SIZE - 6
    );
  }, [snake, food]);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(true);
    setSpeed(INITIAL_SPEED);
  };

  // Touch controls for mobile
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart || gameOver) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (deltaX > 0) {
        setDirection(prev => (prev === 'LEFT' ? prev : 'RIGHT'));
      } else {
        setDirection(prev => (prev === 'RIGHT' ? prev : 'LEFT'));
      }
    } else if (deltaY > 0) {
      setDirection(prev => (prev === 'UP' ? prev : 'DOWN'));
    } else {
      setDirection(prev => (prev === 'DOWN' ? prev : 'UP'));
    }

    if (isPaused) setIsPaused(false);
    setTouchStart(null);
  };

  const scoreDisplay = score.toString().padStart(4, '0');
  const highScoreDisplay = highScore.toString().padStart(4, '0');
  const isNewHighScore = score > 0 && score === highScore;
  const statusTone = gameOver ? 'danger' : isPaused ? 'idle' : 'active';
  const statusLabel = gameOver
    ? 'Archive interrupted — tap reset to try again.'
    : isPaused
      ? 'Press start or use the arrow keys to begin.'
      : 'Recording in progress. Keep collecting.';

  const primaryLabel = gameOver
    ? 'Replay Session'
    : isPaused
      ? 'Start Session'
      : 'Pause Session';

  const handlePrimaryAction = () => {
    if (gameOver) {
      resetGame();
      return;
    }
    setIsPaused(prev => !prev);
  };

  return (
    <section className="snake-game" aria-label="Interactive snake archive">
      <div className="snake-game__hud">
        <div className="snake-game__score">
          <span>Score</span>
          <strong>{scoreDisplay}</strong>
          {isNewHighScore && <span className="snake-game__badge">New High</span>}
        </div>
        <div className="snake-game__meta">
          <span>High</span>
          <strong>{highScoreDisplay}</strong>
          <span className="snake-game__speed">Speed {Math.round(300 - speed)}%</span>
        </div>
      </div>

      <div
        className="snake-game__frame"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <canvas
          ref={canvasRef}
          width={GRID_SIZE * CELL_SIZE}
          height={GRID_SIZE * CELL_SIZE}
          className="snake-game__canvas"
        />
        <div className="snake-game__frame-glow" aria-hidden="true" />
      </div>

      <div className="snake-game__info">
        <div
          className={`snake-game__status snake-game__status--${statusTone}`}
          aria-live="polite"
        >
          {statusLabel}
        </div>

        <div className="snake-game__controls" aria-label="Game controls">
          <span className="snake-key-pill">↑ ↓ ← →</span>
          <span className="snake-key-pill">W A S D</span>
          <span className="snake-key-pill">Space = Pause</span>
          <span className="snake-key-pill">Swipe on touch</span>
        </div>

        <p className="snake-game__hint">
          Eat the luminous tiles, avoid the walls, and keep the serpent moving to extend the archive.
        </p>

        <div className="snake-game__actions">
          <button
            type="button"
            className="primary"
            onClick={handlePrimaryAction}
          >
            {primaryLabel}
          </button>
          <button
            type="button"
            className="secondary"
            onClick={resetGame}
          >
            Reset Grid
          </button>
        </div>
      </div>
    </section>
  );
}
