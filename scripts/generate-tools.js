import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const toolsDirectory = path.join(__dirname, '..', 'tools');
if (!fs.existsSync(toolsDirectory)) {
    fs.mkdirSync(toolsDirectory, { recursive: true });
}

// Define the set of programmatic SEO tools
const tools = [
    {
        slug: 'meta-tag-generator',
        title: 'Free SEO Meta Tag Generator Tool',
        h1: 'SEO Meta Tag Generator',
        category: 'SEO',
        description: 'Generate fully-optimized Google SEO title tags, meta descriptions, and robots tags automatically to boost your organic search engine traffic.',
        keywords: 'meta tag generator, seo meta generator, generate tags, google seo tags',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Input Metadata</h4>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Site Name</label>
                            <input type="text" id="siteName" class="form-control bg-dark text-white border-secondary" placeholder="e.g. Global Pulse">
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Target Title Tag</label>
                            <input type="text" id="siteTitle" class="form-control bg-dark text-white border-secondary" placeholder="e.g. Premium AI News Media">
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Meta Description</label>
                            <textarea id="siteDesc" class="form-control bg-dark text-white border-secondary" rows="3" placeholder="e.g. Get autonomous geopolitical summaries..."></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Robots Policy</label>
                            <select id="siteRobots" class="form-select bg-dark text-white border-secondary">
                                <option value="index, follow">Index, Follow (Recommended)</option>
                                <option value="noindex, nofollow">Noindex, Nofollow</option>
                            </select>
                        </div>
                        <button class="btn btn-luxury w-100" onclick="generateMetaTags()">Generate Meta Tags</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Output Result</h4>
                        <textarea id="metaOutput" class="form-control bg-black text-warning border-secondary font-monospace mb-3" rows="10" readonly></textarea>
                        <button class="btn btn-outline-warning w-100" onclick="copyMetaOutput()">Copy Tag Block</button>
                    </div>
                </div>
            </div>
            <script>
                function generateMetaTags() {
                    const name = document.getElementById('siteName').value.trim();
                    const title = document.getElementById('siteTitle').value.trim();
                    const desc = document.getElementById('siteDesc').value.trim();
                    const robots = document.getElementById('siteRobots').value;
                    
                    const code = '<!-- Primary Meta Tags -->\\n' +
                                 '<title>' + title + ' | ' + name + '</title>\\n' +
                                 '<meta name="title" content="' + title + ' | ' + name + '">\\n' +
                                 '<meta name="description" content="' + desc + '">\\n' +
                                 '<meta name="robots" content="' + robots + '">\\n\\n' +
                                 '<!-- Open Graph / Facebook -->\\n' +
                                 '<meta property="og:type" content="website">\\n' +
                                 '<meta property="og:title" content="' + title + '">\\n' +
                                 '<meta property="og:description" content="' + desc + '">\\n\\n' +
                                 '<!-- Twitter -->\\n' +
                                 '<meta property="twitter:card" content="summary_large_image">\\n' +
                                 '<meta property="twitter:title" content="' + title + '">\\n' +
                                 '<meta property="twitter:description" content="' + desc + '">';
                    document.getElementById('metaOutput').value = code;
                }
                function copyMetaOutput() {
                    const textarea = document.getElementById('metaOutput');
                    textarea.select();
                    document.execCommand('copy');
                    alert('Copied to clipboard!');
                }
            </script>
        `
    },
    {
        slug: 'word-counter',
        title: 'Free Word Counter & Character Counter Tool',
        h1: 'Word & Character Counter',
        category: 'AI Content',
        description: 'Count words, characters, sentences, and paragraphs in real-time. Analyze document statistics instantly for content optimization.',
        keywords: 'word counter, character counter, text length, word count utility',
        html: `
            <div class="row g-4">
                <div class="col-lg-8">
                    <div class="card card-luxury p-4">
                        <textarea id="textInput" class="form-control bg-dark text-white border-secondary" rows="12" placeholder="Paste or type your content here for instant analysis..." oninput="analyzeText()"></textarea>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Text Analytics</h4>
                        <div class="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                            <span>Words:</span>
                            <strong class="text-warning" id="wordCount">0</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                            <span>Characters:</span>
                            <strong class="text-warning" id="charCount">0</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                            <span>Paragraphs:</span>
                            <strong class="text-warning" id="paraCount">0</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-3 border-bottom border-secondary pb-2">
                            <span>Sentences:</span>
                            <strong class="text-warning" id="sentenceCount">0</strong>
                        </div>
                        <div class="d-flex justify-content-between mb-3">
                            <span>Reading Time:</span>
                            <strong class="text-warning" id="readingTime">0 min</strong>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                function analyzeText() {
                    const text = document.getElementById('textInput').value;
                    const words = text.trim().split(/\\s+/).filter(w => w.length > 0);
                    const chars = text.length;
                    const paras = text.split(/\\n+/).filter(p => p.trim().length > 0).length;
                    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
                    
                    document.getElementById('wordCount').innerText = words.length;
                    document.getElementById('charCount').innerText = chars;
                    document.getElementById('paraCount').innerText = paras;
                    document.getElementById('sentenceCount').innerText = sentences;
                    
                    const time = Math.ceil(words.length / 200);
                    document.getElementById('readingTime').innerText = words.length > 0 ? time + ' min' : '0 min';
                }
            </script>
        `
    },
    {
        slug: 'markdown-live-preview',
        title: 'Free Markdown Live Editor & Parser Tool',
        h1: 'Markdown Live Editor',
        category: 'AI Content',
        description: 'Edit, write, and preview markdown syntax dynamically in real-time. Instantly format your notes and copy clean HTML output.',
        keywords: 'markdown editor, markdown preview, md to html, online markdown editor',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-3">Markdown Editor</h4>
                        <textarea id="markdownInput" class="form-control bg-black text-white border-secondary font-monospace" rows="15" placeholder="# Heading 1\\n\\n**Bold text**\\n\\n* Bullet item" oninput="parseMarkdown()"></textarea>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-3">Live HTML Preview</h4>
                        <div id="markdownPreview" class="bg-dark p-3 rounded border border-secondary" style="height: 360px; overflow-y: auto; color:#ccc;"></div>
                    </div>
                </div>
            </div>
            <script>
                function parseMarkdown() {
                    const md = document.getElementById('markdownInput').value;
                    // Simple replacement parser for basic tags
                    let html = md
                        .replace(/^# (.*$)/gim, '<h1 class="text-white mt-3">$1</h1>')
                        .replace(/^## (.*$)/gim, '<h2 class="text-white mt-2">$1</h2>')
                        .replace(/^### (.*$)/gim, '<h3 class="text-white">$1</h3>')
                        .replace(/\\*\\*(.*)\\*\\*/gim, '<strong>$1</strong>')
                        .replace(/\\*(.*)\\*/gim, '<em>$1</em>')
                        .replace(/\\n/gim, '<br>');
                    
                    document.getElementById('markdownPreview').innerHTML = html;
                }
                // Initial parse
                parseMarkdown();
            </script>
        `
    },
    {
        slug: 'base64-encoder',
        title: 'Free Base64 Encoder & Decoder Utility',
        h1: 'Base64 Encoder / Decoder',
        category: 'Developers',
        description: 'Securely encode plain text strings to Base64 format or decode Base64 back to readable text format in your browser.',
        keywords: 'base64 encode, base64 decode, base64 utility, online base64 converter',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-3">Plain Text</h4>
                        <textarea id="plainText" class="form-control bg-dark text-white border-secondary mb-3" rows="6" placeholder="Type plain text here..."></textarea>
                        <div class="d-flex gap-2">
                            <button class="btn btn-luxury flex-grow-1" onclick="encodeBase64()">Encode to Base64 ➔</button>
                            <button class="btn btn-outline-warning flex-grow-1" onclick="decodeBase64()">➔ Decode from Base64</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-3">Base64 Text</h4>
                        <textarea id="base64Text" class="form-control bg-dark text-warning border-secondary font-monospace mb-3" rows="6" placeholder="Base64 output/input..."></textarea>
                        <button class="btn btn-secondary w-100" onclick="copyBase64()">Copy Output</button>
                    </div>
                </div>
            </div>
            <script>
                function encodeBase64() {
                    try {
                        const plain = document.getElementById('plainText').value;
                        document.getElementById('base64Text').value = btoa(unescape(encodeURIComponent(plain)));
                    } catch(e) {
                        alert('Encoding error: ' + e.message);
                    }
                }
                function decodeBase64() {
                    try {
                        const b64 = document.getElementById('base64Text').value.trim();
                        document.getElementById('plainText').value = decodeURIComponent(escape(atob(b64)));
                    } catch(e) {
                        alert('Decoding error: Invalid Base64 format');
                    }
                }
                function copyBase64() {
                    const val = document.getElementById('base64Text');
                    val.select();
                    document.execCommand('copy');
                    alert('Copied!');
                }
            </script>
        `
    },
    {
        slug: 'qr-code-generator',
        title: 'Free QR Code Generator Online Tool',
        h1: 'QR Code Generator',
        category: 'Utilities',
        description: 'Generate high-resolution QR Codes instantly for URLs, text strings, and contact details with customized download formats.',
        keywords: 'qr code generator, online qr generator, create qr code, download qr',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Configure QR Content</h4>
                        <div class="mb-4">
                            <label class="form-label font-monospace small">Target URL / Text Content</label>
                            <input type="text" id="qrContent" class="form-control bg-dark text-white border-secondary" placeholder="e.g. https://globalpulsenewsmedia.com">
                        </div>
                        <button class="btn btn-luxury w-100" onclick="generateQR()">Generate QR Code</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100 text-center d-flex flex-column justify-content-between align-items-center">
                        <h4 class="text-white w-100 mb-3">Generated QR Code</h4>
                        <div id="qrPlaceholder" class="p-3 bg-white rounded border" style="width:200px; height:200px; display:flex; justify-content:center; align-items:center;">
                            <span class="text-muted font-monospace small">Enter text and click generate</span>
                        </div>
                        <button class="btn btn-outline-warning w-100 mt-3" onclick="downloadQR()">Download QR Image</button>
                    </div>
                </div>
            </div>
            <script>
                function generateQR() {
                    const text = document.getElementById('qrContent').value.trim();
                    if(!text) return;
                    
                    const placeholder = document.getElementById('qrPlaceholder');
                    const qrUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=' + encodeURIComponent(text);
                    placeholder.innerHTML = '<img id="qrImg" src="' + qrUrl + '" alt="QR Code" />';
                }
                function downloadQR() {
                    const img = document.getElementById('qrImg');
                    if(!img) {
                        alert('Please generate a QR code first!');
                        return;
                    }
                    const a = document.createElement('a');
                    a.href = img.src;
                    a.download = 'globalpulse_qrcode.png';
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
            </script>
        `
    },
    {
        slug: 'xml-sitemap-generator',
        title: 'Free XML Sitemap Generator for Google Search Console',
        h1: 'XML Sitemap Generator',
        category: 'SEO',
        description: 'Create standardized Google Search Console compliant XML sitemaps to verify indexing priorities of your blog routes.',
        keywords: 'xml sitemap generator, generate sitemap, google index map, sitemap generator online',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Sitemap Configuration</h4>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Website Domain URL</label>
                            <input type="text" id="sitemapDomain" class="form-control bg-dark text-white border-secondary" placeholder="e.g. https://globalpulsenewsmedia.com">
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Sub-Routes List (One per line)</label>
                            <textarea id="sitemapUrls" class="form-control bg-dark text-white border-secondary" rows="5" placeholder="/\\n/about\\n/contact\\n/terms"></textarea>
                        </div>
                        <button class="btn btn-luxury w-100" onclick="buildSitemap()">Generate XML sitemap</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Generated XML Output</h4>
                        <textarea id="sitemapOutput" class="form-control bg-black text-warning border-secondary font-monospace mb-3" rows="10" readonly></textarea>
                        <button class="btn btn-outline-warning w-100" onclick="copySitemap()">Copy XML Code</button>
                    </div>
                </div>
            </div>
            <script>
                function buildSitemap() {
                    const domain = document.getElementById('sitemapDomain').value.trim();
                    const urls = document.getElementById('sitemapUrls').value.split('\\n').filter(u => u.trim().length > 0);
                    const today = new Date().toISOString().split('T')[0];
                    
                    let xml = '<?xml version="1.0" encoding="UTF-8"?>\\n';
                    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\\n';
                    
                    urls.forEach(path => {
                        const cleanPath = path.startsWith('/') ? path : '/' + path;
                        xml += '  <url>\\n';
                        xml += '    <loc>' + domain + cleanPath + '</loc>\\n';
                        xml += '    <lastmod>' + today + '</lastmod>\\n';
                        xml += '    <changefreq>daily</changefreq>\\n';
                        xml += '    <priority>0.80</priority>\\n';
                        xml += '  </url>\\n';
                    });
                    
                    xml += '</urlset>';
                    document.getElementById('sitemapOutput').value = xml;
                }
                function copySitemap() {
                    const val = document.getElementById('sitemapOutput');
                    val.select();
                    document.execCommand('copy');
                    alert('Copied to clipboard!');
                }
            </script>
        `
    },
    {
        slug: 'robots-txt-generator',
        title: 'Free Robots.txt SEO Crawler Generator Tool',
        h1: 'Robots.txt Generator',
        category: 'SEO',
        description: 'Configure clean robots exclusion rules, secure admin paths, and register sitemaps for Googlebot search crawlers.',
        keywords: 'robots txt generator, create robots.txt, robots exclusion protocol, google seo crawler settings',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Set Exclusions</h4>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">User-agent</label>
                            <input type="text" id="robotsUA" class="form-control bg-dark text-white border-secondary" value="*">
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Disallow Paths (One per line)</label>
                            <textarea id="robotsDisallow" class="form-control bg-dark text-white border-secondary" rows="4" placeholder="/admin\\n/private\\n/logs"></textarea>
                        </div>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">XML Sitemap Path</label>
                            <input type="text" id="robotsSitemap" class="form-control bg-dark text-white border-secondary" placeholder="e.g. https://globalpulsenewsmedia.com/sitemap.xml">
                        </div>
                        <button class="btn btn-luxury w-100" onclick="generateRobots()">Build Robots.txt</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Output Result</h4>
                        <textarea id="robotsOutput" class="form-control bg-black text-warning border-secondary font-monospace mb-3" rows="10" readonly></textarea>
                        <button class="btn btn-outline-warning w-100" onclick="copyRobots()">Copy Rules</button>
                    </div>
                </div>
            </div>
            <script>
                function generateRobots() {
                    const ua = document.getElementById('robotsUA').value.trim();
                    const disallows = document.getElementById('robotsDisallow').value.split('\\n').filter(d => d.trim().length > 0);
                    const sitemap = document.getElementById('robotsSitemap').value.trim();
                    
                    let txt = 'User-agent: ' + ua + '\\n';
                    disallows.forEach(path => {
                        txt += 'Disallow: ' + path + '\\n';
                    });
                    
                    if (sitemap) {
                        txt += '\\nSitemap: ' + sitemap;
                    }
                    document.getElementById('robotsOutput').value = txt;
                }
                function copyRobots() {
                    const val = document.getElementById('robotsOutput');
                    val.select();
                    document.execCommand('copy');
                    alert('Copied!');
                }
            </script>
        `
    },
    {
        slug: 'password-generator',
        title: 'Free Strong Password Generator Tool Online',
        h1: 'Strong Password Generator',
        category: 'Utilities',
        description: 'Generate completely secure, random cryptographic passwords using specialized parameter lengths to safeguard online data.',
        keywords: 'password generator, secure password generator, random password, crypto key generator',
        html: `
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100">
                        <h4 class="text-white mb-4">Options</h4>
                        <div class="mb-3">
                            <label class="form-label font-monospace small">Length (<span id="lenVal">16</span> characters)</label>
                            <input type="range" class="form-range" min="8" max="64" value="16" id="passLength" oninput="document.getElementById('lenVal').innerText=this.value">
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="passUpper" checked>
                            <label class="form-check-label font-monospace small">Include Uppercase Letters</label>
                        </div>
                        <div class="form-check form-switch mb-2">
                            <input class="form-check-input" type="checkbox" id="passNumbers" checked>
                            <label class="form-check-label font-monospace small">Include Numbers</label>
                        </div>
                        <div class="form-check form-switch mb-4">
                            <input class="form-check-input" type="checkbox" id="passSymbols" checked>
                            <label class="form-check-label font-monospace small">Include Special Symbols</label>
                        </div>
                        <button class="btn btn-luxury w-100" onclick="generatePassword()">Generate Password</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="card card-luxury p-4 h-100 text-center d-flex flex-column justify-content-center">
                        <h4 class="text-white mb-4">Secure Key Result</h4>
                        <input type="text" id="passResult" class="form-control bg-black text-warning border-secondary text-center font-monospace mb-4 fs-5" readonly placeholder="Your strong password">
                        <button class="btn btn-outline-warning w-100" onclick="copyPassword()">Copy Key</button>
                    </div>
                </div>
            </div>
            <script>
                function generatePassword() {
                    const len = parseInt(document.getElementById('passLength').value);
                    const upper = document.getElementById('passUpper').checked;
                    const num = document.getElementById('passNumbers').checked;
                    const sym = document.getElementById('passSymbols').checked;
                    
                    let chars = 'abcdefghijklmnopqrstuvwxyz';
                    if (upper) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    if (num) chars += '0123456789';
                    if (sym) chars += '!@#$%^&*()_+|}{[]:;?><,./-=';
                    
                    let pass = '';
                    for (let i = 0; i < len; i++) {
                        pass += chars.charAt(Math.floor(Math.random() * chars.length));
                    }
                    document.getElementById('passResult').value = pass;
                }
                function copyPassword() {
                    const val = document.getElementById('passResult');
                    if(!val.value) return;
                    val.select();
                    document.execCommand('copy');
                    alert('Password Copied!');
                }
            </script>
        `
    }
];

// Master template for tool pages
function generateTemplate(tool) {
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
            --text-muted-custom: #8a8a93;
            
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
            ${tool.html}
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

// Generate the files
tools.forEach(tool => {
    const htmlContent = generateTemplate(tool);
    const filePath = path.join(toolsDirectory, `${tool.slug}.html`);
    fs.writeFileSync(filePath, htmlContent, 'utf-8');
    console.log(`Generated SEO tool page: ${filePath}`);
});

console.log('All programmatic SEO tool pages generated successfully!');
