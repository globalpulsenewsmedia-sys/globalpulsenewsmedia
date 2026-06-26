import { TwitterApi } from 'twitter-api-v2';
import parser from 'xml2js'; // xml2js can parse the Google News RSS XML

// --- CONFIGURATION & SECRETS ---
const TWITTER_CONFIG = {
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
};

const LINKEDIN_ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN;
const LINKEDIN_PERSON_URN = process.env.LINKEDIN_PERSON_URN; // Format: urn:li:person:XXXXXX

const GOOGLE_NEWS_RSS_URL = 'https://news.google.com/rss/search?q=global+legal+health&hl=en-US&gl=US&ceid=US:en';
const SITE_URL = 'https://globalpulsenewsmedia.com';

// --- MAIN FUNCTION ---
async function runSocialShare() {
    console.log('🚀 Starting Social Media Automated Sharing System...');
    
    try {
        // 1. Fetch Top Trending News from Google News RSS
        const response = await fetch(GOOGLE_NEWS_RSS_URL);
        const xmlData = await response.text();
        
        // Parse XML to JS Object
        const parsed = await new Promise((resolve, reject) => {
            parser.parseString(xmlData, (err, result) => {
                if (err) reject(err);
                else resolve(result);
            });
        });

        const items = parsed.rss.channel[0].item || [];
        if (items.length === 0) {
            console.log('⚠️ No trending stories found.');
            return;
        }

        // Pick top 3 trending stories
        const selectedStories = items.slice(0, 3).map(story => ({
            title: story.title[0],
            link: story.link[0],
            pubDate: story.pubDate[0]
        }));

        console.log(`📰 Selected ${selectedStories.length} stories to process.`);

        for (const story of selectedStories) {
            // Generate clean post content
            const postText = `📰 Headline: ${story.title.substring(0, 160)}\n\nRead full analysis & context on Global Pulse:\n🔗 ${SITE_URL}\n\n#GlobalPulse #LegalIntel #HealthNews #WorldNews`;
            
            console.log(`\n📝 Prepared Post:\n${postText}\n`);

            // 2. Publish to Twitter (X)
            if (TWITTER_CONFIG.appKey && TWITTER_CONFIG.accessToken) {
                try {
                    const client = new TwitterApi(TWITTER_CONFIG);
                    const twitterClient = client.readWrite;
                    const tweetResponse = await twitterClient.v2.tweet(postText);
                    console.log(`✅ Posted to X (Twitter). Tweet ID: ${tweetResponse.data.id}`);
                } catch (txErr) {
                    console.error('❌ Failed posting to Twitter (X):', txErr.message);
                }
            } else {
                console.log('⚠️ Twitter credentials missing in environment.');
            }

            // 3. Publish to LinkedIn
            if (LINKEDIN_ACCESS_TOKEN && LINKEDIN_PERSON_URN) {
                try {
                    const liResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
                        method: 'POST',
                        headers: {
                            'Authorization': `Bearer ${LINKEDIN_ACCESS_TOKEN}`,
                            'Content-Type': 'application/json',
                            'X-Restli-Protocol-Version': '2.0.0'
                        },
                        body: JSON.stringify({
                            author: LINKEDIN_PERSON_URN,
                            lifecycleState: 'PUBLISHED',
                            specificContent: {
                                'com.linkedin.ugc.ShareContent': {
                                    shareCommentary: {
                                        text: postText
                                    },
                                    shareMediaCategory: 'ARTICLE',
                                    media: [
                                        {
                                            status: 'READY',
                                            description: {
                                                text: '24/7 Global, Legal, and Health Analysis'
                                            },
                                            originalUrl: SITE_URL,
                                            title: {
                                                text: story.title
                                            }
                                        }
                                    ]
                                }
                            },
                            visibility: {
                                'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
                            }
                        })
                    });

                    if (liResponse.ok) {
                        const liData = await liResponse.json();
                        console.log(`✅ Posted to LinkedIn. Share ID: ${liData.id}`);
                    } else {
                        const errorText = await liResponse.text();
                        console.error('❌ Failed posting to LinkedIn:', errorText);
                    }
                } catch (liErr) {
                    console.error('❌ Failed posting to LinkedIn API:', liErr.message);
                }
            } else {
                console.log('⚠️ LinkedIn credentials missing in environment.');
            }
        }

    } catch (err) {
        console.error('❌ Critical system failure in social-share engine:', err);
    }
}

runSocialShare();
