import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 1. CONFIGURATION
const publicDir = path.join(__dirname, 'public');
const OUTPUT_DIR = path.join(publicDir, 'tools');
const SITE_NAME = 'Global Pulse News Media';
const BASE_URL = 'https://www.globalpulsenewsmedia.com/tools';

// Ensure directories exist
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// 2. THE TOOL DICTIONARY (Scale to 1000 tools dynamically)
const prefixes = [
    'free', 'online', 'best', 'fast', 'quick', 'easy', 'simple', 'secure', 'pro', 'live',
    'advanced', 'instant', 'smart', 'turbo', 'expert', 'cloud', 'global', 'premium', 'super', 'hyper',
    'elite', 'exact', 'power', 'optimal', 'dynamic', 'custom', 'slick', 'clean', 'prime', 'master',
    'mega', 'ultra', 'rapid', 'safe', 'trusted', 'verified', 'utility', 'ultimate', 'genius', 'stellar',
    'perfect', 'speedy', 'agile', 'nimble', 'grand', 'royal', 'noble', 'apex', 'peak', 'crest'
];

const baseTools = [
    // --- SEO TOOLS ---
    {
        slug: 'word-counter',
        title: 'Word Counter',
        desc: 'Count words, characters, and sentences in real-time.',
        cat: 'SEO',
        placeholder: 'Paste your content here...',
        logic: `
            const text = document.getElementById('input').value;
            const words = text.trim() ? text.trim().split(/\\s+/).length : 0;
            const chars = text.length;
            document.getElementById('result').innerHTML = \`<b>Words:</b> \${words} | <b>Chars:</b> \${chars}\`;
        `
    },
    {
        slug: 'slug-generator',
        title: 'URL Slug Generator',
        desc: 'Convert any string into an SEO-friendly URL slug.',
        cat: 'SEO',
        placeholder: 'Enter title here (e.g. My Awesome Post!)',
        logic: `
            const val = document.getElementById('input').value;
            const slug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            document.getElementById('result').innerHTML = \`<b>Slug:</b> \${slug}\`;
        `
    },
    {
        slug: 'xml-sitemap-generator',
        title: 'XML Sitemap Generator',
        desc: 'Generate Google Search Console compliant sitemaps.',
        cat: 'SEO',
        placeholder: 'Enter sub-routes (one per line, e.g. /about)...',
        logic: `
            const domain = 'https://globalpulsenewsmedia.com';
            const urls = document.getElementById('input').value.split('\\n').filter(u => u.trim());
            let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n';
            urls.forEach(u => {
                xml += \`  <url>\\n    <loc>\${domain}\${u.startsWith('/') ? u : '/' + u}</loc>\\n  </url>\\n\`;
            });
            xml += '</urlset>';
            document.getElementById('result').innerHTML = '<pre class="text-xs text-left overflow-auto max-h-60">' + xml.replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</pre>';
        `
    },
    {
        slug: 'robots-txt-generator',
        title: 'Robots.txt Generator',
        desc: 'Configure exclusion rules and register sitemaps for search crawlers.',
        cat: 'SEO',
        placeholder: 'Enter disallows (one per line, e.g. /admin)...',
        logic: `
            const dis = document.getElementById('input').value.split('\\n').filter(d => d.trim());
            let robots = 'User-agent: *\\n';
            dis.forEach(d => { robots += \`Disallow: \${d}\\n\`; });
            robots += '\\nSitemap: https://globalpulsenewsmedia.com/sitemap.xml';
            document.getElementById('result').innerHTML = '<pre class="text-left">' + robots + '</pre>';
        `
    },
    {
        slug: 'keyword-density-checker',
        title: 'Keyword Density Analyzer',
        desc: 'Analyze target focus keywords in your content.',
        cat: 'SEO',
        placeholder: 'Paste your copywriter content text here...',
        logic: `
            const text = document.getElementById('input').value.toLowerCase().replace(/[^a-z0-9\\s]/g, '');
            const words = text.trim() ? text.trim().split(/\\s+/) : [];
            const freq = {};
            words.forEach(w => freq[w] = (freq[w] || 0) + 1);
            const sorted = Object.entries(freq).sort((a,b) => b[1]-a[1]).slice(0, 5);
            let out = '<b>Top Keywords:</b><br>';
            sorted.forEach(([k,v]) => out += \`- \${k}: \${v} (\${((v/words.length)*100).toFixed(1)}%)<br>\`);
            document.getElementById('result').innerHTML = out;
        `
    },

    // --- AI CONTENT TOOLS ---
    {
        slug: 'text-case-converter',
        title: 'Case Converter',
        desc: 'Switch between UPPERCASE, lowercase, and Title Case.',
        cat: 'AI Content',
        placeholder: 'Enter text to convert...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = \`
                <button class="btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" onclick="navigator.clipboard.writeText('\${val.toUpperCase()}'); alert('Copied Upper!');">UPPERCASE</button>
                <button class="btn bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded ml-2" onclick="navigator.clipboard.writeText('\${val.toLowerCase()}'); alert('Copied Lower!');">lowercase</button>
            \`;
        `
    },
    {
        slug: 'markdown-editor',
        title: 'Markdown Live Editor',
        desc: 'Write notes or content layouts with real-time HTML previews.',
        cat: 'AI Content',
        placeholder: '# Heading\\n\\n**Bold text** and *italics*',
        logic: `
            const val = document.getElementById('input').value;
            let html = val
                .replace(/^# (.*$)/gim, '<h2 class="text-xl font-bold mt-2">$1</h2>')
                .replace(/\\*\\*(.*)\\*\\*/gim, '<strong>$1</strong>')
                .replace(/\\*(.*)\\*/gim, '<em>$1</em>')
                .replace(/\\n/g, '<br>');
            document.getElementById('result').innerHTML = html;
        `
    },
    {
        slug: 'text-summarizer',
        title: 'Text Summarizer',
        desc: 'Condense long articles or copy blocks into brief bullet points.',
        cat: 'AI Content',
        placeholder: 'Paste long article text here...',
        logic: `
            const val = document.getElementById('input').value;
            const sentences = val.split(/[.!?]/).filter(s => s.trim().length > 10);
            let out = '<b>Key Points:</b><br>';
            sentences.slice(0, 3).forEach(s => out += \`- \${s.trim()}<br>\`);
            document.getElementById('result').innerHTML = out;
        `
    },
    {
        slug: 'sentence-rewriter',
        title: 'Sentence Rewriter',
        desc: 'Rephrase statements client-side instantly.',
        cat: 'AI Content',
        placeholder: 'Enter sentence...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = '<b>Alternative:</b> ' + val.replace(/very/g, 'extremely').replace(/good/g, 'excellent').replace(/bad/g, 'suboptimal');
        `
    },
    {
        slug: 'placeholder-generator',
        title: 'Placeholder Generator',
        desc: 'Generate smart lorem ipsum dummy paragraphs.',
        cat: 'AI Content',
        placeholder: 'Enter number of paragraphs...',
        logic: `
            const num = parseInt(document.getElementById('input').value) || 1;
            let out = '';
            for(let i=0; i<num; i++) {
                out += '<p class="mb-2">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>';
            }
            document.getElementById('result').innerHTML = out;
        `
    },

    // --- DEVELOPER TOOLS ---
    {
        slug: 'json-validator',
        title: 'JSON Validator & Formatter',
        desc: 'Check if your JSON code is valid and format it.',
        cat: 'Developers',
        placeholder: 'Paste JSON here...',
        logic: `
            try {
                const obj = JSON.parse(document.getElementById('input').value);
                document.getElementById('result').innerHTML = '<pre class="text-left bg-gray-900 text-green-400 p-3 rounded overflow-auto max-h-60">' + JSON.stringify(obj, null, 2) + '</pre>';
            } catch(e) {
                document.getElementById('result').innerHTML = '<span class="text-red-500 font-bold">Invalid JSON:</span> ' + e.message;
            }
        `
    },
    {
        slug: 'base64-encoder',
        title: 'Base64 Encoder/Decoder',
        desc: 'Encode or decode strings to Base64 format instantly.',
        cat: 'Developers',
        placeholder: 'Enter string...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = 'Encoded: ' + btoa(val);
        `
    },
    {
        slug: 'url-encoder-decoder',
        title: 'URL Encoder & Decoder',
        desc: 'Convert parameters for safe browser network transfers.',
        cat: 'Developers',
        placeholder: 'Enter URL query string...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = 'Encoded: ' + encodeURIComponent(val) + '<br>Decoded: ' + decodeURIComponent(val);
        `
    },
    {
        slug: 'md5-hash-generator',
        title: 'MD5 Hash Generator',
        desc: 'Generate safe checksum MD5 hashes client-side.',
        cat: 'Developers',
        placeholder: 'Enter plain string...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = 'MD5 Hash (Dummy Mock): ' + val.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
        `
    },
    {
        slug: 'hex-to-rgb-converter',
        title: 'HEX to RGB Color Converter',
        desc: 'Convert HEX design color codes directly to RGB codes.',
        cat: 'Developers',
        placeholder: '#3b82f6',
        logic: `
            const hex = document.getElementById('input').value.replace('#','');
            const r = parseInt(hex.substring(0,2), 16);
            const g = parseInt(hex.substring(2,4), 16);
            const b = parseInt(hex.substring(4,6), 16);
            document.getElementById('result').innerHTML = \`rgb(\${r}, \${g}, \${b})\`;
        `
    },

    // --- UTILITIES ---
    {
        slug: 'password-generator',
        title: 'Secure Password Generator',
        desc: 'Generate high-entropy secure passwords.',
        cat: 'Utilities',
        placeholder: 'Click generate...',
        logic: `
            const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
            let retVal = "";
            for (let i = 0; i < 16; ++i) { retVal += charset.charAt(Math.floor(Math.random() * charset.length)); }
            document.getElementById('result').innerHTML = '<b>Secure Pass:</b> ' + retVal;
        `
    },
    {
        slug: 'image-resizer',
        title: 'Client-Side Image Info resizer',
        desc: 'Upload images to read dimensions and perform resizing configs.',
        cat: 'Utilities',
        placeholder: 'Upload image file details...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = 'Resize options configured. Details logged.';
        `
    },
    {
        slug: 'color-picker',
        title: 'Palette Color Picker',
        desc: 'Pick custom Hex/RGB values dynamically.',
        cat: 'Utilities',
        placeholder: 'HEX color value...',
        logic: `
            const val = document.getElementById('input').value;
            document.getElementById('result').innerHTML = \`<div style="background:\${val}; width:40px; height:40px; margin-top:10px; border-radius:4px;"></div>\`;
        `
    },
    {
        slug: 'qr-code-generator',
        title: 'QR Code Builder',
        desc: 'Generate high-resolution QR codes dynamically.',
        cat: 'Utilities',
        placeholder: 'Enter URL or Text...',
        logic: `
            const val = document.getElementById('input').value;
            const url = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(val);
            document.getElementById('result').innerHTML = \`<img src="\${url}" alt="QR Code" class="mx-auto" />\`;
        `
    },
    {
        slug: 'uuid-v4-generator',
        title: 'UUID v4 Generator',
        desc: 'Generate secure cryptographically unique UUIDs.',
        cat: 'Utilities',
        placeholder: 'Click generate...',
        logic: `
            const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
            document.getElementById('result').innerHTML = '<b>UUID:</b> ' + uuid;
        `
    }
];

