# OFS Data Migration Scripts

This folder contains Python and Node.js scripts used for data migration, auditing, and seeding.

---

## The Strapi Seeder (`seed_strapi.py`)

The `seed_strapi.py` script is a dedicated data migration tool designed for **Phase 2** of the OFS project. 

### What it does
It reads all the static JSON files currently powering the frontend (`industries.json`, `products.json`, `services.json`, etc.) from the `src/data/` directory, formats them to perfectly match the Strapi v4 Component Schema, and automatically `POST`s them to the Strapi REST API. 

This saves the OFS team from having to manually copy-paste hundreds of products, services, and blogs into the Strapi Admin Dashboard.

### When to use this
Do **NOT** use this script right now. 
You will only use this script once the following have occurred:
1. The **Hostinger VPS** has been purchased.
2. The **Strapi Backend** has been installed, configured, and deployed to that VPS.

### Prerequisites (Before Running)

Before you execute this script, you must ensure the Strapi backend is fully prepared to receive the data:

1. **Content Types Built:** You must log into the Strapi Admin Panel and manually create all the Content Types (e.g., `product`, `industry`, `service`) and Components (e.g., `shared.seo`, `elements.feature-bullet`) **exactly** as defined in the OFS Strapi Technical Specification.
2. **Draft & Publish Enabled:** Ensure "Draft & Publish" is enabled on all Collection Types in Strapi.
3. **API Token Generated:** Go to `Settings -> API Tokens` in Strapi and generate a **Full Access** token. This gives the script permission to write data.
4. **Python Installed:** Ensure Python 3.x is installed on the machine running the script, along with the `requests` library (`pip install requests`).

### How to Run the Script

1. Open a terminal in the root of the OFS repository.
2. Set your environment variables so the script knows where to send the data:
   
   **On Windows (PowerShell):**
   ```powershell
   $env:STRAPI_URL="http://your-hostinger-ip:1337"
   $env:STRAPI_API_TOKEN="your_generated_token_here"
   ```
   
   **On Mac/Linux:**
   ```bash
   export STRAPI_URL="http://your-hostinger-ip:1337"
   export STRAPI_API_TOKEN="your_generated_token_here"
   ```

3. Execute the script:
   ```bash
   python scripts/seed_strapi.py
   ```

### What to Expect & Limitations
- **Terminal Output:** The script will output a success `✅` or failure `❌` message for every single record. If a record fails (e.g., a `400 Bad Request`), it means your Strapi Schema does not match the script. Check the Strapi Admin panel and fix the schema field name.
- **Images:** This script **skips all images**. Strapi requires images to be uploaded to a media bucket *before* they can be attached to a product. The OFS team will need to manually upload product images via the Strapi Admin Panel after the text data is migrated.
- **Relationships:** Complex relationships (like linking a Product to an Industry) are skipped to prevent dependency crashes. These can easily be linked manually in the Strapi Admin Panel.
