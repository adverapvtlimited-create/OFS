'use client';

import React from 'react';
import { motion } from 'framer-motion';

export default function MaskImageReveal({
  src,
  alt = '',
  className = '',
  style = {},
  aspectRatio = '16/10',
  duration = 0.9,
  delay = 0,
  children
}) {
  return (
    <div
      className={`mask-reveal-wrap ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 'var(--radius-lg)',
        aspectRatio,
        background: 'var(--ofs-navy-950)',
        ...style
      }}
    >
      {/* Expanding Mask Container */}
      <motion.div
        initial={{ clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }}
        whileInView={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        style={{ width: '100%', height: '100%', position: 'relative' }}
      >
        <motion.img
          src={src}
          alt={alt}
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1.0 }}
          viewport={{ once: true }}
          transition={{ duration: duration + 0.3, delay, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block'
          }}
        />
        {/* Subtle Depth Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(6, 14, 36, 0.05) 0%, rgba(6, 14, 36, 0.5) 100%)',
            pointerEvents: 'none'
          }}
        />
        {children}
      </motion.div>
    </div>
  );
}
