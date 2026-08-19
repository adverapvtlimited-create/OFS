import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, ArrowUpRight, ArrowLeft, Share2, Tag, CheckCircle2 } from 'lucide-react';
import blogPosts from '@/data/blog-posts.json';
import ContactCTA from '@/components/sections/ContactCTA';

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Article Not Found | OFS Group India' };

  return {
    title: `${post.title} | OFS Group Insights`,
    description: post.excerpt
  };
}

export default function SingleBlogPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <>
      {/* Article Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5rem',
        paddingBottom: '4.5rem',
        position: 'relative'
      }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          {/* Back link */}
          <Link 
            href="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--ofs-red-400)',
              marginBottom: '1.5rem',
              textDecoration: 'none'
            }}
          >
            <ArrowLeft size={14} /> Back to all articles
          </Link>

          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <span className="tag-badge badge-red">{post.category}</span>
            <span style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.6)', fontFamily: 'var(--font-mono)' }}>
              {post.date} • {post.readTime}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem'
          }}>
            {post.title}
          </h1>

          {/* Author Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--ofs-gold-400)' }}
            />
            <div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff' }}>{post.author.name}</div>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255, 255, 255, 0.7)' }}>{post.author.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="section-pad" style={{ background: 'var(--ofs-white)' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          {/* Main Hero Image */}
          <div style={{
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            marginBottom: '3rem',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <img 
              src={post.image} 
              alt={post.title}
              style={{ width: '100%', maxHeight: '480px', objectFit: 'cover' }}
            />
          </div>

          {/* Excerpt Callout */}
          <div style={{
            padding: '1.75rem 2rem',
            background: 'var(--ofs-navy-50)',
            borderLeft: '4px solid var(--ofs-red-600)',
            borderRadius: '0 var(--radius-sm) var(--radius-sm) 0',
            fontSize: '1.15rem',
            fontFamily: 'var(--font-heading)',
            fontWeight: 600,
            color: 'var(--ofs-navy-950)',
            lineHeight: 1.6,
            marginBottom: '2.5rem'
          }}>
            "{post.excerpt}"
          </div>

          {/* Article Text Content */}
          <div style={{
            fontSize: '1.05rem',
            lineHeight: 1.8,
            color: 'var(--ofs-gray-800)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            marginBottom: '3.5rem'
          }}>
            {post.content.split('\n\n').map((paragraph, pIdx) => {
              if (paragraph.startsWith('### ')) {
                return (
                  <h2 key={pIdx} style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.65rem',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    marginTop: '1.5rem',
                    marginBottom: '0.5rem'
                  }}>
                    {paragraph.replace('### ', '')}
                  </h2>
                );
              }
              return (
                <p key={pIdx}>
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flexWrap: 'wrap',
            paddingTop: '2rem',
            borderTop: '1px solid var(--ofs-gray-200)',
            marginBottom: '4rem'
          }}>
            <span style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: 'var(--ofs-navy-950)' }}>
              Tags:
            </span>
            {post.tags.map((tag, tIdx) => (
              <span 
                key={tIdx}
                style={{
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  background: 'var(--ofs-gray-100)',
                  color: 'var(--ofs-gray-700)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-full)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Related Articles */}
          <div>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.35rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '1.5rem' }}>
              Related Insights & Case Studies
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
              gap: '1.5rem'
            }}>
              {relatedPosts.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blog/${rel.slug}`}
                  style={{
                    background: 'var(--ofs-gray-50)',
                    border: '1px solid var(--ofs-gray-200)',
                    borderRadius: 'var(--radius-md)',
                    padding: '1.5rem',
                    textDecoration: 'none',
                    display: 'block'
                  }}
                >
                  <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--ofs-red-600)', fontWeight: 700, marginBottom: '0.35rem' }}>
                    {rel.category}
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--ofs-navy-950)', lineHeight: 1.3, marginBottom: '0.5rem' }}>
                    {rel.title}
                  </h4>
                  <span style={{ fontSize: '0.8rem', color: 'var(--ofs-gray-500)' }}>
                    {rel.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </article>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
