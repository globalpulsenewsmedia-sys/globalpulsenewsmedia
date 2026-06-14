import os
import json
import time
import random
from datetime import datetime

script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
NARRATIVE_FILE = os.path.join(project_dir, 'data', 'narrative_data.json')

# Sectors mock definitions
SECTORS = [
    {"name": "Artificial Intelligence Tokens", "base_gain": 5.4, "base_fill": 85, "color": "var(--accent)"},
    {"name": "Solana DeFi Ecosystem", "base_gain": 3.8, "base_fill": 70, "color": "var(--accent-blue)"},
    {"name": "RWA Institutional Wrappers", "base_gain": 1.2, "base_fill": 50, "color": "var(--text-secondary)"},
    {"name": "Ethereum Layer-2 Scaling", "base_gain": -0.8, "base_fill": 30, "color": "var(--accent-red)"}
]

def main():
    print("⚡ Starting ArbitrageSmartAI Narrative Trend Engine...")
    os.makedirs(os.path.dirname(NARRATIVE_FILE), exist_ok=True)
    
    while True:
        try:
            # Apply slight fluctuations to gains and fill percentages to simulate real-time narrations shifts
            updated_sectors = []
            for s in SECTORS:
                gain_change = (random.random() - 0.45) * 0.5 # bias slightly positive
                new_gain = s["base_gain"] + gain_change
                
                fill_change = random.randint(-3, 3)
                new_fill = max(10, min(100, s["base_fill"] + fill_change))
                
                updated_sectors.append({
                    "name": s["name"],
                    "gain": f"{'+' if new_gain >= 0 else ''}{new_gain:.2f}%",
                    "fill": new_fill,
                    "color": s["color"]
                })
                
            snapshot = {
                "timestamp": datetime.utcnow().strftime('%Y-%m-%dT%H:%M:%SZ'),
                "sectors": updated_sectors,
                "summary": "AI sectors and utility primitives showing steady volume inflows led by Solana utility assets. Stablecoin bridge flows suggest accumulation is peaking on Ethereum Layer-2 solutions."
            }
            
            with open(NARRATIVE_FILE, 'w') as f:
                json.dump(snapshot, f, indent=4)
                
            time.sleep(5)
            
        except KeyboardInterrupt:
            break
        except Exception as e:
            print(f"🚨 Narrative Engine error: {e}")
            time.sleep(5)

if __name__ == "__main__":
    main()
