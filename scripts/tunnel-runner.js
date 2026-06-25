import { spawn } from 'child_process';
import path from 'path';

const PORT = 80;

// Start the production static web server
console.log('Starting production web server...');
const webServer = spawn('node', ['server.js'], {
    stdio: 'inherit',
    shell: true
});

webServer.on('exit', (code) => {
    console.log(`Web server exited with code ${code}. Restarting tunnel runner...`);
    process.exit(code);
});

// Function to start and monitor the localtunnel connection
function startTunnel() {
    console.log('⚡ Starting secure localtunnel gateway...');
    
    // Spawn npx localtunnel
    const tunnel = spawn('npx', ['localtunnel', '--port', PORT], {
        shell: true
    });

    tunnel.stdout.on('data', (data) => {
        const output = data.toString().trim();
        if (output) {
            console.log(`[Localtunnel Log]: ${output}`);
        }
    });

    tunnel.stderr.on('data', (data) => {
        console.error(`[Localtunnel Error]: ${data.toString().trim()}`);
    });

    tunnel.on('close', (code) => {
        console.log(`⚠️ Localtunnel gateway connection closed (Code: ${code}). Auto-restarting in 5 seconds...`);
        setTimeout(startTunnel, 5000);
    });
}

// Initial Tunnel Inception
setTimeout(startTunnel, 2000); // Small buffer to let the web server start up
