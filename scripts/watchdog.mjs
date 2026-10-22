/**
 * watchdog.mjs - Self-healing watchdog for GlobalPulseNewsMedia
 * Checks site health and triggers Vercel redeploy if down
 */
import https from 'https';

const SITE_URL = 'https://globalpulsenewsmedia.com';
const VERCEL_DEPLOY_HOOK = process.env.VERCEL_DEPLOY_HOOK;

function checkSite(url) {
    return new Promise((resolve) => {
        const req = https.get(url, (res) => {
            resolve({ status: res.statusCode, ok: res.statusCode >= 200 && res.statusCode < 400 });
        });
        req.on('error', () => resolve({ status: 0, ok: false }));
        req.setTimeout(10000, () => { req.destroy(); resolve({ status: 0, ok: false }); });
    });
}

function triggerDeploy(hookUrl) {
    return new Promise((resolve, reject) => {
        const url = new URL(hookUrl);
        const req = https.request({ hostname: url.hostname, path: url.pathname + url.search, method: 'POST' }, (res) => {
            resolve(res.statusCode);
        });
        req.on('error', reject);
        req.end();
    });
}

async function main() {
    console.log(`🔍 Watchdog: Checking ${SITE_URL}...`);
    const result = await checkSite(SITE_URL);
    
    if (result.ok) {
        console.log(`✅ Site is healthy (HTTP ${result.status})`);
    } else {
        console.log(`⚠️ Site is DOWN (HTTP ${result.status}). Triggering redeploy...`);
        if (VERCEL_DEPLOY_HOOK) {
            try {
                const code = await triggerDeploy(VERCEL_DEPLOY_HOOK);
                console.log(`🚀 Redeploy triggered (HTTP ${code})`);
            } catch (err) {
                console.error('❌ Failed to trigger deploy hook:', err.message);
            }
        } else {
            console.log('⚠️ VERCEL_DEPLOY_HOOK not set. Skipping redeploy.');
        }
    }
}

main().catch(console.error);
