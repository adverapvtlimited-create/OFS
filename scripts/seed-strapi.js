/**
 * seed-strapi.js
 * 
 * Comprehensive seeder to migrate all local JSON datasets from OFS/src/data/
 * into Strapi CMS backend with exact 1-to-1 schema field compatibility.
 * 
 * Usage:
 * STRAPI_URL=http://localhost:1337 STRAPI_TOKEN=your_token_here node scripts/seed-strapi.js
 */

import fs from 'fs';
import path from 'path';

const STRAPI_URL = process.env.STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_TOKEN) {
  console.error("❌ ERROR: You must provide a STRAPI_TOKEN environment variable.");
  console.log("Example: STRAPI_TOKEN=your_token_here node scripts/seed-strapi.js");
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${STRAPI_TOKEN}`
};

const dataDir = path.join(process.cwd(), 'src', 'data');

async function postOrPut(endpoint, payload, isSingle = false) {
  try {
    const url = isSingle ? `${STRAPI_URL}/api/${endpoint}` : `${STRAPI_URL}/api/${endpoint}`;
    const method = isSingle ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers,
      body: JSON.stringify({ data: payload })
    });
    const result = await res.json();
    return { ok: res.ok, data: result };
  } catch (err) {
    return { ok: false, error: err.message };
  }
}

async function seedSiteConfig() {
  console.log('📌 Seeding Site Config...');
  const filePath = path.join(dataDir, 'site-config.json');
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const res = await postOrPut('site-config', data, true);
  if (res.ok) console.log('  ✅ Site Config uploaded');
  else console.error('  ❌ Site Config failed:', res.data || res.error);
}

async function seedServices() {
  console.log('\n🛠️ Seeding Services...');
  const filePath = path.join(dataDir, 'services.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const payload = {
      serviceId: item.id,
      slug: item.slug,
      title: item.title,
      shortTitle: item.shortTitle || item.title,
      badge: item.badge,
      icon: item.icon,
      heroImage: item.heroImage,
      tagline: item.tagline,
      description: item.description,
      features: item.features || [],
      capabilities: item.capabilities || [],
      process: item.process || [],
      faqs: item.faqs || [],
      fullContentText: item.fullContentText || '',
      scrapedImages: item.scrapedImages || [],
      seo: item.seo || {}
    };
    const res = await postOrPut('services', payload);
    if (res.ok) console.log(`  ✅ Service: ${item.title}`);
    else console.error(`  ❌ Service failed: ${item.title}`);
  }
}

// Helper to map SEO
function mapSeo(seoData, fallbackTitle) {
  if (!seoData) {
    return {
      metaTitle: fallbackTitle.substring(0, 70),
      metaDescription: "Description coming soon."
    };
  }
  return {
    metaTitle: (seoData.metaTitle || fallbackTitle).substring(0, 70),
    metaDescription: (seoData.metaDescription || "Description coming soon.").substring(0, 165),
    keywords: seoData.keywords || ""
  };
}

async function seedProducts() {
  console.log('\n📦 Seeding Products...');
  const filePath = path.join(dataDir, 'products.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const payload = {
      productId: item.id,
      slug: item.slug,
      name: item.name,
      shortName: item.shortName,
      category: item.category,
      icon: item.icon,
      heroImage: item.heroImage,
      summary: item.summary,
      keyPoints: item.keyPoints || [],
      description: item.description,
      catalogItems: item.catalogItems || [],
      seo: item.seo || {}
    };
    const res = await postOrPut('products', payload);
    if (res.ok) console.log(`  ✅ Product: ${item.shortName}`);
    else console.error(`  ❌ Product failed: ${item.shortName}`);
  }
}

async function seedIndustries() {
  console.log('\n🏭 Seeding Industries...');
  const filePath = path.join(dataDir, 'industries.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const payload = {
      industryId: item.id,
      slug: item.slug,
      name: item.name,
      shortName: item.shortName,
      icon: item.icon,
      heroImage: item.heroImage,
      relatedService: item.relatedService,
      tagline: item.tagline,
      summary: item.summary,
      keySolutions: item.keySolutions || [],
      subIndustries: (item.subIndustries || []).map(sub => ({
        subId: sub.id,
        slug: sub.slug,
        name: sub.name,
        shortName: sub.shortName,
        icon: sub.icon,
        heroImage: sub.heroImage,
        tagline: sub.tagline,
        summary: sub.summary,
        keySolutions: sub.keySolutions || [],
        fullContentText: sub.fullContentText
      })),
      fullContentText: item.fullContentText,
      seo: item.seo || {}
    };
    const res = await postOrPut('industries', payload);
    if (res.ok) console.log(`  ✅ Industry: ${item.name}`);
    else console.error(`  ❌ Industry failed: ${item.name}`);
  }
}

async function seedCaseStudies() {
  console.log('\n📋 Seeding Case Studies...');
  const filePath = path.join(dataDir, 'case-studies.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const payload = {
      data: {
        title: item.name,
        slug: item.id,
        shortName: item.shortTitle || item.name.substring(0, 60),
        shortDescription: (item.description || "Description coming soon.").substring(0, 350),
        overview: textToBlocks(item.description || item.tagline || ""),
        features: mapFeatures(item.features),
        seo: mapSeo(item.seo, item.name)
        // Note: Images cannot be seeded via simple JSON POST if they are local files.
        // They must be uploaded via FormData to Strapi's /api/upload first.
        // For now, we seed the text content. You will attach images in the Strapi UI.
      }
    };
    const res = await postOrPut('case-studies', payload);
    if (res.ok) console.log(`  ✅ Case Study: ${item.title.slice(0, 40)}...`);
    else console.error(`  ❌ Case Study failed: ${item.title}`);
  }
}

async function seedBlogPosts() {
  console.log('\n✍️ Seeding Blog Posts...');
  const filePath = path.join(dataDir, 'blog-posts.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const payload = {
      postId: item.id,
      slug: item.slug,
      title: item.title,
      excerpt: item.excerpt,
      content: item.content,
      category: item.category,
      author: item.author || {},
      date: item.date,
      readTime: item.readTime,
      featured: Boolean(item.featured),
      image: item.image,
      tags: item.tags || [],
      seo: item.seo || {}
    };
    const res = await postOrPut('blog-posts', payload);
    if (res.ok) console.log(`  ✅ Blog Post: ${item.title.slice(0, 40)}...`);
    else console.error(`  ❌ Blog Post failed: ${item.title}`);
  }
}

async function seedJobs() {
  console.log('\n💼 Seeding Jobs...');
  const filePath = path.join(dataDir, 'jobs.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const payload = {
      jobId: item.id,
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
      benefits: item.benefits || []
    };
    const res = await postOrPut('jobs', payload);
    if (res.ok) console.log(`  ✅ Job: ${item.title}`);
    else console.error(`  ❌ Job failed: ${item.title}`);
  }
}

async function seedRenewables() {
  console.log('\n⚡ Seeding Renewables...');
  const filePath = path.join(dataDir, 'renewables.json');
  if (!fs.existsSync(filePath)) return;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  const res = await postOrPut('renewables', data, true);
  if (res.ok) console.log('  ✅ Renewables uploaded');
  else console.error('  ❌ Renewables failed:', res.data || res.error);
}

async function seedFaqs() {
  console.log('\n❓ Seeding FAQs...');
  const filePath = path.join(dataDir, 'faqs.json');
  if (!fs.existsSync(filePath)) return;
  const items = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const item of items) {
    const res = await postOrPut('faqs', item);
    if (res.ok) console.log(`  ✅ FAQ: ${item.question.slice(0, 40)}...`);
    else console.error(`  ❌ FAQ failed: ${item.question}`);
  }
}

async function seedOffers() {
  console.log('\n🎯 Seeding Offers...');
  const filePath = path.join(dataDir, 'offers.json');
  if (!fs.existsSync(filePath)) return;
  const obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  for (const [key, item] of Object.entries(obj)) {
    const payload = {
      data: {
        title: item.title,
        slug: item.id,
        offeringType: "Service", // Enum: Service, Solution, Expertise, Discipline
        shortTitle: item.shortTitle || (item.title ? item.title.substring(0, 60) : ''),
        tagline: (item.tagline || item.title || '').substring(0, 150),
        overview: textToBlocks(item.description || item.fullContentText || ""),
        features: mapFeatures(item.features),
        seo: mapSeo(item.seo, item.title)
      }
    };
    const res = await postOrPut('offers', payload);
    if (res.ok) console.log(`  ✅ Offer: ${item.title}`);
    else console.error(`  ❌ Offer failed: ${item.title}`);
  }
}

async function run() {
  console.log("🚀 Starting Full OFS Strapi Seeder...\n");
  await seedSiteConfig();
  await seedServices();
  await seedProducts();
  await seedIndustries();
  await seedCaseStudies();
  await seedBlogPosts();
  await seedJobs();
  await seedRenewables();
  await seedFaqs();
  await seedOffers();
  console.log("\n🎉 Seeding complete! All 10 data categories processed.");
}

run();
