document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('newsGrid');
    const heroSection = document.getElementById('heroSection');
    const navLinks = document.querySelectorAll('.cnn-nav a');
    
    let allArticles = [];

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
            <a href="${hero.link}" target="_blank" class="hero-headline">${hero.title}</a>
            <img src="${hero.imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200'}" class="hero-image">
            <p style="font-size: 1.1rem; color: #444; margin-bottom: 20px;">${hero.snippet}</p>
        `;

        // 2. Render Grid Articles (Standard CNN Cards)
        // We mix viral and standard articles for the grid
        const combinedArticles = [...viralArticles, ...articles.slice(1)];
        
        grid.innerHTML = combinedArticles.map(a => `
            <a href="${a.link}" target="_blank" class="cnn-card">
                <img src="${a.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800'}" alt="${a.title}">
                <div class="cnn-card-title">${a.title}</div>
                <div style="font-size: 0.7rem; color: #999; margin-top: 10px; text-transform: uppercase; font-weight: 700;">
                    ${a.category} • ${a.time}
                </div>
            </a>
        `).join('');
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
