'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight, Search, Tag, User } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import blogPosts from '@/data/blog-posts.json';
import ContactCTA from '@/components/sections/ContactCTA';

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
          <ScrollReveal direction="down" duration={0.5}>
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
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red" style={{ marginBottom: '1.25rem' }}>
              KNOWLEDGE HUB &amp; FIELD REPORTS
            </div>
          </ScrollReveal>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: 'var(--ofs-white)',
            marginBottom: '1.5rem',
            maxWidth: '920px'
          }}>
            <TextReveal tag="span" duration={0.65}>
              Technical Analysis &amp;
            </TextReveal>
            <br />
            <span className="gradient-text-red">
              <TextReveal tag="span" delay={0.2} duration={0.65}>
                Strategic Industry Insights
              </TextReveal>
            </span>
          </h1>

          <ScrollReveal direction="up" delay={0.25}>
            <p style={{
              fontSize: '1.18rem',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: '780px',
              lineHeight: 1.6
            }}>
              Written by senior procurement specialists, NDT Level III engineers, and clean energy practitioners with deep operational experience across onshore and offshore basins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Main Blog Content */}
      <section className="section-pad" style={{ background: 'var(--ofs-gray-50)' }}>
        <div className="container">
          {/* Featured Article Card */}
          {featuredPost && (
            <ScrollReveal direction="up" duration={0.8}>
              <div style={{
                background: 'var(--ofs-white)',
                borderRadius: 'var(--radius-xl)',
                border: '1px solid var(--ofs-gray-200)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
                marginBottom: '4.5rem'
              }}>
                <div style={{ height: '380px', position: 'relative', overflow: 'hidden' }}>
                  <motion.img 
                    src={featuredPost.image} 
                    alt={featuredPost.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.6 }}
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

                    <p style={{
                      fontSize: '1.025rem',
                      color: 'var(--ofs-gray-600)',
                      lineHeight: 1.65,
                      marginBottom: '2rem'
                    }}>
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '1.5rem',
                    borderTop: '1px solid var(--ofs-gray-200)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img 
                        src={featuredPost.author.avatar} 
                        alt={featuredPost.author.name}
                        style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--ofs-navy-950)' }}>
                          {featuredPost.author.name}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--ofs-gray-500)' }}>
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="btn btn-navy">
                      Read Full Article <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          {/* Regular Articles Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: '2.5rem'
          }}>
            {regularPosts.map((post, idx) => (
              <ScrollReveal key={post.id} direction="up" delay={idx * 0.1}>
                <article 
                  className="card-modern"
                  style={{
                    padding: 0,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%'
                  }}
                >
                  <div>
                    <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                      <motion.img 
                        src={post.image} 
                        alt={post.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        whileHover={{ scale: 1.06 }}
                        transition={{ duration: 0.6 }}
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
                        fontSize: '0.78rem',
                        color: 'var(--ofs-gray-500)',
                        fontFamily: 'var(--font-mono)',
                        marginBottom: '0.85rem'
                      }}>
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
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

                      <p style={{ fontSize: '0.9rem', color: 'var(--ofs-gray-600)', lineHeight: 1.6, margin: 0 }}>
                        {post.excerpt.slice(0, 140)}...
                      </p>
                    </div>
                  </div>

                  <div style={{
                    padding: '1.15rem 1.75rem',
                    borderTop: '1px solid var(--ofs-gray-200)',
                    background: 'var(--ofs-gray-50)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: 700, color: 'var(--ofs-navy-950)' }}>
                      {post.author.name}
                    </span>

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
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <ContactCTA />
    </>
  );
}
