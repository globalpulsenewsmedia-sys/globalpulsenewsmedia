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

        // 1. TOP HERO AREA (CNN MAIN STORY)
        const hero = uniqueArticles[0];
        if (heroSection) {
            heroSection.innerHTML = `
                <a href="${hero.link}" target="_blank" class="hero-headline">${sanitizeHTML(hero.title)}</a>
                <div class="hero-image-wrapper">
                    <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-image">
                    <div class="live-updates-badge">LIVE UPDATES</div>
                </div>
                <div class="hero-snippet" style="font-size: 1.5rem; line-height: 1.2; font-weight: 300;">${sanitizeHTML(hero.snippet)}</div>
            `;
        }

        // 2. LEFT COLUMN (Compact List)
        if (leftColumn) {
            const leftArticles = uniqueArticles.slice(1, 15);
            leftColumn.innerHTML = leftArticles.map(a => `
                <div class="compact-story">
                    <div class="compact-image-wrapper">
                        <img src="${a.imageUrl}" class="compact-image" loading="lazy">
                    </div>
                    <a href="${a.link}" target="_blank">${sanitizeHTML(a.title)}</a>
                </div>
            `).join('');
        }

        // 3. RIGHT COLUMN (LIVE HEADLINES FEED) - NEW CNN STYLE
        if (sideGrid) {
            const sideArticles = uniqueArticles.slice(15, 40); // Large list for scroll
            sideGrid.innerHTML = `
                <div class="headlines-box" style="text-align: left; background: transparent; padding: 0;">
                    <div class="cnn-logo" style="font-size: 1.2rem; margin-bottom: 10px;">GLOBAL<span>PULSE</span> <span style="font-size: 0.8rem; font-weight: 300; color: #fff;">Headlines</span></div>
                    <div class="headlines-feed">
                        ${sideArticles.map(a => `
                            <div class="sidebar-card">
                                <a href="${a.link}" target="_blank" style="font-size: 0.95rem; font-weight: 900; line-height: 1.2;">${sanitizeHTML(a.title)}</a>
                                <p style="font-size: 0.7rem; color: #666; margin-top: 5px;">UPDATED ${Math.floor(Math.random() * 60)}M AGO</p>
                            </div>
                        `).join('')}
                    </div>
                    <a href="#" class="headlines-link">See all headlines →</a>
                </div>
            `;
        }

        // 4. CENTER AREA - INFINITE SCROLL SIMULATION (MANY SECTIONS)
        if (centerGrid) {
            let gridHTML = '';
            
            // Section 1: Top Stories Grid
            const gridArticles = uniqueArticles.slice(40, 46);
            gridHTML += `
                <div class="cnn-center-grid">
                    ${gridArticles.map(a => `
                        <div class="sidebar-card">
                            <div class="sidebar-image-wrapper"><img src="${a.imageUrl}" loading="lazy"></div>
                            <a href="${a.link}" target="_blank" style="color: var(--cnn-blue); font-size: 1.4rem;">${sanitizeHTML(a.title)}</a>
                        </div>
                    `).join('')}
                </div>
            `;

            // Section 2: MORE TOP STORIES
            const moreStories = uniqueArticles.slice(46, 52);
            gridHTML += `
                <div class="cnn-section-header">More Top Stories</div>
                <div class="cnn-center-grid">
                    ${moreStories.map(a => `
                        <div class="sidebar-card">
                            <div class="sidebar-image-wrapper"><img src="${a.imageUrl}" loading="lazy"></div>
                            <a href="${a.link}" target="_blank" style="color: var(--cnn-blue);">${sanitizeHTML(a.title)}</a>
                        </div>
                    `).join('')}
                </div>
            `;

            // Section 3: WORLD INTELLIGENCE (Large Row)
            const worldStories = uniqueArticles.filter(a => a.category.includes('WORLD')).slice(0, 3);
            if (worldStories.length > 0) {
                gridHTML += `
                    <div class="cnn-section-header">World Intelligence</div>
                    <div style="display: flex; flex-direction: column; gap: 30px;">
                        ${worldStories.map(a => `
                            <div style="display: grid; grid-template-columns: 1fr 1.5fr; gap: 20px; border-bottom: 1px solid #222; padding-bottom: 20px;">
                                <div class="sidebar-image-wrapper"><img src="${a.imageUrl}" style="height: 100%;"></div>
                                <div>
                                    <a href="${a.link}" target="_blank" style="font-size: 1.8rem; font-weight: 900; color: #fff; text-decoration: none;">${sanitizeHTML(a.title)}</a>
                                    <p style="color: #888; margin-top: 10px;">${sanitizeHTML(a.snippet)}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            // Section 4-10: DEEP SCROLL REPETITION (CNN usually has massive lists)
            // We use the rest of the unique articles or iterate to create length
            const remaining = uniqueArticles.slice(52);
            const categories = ['POLITICS', 'TECH', 'BUSINESS', 'HEALTH', 'STYLE', 'TRAVEL', 'SPORTS'];
            
            categories.forEach(cat => {
                const catStories = uniqueArticles.filter(a => a.category.includes(cat)).slice(0, 4);
                if (catStories.length > 0) {
                    gridHTML += `
                        <div class="cnn-section-header">${cat}</div>
                        <div class="cnn-center-grid">
                            ${catStories.map(a => `
                                <div class="sidebar-card">
                                    <div class="sidebar-image-wrapper"><img src="${a.imageUrl}" loading="lazy"></div>
                                    <a href="${a.link}" target="_blank" style="color: var(--cnn-blue);">${sanitizeHTML(a.title)}</a>
                                </div>
                            `).join('')}
                        </div>
                    `;
                }
            });

            centerGrid.innerHTML = gridHTML;
        }

        // 5. Update Breaking News Ticker
        const ticker = document.getElementById('breakingTicker');
        if (ticker) {
            const tickerTitles = uniqueArticles.slice(0, 10).map(a => sanitizeHTML(a.title).toUpperCase()).join(' • ');
            ticker.innerText = `${tickerTitles} • LIVE COVERAGE CONTINUES 24/7 • DEVELOPING STORY...`;
        }
    };



    // --- Nav Interaction ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = link.getAttribute('data-category');
            if (!cat) return; // For Academy link

            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (cat === 'all') {
                fetchNews(); // Re-render everything
            } else {
                const filtered = allArticles.filter(a => a.category.toLowerCase().includes(cat.toLowerCase()));
                renderDashboard(filtered, []); // No viral in filtered categories for now
            }
        });
    });

    // Initialize
    fetchNews();
    setInterval(fetchNews, 600000); // 10 min refresh
});
