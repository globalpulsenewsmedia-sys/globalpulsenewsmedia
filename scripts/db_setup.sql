-- Connect to target database
\c arbitrage_db;

-- Enable TimescaleDB extension
CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;

-- 1. Spread History Table
CREATE TABLE IF NOT EXISTS spread_history (
    time TIMESTAMPTZ NOT NULL,
    pair VARCHAR(15) NOT NULL,
    buy_market VARCHAR(30) NOT NULL,
    buy_price DOUBLE PRECISION NOT NULL,
    sell_market VARCHAR(30) NOT NULL,
    sell_price DOUBLE PRECISION NOT NULL,
    spread_pct DOUBLE PRECISION NOT NULL,
    gas_est DOUBLE PRECISION NOT NULL,
    opportunity_type VARCHAR(15) NOT NULL -- CEX-to-CEX, CEX-to-DEX, Cross-DEX
);

-- Convert to Hypertable for optimized time-series indices
SELECT create_hypertable('spread_history', 'time', if_not_exists => TRUE);

-- Create compound index for fast telemetry queries
CREATE INDEX IF NOT EXISTS idx_spread_history_pair_time ON spread_history (pair, time DESC);

-- 2. Whale Swaps Ledger Table
CREATE TABLE IF NOT EXISTS whale_swaps (
    time TIMESTAMPTZ NOT NULL,
    wallet VARCHAR(66) NOT NULL,
    pair VARCHAR(15) NOT NULL,
    dex_protocol VARCHAR(30) NOT NULL,
    chain VARCHAR(20) NOT NULL,
    msg TEXT NOT NULL,
    value_usd DOUBLE PRECISION NOT NULL
);

SELECT create_hypertable('whale_swaps', 'time', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS idx_whale_swaps_time ON whale_swaps (time DESC);

-- 3. AI Prediction Confidence Metrics Table
CREATE TABLE IF NOT EXISTS ai_confidence_metrics (
    time TIMESTAMPTZ NOT NULL,
    pair VARCHAR(15) NOT NULL,
    volatility_forecast DOUBLE PRECISION NOT NULL,
    slippage_predicted_pct DOUBLE PRECISION NOT NULL,
    liquidity_confidence_score INT NOT NULL, -- 0 to 100
    risk_level VARCHAR(10) NOT NULL -- LOW, MEDIUM, HIGH
);

SELECT create_hypertable('ai_confidence_metrics', 'time', if_not_exists => TRUE);
CREATE INDEX IF NOT EXISTS idx_ai_metrics_pair_time ON ai_confidence_metrics (pair, time DESC);
