import { useCallback, useEffect, useRef, useState, type TouchEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const SWIPE_THRESHOLD = 16;
const STORAGE_KEY = 'merath-snake-highscore';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

type SnakeGameFullProps = {
  locale?: 'en' | 'ar';
};

const TEXT = {
  en: {
    controlsHint: 'Arrow keys / WASD · tap + swipe on touch screens',
    startPrompt: 'Press any arrow key or swipe to begin',
    pauseHint: 'Space toggles pause',
    gameOver: 'Game over',
    playAgain: 'Play again',
    newHigh: 'New high score',
    scoreLabel: 'Score',
    highLabel: 'High score',
  },
  ar: {
    controlsHint: 'الأسهم أو WASD · للمس انقر ثم اسحب',
    startPrompt: 'ابدأ بمفتاح سهم أو بالسحب على الشاشة',
    pauseHint: 'المسافة لإيقاف/استئناف اللعبة',
    gameOver: 'انتهت اللعبة',
    playAgain: 'العب مجدداً',
    newHigh: 'رقم قياسي جديد',
    scoreLabel: 'النتيجة',
    highLabel: 'أعلى نتيجة',
  },
} satisfies Record<'en' | 'ar', Record<string, string>>;

const POINT_PROMPTS = {
  en: ['New memory logged', 'Archive signal received', 'Ledger entry added', 'Foundation pulse ++', 'Desert line extended', 'Preservation link secured'],
  ar: ['ذكرى جديدة', 'إشارة أرشيفية وصلت', 'مدخل جديد في السجل', 'نبضة للمؤسسة', 'خط الصحراء امتد', 'رابط حفظ تأكد'],
} as const;

export function SnakeGameFull({ locale = 'en' }: SnakeGameFullProps) {
  const copy = TEXT[locale];
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [isPaused, setIsPaused] = useState(true);
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [pointPrompt, setPointPrompt] = useState<{ id: number; text: string } | null>(null);
  const promptTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showPointPrompt = useCallback(() => {
    const prompts = POINT_PROMPTS[locale];
    const next = prompts[Math.floor(Math.random() * prompts.length)];

    if (promptTimeoutRef.current) {
      clearTimeout(promptTimeoutRef.current);
    }

    setPointPrompt({ id: Date.now(), text: next });
    promptTimeoutRef.current = setTimeout(() => setPointPrompt(null), 2200);
  }, [locale]);

  useEffect(() => () => {
    if (promptTimeoutRef.current) {
      clearTimeout(promptTimeoutRef.current);
    }
  }, []);

  useEffect(() => {
    const savedHighScore = localStorage.getItem(STORAGE_KEY);
    if (savedHighScore) {
      setHighScore(Number.parseInt(savedHighScore, 10));
    }
  }, []);

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

  const checkCollision = useCallback((head: Position, body: Position[]): boolean => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      return true;
    }
    return body.some(segment => segment.x === head.x && segment.y === head.y);
  }, []);

  useEffect(() => {
    if (gameOver || isPaused) return;

    const gameInterval = setInterval(() => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

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

        if (checkCollision(head, prevSnake)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        if (head.x === food.x && head.y === food.y) {
          setScore(prev => {
            const newScore = prev + 10;
            if (newScore > highScore) {
              setHighScore(newScore);
              localStorage.setItem(STORAGE_KEY, newScore.toString());
            }
            return newScore;
          });
          showPointPrompt();
          setFood(generateFood(newSnake));
          setSpeed(prev => Math.max(50, prev - SPEED_INCREMENT));
          return newSnake;
        }

        newSnake.pop();
        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameInterval);
  }, [direction, gameOver, isPaused, food, generateFood, checkCollision, speed, highScore, showPointPrompt]);

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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = 'rgba(255,255,255,0.08)';
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

    const pulse = Math.sin(Date.now() / 200) * 0.2 + 0.8;
    ctx.fillStyle = `rgba(255, 247, 0, ${pulse})`;
    ctx.fillRect(
      food.x * CELL_SIZE + 3,
      food.y * CELL_SIZE + 3,
      CELL_SIZE - 6,
      CELL_SIZE - 6
    );
  }, [snake, food]);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setFood({ x: 15, y: 15 });
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setIsPaused(true);
    setSpeed(INITIAL_SPEED);
  };

  const handleTouchStart = (e: TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) {
      e.preventDefault();
    }
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: TouchEvent<HTMLCanvasElement>) => {
    if (!touchStart || gameOver) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    const isSwipe = Math.max(absX, absY) > SWIPE_THRESHOLD;

    if (!isSwipe) {
      if (isPaused) setIsPaused(false);
      setTouchStart(null);
      return;
    }

    if (absX > absY) {
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

  const handleTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    if (e.cancelable) {
      e.preventDefault();
    }
  };

  const handleOverlayTap = () => {
    if (!gameOver) {
      setIsPaused(false);
    }
  };


  const formattedScore = score.toString().padStart(4, '0');
  const formattedHigh = highScore.toString().padStart(4, '0');
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="snake-console" aria-live="polite" dir={dir}>
      <div className="snake-console__hud" role="status" aria-label={`${copy.scoreLabel} / ${copy.highLabel}`}>
        <div className="snake-console__metric">
          <span>{copy.scoreLabel}</span>
          <strong>{formattedScore}</strong>
        </div>
        <div className="snake-console__metric">
          <span>{copy.highLabel}</span>
          <strong>{formattedHigh}</strong>
        </div>
        <div className="snake-console__hint" aria-label={copy.pauseHint}>
          <span className="snake-console__key">Space</span>
          <p>{copy.pauseHint}</p>
        </div>
      </div>

      <AnimatePresence>
        {pointPrompt && (
          <motion.div
            key={pointPrompt.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="snake-console__prompt"
          >
            {pointPrompt.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="snake-console__frame">
        <div className="snake-console__canvas" role="region" aria-label={copy.startPrompt}>
          <canvas
            ref={canvasRef}
            width={GRID_SIZE * CELL_SIZE}
            height={GRID_SIZE * CELL_SIZE}
            className="snake-console__canvas-inner"
            tabIndex={0}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          <AnimatePresence>
            {isPaused && !gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="snake-console__overlay"
                onClick={handleOverlayTap}
                onTouchStart={handleOverlayTap}
              >
                <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="snake-console__overlay-card">
                  <p className="snake-console__overlay-title">{copy.startPrompt}</p>
                  <p className="snake-console__overlay-copy">{copy.controlsHint}</p>
                </motion.div>
              </motion.div>
            )}

            {gameOver && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="snake-console__overlay"
              >
                <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} className="snake-console__overlay-card snake-console__overlay-card--stack">
                  <p className="snake-console__overlay-chip">{copy.gameOver}</p>
                  <p className="snake-console__overlay-score">{formattedScore}</p>
                  <p className="snake-console__overlay-copy">
                    {copy.highLabel}: {formattedHigh}
                  </p>
                  {score === highScore && score > 0 && <p className="snake-console__overlay-flag">{copy.newHigh}</p>}
                  <button type="button" onClick={resetGame} className="snake-console__overlay-button">
                    {copy.playAgain}
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
