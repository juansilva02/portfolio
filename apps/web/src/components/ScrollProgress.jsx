import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

// Barra de progreso de lectura, estética terminal (emerald → sky).
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-0 left-0 right-0 z-[80] h-[2.5px] bg-gradient-to-r from-emerald-400/80 via-sky-400/80 to-sky-300/60"
    />
  );
};

export default ScrollProgress;
