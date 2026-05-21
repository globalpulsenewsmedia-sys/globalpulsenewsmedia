import os
import json
import time
import re
from datetime import datetime
import urllib.request
from dotenv import load_dotenv

# Load environment variables
script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
load_dotenv(os.path.join(project_dir, '.env.local'))

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    print("Error: GEMINI_API_KEY not found in .env.local")
    exit(1)

# Destination/Topic definitions for Western Tier-1 Audience
TOPICS = [
    {"name": "The Ultimate 14-Day Luxury Itinerary for Italy's Amalfi Coast", "category": "Ultimate Guides", "image": "https://images.unsplash.com/photo-1533676906237-7756e18f2d65?w=1200"},
    {"name": "Hidden Gems of the Greek Islands: Beyond Santorini", "category": "Local Gems", "image": "https://images.unsplash.com/photo-1498565502283-9b48c4ee2c2a?w=1200"},
    {"name": "How to Plan a Budget-Friendly Eurotrip from the US", "category": "Travel Hacks", "image": "https://images.unsplash.com/photo-1513622470522-26c311c6d376?w=1200"},
    {"name": "Exploring the Ancient Mysteries of Machu Picchu", "category": "Global Wonders", "image": "https://images.unsplash.com/photo-1526392060635-9d6019884377?w=1200"},
    {"name": "The Best Times to Visit Japan for Cherry Blossom Season", "category": "Travel Guides", "image": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200"}
]

# Ensure output directories exist
travel_dir = os.path.join(project_dir, 'travel')
data_dir = os.path.join(project_dir, 'data')
os.makedirs(travel_dir, exist_ok=True)
os.makedirs(data_dir, exist_ok=True)

# Load template
template_path = os.path.join(project_dir, 'travel-template.html')
with open(template_path, 'r', encoding='utf-8') as f:
    template_html = f.read()

def generate_slug(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def call_gemini(topic):
    prompt = f"""
    Act as an elite travel journalist writing for a premium US/UK audience. Write a captivating, highly unique, and immersive travel article about: "{topic['name']}".
    
    Requirements:
    1. Length: 800+ words.
    2. Tone: Engaging, authoritative, professional, Western-standard English.
    3. Plagiarism: Must be 100% unique and original. Do not copy existing web content.
    4. Structure:
       - A highly captivating, SEO-optimized title.
       - An SEO meta description (1-2 sentences).
       - An HTML Quick Travel Summary Box at the very beginning of the content. This MUST use the class 'quick-highlights-box' and contain a `<h3>Quick Highlights</h3>` followed by a `<ul>` of key points (Best time to visit, Estimated budget, Major attractions, etc).
       - Clear HTML Subheadings (<h2> and <h3> tags).
       - Paragraphs enclosed in <p> tags.
       - Use <strong> for emphasis.
       - Include at least one bulleted list (<ul>) of essential itineraries or travel hacks within the body.

    Return ONLY a raw JSON object (without Markdown block formatting) with the following exact keys:
    {{
        "title": "...",
        "meta_description": "...",
        "html_content": "..."
    }}
    """
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={GEMINI_API_KEY}"
    payload = {
        "contents": [{"parts": [{"text": prompt}]}],
        "generationConfig": {"response_mime_type": "application/json"}
    }
    
    req = urllib.request.Request(url, data=json.dumps(payload).encode('utf-8'), headers={'Content-Type': 'application/json'}, method='POST')
    
    try:
        response = urllib.request.urlopen(req)
        response_data = json.loads(response.read().decode('utf-8'))
        
        if 'candidates' in response_data and len(response_data['candidates']) > 0:
            text = response_data['candidates'][0]['content']['parts'][0]['text']
            return json.loads(text)
        else:
            print(f"Failed to generate content for {topic['name']}")
            return None
    except Exception as e:
        print(f"API Error for {topic['name']}: {e}")
        return None

def main():
    print("Starting Bulk Travel Generator Engine...")
    
    # Load existing travel index to avoid duplicates
    index_file = os.path.join(data_dir, 'travel.json')
    travel_index = []
    if os.path.exists(index_file):
        with open(index_file, 'r', encoding='utf-8') as f:
            try:
                travel_index = json.load(f)
            except json.JSONDecodeError:
                travel_index = []
                
    generated_count = 0
    
    for topic in TOPICS:
        slug = generate_slug(topic['name'])
        file_path = os.path.join(travel_dir, f"{slug}.html")
        
        # Skip if already generated
        if os.path.exists(file_path):
            print(f"Skipping {topic['name']} (Already exists)")
            continue
            
        print(f"Generating content for: {topic['name']}")
        result = call_gemini(topic)
        
        if result:
            # Build HTML
            current_date = datetime.now().strftime("%B %d, %Y")
            html_output = template_html.replace('{{TITLE}}', result['title'])
            html_output = html_output.replace('{{META_DESCRIPTION}}', result['meta_description'])
            html_output = html_output.replace('{{CATEGORY}}', topic['category'])
            html_output = html_output.replace('{{SLUG}}', slug)
            html_output = html_output.replace('{{DATE}}', current_date)
            html_output = html_output.replace('{{IMAGE_URL}}', topic['image'])
            html_output = html_output.replace('{{CONTENT}}', result['html_content'])
            
            # Save HTML file
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(html_output)
                
            # Add to index
            travel_index.insert(0, {
                "title": result['title'],
                "snippet": result['meta_description'],
                "category": topic['category'],
                "link": f"/travel/{slug}.html",
                "imageUrl": topic['image'],
                "time": current_date
            })
            
            generated_count += 1
            print(f"Successfully generated: {slug}.html")
            
            # Sleep to respect API rate limits (adjust as needed for your tier)
            time.sleep(5) 
            
    # Save updated index
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(travel_index, f, indent=2)
        
    print(f"Engine finished. Generated {generated_count} new travel articles.")

if __name__ == "__main__":
    main()
