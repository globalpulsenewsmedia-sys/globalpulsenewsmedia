import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

// --- CONFIG ---
const TARGETS_FILE = './data/outreach-targets.json';
const HISTORY_FILE = './data/outreach-history.json';
const UNSUBSCRIBE_FILE = './data/unsubscribed.json';
const BACKUP_DIR = './data/backups';

const SMTP_CONFIG = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
};

const SITE_URL = "https://globalpulsenewsmedia.com";
const RAZORPAY_INTL = "https://globalpulsenewsmedia.com/pro.html"; // International Checkout

// --- TEMPLATES (Fluent English for USA/UK/Global) ---
const getIntlProposal = (name) => ({
    subject: `Strategic Media Partnership: Global Pulse Intelligence x ${name}`,
    text: `Dear ${name} Team,

I am Manik Katke, Founder of Global Pulse News Media. We represent a leading AI-driven intelligence network with over 5.2 Million monthly impressions across the USA, UK, and Europe.

Given your prominent position in the industry, we invite you to secure a Premium Spotlight on our platform.

Current Opportunities for ${name}:
1. Global Header Placement ($9.99k/month)
2. Targeted US-Market Editorial ($1,500/feature)
3. 24/7 AI-Ticker Sponsorship ($500/week)

Media Kit & Metrics: ${SITE_URL}/mediakit.html
Direct Ad Booking: ${RAZORPAY_INTL}

We adhere to your privacy. If you wish to opt-out, click here: ${SITE_URL}/unsubscribe.html?email=${encodeURIComponent(name)}

Best regards,
Manik Katke | Global Pulse Media Group
London | Mumbai | New York`
});

const getIntlFollowUp = (name) => ({
    subject: `Follow-up: Media Partnership for ${name}`,
    text: `Hi ${name} Team,

I'm reaching out once more regarding our media partnership proposal. Our US traffic has seen a 14% surge this week in the Tech/Finance sector—perfect timing for your brand.

Would you like to schedule a 5-minute call or proceed with a direct booking?

Direct Ad Space: ${RAZORPAY_INTL}

Best,
Manik Katke`
});

// --- CORE ENGINE ---
async function runGlobalOutreach() {
    console.log("🚀 Initializing International Outreach Sequence...");
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) return;

    const targets = JSON.parse(await fs.readFile(TARGETS_FILE, 'utf8'));
    let history = {};
    try { history = JSON.parse(await fs.readFile(HISTORY_FILE, 'utf8')); } catch(e) {}
    let unsubscribed = [];
    try { unsubscribed = JSON.parse(await fs.readFile(UNSUBSCRIBE_FILE, 'utf8')); } catch(e) {}

    const transporter = nodemailer.createTransport(SMTP_CONFIG);
    const now = new Date();

    for (const target of targets) {
        if (unsubscribed.includes(target.email)) continue;

        const h = history[target.email] || { status: 'new' };
        let email = null;
        let nextStatus = h.status;

        if (h.status === 'new') {
            email = getIntlProposal(target.name);
            nextStatus = 'sent';
        } else if (h.status === 'sent') {
            const diffDays = Math.floor((now - new Date(h.lastSent)) / (1000 * 60 * 60 * 24));
            if (diffDays >= 3) {
                email = getIntlFollowUp(target.name);
                nextStatus = 'followed_up';
            }
        }

        if (email) {
            try {
                await transporter.sendMail({
                    from: `"Manik Katke" <${process.env.SMTP_USER}>`,
                    to: target.email,
                    subject: email.subject,
                    text: email.text
                });
                history[target.email] = { lastSent: now.toISOString(), status: nextStatus };
                console.log(`✅ Outreach successful: ${target.email}`);
            } catch (err) { console.error(`❌ Failed: ${target.email}`, err.message); }
        }
    }

    await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2));
    
    // --- Secure Backup ---
    await fs.mkdir(BACKUP_DIR, { recursive: true });
    const backupName = `outreach_log_${now.toISOString().split('T')[0]}.json`;
    await fs.writeFile(path.join(BACKUP_DIR, backupName), JSON.stringify({ history, timestamp: now }));
    console.log(`📁 Backup secured: ${backupName}`);
}

runGlobalOutreach();
