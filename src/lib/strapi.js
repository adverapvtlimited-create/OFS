/**
 * OFS Strapi CMS Client & Unified Data Fetch Layer
 * Connects Next.js frontend to Strapi v5 Headless CMS with:
 * - 30-second Incremental Static Regeneration (ISR)
 * - Automatic graceful fallback to local src/data/*.json
 * - Deep Media URL normalization (supports Strapi 5/4 media objects, arrays, and public /images/ paths)
 */

import localSiteConfig from '@/data/site-config.json';
import localServices from '@/data/services.json';
import localProducts from '@/data/products.json';
import localIndustries from '@/data/industries.json';
import localCaseStudies from '@/data/case-studies.json';
import localBlogPosts from '@/data/blog-posts.json';
import localJobs from '@/data/jobs.json';
import localRenewables from '@/data/renewables.json';
import localFaqs from '@/data/faqs.json';
import localOffers from '@/data/offers.json';

export const STRAPI_URL =
  process.env.STRAPI_API_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  'http://localhost:1337';

export const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ||
  '';

/**
 * Resolves full media URL for Strapi uploaded assets, Strapi media objects,
 * arrays of media, or returns the given path/fallback string.
 *
 * @param {string|object|Array} media - Raw media field from Strapi or local JSON
 * @returns {string|null} Resolved accessible image URL
 */
export function getStrapiMedia(media) {
  if (!media) return null;

  // If array of media objects, take the first item
  if (Array.isArray(media)) {
    if (media.length === 0) return null;
    return getStrapiMedia(media[0]);
  }

  let url = null;

  if (typeof media === 'string') {
    url = media;
  } else if (typeof media === 'object') {
    // Strapi 5 format: { id, url: '/uploads/...', formats: { ... } }
    // Strapi 4 format: { data: { attributes: { url: '...' } } } or { data: { url: '...' } }
    url =
      media.url ||
      media.data?.attributes?.url ||
      media.data?.url ||
      media.formats?.large?.url ||
      media.formats?.medium?.url ||
      media.formats?.small?.url ||
      media.formats?.thumbnail?.url ||
      null;
  }

  if (!url || typeof url !== 'string') return null;

  // Absolute URLs (Cloudinary, S3, external HTTPS, or data URIs)
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }

  // Strapi local upload directory (e.g. /uploads/image_abc.jpg)
  if (url.startsWith('/uploads')) {
    const base = STRAPI_URL.replace(/\/+$/, '');
    return `${base}${url}`;
  }

  // Local Next.js public directory paths (e.g. /images/...)
  return url;
}

/**
 * Low-level Strapi fetch helper with timeout and fallback support.
 */
export async function fetchStrapi(endpoint, { params = {}, revalidate = 30, fallbackData = null } = {}) {
  try {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

    // Build URL query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const headers = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(url.toString(), {
      method: 'GET',
      headers,
      next: { revalidate, tags: [endpoint.split('?')[0]] },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(`[Strapi Warning] Fetch ${url.pathname} returned ${res.status}. Using fallback data.`);
      return fallbackData;
    }

    const json = await res.json();
    return json?.data !== undefined ? json.data : json;
  } catch (error) {
    console.warn(`[Strapi Offline/Error] Failed to fetch /api/${endpoint}: ${error.message}. Using fallback.`);
    return fallbackData;
  }
}

/* ==========================================================================
   1. SITE CONFIG (Single Type: /api/site-config)
   ========================================================================== */
export async function getSiteConfig() {
  const data = await fetchStrapi(
    'site-config?populate[0]=logo&populate[1]=logoDark&populate[2]=heroImage&populate[3]=contact.addressIndia&populate[4]=contact.addressUSA&populate[5]=stats&populate[6]=socials',
    {
      fallbackData: localSiteConfig,
    }
  );

  if (!data) return localSiteConfig;

  return {
    ...localSiteConfig,
    ...data,
    logo: getStrapiMedia(data.logo) || localSiteConfig.logo,
    logoDark: getStrapiMedia(data.logoDark) || localSiteConfig.logoDark,
    heroImage: getStrapiMedia(data.heroImage) || '/images/live/Banner3.jpg',
    contact: data.contact || localSiteConfig.contact,
    stats: data.stats && data.stats.length > 0 ? data.stats : localSiteConfig.stats,
    socials: data.socials || localSiteConfig.socials,
  };
}

