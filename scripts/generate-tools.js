import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsDirectory = path.join(__dirname, '..', 'tools');
const dataDirectory = path.join(__dirname, '..', 'data');

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

// Interactive Template Definitions
const templates = {
    // 1. Text & AI Processing Template
    text: `
        <div class="row g-4">
            <div class="col-lg-8">
                <div class="card card-luxury p-4">
                    <label class="form-label font-monospace text-warning small">Raw Text Input</label>
                    <textarea id="textInput" class="form-control bg-dark text-white border-secondary mb-3" rows="10" placeholder="Paste or type your content here for instant processing..." oninput="processText()"></textarea>
                    
                    <div class="d-flex flex-wrap gap-2 mb-3">
                        <button class="btn btn-luxury btn-sm" onclick="applyCase('upper')">UPPERCASE</button>
                        <button class="btn btn-luxury btn-sm" onclick="applyCase('lower')">lowercase</button>
                        <button class="btn btn-luxury btn-sm" onclick="applyCase('title')">Title Case</button>
                        <button class="btn btn-luxury btn-sm" onclick="applyCase('reverse')">Reverse Text</button>
                        <button class="btn btn-luxury btn-sm" onclick="applyCase('clear')">Clear Input</button>
                    </div>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="card card-luxury p-4 h-100">
                    <h4 class="text-white mb-4">Text Analytics & Preview</h4>
                    <div class="d-flex justify-content-between mb-2 border-bottom border-secondary pb-2">
                        <span>Words:</span>
                        <strong class="text-warning" id="wordCount">0</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2 border-bottom border-secondary pb-2">
                        <span>Characters:</span>
                        <strong class="text-warning" id="charCount">0</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-2 border-bottom border-secondary pb-2">
                        <span>Sentences:</span>
                        <strong class="text-warning" id="sentenceCount">0</strong>
                    </div>
                    <div class="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                        <span>Read Time:</span>
                        <strong class="text-warning" id="readTime">0 min</strong>
                    </div>
                    <div class="bg-black p-2 rounded text-secondary font-monospace small" style="min-height: 80px; font-size: 0.75rem;">
                        <strong>Markdown Preview:</strong>
                        <div id="previewBlock" class="text-white mt-1"></div>
                    </div>
                </div>
            </div>
        </div>
        <script>
            function processText() {
                const text = document.getElementById('textInput').value;
                const words = text.trim().split(/\\s+/).filter(w => w.length > 0).length;
                const chars = text.length;
                const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
                
                document.getElementById('wordCount').innerText = words;
                document.getElementById('charCount').innerText = chars;
                document.getElementById('sentenceCount').innerText = sentences;
                document.getElementById('readTime').innerText = Math.ceil(words / 200) + ' min';
                
                // Simple markdown preview parser
                let parsed = text
                    .replace(/^# (.*$)/gim, '<h4 class="text-white mt-2">$1</h4>')
                    .replace(/\\*\\*(.*)\\*\\*/gim, '<strong>$1</strong>')
                    .replace(/\\*(.*)\\*/gim, '<em>$1</em>')
                    .replace(/\\n/g, '<br>');
                document.getElementById('previewBlock').innerHTML = parsed;
            }
            function applyCase(type) {
                const input = document.getElementById('textInput');
                let val = input.value;
                if (type === 'upper') input.value = val.toUpperCase();
                if (type === 'lower') input.value = val.toLowerCase();
                if (type === 'title') input.value = val.replace(/\\b\\w/g, c => c.toUpperCase());
                if (type === 'reverse') input.value = val.split('').reverse().join('');
                if (type === 'clear') input.value = '';
                processText();
            }
        </script>
    `,

    // 2. SEO Generator Template
    seo: `
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-luxury p-4 h-100">
                    <h4 class="text-white mb-4">SEO Parameter Configuration</h4>
                    <div class="mb-3">
                        <label class="form-label font-monospace small">Website URL Domain</label>
                        <input type="text" id="seoUrl" class="form-control bg-dark text-white border-secondary" value="https://globalpulsenewsmedia.com">
                    </div>
                    <div class="mb-3">
                        <label class="form-label font-monospace small">Primary Focus Keyword</label>
                        <input type="text" id="seoKeyword" class="form-control bg-dark text-white border-secondary" placeholder="e.g. Geopolitics">
                    </div>
                    <div class="mb-3">
                        <label class="form-label font-monospace small">Configuration Mode</label>
                        <select id="seoMode" class="form-select bg-dark text-white border-secondary" onchange="switchSeoMode()">
                            <option value="meta">Meta Tag Codeblock</option>
                            <option value="sitemap">XML Sitemap Document</option>
                            <option value="robots">Robots.txt Schema</option>
                        </select>
                    </div>
                    <button class="btn btn-luxury w-100" onclick="generateSeoAssets()">Generate SEO Rules ➔</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-luxury p-4 h-100">
                    <h4 class="text-white mb-4">Generated Schema Output</h4>
                    <textarea id="seoOutput" class="form-control bg-black text-warning border-secondary font-monospace mb-3" rows="10" readonly></textarea>
                    <button class="btn btn-outline-warning w-100" onclick="copySeoOutput()">Copy Configurations</button>
                </div>
            </div>
        </div>
        <script>
            function switchSeoMode() {
                const mode = document.getElementById('seoMode').value;
                const kw = document.getElementById('seoKeyword');
                if (mode === 'meta') {
                    kw.disabled = false;
                } else {
                    kw.disabled = true;
                }
            }
            function generateSeoAssets() {
                const domain = document.getElementById('seoUrl').value.trim();
                const kw = document.getElementById('seoKeyword').value.trim() || 'Global News';
                const mode = document.getElementById('seoMode').value;
                let output = '';

                if (mode === 'meta') {
                    output = '<!-- Primary Meta Tags -->\\n' +
                             '<title>Premium ' + kw + ' Media Hub</title>\\n' +
                             '<meta name="description" content="Read institutional briefs on ' + kw + ' automatically compiled and updated daily.">\\n' +
                             '<meta name="keywords" content="' + kw.toLowerCase() + ', index, global media">\\n\\n' +
                             '<!-- OpenGraph Tags -->\\n' +
                             '<meta property="og:type" content="website">\\n' +
                             '<meta property="og:url" content="' + domain + '">';
                } else if (mode === 'sitemap') {
                    const today = new Date().toISOString().split('T')[0];
                    output = '<?xml version="1.0" encoding="UTF-8"?>\\n' +
                             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n' +
                             '  <url>\\n' +
                             '    <loc>' + domain + '</loc>\\n' +
                             '    <lastmod>' + today + '</lastmod>\\n' +
                             '    <changefreq>daily</changefreq>\\n' +
                             '  </url>\\n' +
                             '</urlset>';
                } else {
                    output = 'User-agent: *\\n' +
                             'Allow: /\\n' +
                             'Disallow: /admin/\\n\\n' +
                             'Sitemap: ' + domain + '/sitemap.xml';
                }
                document.getElementById('seoOutput').value = output;
            }
            function copySeoOutput() {
                const area = document.getElementById('seoOutput');
                area.select();
                document.execCommand('copy');
                alert('Copied to clipboard!');
            }
        </script>
    `,

    // 3. Security & Cryptography Template
    dev: `
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-luxury p-4 h-100">
                    <h4 class="text-white mb-4">Input Data</h4>
                    <textarea id="devInput" class="form-control bg-dark text-white border-secondary mb-3" rows="6" placeholder="Enter text or string block to process..."></textarea>
                    
                    <div class="d-flex gap-2">
                        <button class="btn btn-luxury flex-grow-1" onclick="processDev('encode')">Base64 Encode</button>
                        <button class="btn btn-outline-warning flex-grow-1" onclick="processDev('decode')">Base64 Decode</button>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-luxury p-4 h-100">
                    <h4 class="text-white mb-4">Operations Output</h4>
                    <textarea id="devOutput" class="form-control bg-black text-warning border-secondary font-monospace mb-3" rows="6" readonly placeholder="Output returns here..."></textarea>
                    <div class="d-flex gap-2">
                        <button class="btn btn-luxury flex-grow-1" onclick="processDev('json')">Validate JSON</button>
                        <button class="btn btn-secondary flex-grow-1" onclick="copyDevOutput()">Copy Code</button>
                    </div>
                </div>
            </div>
        </div>
        <script>
            function processDev(action) {
                const input = document.getElementById('devInput').value;
                const output = document.getElementById('devOutput');
                
                try {
                    if (action === 'encode') {
                        output.value = btoa(unescape(encodeURIComponent(input)));
                    } else if (action === 'decode') {
                        output.value = decodeURIComponent(escape(atob(input)));
                    } else if (action === 'json') {
                        JSON.parse(input);
                        output.value = '✓ Valid JSON syntax!';
                    }
                } catch(err) {
                    output.value = 'Execution error: ' + err.message;
                }
            }
            function copyDevOutput() {
                const val = document.getElementById('devOutput');
                val.select();
                document.execCommand('copy');
                alert('Copied!');
            }
        </script>
    `,

    // 4. Image & Color Utilities Template
    image: `
        <div class="row g-4">
            <div class="col-md-6">
                <div class="card card-luxury p-4 h-100">
                    <h4 class="text-white mb-4">Utility Generator</h4>
                    
                    <div class="mb-4">
                        <label class="form-label font-monospace small">Target Value / URL</label>
                        <input type="text" id="utilVal" class="form-control bg-dark text-white border-secondary mb-3" value="https://globalpulsenewsmedia.com">
                    </div>
                    
                    <div class="mb-4">
                        <label class="form-label font-monospace small">Secure Key Settings</label>
                        <select id="utilMode" class="form-select bg-dark text-white border-secondary mb-3">
                            <option value="qr">QR Code Generator</option>
                            <option value="uuid">UUID v4 generator</option>
                            <option value="password">Cryptographic Password</option>
                        </select>
                    </div>

                    <button class="btn btn-luxury w-100" onclick="generateUtil()">Execute Utility ➔</button>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card card-luxury p-4 h-100 text-center d-flex flex-column justify-content-between align-items-center">
                    <h4 class="text-white w-100 mb-3 font-display">Result Preview</h4>
                    <div id="utilPreview" class="p-3 bg-white rounded text-dark font-monospace w-100 d-flex justify-content-center align-items-center" style="min-height: 200px;">
                        <span class="text-muted">Output will display here</span>
                    </div>
                    <button class="btn btn-outline-warning w-100 mt-3" onclick="copyUtilResult()">Copy Result</button>
                </div>
            </div>
        </div>
        <script>
            let lastResult = '';
            function generateUtil() {
                const val = document.getElementById('utilVal').value.trim();
                const mode = document.getElementById('utilMode').value;
                const preview = document.getElementById('utilPreview');
                
                if (mode === 'qr') {
                    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(val);
                    preview.innerHTML = '<img src="' + qrUrl + '" alt="QR Code" />';
                    lastResult = qrUrl;
                } else if (mode === 'uuid') {
                    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                        return v.toString(16);
                    });
                    preview.innerHTML = '<span class="fs-5 text-dark">' + uuid + '</span>';
                    lastResult = uuid;
                } else {
                    let chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
                    let pass = '';
                    for(let i=0; i<16; i++) {
                        pass += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    preview.innerHTML = '<span class="fs-5 text-dark">' + pass + '</span>';
                    lastResult = pass;
                }
            }
            function copyUtilResult() {
                if(!lastResult) return;
                navigator.clipboard.writeText(lastResult).then(() => {
                    alert('Result copied!');
                });
            }
        </script>
    `
};

