import servicesData from '@/data/services.json';
import industriesData from '@/data/industries.json';
import blogPosts from '@/data/blog-posts.json';
import jobsData from '@/data/jobs.json';

export default function sitemap() {
  const baseUrl = 'https://ofsgroupindia.com';

  // Static routes
  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/industries',
    '/renewables',
    '/blog',
    '/careers',
    '/contact'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic Service routes
  const serviceRoutes = servicesData.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.9,
  }));

  // Dynamic Industry routes
  const industryRoutes = industriesData.map((i) => ({
    url: `${baseUrl}/industries/${i.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  // Dynamic Blog routes
  const blogRoutes = blogPosts.map((b) => ({
    url: `${baseUrl}/blog/${b.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  // Dynamic Career routes
  const careerRoutes = jobsData.map((j) => ({
    url: `${baseUrl}/careers/${j.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...serviceRoutes, ...industryRoutes, ...blogRoutes, ...careerRoutes];
}
