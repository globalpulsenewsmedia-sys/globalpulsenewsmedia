import time
import subprocess
import sys
import os

INTERVAL_SECONDS = 3600  # 1 hour

# Change directory to the script's directory so paths are resolved correctly
script_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(script_dir)

while True:
    print('Starting news scraper execution (get_live_expanded.py)...', flush=True)
    try:
        # Run python3 get_live_expanded.py
        result = subprocess.run(['python3', 'get_live_expanded.py'], check=True, capture_output=True, text=True)
        print('Live Scraper output:', flush=True)
        print(result.stdout, flush=True)
        
        # Run python3 fetch_news.py
        print('Starting news scraper execution (fetch_news.py)...', flush=True)
        result2 = subprocess.run(['python3', 'scripts/fetch_news.py'], check=True, capture_output=True, text=True)
        print('News Scraper output:', flush=True)
        print(result2.stdout, flush=True)
        
        print('Scraper run completed successfully.', flush=True)
    except subprocess.CalledProcessError as e:
        print(f'Scraper execution failed with exit code {e.returncode}:', file=sys.stderr, flush=True)
        print(e.stderr, file=sys.stderr, flush=True)
    except Exception as e:
        print(f'Failed to start scraper: {e}', file=sys.stderr, flush=True)
    
    print(f'Sleeping for {INTERVAL_SECONDS} seconds...', flush=True)
    time.sleep(INTERVAL_SECONDS)
