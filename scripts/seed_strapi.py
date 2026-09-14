import os
import json
import requests
from pathlib import Path

# Load environment variables or define them here for the seeder
STRAPI_URL = os.environ.get('STRAPI_URL', 'http://127.0.0.1:1337')
STRAPI_API_TOKEN = os.environ.get('STRAPI_API_TOKEN', 'YOUR_API_TOKEN_HERE')

HEADERS = {
    'Authorization': f'Bearer {STRAPI_API_TOKEN}',
    'Content-Type': 'application/json'
}

DATA_DIR = Path(__file__).parent.parent / 'src' / 'data'

def post_to_strapi(endpoint: str, payload: dict):
    url = f"{STRAPI_URL}/api/{endpoint}"
    data_wrapper = { "data": payload }
    
    try:
        response = requests.post(url, json=data_wrapper, headers=HEADERS)
        if response.status_code in [200, 201]:
            print(f"✅ Successfully created record in {endpoint}")
            return response.json()
        else:
            print(f"❌ Failed to create record in {endpoint}. Status: {response.status_code}")
            print(response.text)
            return None
    except Exception as e:
        print(f"⚠️ Exception occurred while calling {endpoint}: {e}")
        return None

def format_seo(seo_data: dict):
    if not seo_data:
        return None
    return {
        "metaTitle": seo_data.get('metaTitle', ''),
        "metaDescription": seo_data.get('metaDescription', ''),
        "keywords": seo_data.get('keywords', ''),
        "canonicalUrl": seo_data.get('canonicalUrl', '')
    }

def format_bullet_points(items: list):
    """Formats a simple string list into Strapi elements.feature-bullet components."""
    if not isinstance(items, list):
        return []
    return [{"bulletPoint": str(item)} for item in items]

def seed_industries():
    print("\n--- Seeding Industries ---")
    file_path = DATA_DIR / 'industries.json'
    if not file_path.exists(): return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        title = item.get('title', item.get('name', 'Unknown Industry'))
        payload = {
            "title": title,
            "slug": item.get('slug', ''),
            "shortName": item.get('shortName', title),
            "tagline": item.get('tagline', ''),
            "description": item.get('description', ''),
            "keySolutions": format_bullet_points(item.get('keySolutions', [])),
            "seo": format_seo(item.get('seo', {}))
        }
        post_to_strapi('industries', payload)

def seed_services():
    print("\n--- Seeding Services ---")
    file_path = DATA_DIR / 'services.json'
    if not file_path.exists(): return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        title = item.get('title', item.get('name', 'Unknown Service'))
        payload = {
            "title": title,
            "slug": item.get('slug', ''),
            "shortTitle": item.get('shortTitle', title),
            "tagline": item.get('tagline', ''),
            "overview": item.get('description', item.get('overview', '')),
            "features": format_bullet_points(item.get('features', [])),
            "seo": format_seo(item.get('seo', {}))
        }
        post_to_strapi('services', payload)

def seed_products():
    print("\n--- Seeding Products ---")
    file_path = DATA_DIR / 'products.json'
    if not file_path.exists(): return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        specs = item.get('specifications', [])
        formatted_specs = [{"label": k, "value": v} for spec in specs for k, v in spec.items()] if isinstance(specs, list) else []
        
        title = item.get('title', item.get('name', 'Unknown Product'))
        payload = {
            "title": title,
            "slug": item.get('slug', ''),
            "shortName": item.get('shortName', title),
            "shortDescription": item.get('shortDescription', item.get('description', '')),
            "mainContent": item.get('mainContent', item.get('content', '')),
            "specifications": formatted_specs,
            "features": format_bullet_points(item.get('features', [])),
            "seo": format_seo(item.get('seo', {}))
        }
        post_to_strapi('products', payload)

def seed_jobs():
    print("\n--- Seeding Careers / Jobs ---")
    file_path = DATA_DIR / 'jobs.json'
    if not file_path.exists(): return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        payload = {
            "jobTitle": item.get('title', 'Unknown Job'),
            "slug": item.get('slug', ''),
            "department": item.get('department', ''),
            "location": item.get('location', ''),
            "employmentType": item.get('type', 'Full-Time'),
            "experienceRequired": item.get('experienceRequired', ''),
            "datePosted": item.get('datePosted', '2024-01-01'), # Strapi requires Date format
            "description": item.get('description', ''),
            "responsibilities": format_bullet_points(item.get('responsibilities', [])),
            "requirements": format_bullet_points(item.get('requirements', [])),
            "benefits": format_bullet_points(item.get('benefits', [])),
            "isActive": True,
            "seo": format_seo(item.get('seo', {}))
        }
        post_to_strapi('careers', payload)

def seed_case_studies():
    print("\n--- Seeding Case Studies ---")
    file_path = DATA_DIR / 'case-studies.json'
    if not file_path.exists(): return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        metrics = item.get('metrics', [])
        formatted_metrics = [{"label": m.get('label', ''), "value": m.get('value', '')} for m in metrics] if isinstance(metrics, list) else []
        
        payload = {
            "title": item.get('title', 'Unknown Case Study'),
            "slug": item.get('slug', ''),
            "clientIndustry": item.get('clientIndustry', 'Unknown'),
            "location": item.get('location', 'Global'),
            "summary": item.get('summary', ''),
            "theChallenge": item.get('challenge', ''),
            "theSolution": item.get('solution', ''),
            "theOutcome": item.get('outcome', ''),
            "metrics": formatted_metrics,
            "seo": format_seo(item.get('seo', {}))
        }
        post_to_strapi('case-studies', payload)

def seed_blogs():
    print("\n--- Seeding Blog Posts ---")
    file_path = DATA_DIR / 'blog-posts.json'
    if not file_path.exists(): return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        data = json.load(f)
        
    for item in data:
        payload = {
            "title": item.get('title', 'Unknown Post'),
            "slug": item.get('slug', ''),
            "author": item.get('author', 'OFS Team'),
            "publishedDate": item.get('publishedDate', item.get('date', '2024-01-01')),
            "excerpt": item.get('excerpt', ''),
            "readTime": item.get('readTime', ''),
            "content": item.get('content', ''),
            "category": item.get('category', 'Corporate'),
            "seo": format_seo(item.get('seo', {}))
        }
        post_to_strapi('blogs', payload)

if __name__ == "__main__":
    print("🚀 Starting Strapi Seeder...")
    print(f"Target URL: {STRAPI_URL}")
    print("Ensure Strapi is running and the API Token is valid.\n")
    
    seed_industries()
    seed_services()
    seed_products()
    seed_jobs()
    seed_case_studies()
    seed_blogs()
    
    print("\n✅ Seeding Complete!")
    print("Note: Images and complex Relationships (like Industry <-> Product) must be linked manually or handled in a V2 script after image uploads.")
