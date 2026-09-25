'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { getStrapiMedia } from '@/lib/strapi';

const FALLBACK_SRC = '/images/live/Banner3.jpg';

export default function SafeImage({
  src,
  alt = '',
  className = '',
  fallbackSrc = FALLBACK_SRC,
  fill = true,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  width,
  height,
  ...props
}) {
  const resolvedSrc = getStrapiMedia(src) || fallbackSrc;
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setCurrentSrc(getStrapiMedia(src) || fallbackSrc);
    setErrored(false);
  }, [src, fallbackSrc]);

  if (width && height) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        quality={quality}
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

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill={fill}
      sizes={sizes}
      quality={quality}
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
