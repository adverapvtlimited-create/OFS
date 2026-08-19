import React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowUpRight, Search, Tag, User } from 'lucide-react';
import blogPosts from '@/data/blog-posts.json';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata = {
  title: 'Industry Insights & Technical Analysis — OFS Group India',
  description: 'Articles, field studies, and engineering insights on global procurement, NDT advancements, marine logistics, and industrial decarbonization.'
};

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, var(--ofs-navy-950) 0%, var(--ofs-navy-900) 100%)',
        color: 'var(--ofs-white)',
        paddingTop: '5.5rem',
        paddingBottom: '5.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div className="bg-grid-pattern-dark" style={{ position: 'absolute', inset: 0, opacity: 0.5, pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-xs)',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '1.5rem',
            textTransform: 'uppercase'
          }}>
            <Link href="/" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--ofs-red-400)' }}>Insights</span>
          </div>

          <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
            KNOWLEDGE HUB & FIELD REPORTS
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            Technical Analysis & <br />
            <span className="gradient-text-red">Strategic Industry Insights</span>
          </h1>

          <p style={{
            fontSize: '1.18rem',
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '780px',
            lineHeight: 1.6
          }}>
            Written by senior procurement specialists, NDT Level III engineers, and clean energy practitioners with deep operational experience across onshore and offshore basins.
          </p>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="section-pad" style={{ background: 'var(--ofs-gray-50)' }}>
        <div className="container">
          {/* Featured Article Card */}
          {featuredPost && (
            <div style={{
              background: 'var(--ofs-white)',
              borderRadius: 'var(--radius-xl)',
              border: '1px solid var(--ofs-gray-200)',
              overflow: 'hidden',
              boxShadow: 'var(--shadow-xl)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              marginBottom: '4.5rem'
            }}>
              <div style={{ height: '380px', position: 'relative' }}>
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '1.25rem',
                  left: '1.25rem',
                  background: 'var(--ofs-red-600)',
                  color: 'var(--ofs-white)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: '0.4rem 0.85rem',
                  borderRadius: 'var(--radius-xs)',
                  textTransform: 'uppercase',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
                }}>
                  Featured Insight
                </div>
              </div>

              <div style={{ padding: 'clamp(2.25rem, 4.5vw, 3.5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    fontSize: '0.8rem',
                    color: 'var(--ofs-gray-500)',
                    fontFamily: 'var(--font-mono)',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ color: 'var(--ofs-navy-900)', fontWeight: 700 }}>{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2 style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'clamp(1.5rem, 2.6vw, 1.95rem)',
                    fontWeight: 800,
                    color: 'var(--ofs-navy-950)',
                    lineHeight: 1.25,
                    marginBottom: '1rem'
                  }}>
                    <Link href={`/blog/${featuredPost.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {featuredPost.title}
                    </Link>
                  </h2>

                  <p style={{ fontSize: '1.025rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                    {featuredPost.excerpt}
                  </p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--ofs-gray-200)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img 
                      src={featuredPost.author.avatar} 
                      alt={featuredPost.author.name}
                      style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>{featuredPost.author.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)', fontFamily: 'var(--font-mono)' }}>{featuredPost.author.role}</div>
                    </div>
                  </div>

                  <Link 
                    href={`/blog/${featuredPost.slug}`}
                    className="btn btn-primary btn-sm"
                  >
                    Read Full Article <ArrowUpRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* All Articles Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', fontWeight: 800, color: 'var(--ofs-navy-950)', marginBottom: '2.25rem' }}>
              All Recent Articles & Technical Reports
            </h3>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2rem'
            }}>
              {regularPosts.map((post) => (
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
                    <div style={{ height: '220px', position: 'relative' }}>
                      <img 
                        src={post.image} 
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        className="blog-thumb"
                      />
                      <div style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        background: 'var(--ofs-navy-950)',
                        color: 'var(--ofs-white)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        padding: '0.35rem 0.75rem',
                        borderRadius: 'var(--radius-xs)',
                        textTransform: 'uppercase'
                      }}>
                        {post.category}
                      </div>
                    </div>

                    <div style={{ padding: '1.75rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.75rem',
                        color: 'var(--ofs-gray-500)',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '0.75rem'
                      }}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 style={{
                        fontFamily: 'var(--font-heading)',
                        fontSize: '1.2rem',
                        fontWeight: 800,
                        color: 'var(--ofs-navy-950)',
                        lineHeight: 1.35,
                        marginBottom: '0.75rem'
                      }}>
                        <Link href={`/blog/${post.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {post.title}
                        </Link>
                      </h3>

                      <p style={{ fontSize: '0.88rem', color: 'var(--ofs-gray-600)', lineHeight: 1.55, margin: 0 }}>
                        {post.excerpt.slice(0, 130)}...
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: '1.15rem 1.75rem',
                    borderTop: '1px solid var(--ofs-gray-200)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'var(--ofs-gray-50)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
                      <img 
                        src={post.author.avatar} 
                        alt={post.author.name}
                        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
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
                        gap: '0.25rem',
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
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
