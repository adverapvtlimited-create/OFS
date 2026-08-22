import siteConfig from '@/data/site-config.json';

/**
 * Production site URL. Override via NEXT_PUBLIC_SITE_URL for staging/preview.
 * Canonical URLs, sitemap, and structured data always use this value.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://ofsgroupindia.com';

export const SITE_NAME = siteConfig.shortName;
export const SITE_LEGAL_NAME = siteConfig.legalName;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og/ofs-group-india-og.jpg`;

export const DEFAULT_KEYWORDS = [
  'OFS Group India',
  'Oriented Facility Solution',
  'industrial procurement India',
  'EPC support services',
  'marine offshore logistics',
  'facility management',
  'renewable energy EPC',
  'ISO 9001:2015',
];

/** Returns true when the deployment should be indexed by search engines. */
export function isIndexableEnvironment() {
  if (process.env.NEXT_PUBLIC_FORCE_INDEX === 'true') return true;
  if (process.env.VERCEL_ENV === 'preview') return false;
  if (process.env.VERCEL_ENV === 'development') return false;
  if (process.env.NODE_ENV === 'development') return false;
  return true;
}

/**
 * Page-level SEO definitions. Titles and descriptions are derived from actual site content.
 */
export const PAGE_SEO = {
  home: {
    title: 'OFS Group India | Marine, Offshore, Energy & EPC Support Services',
    description:
      'ISO 9001:2015 certified OFS Group India delivers global procurement, EPC engineering support, marine logistics, spare parts MRO, and solar energy solutions for industrial sectors.',
    path: '/',
    keywords: [
      'OFS Group India',
      'marine offshore services Mumbai',
      'industrial procurement',
      'EPC support India',
    ],
    primaryKeyword: 'OFS Group India',
    searchIntent: 'brand + commercial investigation',
    audience: 'EPC contractors, plant operators, marine operators',
    geoIntent: 'India, Mumbai, global operations',
  },
  about: {
    title: 'About OFS Group India | ISO-Certified Industrial Support Partner',
    description:
      'Learn about OFS Group India — an ISO 9001:2015 certified multinational delivering procurement, engineering, spare parts MRO, and renewable energy support across marine, offshore, and industrial sectors.',
    path: '/about',
    keywords: [
      'about OFS Group India',
      'industrial procurement company',
      'marine services Mumbai',
    ],
    primaryKeyword: 'about OFS Group India',
    searchIntent: 'company credibility research',
    audience: 'procurement managers, project directors',
    geoIntent: 'Mumbai, India; USA liaison office',
  },
  services: {
    title: 'OFS Services | Sourcing, Engineering EPC, Spare Parts MRO & Logistics',
    description:
      'Explore OFS Group India services: strategic procurement & shipping, engineering & EPC support, spare parts MRO, and industrial logistics.',
    path: '/services',
    keywords: [
      'OFS services',
      'industrial procurement services India',
      'EPC support services',
      'spare parts procurement MRO',
    ],
    primaryKeyword: 'OFS industrial services',
    searchIntent: 'service discovery',
    audience: 'plant managers, EPC contractors, facility heads',
    geoIntent: 'India and international project sites',
  },
  industries: {
    title: 'Industries Served | Oil & Gas, Marine, Power, Renewables & More',
    description:
      'OFS Group India supports oil & gas, marine & offshore, renewable energy, power generation, petrochemicals, pharmaceuticals, cement, mining, and heavy engineering with specialized procurement and technical services.',
    path: '/industries',
    keywords: [
      'industrial sectors OFS',
      'oil and gas procurement India',
      'marine offshore supply chain',
      'renewable energy support',
    ],
    primaryKeyword: 'OFS industries served',
    searchIntent: 'industry-specific solution research',
    audience: 'sector-specific procurement and operations teams',
    geoIntent: 'India, Middle East, Europe, Americas',
  },
  renewables: {
    title: 'OFS Renewables | Solar EPC, Rooftop & BESS Solutions in India',
    description:
      'OFS Renewables delivers utility-scale solar, commercial & industrial rooftop solar, BESS integration, and O&M support for industrial decarbonization and captive power projects across India.',
    path: '/renewables',
    keywords: [
      'OFS renewables',
      'solar EPC India',
      'rooftop solar industrial',
      'BESS integration India',
    ],
    primaryKeyword: 'OFS renewable energy solutions',
    searchIntent: 'renewable energy procurement and EPC',
    audience: 'industrial facility owners, sustainability teams',
    geoIntent: 'India',
  },
  blog: {
    title: 'OFS Insights | Procurement, QA/QC, Renewables & Industry Articles',
    description:
      'Read technical articles from OFS Group India on procurement strategy, supply chain management, NDT & quality control, renewable energy, and industrial maintenance best practices.',
    path: '/blog',
    keywords: [
      'OFS blog',
      'industrial procurement insights',
      'EPC supply chain articles',
      'renewable energy industry news',
    ],
    primaryKeyword: 'OFS industry insights',
    searchIntent: 'informational / thought leadership',
    audience: 'engineers, procurement professionals, plant managers',
    geoIntent: 'global industrial audience',
  },
  careers: {
    title: 'Careers at OFS Group India | Engineering & Procurement Jobs',
    description:
      'Join OFS Group India. Explore open roles in procurement, QA/QC & NDT, solar EPC engineering, and marine logistics. Build your career with an ISO-certified industrial support organization.',
    path: '/careers',
    keywords: [
      'OFS careers',
      'procurement jobs Mumbai',
      'NDT engineer jobs India',
      'solar EPC jobs',
    ],
    primaryKeyword: 'OFS Group India careers',
    searchIntent: 'job search',
    audience: 'engineering and procurement professionals',
    geoIntent: 'Mumbai, Navi Mumbai, India',
  },
  contact: {
    title: 'Contact OFS Group India | Mumbai HQ & Global Offices',
    description:
      'Contact OFS Group India for procurement RFQs, EPC support, facility management, and renewable energy inquiries. Mumbai headquarters and USA global office. Call +91 98200 00000 or email info@ofsgroupindia.com.',
    path: '/contact',
    keywords: [
      'contact OFS Group India',
      'OFS Mumbai office',
      'procurement RFQ India',
      'EPC consultation contact',
    ],
    primaryKeyword: 'contact OFS Group India',
    searchIntent: 'transactional / lead generation',
    audience: 'prospective clients and partners',
    geoIntent: 'Mumbai, Maharashtra, India; St. Petersburg, Florida, USA',
  },
  privacy: {
    title: 'Privacy Policy | OFS Group India',
    description:
      'Privacy policy for OFS Group India (Oriented Facility Solution Pvt Ltd). Learn how we collect, use, and protect personal information submitted through our website and contact forms.',
    path: '/privacy',
    robots: { index: true, follow: true },
  },
  terms: {
    title: 'Terms of Engagement | OFS Group India',
    description:
      'Terms of engagement for using the OFS Group India website and submitting enquiries, RFQs, and job applications to Oriented Facility Solution Pvt Ltd.',
    path: '/terms',
    robots: { index: true, follow: true },
  },
  notFound: {
    title: 'Page Not Found | OFS Group India',
    description: 'The page you are looking for could not be found on the OFS Group India website.',
    path: null,
    noindex: true,
  },
};

/** Homepage FAQ content — answers based on actual OFS offerings. */
export const HOME_FAQS = [
  {
    question: 'What services does OFS Group India provide?',
    answer:
      'OFS provides procurement & shipping, engineering & EPC support, spare parts procurement & MRO, and industrial logistics & shipping for marine, offshore, energy, and industrial sectors.',
  },
  {
    question: 'Which industries does OFS serve?',
    answer:
      'OFS serves oil & gas, marine & offshore, renewable energy, power generation, petrochemicals & refining, pharmaceuticals & chemicals, cement manufacturing, mining & minerals, and heavy engineering industries.',
  },
  {
    question: 'Where is OFS Group India headquartered?',
    answer:
      'OFS Group India is headquartered in Mumbai, Maharashtra at Dynasty Business Park, Andheri-Kurla Road, Andheri (East). OFS also maintains a USA global office in St. Petersburg, Florida.',
  },
  {
    question: 'How can I request a quotation or consultation from OFS?',
    answer:
      'Submit an RFQ or consultation request through the Contact page at ofsgroupindia.com/contact, call +91 98200 00000, or email info@ofsgroupindia.com.',
  },
];
