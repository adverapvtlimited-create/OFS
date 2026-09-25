'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/cn';
import { getStrapiMedia } from '@/lib/strapi';
import { useImageLoader } from '@/components/providers/ImageLoaderProvider';

const FALLBACK_SRC = '/images/live/Banner3.jpg';

export default function SafeImage({
  src,
  alt = '',
  className = '',
  containerClassName = '',
  fallbackSrc = FALLBACK_SRC,
  fill,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality = 80,
  width,
  height,
  priority = false,
  shimmer = true,
  shimmerTheme,
  showSpinner = true,
  spinnerSize = 'md',
  blur = false,
  blurDataURL,
  fit,
  aspectRatio,
  onLoad,
  onError,
  ...props
}) {
  const { isLoaded, markLoaded, getPlaceholder } = useImageLoader();
  const resolvedSrc = useMemo(() => getStrapiMedia(src) || fallbackSrc, [src, fallbackSrc]);
  const [currentSrc, setCurrentSrc] = useState(resolvedSrc);
  const [errored, setErrored] = useState(false);
  const [isLoadedState, setIsLoadedState] = useState(false);
  const imgRef = useRef(null);

  // Sync src changes
  useEffect(() => {
    const nextSrc = getStrapiMedia(src) || fallbackSrc;
    setCurrentSrc(nextSrc);
    setErrored(false);
    setIsLoadedState(false);
  }, [src, fallbackSrc]);

  // Check if image is already complete in browser cache on mount
  useEffect(() => {
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoadedState(true);
      markLoaded(currentSrc);
    }
  }, [currentSrc, markLoaded]);

  const computedBlurDataURL = useMemo(() => {
    if (blurDataURL) return blurDataURL;
    if (blur) {
      return getPlaceholder(width || 700, height || 475);
    }
    return undefined;
  }, [blur, blurDataURL, getPlaceholder, width, height]);

  const handleLoad = (e) => {
    setIsLoadedState(true);
    markLoaded(currentSrc);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setIsLoadedState(true);
    if (!errored && currentSrc !== fallbackSrc) {
      setErrored(true);
      setCurrentSrc(fallbackSrc);
    }
    if (onError) onError(e);
  };

  const isFillMode = fill !== undefined ? fill : !(width && height);

  // Smooth progressive animation class for the image element
  const animationClass = cn(
    'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-[opacity,filter,transform]',
    isLoadedState
      ? 'opacity-100 scale-100 blur-0'
      : 'opacity-0 scale-[1.02] blur-[4px]',
    className
  );

  return (
    <div
      className={cn(
        'overflow-hidden',
        !containerClassName?.includes('bg-') && 'bg-slate-100/40 dark:bg-slate-900/20',
        containerClassName?.includes('absolute')
          ? 'absolute inset-0'
          : isFillMode
          ? 'relative w-full h-full'
          : 'relative inline-block',
        containerClassName
      )}
      style={!isFillMode && width && height ? { width, height } : undefined}
    >
      {/* Animated Sleek Loading Overlay (fades out smoothly once loaded) */}
      <div
        className={cn(
          'absolute inset-0 pointer-events-none transition-opacity duration-600 ease-out z-[2] flex items-center justify-center bg-slate-900/15 dark:bg-slate-950/50 backdrop-blur-[1px]',
          isLoadedState ? 'opacity-0' : 'opacity-100'
        )}
        aria-hidden="true"
      >
        {/* Shimmer sweep wave */}
        {shimmer && (
          <div className="absolute inset-0 image-shimmer-sweep pointer-events-none" />
        )}

        {/* Glowing high-tech animated loader indicator */}
        {showSpinner && (
          <div className="relative flex items-center justify-center p-3">
            {/* Ambient pulsing glow ring */}
            <div
              className={cn(
                'absolute rounded-full bg-ofs-red-500/20 blur-md loader-glow-pulse',
                spinnerSize === 'sm' ? 'w-7 h-7' : spinnerSize === 'lg' ? 'w-14 h-14' : 'w-10 h-10'
              )}
            />
            {/* Rotating high-tech outer arc */}
            <div
              className={cn(
                'rounded-full border-2 border-white/10 border-t-ofs-red-500 border-r-rose-400 loader-orbit',
                spinnerSize === 'sm' ? 'w-5 h-5' : spinnerSize === 'lg' ? 'w-10 h-10' : 'w-7 h-7'
              )}
            />
            {/* Pulsing micro-core dot */}
            <div
              className={cn(
                'absolute rounded-full bg-ofs-red-500 shadow-[0_0_8px_rgba(224,42,48,0.9)] animate-pulse',
                spinnerSize === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2'
              )}
            />
          </div>
        )}
      </div>

      <Image
        ref={imgRef}
        src={currentSrc}
        alt={alt}
        fill={isFillMode}
        width={!isFillMode ? width : undefined}
        height={!isFillMode ? height : undefined}
        sizes={isFillMode ? sizes : undefined}
        quality={quality}
        priority={priority}
        placeholder={computedBlurDataURL ? 'blur' : 'empty'}
        blurDataURL={computedBlurDataURL}
        onLoad={handleLoad}
        onError={handleError}
        className={animationClass}
        {...props}
      />
    </div>
  );
}
