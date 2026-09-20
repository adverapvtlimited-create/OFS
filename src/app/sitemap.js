import {
  getIndustries,
  getProducts,
  getBlogPosts,
  getJobs,
} from "@/lib/strapi";
import { SITE_URL } from "@/config/seo.config";
import { parseDisplayDate } from "@/lib/seo";
import { getAllOfferHrefs } from "@/data/navigation";

export default async function sitemap() {
  const now = new Date().toISOString();

  const [industries, products, blogPosts, jobs] = await Promise.all([
    getIndustries(),
    getProducts(),
    getBlogPosts(),
    getJobs(),
  ]);

  const staticRoutes = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/industries", priority: 0.8, changeFrequency: "weekly" },
    { path: "/products", priority: 0.9, changeFrequency: "weekly" },
    { path: "/renewables", priority: 0.85, changeFrequency: "weekly" },
    { path: "/blog", priority: 0.75, changeFrequency: "weekly" },
    { path: "/careers", priority: 0.75, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ].map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));

  const offerRoutes = getAllOfferHrefs().map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const industryRoutes = industries.map((i) => ({
    url: `${SITE_URL}/industries/${i.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const productRoutes = products.map((p) => ({
    url: `${SITE_URL}/products/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogRoutes = blogPosts.map((b) => ({
    url: `${SITE_URL}/blog/${b.slug}`,
    lastModified: parseDisplayDate(b.date) || now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const careerRoutes = jobs.map((j) => ({
    url: `${SITE_URL}/careers/${j.slug}`,
    lastModified: parseDisplayDate(j.postedDate) || now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...offerRoutes,
    ...productRoutes,
    ...industryRoutes,
    ...blogRoutes,
    ...careerRoutes,
  ];
}
