import { motion, useReducedMotion } from 'framer-motion';
import type { HTMLAttributes } from 'react';
import { useId, useLayoutEffect, useRef, useState } from 'react';

interface HandwrittenTextProps extends HTMLAttributes<HTMLSpanElement> {
  text: string;
  delay?: number;
}

export function HandwrittenText({ text, delay = 0, className, ...rest }: HandwrittenTextProps) {
  const composedClassName = ['handwritten-text', className].filter(Boolean).join(' ');
  const prefersReducedMotion = useReducedMotion();
  const svgId = useId().replace(/:/g, '');
  const measureRef = useRef<HTMLSpanElement>(null);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  useLayoutEffect(() => {
    if (!measureRef.current)
      return;

    const rect = measureRef.current.getBoundingClientRect();
    setDimensions({ width: rect.width, height: rect.height });
  }, [text]);

  useLayoutEffect(() => {
    if (!measureRef.current || typeof ResizeObserver === 'undefined')
      return;

    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { blockSize, inlineSize } = entry.borderBoxSize?.[0] ?? entry.contentRect;
        setDimensions({ width: inlineSize || entry.contentRect.width, height: blockSize || entry.contentRect.height });
      }
    });

    observer.observe(measureRef.current);
    return () => observer.disconnect();
  }, [text]);

  const strokeLength = Math.max(dimensions.width * 2.4, 400);
  const strokeDuration = prefersReducedMotion ? 0 : Math.min(Math.max(dimensions.width / 120, 0.9), 3);
  const fillDelay = delay + (prefersReducedMotion ? 0 : strokeDuration * 0.85);

  return (
    <span className={composedClassName} {...rest}>
      <span ref={measureRef} className="handwritten-text__measure" aria-hidden>
        {text}
      </span>

      <motion.span
        className="handwritten-text__fill"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: fillDelay, duration: prefersReducedMotion ? 0 : 0.4 }}
        aria-hidden
      >
        {text}
      </motion.span>

      {dimensions.width > 0 && (
        <motion.svg
          className="handwritten-text__stroke"
          viewBox={`0 0 ${dimensions.width} ${dimensions.height || 1}`}
          width={dimensions.width}
          height={dimensions.height || 1}
          aria-hidden
        >
          <defs>
            <linearGradient id={`ink-${svgId}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--color-accent-primary)" stopOpacity="0.9" />
              <stop offset="100%" stopColor="var(--color-text-primary)" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <motion.text
            x="0"
            y={dimensions.height * 0.82}
            fill="transparent"
            stroke={`url(#ink-${svgId})`}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ font: 'inherit' }}
            initial={{ strokeDasharray: strokeLength, strokeDashoffset: strokeLength, opacity: prefersReducedMotion ? 0 : 1 }}
            animate={{ strokeDashoffset: 0, opacity: prefersReducedMotion ? 0 : 1 }}
            transition={{ delay, duration: strokeDuration, ease: [0.55, 0, 0.1, 1] }}
          >
            {text}
          </motion.text>
        </motion.svg>
      )}

      <motion.span
        className="handwritten-text__pen"
        initial={{ opacity: 0, x: '0%' }}
        animate={{
          opacity: prefersReducedMotion ? 0 : 0.5,
          x: prefersReducedMotion ? '100%' : '104%'
        }}
        transition={{ delay, duration: strokeDuration, ease: [0.55, 0, 0.1, 1] }}
      />
    </span>
  );
}
