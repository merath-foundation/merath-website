import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] z-[800] origin-left"
      style={{
        background: 'var(--color-accent-primary)',
        scaleX,
        boxShadow: 'var(--glow-accent)'
      }}
    />
  );
}
