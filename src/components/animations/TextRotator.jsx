'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';

export default function TextRotator({
  words = [
    'Marine & Offshore',
    'Procurement & Shipping',
    'Engineering & EPC',
    'Integrated Facilities',
    'Spare Parts & MRO',
  ],
}) {
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
    <span
      className={cn(
        'inline-block relative gradient-text-red border-b-[3px] border-ofs-gold-400 pb-0.5 transition-all duration-300',
        isFading ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
      )}
    >
      {words[index]}
    </span>
  );
}
