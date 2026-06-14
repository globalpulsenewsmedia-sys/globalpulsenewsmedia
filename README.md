# ArbitrageSmartAI

ArbitrageSmartAI is a high-fidelity, autonomous cryptocurrency arbitrage orchestration terminal and financial market intelligence ecosystem. It integrates real-time CEX order-book scans, cross-chain DEX liquidity pool discrepancy checks, and multi-agent simulation feeds.

## 🚀 Key Features
- **Autonomous Multi-Agent Logs**: Active simulated websocket streams (`AGENT_CRYPTO_INTEL` and `AGENT_MARKET_MASTER`) showcasing real-time intelligence gathering, sentiment analysis, and transaction verification.
- **CEX & DEX Scanner Engines**: High-speed, CPU-quota hardened background services to query order book depths and decentralized pool pricing.
- **Telemetry WebSocket Gateway**: Node.js WebSocket responder broadcasting updates with sub-100ms latency.
- **Time-Series Persistence**: Integrated schema for TimescaleDB to persist spread histories, whale ledger swaps, and AI confidence telemetry.
- **High-Fidelity Dashboard UI**: Fully responsive black-theme trading terminal with built-in calculators, live TradingView charts, and interactive compliance modals.

---

## 💻 Running & Testing Locally

To start the static terminal dashboard locally:

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Local Web Server**:
   ```bash
   npm start
   ```

3. **Open Terminal UI**:
   Navigate to **[http://localhost:3000](http://localhost:3000)** in your browser.

4. **Verify Backend Syntax & Cache Structure**:
   ```bash
   py scripts/verify_production.py
   ```

---

## ☁️ Production Vercel Deployment

This standalone repository is linked to Vercel for automatic continuous deployments:

1. Push your commits to the main branch on GitHub.
2. Vercel will build and deploy the production static assets.
3. Configure the custom domains **`arbitragesmartai.com`** and **`www.arbitragesmartai.com`** directly in the Vercel Project Settings.

---

## 🛡️ VM Production Deployment

For deploying the high-frequency scanning engines and WebSocket gateways on a Linux VM:
Refer to the step-by-step instructions in the [GCP Production Deployment Guide](deploy_guide.md).
