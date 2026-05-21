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
    {"name": "The Science of Ayurveda: Ancient Indian Medicine for Modern Stress", "category": "Holistic Health", "image": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200"},
    {"name": "5 Natural Therapies to Boost Your Immune System This Winter", "category": "Natural Therapy", "image": "https://images.unsplash.com/photo-1512069772995-ec65e4e0821b?w=1200"},
    {"name": "Understanding Adaptogens: The Secret to Balancing Cortisol", "category": "Wellness Nutrition", "image": "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=1200"},
    {"name": "Mindful Morning Routines: Combining Yoga and Meditation", "category": "Lifestyle", "image": "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200"},
    {"name": "The Ultimate Guide to Plant-Based Healing Foods", "category": "Diet & Nutrition", "image": "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=1200"}
]

# Ensure output directories exist
health_dir = os.path.join(project_dir, 'health')
data_dir = os.path.join(project_dir, 'data')
os.makedirs(health_dir, exist_ok=True)
os.makedirs(data_dir, exist_ok=True)

# Load template
template_path = os.path.join(project_dir, 'health-template.html')
with open(template_path, 'r', encoding='utf-8') as f:
    template_html = f.read()

def generate_slug(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def call_gemini(topic):
    prompt = f"""
    Act as an elite health and wellness journalist writing for a premium US/UK audience. Write a captivating, highly unique, and immersive article about: "{topic['name']}".
    
    Requirements:
    1. Length: 800+ words.
    2. Tone: Engaging, authoritative, professional, Western-standard English. Present traditional methods (like Ayurveda) as premium, evidence-based lifestyle choices.
    3. Plagiarism: Must be 100% unique and original. Do not copy existing web content.
    4. Structure:
       - A highly captivating, SEO-optimized title.
       - An SEO meta description (1-2 sentences).
       - An HTML Quick Wellness Summary Box at the very beginning of the content. This MUST use the class 'quick-highlights-box' and contain a `<h3>Quick Highlights</h3>` followed by a `<ul>` of key actionable takeaways.
       - Clear HTML Subheadings (<h2> and <h3> tags).
       - Paragraphs enclosed in <p> tags.
       - Use <strong> for emphasis.
       - Include at least one bulleted list (<ul>) of essential tips or daily habits within the body.

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
    print("Starting Bulk Health Generator Engine...")
    
    # Load existing health index to avoid duplicates
    index_file = os.path.join(data_dir, 'health.json')
    health_index = []
    if os.path.exists(index_file):
        with open(index_file, 'r', encoding='utf-8') as f:
            try:
                health_index = json.load(f)
            except json.JSONDecodeError:
                health_index = []
                
    generated_count = 0
    
    for topic in TOPICS:
        slug = generate_slug(topic['name'])
        file_path = os.path.join(health_dir, f"{slug}.html")
        
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
            health_index.insert(0, {
                "title": result['title'],
                "snippet": result['meta_description'],
                "category": topic['category'],
                "link": f"/health/{slug}.html",
                "imageUrl": topic['image'],
                "time": current_date
            })
            
            generated_count += 1
            print(f"Successfully generated: {slug}.html")
            
            # Sleep to respect API rate limits (adjust as needed for your tier)
            time.sleep(5) 
            
    # Save updated index
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(health_index, f, indent=2)
        
    print(f"Engine finished. Generated {generated_count} new health articles.")

if __name__ == "__main__":
    main()
