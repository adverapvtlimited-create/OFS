'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { getShimmerDataUrl } from '@/lib/image-loader';

const ImageLoaderContext = createContext({
  theme: 'neutral',
  shimmerEnabled: true,
  blurTransition: true,
  isLoaded: () => false,
  markLoaded: () => {},
  getPlaceholder: () => '',
});

export function ImageLoaderProvider({
  children,
  defaultTheme = 'neutral',
  shimmerEnabled = true,
  blurTransition = true,
}) {
  // Keep track of URLs that have already loaded during this session to avoid re-shimmering
  const [loadedUrls, setLoadedUrls] = useState(() => new Set());

  const isLoaded = useCallback(
    (src) => {
      if (!src) return false;
      return loadedUrls.has(src);
    },
    [loadedUrls]
  );

  const markLoaded = useCallback((src) => {
    if (!src) return;
    setLoadedUrls((prev) => {
      if (prev.has(src)) return prev;
      const next = new Set(prev);
      next.add(src);
      return next;
    });
  }, []);

  const getPlaceholder = useCallback(
    (width = 700, height = 475, themeOverride) => {
      return getShimmerDataUrl(width, height, themeOverride || defaultTheme);
    },
    [defaultTheme]
  );

  const value = useMemo(
    () => ({
      theme: defaultTheme,
      shimmerEnabled,
      blurTransition,
      isLoaded,
      markLoaded,
      getPlaceholder,
    }),
    [defaultTheme, shimmerEnabled, blurTransition, isLoaded, markLoaded, getPlaceholder]
  );

  return (
    <ImageLoaderContext.Provider value={value}>
      {children}
    </ImageLoaderContext.Provider>
  );
}

export function useImageLoader() {
  const context = useContext(ImageLoaderContext);
  if (!context) {
    return {
      theme: 'neutral',
      shimmerEnabled: true,
      blurTransition: true,
      isLoaded: () => false,
      markLoaded: () => {},
      getPlaceholder: (w, h, t) => getShimmerDataUrl(w, h, t || 'neutral'),
    };
  }
  return context;
}

export default ImageLoaderProvider;

