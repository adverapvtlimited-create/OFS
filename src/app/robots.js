import { SITE_URL, isIndexableEnvironment } from '@/config/seo.config';

export default function robots() {
  const allowIndexing = isIndexableEnvironment();

  return {
    rules: [
      {
        userAgent: '*',
        allow: allowIndexing ? '/' : undefined,
        disallow: allowIndexing ? ['/admin/', '/api/'] : ['/'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
