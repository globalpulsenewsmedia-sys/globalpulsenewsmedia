import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.dirname(__dirname);

const CEX_DATA_FILE = path.join(projectDir, 'data', 'arbitrage_data.json');
const DEX_DATA_FILE = path.join(projectDir, 'data', 'dex_arbitrage_data.json');
const NARRATIVE_FILE = path.join(projectDir, 'data', 'narrative_data.json');

const PORT = process.env.PORT || 8002;

// Keep track of active SSE connections
const sseClients = new Set();

function getLatestData() {
    let cex = {};
    let dex = {};
    let narrative = {};
    try {
        if (fs.existsSync(CEX_DATA_FILE)) {
            cex = JSON.parse(fs.readFileSync(CEX_DATA_FILE, 'utf-8'));
        }
        if (fs.existsSync(DEX_DATA_FILE)) {
            dex = JSON.parse(fs.readFileSync(DEX_DATA_FILE, 'utf-8'));
        }
        if (fs.existsSync(NARRATIVE_FILE)) {
            narrative = JSON.parse(fs.readFileSync(NARRATIVE_FILE, 'utf-8'));
        }
    } catch (e) {
        console.error('Error reading cache files:', e);
    }
    return { cex, dex, narrative };
}

const server = http.createServer((req, res) => {
    // Enable CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    // Endpoint 1: Fetch static JSON snapshot
    if (parsedUrl.pathname === '/api/data' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(getLatestData()));
        return;
    }

    // Endpoint 2: Server-Sent Events (SSE) Stream
    if (parsedUrl.pathname === '/api/stream' && req.method === 'GET') {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        // Send initial data immediately
        const initialPacket = `data: ${JSON.stringify({ type: 'snapshot', ...getLatestData() })}\n\n`;
        res.write(initialPacket);

        sseClients.add(res);
        console.log(`🔌 Client connected to SSE stream. Total clients: ${sseClients.size}`);

        req.on('close', () => {
            sseClients.delete(res);
            console.log(`🔌 Client disconnected. Total clients: ${sseClients.size}`);
        });
        return;
    }

    // Endpoint 3: Trigger scanning scripts (for Cron jobs/Cloud Scheduler)
    if (parsedUrl.pathname === '/api/trigger-scan' && (req.method === 'POST' || req.method === 'GET')) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify({ status: 'initiated', message: 'Scanning scripts triggered.' }));
        res.end();

        console.log('⚡ Triggering concurrent backend scanner executions...');
        
        const pyCmd = process.platform === 'win32' ? 'python' : 'python3';
        
        const runEngine = (scriptPath, name) => {
            return new Promise((resolve) => {
                exec(`${pyCmd} "${path.join(projectDir, 'scripts', scriptPath)}"`, { env: process.env }, (err, stdout, stderr) => {
                    if (err) {
                        console.error(`[${name}] Error: ${err.message}`);
                    } else {
                        console.log(`[${name}] Run Completed successfully.`);
                    }
                    resolve();
                });
            });
        };

        Promise.all([
            runEngine('arbitrage_live_engine.py', 'CEX Engine'),
            runEngine('dex_live_scanner.py', 'DEX Scanner'),
            runEngine('narrative_trend_engine.py', 'Narrative Engine')
        ]).then(() => {
            // Broadcast new snapshot to all SSE clients after all runs finish
            console.log('⚡ Broadcasting post-scan concurrent updates...');
            const updatePacket = `data: ${JSON.stringify({ type: 'update', ...getLatestData() })}\n\n`;
            for (const client of sseClients) {
                client.write(updatePacket);
            }
        });
        return;
    }

    // Static files server fallback for Cloud Run environment
    let filepath = path.join(projectDir, parsedUrl.pathname === '/' ? 'index.html' : parsedUrl.pathname.substring(1));
    
    // Safety check to prevent directory traversal
    if (!filepath.startsWith(projectDir)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('Forbidden');
        return;
    }

    if (fs.existsSync(filepath) && fs.statSync(filepath).isFile()) {
        let ext = path.extname(filepath);
        let contentType = 'text/html';
        if (ext === '.js') contentType = 'application/javascript';
        else if (ext === '.css') contentType = 'text/css';
        else if (ext === '.json') contentType = 'application/json';
        else if (ext === '.png') contentType = 'image/png';
        else if (ext === '.jpg') contentType = 'image/jpeg';
        else if (ext === '.svg') contentType = 'image/svg+xml';
        else if (ext === '.ico') contentType = 'image/x-icon';

        res.writeHead(200, { 'Content-Type': contentType });
        fs.createReadStream(filepath).pipe(res);
        return;
    }

    // Fallback 404
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
});

// Optional file watcher to broadcast changes instantly if files change outside of /api/trigger-scan
let lastCexMtime = 0;
let lastDexMtime = 0;
let lastNarrativeMtime = 0;

setInterval(() => {
    if (sseClients.size === 0) return; // Save CPU when idle

    try {
        let changed = false;
        if (fs.existsSync(CEX_DATA_FILE)) {
            const stats = fs.statSync(CEX_DATA_FILE);
            if (stats.mtimeMs !== lastCexMtime) {
                lastCexMtime = stats.mtimeMs;
                changed = true;
            }
        }
        if (fs.existsSync(DEX_DATA_FILE)) {
            const stats = fs.statSync(DEX_DATA_FILE);
            if (stats.mtimeMs !== lastDexMtime) {
                lastDexMtime = stats.mtimeMs;
                changed = true;
            }
        }
        if (fs.existsSync(NARRATIVE_FILE)) {
            const stats = fs.statSync(NARRATIVE_FILE);
            if (stats.mtimeMs !== lastNarrativeMtime) {
                lastNarrativeMtime = stats.mtimeMs;
                changed = true;
            }
        }

        if (changed) {
            const updatePacket = `data: ${JSON.stringify({ type: 'update', ...getLatestData() })}\n\n`;
            for (const client of sseClients) {
                client.write(updatePacket);
            }
        }
    } catch (e) {
        console.error('File monitoring error:', e);
    }
}, 1500);

server.listen(PORT, () => {
    console.log(`⚡ Serverless HTTP & Telemetry SSE Gateway active on port ${PORT}...`);
});