// Layout Template
function buildHTML(tool) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${tool.title} | Global Pulse Tools</title>
    
    <!-- SEO Optimization -->
    <meta name="description" content="${tool.description}">
    <meta name="keywords" content="${tool.keywords}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://globalpulsenewsmedia.com/tools/${tool.slug}">
    
    <!-- Bootstrap 5.3.3 CDN -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700;900&family=Outfit:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">

    <style>
        :root {
            --bg-obsidian: #0a0a0c;
            --bg-card: #121216;
            --border-luxury: #22222a;
            --accent-gold: #d4af37;
            --font-display: 'Cinzel', serif;
            --font-sans: 'Outfit', sans-serif;
            --font-mono: 'JetBrains Mono', monospace;
        }

        body {
            background-color: var(--bg-obsidian);
            color: #f8f9fa;
            font-family: var(--font-sans);
        }

        .luxury-header {
            background-color: rgba(10, 10, 12, 0.95);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid var(--border-luxury);
        }

        .brand-logo {
            font-family: var(--font-display);
            font-size: 1.8rem;
            font-weight: 900;
            letter-spacing: 0.1em;
            color: #fff;
            text-decoration: none;
        }

        .brand-logo span {
            color: var(--accent-gold);
        }

        .card-luxury {
            background-color: var(--bg-card);
            border: 1px solid var(--border-luxury);
            transition: all 0.3s ease;
        }

        .card-luxury:hover {
            border-color: rgba(212, 175, 55, 0.3);
        }

        .btn-luxury {
            border: 1px solid var(--accent-gold);
            background: transparent;
            color: var(--accent-gold);
            font-family: var(--font-display);
            font-size: 0.75rem;
            font-weight: 700;
            letter-spacing: 0.1em;
            transition: all 0.3s ease;
        }

        .btn-luxury:hover {
            background-color: var(--accent-gold);
            color: #000;
        }

        .adsense-slot {
            background: rgba(20, 20, 25, 0.4);
            border: 1px dashed #333344;
            color: #555566;
            font-family: var(--font-mono);
            font-size: 0.72rem;
            text-align: center;
            padding: 10px;
            margin: 20px 0;
            border-radius: 4px;
            letter-spacing: 0.05em;
        }
        .adsense-slot::before {
            content: "ADVERTISEMENT / SPONSORED CONTENT";
            display: block;
            font-size: 0.6rem;
            color: var(--accent-gold);
            margin-bottom: 5px;
            font-weight: 700;
        }
    </style>
