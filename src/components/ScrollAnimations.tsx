import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode } from 'react';

interface ParallaxTextProps {
  readonly children: ReactNode;
  readonly baseVelocity?: number;
}

export function ParallaxText({ children, baseVelocity = 2 }: ParallaxTextProps) {
  const baseX = useTransform(useScroll().scrollY, [0, 1000], [0, baseVelocity * 100]);

  return (
    <div className="overflow-hidden whitespace-nowrap flex">
      <motion.div
        className="flex whitespace-nowrap"
        style={{ x: baseX }}
      >
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
        <span className="block mr-8">{children} </span>
      </motion.div>
    </div>
  );
}

interface SmoothScrollProps {
  readonly children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.6]);

  return (
    <div ref={ref}>
      <motion.div style={{ y, opacity }}>
        {children}
      </motion.div>
    </div>
  );
}

interface RevealOnScrollProps {
  readonly children: ReactNode;
  readonly direction?: 'up' | 'down' | 'left' | 'right';
  readonly delay?: number;
}

export function RevealOnScroll({ 
  children, 
  direction = 'up',
  delay = 0 
}: RevealOnScrollProps) {
  // Calculate y position based on direction
  let yHidden = 0;
  if (direction === 'up') yHidden = 60;
  else if (direction === 'down') yHidden = -60;

  // Calculate x position based on direction
  let xHidden = 0;
  if (direction === 'left') xHidden = 60;
  else if (direction === 'right') xHidden = -60;

  const variants = {
    hidden: {
      opacity: 0,
      y: yHidden,
      x: xHidden,
      scale: 0.95,
      filter: "blur(10px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      filter: "blur(0px)"
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={variants}
      transition={{
        duration: 1.2,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
    >
      {children}
    </motion.div>
  );
}
