import Link from 'next/link';
import JsonLd from '@/components/SEO/JsonLd';
import { buildBreadcrumbSchema } from '@/lib/schema';
import { cn } from '@/lib/cn';

/**
 * Visible breadcrumb navigation with BreadcrumbList structured data.
 * @param {{ items: { name: string, href: string }[], variant?: 'light' | 'dark' }} props
 */
export default function Breadcrumbs({ items, variant = 'dark' }) {
  if (!items?.length) return null;

  const isDark = variant === 'dark';

  return (
    <nav aria-label="Breadcrumb">
      <JsonLd data={buildBreadcrumbSchema(items)} />
      <ol
        className={cn(
          'flex items-center gap-2 font-mono text-xs mb-6 uppercase list-none p-0 flex-wrap',
          isDark ? 'text-white/60' : 'text-ofs-gray-400'
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {isLast ? (
                <span
                  className={isDark ? 'text-ofs-red-400 font-bold' : 'text-ofs-red-600 font-bold'}
                  aria-current="page"
                >
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={cn(
                    'no-underline transition-colors',
                    isDark ? 'text-white/70 hover:text-white' : 'text-ofs-gray-600 hover:text-ofs-navy-950'
                  )}
                >
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
