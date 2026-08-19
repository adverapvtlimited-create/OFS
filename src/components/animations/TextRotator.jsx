'use client';

import React, { useState, useEffect } from 'react';

export default function TextRotator({ words = ["Marine Logistics", "Offshore Operations", "EPC Engineering", "Global Procurement", "Clean Energy"] }) {
  const [index, setIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % words.length);
        setIsFading(false);
      }, 300);
    }, 3200);

    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <span style={{
      display: 'inline-block',
      position: 'relative',
      color: 'var(--ofs-red-600)',
      transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
      opacity: isFading ? 0 : 1,
      transform: isFading ? 'translateY(12px)' : 'translateY(0)',
      borderBottom: '3px solid var(--ofs-gold-400)',
      paddingBottom: '2px'
    }}>
      {words[index]}
    </span>
  );
}
