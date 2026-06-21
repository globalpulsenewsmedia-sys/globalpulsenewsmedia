// Autonomous SEO & Indexing Agent
// This script pings major search engines to index arbitragesmartai.com immediately.

import fetch from 'node-fetch';

const SITE_URL = 'https://arbitragesmartai.com';
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`;
const INDEXNOW_KEY = '8f7eeef1de9e423a5ef122f3698f990a';

async function triggerIndexing() {
    console.log('🚀 [SEO AGENT] Triggering Instant Search Engine Indexing...');

    // List of URLs to index
    const urlsList = [
        SITE_URL,
        `${SITE_URL}/agent-command`,
        `${SITE_URL}/security`,
        `${SITE_URL}/disclosures`,
        `${SITE_URL}/privacy`,
        `${SITE_URL}/terms`
    ];

    // 1. Ping IndexNow Endpoint (Bing, Yandex, Seznam, etc.)
    await pingIndexNow(urlsList);

    // 2. Ping Google Sitemap Endpoint (Backwards compatibility)
    await pingGoogleSitemap();
}

async function pingIndexNow(urls) {
    console.log('🔍 [SEO AGENT] Submitting URLs via IndexNow Protocol...');
    const indexNowEndpoint = 'https://api.indexnow.org/indexnow';

    const payload = {
        host: 'arbitragesmartai.com',
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: urls
    };

    try {
        const response = await fetch(indexNowEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(payload)
        });

        if (response.status === 200) {
            console.log('✅ [SEO AGENT] IndexNow submission successful. Bing/Yandex notified.');
        } else {
            console.log(`⚠️ [SEO AGENT] IndexNow returned warning status: ${response.status}`);
        }
    } catch (err) {
        console.error('❌ [SEO AGENT] Failed to submit to IndexNow:', err.message);
    }
}

async function pingGoogleSitemap() {
    console.log('🔍 [SEO AGENT] Notifying Google of sitemap updates...');
    const googlePingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`;

    try {
        const response = await fetch(googlePingUrl);
        if (response.ok) {
            console.log('✅ [SEO AGENT] Google sitemap notification submitted.');
        } else {
            console.log(`⚠️ [SEO AGENT] Google ping returned code: ${response.status}`);
        }
    } catch (err) {
        console.error('❌ [SEO AGENT] Failed to ping Google sitemap:', err.message);
    }
}

triggerIndexing();
