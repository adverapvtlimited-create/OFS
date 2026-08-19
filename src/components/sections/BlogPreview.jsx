'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar, User } from 'lucide-react';
import blogPosts from '@/data/blog-posts.json';

export default function BlogPreview() {
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-pad" style={{ background: 'var(--ofs-white)', position: 'relative' }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '1.5rem',
          marginBottom: '3.5rem'
        }}>
          <div>
            <div className="tag-badge badge-red" style={{ marginBottom: '1rem' }}>
              INDUSTRY INSIGHTS
            </div>
            <h2 className="section-title">
              Technical Analysis, Trends & <br />
              <span className="gradient-text-navy">Strategic Operational Insights</span>
            </h2>
            <p className="section-desc">
              Expert articles and field engineering studies on global procurement, NDT advancements, maritime logistics, and industrial decarbonization.
            </p>
          </div>

          <Link href="/blog" className="btn btn-outline">
            Browse All Articles <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem'
        }}>
          {displayPosts.map((post) => (
            <article 
              key={post.id}
              className="card-modern"
              style={{
                padding: 0,
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Featured Image */}
                <div style={{ height: '230px', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={post.image} 
                    alt={post.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                    className="blog-thumb"
                  />
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'var(--ofs-navy-950)',
                    color: 'var(--ofs-white)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.38rem 0.85rem',
                    borderRadius: 'var(--radius-xs)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                  }}>
                    {post.category}
                  </div>
                </div>

                {/* Article Info */}
                <div style={{ padding: '1.75rem 1.75rem 1rem 1.75rem' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.78rem',
                    color: 'var(--ofs-gray-500)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '0.85rem'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Calendar size={13} /> {post.date}
                    </span>
                    <span>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Clock size={13} /> {post.readTime}
                    </span>
                  </div>

                  <h3 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    lineHeight: 1.35,
                    marginBottom: '0.85rem'
                  }}>
                    <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {post.title}
                    </Link>
                  </h3>

                  <p style={{
                    fontSize: '0.9rem',
                    color: 'var(--ofs-gray-600)',
                    lineHeight: 1.55,
                    margin: 0
                  }}>
                    {post.excerpt.slice(0, 135)}...
                  </p>
                </div>
              </div>

              {/* Author & Read More Footer */}
              <div style={{
                padding: '1.15rem 1.75rem',
                borderTop: '1px solid var(--ofs-gray-200)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--ofs-gray-50)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <img 
                    src={post.author.avatar} 
                    alt={post.author.name}
                    style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--ofs-navy-950)' }}>
                    {post.author.name}
                  </span>
                </div>

                <Link 
                  href={`/blog/${post.slug}`}
                  style={{
                    fontSize: '0.825rem',
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--ofs-red-600)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    textDecoration: 'none'
                  }}
                >
                  Read <ArrowUpRight size={14} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