/* ==========================================================================
   2. SERVICES (Collection Type: /api/services)
   ========================================================================== */
export async function getServices() {
  const data = await fetchStrapi(
    'services?populate[0]=heroImage&populate[1]=scrapedImages&populate[2]=capabilities&populate[3]=process&populate[4]=faqs&populate[5]=seo&pagination[pageSize]=100',
    {
      fallbackData: localServices,
    }
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localServices;
  }

  return data.map((item) => ({
    ...item,
    id: item.serviceId || item.id || item.slug,
    shortTitle: item.shortTitle || item.title,
    heroImage: getStrapiMedia(item.heroImage) || item.heroImage || '/images/live/Excellence-tools-official.png',
    scrapedImages: (item.scrapedImages || []).map((img) => getStrapiMedia(img) || img),
    features: item.features || [],
    capabilities: item.capabilities || [],
    process: item.process || [],
    faqs: item.faqs || [],
  }));
}

export async function getServiceBySlug(slug) {
  const services = await getServices();
  const normalized = slug ? slug.toLowerCase().trim() : '';
  const match = services.find((s) => {
    if (!s) return false;
    const sSlug = (s.slug || '').toLowerCase();
    const sId = (s.serviceId || s.id || '').toLowerCase();
    return (
      sSlug === normalized ||
      sId === normalized ||
      (normalized === 'engineering-epc-support-services' && (sSlug.includes('engineering-epc') || sId.includes('engineering-epc'))) ||
      (normalized === 'engineering-epc-support' && (sSlug.includes('engineering-epc') || sId.includes('engineering-epc'))) ||
      (normalized === 'warehouse-2' && (sSlug === 'warehouse' || sId === 'warehouse'))
    );
  });
  if (match) return match;
  return (
    localServices.find((s) => {
      const sSlug = (s.slug || '').toLowerCase();
      const sId = (s.id || '').toLowerCase();
      return (
        sSlug === normalized ||
        sId === normalized ||
        (normalized === 'engineering-epc-support-services' && (sSlug.includes('engineering-epc') || sId.includes('engineering-epc'))) ||
        (normalized === 'engineering-epc-support' && (sSlug.includes('engineering-epc') || sId.includes('engineering-epc'))) ||
        (normalized === 'warehouse-2' && (sSlug === 'warehouse' || sId === 'warehouse'))
      );
    }) || null
  );
}

/* ==========================================================================
   3. PRODUCTS (Collection Type: /api/products)
   ========================================================================== */
export async function getProducts() {
  const data = await fetchStrapi(
    'products?populate[0]=heroImage&populate[1]=catalogItems.image&populate[2]=seo&pagination[pageSize]=100',
    {
      fallbackData: localProducts,
    }
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localProducts;
  }

  return data.map((item) => ({
    ...item,
    id: item.productId || item.id || item.slug,
    shortName: item.shortName || item.name,
    heroImage: getStrapiMedia(item.heroImage) || item.heroImage || '/images/products/draw-works.jpg',
    keyPoints: item.keyPoints || [],
    catalogItems: (item.catalogItems || []).map((ci) => ({
      ...ci,
      image: getStrapiMedia(ci.image) || ci.image || '/images/products/draw-works.jpg',
    })),
  }));
}

export async function getProductBySlug(slug) {
  const products = await getProducts();
  const match = products.find((p) => p.slug === slug || p.productId === slug || p.id === slug);
  if (match) return match;
  return localProducts.find((p) => p.slug === slug || p.id === slug) || null;
}

/* ==========================================================================
   4. INDUSTRIES (Collection Type: /api/industries)
   ========================================================================== */
