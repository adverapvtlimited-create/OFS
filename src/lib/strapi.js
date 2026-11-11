/**
 * OFS Strapi CMS Client & Unified Data Fetch Layer
 * Connects Next.js frontend to Strapi v5 Headless CMS with:
 * - 30-second Incremental Static Regeneration (ISR)
 * - Automatic graceful fallback to local src/data/*.json
 * - Deep Media URL normalization (supports Strapi 5/4 media objects, arrays, and public /images/ paths)
 */

import localSiteConfig from "@/data/site-config.json";
import localProducts from "@/data/products.json";
import localIndustries from "@/data/industries.json";
import localCaseStudies from "@/data/case-studies.json";
import localBlogPosts from "@/data/blog-posts.json";
import localJobs from "@/data/jobs.json";
import localRenewables from "@/data/renewables.json";
import localFaqs from "@/data/faqs.json";
import localOffers from "@/data/offers.json";

export const STRAPI_URL = (
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_API_URL ||
  "https://cms.ofsworld.com"
).replace(/\/+$/, "");

export const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ||
  "";

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

  if (typeof media === "string") {
    url = media;
  } else if (typeof media === "object") {
    // Strapi 5 format: { id, url: '/uploads/...', formats: { ... } }
    // Component media: { src: { url: '...' } } or { src: '/images/...' }
    // Strapi 4 format: { data: { attributes: { url: '...' } } } or { data: { url: '...' } }
    url =
      media.url ||
      media.src?.url ||
      (typeof media.src === "string" ? media.src : null) ||
      media.data?.attributes?.url ||
      media.data?.url ||
      media.formats?.large?.url ||
      media.formats?.medium?.url ||
      media.formats?.small?.url ||
      media.formats?.thumbnail?.url ||
      media.src?.formats?.large?.url ||
      media.src?.formats?.medium?.url ||
      media.src?.formats?.small?.url ||
      media.src?.formats?.thumbnail?.url ||
      null;
  }

  if (!url || typeof url !== "string") return null;

  // Check if this is a known Strapi asset with local high-res mirror in public/images/live/
  const cleanUrl = url.toLowerCase();
  const knownLocalAssets = [
    ['facilities_offered', '/images/live/facilities-offered.png'],
    ['spare_parts_support_photo', '/images/live/spare-parts-support-photo.png'],
    ['spare_parts_strategy_photo', '/images/live/spare-parts-strategy-photo.png'],
    ['supply_chain_planning_photo', '/images/live/supply-chain-planning-photo.png'],
    ['supply_chain_challenges_photo', '/images/live/supply-chain-challenges-photo.png'],
    ['logistics_integration_photo', '/images/live/logistics-integration-photo.png'],
    ['our_warehouse_services_photo', '/images/live/our-warehouse-services-photo.png'],
    ['project_supply_revolution', '/images/live/project-supply-revolution.png'],
    ['project_supply_approach', '/images/live/project-supply-approach.png'],
    ['global_mro_hero', '/images/live/global-mro-hero.png'],
    ['global_mro_block0', '/images/live/global-mro-block0.png'],
    ['global_mro_block1', '/images/live/global-mro-block1.png'],
    ['global_mro_block2', '/images/live/global-mro-block2.png'],
    ['inventory_opt_block0', '/images/live/inventory-opt-block0.png'],
    ['inventory_opt_block1', '/images/live/inventory-opt-block1.png'],
    ['mdm_block0', '/images/live/mdm-block0.png'],
    ['mdm_block1', '/images/live/mdm-block1.png'],
    ['mro_supply_block0', '/images/live/mro-supply-block0.png'],
    ['mro_supply_block1', '/images/live/mro-supply-block1.png'],
    ['plant_maint_block0', '/images/live/plant-maint-block0.png'],
    ['plant_maint_block1', '/images/live/plant-maint-block1.png'],
    ['spare_parts_block0', '/images/live/spare-parts-block0.png'],
    ['spare_parts_block1', '/images/live/spare-parts-block1.png'],
    ['strategic_sourcing_block0', '/images/live/strategic-sourcing-block0.png'],
    ['strategic_sourcing_block1', '/images/live/strategic-sourcing-block1.png'],
    ['supply_chain_finance_block0', '/images/live/supply-chain-finance-block0.png'],
    ['supply_chain_finance_block1', '/images/live/supply-chain-finance-block1.png'],
    ['permit_design_package_overview', '/images/live/permit-design-package-overview.png'],
    ['permit_design_roadmap', '/images/live/permit-design-roadmap.png'],
    ['proposal_to_permit_banner', '/images/live/proposal-to-permit-banner.png'],
    ['key_practices', '/images/live/key-practices.png'],
  ];

  for (const [key, localPath] of knownLocalAssets) {
    if (cleanUrl.includes(key)) {
      return localPath;
    }
  }

  // Absolute URLs (Cloudinary, S3, external HTTPS, or data URIs)
  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  // Strapi local upload directory (e.g. /uploads/image_abc.jpg)
  if (url.startsWith("/uploads")) {
    const base = STRAPI_URL.replace(/\/+$/, "");
    return `${base}${url}`;
  }

  // Local Next.js public directory paths (e.g. /images/...)
  return url;
}

