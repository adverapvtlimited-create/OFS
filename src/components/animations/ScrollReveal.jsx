'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function ScrollReveal({
  children,
  className = '',
  style = {},
  direction = 'up',
  delay = 0,
  duration = 0.7,
  distance = 36,
  scale = 1,
  once = true,
  threshold = 0.15
}) {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: distance, x: 0, scale: scale !== 1 ? scale : 0.98 };
      case 'down':
        return { opacity: 0, y: -distance, x: 0, scale: scale !== 1 ? scale : 0.98 };
      case 'left':
        return { opacity: 0, x: distance, y: 0, scale: 1 };
      case 'right':
        return { opacity: 0, x: -distance, y: 0, scale: 1 };
      case 'zoom':
        return { opacity: 0, scale: 0.9, y: 0, x: 0 };
      case 'fade':
      default:
        return { opacity: 0, y: 0, x: 0, scale: 1 };
    }
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={getInitialPosition()}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        transition: {
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1]
        }
      }}
      viewport={{ once, amount: threshold, margin: '-20px' }}
    >
      {children}
    </motion.div>
  );
}
