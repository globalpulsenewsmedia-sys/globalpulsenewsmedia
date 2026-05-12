import urllib.request
import re
import json

channels = {
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
    'Live Storm Chasers': 'https://www.youtube.com/@LiveStormChasers/live',
    'Bloomberg': 'https://www.youtube.com/@BloombergTelevision/live',
    'Reuters': 'https://www.youtube.com/@Reuters/live',
    'Fox News': 'https://www.youtube.com/@FoxNews/live',
    'Lofi Girl': 'https://www.youtube.com/@LofiGirl/live'
}

live_data = []

for name, url in channels.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        match = re.search(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        if match:
            vid = match.group(1)
            print(f'{name}: {vid}')
            live_data.append({"name": name, "id": vid, "url": f"https://www.youtube.com/embed/{vid}?autoplay=0&mute=1"})
        else:
            print(f'{name}: No video ID found')
    except Exception as e:
        print(f'{name}: Error {e}')

with open('live_channels.json', 'w') as f:
    json.dump(live_data, f, indent=4)
