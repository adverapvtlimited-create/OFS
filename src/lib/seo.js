import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  isIndexableEnvironment,
} from '@/config/seo.config';

/**
 * Build absolute canonical URL for a path.
 * @param {string} path - Route path starting with /
 */
export function absoluteUrl(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized === '/' ? '' : normalized}${normalized === '/' ? '/' : ''}`.replace(
    /([^:]\/)\/+/g,
    '$1'
  );
}

/**
 * Resolve an image URL to absolute production URL.
 * @param {string} image
 */
export function absoluteImageUrl(image) {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith('http://') || image.startsWith('https://')) return image;
  return `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`;
}

/**
 * Build Next.js Metadata object with canonical, OG, Twitter, and environment-aware robots.
 */
export function buildPageMetadata({
  title,
  description,
  path = '/',
  keywords,
  ogImage,
  ogType = 'website',
  noindex = false,
  publishedTime,
  modifiedTime,
  authors,
  section,
  tags,
}) {
  const canonical = absoluteUrl(path);
  const image = absoluteImageUrl(ogImage || DEFAULT_OG_IMAGE);
  const shouldIndex = isIndexableEnvironment() && !noindex;

  const openGraph = {
    type: ogType,
    locale: 'en_IN',
    url: canonical,
    siteName: SITE_NAME,
    title,
    description,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  };

  if (ogType === 'article') {
    openGraph.publishedTime = publishedTime;
    openGraph.modifiedTime = modifiedTime;
    openGraph.authors = authors;
    openGraph.section = section;
    openGraph.tags = tags;
  }

  return {
    title: { absolute: title },
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical,
    },
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
      creator: '@ofsgroupindia',
    },
    robots: shouldIndex
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
  };
}

/**
 * Parse human-readable dates like "August 12, 2026" to ISO 8601.
 * @param {string} dateStr
 */
export function parseDisplayDate(dateStr) {
  if (!dateStr) return undefined;
  const parsed = new Date(dateStr);
  if (Number.isNaN(parsed.getTime())) return undefined;
  return parsed.toISOString();
}
