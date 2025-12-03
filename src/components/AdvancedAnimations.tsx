import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface MorphingCardProps {
  readonly children: ReactNode;
  readonly index?: number;
}

export function MorphingCard({ children, index = 0 }: MorphingCardProps) {
  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        borderRadius: "100%",
        scale: 0.5,
        rotate: -15
      }}
      whileInView={{ 
        opacity: 1,
        borderRadius: "12px",
        scale: 1,
        rotate: 0,
        transition: {
          duration: 1.2,
          delay: index * 0.15,
          ease: [0.22, 1, 0.36, 1]
        }
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.03,
        rotate: [0, -2, 2, 0],
        transition: {
          duration: 0.6,
          ease: "easeInOut"
        }
      }}
      className="relative overflow-hidden bg-gradient-to-br from-white to-gray-50 border border-black/10 shadow-lg"
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px"
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ 
          opacity: 1, 
          y: 0,
          transition: {
            delay: index * 0.15 + 0.3,
            duration: 0.8
          }
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-br from-[#A0695F]/20 to-transparent pointer-events-none"
        whileHover={{
          opacity: 1,
          transition: { duration: 0.4 }
        }}
      />
    </motion.div>
  );
}

interface FloatingElementProps {
  readonly children: ReactNode;
  readonly duration?: number;
  readonly delay?: number;
}

export function FloatingElement({ children, duration = 3, delay = 0 }: FloatingElementProps) {
  return (
    <motion.div
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
}

interface PulsingGlowProps {
  readonly children: ReactNode;
  readonly color?: string;
}

export function PulsingGlow({ children, color = "#A0695F" }: PulsingGlowProps) {
  return (
    <motion.div
      className="relative"
      whileHover="hover"
    >
      {children}
      
      <motion.div
        className="absolute inset-0 -z-10 rounded-full blur-xl"
        style={{ backgroundColor: color }}
        initial={{ opacity: 0, scale: 0.8 }}
        variants={{
          hover: {
            opacity: 0.4,
            scale: 1.2,
            transition: {
              duration: 0.6,
              ease: "easeOut"
            }
          }
        }}
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}
