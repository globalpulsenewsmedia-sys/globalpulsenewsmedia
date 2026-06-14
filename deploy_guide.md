# GCP Production Deployment Guide: ArbitrageSmartAI Autonomous Infrastructure

This guide details how to spin up the containerized database/observability layers, harden your systemd service daemons, setup TimeSeries hypertables, and deploy the programmatic SEO generator on your GCP VM.

---

## 1. Deploy the Middleware Stack (Docker Compose)

The database (TimescaleDB), caching (Redis), queue pipelines (Kafka/Zookeeper), Nginx reverse proxy, and observability modules (Prometheus, Grafana) are packaged in a single file.

On your VM, ensure Docker & Docker-Compose are installed, then boot the stack:

```bash
# SSH into VM
gcloud compute ssh --zone "asia-south1-a" "global-pulse-server-mumbai"

# Navigate to repo
cd /home/HP/globalpulsenewsmedia

# Boot database, proxy, & telemetry containers in background
sudo docker-compose up -d
```

---

## 2. Initialize TimescaleDB Hypertables Schema

TimescaleDB needs database schemas built. Execute the initialization SQL script inside the database container:

```bash
# Copy setup script inside container and execute
sudo docker cp scripts/db_setup.sql arbitrage_timescaledb:/tmp/
sudo docker exec -it arbitrage_timescaledb psql -U postgres -d arbitrage_db -f /tmp/db_setup.sql
```

---

## 3. Harden and Enable systemd VM Services

Copy all four hardened systemd files (with sandboxing, auto-restart triggers, and CPU/Memory constraints) to yourVM's services folder, reload the daemon, and start the engines:

```bash
# Copy service configurations
sudo cp /home/HP/globalpulsenewsmedia/cex-scanner.service /etc/systemd/system/
sudo cp /home/HP/globalpulsenewsmedia/dex-scanner.service /etc/systemd/system/
sudo cp /home/HP/globalpulsenewsmedia/seo-engine.service /etc/systemd/system/
sudo cp /home/HP/globalpulsenewsmedia/telemetry.service /etc/systemd/system/

# Reload systemd configuration
sudo systemctl daemon-reload

# Enable services to run automatically on boot
sudo systemctl enable cex-scanner.service
sudo systemctl enable dex-scanner.service
sudo systemctl enable seo-engine.service
sudo systemctl enable telemetry.service

# Start the services
sudo systemctl start cex-scanner.service
sudo systemctl start dex-scanner.service
sudo systemctl start seo-engine.service
sudo systemctl start telemetry.service
```

---

## 4. Verify Daemon Status and Logs

Ensure all services are running and check output diagnostics:

```bash
# Check CEX price scanner logs
sudo journalctl -u cex-scanner.service -f

# Check DEX pool scanner logs
sudo journalctl -u dex-scanner.service -f

# Check Programmatic SEO engine logs
sudo journalctl -u seo-engine.service -f

# Check WebSocket Telemetry logs
sudo journalctl -u telemetry.service -f
```

---

## 5. Verify Telemetry & Observability Targets

- **Prometheus Metrics**: Access `http://your-vm-ip:9090`. Verify under **Status > Targets** that both CEX and DEX targets are online (`UP`).
- **Nginx Reverse Proxy Gateway**: Port `80` reverse-proxies:
  - Standard web requests to your local static files web server (port `8080`).
  - `/ws/` paths to the WebSocket Telemetry server (port `8002`).
- **Frontend Dashboard Connection**: When you open your web URL in the browser, the header badge should display `WS: LIVE` in green, showing exact latency and processed ticker streams dynamically!
