# ArbitrageSmartAI: Python Trading Backend Rules & Guidelines

This document details the standards, infrastructure configurations, database conventions, and code constraints for the **ArbitrageSmartAI** cryptocurrency arbitrage scanning and execution engine. Adhere to these guidelines to ensure high throughput, sub-100ms latency, and absolute segregation from the news/outreach automation stack.

---

## 📂 Core Directory & File Map

Trading engines, configurations, database scripts, and telemetry components reside strictly in these locations:

### Scanning & Simulation Engines (Python / Node.js)
- `scripts/arbitrage_live_engine.py` — High-speed CEX order-book scanner daemon.
- `scripts/dex_live_scanner.py` — Cross-chain DEX liquidity pool scanner.
- `scripts/narrative_trend_engine.py` — Market narrative fluctuation engine.
- `scripts/alerts_automation.py` — Zoho SMTP, Telegram, and Twitter mock alert dispatcher.
- `scripts/telemetry_gateway.js` — High-frequency Node.js WebSocket gateway broadcasting real-time data to dashboard clients.
- `scripts/verify_production.py` — System-wide code integrity, syntax validation, and schema checking script.

### Database & Telemetry Cache
- `scripts/db_setup.sql` — TimescaleDB database schemas for high-velocity metrics.
- `data/arbitrage_data.json` — Order-book spreads cache file.
- `data/dex_arbitrage_data.json` — DEX spread cache file.
- `data/narrative_data.json` — AI narrative sentiment cache file.
- `data/alerts_retry_queue.json` — Resilient offline buffer for failed alerts.
- `logs/alerts.log` — Event and exception logs for system alerts.

### VM Systemd Configurations
- [cex-scanner.service](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/cex-scanner.service) — Scrapes order book depths. CPUQuota=35%, MemoryMax=500M.
- [dex-scanner.service](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/dex-scanner.service) — Queries DEX pricing. CPUQuota=35%, MemoryMax=500M.
- [telemetry.service](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/telemetry.service) — Broadcaster service. CPUQuota=20%, MemoryMax=400M.
- [frontend-server.service](file:///C:/Users/HP/.gemini/antigravity/worktrees/globalpulsenewsmedia/init-clean-show-structure/frontend-server.service) — Static serving web engine.

---

## 🛠️ Infrastructure & Database Layer

- **TimescaleDB**: Time-Series database (PostgreSQL container extension) mapping out three primary hypertables:
  1. `spread_history`: Raw percentage discrepancies and timestamps.
  2. `whale_swaps`: Block-level transaction volumes and smart money movement.
  3. `ai_confidence_metrics`: Deep learning probability estimations.
- **Docker Compose Stack**: Single `docker-compose.yml` deploying TimescaleDB, Redis Cache (for fast websocket caching), Kafka/Zookeeper (for queue pipelines), Prometheus (observability metrics), Grafana (monitoring visualization), and Nginx reverse proxy.
- **Observability Ports**:
  - CEX Exporter: `http://localhost:8000`
  - DEX Exporter: `http://localhost:8001`
  - Nginx Reverse Proxy Gateway: Port `80` (Upstream proxies for `/ws/` paths to WebSocket server).

---

## 🛡️ Coding Standards & System constraints

1. **Syntax Integrity**:
   - Python code must validate with `py_compile` without warnings. Run `python scripts/verify_production.py` to ensure local backend changes are syntax-clean before push.
2. **Performance Constraints**:
   - Limit CPU consumption per scanning engine using Linux systemd CPU quotas.
   - Use non-blocking async loops or tightly bounded `time.sleep()` in scan loops to prevent CPU spiking.
   - Cache results in memory and dump to disk only when state changes or periodically (e.g., every 5 seconds) to minimize disk I/O.
3. **Resilient Alerts & Deduplication**:
   - Avoid duplicate alerts: Deduplicate consecutive alerts for the same trading pair within a 15-minute window (`DEDUP_WINDOW = 900`).
   - Implement local filesystem retry queues (`data/alerts_retry_queue.json`) for failed Telegram or Zoho SMTP payloads with a maximum of 3 retries.
4. **Separation of Concerns**:
   - The Python backend must never depend on or call news-gathering Node scripts.
   - Avoid reading or modifying `data/news.json` or B2B marketing data.