export async function getIndustries() {
  const data = await fetchStrapi(
    'industries?populate[0]=heroImage&populate[1]=subIndustries.heroImage&populate[2]=seo&pagination[pageSize]=100',
    {
      fallbackData: localIndustries,
    }
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localIndustries;
  }

  return data.map((item) => ({
    ...item,
    id: item.industryId || item.id || item.slug,
    shortName: item.shortName || item.name,
    heroImage: getStrapiMedia(item.heroImage) || item.heroImage || '/images/live/oil-gas-new.jpg',
    keySolutions: item.keySolutions || [],
    subIndustries: (item.subIndustries || []).map((sub) => ({
      ...sub,
      id: sub.subId || sub.id || sub.slug,
      shortName: sub.shortName || sub.name,
      heroImage: getStrapiMedia(sub.heroImage) || sub.heroImage || '/images/live/Excellence-tools-official.png',
      keySolutions: sub.keySolutions || [],
    })),
  }));
}

export async function getIndustryBySlug(slug) {
  const industries = await getIndustries();
  for (const ind of industries) {
    if (ind.slug === slug || ind.industryId === slug || ind.id === slug) {
      return ind;
    }
    if (ind.subIndustries) {
      const sub = ind.subIndustries.find((s) => s.slug === slug || s.subId === slug || s.id === slug);
      if (sub) return sub;
    }
  }

  // Fallback search
  for (const ind of localIndustries) {
    if (ind.slug === slug || ind.id === slug) return ind;
    if (ind.subIndustries) {
      const sub = ind.subIndustries.find((s) => s.slug === slug || s.id === slug);
      if (sub) return sub;
    }
  }
  return null;
}

/* ==========================================================================
   5. CASE STUDIES (Collection Type: /api/case-studies)
   ========================================================================== */
export async function getCaseStudies() {
  const data = await fetchStrapi(
    'case-studies?populate[0]=heroImage&populate[1]=metrics&populate[2]=seo&pagination[pageSize]=100',
    {
      fallbackData: localCaseStudies,
    }
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localCaseStudies;
  }

  return data.map((item) => ({
    ...item,
    id: item.caseStudyId || item.id,
    heroImage: getStrapiMedia(item.heroImage) || item.heroImage || '/images/live/oil-gas-new.jpg',
    metrics: item.metrics || [],
    tags: item.tags || [],
  }));
}

/* ==========================================================================
   6. BLOG POSTS (Collection Type: /api/blog-posts)
   ========================================================================== */
export async function getBlogPosts() {
  const data = await fetchStrapi(
    'blog-posts?populate[0]=image&populate[1]=author.avatar&populate[2]=seo&pagination[pageSize]=100',
    {
      fallbackData: localBlogPosts,
    }
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localBlogPosts;
  }

  return data.map((item) => ({
    ...item,
    id: item.postId || item.id || item.slug,
    image: getStrapiMedia(item.image) || item.image || '/images/live/oil-gas-new.jpg',
    tags: item.tags || [],
    author: item.author
      ? {
          ...item.author,
          avatar: getStrapiMedia(item.author.avatar) || item.author.avatar || '/images/author-default.png',
        }
      : { name: 'OFS Engineering Team', role: 'Technical Desk', avatar: '/images/author-default.png' },
  }));
}

export async function getBlogPostBySlug(slug) {
  const posts = await getBlogPosts();
  const match = posts.find((p) => p.slug === slug || p.postId === slug || p.id === slug);
  if (match) return match;
  return localBlogPosts.find((p) => p.slug === slug || p.id === slug) || null;
}

/* ==========================================================================
   7. JOBS (Collection Type: /api/jobs)
   ========================================================================== */
export async function getJobs() {
  const data = await fetchStrapi('jobs?populate=*&pagination[pageSize]=100', {
    fallbackData: localJobs,
  });

  if (!Array.isArray(data) || data.length === 0) {
    return localJobs;
  }

  return data.map((item) => ({
    ...item,
    id: item.jobId || item.id || item.slug,
    responsibilities: item.responsibilities || [],
    requirements: item.requirements || [],
    benefits: item.benefits || [],
  }));
}

