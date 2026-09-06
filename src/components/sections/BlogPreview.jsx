'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Clock, Calendar } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import SafeImage from '@/components/ui/SafeImage';
import blogPosts from '@/data/blog-posts.json';

export default function BlogPreview() {
  const displayPosts = blogPosts.slice(0, 3);

  return (
    <SectionPad className="bg-white relative">
      <Container>
        {/* Section Header */}
        <div className="flex justify-between items-end flex-wrap gap-6 mb-14">
          <div>
            <ScrollReveal direction="up">
              <div className="mb-4">
                <Badge variant="red">INDUSTRY INSIGHTS</Badge>
              </div>
            </ScrollReveal>

            <h2 className="text-[clamp(2rem,3.8vw,3rem)] font-heading font-extrabold tracking-[-0.03em] mt-4 mb-4 text-ofs-navy-950 leading-[1.15]">
              <TextReveal tag="span" duration={0.65}>
                Technical Analysis, Trends &amp;
              </TextReveal>
              <br />
              <span className="gradient-text-navy">
                <TextReveal tag="span" delay={0.2} duration={0.65}>
                  Strategic Operational Insights
                </TextReveal>
              </span>
            </h2>

            <ScrollReveal direction="up" delay={0.25}>
              <p className="text-[clamp(1.025rem,1.35vw,1.18rem)] text-ofs-gray-600 max-w-[680px] leading-relaxed">
                Expert articles and field engineering studies on global procurement, NDT advancements, maritime logistics, and industrial decarbonization.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.35}>
            <Button href="/blog" variant="outline">
              Browse All Articles <ArrowUpRight size={16} />
            </Button>
          </ScrollReveal>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayPosts.map((post, idx) => (
            <ScrollReveal key={post.id} direction="up" delay={idx * 0.12}>
              <article className="p-0 overflow-hidden flex flex-col justify-between h-full bg-white border border-ofs-gray-200 rounded-md shadow-sm transition-all duration-250 hover:border-ofs-navy-300 hover:shadow-xl hover:-translate-y-1 group">
                <div>
                  {/* Featured Image */}
                  <div className="h-[175px] relative overflow-hidden">
                    <SafeImage
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-spring group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge variant="navy" className="shadow-[0_2px_8px_rgba(0,0,0,0.3)] text-[0.68rem]">
                        {post.category}
                      </Badge>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="p-5 pb-3.5">
                    <div className="flex items-center gap-3 text-xs text-ofs-gray-500 font-mono mb-2.5">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="font-heading text-base sm:text-[1.05rem] font-bold text-ofs-navy-950 leading-snug mb-2.5">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-inherit hover:text-ofs-red-600 transition-colors no-underline"
                      >
                        {post.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-[0.85rem] text-ofs-gray-600 leading-relaxed m-0">
                      {post.excerpt.slice(0, 120)}...
                    </p>
                  </div>
                </div>

                {/* Author & Read More Footer */}
                <div className="py-3 px-5 border-t border-ofs-gray-200 flex justify-between items-center bg-ofs-gray-50">
                  <div className="flex items-center gap-2">
                    <SafeImage
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-6 h-6 rounded-full object-cover bg-white"
                    />
                    <span className="text-xs font-bold text-ofs-navy-950">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-mono font-bold text-ofs-red-600 flex items-center gap-1 hover:text-ofs-red-700 hover:translate-x-1 transition-all duration-150 no-underline"
                  >
                    Read <ArrowUpRight size={13} />
                  </Link>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </SectionPad>
  );
}