/**
 * Low-level Strapi fetch helper with timeout and fallback support.
 */
export async function fetchStrapi(
  endpoint,
  { params = {}, revalidate = 30, fallbackData = null } = {},
) {
  try {
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);

    // Build URL query string
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });

    const headers = {
      "Content-Type": "application/json",
    };

    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(url.toString(), {
      method: "GET",
      headers,
      next: { revalidate, tags: [endpoint.split("?")[0]] },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.warn(
        `[Strapi Warning] Fetch ${url.pathname} returned ${res.status}. Using fallback data.`,
      );
      return fallbackData;
    }

    const json = await res.json();
    return json?.data !== undefined ? json.data : json;
  } catch (error) {
    console.warn(
      `[Strapi Offline/Error] Failed to fetch /api/${endpoint}: ${error.message}. Using fallback.`,
    );
    return fallbackData;
  }
}

/* ==========================================================================
   1. SITE CONFIG (Single Type: /api/site-config)
   ========================================================================== */
export async function getSiteConfig() {
  const data = await fetchStrapi(
    "site-config?populate[0]=logo&populate[1]=logoDark&populate[2]=heroImage&populate[3]=contact.addressIndia&populate[4]=contact.addressUSA&populate[5]=stats&populate[6]=socials",
    {
      fallbackData: localSiteConfig,
    },
  );

  if (!data) return localSiteConfig;

  return {
    ...localSiteConfig,
    ...data,
    logo: getStrapiMedia(data.logo) || localSiteConfig.logo,
    logoDark: getStrapiMedia(data.logoDark) || localSiteConfig.logoDark,
    heroImage: getStrapiMedia(data.heroImage) || "/images/live/Banner3.jpg",
    contact: data.contact || localSiteConfig.contact,
    stats:
      data.stats && data.stats.length > 0 ? data.stats : localSiteConfig.stats,
    socials: data.socials || localSiteConfig.socials,
  };
}

/* ==========================================================================
   2. SERVICES (Unified with What We Offer / Category: 'services')
   ========================================================================== */
export async function getServices() {
  const offers = await getOffers();
  return Object.values(offers).filter(
    (item) =>
      item.category === "services" ||
      (item.categoryLabel || "").toLowerCase() === "services",
  );
}

export async function getServiceBySlug(slug) {
  return getOfferBySlug(slug);
}

/* ==========================================================================
   3. PRODUCTS (Collection Type: /api/products)
   ========================================================================== */