export async function getJobBySlug(slug) {
  const jobs = await getJobs();
  const match = jobs.find((j) => j.slug === slug || j.jobId === slug || j.id === slug);
  if (match) return match;
  return localJobs.find((j) => j.slug === slug || j.id === slug) || null;
}

/* ==========================================================================
   8. RENEWABLES (Single Type: /api/renewable)
   ========================================================================== */
export async function getRenewablesData() {
  const data = await fetchStrapi(
    'renewable?populate[0]=heroBgImage&populate[1]=whyImage&populate[2]=partnerBgImage&populate[3]=solutions.image&populate[4]=whyPills&populate[5]=approachSteps&populate[6]=partnerCards',
    {
      fallbackData: localRenewables,
    }
  );

  if (!data) return localRenewables;

  return {
    ...localRenewables,
    ...data,
    heroBgImage: getStrapiMedia(data.heroBgImage) || localRenewables.heroBgImage,
    whyImage: getStrapiMedia(data.whyImage) || localRenewables.whyImage,
    partnerBgImage: getStrapiMedia(data.partnerBgImage) || localRenewables.partnerBgImage,
    solutions: (data.solutions && data.solutions.length > 0 ? data.solutions : localRenewables.solutions).map((s) => ({
      ...s,
      id: s.solutionId || s.id,
      image: getStrapiMedia(s.image) || s.image,
      bullets: s.bullets || [],
    })),
    whyPills: data.whyPills || localRenewables.whyPills,
    approachSteps: data.approachSteps || localRenewables.approachSteps,
    partnerCards: data.partnerCards || localRenewables.partnerCards,
  };
}

/* ==========================================================================
   9. FAQS (Collection Type: /api/faqs)
   ========================================================================== */
export async function getFaqs() {
  const data = await fetchStrapi('faqs?pagination[pageSize]=100', {
    fallbackData: localFaqs,
  });

  if (!Array.isArray(data) || data.length === 0) {
    return localFaqs;
  }

  return data.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));
}

/* ==========================================================================
   10. OFFERS (Collection Type: /api/offers)
   ========================================================================== */
