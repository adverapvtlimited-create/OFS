'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, CheckCircle2, MapPin } from 'lucide-react';
import TextReveal from '@/components/animations/TextReveal';
import ScrollReveal from '@/components/animations/ScrollReveal';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import SectionPad from '@/components/ui/SectionPad';
import Container from '@/components/ui/Container';
import jobsData from '@/data/jobs.json';

export default function CareersPreview() {
  return (
    <SectionPad className="bg-ofs-gray-50 relative">
      <Container>
        <ScrollReveal direction="up" duration={0.8}>
          <div className="bg-white rounded-xl border border-ofs-gray-200 overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-between">
              <div>
                <div className="mb-4">
                  <Badge variant="red">CAREERS AT OFS GROUP</Badge>
                </div>

                <h2 className="text-[clamp(1.85rem,3.2vw,2.5rem)] font-heading font-extrabold text-ofs-navy-950 mb-4 leading-tight">
                  <TextReveal tag="span" duration={0.65}>
                    Build High-Impact Infrastructure With Us
                  </TextReveal>
                </h2>

                <p className="text-base text-ofs-gray-600 leading-relaxed mb-8">
                  Join a dynamic team of marine engineers, procurement strategists, NDT Level III specialists, and clean energy pioneers driving high-stakes industrial projects.
                </p>

                <div className="flex flex-col gap-3.5 mb-9">
                  {[
                    'Work on premier offshore rigs, EPC terminals & solar mega-parks',
                    'Comprehensive health insurance, offshore per diem & safety certification',
                    'Merit-based fast-track leadership and global mobility opportunities',
                  ].map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-[0.925rem] text-ofs-gray-800">
                      <CheckCircle2 size={16} className="text-ofs-red-600 shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <Button href="/careers" variant="navy" size="lg" className="w-fit">
                  Explore Open Positions ({jobsData.length}) <ArrowUpRight size={16} />
                </Button>
              </div>
            </div>

            <div className="bg-ofs-navy-950 text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between lg:border-l border-white/[0.08]">
              <div>
                <div className="font-mono text-xs text-ofs-gold-400 uppercase font-bold tracking-[0.06em] mb-6">
                  Current Featured Openings
                </div>

                <div className="flex flex-col gap-4">
                  {jobsData.slice(0, 3).map((job) => (
                    <Link
                      key={job.id}
                      href={`/careers/${job.slug}`}
                      className="bg-white/[0.05] border border-white/10 rounded-sm p-5 block no-underline transition-all duration-200 hover:bg-white/10 hover:border-ofs-red-500 hover:translate-x-1"
                    >
                      <div className="flex justify-between items-start mb-1.5">
                        <div className="font-heading text-[1.05rem] font-extrabold text-white">
                          {job.title}
                        </div>
                        <ArrowUpRight size={16} className="text-ofs-red-400 shrink-0" />
                      </div>
                      <div className="flex gap-4 text-xs text-white/70 font-mono">
                        <span>{job.department}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin size={12} /> {job.location.split('(')[0]}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-5 border-t border-white/10 text-sm text-white/65">
                Don&apos;t see your exact role? Send your CV directly to{' '}
                <a href="mailto:careers@ofsgroupindia.com" className="text-ofs-gold-400 font-semibold hover:underline">
                  careers@ofsgroupindia.com
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </SectionPad>
  );
}
