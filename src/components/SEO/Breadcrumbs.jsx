import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/schema';

/**
 * Visible breadcrumb navigation with BreadcrumbList structured data.
 * @param {{ items: { name: string, href: string }[], variant?: 'light' | 'dark' }} props
 */
export default function Breadcrumbs({ items, variant = 'dark' }) {
  if (!items?.length) return null;

  const isDark = variant === 'dark';
  const linkColor = isDark ? 'rgba(255, 255, 255, 0.7)' : 'var(--ofs-gray-600)';
  const currentColor = isDark ? 'var(--ofs-red-400)' : 'var(--ofs-red-600)';
  const separatorColor = isDark ? 'rgba(255, 255, 255, 0.6)' : 'var(--ofs-gray-400)';

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <ol
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-xs)',
          color: separatorColor,
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          listStyle: 'none',
          padding: 0,
          margin: '0 0 1.5rem 0',
          flexWrap: 'wrap',
        }}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span style={{ color: currentColor }} aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} style={{ color: linkColor, textDecoration: 'none' }}>
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
