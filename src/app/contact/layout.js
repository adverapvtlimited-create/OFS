import JsonLd from '@/components/SEO/JsonLd';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';
import { buildContactPageSchema } from '@/lib/schema';

const seo = PAGE_SEO.contact;

export const metadata = buildPageMetadata({
  title: seo.title,
  description: seo.description,
  path: seo.path,
  keywords: seo.keywords,
});

export default function ContactLayout({ children }) {
  return (
    <>
      <JsonLd data={buildContactPageSchema()} />
      {children}
    </>
  );
}
