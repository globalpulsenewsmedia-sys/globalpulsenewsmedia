import os
import json
import time
import re
import urllib.request
import urllib.error
import xml.etree.ElementTree as ET
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
load_dotenv(os.path.join(project_dir, '.env.local'))

GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY")

FEEDS = [
    {"category": "WORLD", "url": "http://feeds.bbci.co.uk/news/world/rss.xml"},
    {"category": "TECH", "url": "http://feeds.bbci.co.uk/news/technology/rss.xml"},
    {"category": "BUSINESS", "url": "http://feeds.bbci.co.uk/news/business/rss.xml"},
    {"category": "SCIENCE", "url": "http://feeds.bbci.co.uk/news/science_and_environment/rss.xml"},
    {"category": "HEALTH", "url": "http://feeds.bbci.co.uk/news/health/rss.xml"},
    {"category": "POLITICS", "url": "http://feeds.bbci.co.uk/news/politics/rss.xml"}
]

SITE_URL = "https://globalpulsenewsmedia.com"

# Ensure output directories exist
articles_dir = os.path.join(project_dir, 'articles')
data_dir = os.path.join(project_dir, 'data')
os.makedirs(articles_dir, exist_ok=True)
os.makedirs(data_dir, exist_ok=True)

# Load template
template_path = os.path.join(project_dir, 'article-template.html')
template_html = ""
if os.path.exists(template_path):
    with open(template_path, 'r', encoding='utf-8') as f:
        template_html = f.read()

def generate_slug(text):
    text = text.lower()
    text = re.sub(r'[^a-z0-9\s-]', '', text)
    text = re.sub(r'[\s-]+', '-', text).strip('-')
    return text

def extract_facts(link):
    # Very basic fact extractor just getting paragraph text.
    # In a real production system, this would use BeautifulSoup to parse <article> tags.
    try:
        req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Naive extraction for demo purposes: grab text in <p> tags
        paragraphs = re.findall(r'<p[^>]*>(.*?)</p>', html, re.IGNORECASE | re.DOTALL)
        text = " ".join([re.sub(r'<[^>]+>', '', p).strip() for p in paragraphs if len(p) > 50])
        return text[:3000] # Limit to 3000 chars for API
    except Exception as e:
        print(f"Failed to extract facts from {link}: {e}")
        return ""

def rewrite_with_gemini(facts, original_title, category):
    if not GEMINI_API_KEY:
        return None
        
    prompt = f"""
    Act as an elite news journalist. Do NOT copy sentences. Rewrite the entire news story from scratch in flawless, highly engaging, professional Western-standard English (US/UK journalistic style).
    The tone must be premium, authoritative, and optimized for global Google Search (SEO) algorithms.
    
    Source Facts:
    Title: {original_title}
    Details: {facts}
    
    Requirements:
    1. A new, compelling English title.
    2. An English snippet (1-2 sentences) for the meta description.
    3. An HTML 'Quick Highlights' bulleted box at the top (use class 'quick-highlights-box', start with <h3>Quick Highlights</h3> and use a <ul>).
    4. The full rewritten news story in HTML, using clear subheadings (<h2>, <h3>) and bold phrases (<strong>).
    
    Return ONLY a raw JSON object (without Markdown block formatting) with the following exact keys:
    {{
        "title_en": "...",
        "snippet_en": "...",
        "html_content": "..."
    }}
    """
    
    url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key={GEMINI_API_KEY}"
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
            return None
    except Exception as e:
        print(f"API Error during rewrite: {e}")
        return None

def fetch_rss_feed(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        xml_data = urllib.request.urlopen(req).read()
        root = ET.fromstring(xml_data)
        items = []
        for item in root.findall('./channel/item')[:5]: # Get top 5 per feed
            items.append({
                'title': item.find('title').text if item.find('title') is not None else '',
                'description': item.find('description').text if item.find('description') is not None else '',
                'link': item.find('link').text if item.find('link') is not None else '',
                'pubDate': item.find('pubDate').text if item.find('pubDate') is not None else ''
            })
        return items
    except Exception as e:
        print(f"Error fetching RSS {url}: {e}")
        return []

def main():
    print("🚀 Starting Zero-Cost AI News Pipeline (Python Native)...")
    
    # Load existing news index
    index_file = os.path.join(data_dir, 'news.json')
    all_articles = []
    if os.path.exists(index_file):
        with open(index_file, 'r', encoding='utf-8') as f:
            try:
                all_articles = json.load(f)
            except json.JSONDecodeError:
                all_articles = []
                
    seen_links = {a.get('original_link', '') for a in all_articles if 'original_link' in a}
    
    new_articles = []
    
    for feed in FEEDS:
        print(f"Fetching {feed['category']}...")
        items = fetch_rss_feed(feed['url'])
        
        for item in items:
            if item['link'] in seen_links:
                continue
                
            print(f"Processing: {item['title'][:50]}...")
            
            # Extract facts from source link
            facts = extract_facts(item['link'])
            if not facts:
                facts = item['description'] # Fallback to snippet
                
            # Rewrite with Gemini
            rewritten = rewrite_with_gemini(facts, item['title'], feed['category'])
            
            if rewritten:
                slug = generate_slug(rewritten['title_en'])
                file_path = os.path.join(articles_dir, f"{slug}.html")
                
                # Image generation is skipped for brevity (use a placeholder or standard API)
                image_url = "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600"
                
                current_time = datetime.now().strftime("%B %d, %Y, %I:%M %p")
                
                # Save static HTML
                if template_html:
                    html_output = template_html.replace('{{TITLE_EN}}', rewritten['title_en'])
                    html_output = html_output.replace('{{META_DESCRIPTION}}', rewritten['snippet_en'])
                    html_output = html_output.replace('{{CATEGORY}}', feed['category'])
                    html_output = html_output.replace('{{SLUG}}', slug)
                    html_output = html_output.replace('{{DATE}}', current_time)
                    html_output = html_output.replace('{{IMAGE_URL}}', image_url)
                    html_output = html_output.replace('{{CONTENT}}', rewritten['html_content'])
                    
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(html_output)
                
                # Append to index
                article_entry = {
                    "title": rewritten['title_en'],
                    "snippet": rewritten['snippet_en'],
                    "category": feed['category'],
                    "source": "Global Pulse Intelligence",
                    "time": current_time,
                    "imageUrl": image_url,
                    "link": f"/articles/{slug}.html",
                    "original_link": item['link']
                }
                new_articles.append(article_entry)
                seen_links.add(item['link'])
                print(f"✅ Generated native article: {slug}.html")
                time.sleep(3) # API rate limit protection
    
    # Prepend new articles to index
    all_articles = new_articles + all_articles
    
    # Save Data
    with open(index_file, 'w', encoding='utf-8') as f:
        json.dump(all_articles[:100], f, indent=2) # Keep top 100
        
    print(f"✅ Pipeline complete. Generated {len(new_articles)} new native articles.")

if __name__ == "__main__":
    main()