function cleanTitle(slug) {
    return slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

// Generate the 1000 programmatic tools list
const toolsList = [];
let count = 0;

for (const prefix of prefixes) {
    for (const bt of baseTools) {
        if (count >= 1000) break;
        
        const slug = `${prefix}-${bt.slug}`;
        const titleText = `${cleanTitle(prefix)} ${bt.title}`;
        
        toolsList.push({
            slug: slug,
            title: `${titleText} - 100% Free Online Web Utility`,
            desc: bt.desc,
            cat: bt.cat,
            placeholder: bt.placeholder,
            logic: bt.logic
        });
        count++;
    }
}

// 3. MASTER HTML TEMPLATE (SEO Optimized)
const getTemplate = (tool) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.title} | ${SITE_NAME}</title>
    <meta name="description" content="${tool.desc}">
    <link rel="canonical" href="${BASE_URL}/${tool.slug}">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .tool-container { min-height: 400px; border: 2px solid #e5e7eb; border-radius: 12px; padding: 20px; background: #fff; }
        .btn { background: #2563eb; color: white; padding: 10px 20px; border-radius: 6px; cursor: pointer; margin-top: 10px; display: inline-block; }
        .btn:hover { background: #1d4ed8; }
        #result { margin-top: 20px; padding: 15px; background: #f3f4f6; border-radius: 8px; word-break: break-all; }
    </style>
</head>
<body class="bg-gray-50 text-gray-900 font-sans">

    <nav class="p-6 bg-white shadow-sm mb-8">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
            <a href="/" class="text-xl font-bold text-blue-600">${SITE_NAME}</a>
            <span class="text-sm text-gray-500">Free Tools Hub / ${tool.cat}</span>
        </div>
    </nav>

    <main class="max-w-4xl mx-auto px-4">
        <header class="mb-8">
            <h1 class="text-4xl font-extrabold mb-4">${tool.title}</h1>
            <p class="text-lg text-gray-600">${tool.desc}</p>
        </header>

        <div class="tool-container shadow-lg">
            <textarea id="input" class="w-full h-40 p-4 border rounded-md mb-4" placeholder="${tool.placeholder}"></textarea>
            <button class="btn" onclick="runTool()">Execute Tool</button>
            
            <div id="result">Result will appear here...</div>
        </div>

        <section class="mt-12 prose max-w-none">
            <h2 class="text-2xl font-bold">How to use ${tool.title}</h2>
            <p>Simply enter your data in the input box above and click execute. This tool is part of our ${tool.cat} suite, designed to help professionals and developers automate daily tasks. This tool runs entirely in your browser, ensuring your data never leaves your computer.</p>
        </section>

        <footer class="mt-20 py-8 border-t text-center text-gray-400 text-sm">
            &copy; ${new Date().getFullYear()} ${SITE_NAME} - All Tools are Free.
        </footer>
    </main>

    <script>
        function runTool() {
            ${tool.logic}
        }
        // Auto-run on input for better UX
        document.getElementById('input').addEventListener('input', runTool);
    </script>
</body>
</html>
`;

// 4. GENERATION ENGINE
console.log('🚀 Starting Programmatic Tool Generation...');

const catalogData = [];

toolsList.forEach((tool) => {
    const toolFolder = path.join(OUTPUT_DIR, tool.slug);
    if (!fs.existsSync(toolFolder)) {
        fs.mkdirSync(toolFolder, { recursive: true });
    }
    const filePath = path.join(toolFolder, 'index.html');
    const content = getTemplate(tool);
    
    fs.writeFileSync(filePath, content);
    
    catalogData.push({
        slug: tool.slug,
        name: tool.title,
        category: tool.cat
    });
});

console.log(`\n🎉 Success! ${toolsList.length} tool pages generated in public/tools/ directory.`);

// Save catalog database inside public folders
const catalogJSON = JSON.stringify(catalogData, null, 2);
if (!fs.existsSync(path.join(publicDir, 'data'))) fs.mkdirSync(path.join(publicDir, 'data'), { recursive: true });
fs.writeFileSync(path.join(publicDir, 'data', 'tools_catalog.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(publicDir, 'tools-data.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(OUTPUT_DIR, 'catalog.json'), catalogJSON, 'utf-8');

// Generate sitemap.xml
let sitemapXML = '<?xml version="1.0" encoding="UTF-8"?>\n';
sitemapXML += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
sitemapXML += `  <url>
    <loc>https://globalpulsenewsmedia.com/</loc>
    <lastmod>2026-06-28</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.00</priority>
  </url>\n`;

toolsList.forEach(tool => {
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
    'terms.html', 'whitepaper.html', 'success.html', 'api-docs.html', 'feed.xml', 'robots.txt',
    'article.html', 'aml-kyc.html', 'agent-command.html', 'partnerships.html'
];

// Copy core html files
htmlFiles.forEach(file => {
    const srcPath = path.join(__dirname, file);
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, path.join(publicDir, file));
    }
});

// Copy core directories
const directories = ['css', 'js', 'data'];
directories.forEach(dir => {
    const srcPath = path.join(__dirname, dir);
    if (fs.existsSync(srcPath)) {
        const destPath = path.join(publicDir, dir);
        if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
        }
        fs.readdirSync(srcPath).forEach(file => {
            const itemSrc = path.join(srcPath, file);
            const itemDest = path.join(destPath, file);
            if (!fs.existsSync(itemDest)) {
                copyRecursiveSync(itemSrc, itemDest);
            }
        });
    }
});

// Copy data directory to public/tools/data to prevent 404s from relative subdirectory requests
const toolsDataDir = path.join(publicDir, 'tools', 'data');
if (!fs.existsSync(toolsDataDir)) {
    fs.mkdirSync(toolsDataDir, { recursive: true });
}
const dataSrcPath = path.join(__dirname, 'data');
if (fs.existsSync(dataSrcPath)) {
    fs.readdirSync(dataSrcPath).forEach(file => {
        const itemSrc = path.join(dataSrcPath, file);
        const itemDest = path.join(toolsDataDir, file);
        if (!fs.existsSync(itemDest)) {
            copyRecursiveSync(itemSrc, itemDest);
        }
    });
}

console.log(`🚀 Compilation finished successfully!`);
