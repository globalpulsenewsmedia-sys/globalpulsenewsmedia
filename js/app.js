document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('newsGrid');
    const navLinks = document.querySelectorAll('.navigation a');
    let allArticles = [];

    const fetchNews = async () => {
        try {
            // In a real deployed environment, this will fetch the generated JSON
            const response = await fetch('data/news.json');
            if (!response.ok) throw new Error('News data not found');
            allArticles = await response.json();
            renderArticles(allArticles);
        } catch (error) {
            console.warn('Could not fetch news.json, falling back to mock data.', error);
            loadMockData();
        }
    };

    const loadMockData = () => {
        allArticles = [
            {
                title: "Global Markets Rally as Tech Sector Post Record Profits",
                snippet: "Wall street surges forward after leading technology firms report higher-than-expected quarterly earnings, signaling strong economic resilience.",
                category: "BUSINESS",
                source: "Global Pulse Intelligence",
                time: "10 mins ago",
                imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&q=80",
                link: "#"
            },
            {
                title: "New Advancements in AI Models Reduce Training Costs by 40%",
                snippet: "A consortium of researchers has released a novel architecture that dramatically lowers the compute required for large language models.",
                category: "TECH",
                source: "Global Pulse AI",
                time: "45 mins ago",
                imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=600&q=80",
                link: "#",
                aiGenerated: true
            },
            {
                title: "Global Climate Summit Yields Unprecedented Agreement on Emissions",
                snippet: "World leaders reach a sweeping new accord aimed at limiting global warming, though implementation challenges remain.",
                category: "WORLD",
                source: "Global Pulse Intelligence",
                time: "2 hours ago",
                imageUrl: "https://images.unsplash.com/photo-1611273426858-450d8e3c9cce?w=600&q=80",
                link: "#"
            }
        ];
        renderArticles(allArticles);
    };

    const renderArticles = (articles) => {
        grid.innerHTML = '';
        
        if (articles.length === 0) {
            grid.innerHTML = '<p class="no-news">No news articles found for this category.</p>';
            return;
        }

        articles.forEach((article, index) => {
            const card = document.createElement('article');
            card.className = 'news-card';
            card.style.animationDelay = `${index * 0.1}s`;
            
            const aiBadge = article.aiGenerated ? '<span class="ai-badge">AI ENHANCED</span>' : '';
            
            card.innerHTML = `
                <div class="card-image-wrapper">
                    <img src="${article.imageUrl}" alt="News Image" class="card-image" loading="lazy">
                    <div class="card-overlay"></div>
                    ${aiBadge}
                </div>
                <div class="card-content">
                    <div class="card-meta">
                        <span class="category-tag">${article.category}</span>
                        <span class="card-time">${article.time}</span>
                    </div>
                    <h3 class="card-title">${article.title}</h3>
                    <p class="card-snippet">${article.snippet}</p>
                    <div class="card-footer">
                        <span class="card-source">${article.source}</span>
                        <a href="${article.link}" target="_blank" class="read-more">Read Full Story →</a>
                    </div>
                </div>
            `;
            
            grid.appendChild(card);
        });
    };

    // Category filtering
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.getAttribute('data-category').toUpperCase();
            
            navLinks.forEach(l => l.classList.remove('active'));
            e.target.classList.add('active');
            
            if (category === 'ALL') {
                renderArticles(allArticles);
            } else {
                const filtered = allArticles.filter(a => a.category === category);
                renderArticles(filtered);
            }
        });
    });

    // Initial load
    fetchNews();
});
