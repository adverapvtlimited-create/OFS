import { getJobs } from '@/lib/strapi';
import CareersView from '@/components/careers/CareersView';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  return buildPageMetadata({
    title: 'Careers at OFS Group India | Engineering & Supply Chain Opportunities',
    description: 'Join OFS Group India. Explore career opportunities in oil & gas procurement, marine engineering, metallurgy, quality control, and industrial operations.',
    path: '/careers',
  });
}

export default async function CareersPage() {
  const jobs = await getJobs();
  return <CareersView jobs={jobs} />;
}
