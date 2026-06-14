#!/bin/bash
# ArbitrageSmartAI Database Backup Script
# Retention policy: 7 days

BACKUP_DIR="/home/HP/arbitrage-smart-ai/backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/arbitrage_db_backup_$TIMESTAMP.sql"

mkdir -p "$BACKUP_DIR"

echo "[Backup] Starting TimescaleDB backup..."
# Execute pg_dump inside container using sudo
sudo docker exec -i arbitrage_timescaledb pg_dump -U postgres -d arbitrage_db > "$BACKUP_FILE"

if [ $? -eq 0 ]; then
    echo "[Backup] Success: Backup saved to $BACKUP_FILE"
    # Compression
    gzip "$BACKUP_FILE"
else
    echo "[Backup] Error: Backup failed!"
    exit 1
fi

# Retention policy: Delete files older than 7 days
echo "[Backup] Running retention cleanup (files > 7 days)..."
find "$BACKUP_DIR" -type f -name "arbitrage_db_backup_*.sql.gz" -mtime +7 -delete
echo "[Backup] Cleanup complete."
