import { getBlogPosts, getCaseStudies } from "@/lib/strapi";
import BlogView from "@/components/blog/BlogView";
import { buildPageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildPageMetadata({
    title: "Industry Insights & Technical Analysis | OFS Group India",
    description:
      "Expert technical analysis, supply chain intelligence, and field engineering reports on oil & gas, petrochemical, and renewable energy sectors.",
    path: "/blog",
  });
}

export default async function BlogPage() {
  const [posts, caseStudies] = await Promise.all([
    getBlogPosts(),
    getCaseStudies(),
  ]);

  return <BlogView posts={posts} caseStudies={caseStudies} />;
}
