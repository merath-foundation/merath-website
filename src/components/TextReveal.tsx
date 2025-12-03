import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface TextRevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
}

export function TextReveal({ children, delay = 0 }: TextRevealProps) {
  // Extract text content from children
  const text = typeof children === 'string' ? children : '';
  
  // If children is complex (not just a string), render with simple animation
  if (!text) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay }}
      >
        {children}
      </motion.div>
    );
  }

  // Character-by-character reveal for text
  const chars = text.split('');

  return (
    <motion.span
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.02, delayChildren: delay }}
    >
      {chars.map((char, index) => (
        <motion.span
          key={`${char}-${index}-${text.length}`}
          variants={{
            hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
            visible: { 
              opacity: 1, 
              y: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1]
              }
            }
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}
