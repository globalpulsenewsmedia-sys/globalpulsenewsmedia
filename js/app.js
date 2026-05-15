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

        if (!articles || articles.length === 0) {
            if (heroSection) heroSection.innerHTML = '';
            if (centerGrid) centerGrid.innerHTML = `<div class="error-panel" style="grid-column: 1 / -1; text-align: center; padding: 50px; font-weight: bold; font-size: 1.2rem;">INTELLIGENCE AGENTS ARE CURRENTLY AGGREGATING DATA FOR THIS SECTOR. PLEASE CHECK BACK SHORTLY.</div>`;
            return;
        }

        // --- Aggressive Deduplication ---
        const seenTitles = new Set();
        let uniqueArticles = articles.filter(a => {
            const t = a.title.toLowerCase().trim();
            if (seenTitles.has(t)) return false;
            seenTitles.add(t);
            return true;
        });

        // 1. Render CNN Hero (Topmost headline + Main Image)
        const hero = uniqueArticles[0];
        if (heroSection) {
            heroSection.innerHTML = `
                <a href="${hero.link}" target="_blank" class="hero-headline">${sanitizeHTML(hero.title)}</a>
                <div class="hero-image-wrapper">
                    <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-image">
                    <div class="live-updates-badge">LIVE UPDATES</div>
                </div>
                <div class="hero-snippet">${sanitizeHTML(hero.snippet)}</div>
            `;
        }

        // 2. Left Column: Compact stories
        if (leftColumn) {
            const leftArticles = uniqueArticles.slice(1, 10);
            leftColumn.innerHTML = leftArticles.map(a => `
                <div class="compact-story">
                    <img src="${a.imageUrl}" class="compact-image" loading="lazy">
                    <a href="${a.link}" target="_blank">${sanitizeHTML(a.title)}</a>
                </div>
            `).join('');
        }

        // 3. Center Grid: Grid of cards + Additional Sections
        if (centerGrid) {
            const gridArticles = uniqueArticles.slice(10, 16);
            let gridHTML = `
                <div class="cnn-center-grid">
                    ${gridArticles.map(a => `
                        <div class="sidebar-card">
                            <img src="${a.imageUrl}" loading="lazy">
                            <a href="${a.link}" target="_blank" style="color: var(--cnn-blue);">${sanitizeHTML(a.title)}</a>
                        </div>
                    `).join('')}
                </div>
            `;

            // Add "MORE TOP STORIES" Section
            const moreStories = uniqueArticles.slice(16, 22);
            gridHTML += `
                <div class="cnn-section-header">More Top Stories</div>
                <div class="cnn-center-grid">
                    ${moreStories.map(a => `
                        <div class="sidebar-card">
                            <img src="${a.imageUrl}" loading="lazy">
                            <a href="${a.link}" target="_blank" style="color: var(--cnn-blue);">${sanitizeHTML(a.title)}</a>
                        </div>
                    `).join('')}
                </div>
            `;

            // Add "POLITICS" Section
            const politicsStories = uniqueArticles.filter(a => a.category.includes('POLITICS')).slice(0, 4);
            if (politicsStories.length > 0) {
                gridHTML += `
                    <div class="cnn-section-header">Politics</div>
                    <div class="cnn-center-grid">
                        ${politicsStories.map(a => `
                            <div class="sidebar-card">
                                <img src="${a.imageUrl}" loading="lazy">
                                <a href="${a.link}" target="_blank" style="color: var(--cnn-blue);">${sanitizeHTML(a.title)}</a>
                            </div>
                        `).join('')}
                    </div>
                `;
            }

            centerGrid.innerHTML = gridHTML;
        }

        // 4. Right Column: Side cards
        if (sideGrid) {
            const sideArticles = uniqueArticles.slice(22, 32);
            sideGrid.innerHTML = sideArticles.map(a => `
                <div class="sidebar-card">
                    <img src="${a.imageUrl}" loading="lazy">
                    <a href="${a.link}" target="_blank">${sanitizeHTML(a.title)}</a>
                </div>
            `).join('');
        }

        // 5. Render Breaking News Ticker
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
