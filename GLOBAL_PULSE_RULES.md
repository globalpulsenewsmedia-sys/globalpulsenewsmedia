# Global Pulse News Media: News Automation Rules & Guidelines

This document defines the architecture, directory structure, coding standards, and deployment pipelines for the **Global Pulse News Media** news automation and automated outreach engine. Adhere to these guidelines to ensure reliability, security, and segregation from the python trading/arbitrage backend.

---

## 📂 Core Directory & File Map

News automation files and workflows must be strictly contained within these locations. Do not mix them with Python trading systems.

### GitHub Workflows
- [update-news.yml](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/.github/workflows/update-news.yml) — Runs every 3 hours; fetches global news trends via Gemini AI.
- [global-b2b.yml](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/.github/workflows/global-b2b.yml) — Runs daily; discovers leads and triggers outreach campaigns.
- [b2b-outreach.yml](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/.github/workflows/b2b-outreach.yml) — Runs daily; triggers automatic email follow-ups.
- [self-healing.yml](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/.github/workflows/self-healing.yml) — Hourly system health check watchdog & social media marketing automation.

### Automation Scripts (Node.js / ES Modules)
- `scripts/fetch-news.mjs` — News fetcher engine utilizing Google Gemini API.
- `scripts/lead-generator.mjs` — B2B lead discovery and filtration engine.
- `scripts/b2b-outreach.mjs` — Mailer engine using Zoho SMTP and templates.
- `scripts/watchdog.mjs` — System status watchdog and DevOps alerts handler.
- `scripts/marketing-agent.mjs` — Automated content poster for social media channels.

### Data Storage & Logs
- `data/news.json` — Aggregated news metadata and AI summaries.
- `data/outreach-history.json` — Log logs for B2B email tracking.
- `data/leads.json` — Discovered leads repository.

---

## 🛠️ Technology Stack & Execution

- **Runtime**: Node.js (v18.x or v20.x).
- **Module System**: ES Modules (`.mjs` extension or `"type": "module"` in `package.json`).
- **Dependencies**: Keep dependencies lightweight. Standard packages include `node-fetch`, `nodemailer`, and `twitter-api-v2`.

---

## ⚙️ Secrets & Credentials Management

All credentials must be loaded via `process.env`. **Never hardcode secrets** in the scripts. Ensure the following variables are configured in the GitHub repository secrets and your local `.env`/`.env.local` files:

| Secret Name | Purpose | Example |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Authenticates with Google Gemini API for news summarization & discovery | `AIzaSy...` |
| `SMTP_HOST` | Outbound mail server for outreach campaigns | `smtp.zoho.com` |
| `SMTP_PORT` | Outbound mail server TLS port | `587` |
| `SMTP_USER` | Email sender address | `outreach@globalpulsenewsmedia.com` |
| `SMTP_PASS` | Zoho SMTP account password | `********` |
| `TWITTER_API_KEY` / `TWITTER_ACCESS_TOKEN` | Twitter V2 API credentials for marketing automation | `Consumer/Access Keys` |
| `VERCEL_DEPLOY_HOOK` | Webhook to trigger Vercel rebuilds upon news updates | `https://api.vercel.com/v1/integrations/...` |

---

## 🛡️ Coding Standards & Guardrails

1. **Separation of Concerns**: News and lead generation scripts must **never** call or import Python files, nor read database schemas of TimescaleDB.
2. **Strict English-Only Generation & USA Targeting**:
   - Content generation must target the USA audience.
   - Do **NOT** translate or output content in any language other than English (the Marathi translation module is completely disabled and prohibited).
   - Ensure all output strings, titles, summaries, and generated properties are strictly English.
3. **Idempotence & State Preservation**:
   - Workflows run in ephemeral GitHub runners. Always commit outputs back to the branch (e.g., `git add data/news.json && git push`) only if changes exist.
   - Use `git diff --quiet` check before attempting git commits to prevent workflow failures.
4. **Robust API Calls**:
   - Wrap Gemini API calls and network requests in exponential backoff retry blocks (minimum 3 attempts).
   - Gracefully catch errors so that a failure to fetch one source does not crash the entire cron job.
5. **Rate Limit Awareness**:
   - Rate limit Zoho SMTP calls by introducing a delay (e.g., 2-5 seconds) between sending consecutive emails.
   - Batch lead generation queries to stay within Gemini API quota restrictions.
