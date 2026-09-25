/**
 * Next.js Image Loader & Shimmer Placeholder Utility
 * Generates lightweight, neutral SVG shimmer base64 data URLs
 * for instant placeholders without any unwanted solid blue tints.
 */

const shimmerSvg = (w = 700, h = 475) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop stop-color="rgba(15,23,42,0.06)" offset="0%" />
      <stop stop-color="rgba(255,255,255,0.22)" offset="50%" />
      <stop stop-color="rgba(15,23,42,0.06)" offset="100%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="rgba(15,23,42,0.04)" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)">
    <animate attributeName="x" from="-${w}" to="${w}" dur="1.2s" repeatCount="indefinite" />
  </rect>
</svg>`;

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

/**
 * Returns a neutral, transparent base64 Data URL for use in Next.js Image `blurDataURL`
 */
export function getShimmerDataUrl(width = 700, height = 475) {
  return `data:image/svg+xml;base64,${toBase64(shimmerSvg(width, height))}`;
}

/**
 * Custom Next.js Image Loader function
 */
export function customNextImageLoader({ src, width, quality }) {
  if (!src) return '/images/live/Banner3.jpg';
  
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return `${src}?w=${width}&q=${quality || 80}`;
  }

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=${quality || 80}`;
}
