import http from 'http';
import fs from 'fs';
import path from 'path';

const PORT = process.env.PORT || 8080;

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.xml': 'application/xml; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.txt': 'text/plain; charset=utf-8'
};

const server = http.createServer((req, res) => {
    // Basic Request Logging
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    // Parse URL path and sanitize to prevent directory traversal
    let safeUrl = req.url.split('?')[0];
    if (safeUrl === '/') {
        safeUrl = '/index.html';
    }

    let filePath = path.join(process.cwd(), safeUrl);

    // Check if path is outside workspace directory
    if (!filePath.startsWith(process.cwd())) {
        res.statusCode = 403;
        res.end('Access Denied');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            // Fallback for SPA routing if requested resource is not found (except static files)
            const ext = path.extname(filePath);
            if (!ext || ext === '.html') {
                const fallbackPath = path.join(process.cwd(), 'index.html');
                fs.readFile(fallbackPath, (fallbackErr, data) => {
                    if (fallbackErr) {
                        res.statusCode = 404;
                        res.setHeader('Content-Type', 'text/plain');
                        res.end('Not Found');
                    } else {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'text/html; charset=utf-8');
                        res.end(data);
                    }
                });
            } else {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Resource Not Found');
            }
            return;
        }

        // Serve requested file
        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';

        res.statusCode = 200;
        res.setHeader('Content-Type', contentType);

        const stream = fs.createReadStream(filePath);
        stream.on('error', (streamErr) => {
            console.error('Stream read error:', streamErr);
            if (!res.headersSent) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain');
                res.end('Internal Server Error');
            }
        });
        stream.pipe(res);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 GlobalPulseNewsMedia Static Server running on port ${PORT}`);
});
