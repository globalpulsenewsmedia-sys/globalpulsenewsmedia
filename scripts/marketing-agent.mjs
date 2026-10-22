/**
 * marketing-agent.mjs - Automated social media marketing for GlobalPulseNewsMedia
 * Posts top news headlines to Twitter/X
 */
import { TwitterApi } from 'twitter-api-v2';
import fs from 'fs/promises';
import path from 'path';

const {
    TWITTER_API_KEY,
    TWITTER_API_SECRET,
    TWITTER_ACCESS_TOKEN,
    TWITTER_ACCESS_SECRET
} = process.env;

async function loadLatestNews() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'news.json');
        const raw = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        console.log('⚠️ Could not load news.json. Skipping marketing.');
        return [];
    }
}

async function main() {
    console.log('📢 Marketing Agent: Starting social media automation...');

    if (!TWITTER_API_KEY || TWITTER_API_KEY === 'your_twitter_api_key_here') {
        console.log('⚠️ Twitter credentials not configured. Skipping Twitter post.');
        return;
    }

    const articles = await loadLatestNews();
    if (!articles.length) {
        console.log('⚠️ No articles found. Skipping.');
        return;
    }

    // Pick the top article
    const top = articles[0];
    const tweet = `📰 ${top.title}\n\n${top.snippet?.substring(0, 150) || ''}\n\n🔗 Read more: https://globalpulsenewsmedia.com #GlobalPulse #News`;

    try {
        const client = new TwitterApi({
            appKey: TWITTER_API_KEY,
            appSecret: TWITTER_API_SECRET,
            accessToken: TWITTER_ACCESS_TOKEN,
            accessSecret: TWITTER_ACCESS_SECRET,
        });
        await client.v2.tweet(tweet.substring(0, 280));
        console.log('✅ Tweet posted successfully!');
    } catch (err) {
        console.error('❌ Twitter post failed:', err.message);
    }
}

main().catch(console.error);
