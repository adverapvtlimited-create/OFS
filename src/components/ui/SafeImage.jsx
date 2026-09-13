'use client';

import { useState } from 'react';
import { cn } from '@/lib/cn';

const FALLBACK_SRC = '/images/live/Banner3.jpg';

export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackSrc = FALLBACK_SRC,
  ...props
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [errored, setErrored] = useState(false);

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={cn('bg-ofs-navy-100 object-cover', className)}
      onError={() => {
        if (!errored && currentSrc !== fallbackSrc) {
          setErrored(true);
          setCurrentSrc(fallbackSrc);
        }
      }}
      {...props}
    />
  );
}