export async function getProducts() {
  const data = await fetchStrapi(
    "products?populate[heroImage]=true&populate[seo]=true&populate[catalogItems][populate][image]=true&populate[catalogItems][populate][product][populate][heroImage]=true&populate[catalogItems][populate][product][populate][catalog_items][populate][image]=true&populate[catalogItems][populate][product][populate][seo]=true&pagination[pageSize]=100",
    {
      fallbackData: localProducts,
    },
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localProducts;
  }

  return data.map((item) => {
    const localMatch =
      localProducts.find(
        (p) =>
          p.slug === item.slug || p.id === item.productId || p.id === item.slug,
      ) || {};

    const strapiCatalogItems = Array.isArray(item.catalogItems)
      ? item.catalogItems
      : [];
    const localCatalogItems = Array.isArray(localMatch.catalogItems)
      ? localMatch.catalogItems
      : [];

    return {
      ...item,
      id: item.productId || item.id || item.slug,
      shortName: item.shortName || item.name,
      heroImage:
        getStrapiMedia(item.heroImage) ||
        (typeof item.heroImage === "string" && item.heroImage.startsWith("/")
          ? item.heroImage
          : null) ||
        localMatch.heroImage ||
        "/images/products/mud-pumps.webp",
      keyPoints: item.keyPoints || localMatch.keyPoints || [],
      catalogItems: (strapiCatalogItems.length > 0
        ? strapiCatalogItems
        : localCatalogItems
      ).map((ci, idx) => {
        const localCi =
          localCatalogItems[idx] ||
          localCatalogItems.find((c) => c.title === ci.title) ||
          {};
        const strapiImg =
          getStrapiMedia(ci.image) ||
          (typeof ci.image === "string" &&
          ci.image.startsWith("/") &&
          !ci.image.includes("draw-works.jpg")
            ? ci.image
            : null);

        const rawSubProduct = ci.product || ci.products;
        const localSubProduct = localCi.product || localCi.products;
        const resolvedSubProduct = rawSubProduct
          ? {
              ...rawSubProduct,
              image:
                getStrapiMedia(rawSubProduct.image) ||
                getStrapiMedia(rawSubProduct.heroImage) ||
                rawSubProduct.image ||
                null,
              heroImage:
                getStrapiMedia(rawSubProduct.heroImage) ||
                getStrapiMedia(rawSubProduct.image) ||
                null,
              catalog_items: Array.isArray(rawSubProduct.catalog_items)
                ? rawSubProduct.catalog_items.map((sub) => ({
                    ...sub,
                    title: sub.title || "",
                    description: sub.description || "",
                    image: getStrapiMedia(sub.image) || sub.image || null,
                  }))
                : (Array.isArray(localSubProduct?.catalog_items)
                    ? localSubProduct.catalog_items
                    : []),
            }
          : localSubProduct || null;

        return {
          ...localCi,
          ...ci,
          title: ci.title || ci.name || localCi.title || "",
          name: ci.name || ci.title || localCi.name || "",
          image:
            strapiImg ||
            localCi.image ||
            localMatch.heroImage ||
            "/images/products/mud-pumps.webp",
          description: ci.description || localCi.description || "",
          product: resolvedSubProduct,
          products: resolvedSubProduct,
        };
      }),
    };
  });
}

