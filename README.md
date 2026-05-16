# Global Pulse News Media

Global Pulse is a 24/7 fully autonomous, high-traffic international news portal and market intelligence synthesiser modeled after CNN.

## 🚀 Live Vercel Deployment Instructions

Since the Arbitrage Smart AI code and domains have been decoupled:

1. Log in to your **Vercel Dashboard**.
2. Click on the **Global Pulse News Media** project.
3. Go to **Settings** → **Domains**.
4. If `arbitragesmartai.com` or `www.arbitragesmartai.com` is listed here, **delete / remove** them immediately.
5. Ensure only your news domains (e.g. `globalpulsenewsmedia.com` and `www.globalpulsenewsmedia.com`) are configured here.
6. Trigger a redeployment if needed (it will automatically rebuild when you push changes to your Git repository).

---

## 💻 Running & Testing Locally

To run this website locally:

1. Open your terminal in this directory (`globalpulsenewsmedia`).
2. Start the local server:
   ```bash
   npm start
   ```
3. Open your browser and navigate to: **[http://localhost:3000](http://localhost:3000)**

---

## 🤖 AI Automation & B2B Outreach Scripts

This project includes active Node.js services for news retrieval and outreach marketing:

*   **B2B Outreach Marketing (`scripts/b2b-outreach.mjs`):** Runs the automated email campaigns via Zoho SMTP.
*   **Watchdog Health monitor (`scripts/watchdog.mjs`):** Monitors the portal, news file validity, and handles Vercel redeployment sequences.
