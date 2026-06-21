import os
import json
import time
import smtplib
from email.mime.text import MIMEText
import urllib.request
import urllib.parse
from datetime import datetime
from dotenv import load_dotenv

script_dir = os.path.dirname(os.path.abspath(__file__))
project_dir = os.path.dirname(script_dir)
load_dotenv(os.path.join(project_dir, '.env.local'))
load_dotenv(os.path.join(project_dir, '.env'))

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHAT_ID = os.environ.get("TELEGRAM_CHAT_ID")
SMTP_PASS = os.environ.get("SMTP_PASS")
SMTP_USER = "manikkatke93@zoho.com" # default Zoho user mapped to workspace credentials

RETRY_QUEUE_FILE = os.path.join(project_dir, 'data', 'alerts_retry_queue.json')
ALERT_LOGS_FILE = os.path.join(project_dir, 'logs', 'alerts.log')
DEDUPLICATION_CACHE = {} # memory cache for deduplication {alert_key: timestamp}
DEDUP_WINDOW = 900 # 15 minutes

os.makedirs(os.path.dirname(RETRY_QUEUE_FILE), exist_ok=True)
os.makedirs(os.path.dirname(ALERT_LOGS_FILE), exist_ok=True)

def log_event(level, msg):
    timestamp = datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')
    try:
        with open(ALERT_LOGS_FILE, 'a') as f:
            f.write(f"[{timestamp}] [{level}] {msg}\n")
    except:
        pass
    print(f"[{level}] {msg}")

def check_deduplication(key):
    now = time.time()
    if key in DEDUPLICATION_CACHE:
        if now - DEDUPLICATION_CACHE[key] < DEDUP_WINDOW:
            return True
    DEDUPLICATION_CACHE[key] = now
    return False

def send_telegram(msg):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        log_event("WARN", "Telegram config missing. Skipping.")
        return False
    encoded_text = urllib.parse.quote(msg)
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage?chat_id={TELEGRAM_CHAT_ID}&text={encoded_text}&parse_mode=Markdown"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=5) as resp:
            res = json.loads(resp.read().decode('utf-8'))
            if res.get("ok"):
                return True
            log_event("ERROR", f"Telegram API failed: {res}")
            return False
    except Exception as e:
        log_event("ERROR", f"Telegram network error: {e}")
        return False

def send_email(subject, body, recipient="manikkatke93@gmail.com"):
    if not SMTP_PASS:
        log_event("WARN", "SMTP password missing. Skipping email.")
        return False
    
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = SMTP_USER
    msg['To'] = recipient

    try:
        # Connect to Zoho SMTP server on port 587
        with smtplib.SMTP("smtp.zoho.com", 587, timeout=5) as server:
            server.starttls()
            server.login(SMTP_USER, SMTP_PASS)
            server.send_message(msg)
            log_event("INFO", f"Alert email sent successfully to {recipient}")
            return True
    except Exception as e:
        log_event("ERROR", f"SMTP Zoho mailer failed: {e}")
        return False

def post_twitter(msg):
    # Mock Twitter v2 posting (since X API requires paid keys and validation)
    # We will log the request and return True as a mock pipeline verification
    log_event("INFO", f"[X/Twitter API Mock] Successfully published Tweet: '{msg[:80]}...'")
    return True

def push_to_retry_queue(channel, payload):
    queue = []
    if os.path.exists(RETRY_QUEUE_FILE):
        try:
            with open(RETRY_QUEUE_FILE, 'r') as f:
                queue = json.load(f)
        except:
            pass
            
    queue.append({
        "channel": channel,
        "payload": payload,
        "timestamp": time.time(),
        "retries": 0
    })
    
    with open(RETRY_QUEUE_FILE, 'w') as f:
        json.dump(queue, f, indent=4)
    log_event("INFO", f"Failed alert queued for retry in {channel}.")

def process_retry_queue():
    if not os.path.exists(RETRY_QUEUE_FILE):
        return
    
    queue = []
    try:
        with open(RETRY_QUEUE_FILE, 'r') as f:
            queue = json.load(f)
    except:
        return
        
    if not queue:
        return
        
    log_event("INFO", f"Processing alert retry queue. Items: {len(queue)}")
    remaining = []
    
    for item in queue:
        success = False
        if item["channel"] == "telegram":
            success = send_telegram(item["payload"])
        elif item["channel"] == "email":
            success = send_email(item["payload"]["subject"], item["payload"]["body"])
            
        if not success:
            item["retries"] += 1
            if item["retries"] < 3: # Keep in queue for max 3 attempts
                remaining.append(item)
            else:
                log_event("ERROR", f"Discarding alert from queue after 3 failures: {item['payload']}")
        else:
            log_event("INFO", f"Successfully dispatched alert from retry queue: {item['channel']}")
            
    with open(RETRY_QUEUE_FILE, 'w') as f:
        json.dump(remaining, f, indent=4)

def dispatch_alerts(pair, spread, buy_exch, sell_exch, buy_price, sell_price):
    dedup_key = f"{pair}-{buy_exch}-{sell_exch}"
    if check_deduplication(dedup_key):
        log_event("INFO", f"Alert deduplicated for {dedup_key}. Skipping duplicate notification.")
        return
        
    msg = (
        f"🚨 *ARBITRAGE ALERT DETECTED* 🚨\n\n"
        f"📈 *Trading Pair*: {pair}\n"
        f"🛒 *Action*: BUY on *{buy_exch}* (@ ${buy_price:,.4f}) ➔ SELL on *{sell_exch}* (@ ${sell_price:,.4f})\n"
        f"💰 *Gross Spread*: `{spread:.3f}%`\n"
        f"🕒 *Timestamp*: `{datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S UTC')}`\n\n"
        f"🤖 _Powered by ArbitrageSmartAI.com_"
    )
    
    # 1. Dispatch Telegram
    tg_success = send_telegram(msg)
    if not tg_success:
        push_to_retry_queue("telegram", msg)
        
    # 2. Dispatch Email (Only for premium spreads > 0.3%)
    if spread > 0.30:
        subject = f"🚨 Arbitrage smart alert: {pair} spread {spread:.2f}%"
        email_body = f"An arbitrage opportunity was detected by the ArbitrageSmartAI engine.\n\nPair: {pair}\nSpread: {spread:.3f}%\nBuy on: {buy_exch} (${buy_price})\nSell on: {sell_exch} (${sell_price})\nTime: {datetime.utcnow().isoformat()}"
        email_success = send_email(subject, email_body)
        if not email_success:
            push_to_retry_queue("email", {"subject": subject, "body": email_body})

    # 3. Post Twitter Mock
    post_twitter(f"[ALERT] Arbitrage Smart Alert: {pair} spread {spread:.2f}% detected! Buy {buy_exch} -> Sell {sell_exch}. #Crypto #DeFi")

if __name__ == "__main__":
    # If run directly, run retry queue checks
    process_retry_queue()
