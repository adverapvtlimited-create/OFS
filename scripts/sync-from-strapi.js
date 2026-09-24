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

// Automatically load OFS/.env or OFS/.env.local if present
function loadEnv() {
  const envFiles = [
    path.resolve(__dirname, "../.env.local"),
    path.resolve(__dirname, "../.env"),
  ];
  for (const f of envFiles) {
    if (fs.existsSync(f)) {
      const content = fs.readFileSync(f, "utf8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith("#")) return;
        const eqIdx = trimmed.indexOf("=");
        if (eqIdx !== -1) {
          const key = trimmed.slice(0, eqIdx).trim();
          let val = trimmed.slice(eqIdx + 1).trim();
          if (
            (val.startsWith('"') && val.endsWith('"')) ||
            (val.startsWith("'") && val.endsWith("'"))
          ) {
            val = val.slice(1, -1);
          }
          if (!process.env[key]) {
            process.env[key] = val;
          }
        }
      });
    }
  }
}
loadEnv();

const STRAPI_URL = (
  process.env.STRAPI_API_URL ||
  process.env.STRAPI_URL ||
  process.env.NEXT_PUBLIC_STRAPI_URL ||
  "https://cms.ofsgroupindia.in"
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

function readJson(filename) {
  const targetPath = path.join(dataDir, filename);
  if (fs.existsSync(targetPath)) {
    try {
      return JSON.parse(fs.readFileSync(targetPath, "utf8"));
    } catch {
      return null;
    }
  }
  return null;
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

  const existingProducts = readJson("products.json") || [];

  const synced = data.map((item) => {
    const existingMatch =
      existingProducts.find(
        (p) =>
          p.slug === item.slug || p.id === item.productId || p.id === item.slug,
      ) || {};

    const strapiCatalogItems = Array.isArray(item.catalogItems)
      ? item.catalogItems
      : [];
    const existingCatalogItems = Array.isArray(existingMatch.catalogItems)
      ? existingMatch.catalogItems
      : [];

    return {
      id: item.productId || item.id || item.slug,
      slug: item.slug,
      name: item.name,
      shortName: item.shortName || item.name,
      category: item.category || existingMatch.category || "",
      icon: item.icon || existingMatch.icon || "Settings",
      heroImage:
        resolveMediaUrl(item.heroImage) ||
        existingMatch.heroImage ||
        "/images/products/mud-pumps.webp",
      summary: item.summary || existingMatch.summary || "",
      keyPoints: item.keyPoints || existingMatch.keyPoints || [],
      description: item.description || existingMatch.description || "",
      catalogItems: (strapiCatalogItems.length > 0
        ? strapiCatalogItems
        : existingCatalogItems
      ).map((ci, idx) => {
        const existingCi =
          existingCatalogItems[idx] ||
          existingCatalogItems.find((c) => c.title === ci.title) ||
          {};
        const resolvedImg = resolveMediaUrl(ci.image);
        return {
          title: ci.title || existingCi.title || "",
          image:
            resolvedImg ||
            existingCi.image ||
            existingMatch.heroImage ||
            "/images/products/mud-pumps.webp",
          description: ci.description || existingCi.description || "",
        };
      }),
      seo: item.seo || existingMatch.seo || {},
    };
  });

  writeJson("products.json", synced);
}

async function syncIndustries() {
  console.log("📌 Syncing Industries...");
  const data = await fetchFromStrapi(
    "industries?populate[0]=heroImage&populate[1]=subIndustries.heroImage&populate[2]=seo&populate[3]=relatedService&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) return;

  const existingIndustries = readJson("industries.json") || [];

  const synced = data.map((item) => {
    const existingMatch =
      existingIndustries.find(
        (i) =>
          i.slug === item.slug ||
          i.id === item.industryId ||
          i.id === item.slug,
      ) || {};

    const strapiSubIndustries = Array.isArray(item.subIndustries)
      ? item.subIndustries
      : null;
    const existingSubIndustries = Array.isArray(existingMatch.subIndustries)
      ? existingMatch.subIndustries
      : [];

    const targetSubIndustries =
      strapiSubIndustries !== null
        ? strapiSubIndustries
        : existingSubIndustries;

    return {
      id: item.industryId || item.id || item.slug,
      slug: item.slug,
      name: item.name,
      shortName: item.shortName || item.name,
      icon: item.icon || existingMatch.icon || "Flame",
      heroImage:
        resolveMediaUrl(item.heroImage) ||
        (typeof item.heroImage === "string" && item.heroImage.startsWith("/")
          ? item.heroImage
          : null) ||
        existingMatch.heroImage ||
        "/images/live/oil-gas-new.jpg",
      relatedService:
        item.relatedService !== undefined
          ? item.relatedService
          : existingMatch.relatedService || null,
      tagline: item.tagline || existingMatch.tagline || "",
      summary: item.summary || existingMatch.summary || "",
      keySolutions:
        item.keySolutions !== undefined
          ? item.keySolutions
          : existingMatch.keySolutions || [],
      subIndustries: targetSubIndustries.map((sub, idx) => {
        const existingSub =
          existingSubIndustries.find(
            (s) => s.slug === sub.slug || s.id === sub.subId,
          ) ||
          existingSubIndustries[idx] ||
          {};
        return {
          id: sub.subId || sub.id || sub.slug || existingSub.id,
          slug: sub.slug || existingSub.slug,
          name: sub.name || existingSub.name,
          shortName: sub.shortName || sub.name || existingSub.shortName,
          icon: sub.icon || existingSub.icon || "Flame",
          heroImage:
            resolveMediaUrl(sub.heroImage) ||
            (typeof sub.heroImage === "string" && sub.heroImage.startsWith("/")
              ? sub.heroImage
              : null) ||
            existingSub.heroImage ||
            "/images/live/Excellence-tools-official.png",
          tagline: sub.tagline || existingSub.tagline || "",
          summary: sub.summary || existingSub.summary || "",
          keySolutions: sub.keySolutions || existingSub.keySolutions || [],
          fullContentText:
            sub.fullContentText || existingSub.fullContentText || "",
        };
      }),
      fullContentText:
        item.fullContentText !== undefined
          ? item.fullContentText
          : existingMatch.fullContentText || "",
      ...(item.customServices || existingMatch.customServices
        ? {
            customServices: item.customServices || existingMatch.customServices,
          }
        : {}),
      seo: item.seo
        ? {
            metaTitle: item.seo.metaTitle || item.name,
            metaDescription: item.seo.metaDescription || item.summary,
            keywords: item.seo.keywords || "",
            canonicalURL: item.seo.canonicalURL || null,
            metaRobots: item.seo.metaRobots || null,
          }
        : existingMatch.seo || null,
    };
  });

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
    "offers?populate[heroImage]=true&populate[blocks][populate][image][populate]=*&populate[blocks][populate][items]=true&pagination[pageSize]=100",
  );
  if (!Array.isArray(data) || data.length === 0) {
    console.warn("  ⚠️ No offers returned from Strapi");
    return;
  }

  const existingOffers = readJson("offers.json") || {};
  const syncedMap = { ...existingOffers };

  data.forEach((item) => {
    const slug = item.slug;
    if (!slug) return;

    const existingMatch = existingOffers[slug] || {};

    // Resolve Hero Image
    const resolvedHeroImage =
      resolveMediaUrl(item.heroImage) ||
      resolveMediaUrl(item.heroImageUrl) ||
      (typeof item.heroImage === "string" ? item.heroImage : null) ||
      existingMatch.heroImage ||
      null;

    // Resolve Blocks
    const strapiBlocks = Array.isArray(item.blocks) ? item.blocks : [];
    const existingBlocks = Array.isArray(existingMatch.blocks)
      ? existingMatch.blocks
      : [];

    const blocks = (strapiBlocks.length > 0 ? strapiBlocks : existingBlocks).map(
      (b, bIdx) => {
        const existingB =
          existingBlocks.find(
            (eb) =>
              (b.title &&
                eb.title &&
                eb.title.trim().toLowerCase() ===
                  b.title.trim().toLowerCase()) ||
              (b.type && eb.type && eb.type === b.type),
          ) ||
          existingBlocks[bIdx] ||
          {};

        // Resolve Block Image
        const strapiImgUrl =
          resolveMediaUrl(b.image?.src) ||
          resolveMediaUrl(b.image) ||
          resolveMediaUrl(b.imageUrl) ||
          null;

        const existingImgUrl =
          typeof existingB.image === "string"
            ? existingB.image
            : existingB.image?.src || null;

        const finalImgSrc = strapiImgUrl || existingImgUrl || null;
        const finalImgAlt =
          b.imageAlt ||
          b.image?.alt ||
          existingB.image?.alt ||
          b.title ||
          "";

        // Resolve Items
        const strapiItems = Array.isArray(b.items) ? b.items : [];
        const existingItems = Array.isArray(existingB.items)
          ? existingB.items
          : [];

        const items = (
          strapiItems.length > 0 ? strapiItems : existingItems
        ).map((i, iIdx) => {
          const existingI =
            existingItems.find(
              (pi) =>
                pi.title &&
                i.title &&
                pi.title.trim().toLowerCase() === i.title.trim().toLowerCase(),
            ) ||
            existingItems[iIdx] ||
            {};

          if (typeof i === "object" && i !== null) {
            return {
              title: i.title || existingI.title || "",
              description: i.description || existingI.description || "",
              ...(i.image || existingI.image
                ? { image: resolveMediaUrl(i.image) || existingI.image }
                : {}),
              ...(i.icon || existingI.icon
                ? { icon: resolveMediaUrl(i.icon) || existingI.icon }
                : {}),
            };
          }
          return {
            title: typeof i === "string" ? i : existingI.title || "",
            description: existingI.description || "",
          };
        });

        return {
          title: b.title || existingB.title || "",
          variant: b.variant || existingB.variant || "light",
          imagePosition: b.imagePosition || existingB.imagePosition || "right",
          image: finalImgSrc
            ? {
                src: finalImgSrc,
                alt: finalImgAlt,
              }
            : null,
          intro: b.intro !== undefined ? b.intro : existingB.intro || "",
          items: items,
          paragraphs:
            Array.isArray(b.paragraphs) && b.paragraphs.length > 0
              ? b.paragraphs
              : existingB.paragraphs || [],
          ...(b.type || existingB.type
            ? { type: b.type || existingB.type }
            : {}),
          ...(b.eyebrow || existingB.eyebrow
            ? { eyebrow: b.eyebrow || existingB.eyebrow }
            : {}),
          ...(b.subtitle || existingB.subtitle
            ? { subtitle: b.subtitle || existingB.subtitle }
            : {}),
          ...(b.buttonText || existingB.buttonText
            ? { buttonText: b.buttonText || existingB.buttonText }
            : {}),
          ...(b.buttonHref || existingB.buttonHref
            ? { buttonHref: b.buttonHref || existingB.buttonHref }
            : {}),
          ...(b.noBullets !== undefined
            ? { noBullets: b.noBullets }
            : existingB.noBullets !== undefined
            ? { noBullets: existingB.noBullets }
            : {}),
          ...(b.hasSubscribeForm !== undefined
            ? { hasSubscribeForm: b.hasSubscribeForm }
            : existingB.hasSubscribeForm !== undefined
            ? { hasSubscribeForm: existingB.hasSubscribeForm }
            : {}),
          ...(b.stats || existingB.stats
            ? { stats: b.stats || existingB.stats }
            : {}),
        };
      },
    );

    syncedMap[slug] = {
      id: slug,
      slug: slug,
      href: item.href || existingMatch.href || `/${slug}`,
      title: item.title || existingMatch.title || "",
      category: item.category || existingMatch.category || "services",
      categoryLabel:
        item.categoryLabel || existingMatch.categoryLabel || "Services",
      heroImage: resolvedHeroImage,
      tagline: item.tagline || existingMatch.tagline || "",
      description: item.description || existingMatch.description || "",
      overviewTitle:
        item.overviewTitle !== undefined
          ? item.overviewTitle
          : existingMatch.overviewTitle || null,
      overviewParagraphs:
        item.overviewParagraphs !== undefined
          ? item.overviewParagraphs
          : existingMatch.overviewParagraphs || null,
      features:
        item.features !== undefined
          ? item.features
          : existingMatch.features || null,
      sections:
        item.sections !== undefined
          ? item.sections
          : existingMatch.sections || null,
      gallery:
        Array.isArray(item.gallery) && item.gallery.length > 0
          ? item.gallery.map((g) => ({
              src:
                resolveMediaUrl(g) ||
                (typeof g === "string" ? g : g.src || g.url),
              alt: g.alt || g.name || item.title || "",
            }))
          : existingMatch.gallery || null,
      blocks: blocks,
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
