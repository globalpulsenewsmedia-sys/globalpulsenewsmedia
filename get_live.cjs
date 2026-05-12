const https = require('https');

const channels = {
    'Al Jazeera': 'https://www.youtube.com/@aljazeeraenglish/live',
    'ABC News': 'https://www.youtube.com/@ABCNews/live',
    'Sky News': 'https://www.youtube.com/@SkyNews/live'
};

for (const [name, url] of Object.entries(channels)) {
    https.get(url, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
            const redirectUrl = res.headers.location;
            if (redirectUrl) {
                const match = redirectUrl.match(/watch\?v=([a-zA-Z0-9_-]{11})/);
                if (match) {
                    console.log(`${name}: ${match[1]}`);
                } else {
                    console.log(`${name}: Redirected to ${redirectUrl}`);
                }
            }
        } else {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
                if (match) {
                    console.log(`${name}: ${match[1]}`);
                } else {
                    console.log(`${name}: No video ID found`);
                }
            });
        }
    }).on('error', (e) => {
        console.error(`${name}: Error ${e.message}`);
    });
}
