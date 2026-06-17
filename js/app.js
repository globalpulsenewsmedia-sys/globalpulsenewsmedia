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
    // --- 2. PULSE AI TV TELEMETRY RADAR ENGINE ---
    const initTV = () => {
        const canvas = document.getElementById('tvRadarCanvas');
        const tvHeadline = document.getElementById('tvHeadline');
        const tvCaptions = document.getElementById('tvCaptions');
        const tvDescription = document.getElementById('tvDescription');
        const tvLiveClock = document.getElementById('tvLiveClock');
        const channelBtns = document.querySelectorAll('.tv-channel-btn');
        const muteToggle = document.getElementById('tvMuteToggle');
        const playToggle = document.getElementById('tvPlayToggle');
        const waveBars = document.querySelectorAll('.tv-wave-bar');

        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        let isMuted = true;
        let isPlaying = true;
        let angle = 0;
        const targets = [];

        // Resize canvas to match bounds
        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * (window.devicePixelRatio || 1);
            canvas.height = rect.height * (window.devicePixelRatio || 1);
        };
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        const channels = {
            world: {
                title: "PULSE AI TV // GEOPOLITICAL LOG",
                caption: "Scanning primary subsea trunk routing. Summarizing security upgrades in post-quantum optics...",
                desc: "Autonomous global intelligence briefs generated using Google Veo video engines. Analyzing transatlantic optic layouts, sovereign borders, and satellite communications corridors in real-time."
            },
            tech: {
                title: "PULSE AI TV // TECH FRONTIER",
                caption: "Compiling micro-grid datasets. Analyzing datacenter reactor acquisitions in Silicon Valley...",
                desc: "Exploring megawatt datacenter infrastructure pivots. Monitoring off-grid nuclear acquisitions, silicon logical qubit breakthroughs, and quantum encryption deployments."
            },
            markets: {
                title: "PULSE AI TV // FINANCIAL MARKETS",
                caption: "Monitoring Federal Reserve liquidity nodes. Analyzing G7 spot swap corridors...",
                desc: "Live macro analysis streams powered by Gemini engines. Synthesizing central bank swaps, tokenized sovereign debt, multi-chain order books, and global rate telemetry."
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

        // Generate target blips
        const addTarget = () => {
            if (targets.length > 5) return;
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;
            const maxRadius = Math.min(cx, cy) * 0.9;
            const r = Math.random() * maxRadius;
            const theta = Math.random() * Math.PI * 2;
            targets.push({
                x: cx + r * Math.cos(theta),
                y: cy + r * Math.sin(theta),
                alpha: 1.0,
                id: 'TRG-' + Math.floor(Math.random() * 9000 + 1000)
            });
        };

        // Draw radar
        const drawRadar = () => {
            if (!isPlaying) return;
            
            const w = canvas.width;
            const h = canvas.height;
            const cx = w / 2;
            const cy = h / 2;
            const maxRadius = Math.min(cx, cy) * 0.85;

            // Clear with slight alpha to create sweep tail trail
            ctx.fillStyle = 'rgba(5, 5, 5, 0.08)';
            ctx.fillRect(0, 0, w, h);

            // Draw concentric range rings
            ctx.strokeStyle = 'rgba(0, 230, 118, 0.1)';
            ctx.lineWidth = 1;
            for (let i = 1; i <= 4; i++) {
                ctx.beginPath();
                ctx.arc(cx, cy, maxRadius * (i / 4), 0, Math.PI * 2);
                ctx.stroke();
            }

            // Draw crosshairs
            ctx.beginPath();
            ctx.moveTo(cx - maxRadius, cy);
            ctx.lineTo(cx + maxRadius, cy);
            ctx.moveTo(cx, cy - maxRadius);
            ctx.lineTo(cx, cy + maxRadius);
            ctx.stroke();

            // Draw sweep line
            ctx.strokeStyle = 'rgba(0, 230, 118, 0.5)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.lineTo(cx + maxRadius * Math.cos(angle), cy + maxRadius * Math.sin(angle));
            ctx.stroke();

            // Draw sweep gradient fan
            ctx.fillStyle = 'rgba(0, 230, 118, 0.02)';
            ctx.beginPath();
            ctx.moveTo(cx, cy);
            ctx.arc(cx, cy, maxRadius, angle - 0.3, angle);
            ctx.closePath();
            ctx.fill();

            // Draw target blips
            targets.forEach((t, index) => {
                ctx.fillStyle = `rgba(0, 230, 118, ${t.alpha})`;
                ctx.beginPath();
                ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
                ctx.fill();

                // Target tag
                ctx.font = '8px monospace';
                ctx.fillStyle = `rgba(0, 230, 118, ${t.alpha * 0.7})`;
                ctx.fillText(t.id, t.x + 8, t.y - 4);

                // Fade target
                t.alpha -= 0.005;
                if (t.alpha <= 0) {
                    targets.splice(index, 1);
                }
            });

            // Randomly insert target
            if (Math.random() < 0.01) {
                addTarget();
            }

            // Draw overlay telemetry stats on canvas
            ctx.font = '9px monospace';
            ctx.fillStyle = 'rgba(0, 230, 118, 0.6)';
            ctx.fillText(`SWEEP ANGLE: ${(angle * (180 / Math.PI)).toFixed(1)}°`, 15, 20);
            ctx.fillText(`TARGET COUNT: ${targets.length}`, 15, 32);
            ctx.fillText(`GRID LOCK: TRUE`, 15, 44);
            ctx.fillText(`SYS FREQ: 5.8 GHz`, w - 110, 20);
            ctx.fillText(`LATENCY: 14ms`, w - 110, 32);

            // Increment sweep angle
            angle += 0.015;
            if (angle > Math.PI * 2) angle = 0;
        };

        const loop = () => {
            drawRadar();
            requestAnimationFrame(loop);
        };
        loop();

        // Channel selector events
        channelBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                channelBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const ch = btn.getAttribute('data-channel');
                if (channels[ch]) {
                    tvHeadline.innerText = channels[ch].title;
                    tvCaptions.innerText = channels[ch].caption;
                    tvDescription.innerText = channels[ch].desc;
                    
                    // Trigger dynamic target burst for visual feedback
                    for (let i = 0; i < 3; i++) addTarget();
                }
            });
        });

        // Mute toggle (visual audio wave indicator toggle)
        if (muteToggle) {
            muteToggle.addEventListener('click', () => {
                isMuted = !isMuted;
                muteToggle.innerText = isMuted ? '🔇' : '🔊';
                
                waveBars.forEach(bar => {
                    bar.style.display = isMuted ? 'none' : 'block';
                });
            });
        }

        // Play/Pause toggle
        if (playToggle) {
            playToggle.addEventListener('click', () => {
                isPlaying = !isPlaying;
                playToggle.innerText = isPlaying ? '⏸' : '▶';
                
                waveBars.forEach(bar => {
                    bar.style.animationPlayState = isPlaying ? 'running' : 'paused';
                });
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
