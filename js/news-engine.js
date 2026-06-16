document.addEventListener('DOMContentLoaded', () => {
    
    // --- MOCK CONTENT STUBS DATABASE (Luxury Editorial Tone) ---
    const stubs = {
        celebrity: [
            {
                title: "Alistair Sterling Unveils Off-Grid Geothermal Sanctuary in Iceland",
                category: "Celebrity",
                source: "Global Pulse Elite Life",
                time: "June 16, 2026 • 20:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
                snippet: "The sovereign cinematic icon has revealed a private, zero-emission geothermal reserve engineered for absolute seclusion and ecological balance.",
                content: `
                    <p><strong>REYKJAVIK, ICELAND</strong> — Award-winning actor and environmental advocate Alistair Sterling has officially opened his privately funded geothermal eco-sanctuary in the Icelandic highlands. The project, which took over three years of delicate architectural planning, is designed to serve as a blueprint for luxury off-grid living that generates zero carbon footprint.</p>
                    <blockquote>
                        "Seclusion should not come at the cost of the planet. By harnessing natural geothermal fissures and using recycled local volcanic basalt, we've built a retreat that is completely self-sustaining."
                    </blockquote>
                    <h2>Volcanic Integration & Design</h2>
                    <p>Built directly into the volcanic rock face, the sanctuary features passive geothermal heating, custom greywater filtration systems, and a micro-hydroelectric array. The interior design combines Scandinavian minimalism with reclaimed materials, highlighting deep obsidian finishes and warm timber layouts.</p>
                `
            },
            {
                title: "Sovereign Cinematic Icon Wins Best Director at Cannes Film Festival",
                category: "Celebrity",
                source: "Cannes Media Desk",
                time: "June 15, 2026 • 19:15 UTC",
                imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
                snippet: "In a historic sweep, director Julian Vance's obsidian-themed silent epic secures the Palm d'Or for artistic cinematography.",
                content: `
                    <p><strong>CANNES, FRANCE</strong> — Julian Vance's highly anticipated silent black-and-white epic has claimed top honors at the 79th Cannes Film Festival. The film, lauded by critics as a visual masterpiece, utilizes dramatic contrast and deep shadow architecture to tell an allegorical story of the digital age.</p>
                    <p>Vance dedicated the award to his engineering teams, who custom-built optical lenses capable of capturing ultra-high definition contrast ratios in low-light environments without digital noise artifacts.</p>
                `
            },
            {
                title: "Global Icon's Venture Fund Backs Next-Gen AI Talent Management Network",
                category: "Celebrity",
                source: "Entertainment Venture Capital",
                time: "June 14, 2026 • 14:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
                snippet: "Sovereign actor-investor partnerships pool $120M to secure copyright encryption licensing for virtual celebrity models.",
                content: `
                    <p><strong>LOS ANGELES, CA</strong> — A new investment consortium led by top Hollywood figures has announced a $120 million seed round for Talos Systems, a company specializing in cryptographic identity locks for digital actors. The technology allows stars to securely license their likenesses and voices for animated productions while preventing unauthorized deepfakes.</p>
                `
            }
        ],
        style: [
            {
                title: "The Rise of Obsidian Tailoring: Minimalism Dominates Milan Fashion Week",
                category: "Style",
                source: "Milan Editorial Desk",
                time: "June 16, 2026 • 18:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800",
                snippet: "Design houses reject colorful palettes in favor of structured architectural garments featuring deep carbon weaves and clean contours.",
                content: `
                    <p><strong>MILAN, ITALY</strong> — Structured architectural minimalism has taken center stage in Milan this week. Top design houses showcased collections built entirely from carbon-neutral smart fabrics, prioritizing clean sharp lines, hidden utility pockets, and raw texturizations.</p>
                    <blockquote>
                        "Luxury is no longer about decorative excess; it is defined by fabric integrity and geometric precision. We are tailoring garments that act as protective, functional shells for the modern urban landscape."
                    </blockquote>
                    <h2>Obsidian Fabric Engineering</h2>
                    <p>The collections highlight advanced textiles made from recycled carbon fiber and organic hemp threads. These garments provide natural thermoregulation and water repellency, matching style with modern performance requirements.</p>
                `
            },
            {
                title: "Emerald Accents: High Jewelry Houses Pivot to Sustainable Geothermal Emeralds",
                category: "Style",
                source: "Luxury Jewelry Report",
                time: "June 15, 2026 • 16:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
                snippet: "Sartorial leaders highlight laboratory-grown emerald crystals synthesized using direct geothermal heat pressure systems.",
                content: `
                    <p><strong>GENEVA</strong> — Prominent jewelry brands have debuted collections featuring laboratory-grown emeralds powered entirely by geothermal energy. The stones, indistinguishable from mined equivalents, represent a major shift toward circular luxury and carbon-neutral gemstones.</p>
                `
            },
            {
                title: "Sartorial Architecture: The Fusion of High-Performance Textiles and Haute Couture",
                category: "Style",
                source: "Paris Fashion Journal",
                time: "June 14, 2026 • 11:20 UTC",
                imageUrl: "https://images.unsplash.com/photo-1445205170230-053b830c6038?w=800",
                snippet: "Parisian designers deploy hydrophobic nanotech and kinetic weave fibers in new winter outerwear collections.",
                content: `
                    <p><strong>PARIS</strong> — Parisian design ateliers are collaborating with materials science labs to create dresses and coats that adapt dynamically to ambient humidity and body temperature, creating a new category of intelligent haute couture.</p>
                `
            }
        ],
        football: [
            {
                title: "Sovereign League: European Football Giants Confirm Web3 Ticket Integration",
                category: "Football",
                source: "Sports Business Telemetry",
                time: "June 16, 2026 • 17:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
                snippet: "Champions League executives authorize cryptographic blockchain validation to eliminate ticket scalping and fraudulent distribution.",
                content: `
                    <p><strong>LONDON</strong> — Europe's elite football clubs have collectively agreed to deploy a unified blockchain ticketing standard for all continental competitions starting next season. The new system links ticket ownership directly to secure digital wallets, eliminating resale fraud.</p>
                    <blockquote>
                        "By digitizing ticket allocations via smart contracts, we guarantee that genuine supporters acquire tickets at face value while retaining security and trace transparency."
                    </blockquote>
                    <h2>Anti-Fraud Technology</h2>
                    <p>The smart contracts prevent ticket transfers within 24 hours of kickoff, unless authorized through the official team marketplace. This measure ensures secure venues and removes third-party scalpers from the resale loop.</p>
                `
            },
            {
                title: "Champions League Finals: Real-Time Telemetry Upgrades Stadium Experience",
                category: "Football",
                source: "Athletic Tech Insider",
                time: "June 15, 2026 • 20:15 UTC",
                imageUrl: "https://images.unsplash.com/photo-1577223625856-748b11cca222?w=800",
                snippet: "Ultra-wideband sensors embedded in player jerseys broadcast real-time velocity, distance, and acceleration metrics directly to stadium monitors.",
                content: `
                    <p><strong>MUNICH</strong> — Spectators at the Champions League finals will have access to real-time performance telemetry. Sensors embedded in the players' jerseys transmit physical data points with sub-10ms latency, creating an immersive, data-rich viewing experience.</p>
                `
            },
            {
                title: "Tactical AI: How Predictive Modeling is Redefining Premier League Formations",
                category: "Football",
                source: "Tactical Analysis Desk",
                time: "June 14, 2026 • 15:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1524015368236-bbf6f72545b6?w=800",
                snippet: "Managers employ real-time simulations to anticipate opponent movement and optimize substitution timing during live matches.",
                content: `
                    <p><strong>MANCHESTER</strong> — Premier League coaching staffs are deploying advanced multi-agent simulations to model opponent reaction times and positioning, shifting tactical planning from retrospective video analysis to predictive real-time strategy.</p>
                `
            }
        ],
        tennis: [
            {
                title: "Wimbledon Adopts Real-Time Optical Ball Tracking Powered by Deep Learning",
                category: "Tennis",
                source: "Court Tech Journal",
                time: "June 16, 2026 • 16:15 UTC",
                imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800",
                snippet: "The All England Club replaces manual line judges with high-speed multi-angle cameras tracking ball coordinates within 1 millimeter.",
                content: `
                    <p><strong>WIMBLEDON</strong> — The All England Club has announced the permanent deployment of deep-learning optical tracking systems for all tournament courts. The technology uses 18 synchronized high-frequency cameras to reconstruct ball vectors in real-time.</p>
                    <blockquote>
                        "Human error has been completely removed from court decisions. The optical arrays analyze photon disruption profiles, providing instantaneous, objective out-of-bounds determinations."
                    </blockquote>
                    <h2>Quantum Precision Mechanics</h2>
                    <p>The tracking system operates at 500 frames per second, calculating the exact deformation profile of the tennis ball as it impacts the grass surface. The resulting data is rendered instantly in 3D for broadcast feeds.</p>
                `
            },
            {
                title: "Clay Court Mastery: Telemetry Sensors Analyze Racket-Speed Efficiency",
                category: "Tennis",
                source: "Elite Athletic Performance",
                time: "June 15, 2026 • 14:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800",
                snippet: "Professional players train with piezoelectric fiber rackets that record impact angles, tension fluctuations, and grip pressure.",
                content: `
                    <p><strong>PARIS</strong> — Professional trainers at Roland Garros are employing racket grip telemetry to adjust spin angles. The sensors measure torsional forces and energy dissipation, helping athletes optimize baseline strokes while minimizing joint stress.</p>
                `
            },
            {
                title: "Grand Slam Pioneer Announces Sovereign High-Performance Training Academy",
                category: "Tennis",
                source: "Tennis Association News",
                time: "June 13, 2026 • 10:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=800",
                snippet: "A multi-million dollar facility in Florida features smart clay courts and cryogenic recovery chambers for next-generation athletes.",
                content: `
                    <p><strong>MIAMI, FL</strong> — A state-of-the-art tennis academy focusing on biomechanics and neuro-training has officially broken ground. The campus integrates virtual reality practice courts and custom recovery pods, establishing a new gold standard for junior development.</p>
                `
            }
        ],
        geopolitics: [
            {
                title: "Subsea Cable Treaties: G7 Establishes Quantum Key Distribution Corridors",
                category: "Geopolitics",
                source: "Global Cybersecurity Desk",
                time: "June 16, 2026 • 15:15 UTC",
                imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
                snippet: "A consortium of security firms has deployed quantum key distribution units across transatlantic subsea trunk lines to secure G7 communications.",
                content: `
                    <p><strong>LONDON, UK</strong> — Transatlantic optical cables are being retrofitted with state-of-the-art quantum key distribution (QKD) hardware under a new joint G7 security treaty. The upgrade protects subsea data transmission channels from hypothetical interception by quantum decryptors currently in development by adversarial state actors.</p>
                    <blockquote>
                        "This treaty secures our data backbones for the coming decades. Any physical attempt to tap or read the subsea optical signals collapses the quantum state of the photons, instantly severing the connection and alerting our defense centers."
                    </blockquote>
                    <h2>Deploying Quantum Backbones</h2>
                    <p>The system relies on cryptographic keys encoded on single photons. If an unauthorized party attempts to measure the photons, their wavefunctions collapse, causing transmission errors that alert administrators of the intrusion within milliseconds.</p>
                `
            },
            {
                title: "Rare Earth Reserves: Greenland Sovereign Wealth Fund Expands Extraction Infrastructure",
                category: "Geopolitics",
                source: "Arctic Policy Institute",
                time: "June 15, 2026 • 11:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800",
                snippet: "Sovereign entities authorize clean-energy mineral extractions, establishing supply chain corridors independent of East Asian logistics monopolies.",
                content: `
                    <p><strong>NUUK, GREENLAND</strong> — The government of Greenland has approved a joint venture with European mining consortiums to begin extraction of major neodymium and dysprosium deposits, securing supply corridors for next-generation turbine magnets and electronics.</p>
                `
            },
            {
                title: "Decentralized Diplomacy: Multi-Agent AI Models Simulate Treaty Resolutions",
                category: "Geopolitics",
                source: "International Relations Desk",
                time: "June 14, 2026 • 09:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
                snippet: "Sovereign policy institutes utilize multi-agent simulations to model boundary disputes and trade tariffs prior to bilateral negotiations.",
                content: `
                    <p><strong>GENEVA</strong> — Research labs are deploying multi-agent models to simulate diplomatic negotiations. The systems execute millions of tariff configurations and border resolutions, helping negotiators anticipate compromises and draft treaties in a fraction of the time.</p>
                `
            }
        ],
        markets: [
            {
                title: "Sovereign Debt Tokens: European Banks Finalize Settlement Channels",
                category: "Markets",
                source: "Global Finance Desk",
                time: "June 16, 2026 • 18:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800",
                snippet: "Multiple European banks have approved automated settlement corridors for treasury bonds using tokenized compliance contracts.",
                content: `
                    <p><strong>GENEVA, SWITZERLAND</strong> — A consortium of central and commercial banks has successfully settled a €500 million sovereign bond transaction using tokenized smart contracts on a regulated ledger, proving that instant clearing is viable within existing regulatory frameworks.</p>
                    <blockquote>
                        "Tokenization eliminates multi-day clearing risks. By locking collateral cryptographically and triggering instant swaps, we remove clearinghouses and reduce settlement overhead to zero."
                    </blockquote>
                    <h2>Clearing Architecture</h2>
                    <p>The transaction utilized digital compliance wrappers that automatically verified KYC requirements of the participating institutions before authorizing the swap, validating on-chain compliance models.</p>
                `
            },
            {
                title: "Cross-Border Liquidity Swaps: Central Banks Limit Triangular Arbitrage",
                category: "Markets",
                source: "Macroeconomic Advisory Desk",
                time: "June 15, 2026 • 13:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
                snippet: "The central bank has initiated dynamic swap pools with three additional foreign jurisdictions to stabilize exchange rate arbitrage volatility.",
                content: `
                    <p><strong>NEW YORK</strong> — The Federal Reserve announced an expansion of its currency liquidity swap lines, aiming to counteract arbitrage spreads in international trading pairs. The intervention is expected to bring down spot discrepancy ranges and prevent institutional slippage across G7 currencies.</p>
                `
            },
            {
                title: "Obsidian Hedge Fund Reports Record Yields Using High-Frequency Sentiment Scanners",
                category: "Markets",
                source: "Quantitative Finance Hub",
                time: "June 14, 2026 • 10:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
                snippet: "Algorithms scraping decentralized news feeds and social tickers achieve superior risk-adjusted alpha in sovereign commodities trading.",
                content: `
                    <p><strong>CHICAGO, IL</strong> — Obsidian Capital has posted record quarterly profits, attributing their success to machine learning systems that analyze alternative data feeds and news sentiment telemetry, enabling predictive execution before traditional reports release.</p>
                `
            }
        ]
    };

    // Store stubs globally for the article reader page to access
    window.newsStubs = stubs;

    // --- NEWS FILTERING & OVERHAUL ENGINE ---
    let allArticles = [];
    const newsGrid = document.getElementById('newsGrid');
    
    // UI Selectors
    const filterBtns = document.querySelectorAll('.filter-btn');
    const headerNavLinks = document.querySelectorAll('.main-nav .nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');

    // Fetch primary articles
    const fetchArticles = async () => {
        try {
            const res = await fetch(`data/news.json?t=${Date.now()}`);
            if (!res.ok) throw new Error('Data Desk Offline');
            allArticles = await res.json();
        } catch (err) {
            console.warn("Using fallback news articles.", err);
            allArticles = [
                {
                    title: "AI Decentralization: The Next Frontier in Geopolitical News Syndication",
                    category: "Geopolitics",
                    source: "Global Pulse Intelligence Desk",
                    time: "June 16, 2026 • 22:45 UTC",
                    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
                    snippet: "Our background Gemini analysis engines observe a significant shift toward localized, multi-agent AI synthesis for hourly copyright-free journalism, reducing dependency on legacy newsrooms."
                },
                ...stubs.geopolitics.slice(1),
                ...stubs.markets.slice(1)
            ];
        }

        // Initially render everything
        renderArticles(allArticles);
    };

    // Render Articles into grid
    const renderArticles = (articles, selectedCategory = 'all', injectStubs = null) => {
        if (!newsGrid) return;
        
        let displayArticles = [...articles];
        
        // Filter out if category is selected and not 'all'
        if (selectedCategory !== 'all') {
            displayArticles = articles.filter(a => {
                const categoryMatch = a.category && a.category.toLowerCase() === selectedCategory.toLowerCase();
                // Match parent categories like sports and entertainment
                if (selectedCategory.toLowerCase() === 'sports') {
                    return categoryMatch || (a.category && ['football', 'tennis'].includes(a.category.toLowerCase()));
                }
                if (selectedCategory.toLowerCase() === 'entertainment') {
                    return categoryMatch || (a.category && ['celebrity', 'style'].includes(a.category.toLowerCase()));
                }
                return categoryMatch;
            });
        }

        // Inject high-end content stubs if requested
        if (injectStubs && stubs[injectStubs]) {
            // Map stubs to include a flag so the reader page knows they are stubs
            const preparedStubs = stubs[injectStubs].map((s, idx) => ({
                ...s,
                isStub: true,
                stubCategory: injectStubs,
                stubIndex: idx
            }));
            
            // Prepend stubs to make them front & center
            displayArticles = [...preparedStubs, ...displayArticles];
        }

        if (displayArticles.length === 0) {
            newsGrid.innerHTML = `
                <div class="error-panel" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary); font-family: var(--font-mono);">
                    No articles found for ${selectedCategory.toUpperCase()}.
                </div>
            `;
            return;
        }

        // Render Masonry Cards
        newsGrid.innerHTML = displayArticles.map((a, i) => {
            const isStub = a.isStub === true;
            const linkPath = isStub 
                ? `article.html?type=stub&category=${a.stubCategory}&index=${a.stubIndex}`
                : `article.html?id=${allArticles.indexOf(a) !== -1 ? allArticles.indexOf(a) : 0}`;

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
                        <a href="${linkPath}">
                            <h3 class="masonry-item-title">${a.title}</h3>
                        </a>
                        <p class="masonry-item-snippet">${a.snippet}</p>
                        <a href="${linkPath}" class="masonry-read-more">Read Local Report</a>
                    </div>
                </article>
            `;
        }).join('');
    };

    // --- Dynamic Filter Trigger System (WITHOUT Viewport Scrolling) ---
    const triggerFilter = (category) => {
        console.log(`Filtering by category: ${category}`);
        
        // Update Grid Filter Buttons active states
        filterBtns.forEach(btn => {
            const btnFilter = btn.getAttribute('data-filter');
            if (btnFilter === category) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Header Navigation link active states
        headerNavLinks.forEach(link => {
            const linkCat = link.getAttribute('data-category');
            if (linkCat === category) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Map sub-category filters to their respective stubs index key
        const stubMap = {
            'celebrity': 'celebrity',
            'style': 'style',
            'football': 'football',
            'tennis': 'tennis',
            'geopolitics': 'geopolitics',
            'markets': 'markets',
            'sports': 'football', // default stub for sports
            'entertainment': 'celebrity' // default stub for entertainment
        };

        const injectKey = stubMap[category.toLowerCase()] || null;
        renderArticles(allArticles, category, injectKey);
    };

    // Wire up Grid filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = btn.getAttribute('data-filter');
            triggerFilter(filter);
        });
    });

    // Wire up main nav links
    headerNavLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const cat = link.getAttribute('data-category');
            if (cat) {
                e.preventDefault();
                triggerFilter(cat);
                
                // Focus on grid without scrolling up to top
                const targetSec = document.querySelector('.feed-grid-section');
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // Wire up dropdown items (Celebrity, Style, Football, Tennis)
    dropdownItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const subCat = item.getAttribute('data-category');
            if (subCat) {
                triggerFilter(subCat);
                
                // Focus on grid section
                const targetSec = document.querySelector('.feed-grid-section');
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }
        });
    });

    // Initialize Fetch
    fetchArticles();
});
