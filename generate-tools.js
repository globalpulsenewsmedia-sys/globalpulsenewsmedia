import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define Output Directory
const publicDir = path.join(__dirname, 'public');
const toolsDirectory = path.join(publicDir, 'tools');
const dataDirectory = path.join(publicDir, 'data');

// Recreate clean public directories
if (fs.existsSync(publicDir)) {
    fs.rmSync(publicDir, { recursive: true, force: true });
}
fs.mkdirSync(publicDir, { recursive: true });
fs.mkdirSync(toolsDirectory, { recursive: true });
fs.mkdirSync(dataDirectory, { recursive: true });

// 50 prefix modifiers to scale combinations
const prefixes = [
    'free', 'online', 'best', 'fast', 'quick', 'easy', 'simple', 'secure', 'pro', 'live',
    'advanced', 'instant', 'smart', 'turbo', 'expert', 'cloud', 'global', 'premium', 'super', 'hyper',
    'elite', 'exact', 'power', 'optimal', 'dynamic', 'custom', 'slick', 'clean', 'prime', 'master',
    'mega', 'ultra', 'rapid', 'safe', 'trusted', 'verified', 'utility', 'ultimate', 'genius', 'stellar',
    'perfect', 'speedy', 'agile', 'nimble', 'grand', 'royal', 'noble', 'apex', 'peak', 'crest'
];

// 20 Core tools
const baseTools = [
    { slug: 'meta-tag-generator', name: 'SEO Meta Tag Generator', category: 'SEO', template: 'seo' },
    { slug: 'xml-sitemap-generator', name: 'XML Sitemap Generator', category: 'SEO', template: 'seo' },
    { slug: 'robots-txt-generator', name: 'Robots.txt Generator', category: 'SEO', template: 'seo' },
    { slug: 'keyword-density-checker', name: 'Keyword Density Analyzer', category: 'SEO', template: 'seo' },
    { slug: 'redirect-header-analyzer', name: 'HTTP Redirect Header Analyzer', category: 'SEO', template: 'seo' },
    
    { slug: 'word-counter', name: 'Word & Character Counter', category: 'AI Content', template: 'text' },
    { slug: 'markdown-editor', name: 'Markdown Live Editor', category: 'AI Content', template: 'text' },
    { slug: 'text-summarizer', name: 'AI Text Summarizer Tool', category: 'AI Content', template: 'text' },
    { slug: 'case-converter', name: 'Text Case Converter', category: 'AI Content', template: 'text' },
    { slug: 'sentence-rewriter', name: 'Sentence Rewriter Utility', category: 'AI Content', template: 'text' },
    
    { slug: 'base64-encoder', name: 'Base64 Encoder / Decoder', category: 'Developers', template: 'dev' },
    { slug: 'json-formatter', name: 'JSON Formatter & Validator', category: 'Developers', template: 'dev' },
    { slug: 'url-encoder-decoder', name: 'URL Encoder & Decoder', category: 'Developers', template: 'dev' },
    { slug: 'md5-hash-generator', name: 'MD5 Cryptographic Hash Generator', category: 'Developers', template: 'dev' },
    { slug: 'hex-to-rgb-converter', name: 'HEX to RGB Color Converter', category: 'Developers', template: 'dev' },
    
    { slug: 'image-resizer', name: 'Client-Side Image Resizer', category: 'Utilities', template: 'image' },
    { slug: 'color-picker', name: 'Palette Color Picker', category: 'Utilities', template: 'image' },
    { slug: 'qr-code-generator', name: 'QR Code Builder', category: 'Utilities', template: 'image' },
    { slug: 'password-generator', name: 'Strong Password Generator', category: 'Utilities', template: 'image' },
    { slug: 'uuid-v4-generator', name: 'UUID v4 Identifier Generator', category: 'Utilities', template: 'image' }
];

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

// Write catalog database inside public directories
const catalogJSON = JSON.stringify(generatedCatalog, null, 2);
fs.writeFileSync(path.join(dataDirectory, 'tools_catalog.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'tools-data.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(toolsDirectory, 'catalog.json'), catalogJSON, 'utf-8');

// Generate XML sitemap with all 1000 dynamic URLs
let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
sitemapXML += `  <url>
    <loc>https://globalpulsenewsmedia.com/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>\n`;

generatedCatalog.forEach(tool => {
    sitemapXML += `  <url>
    <loc>https://globalpulsenewsmedia.com/tools/${tool.slug}</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.80</priority>
  </url>\n`;
});
sitemapXML += '</urlset>';
fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML, 'utf-8');

// Helper to copy recursively
function copyRecursiveSync(src, dest) {
    const exists = fs.existsSync(src);
    const stats = exists && fs.statSync(src);
    const isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
        if (!fs.existsSync(dest)) {
            fs.mkdirSync(dest, { recursive: true });
        }
        fs.readdirSync(src).forEach(childItemName => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
        });
    } else {
        fs.copyFileSync(src, dest);
    }
}

// Static HTML files to deploy
const htmlFiles = [
    'index.html', 'about-us.html', 'about.html', 'careers.html', 'compliance-center.html',
    'contact-center.html', 'contact.html', 'disclosures.html', 'editorial-guidelines.html',
    'enterprise.html', 'google-readiness.html', 'investors.html', 'marketplace.html',
    'media-center.html', 'privacy.html', 'pro.html', 'refund.html', 'risk.html',
    'roadmap.html', 'security-center.html', 'security.html', 'shipping.html',
    'terms.html', 'whitepaper.html', 'success.html', 'api-docs.html', 'feed.xml', 'robots.txt'
];

// Copy core html files
htmlFiles.forEach(file => {
    const srcPath = path.join(__dirname, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(publicDir, file));
    }
});

// Copy core directories
const directories = ['css', 'js', 'data', 'tools'];
directories.forEach(dir => {
    const srcPath = path.join(__dirname, dir);
    if (fs.existsSync(srcPath)) {
        const destPath = path.join(publicDir, dir);
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }
        // We only copy contents to prevent overwriting generated directories
        fs.readdirSync(srcPath).forEach(file => {
            const itemSrc = path.join(srcPath, file);
            const itemDest = path.join(destPath, file);
            if (!fs.existsSync(itemDest)) {
                copyRecursiveSync(itemSrc, itemDest);
            }
        });
    }
});

console.log(`Successfully generated 1000 programmatic tools, sitemaps, and copied all deployment files into public/ folder!`);
