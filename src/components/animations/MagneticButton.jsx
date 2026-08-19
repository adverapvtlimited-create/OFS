'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';

export default function MagneticButton({
  children,
  className = '',
  style = {},
  strength = 0.35,
  radius = 100,
  onClick,
  ...props
}) {
  const { ref, position } = useMagneticEffect({ strength, radius });

  return (
    <motion.div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{
        display: 'inline-block',
        ...style
      }}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={{
        type: 'spring',
        stiffness: 220,
        damping: 18,
        mass: 0.2
      }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      {...props}
    >
      {children}
    </motion.div>
  );
}
