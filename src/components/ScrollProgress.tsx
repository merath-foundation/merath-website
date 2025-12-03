import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ['#A0695F', '#8B5A50', '#1A1A1A']
  );

  const height = useTransform(
    scrollYProgress,
    [0, 0.05],
    ['3px', '4px']
  );

  return (
    <>
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height,
          background: backgroundColor,
          transformOrigin: '0%',
          scaleX,
          zIndex: 9999,
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      />
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh',
          background: 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, transparent 20%)',
          pointerEvents: 'none',
          zIndex: 9998,
          opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0])
        }}
      />
    </>
  );
}
