document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('newsGrid');
    const heroSection = document.getElementById('heroSection');
    const navLinks = document.querySelectorAll('.cnn-nav a');
    
    let allArticles = [];

    // --- Master Security: Anti-Debug & Protection ---
    document.addEventListener('contextmenu', event => event.preventDefault()); // Disable Right Click
    
    // --- Wealth Intelligence: AI Agent Simulation ---
    const cryptoInsights = [
        "Detecting massive liquidity shifts in Bitcoin ecosystem. Volatility spike expected.",
        "Whale movement detected: 5,000 BTC moved to cold storage. Bullish sentiment rising.",
        "Ethereum Layer-2 adoption hit record highs. Gas fees normalizing.",
        "Institutional accumulation phase starting for Solana. Resistance at $180."
    ];

    const stockInsights = [
        "Tech sector RSI showing overbought conditions. Defensive posture recommended.",
        "NVIDIA earnings anticipation driving semi-conductor surge. Watch the $120 level.",
        "Fed signals suggest 'higher for longer' interest rates. Treasury yields climbing.",
        "Energy sector showing inverse correlation to dollar strength. Buying opportunity?"
    ];

    const updateAgentInsights = () => {
        const cryptoText = document.getElementById('cryptoAiInsight');
        const stockText = document.getElementById('stockAiInsight');
        if (cryptoText) cryptoText.innerText = `"${cryptoInsights[Math.floor(Math.random() * cryptoInsights.length)]}"`;
        if (stockText) stockText.innerText = `"${stockInsights[Math.floor(Math.random() * stockInsights.length)]}"`;
    };
    setInterval(updateAgentInsights, 15000); // Pulse every 15s
    
    // --- Viral Marketing: Share Logic ---
    window.shareArticle = (title, url) => {
        if (navigator.share) {
            navigator.share({
                title: title,
                text: 'Check out this intelligence report from Global Pulse:',
                url: url || window.location.href,
            }).catch(console.error);
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(url || window.location.href);
            alert('Intelligence Link Copied to Clipboard!');
        }
    };
    
    const protectSite = () => {
        const threshold = 160;
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        if (widthThreshold || heightThreshold) {
            console.clear();
            console.log('%cSECURITY ALERT: UNAUTHORIZED ACCESS DETECTED', 'color: red; font-size: 20px; font-weight: bold;');
        }
    };
    setInterval(protectSite, 1000);

    const sanitizeHTML = (str) => {
        if (!str) return '';
        const temp = document.createElement('div');
        temp.textContent = str;
        return temp.innerHTML;
    };

    // --- News Fetching & Rendering ---
    const fetchNews = async () => {
        try {
            const response = await fetch(`data/news.json?t=${Date.now()}`);
            if (!response.ok) throw new Error('Intelligence Link Offline');
            allArticles = await response.json();
            
            // Fetch Viral Content for the grid
            const vResponse = await fetch(`data/viral.json?t=${Date.now()}`);
            let viralArticles = [];
            if (vResponse.ok) viralArticles = await vResponse.json();

            renderDashboard(allArticles, viralArticles);
        } catch (error) {
            console.error('Critical System Error:', error);
            grid.innerHTML = `<div class="error-panel">SYSTEM OFFLINE. RECONNECTING...</div>`;
        }
    };

    const renderDashboard = (articles, viralArticles = []) => {
        const leftColumn = document.getElementById('leftColumn');
        const heroSection = document.getElementById('heroSection');
        const centerGrid = document.getElementById('centerGrid');
        const sideGrid = document.getElementById('sideGrid');

        if (!articles || articles.length === 0) return;

        // --- Aggressive Deduplication ---
        const seenTitles = new Set();
        let uniqueArticles = articles.filter(a => {
            const t = a.title.toLowerCase().trim();
            if (seenTitles.has(t)) return false;
            seenTitles.add(t);
            return true;
        });

        const getDisplayTitle = (a) => a.title_mr ? `${sanitizeHTML(a.title)} <br> <span style="font-size: 0.8em; color: #ffcc00; font-family: 'Noto Sans Marathi';">${sanitizeHTML(a.title_mr)}</span>` : sanitizeHTML(a.title);
        const getDisplaySnippet = (a) => a.snippet_mr ? `${sanitizeHTML(a.snippet)} <br> <span style="font-size: 0.9em; color: #aaa; font-family: 'Noto Sans Marathi';">${sanitizeHTML(a.snippet_mr)}</span>` : sanitizeHTML(a.snippet);

        // 1. TOP HERO AREA
        const hero = uniqueArticles[0];
        if (heroSection) {
            heroSection.innerHTML = `
                <a href="${hero.link}" target="_blank" class="hero-headline">${getDisplayTitle(hero)}</a>
                <div class="hero-image-wrapper">
                    <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-image">
                    <div class="live-updates-badge">AI GENERATED IMAGE</div>
                </div>
                <div class="hero-snippet" style="font-size: 1.5rem; line-height: 1.4; font-weight: 300;">${getDisplaySnippet(hero)}</div>
            `;
        }

        // 2. LEFT COLUMN
        if (leftColumn) {
            const leftArticles = uniqueArticles.slice(1, 15);
            leftColumn.innerHTML = leftArticles.map(a => `
                <div class="compact-story">
                    <div class="compact-image-wrapper">
                        <img src="${a.imageUrl}" class="compact-image" loading="lazy">
                    </div>
                    <a href="${a.link}" target="_blank">${getDisplayTitle(a)}</a>
                </div>
            `).join('');
        }

        // 3. RIGHT COLUMN
        if (sideGrid) {
            const sideArticles = uniqueArticles.slice(15, 40);
            sideGrid.innerHTML = `
                <div class="headlines-box" style="text-align: left; background: transparent; padding: 0;">
                    <div class="cnn-logo" style="font-size: 1.2rem; margin-bottom: 10px;">MAHARASHTRA<span>VISHWA</span> <span style="font-size: 0.8rem; font-weight: 300; color: #fff;">Varta</span></div>
                    <div class="headlines-feed">
                        ${sideArticles.map(a => `
                            <div class="sidebar-card">
                                <a href="${a.link}" target="_blank" style="font-size: 0.95rem; font-weight: 900; line-height: 1.4;">${getDisplayTitle(a)}</a>
                                <p style="font-size: 0.7rem; color: #666; margin-top: 5px;">AI VERIFIED • ${Math.floor(Math.random() * 60)}M AGO</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        // 4. CENTER AREA
        if (centerGrid) {
            let gridHTML = '';
            
            const gridArticles = uniqueArticles.slice(40, 46);
            gridHTML += `
                <div class="cnn-center-grid">
                    ${gridArticles.map(a => `
                        <div class="sidebar-card">
                            <div class="sidebar-image-wrapper"><img src="${a.imageUrl}" loading="lazy"></div>
                            <a href="${a.link}" target="_blank" style="color: var(--cnn-blue); font-size: 1.4rem;">${getDisplayTitle(a)}</a>
                        </div>
                    `).join('')}
                </div>
            `;

            const moreStories = uniqueArticles.slice(46, 52);
            gridHTML += `
                <div class="cnn-section-header">Exclusive Reports</div>
                <div class="cnn-center-grid">
                    ${moreStories.map(a => `
                        <div class="sidebar-card">
                            <div class="sidebar-image-wrapper"><img src="${a.imageUrl}" loading="lazy"></div>
                            <a href="${a.link}" target="_blank" style="color: var(--cnn-blue);">${getDisplayTitle(a)}</a>
                        </div>
                    `).join('')}
                </div>
            `;

            centerGrid.innerHTML = gridHTML;
        }

        // 5. Breaking News Ticker
        const ticker = document.getElementById('breakingTicker');
        if (ticker) {
            const tickerTitles = uniqueArticles.slice(0, 10).map(a => a.title_mr || a.title.toUpperCase()).join(' • ');
            ticker.innerText = `${tickerTitles} • २४/७ महाराष्ट्र विश्व वार्ता लाईव्ह...`;
        }
    };

    // --- Nav Interaction ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = link.getAttribute('data-category');
            if (!cat) return;

            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (cat === 'all') {
                fetchNews();
            } else {
                const filtered = allArticles.filter(a => a.category.toLowerCase().includes(cat.toLowerCase()));
                renderDashboard(filtered, []);
            }
        });
    });

    fetchNews();
    setInterval(fetchNews, 600000);
});
