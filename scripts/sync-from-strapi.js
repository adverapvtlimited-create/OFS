/**
 * OFS Strapi to Local JSON Sync Utility
 *
 * Fetches the latest published content and media assets from Strapi Headless CMS
 * and updates local JSON files in OFS/src/data/*.json for high performance,
 * zero-downtime offline fallback, and ISR hydration.
 *
 * Usage:
 * node scripts/sync-from-strapi.js
 * or:
 * STRAPI_URL=http://localhost:1337 npm run sync:strapi
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STRAPI_URL = (
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "http://localhost:1337"
).replace(/\/+$/, "");

const STRAPI_API_TOKEN =
  process.env.STRAPI_API_TOKEN ||
  process.env.NEXT_PUBLIC_STRAPI_API_TOKEN ||
  "";

const dataDir = path.resolve(__dirname, "../src/data");

function resolveMediaUrl(media) {
  if (!media) return null;

  if (Array.isArray(media)) {
    if (media.length === 0) return null;
    return resolveMediaUrl(media[0]);
  }

  let url = null;
  if (typeof media === "string") {
    url = media;
  } else if (typeof media === "object") {
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

  if (!url || typeof url !== "string") return null;

  if (
    url.startsWith("http://") ||
    url.startsWith("https://") ||
    url.startsWith("data:")
  ) {
    return url;
  }

  if (url.startsWith("/uploads")) {
    return `${STRAPI_URL}${url}`;
  }

  return url;
}

async function fetchFromStrapi(endpoint) {
  const url = `${STRAPI_URL}/api/${endpoint}`;
  const headers = { "Content-Type": "application/json" };
  if (STRAPI_API_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_API_TOKEN}`;
  }

  try {
    const res = await fetch(url, { headers });
    if (!res.ok) {
      console.warn(`  ⚠️ Strapi fetch failed (${res.status}) for ${endpoint}`);
      return null;
    }
    const json = await res.json();
    return json?.data !== undefined ? json.data : json;
  } catch (err) {
    console.warn(`  ⚠️ Error connecting to Strapi at ${url}: ${err.message}`);
    return null;
  }
}

function writeJson(filename, data) {
  const targetPath = path.join(dataDir, filename);
  fs.writeFileSync(targetPath, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log(`  ✅ Written -> src/data/${filename}`);
}

async function syncSiteConfig() {
  console.log("📌 Syncing Site Config...");
  const data = await fetchFromStrapi(
    "site-config?populate[0]=logo&populate[1]=logoDark&populate[2]=heroImage&populate[3]=contact.addressIndia&populate[4]=contact.addressUSA&populate[5]=stats&populate[6]=socials",
  );
  if (!data) return;

  const local = JSON.parse(
    fs.readFileSync(path.join(dataDir, "site-config.json"), "utf8"),
  );
  const synced = {
    ...local,
    ...data,
    logo: resolveMediaUrl(data.logo) || local.logo,
    logoDark: resolveMediaUrl(data.logoDark) || local.logoDark,
    heroImage:
      resolveMediaUrl(data.heroImage) ||
      local.heroImage ||
      "/images/live/Banner3.jpg",
    contact: data.contact || local.contact,
    stats: data.stats?.length ? data.stats : local.stats,
    socials: data.socials || local.socials,
  };
  writeJson("site-config.json", synced);
}

async function syncServices() {
  console.log("📌 Syncing Services...");
  const data = await fetchFromStrapi(
    "services?populate[0]=heroImage&populate[1]=scrapedImages&populate[2]=capabilities&populate[3]=process&populate[4]=faqs&populate[5]=seo&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    id: item.serviceId || item.id || item.slug,
    slug: item.slug,
    title: item.title,
    shortTitle: item.shortTitle || item.title,
    badge: item.badge,
    icon: item.icon,
    heroImage:
      resolveMediaUrl(item.heroImage) ||
      "/images/live/Excellence-tools-official.png",
    tagline: item.tagline,
    description: item.description,
    features: item.features || [],
    capabilities: (item.capabilities || []).map((c) => ({
      title: c.title,
      description: c.description,
    })),
    process: (item.process || []).map((p) => ({
      step: p.step,
      title: p.title,
      desc: p.desc || p.description,
    })),
    faqs: (item.faqs || []).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
    fullContentText: item.fullContentText || "",
    scrapedImages: (item.scrapedImages || []).map(
      (img) => resolveMediaUrl(img) || img,
    ),
    seo: item.seo || {},
  }));

  writeJson("services.json", synced);
}

async function syncProducts() {
  console.log("📌 Syncing Products...");
  const data = await fetchFromStrapi(
    "products?populate[0]=heroImage&populate[1]=catalogItems.image&populate[2]=seo&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    id: item.productId || item.id || item.slug,
    slug: item.slug,
    name: item.name,
    shortName: item.shortName || item.name,
    category: item.category,
    icon: item.icon,
    heroImage:
      resolveMediaUrl(item.heroImage) || "/images/products/draw-works.jpg",
    summary: item.summary,
    keyPoints: item.keyPoints || [],
    description: item.description,
    catalogItems: (item.catalogItems || []).map((ci) => ({
      title: ci.title,
      image: resolveMediaUrl(ci.image) || "/images/products/draw-works.jpg",
      description: ci.description,
    })),
    seo: item.seo || {},
  }));

  writeJson("products.json", synced);
}

async function syncIndustries() {
  console.log("📌 Syncing Industries...");
  const data = await fetchFromStrapi(
    "industries?populate[0]=heroImage&populate[1]=subIndustries.heroImage&populate[2]=seo&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    id: item.industryId || item.id || item.slug,
    slug: item.slug,
    name: item.name,
    shortName: item.shortName || item.name,
    icon: item.icon,
    heroImage:
      resolveMediaUrl(item.heroImage) || "/images/live/oil-gas-new.jpg",
    relatedService: item.relatedService || null,
    tagline: item.tagline,
    summary: item.summary,
    keySolutions: item.keySolutions || [],
    subIndustries: (item.subIndustries || []).map((sub) => ({
      id: sub.subId || sub.id || sub.slug,
      slug: sub.slug,
      name: sub.name,
      shortName: sub.shortName || sub.name,
      icon: sub.icon,
      heroImage:
        resolveMediaUrl(sub.heroImage) ||
        "/images/live/Excellence-tools-official.png",
      tagline: sub.tagline,
      summary: sub.summary,
      keySolutions: sub.keySolutions || [],
      fullContentText: sub.fullContentText || "",
    })),
    fullContentText: item.fullContentText || "",
    seo: item.seo || {},
  }));

  writeJson("industries.json", synced);
}

async function syncCaseStudies() {
  console.log("📌 Syncing Case Studies...");
  const data = await fetchFromStrapi(
    "case-studies?populate[0]=heroImage&populate[1]=metrics&populate[2]=seo&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    id: item.caseStudyId || item.id,
    title: item.title,
    clientIndustry: item.clientIndustry,
    location: item.location,
    badge: item.badge,
    duration: item.duration,
    heroImage:
      resolveMediaUrl(item.heroImage) || "/images/live/oil-gas-new.jpg",
    summary: item.summary,
    challenge: item.challenge,
    solution: item.solution,
    metrics: item.metrics || [],
    tags: item.tags || [],
    seo: item.seo || {},
  }));

  writeJson("case-studies.json", synced);
}

async function syncBlogPosts() {
  console.log("📌 Syncing Blog Posts...");
  const data = await fetchFromStrapi(
    "blog-posts?populate[0]=image&populate[1]=author.avatar&populate[2]=seo&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    id: item.postId || item.id || item.slug,
    slug: item.slug,
    title: item.title,
    excerpt: item.excerpt,
    content: item.content,
    category: item.category,
    author: {
      name: item.author?.name || "OFS Engineering Team",
      role: item.author?.role || "Technical Desk",
      avatar:
        resolveMediaUrl(item.author?.avatar) || "/images/author-default.png",
    },
    date: item.date,
    readTime: item.readTime,
    featured: Boolean(item.featured),
    image: resolveMediaUrl(item.image) || "/images/live/oil-gas-new.jpg",
    tags: item.tags || [],
    seo: item.seo || {},
  }));

  writeJson("blog-posts.json", synced);
}

async function syncJobs() {
  console.log("📌 Syncing Jobs...");
  const data = await fetchFromStrapi(
    "jobs?populate=*&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    id: item.jobId || item.id || item.slug,
    slug: item.slug,
    title: item.title,
    department: item.department,
    location: item.location,
    type: item.type,
    experience: item.experience,
    postedDate: item.postedDate,
    description: item.description,
    responsibilities: item.responsibilities || [],
    requirements: item.requirements || [],
    benefits: item.benefits || [],
  }));

  writeJson("jobs.json", synced);
}

async function syncRenewables() {
  console.log("📌 Syncing Renewables...");
  const data = await fetchFromStrapi(
    "renewable?populate[0]=heroBgImage&populate[1]=whyImage&populate[2]=partnerBgImage&populate[3]=solutions.image&populate[4]=whyPills&populate[5]=approachSteps&populate[6]=partnerCards",
  );
  if (!data) return;

  const local = JSON.parse(
    fs.readFileSync(path.join(dataDir, "renewables.json"), "utf8"),
  );
  const synced = {
    ...local,
    ...data,
    heroBgImage: resolveMediaUrl(data.heroBgImage) || local.heroBgImage,
    whyImage: resolveMediaUrl(data.whyImage) || local.whyImage,
    partnerBgImage:
      resolveMediaUrl(data.partnerBgImage) || local.partnerBgImage,
    solutions: (data.solutions && data.solutions.length > 0
      ? data.solutions
      : local.solutions
    ).map((s) => ({
      id: s.solutionId || s.id,
      title: s.title,
      icon: s.icon,
      image: resolveMediaUrl(s.image) || s.image,
      bullets: s.bullets || [],
    })),
    whyPills: data.whyPills || local.whyPills,
    approachSteps: data.approachSteps || local.approachSteps,
    partnerCards: data.partnerCards || local.partnerCards,
  };

  writeJson("renewables.json", synced);
}

async function syncFaqs() {
  console.log("📌 Syncing FAQs...");
  const data = await fetchFromStrapi("faqs?pagination[pageSize]=100");
  if (!Array.isArray(data) || data.length === 0) return;

  const synced = data.map((item) => ({
    question: item.question,
    answer: item.answer,
  }));

  writeJson("faqs.json", synced);
}

async function syncOffers() {
  console.log("📌 Syncing Offers...");
  const data = await fetchFromStrapi(
    "offers?populate[0]=heroImage&populate[1]=blocks.image.src&populate[2]=blocks.items&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const syncedMap = {};
  data.forEach((item) => {
    const slug = item.slug;
    syncedMap[slug] = {
      id: slug,
      slug,
      href: item.href || `/offers/${slug}`,
      title: item.title,
      category: item.category,
      categoryLabel: item.categoryLabel,
      heroImage: resolveMediaUrl(item.heroImage),
      tagline: item.tagline,
      description: item.description,
      blocks: (item.blocks || []).map((b) => ({
        title: b.title || "",
        variant: b.variant || "light",
        imagePosition: b.imagePosition || "right",
        image: b.image
          ? {
              src: resolveMediaUrl(b.image.src || b.image),
              alt: b.image.alt || "",
            }
          : null,
        intro: b.intro || "",
        items: (b.items || []).map((i) => ({
          title: i.title || "",
          description: i.description || "",
        })),
        paragraphs: b.paragraphs || [],
      })),
    };
  });

  writeJson("offers.json", syncedMap);
}

async function main() {
  console.log(`🔄 Connecting to Strapi at: ${STRAPI_URL}`);
  console.log(`📁 Target directory: ${dataDir}\n`);

  await syncSiteConfig();
  await syncServices();
  await syncProducts();
  await syncIndustries();
  await syncCaseStudies();
  await syncBlogPosts();
  await syncJobs();
  await syncRenewables();
  await syncFaqs();
  await syncOffers();

  console.log("\n🎉 ALL STRAPI CONTENT & IMAGES SYNCED TO LOCAL JSON FILES!");
}

main().catch((err) => {
  console.error("❌ Sync failed:", err);
  process.exit(1);
});
