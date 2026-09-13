/**
 * seed-strapi.js
 * 
 * This script seeds the local JSON data from the OFS frontend into the Strapi CMS backend.
 * It automatically maps the fields and converts rich text into Strapi v4's strict "Blocks" format.
 * 
 * Prerequisites:
 * 1. Node.js installed
 * 2. Strapi running (default: http://localhost:1337)
 * 3. A Strapi API Token with full CRUD permissions
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

// Helper to convert plain text into Strapi v4 Blocks format
function textToBlocks(text) {
  if (!text) return [];
  
  // Split by newlines to create separate paragraphs
  const paragraphs = text.split('\n').filter(p => p.trim() !== '');
  
  return paragraphs.map(p => ({
    type: 'paragraph',
    children: [{ type: 'text', text: p.trim() }]
  }));
}

// Map features to elements.bullet-item
function mapFeatures(featuresArray) {
  if (!featuresArray || !Array.isArray(featuresArray)) return [];
  return featuresArray.map(f => ({
    __component: 'elements.bullet-item',
    text: f.substring(0, 255) // Max length constraint from schema
  }));
}

async function seedProducts() {
  console.log('📦 Seeding Products...');
  const productsPath = path.join(process.cwd(), 'src', 'data', 'products.json');
  if (!fs.existsSync(productsPath)) {
    console.log('⚠️ No products.json found, skipping.');
    return;
  }

  const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

  for (const item of products) {
    const payload = {
      data: {
        title: item.name,
        slug: item.id,
        shortName: item.shortTitle || item.name.substring(0, 60),
        shortDescription: (item.description || "Description coming soon.").substring(0, 350),
        overview: textToBlocks(item.description || item.tagline || ""),
        features: mapFeatures(item.features),
        // Note: Images cannot be seeded via simple JSON POST if they are local files.
        // They must be uploaded via FormData to Strapi's /api/upload first.
        // For now, we seed the text content. You will attach images in the Strapi UI.
      }
    };

    try {
      const res = await fetch(`${STRAPI_URL}/api/products`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Created Product: ${item.name}`);
      } else {
        console.error(`❌ Failed to create Product: ${item.name}`);
        console.error(JSON.stringify(data.error, null, 2));
      }
    } catch (e) {
      console.error(`❌ Network error creating Product: ${item.name}`, e.message);
    }
  }
}

async function seedServices() {
  console.log('\n🛠️ Seeding Services...');
  const servicesPath = path.join(process.cwd(), 'src', 'data', 'services.json');
  if (!fs.existsSync(servicesPath)) {
    console.log('⚠️ No services.json found, skipping.');
    return;
  }

  const services = JSON.parse(fs.readFileSync(servicesPath, 'utf8'));

  for (const item of services) {
    const payload = {
      data: {
        title: item.name,
        slug: item.id,
        offeringType: "Service", // Enum: Service, Solution, Expertise, Discipline
        shortTitle: item.shortTitle || item.name.substring(0, 60),
        tagline: (item.tagline || item.name).substring(0, 150),
        overview: textToBlocks(item.description || item.fullContentText || ""),
        features: mapFeatures(item.features)
      }
    };

    try {
      const res = await fetch(`${STRAPI_URL}/api/services`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload)
      });
      
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ Created Service: ${item.name}`);
      } else {
        console.error(`❌ Failed to create Service: ${item.name}`);
        console.error(JSON.stringify(data.error, null, 2));
      }
    } catch (e) {
      console.error(`❌ Network error creating Service: ${item.name}`, e.message);
    }
  }
}

async function run() {
  console.log("🚀 Starting Strapi Seeder...");
  console.log(`📡 Target Strapi URL: ${STRAPI_URL}\n`);
  
  await seedProducts();
  await seedServices();
  
  console.log("\n🎉 Seeding complete! Check your Strapi Admin Panel.");
  console.log("⚠️ Note: Images and relations (like linking a Product to an Industry) must be done manually in the Strapi UI or via a more complex upload script.");
}

run();
