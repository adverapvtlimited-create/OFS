'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const pathname = usePathname();
  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const isVisibleRef = useRef(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth lagging spring for outer ring
  const springX = useSpring(cursorX, { stiffness: 450, damping: 28 });
  const springY = useSpring(cursorY, { stiffness: 450, damping: 28 });

  // Reset hover state on route change
  useEffect(() => {
    setIsHovered(false);
    setCursorText('');
  }, [pathname]);

  useEffect(() => {
    // Only enable on desktop pointer devices
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!isFinePointer || prefersReducedMotion || window.innerWidth < 1024) {
      return;
    }

    setIsEnabled(true);

    const handleMouseMove = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target;
      if (!target) return;

      const interactive = target.closest('a, button, [role="button"], input, select, textarea, .card-modern, .service-card-modern, .tag-pill');
      if (interactive) {
        setIsHovered(true);
        const text = interactive.getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    const handleMouseLeave = () => {
      isVisibleRef.current = false;
      cursorX.set(-100);
      cursorY.set(-100);
    };

    const handleMouseEnter = () => {
      isVisibleRef.current = true;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Always render the same DOM tree (empty div when disabled) to avoid hydration mismatch
  return (
    <div
      style={{
        pointerEvents: 'none',
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        overflow: 'hidden',
        display: isEnabled ? 'block' : 'none',
      }}
      aria-hidden="true"
      suppressHydrationWarning
    >
      {/* Outer Smooth Spring Ring */}
      <motion.div
        style={{
          position: 'fixed',
          left: springX,
          top: springY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? (cursorText ? '56px' : '44px') : '30px',
          height: isHovered ? (cursorText ? '56px' : '44px') : '30px',
          borderRadius: '50%',
          border: isHovered ? '1.5px solid rgba(224, 42, 48, 0.7)' : '1px solid rgba(12, 30, 78, 0.35)',
          background: isHovered ? 'rgba(224, 42, 48, 0.08)' : 'rgba(12, 30, 78, 0.03)',
          backdropFilter: isHovered ? 'blur(2px)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.25s ease, background 0.25s ease'
        }}
      >
        {cursorText && (
          <span style={{
            fontSize: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: 'var(--ofs-red-600)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase'
          }}>
            {cursorText}
          </span>
        )}
      </motion.div>

      {/* Inner Immediate Follower Dot */}
      <motion.div
        style={{
          position: 'fixed',
          left: cursorX,
          top: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovered ? '4px' : '6px',
          height: isHovered ? '4px' : '6px',
          borderRadius: '50%',
          background: isHovered ? 'var(--ofs-red-600)' : 'var(--ofs-navy-950)',
          boxShadow: isHovered ? '0 0 8px rgba(224, 42, 48, 0.8)' : 'none',
          transition: 'width 0.2s ease, height 0.2s ease, background 0.2s ease'
        }}
      />
    </div>
  );
}
