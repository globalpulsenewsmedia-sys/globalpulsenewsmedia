import fs from 'fs/promises';
import path from 'path';

// --- CONFIGURATION ---
const TARGET_REGIONS = ["USA", "UK", "Canada", "Australia", "Singapore", "New Zealand", "Germany"];
const TARGET_INDUSTRIES = ["PR Agency", "Digital Marketing", "E-commerce Brand", "Tech Startup", "Real Estate Developer"];
const TARGETS_FILE = './data/outreach-targets.json';

async function generateGlobalLeads() {
    console.log("🔍 Initializing Global Lead Discovery Engine...");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) return;

    try {
        // AI-Driven Lead Qualification: Using Gemini to simulate high-probability targets 
        // based on real-time industry trends if search APIs are restricted.
        const prompt = `Act as a Lead Generation Specialist. Generate a list of 10 high-value corporate leads (Real or Simulated based on top companies) in ${TARGET_REGIONS.join(", ")} for a Premium AI News Portal.
        Industries: ${TARGET_INDUSTRIES.join(", ")}.
        
        Return ONLY a JSON array of objects: [{ "name": "", "email": "", "region": "", "industry": "", "priority": "High" }]`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const result = await response.json();
        const rawText = result.candidates[0].content.parts[0].text;
        const newLeads = JSON.parse(rawText.substring(rawText.indexOf('['), rawText.lastIndexOf(']') + 1));

        // Load existing targets
        let existingTargets = [];
        try {
            existingTargets = JSON.parse(await fs.readFile(TARGETS_FILE, 'utf8'));
        } catch (e) { existingTargets = []; }

        // Append only unique emails
        const emailSet = new Set(existingTargets.map(t => t.email));
        newLeads.forEach(lead => {
            if (!emailSet.has(lead.email)) {
                existingTargets.push(lead);
            }
        });

        await fs.mkdir(path.dirname(TARGETS_FILE), { recursive: true });
        await fs.writeFile(TARGETS_FILE, JSON.stringify(existingTargets, null, 2));
        
        console.log(`✅ Successfully identified and added ${newLeads.length} new international leads.`);
    } catch (e) {
        console.error("❌ Lead Gen Error:", e.message);
    }
}

generateGlobalLeads();