</head>
<body>

    <!-- Header navigation -->
    <header class="luxury-header py-3">
        <div class="container d-flex justify-content-between align-items-center">
            <a href="/" class="brand-logo">GLOBAL<span>PULSE</span></a>
            <a href="/" class="btn btn-luxury px-3 py-2">← Back to Dashboard</a>
        </div>
    </header>

    <div class="container my-5">
        
        <!-- Header Leaderboard Ad slot -->
        <div class="adsense-slot">
            <strong>AD: Leaderboard Banner 728x90</strong> - Premium Institutional Analytics & Wealth Advisory Subscriptions Open.
        </div>

        <div class="text-center mb-5">
            <span class="badge bg-warning text-dark font-monospace text-uppercase mb-2">${tool.category} Utility</span>
            <h1 class="font-display text-uppercase text-white tracking-widest display-5 mb-2">${tool.h1}</h1>
            <p class="text-secondary" style="max-width: 600px; margin: 0 auto;">${tool.description}</p>
        </div>

        <!-- Tool Body -->
        <main class="mb-5">
            ${templates[tool.template]}
        </main>

        <!-- Bottom In-content Ad slot -->
        <div class="adsense-slot">
            <strong>AD: Bottom Banner 468x60</strong> - Get Lifetime Digital Credentials & Cloud Security Certifications.
        </div>

    </div>

    <footer class="bg-black border-top border-secondary py-4 mt-5 text-center text-secondary small font-monospace">
        &copy; 2026 Global Pulse Tools. All rights reserved. | Parent Entity MSME Registry: UDYAM-MH-17-0069728
    </footer>

