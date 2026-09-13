'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Clock, Calendar, ArrowUpRight, Search, Tag, User } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import blogPosts from '@/data/blog-posts.json';
import SafeImage from '@/components/ui/SafeImage';

export default function BlogPage() {
  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = blogPosts.filter((p) => p.id !== featuredPost.id);

  return (
    <>
      <section className="bg-gradient-to-br from-ofs-navy-950 via-[#071330] to-ofs-navy-900 text-white py-14 sm:py-16 lg:py-20 relative overflow-hidden">
        <div className="bg-grid-pattern-dark absolute inset-0 opacity-50 pointer-events-none" />

        <div className="container relative z-10">
          <ScrollReveal direction="down" duration={0.5}>
            <div className="flex items-center gap-2 font-mono text-xs text-white/60 mb-6 uppercase">
              <Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span className="text-ofs-red-400">Insights</span>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.1}>
            <div className="tag-badge badge-red mb-5">
              KNOWLEDGE HUB &amp; FIELD REPORTS
            </div>
          </ScrollReveal>

          <h1 className="font-heading text-[clamp(2.5rem,5vw,4.25rem)] font-extrabold leading-[1.1] text-white mb-6 max-w-[920px]">
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
            <p className="text-[1.18rem] text-white/85 max-w-[780px] leading-relaxed">
              Written by senior procurement specialists, NDT Level III engineers, and clean energy practitioners with deep operational experience across onshore and offshore basins.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-pad bg-ofs-gray-50">
        <div className="container">
          {featuredPost && (
            <ScrollReveal direction="up" duration={0.8}>
              <div className="bg-white rounded-2xl border border-ofs-gray-200 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2 mb-18 group hover:border-ofs-navy-200 transition-all duration-300">
                <div className="h-[320px] sm:h-[380px] lg:h-full relative overflow-hidden group">
                  <SafeImage
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-5 left-5 bg-ofs-red-600 text-white font-mono text-xs font-bold py-1.5 px-3.5 rounded uppercase shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                    Featured Insight
                  </div>
                </div>

                <div className="p-8 sm:p-11 lg:p-14 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-4 text-xs text-ofs-gray-500 font-mono mb-4">
                      <span className="text-ofs-navy-900 font-bold">{featuredPost.category}</span>
                      <span>•</span>
                      <span>{featuredPost.date}</span>
                      <span>•</span>
                      <span>{featuredPost.readTime}</span>
                    </div>

                    <h2 className="font-heading text-[clamp(1.5rem,2.6vw,1.95rem)] font-extrabold text-ofs-navy-950 leading-snug mb-4">
                      <Link href={`/blog/${featuredPost.slug}`} className="hover:text-ofs-red-600 transition-colors">
                        {featuredPost.title}
                      </Link>
                    </h2>

                    <p className="text-[1.025rem] text-ofs-gray-600 leading-relaxed mb-8">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="flex justify-between items-center pt-6 border-t border-ofs-gray-200 flex-wrap gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-[0.9rem] font-extrabold text-ofs-navy-950">
                          {featuredPost.author.name}
                        </div>
                        <div className="text-xs text-ofs-gray-500">
                          {featuredPost.author.role}
                        </div>
                      </div>
                    </div>

                    <Link href={`/blog/${featuredPost.slug}`} className="btn btn-navy inline-flex items-center gap-2">
                      Read Full Article <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {regularPosts.map((post, idx) => (
              <ScrollReveal key={post.id} direction="up" delay={idx * 0.1}>
                <article className="card-modern p-0 overflow-hidden flex flex-col justify-between h-full shadow-md hover:shadow-xl transition-all duration-300">
                  <div>
                    <div className="h-[175px] relative overflow-hidden group">
                      <SafeImage
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      />
                      <div className="absolute top-3 left-3 bg-ofs-navy-950 text-white font-mono text-[0.68rem] font-bold py-1 px-2.5 rounded uppercase">
                        {post.category}
                      </div>
                    </div>

                    <div className="p-5 pb-3.5">
                      <div className="flex items-center gap-2.5 text-[0.75rem] text-ofs-gray-500 font-mono mb-2.5">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="font-heading text-base sm:text-[1.05rem] font-bold text-ofs-navy-950 leading-snug mb-2.5">
                        <Link href={`/blog/${post.slug}`} className="hover:text-ofs-red-600 transition-colors">
                          {post.title}
                        </Link>
                      </h3>

                      <p className="text-xs sm:text-[0.85rem] text-ofs-gray-600 leading-relaxed m-0">
                        {post.excerpt.slice(0, 120)}...
                      </p>
                    </div>
                  </div>

                  <div className="py-3 px-5 border-t border-ofs-gray-200 bg-ofs-gray-50/75 flex justify-between items-center">
                    <span className="text-xs font-bold text-ofs-navy-950">
                      {post.author.name}
                    </span>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-xs font-mono font-bold text-ofs-red-600 flex items-center gap-1 hover:text-ofs-red-700 transition-colors"
                    >
                      Read <ArrowUpRight size={13} />
                    </Link>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
