import React from 'react';
import { getIndustries } from '@/lib/strapi';
import IndustriesView from '@/components/industries/IndustriesView';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const industriesSeo = PAGE_SEO.industries;
  return buildPageMetadata({
    title: industriesSeo.title,
    description: industriesSeo.description,
    path: industriesSeo.path,
    keywords: industriesSeo.keywords,
  });
}

export default async function IndustriesPage() {
  const industries = await getIndustries();
  return <IndustriesView industries={industries} />;
}
