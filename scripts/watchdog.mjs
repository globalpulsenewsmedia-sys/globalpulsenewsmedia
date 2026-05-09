// DevOps Watchdog: Self-Healing Logic for Global Pulse
// This script pings the production URL and triggers a redeploy via hook if it's down.

const VERCEL_URL = 'https://globalpulsenewsmedia.com';
const REDEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

async function checkSystemHealth() {
    console.log('--- DEVOPS WATCHDOG: STARTING GLOBAL HEALTH CHECK ---');
    console.log(`Target URL: ${VERCEL_URL}`);

    try {
        const response = await fetch(VERCEL_URL, {
            headers: { 'User-Agent': 'GlobalPulse-Watchdog/1.0' },
            timeout: 10000
        });

        if (response.status === 200) {
            console.log('✅ SYSTEM STATUS: OPTIMAL (200 OK)');
            // Check if content is actually there (not just a Vercel error page that returns 200)
            const text = await response.text();
            if (text.includes('GLOBALPULSE')) {
                console.log('✅ CONTENT VERIFIED: Portal frame is operational.');

                // CRITICAL: Check the intelligence link (data/news.json)
                console.log('🔍 Checking Intelligence Link (data/news.json)...');
                const dataResponse = await fetch(`${VERCEL_URL}/data/news.json?t=${Date.now()}`);
                if (dataResponse.ok) {
                    const newsData = await dataResponse.json();
                    if (Array.isArray(newsData) && newsData.length > 0) {
                        console.log(`✅ DATA VERIFIED: ${newsData.length} articles live.`);
                    } else {
                        console.warn('⚠️ DATA WARNING: news.json is empty or invalid.');
                        await triggerRedeploy('Empty news data');
                    }
                } else {
                    console.error(`🚨 DATA FAILURE: news.json returned status ${dataResponse.status}`);
                    await triggerRedeploy('Intelligence Link (news.json) Offline');
                }
            } else {
            } else {
                console.warn(`⚠️ SYSTEM ALERT: STATUS ${response.status} DETECTED.`);
                await triggerRedeploy(`HTTP Status ${response.status}`);
            }
        } catch (error) {
            console.error('🚨 CRITICAL FAILURE: SITE OFFLINE or UNREACHABLE.');
            console.error(`Error: ${error.message}`);
            await triggerRedeploy('Connection failed/Timeout');
        }
    }

async function triggerRedeploy(reason) {
        if (!REDEPLOY_HOOK) {
            console.error('❌ FAILED: VERCEL_DEPLOY_HOOK NOT CONFIGURED in GitHub Secrets.');
            console.log('Action Required: Please add VERCEL_DEPLOY_HOOK to your repository secrets.');
            return;
        }

        console.log(`Initiating Auto-Heal Deployment... Reason: ${reason}`);
        try {
            const response = await fetch(REDEPLOY_HOOK, { method: 'POST' });
            if (response.ok) {
                console.log('🚀 SUCCESS: REDEPLOY SIGNAL SENT TO VERCEL. SYSTEM RESTORING...');
            } else {
                console.error(`❌ FAILED: Vercel API returned ${response.status}`);
            }
        } catch (err) {
            console.error('❌ FAILED: Could not connect to Vercel Deploy Hook.');
        }
    }

    checkSystemHealth();
