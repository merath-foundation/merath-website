<<<<<<< HEAD
import { motion } from 'framer-motion';
=======
import { ReactNode, useEffect, useState } from 'react';
import { Location } from 'react-router-dom';
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda

interface PageTransitionProps {
  children: ReactNode;
  location: Location;
}

<<<<<<< HEAD
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
=======
export function PageTransition({ children, location }: PageTransitionProps) {
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  return (
    <div
      className={`transition-opacity duration-300 ${
        transitionStage === 'fadeOut' ? 'opacity-0' : 'opacity-100'
      }`}
      onTransitionEnd={() => {
        if (transitionStage === 'fadeOut') {
          setTransitionStage('fadeIn');
          setDisplayLocation(location);
        }
      }}
    >
      {children}
    </div>
>>>>>>> 1834f666793186ec6873134da49b3b6df728ebda
  );
}
