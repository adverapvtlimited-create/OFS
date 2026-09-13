import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowUpRight, ArrowLeft, Share2, Tag, CheckCircle2 } from 'lucide-react';
import blogPosts from '@/data/blog-posts.json';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Breadcrumbs from '@/components/SEO/Breadcrumbs';
import JsonLd from '@/components/SEO/JsonLd';
import { renderBlogContent } from '@/lib/markdown';
import { buildPageMetadata, parseDisplayDate } from '@/lib/seo';
import { buildArticleSchema, buildWebPageSchema } from '@/lib/schema';
import SafeImage from '@/components/ui/SafeImage';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) {
    return buildPageMetadata({
      title: 'Article Not Found | OFS Group India',
      description: 'The requested OFS insight article could not be found.',
      path: '/blog',
      noindex: true,
    });
  }

  const published = parseDisplayDate(post.date);

  return buildPageMetadata({
    title: `${post.title} | OFS Group Insights`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    keywords: [...(post.tags || []), post.category, 'OFS Group India'],
    ogImage: post.image,
    ogType: 'article',
    publishedTime: published,
    modifiedTime: published,
    authors: [post.author.name],
    section: post.category,
    tags: post.tags,
  });
}

export default function SingleBlogPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  const breadcrumbItems = [
    { name: 'Home', href: '/' },
    { name: 'Insights', href: '/blog' },
    { name: post.category, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          buildArticleSchema(post),
          buildWebPageSchema({
            title: `${post.title} | OFS Group Insights`,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
          }),
        ]}
      />
      <section className="bg-gradient-to-br from-ofs-navy-950 to-ofs-navy-900 text-white pt-20 pb-18 relative">
        <div className="container max-w-[880px]">
          <ScrollReveal direction="down" duration={0.5}>
            <Breadcrumbs items={breadcrumbItems} variant="dark" />
          </ScrollReveal>

          <ScrollReveal direction="down" duration={0.5}>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs text-ofs-red-400 mb-6 hover:text-ofs-red-300 transition-colors"
            >
              <ArrowLeft size={14} /> Back to all articles
            </Link>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex gap-3 items-center mb-4 flex-wrap">
              <span className="tag-badge badge-red">
                {post.category}
              </span>
              <span className="text-xs text-white/60 font-mono">
                {post.date} • {post.readTime}
              </span>
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2rem,4vw,3rem)] font-extrabold leading-tight text-white mb-6">
            <TextReveal tag="span" duration={0.65}>
              {post.title}
            </TextReveal>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <div className="flex items-center gap-3.5">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-ofs-gold-400"
              />
              <div>
                <div className="text-[0.95rem] font-bold text-white">{post.author.name}</div>
                <div className="text-xs text-white/70">{post.author.role}</div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <article className="section-pad bg-white">
        <div className="container max-w-[880px]">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="rounded-xl overflow-hidden mb-12 shadow-xl">
              <SafeImage
                src={post.image}
                alt={`Featured image for ${post.title}`}
                className="w-full max-h-[480px] object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.2}>
            <div className="p-7 sm:p-8 bg-ofs-navy-50/60 border-l-4 border-ofs-red-600 rounded-r-md text-[1.15rem] font-heading font-semibold text-ofs-navy-950 leading-relaxed mb-12">
              "{post.excerpt}"
            </div>
          </ScrollReveal>

          <div className="text-[1.05rem] leading-relaxed text-ofs-gray-800 flex flex-col gap-6 mb-14">
            {renderBlogContent(post.content)}
          </div>

          <p className="text-[0.9rem] text-ofs-gray-600 mb-8">
            Explore OFS{' '}
            <Link href="/services" className="text-ofs-red-600 font-bold hover:underline">
              procurement and EPC support services
            </Link>{' '}
            or{' '}
            <Link href="/contact" className="text-ofs-red-600 font-bold hover:underline">
              contact our team
            </Link>{' '}
            for project-specific assistance.
          </p>

          <div className="flex items-center gap-2 flex-wrap pt-8 border-t border-ofs-gray-200 mb-16">
            <span className="text-[0.85rem] font-mono font-bold text-ofs-navy-950">
              Tags:
            </span>
            {post.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-xs font-mono bg-ofs-gray-100 text-ofs-gray-700 py-1 px-3 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div>
            <h3 className="font-heading text-[1.35rem] font-extrabold text-ofs-navy-950 mb-6">
              Related Insights &amp; Case Studies
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  className="bg-ofs-gray-50 border border-ofs-gray-200 rounded-lg p-6 block hover:border-ofs-red-300 hover:bg-white transition-all duration-200 shadow-sm"
                >
                  <div className="text-xs font-mono text-ofs-red-600 font-bold mb-1.5">
                    {rel.category}
                  </div>
                  <h4 className="font-heading text-[1.05rem] font-bold text-ofs-navy-950 leading-snug mb-2">
                    {rel.title}
                  </h4>
                  <span className="text-xs text-ofs-gray-500">
                    {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
