// Autonomous Marketing & SEO Agent
// This script runs automatically via GitHub Actions after news updates.
// It shares the top news to social media platforms and pings search engines.

import fs from 'fs';
import path from 'path';
import { TwitterApi } from 'twitter-api-v2';

// --- CONFIGURATION ---
// These keys must be stored in your GitHub Secrets
const TWITTER_API_KEY = process.env.TWITTER_API_KEY;
const TWITTER_API_SECRET = process.env.TWITTER_API_SECRET;
const TWITTER_ACCESS_TOKEN = process.env.TWITTER_ACCESS_TOKEN;
const TWITTER_ACCESS_SECRET = process.env.TWITTER_ACCESS_SECRET;

const VERCEL_URL = 'https://globalpulsenewsmedia.com';

async function runMarketingAgent() {
    console.log('🚀 [MARKETING AGENT] Initializing Autonomous Growth Protocols...');

    try {
        // 1. Read latest news
        const dataPath = path.join(process.cwd(), 'data', 'news.json');
        if (!fs.existsSync(dataPath)) {
            console.log('⚠️ [MARKETING AGENT] No news data found. Aborting.');
            return;
        }

        const newsData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        if (!newsData || newsData.length === 0) return;

        const topStory = newsData[0]; // The breaking news
        console.log(`📣 [MARKETING AGENT] Selected Top Story: ${topStory.title}`);

        // 2. Post to Twitter/X
        await postToTwitter(topStory);

        // 3. Ping Google for SEO Indexing
        await pingGoogleSEO();

    } catch (error) {
        console.error('❌ [MARKETING AGENT] Critical Error:', error.message);
    }
}

async function postToTwitter(story) {
    if (!TWITTER_API_KEY || !TWITTER_ACCESS_TOKEN) {
        console.log('⚠️ [MARKETING AGENT] Twitter API keys missing. Skipping X/Twitter broadcast.');
        return;
    }

    const tweetText = `🚨 BREAKING: ${story.title}\n\nRead the full intelligence report here: ${story.link}\n\n#GlobalPulse #BreakingNews #Live`;
    
    console.log(`🐦 [MARKETING AGENT] Attempting Twitter Broadcast...`);
    
    try {
        const twitterClient = new TwitterApi({
            appKey: TWITTER_API_KEY,
            appSecret: TWITTER_API_SECRET,
            accessToken: TWITTER_ACCESS_TOKEN,
            accessSecret: TWITTER_ACCESS_SECRET,
        });

        const rwClient = twitterClient.readWrite;
        await rwClient.v2.tweet(tweetText);
        console.log(`✅ [MARKETING AGENT] Successfully broadcasted to X network.`);
    } catch (err) {
        console.error(`❌ [MARKETING AGENT] Failed to broadcast to X/Twitter:`, err.message);
    }
}

async function pingGoogleSEO() {
    console.log('🔍 [MARKETING AGENT] Pinging Google Search Console to index new content...');
    const sitemapUrl = `${VERCEL_URL}/sitemap.xml`;
    const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`;
    
    try {
        const res = await fetch(pingUrl);
        if (res.ok) {
            console.log('✅ [MARKETING AGENT] Google successfully notified of new sitemap updates.');
        } else {
            console.log(`⚠️ [MARKETING AGENT] Google ping returned status: ${res.status}`);
        }
    } catch (err) {
        console.error('❌ [MARKETING AGENT] Failed to ping Google:', err.message);
    }
}

runMarketingAgent();
