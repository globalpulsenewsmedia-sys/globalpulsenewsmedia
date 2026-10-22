/**
 * lead-generator.mjs - AI-powered B2B lead discovery for GlobalPulseNewsMedia
 * Uses Gemini to identify potential advertising/partnership leads
 */
import fs from 'fs/promises';
import path from 'path';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const TARGET_INDUSTRIES = [
    'fintech companies', 'crypto exchanges', 'digital media agencies',
    'news aggregators', 'financial data providers', 'investment platforms'
];

// Sample leads database (extend via Gemini AI)
const SEED_LEADS = [
    { company: 'FinTech Weekly', email: 'partnerships@fintechweekly.com', industry: 'Media' },
    { company: 'CryptoDesk', email: 'ads@cryptodesk.io', industry: 'Crypto' },
    { company: 'Global Markets Ltd', email: 'bd@globalmarkets.com', industry: 'Finance' }
];

async function generateLeadsWithAI(industry) {
    if (!GEMINI_API_KEY) return [];

    try {
        const prompt = `Generate 3 realistic B2B leads (companies that might advertise on a global news media platform) in the "${industry}" sector.
        Return ONLY a JSON array: [{ "company": "", "email": "", "industry": "", "website": "" }]
        Use plausible but fictional company names and generic contact emails.`;

        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: { response_mime_type: 'application/json' }
                })
            }
        );
        const result = await response.json();
        const text = result.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
        return JSON.parse(text);
    } catch (err) {
        console.error(`❌ AI lead gen failed for ${industry}:`, err.message);
        return [];
    }
}

async function main() {
    console.log('🔍 Lead Generator: Starting AI-powered lead discovery...');

    let leads = [...SEED_LEADS];

    if (GEMINI_API_KEY) {
        console.log('🤖 Using Gemini AI to generate leads...');
        for (const industry of TARGET_INDUSTRIES.slice(0, 2)) {
            const aiLeads = await generateLeadsWithAI(industry);
            leads = leads.concat(aiLeads);
            console.log(`  ✅ Generated ${aiLeads.length} leads for: ${industry}`);
        }
    } else {
        console.log('⚠️ GEMINI_API_KEY not set. Using seed leads only.');
    }

    // Deduplicate
    const seen = new Set();
    leads = leads.filter(l => {
        if (!l.email || seen.has(l.email)) return false;
        seen.add(l.email);
        return true;
    });

    const dataDir = path.join(process.cwd(), 'data');
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(path.join(dataDir, 'leads.json'), JSON.stringify(leads, null, 2));

    console.log(`✅ Lead generation complete. Total leads: ${leads.length}`);
}

main().catch(console.error);