export function slugify(text) {
  if (!text) return "";
  return String(text)
    .toLowerCase()
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function formatTitleCase(str) {
  if (!str || typeof str !== "string") return "";
  const cleaned = str.includes("-") && !str.includes(" ") ? str.replace(/-/g, " ") : str;
  return cleaned
    .split(" ")
    .map((w) => {
      if (!w) return "";
      // Keep acronyms intact if they are 2+ uppercase letters (e.g. API, OEM, MRO, ISO, VFD, HVAC, ESP, LED)
      if (/^[A-Z0-9]{2,}$/.test(w)) return w;
      return w.charAt(0).toUpperCase() + w.slice(1);
    })
    .join(" ");
}

export async function getProductBySlug(slug) {
  if (!slug) return null;
  const target = slugify(slug);
  const products = await getProducts();

  // 1. First, search top-level products
  const directMatch = products.find(
    (p) =>
      slugify(p.slug) === target ||
      slugify(p.productId) === target ||
      slugify(p.id) === target ||
      slugify(p.name) === target,
  );
  if (directMatch) return directMatch;

  // 2. Second, search nested sub-products inside catalogItems
  for (const parent of products) {
    if (Array.isArray(parent.catalogItems)) {
      for (const ci of parent.catalogItems) {
        const subProd = ci.product || ci.products;
        if (!subProd) continue;

        const subSlug =
          slugify(subProd.slug) ||
          slugify(subProd.productid) ||
          slugify(subProd.productId) ||
          slugify(subProd.name) ||
          slugify(ci.title);

        if (
          subSlug === target ||
          slugify(subProd.title) === target ||
          slugify(ci.title) === target ||
          slugify(subProd.name) === target
        ) {
          const resolvedSlug = subProd.slug || slugify(subProd.name || ci.title || target);
          const rawName = subProd.name || subProd.title || ci.title || resolvedSlug;
          const formattedName = formatTitleCase(rawName);
          const rawShortName = subProd.shortName || subProd.name || ci.title || resolvedSlug;
          const formattedShortName = formatTitleCase(rawShortName);
          const subCatalogItems = Array.isArray(subProd.catalog_items)
            ? subProd.catalog_items.map((subCi) => ({
                title: subCi.title || "",
                description: subCi.description || "",
                image:
                  getStrapiMedia(subCi.image) ||
                  subCi.image ||
                  ci.image ||
                  parent.heroImage ||
                  "/images/products/mud-pumps.webp",
                bullets: Array.isArray(subCi.bullets) ? subCi.bullets : [],
              }))
            : [];

          return {
            id: subProd.productid || subProd.id || resolvedSlug,
            slug: resolvedSlug,
            name: formattedName,
            shortName: formattedShortName,
            category: subProd.category || parent.category || "Certified Equipment",
            icon: subProd.icon || parent.icon || "Wrench",
            heroImage:
              getStrapiMedia(subProd.heroImage) ||
              getStrapiMedia(subProd.image) ||
              ci.image ||
              parent.heroImage ||
              "/images/products/mud-pumps.webp",
            summary: subProd.summary || ci.description || parent.summary || "",
            description: subProd.description || ci.description || parent.description || "",
            keyPoints:
              Array.isArray(subProd.keyPoints) && subProd.keyPoints.length > 0
                ? subProd.keyPoints
                : Array.isArray(parent.keyPoints)
                ? parent.keyPoints
                : [],
            catalogItems: subCatalogItems,
            seo: subProd.seo
              ? {
                  metaTitle:
                    subProd.seo.metaTitle ||
                    `${formattedName} | OFS Equipment & Procurement`,
                  metaDescription:
                    subProd.seo.metaDescription || subProd.summary || ci.description,
                  keywords:
                    subProd.seo.keywords ||
                    `${formattedName}, ${parent.name}, industrial equipment`,
                }
              : {
                  metaTitle: `${formattedName} | OFS Equipment & Procurement`,
                  metaDescription: subProd.summary || ci.description,
                  keywords: `${formattedName}, industrial equipment, OFS Group India`,
                },
            parentProduct: {
              name: parent.name,
              shortName: parent.shortName || parent.name,
              slug: parent.slug,
            },
          };
        }
      }
    }
  }

  // 3. Fallback search in local static JSON
  if (Array.isArray(localProducts)) {
    const localDirect = localProducts.find(
      (p) =>
        slugify(p.slug) === target ||
        slugify(p.productId) === target ||
        slugify(p.id) === target,
    );
    if (localDirect) return localDirect;

    for (const parent of localProducts) {
      if (Array.isArray(parent.catalogItems)) {
        for (const ci of parent.catalogItems) {
          const subProd = ci.product || ci.products;
          if (!subProd) continue;
          const subSlug =
            slugify(subProd.slug) ||
            slugify(subProd.productid) ||
            slugify(subProd.name) ||
            slugify(ci.title);

          if (subSlug === target || slugify(ci.title) === target) {
            const rawSubName = subProd.name || ci.title || subSlug;
            const formattedSubName = formatTitleCase(rawSubName);
            const rawSubShortName = subProd.shortName || ci.title || subSlug;
            const formattedSubShortName = formatTitleCase(rawSubShortName);
            return {
              id: subProd.productid || subSlug,
              slug: subProd.slug || subSlug,
              name: formattedSubName,
              shortName: formattedSubShortName,
              category: subProd.category || parent.category || "Certified Equipment",
              icon: subProd.icon || parent.icon || "Wrench",
              heroImage: subProd.heroImage || subProd.image || ci.image || parent.heroImage,
              summary: subProd.summary || ci.description,
              description: subProd.description || ci.description,
              keyPoints: subProd.keyPoints || parent.keyPoints || [],
              catalogItems: (subProd.catalog_items || []).map((subCi) => ({
                title: subCi.title,
                description: subCi.description,
                image: subCi.image || ci.image,
              })),
              parentProduct: {
                name: parent.name,
                shortName: parent.shortName || parent.name,
                slug: parent.slug,
              },
            };
          }
        }
      }
    }
  }

  return null;
}

/* ==========================================================================
   4. INDUSTRIES (Collection Type: /api/industries)
   ========================================================================== */
export async function getIndustries() {
  const data = await fetchStrapi(
    "industries?populate[0]=heroImage&populate[1]=subIndustries.heroImage&populate[2]=seo&populate[3]=relatedService&pagination[pageSize]=100",
    {
      fallbackData: localIndustries,
    },
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localIndustries;
  }

  return data.map((item) => {
    const localMatch =
      localIndustries.find(
        (i) =>
          i.slug === item.slug ||
          i.id === item.industryId ||
          i.id === item.slug,
      ) || {};

    const strapiSubIndustries = Array.isArray(item.subIndustries)
      ? item.subIndustries
      : null;
    const localSubIndustries = Array.isArray(localMatch.subIndustries)
      ? localMatch.subIndustries
      : [];
    const targetSubIndustries =
      strapiSubIndustries !== null ? strapiSubIndustries : localSubIndustries;

    return {
      ...localMatch,
      ...item,
      id: item.industryId || item.id || item.slug,
      shortName: item.shortName || item.name,
      heroImage:
        getStrapiMedia(item.heroImage) ||
        (typeof item.heroImage === "string" && item.heroImage.startsWith("/")
          ? item.heroImage
          : null) ||
        localMatch.heroImage ||
        "/images/live/oil-gas-new.jpg",
      relatedService:
        item.relatedService !== undefined
          ? item.relatedService
          : localMatch.relatedService || null,
      keySolutions:
        item.keySolutions !== undefined
          ? item.keySolutions
          : localMatch.keySolutions || [],
      subIndustries: targetSubIndustries.map((sub, idx) => {
        const localSub =
          localSubIndustries.find(
            (s) => s.slug === sub.slug || s.id === sub.subId,
          ) ||
          localSubIndustries[idx] ||
          {};
        return {
          ...localSub,
          ...sub,
          id: sub.subId || sub.id || sub.slug || localSub.id,
          shortName: sub.shortName || sub.name || localSub.shortName,
          heroImage:
            getStrapiMedia(sub.heroImage) ||
            (typeof sub.heroImage === "string" && sub.heroImage.startsWith("/")
              ? sub.heroImage
              : null) ||
            localSub.heroImage ||
            "/images/live/Excellence-tools-official.png",
          keySolutions: sub.keySolutions || localSub.keySolutions || [],
        };
      }),
      ...(item.customServices || localMatch.customServices
        ? { customServices: item.customServices || localMatch.customServices }
        : {}),
    };
  });
}

export async function getIndustryBySlug(slug) {
  const industries = await getIndustries();
  for (const ind of industries) {
    if (ind.slug === slug || ind.industryId === slug || ind.id === slug) {
      return ind;
    }
    if (ind.subIndustries) {
      const sub = ind.subIndustries.find(
        (s) => s.slug === slug || s.subId === slug || s.id === slug,
      );
      if (sub) return sub;
    }
  }

  // Fallback search
  for (const ind of localIndustries) {
    if (ind.slug === slug || ind.id === slug) return ind;
    if (ind.subIndustries) {
      const sub = ind.subIndustries.find(
        (s) => s.slug === slug || s.id === slug,
      );
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
    "case-studies?populate[0]=heroImage&populate[1]=metrics&populate[2]=seo&pagination[pageSize]=100",
    {
      fallbackData: localCaseStudies,
    },
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localCaseStudies;
  }

  return data.map((item) => ({
    ...item,
    id: item.caseStudyId || item.id,
    heroImage:
      getStrapiMedia(item.heroImage) ||
      item.heroImage ||
      "/images/live/oil-gas-new.jpg",
    metrics: item.metrics || [],
    tags: item.tags || [],
  }));
}

/* ==========================================================================
   6. BLOG POSTS (Collection Type: /api/blog-posts)
   ========================================================================== */
export async function getBlogPosts() {
  const data = await fetchStrapi(
    "blog-posts?populate[0]=image&populate[1]=author.avatar&populate[2]=seo&pagination[pageSize]=100",
    {
      fallbackData: localBlogPosts,
    },
  );

  if (!Array.isArray(data) || data.length === 0) {
    return localBlogPosts;
  }

  return data.map((item) => ({
    ...item,
    id: item.postId || item.id || item.slug,
    image:
      getStrapiMedia(item.image) ||
      item.image ||
      "/images/live/oil-gas-new.jpg",
    tags: item.tags || [],
    author: item.author
      ? {
          ...item.author,
          avatar:
            getStrapiMedia(item.author.avatar) ||
            item.author.avatar ||
            "/images/author-default.png",
        }
      : {
          name: "OFS Engineering Team",
          role: "Technical Desk",
          avatar: "/images/author-default.png",
        },
  }));
}

export async function getBlogPostBySlug(slug) {
  const posts = await getBlogPosts();
  const match = posts.find(
    (p) => p.slug === slug || p.postId === slug || p.id === slug,
  );
  if (match) return match;
  return localBlogPosts.find((p) => p.slug === slug || p.id === slug) || null;
}

/* ==========================================================================
   7. JOBS (Collection Type: /api/jobs)
   ========================================================================== */
export async function getJobs() {
  const data = await fetchStrapi("jobs?populate=*&pagination[pageSize]=100", {
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
  const match = jobs.find(
    (j) => j.slug === slug || j.jobId === slug || j.id === slug,
  );
  if (match) return match;
  return localJobs.find((j) => j.slug === slug || j.id === slug) || null;
}

/* ==========================================================================
   8. RENEWABLES (Single Type: /api/renewable)
   ========================================================================== */
export async function getRenewablesData() {
  const data = await fetchStrapi(
    "renewable?populate[0]=heroBgImage&populate[1]=whyImage&populate[2]=partnerBgImage&populate[3]=solutions.image&populate[4]=whyPills&populate[5]=approachSteps&populate[6]=partnerCards",
    {
      fallbackData: localRenewables,
    },
  );

  if (!data) return localRenewables;

  return {
    ...localRenewables,
    ...data,
    heroBgImage:
      getStrapiMedia(data.heroBgImage) || localRenewables.heroBgImage,
    whyImage: getStrapiMedia(data.whyImage) || localRenewables.whyImage,
    partnerBgImage:
      getStrapiMedia(data.partnerBgImage) || localRenewables.partnerBgImage,
    solutions: (data.solutions && data.solutions.length > 0
      ? data.solutions
      : localRenewables.solutions
    ).map((s) => ({
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
  const data = await fetchStrapi("faqs?pagination[pageSize]=100", {
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
  const data = await fetchStrapi(
    "offers?populate[heroImage]=true&populate[blocks][populate][image][populate]=*&populate[blocks][populate][items]=true&pagination[pageSize]=100",
    {
      revalidate: 30,
      fallbackData: null,
    },
  );

  const map = {};

  // 1. Initialize with localOffers fallback
  Object.keys(localOffers).forEach((slug) => {
    map[slug] = { ...localOffers[slug] };
  });

  // 2. Overlay Strapi Offers
  if (Array.isArray(data) && data.length > 0) {
    data.forEach((item) => {
      const existing = map[item.slug] || {};
      const cleanCategory = (item.category || existing.category || "").trim().toLowerCase();
      const cleanCategoryLabel = (item.categoryLabel || existing.categoryLabel || "").trim();

      const resolvedHero =
        getStrapiMedia(item.heroImage) ||
        getStrapiMedia(item.heroImageUrl) ||
        (typeof item.heroImage === 'string' ? item.heroImage : null) ||
        (item.heroImage === null ? null : existing.heroImage) ||
        null;

      map[item.slug] = {
        ...existing,
        ...item,
        category: cleanCategory,
        categoryLabel: cleanCategoryLabel,
        heroImage: resolvedHero,
        overviewTitle: item.overviewTitle || existing.overviewTitle || null,
        overviewParagraphs:
          item.overviewParagraphs || existing.overviewParagraphs || null,
        features: item.features || existing.features || null,
        sections: item.sections || existing.sections || null,
        gallery: (Array.isArray(item.gallery) && item.gallery.length > 0)
          ? item.gallery.map((g) => ({
              src: getStrapiMedia(g) || (typeof g === 'string' ? g : g.src || g.url),
              alt: g.alt || g.name || item.title || '',
            }))
          : existing.gallery || null,
        blocks: (item.blocks && item.blocks.length > 0)
          ? item.blocks
              .filter((b) => !b.title?.toLowerCase().includes('benefits of ofs supply chain'))
              .map((b, bIdx) => {
              const prevB =
                existing.blocks?.find(
                  (eb) =>
                    (b.title && eb.title && eb.title.trim().toLowerCase() === b.title.trim().toLowerCase()) ||
                    (b.type && eb.type && eb.type === b.type)
                ) || existing.blocks?.[bIdx] || {};

              // Prioritize Strapi Media Upload (b.image.src / b.image) first
              const strapiMediaAsset = getStrapiMedia(b.image?.src || b.image);
              const rawImg =
                strapiMediaAsset ||
                (typeof b.image === 'string' ? b.image : null) ||
                b.imageUrl ||
                prevB.image?.src ||
                null;

              const resolvedImg = getStrapiMedia(rawImg);

              return {
                ...prevB,
                ...b,
                imagePosition: b.imagePosition || prevB.imagePosition || "bottom",
                buttonText: b.buttonText || prevB.buttonText || null,
                buttonHref: b.buttonHref || prevB.buttonHref || null,
                image: resolvedImg
                  ? {
                      src: resolvedImg,
                      alt: b.imageAlt || b.image?.alt || prevB.image?.alt || b.title || '',
                    }
                  : null,
                items: (b.items && b.items.length > 0)
                  ? b.items.map((i, iIdx) => {
                      const prevI =
                        prevB.items?.find(
                          (pi) => pi.title && i.title && pi.title.trim().toLowerCase() === i.title.trim().toLowerCase()
                        ) ||
                        prevB.items?.[iIdx] ||
                        {};
                      if (typeof i === 'object') {
                        return {
                          ...prevI,
                          ...i,
                          image: getStrapiMedia(i.image) || i.image || prevI.image || null,
                          icon: getStrapiMedia(i.icon) || i.icon || prevI.icon || null,
                        };
                      }
                      return { title: i, description: '' };
                    })
                  : prevB.items || [],
                paragraphs: (Array.isArray(b.paragraphs) && b.paragraphs.length > 0)
                  ? b.paragraphs
                  : prevB.paragraphs || [],
                stats: (b.stats && b.stats.length > 0)
                  ? b.stats.map((s, sIdx) => {
                      const prevS =
                        prevB.stats?.find(
                          (ps) => ps.label && s.label && ps.label.trim().toLowerCase() === s.label.trim().toLowerCase()
                        ) ||
                        prevB.stats?.[sIdx] ||
                        {};
                      return {
                        ...prevS,
                        ...s,
                        image: getStrapiMedia(s.image) || getStrapiMedia(s.imageUrl) || s.image || prevS.image || null,
                      };
                    })
                  : prevB.stats || [],
              };
            })
          : existing.blocks || [],
      };
    });
  }

  return map;
}

export async function getOfferBySlug(slug) {
  const offers = await getOffers();
  const normalized = slug ? slug.toLowerCase().trim() : "";

  if (offers && offers[normalized]) {
    return offers[normalized];
  }

  // Handle aliases like engineering-epc-support <-> engineering-epc-support-services
  if (
    normalized === "engineering-epc-support-services" &&
    offers["engineering-epc-support"]
  ) {
    return offers["engineering-epc-support"];
  }
  if (
    normalized === "engineering-epc-support" &&
    offers["engineering-epc-support-services"]
  ) {
    return offers["engineering-epc-support-services"];
  }
  if (normalized === "warehouse-2" && offers["warehouse"]) {
    return offers["warehouse"];
  }
  if (normalized === "warehouse" && offers["warehouse-2"]) {
    return offers["warehouse-2"];
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
        formType: enquiryData.formType || "general",
        name: enquiryData.name,
        email: enquiryData.email,
        phone: enquiryData.phone,
        company: enquiryData.company || "",
        subjectOrRole: enquiryData.service || enquiryData.subjectOrRole || "",
        message: enquiryData.message || "",
        attachedFile: enquiryData.cloudinaryUrl || enquiryData.pdfUrl || "",
        requestStatus: "New",
        sourceUrl: enquiryData.sourceUrl || "",
      },
    };

    const headers = { "Content-Type": "application/json" };
    if (STRAPI_API_TOKEN) {
      headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const res = await fetch(`${STRAPI_URL}/api/enquiries`, {
      method: "POST",
      headers,
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.warn("[Strapi Enquiry POST Warning]:", res.status, errText);
      return { success: false, status: res.status, error: errText };
    }

    const json = await res.json();
    return { success: true, data: json?.data };
  } catch (err) {
    console.warn("[Strapi Enquiry POST Error]:", err.message);
    return { success: false, error: err.message };
  }
}
