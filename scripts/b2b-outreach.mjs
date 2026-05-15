import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';

// --- CONFIGURATION ---
const TARGETS_FILE = './data/outreach-targets.json';
const HISTORY_FILE = './data/outreach-history.json';
const SMTP_CONFIG = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
};

const SITE_NAME = "Global Pulse News Media / महाराष्ट्र विश्व वार्ता";
const SITE_URL = "https://globalpulsenewsmedia.com";
const RAZORPAY_LINK = "https://globalpulsenewsmedia.com/pro.html";

// --- TEMPLATES ---
const getProposalTemplate = (name) => ({
    subject: `Partnership Opportunity: Global Pulse News Media x ${name}`,
    text: `Hello ${name} Team,

I am writing from Global Pulse News Media (Maharashtra Vishwa Varta). We are a next-gen, AI-powered intelligence portal reaching over 5.2 Million monthly impressions globally, with a strong focus on high-net-worth investors and business leaders in Mumbai and Thane.

We noticed your brand's impact and would like to offer a strategic advertising partnership.

Our Partnership Slots:
1. Premium Header Banner: $4,999/mo
2. Sponsored Intelligence Report (AI-driven): $1,500/report
3. Sidebar Top Spotlight: $999/mo

You can view our Media Kit here: ${SITE_URL}/mediakit.html

Ready to secure a slot? You can initiate the booking via our secure Razorpay gateway: ${RAZORPAY_LINK}

Best regards,
Manik Katke
Founder & CEO, Global Pulse Media Group
Contact: +91 93729 54852`
});

const getFollowUpTemplate = (name) => ({
    subject: `Re: Partnership Opportunity: Global Pulse News Media x ${name}`,
    text: `Hi ${name} Team,

I'm checking in to see if you had a chance to review our partnership proposal for Global Pulse News.

Our AI agents have detected a massive shift in tech/business interest in the Mumbai region this week—an ideal time for your brand to be seen by our audience.

Would you like to discuss a custom advertising package?

Direct Secure Booking: ${RAZORPAY_LINK}

Best,
Manik Katke`
});

// --- CORE LOGIC ---
async function runOutreach() {
    console.log("🚀 Starting B2B Outreach Sequence...");

    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.error("❌ ERROR: SMTP credentials missing in environment.");
        return;
    }

    const targets = JSON.parse(fs.readFileSync(TARGETS_FILE, 'utf8'));
    const history = JSON.parse(fs.readFileSync(HISTORY_FILE, 'utf8'));
    const transporter = nodemailer.createTransport(SMTP_CONFIG);

    const now = new Date();

    for (const target of targets) {
        const lastSent = history[target.email]?.lastSent ? new Date(history[target.email].lastSent) : null;
        const status = history[target.email]?.status || 'new';

        let emailContent = null;
        let newStatus = status;

        if (status === 'new') {
            console.log(`📧 Sending initial proposal to ${target.name}...`);
            emailContent = getProposalTemplate(target.name);
            newStatus = 'sent';
        } else if (status === 'sent') {
            const diffDays = Math.floor((now - lastSent) / (1000 * 60 * 60 * 24));
            if (diffDays >= 3) {
                console.log(`🔄 Sending 3-day follow-up to ${target.name}...`);
                emailContent = getFollowUpTemplate(target.name);
                newStatus = 'followed_up';
            }
        }

        if (emailContent) {
            try {
                await transporter.sendMail({
                    from: `"Manik Katke" <${process.env.SMTP_USER}>`,
                    to: target.email,
                    subject: emailContent.subject,
                    text: emailContent.text
                });
                
                history[target.email] = {
                    name: target.name,
                    lastSent: now.toISOString(),
                    status: newStatus
                };
                console.log(`✅ Email sent to ${target.email}`);
            } catch (err) {
                console.error(`❌ FAILED to send to ${target.email}:`, err.message);
            }
        } else {
            console.log(`⏭️ Skipping ${target.name} (Waiting or sequence finished)`);
        }
    }

    fs.writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2));
    console.log("🏁 Outreach sequence completed.");
}

runOutreach();
