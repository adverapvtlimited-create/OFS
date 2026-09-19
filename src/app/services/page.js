import React from 'react';
import { getServices } from '@/lib/strapi';
import ServicesView from '@/components/services/ServicesView';
import { PAGE_SEO } from '@/config/seo.config';
import { buildPageMetadata } from '@/lib/seo';

export async function generateMetadata() {
  const servicesSeo = PAGE_SEO.services;
  return buildPageMetadata({
    title: servicesSeo.title,
    description: servicesSeo.description,
    path: servicesSeo.path,
    keywords: servicesSeo.keywords,
  });
}

export default async function ServicesPage() {
  const services = await getServices();
  return <ServicesView services={services} />;
}