import AdminShell from '@/components/admin/AdminShell';
import { buildPageMetadata } from '@/lib/seo';

export const metadata = buildPageMetadata({
  title: 'Admin Dashboard | OFS Group India',
  description: 'Internal administration area for OFS Group India.',
  path: '/admin',
  noindex: true,
});

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
