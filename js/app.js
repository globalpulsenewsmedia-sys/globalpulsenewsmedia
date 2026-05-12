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
        if (!articles || articles.length === 0) return;

        // 1. Render CNN Hero (Topmost headline + Main Image)
        const hero = articles[0];
        heroSection.innerHTML = `
            <a href="${hero.link}" target="_blank" class="hero-headline">${sanitizeHTML(hero.title)}</a>
            <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-image">
            <p style="font-size: 1.1rem; color: #444; margin-bottom: 20px;">${sanitizeHTML(hero.snippet)}</p>
        `;

        // 2. Render Grid Articles (Standard CNN Cards)
        // We mix viral and standard articles for the grid
        const combinedArticles = [...viralArticles, ...articles.slice(1)];
        
        grid.innerHTML = combinedArticles.map(a => `
            <div class="cnn-card">
                <a href="${a.link}" target="_blank" style="text-decoration: none; color: inherit;">
                    <img src="${a.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'}" alt="${sanitizeHTML(a.title)}">
                    <div class="cnn-card-title">${sanitizeHTML(a.title)}</div>
                </a>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <div style="font-size: 0.7rem; color: #999; text-transform: uppercase; font-weight: 700;">
                        ${sanitizeHTML(a.category)} • ${sanitizeHTML(a.time)}
                    </div>
                    <button onclick="shareArticle('${sanitizeHTML(a.title)}', '${a.link}')" style="background: none; border: 1px solid #ddd; padding: 4px 8px; font-size: 0.6rem; font-weight: 900; cursor: pointer; border-radius: 4px;">SHARE ↗</button>
                </div>
            </div>
        `).join('');

        // 3. Render Breaking News Ticker
        const ticker = document.getElementById('breakingTicker');
        if (ticker) {
            const tickerTitles = articles.slice(0, 10).map(a => sanitizeHTML(a.title).toUpperCase()).join(' • ');
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
                const filtered = allArticles.filter(a => a.category.toLowerCase() === cat.toLowerCase());
                renderDashboard(filtered, []); // No viral in filtered categories for now
            }
        });
    });

    // Initialize
    fetchNews();
    setInterval(fetchNews, 600000); // 10 min refresh
});
