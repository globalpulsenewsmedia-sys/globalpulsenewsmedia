/**
 * b2b-outreach.mjs - Automated B2B email outreach for GlobalPulseNewsMedia
 * Sends partnership/advertising emails to business leads
 */
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

const EMAIL_TEMPLATE = (companyName) => ({
    subject: `Partnership Opportunity — GlobalPulseNewsMedia.com`,
    html: `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1a1a2e;">Hello ${companyName || 'there'},</h2>
      <p>We are <strong>GlobalPulseNewsMedia</strong> — a fast-growing AI-powered global news platform 
      reaching thousands of readers daily with real-time, multi-language news intelligence.</p>
      
      <h3>Why Partner With Us?</h3>
      <ul>
        <li>🌍 Global audience across 50+ countries</li>
        <li>🤖 AI-curated premium content</li>
        <li>📊 High-intent, financially-aware readership</li>
        <li>💼 B2B & Enterprise advertising packages available</li>
      </ul>
      
      <p>We'd love to explore how we can collaborate. Reply to this email or visit 
      <a href="https://globalpulsenewsmedia.com/partnerships.html">our partnerships page</a>.</p>
      
      <p>Best regards,<br/>
      <strong>GlobalPulse Business Team</strong><br/>
      <a href="https://globalpulsenewsmedia.com">globalpulsenewsmedia.com</a></p>
    </div>
    `
});

async function loadLeads() {
    try {
        const filePath = path.join(process.cwd(), 'data', 'leads.json');
        const raw = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(raw);
    } catch {
        console.log('⚠️ No leads.json found. Using sample leads.');
        return [];
    }
}

async function saveHistory(history) {
    const filePath = path.join(process.cwd(), 'data', 'outreach-history.json');
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, JSON.stringify(history, null, 2));
}

async function main() {
    console.log('📧 B2B Outreach Agent: Starting...');

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        console.log('⚠️ SMTP credentials not configured. Skipping outreach.');
        return;
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT || '587'),
        secure: false,
        auth: { user: SMTP_USER, pass: SMTP_PASS }
    });

    const leads = await loadLeads();
    if (!leads.length) {
        console.log('⚠️ No leads to contact. Done.');
        return;
    }

    const history = [];
    let sent = 0;

    for (const lead of leads.slice(0, 5)) { // Max 5 per run
        const { email, company } = lead;
        if (!email) continue;

        const { subject, html } = EMAIL_TEMPLATE(company);
        try {
            await transporter.sendMail({
                from: `"GlobalPulse Business" <${SMTP_USER}>`,
                to: email,
                subject,
                html
            });
            console.log(`✅ Email sent to ${email}`);
            history.push({ email, company, sentAt: new Date().toISOString(), status: 'sent' });
            sent++;
        } catch (err) {
            console.error(`❌ Failed to send to ${email}:`, err.message);
            history.push({ email, company, sentAt: new Date().toISOString(), status: 'failed', error: err.message });
        }
    }

    await saveHistory(history);
    console.log(`📬 Outreach complete. Sent: ${sent}/${leads.length} emails.`);
}

main().catch(console.error);
