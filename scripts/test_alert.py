import sys
import os

script_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(script_dir)

import alerts_automation

print("[Test] Dispatching test arbitrage alert...")
alerts_automation.dispatch_alerts(
    pair="BTC/USDT",
    spread=0.45,
    buy_exch="Binance",
    sell_exch="Bybit",
    buy_price=67800.0,
    sell_price=68100.0
)
print("[Test] Alert dispatch complete.")
