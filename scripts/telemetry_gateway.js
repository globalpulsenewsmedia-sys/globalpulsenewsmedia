import { WebSocketServer } from 'ws';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDir = path.dirname(__dirname);

const CEX_DATA_FILE = path.join(projectDir, 'data', 'arbitrage_data.json');
const DEX_DATA_FILE = path.join(projectDir, 'data', 'dex_arbitrage_data.json');

// Instantiate WebSocket Server on Port 8002
const wss = new WebSocketServer({ port: 8002 });
console.log('⚡ ArbitrageSmartAI WebSocket Telemetry Gateway listening on port 8002...');

// Set to keep track of active connections
const clients = new Set();

wss.on('connection', (ws) => {
    clients.add(ws);
    console.log(`🔌 Client connected. Total active connections: ${clients.size}`);
    
    // Send initial snapshot immediately
    sendLatestData(ws);

    ws.on('close', () => {
        clients.delete(ws);
        console.log(`🔌 Client disconnected. Total active connections: ${clients.size}`);
    });
});

function sendLatestData(ws) {
    try {
        if (fs.existsSync(CEX_DATA_FILE)) {
            const cexRaw = fs.readFileSync(CEX_DATA_FILE, 'utf-8');
            ws.send(JSON.stringify({ type: 'cex', data: JSON.parse(cexRaw) }));
        }
        if (fs.existsSync(DEX_DATA_FILE)) {
            const dexRaw = fs.readFileSync(DEX_DATA_FILE, 'utf-8');
            ws.send(JSON.stringify({ type: 'dex', data: JSON.parse(dexRaw) }));
        }
    } catch (e) {
        console.error('Error sending snapshot:', e);
    }
}

// Watch data files and broadcast changes
function broadcastUpdate(type, filepath) {
    try {
        if (fs.existsSync(filepath)) {
            const raw = fs.readFileSync(filepath, 'utf-8');
            const data = JSON.parse(raw);
            const packet = JSON.stringify({ type, data });
            
            for (const client of clients) {
                if (client.readyState === 1) { // OPEN state
                    client.send(packet);
                }
            }
        }
    } catch (e) {
        console.error(`Error broadcasting update for ${type}:`, e);
    }
}

// Poll files for updates every 1.5 seconds and broadcast if changed
let lastCexMtime = 0;
let lastDexMtime = 0;

setInterval(() => {
    try {
        if (fs.existsSync(CEX_DATA_FILE)) {
            const stats = fs.statSync(CEX_DATA_FILE);
            if (stats.mtimeMs !== lastCexMtime) {
                lastCexMtime = stats.mtimeMs;
                broadcastUpdate('cex', CEX_DATA_FILE);
            }
        }
        if (fs.existsSync(DEX_DATA_FILE)) {
            const stats = fs.statSync(DEX_DATA_FILE);
            if (stats.mtimeMs !== lastDexMtime) {
                lastDexMtime = stats.mtimeMs;
                broadcastUpdate('dex', DEX_DATA_FILE);
            }
        }
    } catch (e) {
        console.error('Polling error:', e);
    }
}, 1500);
