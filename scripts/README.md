# OFS Strapi Seeder Script

This directory contains the `seed-strapi.js` automation script. Its purpose is to instantly migrate all local JSON content (Products, Services) from the Next.js repository into the PostgreSQL/Strapi database.

## Prerequisites
- Node.js installed.
- Access to the Strapi CMS repository (`ofs_cms`).

---

## 💻 Scenario A: Testing Locally (For Backend Devs)

If you are developing the schema or want to test the data migration locally before pushing to production:

1. **Start the CMS Locally**
   Clone the CMS repository and start it on your local machine:
   ```bash
   git clone https://github.com/adverapvtlimited-create/ofs_cms.git
   cd ofs_cms
   npm install
   npm run develop
   ```
   *Strapi will start at `http://localhost:1337`.*

2. **Generate an API Token**
   - Open your browser to `http://localhost:1337/admin`.
   - Navigate to **Settings > API Tokens > Create new API Token**.
   - Set the Token type to **Full Access** (required for `POST` requests).
   - Copy the generated token.

3. **Run the Seeder**
   Navigate to the root of the **OFS (Frontend)** repository and run the seeder with your local variables:
   
   *Windows (PowerShell)*
   ```powershell
   $env:STRAPI_URL="http://localhost:1337"
   $env:STRAPI_TOKEN="your_copied_token_here"
   node scripts/seed-strapi.js
   ```
   
   *Mac/Linux/Git Bash*
   ```bash
   STRAPI_URL="http://localhost:1337" STRAPI_TOKEN="your_copied_token_here" node scripts/seed-strapi.js
   ```

---

## 🌍 Scenario B: VPS Production Execution

Once the Hostinger VPS is provisioned and the CMS is deployed to `api.ofsgroupindia.in`, run this to permanently populate the live PostgreSQL database.

1. **Deploy CMS to VPS**
   - The `ofs_cms` repo is pulled onto the Hostinger VPS.
   - PM2 and Nginx are configured to run Strapi continuously behind the domain `api.ofsgroupindia.in`.

2. **Generate Production API Token**
   - Log into the live Strapi admin panel at `https://api.ofsgroupindia.in/admin`.
   - Navigate to **Settings > API Tokens > Create new API Token**.
   - Set the Token type to **Full Access** and copy the token.

3. **Run the Seeder**
   From your local machine (or any machine with the OFS Frontend code), target the production server:
   
   *Windows (PowerShell)*
   ```powershell
   $env:STRAPI_URL="https://api.ofsgroupindia.in"
   $env:STRAPI_TOKEN="your_live_production_token"
   node scripts/seed-strapi.js
   ```
   
   *Mac/Linux/Git Bash*
   ```bash
   STRAPI_URL="https://api.ofsgroupindia.in" STRAPI_TOKEN="your_live_production_token" node scripts/seed-strapi.js
   ```

---

### What the Script Actually Does
- **Reads Data**: It dynamically reads `src/data/products.json` and `src/data/services.json`.
- **Transforms Data**: Next.js uses raw strings, but Strapi v4 requires strict "Blocks" for rich text. The seeder safely converts all text into the exact `[ { type: 'paragraph', children: [...] } ]` structure expected by Ganesh's Strapi schema.
- **Uploads Data**: It executes `POST` requests directly to `/api/products` and `/api/services`.

*Note: Due to network constraints, images cannot be passed natively via simple JSON POST requests. Images should be uploaded and linked manually within the Strapi Admin UI after the text data is successfully seeded.*
