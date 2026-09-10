import json
import os
import re

DATA_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "data")

FILES_TO_PROCESS = [
    "products.json",
    "services.json",
    "industries.json",
    "case-studies.json",
    "blog-posts.json",
    "renewables.json",
    "offers.json"
]

def clean_text(text):
    if not isinstance(text, str):
        return ""
    # Remove HTML tags if any
    text = re.sub(r'<[^>]+>', '', text)
    # Remove extra spaces
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def truncate_to_length(text, max_length):
    text = clean_text(text)
    if len(text) <= max_length:
        return text
    # Cut back to a space to avoid splitting words
    truncated = text[:max_length - 3]
    last_space = truncated.rfind(' ')
    if last_space > 0:
        truncated = truncated[:last_space]
    return truncated + "..."

def generate_seo(item, file_type):
    title = item.get("title", item.get("name", item.get("projectName", item.get("jobTitle", "Untitled"))))
    
    # Generate Meta Title
    meta_title = f"{title} | OFS"
    if len(meta_title) > 60:
        meta_title = truncate_to_length(title, 60)
        
    # Find the best description source
    desc_source = item.get("shortDescription", "")
    if not desc_source:
        desc_source = item.get("description", "")
    if not desc_source:
        desc_source = item.get("overview", "")
    if not desc_source:
        desc_source = item.get("mainContent", "")
    if not desc_source:
        desc_source = item.get("content", "")
    
    meta_description = truncate_to_length(desc_source, 155)
    if not meta_description:
        meta_description = f"Learn more about {title} at OFS, providing advanced industrial solutions."

    # Keywords
    base_keywords = ["OFS", "industrial solutions", "manufacturing"]
    category = item.get("category", "")
    if isinstance(category, str) and category:
        base_keywords.append(category.lower())
    elif isinstance(category, dict) and "name" in category:
        base_keywords.append(category["name"].lower())
        
    industry = item.get("industryTag", "")
    if isinstance(industry, str) and industry:
        base_keywords.append(industry.lower())

    # Ensure title words are in keywords
    title_words = [w.lower() for w in re.findall(r'\w+', title) if len(w) > 3]
    base_keywords.extend(title_words[:3])

    # Deduplicate and format
    keywords_list = list(dict.fromkeys(base_keywords))
    keywords = ", ".join(keywords_list)
    
    return {
        "metaTitle": meta_title,
        "metaDescription": meta_description,
        "keywords": keywords
    }

def process_file(filename):
    file_path = os.path.join(DATA_DIR, filename)
    if not os.path.exists(file_path):
        print(f"Skipping {filename} - not found.")
        return

    with open(file_path, 'r', encoding='utf-8') as f:
        try:
            data = json.load(f)
        except json.JSONDecodeError:
            print(f"Error parsing {filename}.")
            return

    # Usually data is a list of dicts, but could be dict of lists (like renewables)
    updated_count = 0
    if isinstance(data, list):
        for item in data:
            if isinstance(item, dict):
                item['seo'] = generate_seo(item, filename)
                updated_count += 1
    elif isinstance(data, dict):
        # Iterate over all list values inside dict
        for key, value in data.items():
            if isinstance(value, list):
                for item in value:
                    if isinstance(item, dict):
                        item['seo'] = generate_seo(item, filename)
                        updated_count += 1

    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Updated {updated_count} items in {filename}.")

if __name__ == "__main__":
    for filename in FILES_TO_PROCESS:
        process_file(filename)
    print("SEO generation complete.")
