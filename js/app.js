document.addEventListener('DOMContentLoaded', () => {
    
    // --- STATE MANAGEMENT ---
    let allArticles = [];
    const tickerContainer = document.getElementById('tickerContainer');
    const newsGrid = document.getElementById('newsGrid');
    
    // Default high-fidelity fallback articles matching editorial guidelines
    const defaultArticles = [
        {
            title: "AI Decentralization: The Next Frontier in Geopolitical News Syndication",
            category: "GEOPOLITICS",
            source: "Global Pulse Intelligence Desk",
            time: "June 16, 2026 • 22:45 UTC",
            imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
            snippet: "Our background Gemini analysis engines observe a significant shift toward localized, multi-agent AI synthesis for hourly copyright-free journalism, reducing dependency on legacy newsrooms."
        },
        {
            title: "Silicon Valley Emerges with Sovereign Energy Grid Solutions for Megawatt AI Datacenters",
            category: "TECH",
            source: "Silicon Valley Tech Team",
            time: "June 16, 2026 • 21:00 UTC",
            imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
            snippet: "Major tech firms are acquiring localized nuclear and hydroelectric power assets to isolate hyperscale AI computing clusters from municipal power grids."
        },
        {
            title: "Federal Reserve Expands Liquidity Swaps to Limit Cross-Border Market Spreads",
            category: "MARKETS",
            source: "Macroeconomic Advisory Desk",
            time: "June 16, 2026 • 18:30 UTC",
            imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
            snippet: "The central bank has initiated dynamic swap pools with three additional foreign jurisdictions to stabilize arbitrage volatility."
        },
        {
            title: "Deep Sea Telecom Cables Upgraded with Post-Quantum Optical Cryptography",
            category: "GEOPOLITICS",
            source: "Global Cybersecurity Desk",
            time: "June 16, 2026 • 15:15 UTC",
            imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
            snippet: "A consortium of security firms has deployed quantum key distribution units across transatlantic subsea trunk lines."
        },
        {
            title: "Quantum Chip Architecture Breaks 2000 Logical Qubits in Silicon-Silicon Layers",
            category: "TECH",
            source: "Sovereign Labs Division",
            time: "June 16, 2026 • 12:45 UTC",
            imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
            snippet: "A breakthrough research group has demonstrated fault-tolerant logic gates using standard commercial fabrication systems."
        },
        {
            title: "Sovereign Debt Tokenization Platform Clears Regulatory Frameworks in EU Jurisdictions",
            category: "MARKETS",
            source: "Compliance News Desk",
            time: "June 16, 2026 • 09:30 UTC",
            imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
            snippet: "Multiple European banks have approved automated settlement corridors for treasury bonds using tokenized compliance contracts."
        }
    ];

    // --- 1. REAL-TIME TICKER CONTROLLER ---
    const initTicker = () => {
        let tickerPrices = {
            'BTC/USD': { price: 67405.20, change: 3.14 },
            'ETH/USD': { price: 3524.80, change: 2.45 },
            'SOL/USD': { price: 154.60, change: 5.89 },
            'S&P 500': { price: 5432.10, change: 0.42 },
            'NASDAQ': { price: 17895.50, change: 0.88 },
            'EUR/USD': { price: 1.0824, change: -0.12 },
            'GOLD/OZ': { price: 2342.50, change: 1.15 }
        };

        const renderTicker = () => {
            if (!tickerContainer) return;
            const itemsHTML = Object.entries(tickerPrices).map(([symbol, data]) => {
                const sign = data.change >= 0 ? '+' : '';
                const dirClass = data.change >= 0 ? 'up' : 'down';
                const formattedPrice = typeof data.price === 'number' && symbol !== 'EUR/USD'
                    ? data.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : data.price;
                return `
                    <div class="ticker-item">
                        <span class="ticker-symbol">${symbol}</span>
                        <span class="ticker-price">${symbol.includes('USD') && !symbol.includes('EUR') ? '$' : ''}${formattedPrice}</span>
                        <span class="ticker-change ${dirClass}">${sign}${data.change.toFixed(2)}%</span>
                    </div>
                `;
            }).join('');
            
            // Double the items for infinite loop scroll continuity
            tickerContainer.innerHTML = itemsHTML + itemsHTML;
        };

        // Live micro-fluctuations simulating active markets
        setInterval(() => {
            Object.keys(tickerPrices).forEach(sym => {
                const changeAmt = (Math.random() - 0.5) * 0.05; // -0.025% to +0.025%
                tickerPrices[sym].price += tickerPrices[sym].price * (changeAmt / 100);
                tickerPrices[sym].change += changeAmt;
            });
            renderTicker();
        }, 3000);

        renderTicker();
    };

    // --- 2. PULSE AI TV VIDEO INTERACTION ---
    const initTV = () => {
        const tvVideoIframe = document.getElementById('tvVideoIframe');
        const tvHeadline = document.getElementById('tvHeadline');
        const tvCaptions = document.getElementById('tvCaptions');
        const tvDescription = document.getElementById('tvDescription');
        const tvLiveClock = document.getElementById('tvLiveClock');
        const channelBtns = document.querySelectorAll('.tv-channel-btn');
        const muteToggle = document.getElementById('tvMuteToggle');
        const playToggle = document.getElementById('tvPlayToggle');
        const waveBars = document.querySelectorAll('.tv-wave-bar');

        let isMuted = true;
        let isPlaying = true;

        const channels = {
            world: {
                title: "PULSE AI TV // GEOPOLITICAL LOG",
                caption: "Scanning primary subsea trunk routing. Summarizing security upgrades in post-quantum optics...",
                desc: "Autonomous global intelligence briefs generated using Google Veo video engines. Analyzing transatlantic optic layouts, sovereign borders, and satellite communications corridors in real-time.",
                url: "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=jfKfPfyJRdk"
            },
            tech: {
                title: "PULSE AI TV // TECH FRONTIER",
                caption: "Compiling micro-grid datasets. Analyzing datacenter reactor acquisitions in Silicon Valley...",
                desc: "Exploring megawatt datacenter infrastructure pivots. Monitoring off-grid nuclear acquisitions, silicon logical qubit breakthroughs, and quantum encryption deployments.",
                url: "https://www.youtube.com/embed/S29G3r1m2f0?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=S29G3r1m2f0"
            },
            markets: {
                title: "PULSE AI TV // FINANCIAL MARKETS",
                caption: "Monitoring Federal Reserve liquidity nodes. Analyzing G7 spot swap corridors...",
                desc: "Live macro analysis streams powered by Gemini engines. Synthesizing central bank swaps, tokenized sovereign debt, multi-chain order books, and global rate telemetry.",
                url: "https://www.youtube.com/embed/1K3L5nL8tV8?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=1K3L5nL8tV8"
            }
        };

        // Live Clock (UTC)
        const updateClock = () => {
            if (!tvLiveClock) return;
            const now = new Date();
            tvLiveClock.innerText = now.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
        };
        setInterval(updateClock, 1000);
        updateClock();

        // Channel Selectors
        channelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                channelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const ch = btn.getAttribute('data-channel');
                if (channels[ch]) {
                    tvHeadline.innerText = channels[ch].title;
                    tvCaptions.innerText = channels[ch].caption;
                    tvDescription.innerText = channels[ch].desc;
                    
                    // Maintain mute/play states while swapping src
                    let srcUrl = channels[ch].url;
                    if (!isMuted) srcUrl = srcUrl.replace('mute=1', 'mute=0');
                    if (!isPlaying) srcUrl = srcUrl.replace('autoplay=1', 'autoplay=0');
                    
                    tvVideoIframe.src = srcUrl;
                }
            });
        });

        // Mute / Unmute
        if (muteToggle) {
            muteToggle.addEventListener('click', () => {
                isMuted = !isMuted;
                muteToggle.innerText = isMuted ? '🔇' : '🔊';
                
                let currentSrc = tvVideoIframe.src;
                if (isMuted) {
                    currentSrc = currentSrc.replace('mute=0', 'mute=1');
                } else {
                    currentSrc = currentSrc.replace('mute=1', 'mute=0');
                }
                tvVideoIframe.src = currentSrc;
            });
        }

        // Play / Pause
        if (playToggle) {
            playToggle.addEventListener('click', () => {
                isPlaying = !isPlaying;
                playToggle.innerText = isPlaying ? '⏸' : '▶';
                
                // Toggle animated waveform visualization
                waveBars.forEach(bar => {
                    bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
                });

                // Simulate play pause by swapping parameters or reloading
                let currentSrc = tvVideoIframe.src;
                if (isPlaying) {
                    currentSrc = currentSrc.replace('autoplay=0', 'autoplay=1');
                } else {
                    currentSrc = currentSrc.replace('autoplay=1', 'autoplay=0');
                }
                tvVideoIframe.src = currentSrc;
            });
        }
    };

    // --- 3. DYNAMIC NEWS LOADER & RENDERING ---
    const initNews = async () => {
        try {
            console.log("Fetching automated Gemini articles...");
            const res = await fetch(`data/news.json?t=${Date.now()}`);
            if (!res.ok) throw new Error('Data Desk Offline');
            allArticles = await res.json();
        } catch (err) {
            console.warn("Failed to fetch news.json. Activating default fallback database.", err);
            allArticles = defaultArticles;
        }

        renderArticles(allArticles);
    };

    const renderArticles = (articles) => {
        if (!articles || articles.length === 0) return;

        // 1. Render Cover Story (Item 0)
        const cover = articles[0];
        const coverTitle = document.getElementById('coverStoryTitle');
        const coverImage = document.getElementById('coverStoryImage');
        const coverSnippet = document.getElementById('coverStorySnippet');
        const coverMeta = document.getElementById('coverStoryMeta');
        const coverLink = document.getElementById('coverStoryLink');

        if (coverTitle) coverTitle.innerText = cover.title;
        if (coverSnippet) coverSnippet.innerText = cover.snippet;
        if (coverImage && cover.imageUrl) coverImage.src = cover.imageUrl;
        if (coverMeta) coverMeta.innerText = `By ${cover.source || 'Global Pulse Desk'} • ${cover.time || 'June 16, 2026'}`;
        if (coverLink) coverLink.href = `article.html?id=cover`;

        // 2. Render Remaining Articles in 3-Column Masonry Grid
        const gridArticles = articles.slice(1);
        if (!newsGrid) return;

        if (gridArticles.length === 0) {
            newsGrid.innerHTML = `<div class="error-panel">Scanning network nodes for additional stories...</div>`;
            return;
        }

        newsGrid.innerHTML = gridArticles.map((a, i) => {
            const originalIndex = articles.indexOf(a);
            return `
                <article class="masonry-item">
                    ${a.imageUrl ? `
                    <div class="masonry-item-image-wrap">
                        <img src="${a.imageUrl}" alt="${a.title}" class="masonry-item-image" onerror="this.src='https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=600'">
                    </div>
                    ` : ''}
                    <div class="masonry-item-content">
                        <div class="masonry-item-meta">
                            <span class="category-tag">${a.category || 'GLOBAL'}</span>
                            <span>${a.time ? a.time.split('•')[0].trim() : 'June 16, 2026'}</span>
                        </div>
                        <a href="article.html?id=${originalIndex}">
                            <h3 class="masonry-item-title">${a.title}</h3>
                        </a>
                        <p class="masonry-item-snippet">${a.snippet}</p>
                        <a href="article.html?id=${originalIndex}" class="masonry-read-more">Read Local Report</a>
                    </div>
                </article>
            `;
        }).join('');
    };

    // --- 4. NEWS CATEGORY FILTERS & CATEGORY NAVIGATION ---
    const initFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const headerNavLinks = document.querySelectorAll('.main-nav .nav-link');

        const applyFilter = (category) => {
            // Update filter bar button active state
            filterBtns.forEach(btn => {
                const btnFilter = btn.getAttribute('data-filter');
                if (btnFilter === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Update header navigation active state
            headerNavLinks.forEach(link => {
                const linkCat = link.getAttribute('data-category');
                if (linkCat === category) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            // Filter articles and re-render grid
            if (category === 'all') {
                renderArticles(allArticles);
            } else {
                const filtered = allArticles.filter(a => a.category && a.category.toLowerCase() === category.toLowerCase());
                
                // If the cover story matches, keep it as cover, otherwise swap it with first matching
                if (filtered.length > 0) {
                    renderArticles(filtered);
                } else {
                    if (newsGrid) {
                        newsGrid.innerHTML = `
                            <div class="error-panel" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary); font-family: var(--font-mono);">
                                No stories logged under ${category.toUpperCase()} category in the last 24 hours.
                            </div>
                        `;
                    }
                }
            }
        };

        // Grid filter bar buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const filter = btn.getAttribute('data-filter');
                applyFilter(filter);
            });
        });

        // Header nav links
        headerNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const cat = link.getAttribute('data-category');
                applyFilter(cat);
                
                // Smooth scroll to news grid section
                const targetSec = document.querySelector('.feed-grid-section');
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    };

    // --- 5. RESPONSIVE MOBILE MENU ---
    const initMobileMenu = () => {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const mainNavigation = document.getElementById('mainNavigation');

        if (mobileMenuBtn && mainNavigation) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenuBtn.classList.toggle('active');
                
                if (mainNavigation.style.display === 'block') {
                    mainNavigation.style.display = 'none';
                } else {
                    mainNavigation.style.display = 'block';
                    mainNavigation.style.position = 'absolute';
                    mainNavigation.style.top = '80px';
                    mainNavigation.style.left = '0';
                    mainNavigation.style.width = '100%';
                    mainNavigation.style.backgroundColor = 'var(--bg-obsidian)';
                    mainNavigation.style.borderBottom = '1px solid var(--border-color)';
                    mainNavigation.style.padding = '20px';
                    
                    const navUl = mainNavigation.querySelector('ul');
                    if (navUl) {
                        navUl.style.flexDirection = 'column';
                        navUl.style.gap = '15px';
                        navUl.style.alignItems = 'center';
                    }
                }
            });
        }
    };

    // --- INITIALIZE ALL COMPONENTS ---
    initTicker();
    initTV();
    // initNews().then(() => {
    //     initFilters();
    // });
    initMobileMenu();
});
