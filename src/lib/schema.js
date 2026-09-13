import siteConfig from '@/data/site-config.json';
import { SITE_URL, HOME_FAQS } from '@/config/seo.config';
import { absoluteImageUrl, absoluteUrl, parseDisplayDate } from '@/lib/seo';

export function buildOrganizationSchema() {
  const socialProfiles = [
    siteConfig.socials.linkedin,
    siteConfig.socials.facebook,
    siteConfig.socials.youtube,
    siteConfig.socials.twitter,
  ].filter(Boolean);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: siteConfig.shortName,
    legalName: siteConfig.legalName,
    url: SITE_URL,
    logo: absoluteImageUrl(siteConfig.logo),
    description: siteConfig.longDesc,
    foundingDate: '2018',
    slogan: siteConfig.tagline,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${siteConfig.contact.addressIndia.line1}, ${siteConfig.contact.addressIndia.line2}`,
      addressLocality: siteConfig.contact.addressIndia.city,
      addressRegion: siteConfig.contact.addressIndia.state,
      postalCode: siteConfig.contact.addressIndia.pincode,
      addressCountry: 'IN',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: siteConfig.contact.phoneRaw,
        email: siteConfig.contact.email,
        contactType: 'customer service',
        areaServed: ['IN', 'US', 'AE', 'SA', 'SG'],
        availableLanguage: ['English', 'Hindi'],
      },
    ],
    sameAs: socialProfiles,
  };
}

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: siteConfig.shortName,
    url: SITE_URL,
    description: siteConfig.description,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function buildWebPageSchema({ title, description, path }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${absoluteUrl(path)}#webpage`,
    url: absoluteUrl(path),
    name: title,
    description,
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: { '@id': `${SITE_URL}/#organization` },
    inLanguage: 'en-IN',
  };
}

export function buildBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function buildServiceSchema(service) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${absoluteUrl(`/services/${service.slug}`)}#service`,
    name: service.title,
    description: service.description,
    provider: { '@id': `${SITE_URL}/#organization` },
    url: absoluteUrl(`/services/${service.slug}`),
    areaServed: ['IN', 'US', 'AE', 'SA', 'SG'],
    serviceType: service.title,
    image: absoluteImageUrl(service.heroImage),
  };
}

export function buildFAQSchema(faqs) {
  if (!faqs?.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

export function buildArticleSchema(post) {
  const published = parseDisplayDate(post.date);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${absoluteUrl(`/blog/${post.slug}`)}#article`,
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl(post.image),
    datePublished: published,
    dateModified: published,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: { '@id': `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
    articleSection: post.category,
    keywords: post.tags?.join(', '),
    inLanguage: 'en-IN',
  };
}

export function buildJobPostingSchema(job) {
  const datePosted = parseDisplayDate(job.postedDate);
  const validThrough = datePosted
    ? new Date(new Date(datePosted).getTime() + 90 * 24 * 60 * 60 * 1000).toISOString()
    : undefined;

  const employmentTypeMap = {
    'Full-Time': 'FULL_TIME',
    'Part-Time': 'PART_TIME',
    Contract: 'CONTRACTOR',
    Internship: 'INTERN',
  };

  return {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: `${job.description}\n\nResponsibilities:\n${job.responsibilities.map((r) => `- ${r}`).join('\n')}\n\nRequirements:\n${job.requirements.map((r) => `- ${r}`).join('\n')}`,
    datePosted,
    validThrough,
    employmentType: employmentTypeMap[job.type] || 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: siteConfig.shortName,
      sameAs: SITE_URL,
      logo: absoluteImageUrl(siteConfig.logo),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.contact.addressIndia.city,
        addressRegion: siteConfig.contact.addressIndia.state,
        addressCountry: 'IN',
      },
    },
    applicantLocationRequirements: {
      '@type': 'Country',
      name: 'India',
    },
    url: absoluteUrl(`/careers/${job.slug}`),
    identifier: {
      '@type': 'PropertyValue',
      name: siteConfig.shortName,
      value: job.id,
    },
  };
}

export function buildHomeFAQSchema() {
  return buildFAQSchema(HOME_FAQS);
}

export function buildContactPageSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${absoluteUrl('/contact')}#contactpage`,
    url: absoluteUrl('/contact'),
    name: 'Contact OFS Group India',
    description: 'Contact OFS Group India for procurement RFQs, EPC support, and industrial service enquiries.',
    mainEntity: { '@id': `${SITE_URL}/#organization` },
  };
}
