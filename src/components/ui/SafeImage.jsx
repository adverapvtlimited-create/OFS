'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/cn';
import { getStrapiMedia } from '@/lib/strapi';

const FALLBACK_SRC = '/images/live/Banner3.jpg';

export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackSrc = FALLBACK_SRC,
  ...props
}) {
  const resolvedSrc = getStrapiMedia(src) || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(getStrapiMedia(src) || fallbackSrc);
    setErrored(false);
  }, [src, fallbackSrc]);

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
