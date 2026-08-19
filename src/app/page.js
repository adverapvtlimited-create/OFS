import React from 'react';
import Hero from '@/components/sections/Hero';
import AboutPreview from '@/components/sections/AboutPreview';
import ServicesGrid from '@/components/sections/ServicesGrid';
import WhyChooseUs from '@/components/sections/WhyChooseUs';
import IndustriesSection from '@/components/sections/IndustriesSection';
import StatsCounter from '@/components/sections/StatsCounter';
import RenewablesCTA from '@/components/sections/RenewablesCTA';
import BlogPreview from '@/components/sections/BlogPreview';
import CareersPreview from '@/components/sections/CareersPreview';
import ContactCTA from '@/components/sections/ContactCTA';

export const metadata = {
  title: 'OFS Group India — Strategic Partner for Marine, Offshore & EPC Operations',
  description: 'ISO 9001:2015 certified corporate solutions provider delivering global procurement, EPC engineering support, marine logistics, industrial maintenance, and solar energy.'
};

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. About Preview */}
      <AboutPreview />

      {/* 3. Core Business & Services */}
      <ServicesGrid />

      {/* 4. Why Choose OFS (Trust Pillars) */}
      <WhyChooseUs />

      {/* 5. Industries & Sectors Showcase */}
      <IndustriesSection />

      {/* 6. Achievement Metrics & Stats */}
      <StatsCounter />

      {/* 7. Strategic Renewables Division Highlight */}
      <RenewablesCTA />

      {/* 8. Latest Insights & Technical Articles */}
      <BlogPreview />

      {/* 9. Careers & Culture Highlight */}
      <CareersPreview />

      {/* 10. Contact & Project RFQ CTA */}
      <ContactCTA />
    </>
  );
}
