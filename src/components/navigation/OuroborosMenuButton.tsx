import { motion, useAnimationControls } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';
import { useLivingArchive } from '../../contexts/LivingArchiveContext';

interface OuroborosMenuButtonProps {
  readonly isOpen: boolean;
  readonly onToggle: () => void;
  readonly controlsId: string;
  readonly label: string;
}

export const OuroborosMenuButton = forwardRef<HTMLButtonElement, OuroborosMenuButtonProps>(
  ({ isOpen, onToggle, controlsId, label }, ref) => {
    const rotationControls = useAnimationControls();
    const [isHovering, setIsHovering] = useState(false);
    const { tempo } = useLivingArchive();

    useEffect(() => {
      const tempoDuration = tempo === 'active' ? 6 : tempo === 'paused' ? 12 : tempo === 'complete' ? 10 : 14;
      const duration = isHovering ? Math.max(4, tempoDuration - 2) : tempoDuration;
      if (isOpen) {
        rotationControls.stop();
        rotationControls.start({ rotate: 0, transition: { duration: 0.35, ease: [0.37, 0, 0.63, 1] } });
        return;
      }

      rotationControls.start({
        rotate: 360,
        transition: {
          repeat: Infinity,
          ease: 'linear',
          duration,
        },
      });
    }, [rotationControls, isHovering, isOpen, tempo]);

    return (
      <motion.button
        ref={ref}
        type="button"
        className="ouroboros-button"
        aria-label={label}
        aria-controls={controlsId}
        aria-expanded={isOpen}
        aria-pressed={isOpen}
        onClick={onToggle}
        onHoverStart={() => setIsHovering(true)}
        onHoverEnd={() => setIsHovering(false)}
        onFocus={() => setIsHovering(true)}
        onBlur={() => setIsHovering(false)}
        whileTap={{ scale: 0.96 }}
      >
        <motion.span className="ouroboros-ring" animate={rotationControls}>
          <svg viewBox="0 0 120 120" role="presentation" aria-hidden="true">
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              initial={false}
              animate={{ strokeDasharray: isOpen ? '320 20' : '280 80' }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="ouroboros-ring__stroke"
            />
            <motion.circle
              cx="95"
              cy="40"
              r="5"
              fill="currentColor"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.6 : 1 }}
              transition={{ duration: 0.3, ease: [0.37, 0, 0.63, 1] }}
            />
          </svg>
        </motion.span>

        <motion.span
          className="ouroboros-cross"
          aria-hidden="true"
          initial={false}
          animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.6, rotate: isOpen ? 0 : -20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <span />
          <span />
        </motion.span>

        <span className="sr-only">{label}</span>
      </motion.button>
    );
  }
);

OuroborosMenuButton.displayName = 'OuroborosMenuButton';
