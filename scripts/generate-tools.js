import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsDirectory = path.join(__dirname, '..', 'tools');
const dataDirectory = path.join(__dirname, '..', 'data');
const rootDirectory = path.join(__dirname, '..');

if (!fs.existsSync(toolsDirectory)) {
    fs.mkdirSync(toolsDirectory, { recursive: true });
}
if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory, { recursive: true });
}

// 50 prefix modifiers to scale programmatic combinations
const prefixes = [
    'free', 'online', 'best', 'fast', 'quick', 'easy', 'simple', 'secure', 'pro', 'live',
    'advanced', 'instant', 'smart', 'turbo', 'expert', 'cloud', 'global', 'premium', 'super', 'hyper',
    'elite', 'exact', 'power', 'optimal', 'dynamic', 'custom', 'slick', 'clean', 'prime', 'master',
    'mega', 'ultra', 'rapid', 'safe', 'trusted', 'verified', 'utility', 'ultimate', 'genius', 'stellar',
    'perfect', 'speedy', 'agile', 'nimble', 'grand', 'royal', 'noble', 'apex', 'peak', 'crest'
];

// 20 Core tools across 4 categories
const baseTools = [
    // SEO Category
    { slug: 'meta-tag-generator', name: 'SEO Meta Tag Generator', category: 'SEO', template: 'seo' },
    { slug: 'xml-sitemap-generator', name: 'XML Sitemap Generator', category: 'SEO', template: 'seo' },
    { slug: 'robots-txt-generator', name: 'Robots.txt Generator', category: 'SEO', template: 'seo' },
    { slug: 'keyword-density-checker', name: 'Keyword Density Analyzer', category: 'SEO', template: 'seo' },
    { slug: 'redirect-header-analyzer', name: 'HTTP Redirect Header Analyzer', category: 'SEO', template: 'seo' },
    
    // AI Content Category
    { slug: 'word-counter', name: 'Word & Character Counter', category: 'AI Content', template: 'text' },
    { slug: 'markdown-editor', name: 'Markdown Live Editor', category: 'AI Content', template: 'text' },
    { slug: 'text-summarizer', name: 'AI Text Summarizer Tool', category: 'AI Content', template: 'text' },
    { slug: 'case-converter', name: 'Text Case Converter', category: 'AI Content', template: 'text' },
    { slug: 'sentence-rewriter', name: 'Sentence Rewriter Utility', category: 'AI Content', template: 'text' },
    
    // Developers Category
    { slug: 'base64-encoder', name: 'Base64 Encoder / Decoder', category: 'Developers', template: 'dev' },
    { slug: 'json-formatter', name: 'JSON Formatter & Validator', category: 'Developers', template: 'dev' },
    { slug: 'url-encoder-decoder', name: 'URL Encoder & Decoder', category: 'Developers', template: 'dev' },
    { slug: 'md5-hash-generator', name: 'MD5 Cryptographic Hash Generator', category: 'Developers', template: 'dev' },
    { slug: 'hex-to-rgb-converter', name: 'HEX to RGB Color Converter', category: 'Developers', template: 'dev' },
    
    // Image & Utilities Category
    { slug: 'image-resizer', name: 'Client-Side Image Resizer', category: 'Utilities', template: 'image' },
    { slug: 'color-picker', name: 'Palette Color Picker', category: 'Utilities', template: 'image' },
    { slug: 'qr-code-generator', name: 'QR Code Builder', category: 'Utilities', template: 'image' },
    { slug: 'password-generator', name: 'Strong Password Generator', category: 'Utilities', template: 'image' },
    { slug: 'uuid-v4-generator', name: 'UUID v4 Identifier Generator', category: 'Utilities', template: 'image' }
];

// Helper to capital case slug names
function cleanTitle(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Generate the 1000 programmatic tools database catalog
const generatedCatalog = [];
let count = 0;

for (const prefix of prefixes) {
    for (const bt of baseTools) {
        if (count >= 1000) break;
        
        const slug = `${prefix}-${bt.slug}`;
        const titleText = `${cleanTitle(prefix)} ${bt.name}`;
        
        generatedCatalog.push({
            slug: slug,
            name: titleText,
            category: bt.category,
            template: bt.template,
            description: `Verify and run the ${titleText} instantly inside your browser. Generate clean schemas, optimize your text, or process developer files in one click.`
        });
        count++;
    }
}

// Write compiled catalog database to various endpoints
const catalogJSON = JSON.stringify(generatedCatalog, null, 2);
fs.writeFileSync(path.join(dataDirectory, 'tools_catalog.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(rootDirectory, 'tools-data.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(toolsDirectory, 'catalog.json'), catalogJSON, 'utf-8');

// Generate XML sitemap with all 1000 dynamic URLs for programmatic SEO indexing
let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

// Add homepage
sitemapXML += `  <url>
    <loc>https://globalpulsenewsmedia.com/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>\n`;

// Add sitemap items for all 1000 tools
generatedCatalog.forEach(tool => {
    sitemapXML += `  <url>
    <loc>https://globalpulsenewsmedia.com/tools/${tool.slug}</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>\n`;
});

sitemapXML += '</urlset>';

fs.writeFileSync(path.join(rootDirectory, 'sitemap.xml'), sitemapXML, 'utf-8');

console.log(`Successfully compiled database for ${count} dynamic programmatic SEO tools!`);
console.log(`Saved dynamic tools index catalog to data/tools_catalog.json, tools-data.json, and tools/catalog.json`);
console.log(`Generated sitemap.xml with ${count + 1} indexed URLs at root.`);
