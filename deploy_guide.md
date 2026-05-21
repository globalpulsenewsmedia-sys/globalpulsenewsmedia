# GCP Deployment Guide: Global Pulse Bulk Travel & News Automation

This guide explains how to deploy and continuously run the new Python native news extraction and bulk travel generation scripts on your Google Cloud Platform (GCP) Mumbai instance.

## 1. Connect to your GCP Instance

1. Open the Google Cloud Console.
2. Navigate to **Compute Engine > VM instances**.
3. Locate your Mumbai instance (e.g., `global-pulse-server-mumbai`).
4. Click the **SSH** button to open a terminal directly in your browser, or use your local terminal if you have `gcloud` CLI configured:
   ```bash
   gcloud compute ssh --zone "asia-south1-a" "global-pulse-server-mumbai"
   ```

## 2. Navigate to the Project Directory

Assuming your project is cloned to `/home/user/globalpulsenewsmedia`:
```bash
cd /home/user/globalpulsenewsmedia
```
*(Adjust the path if your repository is located elsewhere).*

## 3. Ensure Environment Variables are Set

Verify that your `.env.local` file is present and contains the Gemini API key:
```bash
cat .env.local
```
It should contain:
```
GEMINI_API_KEY="your_actual_gemini_api_key_here"
```
If it's missing or incorrect, edit it:
```bash
nano .env.local
```

## 4. Install Dependencies

The new Python scripts utilize built-in libraries (`os`, `json`, `time`, `urllib`, `xml`, `re`), but you will need `python-dotenv` to load the `.env.local` file.

```bash
pip3 install python-dotenv
```

## 5. Running the Scripts

### The News Scraper (Continuous)

We have already modified the `run_scraper_loop.py` script. This script acts as an infinite loop, running both the live youtube stream scraper and our new AI News Rewriter (`fetch_news.py`) every hour.

The system service `news-scraper.service` is already configured to run this loop. You just need to restart the service to pick up the new changes:

```bash
sudo systemctl restart news-scraper.service
```

To check the logs and ensure it is running without errors:
```bash
sudo journalctl -u news-scraper.service -f
```

### The Bulk Travel Generator (Manual or Cron)

The `scripts/travel_bulk_generator.py` script is designed to generate up to 10,000 evergreen articles. It takes time and consumes Gemini API quota, so you generally want to run it either manually in batches or via a daily cron job.

**To run it manually:**
```bash
python3 scripts/travel_bulk_generator.py
```
You will see output indicating which topics are being generated and saved as static HTML files in the `travel/` directory.

**To run it automatically via Cron (e.g., every day at midnight):**

1. Open the crontab editor:
   ```bash
   crontab -e
   ```
2. Add the following line at the bottom (replace `/home/user/...` with your actual absolute path):
   ```
   0 0 * * * cd /home/user/globalpulsenewsmedia && /usr/bin/python3 scripts/travel_bulk_generator.py >> /var/log/travel_generator.log 2>&1
   ```
3. Save and exit.

## 6. Verifying the Deployment

Once the scripts run:
1. Check the `articles/` directory and `travel/` directory on your server. You should see new `.html` files appearing.
2. Check `data/news.json` and `data/travel.json`. They should contain the metadata and paths for the new articles.
3. Since this is a Vercel-hosted frontend, you need to ensure the updated `data/` and HTML files are pushed to the main git branch so Vercel can rebuild and serve them globally.
   - You can automate this by adding a small git commit and push command at the end of your python scripts or cron jobs, OR 
   - Ensure the server acts as the primary web host pointing directly to these generated directories (if you are moving away from Vercel to GCP completely).
