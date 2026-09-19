import React from 'react';
import { getSiteConfig } from '@/lib/strapi';
import AboutView from '@/components/about/AboutView';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const siteConfig = await getSiteConfig();
  const aboutSeo = PAGE_SEO.about;

  return buildPageMetadata({
    title: aboutSeo.title,
    description: siteConfig.longDesc || aboutSeo.description,
    path: aboutSeo.path,
    keywords: aboutSeo.keywords,
  });
}

export default async function AboutPage() {
  const siteConfig = await getSiteConfig();
  return <AboutView siteConfig={siteConfig} />;
}
