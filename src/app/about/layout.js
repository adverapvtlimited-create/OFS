import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';

const seo = PAGE_SEO.about;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  keywords: seo.keywords,
});

export default function AboutLayout({ children }) {
  return children;
}
