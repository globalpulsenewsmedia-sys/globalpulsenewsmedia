import urllib.request
import re

channels = {
    'Al Jazeera': 'https://www.youtube.com/@aljazeeraenglish/live',
    'ABC News': 'https://www.youtube.com/@ABCNews/live',
    'Sky News': 'https://www.youtube.com/@SkyNews/live'
}

for name, url in channels.items():
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = urllib.request.urlopen(req).read().decode('utf-8')
        # Find videoId
        match = re.search(r'"videoId":"([a-zA-Z0-9_-]{11})"', html)
        if match:
            print(f'{name}: {match.group(1)}')
        else:
            print(f'{name}: No video ID found')
    except Exception as e:
        print(f'{name}: Error {e}')
