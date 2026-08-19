'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxLayer({
  children,
  speed = 0.2, // negative moves slower/downward, positive moves upward/faster
  className = '',
  style = {},
  rotate = 0,
  scale = 1
}) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-speed * 120, speed * 120]);
  const rotation = useTransform(scrollYProgress, [0, 1], [-rotate, rotate]);
  const scaleValue = useTransform(scrollYProgress, [0, 0.5, 1], [scale, 1, scale]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        ...style,
        y,
        rotate: rotate ? rotation : 0,
        scale: scale !== 1 ? scaleValue : 1
      }}
    >
      {children}
    </motion.div>
  );
}
