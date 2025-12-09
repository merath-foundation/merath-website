import { motion, useAnimationControls } from 'framer-motion';
import { forwardRef, useEffect, useState } from 'react';

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

    useEffect(() => {
      const duration = isHovering ? 6 : 10;
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
    }, [rotationControls, isHovering, isOpen]);

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
            <circle cx="60" cy="60" r="46" fill="currentColor" opacity="0.12" />
            <motion.circle
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              initial={false}
              animate={{ opacity: isOpen ? 0.65 : 1 }}
              transition={{ duration: 0.35, ease: [0.37, 0, 0.63, 1] }}
              className="ouroboros-ring__stroke"
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
