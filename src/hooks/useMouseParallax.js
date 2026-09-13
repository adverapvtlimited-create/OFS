'use client';

import { useState, useEffect } from 'react';

/**
 * useMouseParallax
 * Calculates normalized mouse coordinates (-1 to 1) for multi-layer 3D displacement.
 * 
 * @param {Object} options
 * @param {number} options.damping - Easing responsiveness factor (0 to 1)
 */
export function useMouseParallax({ damping = 0.08 } = {}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Check touch / reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animationFrameId;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      targetX = (e.clientX / innerWidth - 0.5) * 2;
      targetY = (e.clientY / innerHeight - 0.5) * 2;
      setMousePos({ x: targetX, y: targetY });
    };

    const updateSmoothPosition = () => {
      currentX += (targetX - currentX) * damping;
      currentY += (targetY - currentY) * damping;
      setSmoothPos({ x: currentX, y: currentY });
      animationFrameId = requestAnimationFrame(updateSmoothPosition);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(updateSmoothPosition);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [damping]);

  return { mousePos, smoothPos };
}
