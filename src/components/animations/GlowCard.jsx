'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function GlowCard({
  children,
  className = '',
  style = {},
  glowColor = 'rgba(224, 42, 48, 0.12)',
  borderColor = 'rgba(224, 42, 48, 0.4)',
  ...props
}) {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`glow-card-container ${className}`}
      style={{
        position: 'relative',
        background: 'var(--ofs-white)',
        borderRadius: 'var(--radius-lg)',
        border: isHovered ? `1px solid ${borderColor}` : '1px solid var(--ofs-gray-200)',
        boxShadow: isHovered ? 'var(--shadow-xl), 0 12px 32px rgba(6, 14, 36, 0.08)' : 'var(--shadow-sm)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
        overflow: 'hidden',
        ...style
      }}
      {...props}
    >
      {/* Subtle Radial Cursor Spotlight */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, ${glowColor}, transparent 70%)`,
          transition: 'opacity 0.3s ease',
          zIndex: 1
        }}
      />

      {/* Card Content Container */}
      <div style={{ position: 'relative', zIndex: 2, height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
}
