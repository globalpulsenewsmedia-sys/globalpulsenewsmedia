import fs from 'fs/promises';
import path from 'path';

// --- CONFIGURATION ---
const YOUTUBE_CHANNELS = [
    { name: 'Netflix', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCWOA1ZGywLbqmigxE4Qlvuw' },
    { name: 'PrimeVideo', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UC9uUv0vX40Uu_h6t_zB9y3Q' },
    { name: 'T-Series', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCq-Fj5jknLsUf-MWSy4_brA' },
    { name: 'Marvel', url: 'https://www.youtube.com/feeds/videos.xml?channel_id=UCvC4D8Kn688S77053c846Yg' }
];

async function generateMovieBlog(trailer) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return null;

    try {
        console.log(`🎬 Generating AI Review for: ${trailer.title}...`);
        const prompt = `Act as a Top Movie Critic. Write a high-traffic blog post for this movie trailer: "${trailer.title}".
        Include:
        1. A viral Title for Google Discover.
        2. A 3-paragraph compelling review (Intelligence Insight).
        3. Release Date & Cast expectations.
        4. SEO Keywords & Meta Tags.
        5. A Marathi version of the summary.
        
        Return ONLY a JSON object: { "title": "", "content": "", "content_mr": "", "keywords": "", "seo_title": "" }`;

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
            return JSON.parse(result.candidates[0].content.parts[0].text);
        }
        return null;
    } catch (e) {
        console.error("AI Error:", e.message);
        return null;
    }
}

async function fetchTrailers() {
    console.log("🍿 Starting Entertainment Intelligence Fetch...");
    let blogPosts = [];

    for (const channel of YOUTUBE_CHANNELS) {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(channel.url)}`);
            const data = await response.json();
            
            if (data.status === 'ok') {
                for (const item of data.items.slice(0, 3)) { // Top 3 per channel
                    const aiBlog = await generateMovieBlog(item);
                    if (aiBlog) {
                        blogPosts.push({
                            ...aiBlog,
                            trailerLink: item.link,
                            thumbnail: item.thumbnail,
                            source: channel.name,
                            date: new Date().toISOString()
                        });
                    }
                }
            }
        } catch (e) { console.error(`Error on ${channel.name}`); }
    }

    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'entertainment.json'), JSON.stringify(blogPosts, null, 2));
    console.log(`✅ Published ${blogPosts.length} Movie Intelligence Posts.`);
}

fetchTrailers().catch(console.error);
