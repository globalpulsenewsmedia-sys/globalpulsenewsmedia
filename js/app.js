document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('newsGrid');
    const heroSection = document.getElementById('heroSection');
    const secondarySection = document.getElementById('secondarySection');
    const navLinks = document.querySelectorAll('.main-nav a');
    const liveTvToggle = document.getElementById('liveTvToggle');
    const closeLiveTv = document.getElementById('closeLiveTv');
    const liveTvOverlay = document.getElementById('liveTvOverlay');
    const liveVideo = document.getElementById('liveVideo');
    const aiInsightText = document.getElementById('aiInsight');
    
    let allArticles = [];

    // --- Futuristic AI Simulation ---
    const sentiments = [
        "Bullish trend detected in Silicon Valley AI startups.",
        "Geopolitical tension rising in Eastern Europe. Markets stable.",
        "Quantum computing breakthrough imminent. Tech sector alert.",
        "Green energy adoption accelerating in Southeast Asia.",
        "Global trade routes showing increased efficiency patterns."
    ];

    const updateAISentiment = () => {
        const randomSentiment = sentiments[Math.floor(Math.random() * sentiments.length)];
        aiInsightText.style.opacity = 0;
        setTimeout(() => {
            aiInsightText.innerText = randomSentiment;
            aiInsightText.style.opacity = 1;
        }, 500);
    };

    // --- Live Stream Logic ---
    liveTvToggle.addEventListener('click', () => {
        liveTvOverlay.style.display = 'flex';
        const currentSrc = liveVideo.src;
        if (!currentSrc.includes('autoplay=1')) {
            liveVideo.src = currentSrc.replace('autoplay=0', 'autoplay=1');
        }
    });

    closeLiveTv.addEventListener('click', () => {
        liveTvOverlay.style.display = 'none';
        liveVideo.src = liveVideo.src.replace('autoplay=1', 'autoplay=0');
    });

    // --- Data Management ---
    const fetchNews = async () => {
        try {
            // Fetch Standard News
            const response = await fetch(`data/news.json?t=${Date.now()}`);
            if (!response.ok) throw new Error('Intelligence Link Offline');
            allArticles = await response.json();
            
            // Fetch Viral Content
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

        // 1. Render Bento Hero (The Big Story)
        const hero = articles[0];
        heroSection.innerHTML = `
            <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-image-bg">
            <div class="hero-overlay"></div>
            <div class="hero-content">
                <span class="hero-tag">${hero.category}</span>
                <h1 class="hero-title">${hero.title}</h1>
                <a href="${hero.link}" target="_blank" class="btn-live" style="width: fit-content; background: #fff; color: #000; padding: 12px 30px; font-size: 0.9rem;">DECRYPT STORY</a>
            </div>
        `;

        // 2. Render Secondary Bento (Next 2 stories)
        if (articles.length > 1) {
            const subHero = articles[1];
            secondarySection.style.backgroundImage = `linear-gradient(to top, #000, transparent), url('${subHero.imageUrl}')`;
            secondarySection.innerHTML = `
                <span class="hero-tag" style="background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);">${subHero.category}</span>
                <h3 style="font-family: 'Outfit'; font-size: 1.5rem; line-height: 1.2;">${subHero.title}</h3>
                <a href="${subHero.link}" target="_blank" style="color: #fff; font-size: 0.7rem; font-weight: 900; margin-top: 15px; text-decoration: none; letter-spacing: 2px;">READ ANALYSIS →</a>
            `;
        }

        // 3. Render Viral/Featured Section (Before the grid)
        let viralHtml = '';
        if (viralArticles.length > 0) {
            viralHtml = viralArticles.map(v => `
                <div class="article-card featured-viral" style="grid-column: span 2; display: grid; grid-template-columns: 1fr 1fr; background: linear-gradient(135deg, #111, #000); border: 1px solid #333;">
                    <img src="${v.imageUrl}" style="height: 100%; width: 100%; object-fit: cover;">
                    <div class="article-info" style="padding: 30px;">
                        <span class="article-cat" style="color: #ffd700;">${v.category}</span>
                        <h4 class="article-title" style="font-size: 1.4rem;">${v.title}</h4>
                        <p style="font-size: 0.8rem; color: #888; margin-bottom: 20px;">${v.snippet}</p>
                        <a href="${v.link}" class="btn-live" style="width: fit-content;">UNLOCK REPORT</a>
                    </div>
                </div>
            `).join('');
        }

        // 4. Render Main News Flow
        const flowArticles = articles.slice(2);
        grid.innerHTML = viralHtml + flowArticles.map(a => `
            <a href="${a.link}" target="_blank" class="article-card">
                <img src="${a.imageUrl}" class="article-img">
                <div class="article-info">
                    <span class="article-cat">${a.category}</span>
                    <h4 class="article-title">${a.title}</h4>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 20px;">
                        <span style="font-size: 0.6rem; color: #555; font-weight: 800;">${a.time}</span>
                        <span style="font-size: 0.6rem; color: var(--accent-pulse); font-weight: 900;">AI VERIFIED</span>
                    </div>
                </div>
            </a>
        `).join('');
    };

    // --- Nav Interaction ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = link.getAttribute('data-category');
            if (!cat) return; // For PRO link

            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            if (cat === 'all') {
                renderDashboard(allArticles);
            } else {
                const filtered = allArticles.filter(a => a.category.toLowerCase() === cat.toLowerCase());
                renderDashboard(filtered);
            }
        });
    });

    // Initialize
    fetchNews();
    setInterval(updateAISentiment, 10000); // Pulse every 10s
    setInterval(fetchNews, 600000); // 10 min refresh
});
