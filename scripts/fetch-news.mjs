import fs from 'fs/promises';
import path from 'path';

// This script is designed to be run by GitHub actions where Node.js is available.
// It will fetch RSS feeds, rewrite them with Gemini (if API key is set),
// and save them to a JSON file for the static site to render.

const RSS2JSON_API = 'https://api.rss2json.com/v1/api.json?rss_url=';
const FEEDS = [
    { category: 'WORLD', url: 'http://feeds.bbci.co.uk/news/world/rss.xml' },
    { category: 'TECH', url: 'http://feeds.bbci.co.uk/news/technology/rss.xml' },
    { category: 'BUSINESS', url: 'http://feeds.bbci.co.uk/news/business/rss.xml' },
    { category: 'SCIENCE', url: 'http://feeds.bbci.co.uk/news/science_and_environment/rss.xml' },
    { category: 'HEALTH', url: 'http://feeds.bbci.co.uk/news/health/rss.xml' },
    { category: 'SPORTS', url: 'http://feeds.bbci.co.uk/sport/rss.xml' },
    { category: 'ENTERTAINMENT', url: 'http://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml' },
    { category: 'POLITICS', url: 'http://feeds.bbci.co.uk/news/politics/rss.xml' },
    { category: 'US', url: 'http://feeds.bbci.co.uk/news/world/us_and_canada/rss.xml' },
    { category: 'UK', url: 'http://feeds.bbci.co.uk/news/uk/rss.xml' }
];

async function rewriteArticlesWithGemini(articles) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.warn('GEMINI_API_KEY not found. Skipping AI rewrite.');
        return articles;
    }

    console.log('Rewriting articles with Gemini AI...');
    const rewrittenArticles = [];

    // Limit to top 15 articles to stay within 50,000 word daily limit comfortably
    const articlesToProcess = articles.slice(0, 15);

    for (const article of articlesToProcess) {
        try {
            const prompt = `Rewrite the following news items into professional, engaging, and unique intelligence reports for a premium news portal. 
    For each item, provide:
    1. A catchy title.
    2. A 2-sentence professional summary (snippet).
    3. The category (World, Business, Tech, Science, Health, Sports, Entertainment, Politics, US, or UK).
    4. A 'Marketing Kit' consisting of:
       - A viral Twitter/X hook.
       - A professional LinkedIn summary.
       - A short Instagram/TikTok caption.
    Format the output as a JSON array of objects with keys: title, snippet, category, imageUrl, twitter, linkedin, instagram.
    
    Items to process:
    ${JSON.stringify([article])}`;

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
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
                rewrittenArticles.push({
                    ...article,
                    title: aiData.title || article.title,
                    snippet: aiData.snippet || article.snippet,
                    source: 'Global Pulse AI Intelligence',
                    aiGenerated: true
                });
            } else {
                rewrittenArticles.push(article);
            }
        } catch (error) {
            console.error(`Error rewriting article "${article.title}":`, error);
            rewrittenArticles.push(article); // Fallback to original
        }
    }
    return rewrittenArticles;
}

async function fetchFeeds() {
    console.log('Starting automated news fetch...');
    let allArticles = [];

    for (const feed of FEEDS) {
        let retries = 3;
        while (retries > 0) {
            try {
                console.log(`Fetching ${feed.category} news... (Retries left: ${retries-1})`);
                const response = await fetch(`${RSS2JSON_API}${encodeURIComponent(feed.url)}`, {
                    headers: { 'User-Agent': 'GlobalPulse-Fetcher/1.0' }
                });
                const data = await response.json();

                if (data.status === 'ok') {
                    const articles = data.items.slice(0, 25).map(item => {
                        return {
                            title: item.title,
                            snippet: item.description.replace(/<[^>]*>?/gm, '').substring(0, 250),
                            category: feed.category,
                            source: 'Global Pulse Intelligence',
                            time: new Date(item.pubDate).toLocaleString(),
                            imageUrl: item.thumbnail || "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600&q=80",
                            link: item.link
                        };
                    });
                    
                    allArticles = allArticles.concat(articles);
                    break; // Success, exit retry loop
                } else {
                    throw new Error(`API Status: ${data.status}`);
                }
            } catch (error) {
                console.error(`Error fetching feed ${feed.category}:`, error.message);
                retries--;
                if (retries === 0) console.error(`Max retries reached for ${feed.category}.`);
                await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2s before retry
            }
        }
    }

    // Aggressive Deduplication by Title and Link
    const uniqueMap = new Map();
    allArticles.forEach(a => {
        const titleKey = a.title.toLowerCase().trim().replace(/[^\w\s]/g, '');
        const linkKey = a.link.split('?')[0]; // Strip tracking params

        if (!uniqueMap.has(titleKey) && !uniqueMap.has(linkKey)) {
            uniqueMap.set(titleKey, a);
            uniqueMap.set(linkKey, a);
        } else {
            const existing = uniqueMap.get(titleKey) || uniqueMap.get(linkKey);
            if (existing && !existing.category.toLowerCase().includes(a.category.toLowerCase())) {
                existing.category += `, ${a.category}`;
            }
        }
    });
    // Filter out values to get unique items
    allArticles = Array.from(new Set(uniqueMap.values()));

    // Shuffle articles
    allArticles = allArticles.sort(() => 0.5 - Math.random());

    // AI Rewriting
    if (process.env.GEMINI_API_KEY) {
         allArticles = await rewriteArticlesWithGemini(allArticles);
    }

    // Save to the static data directory
    const outputDir = path.join(process.cwd(), 'data');
    try {
        await fs.mkdir(outputDir, { recursive: true });
    } catch(e) {}
    
    await fs.writeFile(
        path.join(outputDir, 'news.json'),
        JSON.stringify(allArticles, null, 2)
    );

    // Save Marketing Kit
    const marketingKit = allArticles.map(a => ({
        title: a.title,
        twitter: a.twitter,
        linkedin: a.linkedin,
        instagram: a.instagram,
        link: a.link
    }));
    await fs.writeFile(
        path.join(outputDir, 'marketing.json'),
        JSON.stringify(marketingKit, null, 2)
    );

    // --- Master SEO: Generate Sitemap & Google News RSS ---
    await generateSitemap(allArticles);
    await generateRSS(allArticles);

    console.log(`Successfully saved ${allArticles.length} articles to data/news.json`);
}

async function generateRSS(articles) {
    console.log('Generating Google News RSS Feed...');
    const baseUrl = 'https://globalpulsenewsmedia.com';
    let rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>Global Pulse | AI News Intelligence</title>
  <link>${baseUrl}</link>
  <description>24/7 Global Intelligence and Market Analysis</description>
  <language>en-us</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`;

    articles.forEach(article => {
        rss += `
  <item>
    <title>${article.title}</title>
    <link>${article.link}</link>
    <description>${article.snippet}</description>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <guid>${article.link}</guid>
    <category>${article.category}</category>
  </item>`;
    });

    rss += '\n</channel>\n</rss>';
    
    await fs.writeFile(path.join(process.cwd(), 'feed.xml'), rss);
}

async function generateSitemap(articles) {
    console.log('Generating SEO Sitemap...');
    const baseUrl = 'https://globalpulsenewsmedia.com';
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>`;

    articles.forEach(article => {
        sitemap += `
  <url>
    <loc>${article.link}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`;
    });

    sitemap += '\n</urlset>';
    
    await fs.writeFile(path.join(process.cwd(), 'sitemap.xml'), sitemap);
}

fetchFeeds().catch(console.error);
