const https = require('https');
const fs = require('fs');

const channels = {
    'Al Jazeera': 'https://www.youtube.com/@aljazeeraenglish/live',
    'ABC News': 'https://www.youtube.com/@ABCNews/live',
    'Sky News': 'https://www.youtube.com/@SkyNews/live',
    'NASA': 'https://www.youtube.com/@NASA/live',
    'WildEarth': 'https://www.youtube.com/@WildEarth/live',
    'Explore.org (Nature)': 'https://www.youtube.com/@ExploreOrg/live',
    'DW News': 'https://www.youtube.com/@dwnews/live',
    'France 24': 'https://www.youtube.com/@France24_en/live',
    'CNA (Asia)': 'https://www.youtube.com/@channelnewsasia/live',
    'NBC News': 'https://www.youtube.com/@NBCNews/live',
    'Reuters': 'https://www.youtube.com/@Reuters/live',
    'Fox News': 'https://www.youtube.com/@FoxNews/live',
    'SpaceX': 'https://www.youtube.com/@SpaceX/live',
    'National Geographic': 'https://www.youtube.com/@NatGeo/live'
};

const live_data = [];
let pending = Object.keys(channels).length;

for (const [name, url] of Object.entries(channels)) {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        let data = '';
        res.on('data', chunk => { data += chunk; });
        res.on('end', () => {
            const match = data.match(/"videoId":"([a-zA-Z0-9_-]{11})"/);
            if (match) {
                console.log(`${name}: ${match[1]}`);
                live_data.push({ name, id: match[1], category: "News & Doc" });
            } else {
                console.log(`${name}: No live video found`);
            }
            pending--;
            if (pending === 0) {
                fs.writeFileSync('live_channels.json', JSON.stringify(live_data, null, 2));
            }
        });
    }).on('error', (err) => {
        console.log(`${name}: Error ${err.message}`);
        pending--;
        if (pending === 0) {
            fs.writeFileSync('live_channels.json', JSON.stringify(live_data, null, 2));
        }
    });
}
