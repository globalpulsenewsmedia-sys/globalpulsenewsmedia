import fs from 'fs/promises';
import path from 'path';

// --- CONFIGURATION ---
const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const FEEDS = [
    { category: 'WORLD', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
    { category: 'TECH', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml' },
    { category: 'BUSINESS', url: 'http://feeds.bbci.co.uk/news/business/rss.xml' },
    { category: 'SCIENCE', url: 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
    { category: 'HEALTH', url: 'http://feeds.bbci.co.uk/news/health/rss.xml' },
    { category: 'POLITICS', url: 'http://feeds.bbci.co.uk/news/politics/rss.xml' },
    { category: 'SPORTS', url: 'http://feeds.bbci.co.uk/sport/rss.xml' },
    { category: 'CELEBRITY', url: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml' }
];

const SITE_URL = "https://globalpulsenewsmedia.com";

// --- AI: IMAGE GENERATION (Hugging Face Free Tier) ---
async function generateImageWithHF(prompt) {
    const hfToken = process.env.HUGGINGFACE_API_KEY;
    if (!hfToken) return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";

    try {
        console.log(`🎨 Generating AI Image for: ${prompt.substring(0, 50)}...`);
        const response = await fetch(
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
            {
                headers: { Authorization: `Bearer ${hfToken}` },
                method: "POST",
                body: JSON.stringify({ inputs: `Professional news photo, high quality, cinematic, 16:9, ${prompt}` }),
            }
        );

        if (!response.ok) throw new Error('HF API Error');
        
        const buffer = await response.arrayBuffer();
        const fileName = `img_${Date.now()}.jpg`;
        const localDir = path.join(process.cwd(), 'data', 'images');
        
        await fs.mkdir(localDir, { recursive: true });
        await fs.writeFile(path.join(localDir, fileName), Buffer.from(buffer));
        
        return `./data/images/${fileName}`; // Return local path for static site
    } catch (error) {
        console.error('❌ HF Image Generation Failed:', error.message);
        return "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200";
    }
}

// --- AI: REWRITE & USA TARGETING (Gemini Free Tier) ---
async function rewriteAndEnrich(articles) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.log('⚠️ GEMINI_API_KEY not found in env. Running news fetch without AI rewrite.');
        return articles;
    }

    console.log('🤖 Processing articles with Gemini (English-only, USA audience targeting)...');
    const processedArticles = [];
    const articlesToProcess = articles.slice(0, 15);

    for (const article of articlesToProcess) {
        try {
            const prompt = `Rewrite this news item for a premium portal targeting a USA audience.
            1. Provide a catchy, professional English Title.
            2. Provide a 2-sentence English Snippet.
            3. Provide a detailed visual prompt for image generation.
            
            Return ONLY a JSON object: { "title_en": "", "snippet_en": "", "category": "", "img_prompt": "" }
            
            Item: ${article.title} - ${article.snippet}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { response_mime_type: "application/json" }
                })
            });

            const result = await response.json();
            if (result.candidates && result.candidates[0].content.parts[0].text) {
                const aiData = JSON.parse(result.candidates[0].content.parts[0].text);
                
                // Generate unique AI Image
                const aiImageUrl = await generateImageWithHF(aiData.img_prompt);

                processedArticles.push({
                    ...article,
                    title: aiData.title_en,
                    snippet: aiData.snippet_en,
                    category: aiData.category || article.category,
                    imageUrl: aiImageUrl,
                    source: 'Global Pulse AI Intelligence',
                    aiGenerated: true
                });
            } else {
                processedArticles.push(article);
            }
        } catch (error) {
            console.error(`❌ Error processing article:`, error);
            processedArticles.push(article);
        }
    }
    return processedArticles;
}

// --- MAIN TASK ---
async function fetchFeeds() {
    console.log('🚀 Starting Zero-Cost AI News Pipeline...');
    let allArticles = [];

    for (const feed of FEEDS) {
        try {
            const response = await fetch(`${RSS2JSON_API}${encodeURIComponent(feed.url)}`);
            const data = await response.json();
            if (data.status === 'ok') {
                const articles = data.items.slice(0, 10).map(item => ({
                    title: item.title,
                    snippet: item.description.replace(/<[^>]*>?/gm, '').substring(0, 200),
                    category: feed.category,
                    source: 'Global Pulse Intelligence',
                    time: new Date(item.pubDate).toLocaleString(),
                    imageUrl: item.thumbnail || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600",
                    link: "#"
                }));
                allArticles = allArticles.concat(articles);
            }
        } catch (e) { console.error(`Error fetching ${feed.category}`); }
    }

    // Deduplication
    const seen = new Set();
    allArticles = allArticles.filter(a => {
        const key = a.title.toLowerCase().trim();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });

    // AI Enrichment
    allArticles = await rewriteAndEnrich(allArticles);

    // Save Data
    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'news.json'), JSON.stringify(allArticles, null, 2));

    // SEO Generation
    await generateSitemap(allArticles);
    await generateRSS(allArticles);

    console.log(`✅ Pipeline complete. Processed ${allArticles.length} articles.`);
}

async function generateRSS(articles) {
    const rss = `<?xml version="1.0" encoding="UTF-8" ?><rss version="2.0"><channel><title>Global Pulse | AI News</title><link>${SITE_URL}</link><description>24/7 Global Intelligence</description>${articles.map((a, idx) => `<item><title>${a.title}</title><link>${SITE_URL}/article.html?id=${idx}</link><description>${a.snippet}</description></item>`).join('')}</channel></rss>`;
    await fs.writeFile(path.join(process.cwd(), 'feed.xml'), rss);
}

async function generateSitemap(articles) {
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${SITE_URL}/</loc><priority>1.0</priority></url>${articles.map((a, idx) => `<url><loc>${SITE_URL}/article.html?id=${idx}</loc><lastmod>${new Date().toISOString()}</lastmod></url>`).join('')}</urlset>`;
    await fs.writeFile(path.join(process.cwd(), 'sitemap.xml'), sitemap);
}

fetchFeeds().catch(console.error);