export async function getOffers() {
  const [data, services] = await Promise.all([
    fetchStrapi(
      'offers?populate[0]=heroImage&populate[1]=blocks.image.src&populate[2]=blocks.items&pagination[pageSize]=100',
      {
        revalidate: 30,
        fallbackData: null,
      }
    ),
    getServices(),
  ]);

  const map = {};

  // 1. Initialize with localOffers fallback
  Object.keys(localOffers).forEach((slug) => {
    map[slug] = { ...localOffers[slug] };
  });

  // 2. Overlay Strapi Offers
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      const existing = map[item.slug] || {};
      map[item.slug] = {
        ...existing,
        ...item,
        heroImage: getStrapiMedia(item.heroImage) || item.heroImage || existing.heroImage || null,
        blocks: (item.blocks && item.blocks.length > 0)
          ? item.blocks.map((b, bIdx) => ({
              ...(existing.blocks?.[bIdx] || {}),
              ...b,
              image: b.image
                ? {
                    ...b.image,
                    src:
                      getStrapiMedia(b.image.src || b.image) ||
                      (typeof b.image === 'string' ? b.image : b.image?.src),
                  }
                : existing.blocks?.[bIdx]?.image || null,
            }))
          : existing.blocks || [],
      };
    });
  }

  // 3. Seamlessly sync with Strapi Services for all service-related offerings
  if (Array.isArray(services) && services.length > 0) {
    services.forEach((srv) => {
      const srvSlug = srv.slug;
      const srvId = srv.id || srv.serviceId;

      const targetSlugs = [
        srvSlug,
        srvId,
        srvSlug === 'engineering-epc-support' ? 'engineering-epc-support-services' : null,
        srvSlug === 'engineering-epc' ? 'engineering-epc-support-services' : null,
        srvSlug === 'warehouse' ? 'warehouse-2' : null,
      ].filter(Boolean);

      targetSlugs.forEach((slug) => {
        if (!map[slug]) {
          map[slug] = {
            slug,
            title: srv.title,
            category: 'services',
            categoryLabel: 'Services',
            tagline: srv.tagline,
            description: srv.description,
            heroImage: srv.heroImage || null,
            features: (srv.features || []).map((f) => ({ title: f, description: '' })),
            blocks: [],
            gallery: (srv.scrapedImages || []).map((img) => ({ src: img, alt: srv.title })),
          };
        } else {
          // Prioritize uploaded Strapi service image if present
          if (srv.heroImage) {
            map[slug].heroImage = srv.heroImage;
          }
          if (srv.tagline) {
            map[slug].tagline = srv.tagline;
          }
          if (srv.title && !map[slug].title) {
            map[slug].title = srv.title;
          }
          if (srv.description && !map[slug].description) {
            map[slug].description = srv.description;
          }
          if (srv.scrapedImages && srv.scrapedImages.length > 0) {
            // Assign scraped images to blocks that lack a valid image src
            if (map[slug].blocks && map[slug].blocks.length > 0) {
              let imgIdx = 0;
              map[slug].blocks = map[slug].blocks.map((block) => {
                const currentSrc = block.image?.src || (typeof block.image === 'string' ? block.image : null);
                if (!currentSrc && srv.scrapedImages[imgIdx]) {
                  const assignedSrc = srv.scrapedImages[imgIdx];
                  imgIdx++;
                  return {
                    ...block,
                    image: { src: assignedSrc, alt: block.title },
                  };
                }
                if (!currentSrc) {
                  return {
                    ...block,
                    image: null,
                  };
                }
                return block;
              });
            }
            // Only set gallery if multiple images exist
            if (srv.scrapedImages.length > 1) {
              map[slug].gallery = srv.scrapedImages.map((img) => ({ src: img, alt: srv.title }));
            } else {
              map[slug].gallery = [];
            }
          }
        }
      });
    });
  }

  return map;
}

export async function getOfferBySlug(slug) {
  const offers = await getOffers();
  const normalized = slug ? slug.toLowerCase().trim() : '';

  if (offers && offers[normalized]) {
    return offers[normalized];
  }

  // Handle aliases like engineering-epc-support <-> engineering-epc-support-services
  if (normalized === 'engineering-epc-support-services' && offers['engineering-epc-support']) {
    return offers['engineering-epc-support'];
  }
  if (normalized === 'engineering-epc-support' && offers['engineering-epc-support-services']) {
    return offers['engineering-epc-support-services'];
  }
  if (normalized === 'warehouse-2' && offers['warehouse']) {
    return offers['warehouse'];
  }
  if (normalized === 'warehouse' && offers['warehouse-2']) {
    return offers['warehouse-2'];
  }

  return localOffers[normalized] || null;
}

export async function getAllOfferSlugs() {
  const offers = await getOffers();
  return Object.keys(offers);
}

/* ==========================================================================
   11. ENQUIRIES (POST /api/enquiries)
   ========================================================================== */
export async function createEnquiryInStrapi(enquiryData) {
  try {
    const payload = {
      data: {
        formType: enquiryData.formType || 'general',
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        company: enquiryData.company || '',
        subjectOrRole: enquiryData.service || enquiryData.subjectOrRole || '',
        message: enquiryData.message || '',
        attachedFile: enquiryData.cloudinaryUrl || enquiryData.pdfUrl || '',
        requestStatus: 'New',
        sourceUrl: enquiryData.sourceUrl || '',
      },
    };

    const headers = { 'Content-Type': 'application/json' };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(`${STRAPI_URL}/api/enquiries`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn('[Strapi Enquiry POST Warning]:', res.status, errText);
      return { success: false, status: res.status, error: errText };
    }

    const json = await res.json();
    return { success: true, data: json?.data };
  } catch (err) {
    console.warn('[Strapi Enquiry POST Error]:', err.message);
    return { success: false, error: err.message };
  }
}
