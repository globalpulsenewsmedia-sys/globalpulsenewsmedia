document.addEventListener('DOMContentLoaded', () => {
    const newsCardsGrid = document.getElementById('newsCardsGrid');
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
            if (newsCardsGrid) {
                newsCardsGrid.innerHTML = `<div class="error-panel">SYSTEM OFFLINE. RECONNECTING...</div>`;
            }
        }
    };

    const renderDashboard = (articles, viralArticles = []) => {
        if (!articles || articles.length === 0) return;

        // --- Aggressive Deduplication ---
        const seenTitles = new Set();
        let uniqueArticles = articles.filter(a => {
            const t = a.title.toLowerCase().trim();
            if (seenTitles.has(t)) return false;
            seenTitles.add(t);
            return true;
        });

        const getDisplayTitle = (a) => a.title_mr ? `${sanitizeHTML(a.title)} <br> <span class="title-marathi">${sanitizeHTML(a.title_mr)}</span>` : sanitizeHTML(a.title);
        const getDisplaySnippet = (a) => a.snippet_mr ? `${sanitizeHTML(a.snippet)} <br> <span class="snippet-marathi">${sanitizeHTML(a.snippet_mr)}</span>` : sanitizeHTML(a.snippet);

        const hero = uniqueArticles[0];

        // 1. TOP ALERT BAR (Full Width Headline)
        const alertHeadline = document.getElementById('latestAlertHeadline');
        if (alertHeadline && hero) {
            alertHeadline.innerHTML = `<a href="${hero.link}" class="alert-headline-link">${sanitizeHTML(hero.title).toUpperCase()}</a>`;
        }

        // 2. HERO SECTION (Above the Fold - 2 Column Split)
        if (heroSection && hero) {
            const heroLeftHTML = `
                <div class="hero-featured-card">
                    <a href="${hero.link}" class="hero-image-link">
                        <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-featured-image" alt="${sanitizeHTML(hero.title)}">
                        <div class="hero-image-overlay">AI INTEL REPORT</div>
                    </a>
                    <div class="hero-card-content">
                        <span class="hero-category-badge">${sanitizeHTML(hero.category || 'WORLD')}</span>
                        <a href="${hero.link}" class="hero-title">${getDisplayTitle(hero)}</a>
                        <p class="hero-excerpt">${getDisplaySnippet(hero)}</p>
                        <div class="hero-meta">BY GLOBAL PULSE AI • UPDATED SECONDS AGO</div>
                    </div>
                </div>
            `;

            const trendingArticles = uniqueArticles.slice(1, 5); // Stack of 4 trending stories
            const heroRightHTML = `
                <div class="hero-trending-container">
                    <h3 class="trending-header">TRENDING STORIES</h3>
                    <div class="trending-list">
                        ${trendingArticles.map((a, idx) => `
                            <div class="trending-item">
                                <span class="trending-number">0${idx + 1}</span>
                                <div class="trending-item-content">
                                    <a href="${a.link}" class="trending-item-title">${getDisplayTitle(a)}</a>
                                    <span class="trending-item-category">${sanitizeHTML(a.category || 'WORLD')}</span>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    
                    <!-- SIDEBAR AD PLACEHOLDER -->
                    <div class="ad-slot-sidebar" style="margin-top: 20px; text-align: center; background: var(--cnn-grey-bg); padding: 15px; border: 1px dashed #ccc;">
                        <span style="font-size: 0.8rem; color: #888; text-transform: uppercase;">Advertisement</span>
                        <!-- Replace with Adsterra / Media.net / AdSense Script -->
                        <div id="ad-sidebar-1" style="min-height: 250px; display: flex; align-items: center; justify-content: center; color: #aaa;">300x250 Ad Unit</div>
                    </div>
                </div>
            `;

            heroSection.innerHTML = `
                <div class="hero-left-col">${heroLeftHTML}</div>
                <div class="hero-right-col">${heroRightHTML}</div>
            `;
        }

        // 3. MULTI-COLUMN GRID (Below the Fold - Standard Cards in Column 1 & 2)
        if (newsCardsGrid) {
            const gridArticles = uniqueArticles.slice(5, 21); // Next 16 articles
            newsCardsGrid.innerHTML = gridArticles.map(a => `
                <div class="news-card">
                    <a href="${a.link}" class="news-card-image-link">
                        <img src="${a.imageUrl || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600'}" class="news-card-image" loading="lazy" alt="${sanitizeHTML(a.title)}">
                    </a>
                    <div class="news-card-content">
                        <div class="news-card-meta">
                            <span class="news-card-category">${sanitizeHTML(a.category || 'WORLD')}</span>
                            <span class="news-card-bullet">•</span>
                            <span class="news-card-date">${Math.floor(Math.random() * 45) + 15}M AGO</span>
                        </div>
                        <a href="${a.link}" class="news-card-title">${getDisplayTitle(a)}</a>
                    </div>
                </div>
            `).join('');
        }
    };

    // --- Nav Interaction & Deep Linking ---
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    const handleCategorySelect = async (cat, linkElement) => {
        if (!cat) return;

        navLinks.forEach(l => l.classList.remove('active'));
        if (linkElement) {
            linkElement.classList.add('active');
        } else {
            // Find link by data-category to set active state on direct load
            const matchingLink = Array.from(navLinks).find(l => l.getAttribute('data-category')?.toLowerCase() === cat.toLowerCase());
            if (matchingLink) matchingLink.classList.add('active');
        }

        if (cat.toLowerCase() === 'all') {
            renderDashboard(allArticles, []);
            // Update URL without reloading
            window.history.pushState({}, '', '/');
        } else if (cat.toLowerCase() === 'travel') {
            // Load specific travel data
            try {
                const tResponse = await fetch(`data/travel.json?t=${Date.now()}`);
                if (tResponse.ok) {
                    const travelArticles = await tResponse.json();
                    renderDashboard(travelArticles, []);
                }
            } catch (e) {
                console.error("Failed to load travel data:", e);
            }
            window.history.pushState({}, '', `/?cat=${cat}`);
        } else if (cat.toLowerCase() === 'health') {
            // Load specific health data
            try {
                const hResponse = await fetch(`data/health.json?t=${Date.now()}`);
                if (hResponse.ok) {
                    const healthArticles = await hResponse.json();
                    renderDashboard(healthArticles, []);
                }
            } catch (e) {
                console.error("Failed to load health data:", e);
            }
            window.history.pushState({}, '', `/?cat=${cat}`);
        } else {
            const filtered = allArticles.filter(a => a.category && a.category.toLowerCase().includes(cat.toLowerCase()));
            renderDashboard(filtered, []);
            window.history.pushState({}, '', `/?cat=${cat}`);
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = link.getAttribute('data-category');
            if (cat) {
                e.preventDefault();
                handleCategorySelect(cat, link);
            }
        });
    });

    const initializeDashboard = async () => {
        await fetchNews();
        
        // Handle initial load with query params
        const initialCategory = getQueryParam('cat');
        if (initialCategory) {
            handleCategorySelect(initialCategory, null);
        }
    };

    initializeDashboard();
    setInterval(fetchNews, 600000);
});