</body>
</html>`;
}

// Generate the 1000 programmatic tools
const generatedCatalog = [];
let count = 0;

// Outer loop over prefixes, inner loop over base tools
for (const prefix of prefixes) {
    for (const bt of baseTools) {
        if (count >= 1000) break;
        
        const slug = `${prefix}-${bt.slug}`;
        const titleText = `${cleanTitle(prefix)} ${bt.name}`;
        
        const toolObj = {
            slug: slug,
            title: `${titleText} - 100% Free Online Web Utility`,
            h1: titleText,
            category: bt.category,
            template: bt.template,
            description: `Verify and run the ${titleText} instantly inside your browser. Generate clean schemas, optimize your text, or process developer files in one click.`,
            keywords: `${prefix} ${bt.slug.replace(/-/g, ' ')}, online ${bt.slug.replace(/-/g, ' ')}, free web tool`
        };

        const htmlContent = buildHTML(toolObj);
        const filePath = path.join(toolsDirectory, `${slug}.html`);
        fs.writeFileSync(filePath, htmlContent, 'utf-8');
        
        // Push simplified catalog index
        generatedCatalog.push({
            slug: slug,
            name: titleText,
            category: bt.category
        });
        count++;
    }
}

// Write the compiled catalog database for frontend search indexing to multiple paths
const catalogJSON = JSON.stringify(generatedCatalog, null, 2);
fs.writeFileSync(path.join(dataDirectory, 'tools_catalog.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(__dirname, '..', 'tools-data.json'), catalogJSON, 'utf-8');
fs.writeFileSync(path.join(toolsDirectory, 'catalog.json'), catalogJSON, 'utf-8');

console.log(`Successfully generated ${count} dynamic programmatic SEO tool pages!`);
console.log(`Saved dynamic tools index catalog to data/tools_catalog.json, tools-data.json, and tools/catalog.json`);
