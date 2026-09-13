import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';

const seo = PAGE_SEO.services;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  keywords: seo.keywords,
});

export default function ServicesLayout({ children }) {
  return children;
}
