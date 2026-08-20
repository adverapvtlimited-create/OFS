import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';
import blogPosts from '@/data/blog-posts.json';
import jobsData from '@/data/jobs.json';
import { SITE_URL } from '@/config/seo.config';
import { parseDisplayDate } from '@/lib/seo';

export default function sitemap() {
  const now = new Date().toISOString();

  const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/industries', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/renewables', priority: 0.85, changeFrequency: 'weekly' },
    { path: '/blog', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/careers', priority: 0.75, changeFrequency: 'weekly' },
    { path: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const serviceRoutes = servicesData.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  const industryRoutes = industriesData.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: parseDisplayDate(b.date) || now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  const careerRoutes = jobsData.map((j) => ({
    url: `${SITE_URL}/careers/${j.slug}`,
    lastModified: parseDisplayDate(j.postedDate) || now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes, ...careerRoutes];
}
