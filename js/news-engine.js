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
                content: `<p><strong>REYKJAVIK, ICELAND</strong> — Award-winning actor and environmental advocate Alistair Sterling has officially opened his privately funded geothermal eco-sanctuary in the Icelandic highlands. The project is designed to serve as a blueprint for luxury off-grid living that generates zero carbon footprint.</p>`
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
                content: `<p><strong>MILAN, ITALY</strong> — Structured architectural minimalism has taken center stage in Milan this week. Top design houses showcased collections built entirely from carbon-neutral smart fabrics, prioritizing clean sharp lines.</p>`
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
                content: `<p><strong>LONDON, UK</strong> — Europe's elite football clubs have collectively agreed to deploy a unified blockchain ticketing standard starting next season to eliminate resale fraud.</p>`
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
                content: `<p><strong>WIMBLEDON</strong> — The All England Club has announced the permanent deployment of deep-learning optical tracking systems for all tournament courts, calculating the exact deformation profile of the tennis ball.</p>`
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
                content: `<p><strong>LONDON, UK</strong> — Transatlantic optical cables are being retrofitted with state-of-the-art quantum key distribution (QKD) hardware under a new joint G7 security treaty.</p>`
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
                content: `<p><strong>GENEVA, SWITZERLAND</strong> — A consortium of central and commercial banks has successfully settled a €500 million sovereign bond transaction using tokenized smart contracts on a regulated ledger.</p>`
            }
        ],
        world: [
            {
                title: "Global Supply Corridors Adaptive Route Optimization Restructures Maritime Shipping",
                category: "World News",
                source: "Global Trade Desk",
                time: "June 16, 2026 • 12:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800",
                snippet: "International cargo operators implement predictive AI pathfinding to redirect shipping containers ahead of regional logistics bottlenecks.",
                content: `<p><strong>SINGAPORE</strong> — Major maritime carriers have deployed dynamic routing arrays, bypassing crowded ports and lowering transatlantic container transit times by 14%.</p>`
            }
        ],
        us: [
            {
                title: "US Supercomputing Centers Launch Clean Grid Partnerships to Power Research Datacenter Blocks",
                category: "US News",
                source: "Federal Tech Journal",
                time: "June 16, 2026 • 13:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
                snippet: "National laboratories secure dedicated clean energy feedlines to ensure continuous operation of next-generation hypercomputing units.",
                content: `<p><strong>OAK RIDGE, TN</strong> — Collaborative agreements link municipal solar arrays and geothermal units directly to national research clusters, establishing off-grid power stability.</p>`
            }
        ],
        uspolitics: [
            {
                title: "Bipartisan Digital Assets Bill Proposes Standardized Smart Contract Auditing Rules",
                category: "US Politics",
                source: "Congressional Report",
                time: "June 16, 2026 • 10:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800",
                snippet: "Legislators introduce regulatory frameworks defining structural standards and security benchmarks for code-enforced transactions.",
                content: `<p><strong>WASHINGTON D.C.</strong> — The proposed bill establishes federal guidelines for cryptographic logic verification, aiming to reduce consumer risks in decentralized systems.</p>`
            }
        ],
        business: [
            {
                title: "Corporate Liquid Assets Shift Toward Regulated Institutional Blockchain Accounts",
                category: "Business",
                source: "Wall Street Advisory",
                time: "June 16, 2026 • 09:15 UTC",
                imageUrl: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
                snippet: "Fortune 500 treasurers allocate cash reserves into regulated yield tokens, achieving settlement efficiency and transparency.",
                content: `<p><strong>NEW YORK, NY</strong> — Commercial banking entities report a significant migration of treasury reserves toward tokenized balance sheets, optimizing global corporate payouts.</p>`
            }
        ],
        economy: [
            {
                title: "Global Inflation Models Recalibrate Around Regionalized Renewable Power Costs",
                category: "Economy",
                source: "Macroeconomic Review",
                time: "June 16, 2026 • 11:20 UTC",
                imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
                snippet: "Economists note a direct correlation between manufacturing cost variance and the presence of localized clean energy grids.",
                content: `<p><strong>LONDON</strong> — Comprehensive economic indices suggest that areas with stable geothermal or solar infrastructures exhibit lower long-term commodity price volatility.</p>`
            }
        ],
        finance: [
            {
                title: "Decentralized Liquidity Arrays Settle Record Volumes Without Central Intermediaries",
                category: "Finance",
                source: "Quantum Finance Hub",
                time: "June 16, 2026 • 08:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
                snippet: "Regulated on-chain order books report high-velocity settlements, proving capacity to handle institutional trading activity.",
                content: `<p><strong>ZURICH</strong> — Regulated financial frameworks settle record trading activity in euro-denominated debt tokens, showcasing the capabilities of automated compliance layers.</p>`
            }
        ],
        tech: [
            {
                title: "Quantum Chip Architecture Breaks 2000 Logical Qubits in Silicon-Silicon Layers",
                category: "Technology",
                source: "Sovereign Labs Division",
                time: "June 16, 2026 • 12:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=800",
                snippet: "A breakthrough research group has demonstrated fault-tolerant logic gates using standard commercial fabrication systems.",
                content: `<p><strong>SAN JOSE, CA</strong> — Microelectronics consortia achieve silicon qubit scale, bringing cryptographic research steps closer to full commercial feasibility.</p>`
            }
        ],
        ai: [
            {
                title: "Edge LLM Networks Achieved Real-Time Multi-Agent Task Orchestration in Devices",
                category: "Artificial Intelligence",
                source: "Neural Computing Hub",
                time: "June 16, 2026 • 14:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
                snippet: "Specialized model parameters allow mobile units to execute complex diagnostic reasoning without server connection delays.",
                content: `<p><strong>BOSTON, MA</strong> — Micro-model weights optimized for low-power silicon processors complete recursive logical planning steps on-device, preserving data privacy.</p>`
            }
        ],
        cybersecurity: [
            {
                title: "Zero-Trust Protocol Architectures Mitigate Automated Supply Chain Intrusion Attacks",
                category: "Cybersecurity",
                source: "SecOps Intelligence",
                time: "June 16, 2026 • 15:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800",
                snippet: "Security systems adopt cryptographic trust verification layers, isolating code blocks to prevent database corruption.",
                content: `<p><strong>AUSTIN, TX</strong> — Implementation of zero-trust verification rules across cloud deployments successfully isolates malicious dependency updates before installation.</p>`
            }
        ],
        biotech: [
            {
                title: "Synthetic Gene Synthesis Accelerates Targeted Therapy Development Cycles",
                category: "Biotech",
                source: "Molecular Health Report",
                time: "June 16, 2026 • 16:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800",
                snippet: "Algorithmic protein folding models identify customized enzymes to target molecular mutations in record time.",
                content: `<p><strong>CAMBRIDGE, MA</strong> — Medical research platforms synthesize custom enzymes to block cellular replication pathways, moving molecules to clinical trials.</p>`
            }
        ],
        travel: [
            {
                title: "Sustainable Expedition Vessels Chart Geothermal Passage Routes in Antarctic Waters",
                category: "Travel",
                source: "Eco Explorer Log",
                time: "June 16, 2026 • 10:15 UTC",
                imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
                snippet: "Polar research-guided tourism ships deploy zero-emission electric motors powered by recycled thermal hydrogen.",
                content: `<p><strong>USHUAIA, ARGENTINA</strong> — Advanced expedition yachts complete carbon-neutral navigations of polar bays, leveraging solar sails and hydrogen storage.</p>`
            }
        ],
        luxury: [
            {
                title: "Hyper-Custom Architectural Reserves Redefine Ecological Luxury Living Standards",
                category: "Luxury",
                source: "Sartorial Living",
                time: "June 16, 2026 • 17:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800",
                snippet: "High-end residential projects integrate subterranean heating and smart carbon structures for sustainable longevity.",
                content: `<p><strong>MONTE CARLO</strong> — New luxury development models focus on sustainable carbon materials and self-regulating micro-ecosystems for absolute isolation.</p>`
            }
        ],
        fitness: [
            {
                title: "Piezoelectric Wearables Monitor Muscle Fatigue and Adjust Resistance in Real-Time",
                category: "Fitness",
                source: "Bio-Kinetic Research",
                time: "June 16, 2026 • 07:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800",
                snippet: "Smart garments transmit continuous muscle strain updates to dynamic resistance equipment to optimize athletic training.",
                content: `<p><strong>LOS ANGELES, CA</strong> — Athletic wear integrated with sub-millimeter sensors records grip pressure and muscle activation, helping prevent strain injuries.</p>`
            }
        ],
        relationships: [
            {
                title: "Digital Balance Frameworks Help Modern Professionals Reconnect Offline",
                category: "Relationships",
                source: "Sociological Review",
                time: "June 16, 2026 • 13:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800",
                snippet: "Family development experts introduce structured disconnect guidelines to encourage high-quality physical interactions.",
                content: `<p><strong>CHICAGO, IL</strong> — Workplace research links structured digital curfew settings with improved relationship indices and reduced stress levels.</p>`
            }
        ],
        health: [
            {
                title: "Continuous Glucose Monitoring and Metabolic Sensors Drive Preventative Health Models",
                category: "Health",
                source: "Clinical Analytics Journal",
                time: "June 16, 2026 • 09:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800",
                snippet: "Widespread adoption of telemetry patches allows individuals to optimize nutritional habits based on metabolic feedback.",
                content: `<p><strong>BOSTON, MA</strong> — Large-scale preventative studies show a 22% reduction in metabolic syndrome markers among participants using wearable biosensors.</p>`
            }
        ],
        wellness: [
            {
                title: "Subterrenean Sound Therapy Chambers Deploy Acoustic Frequencies for Deep Relaxation",
                category: "Wellness",
                source: "Holistic Science Hub",
                time: "June 16, 2026 • 18:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
                snippet: "Architects design basalt acoustic rooms that utilize deep vibration resonance to induce calm states.",
                content: `<p><strong>REYKJAVIK</strong> — Acoustic spaces engineered with local volcanic rocks leverage sub-bass vibrations to assist in stress management and rest cycle recovery.</p>`
            }
        ],
        medicine: [
            {
                title: "Localized mRNA Synthesis Modules Ensure Rapid Response Vaccine Deployment",
                category: "Medicine",
                source: "Medical Device News",
                time: "June 16, 2026 • 15:00 UTC",
                imageUrl: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800",
                snippet: "On-demand bioreactor arrays synthesize customized therapeutic formulations directly at treatment facilities.",
                content: `<p><strong>GENEVA</strong> — Automated biotechnology cabinets produce localized vaccine batches, bypassing cold-chain distribution challenges in remote clinics.</p>`
            }
        ],
        athletics: [
            {
                title: "Carbon-Weave Running Shoes Undergo Regulatory Biomechanics Testing for World Athletics",
                category: "Athletics",
                source: "Sport Science Telemetry",
                time: "June 16, 2026 • 11:30 UTC",
                imageUrl: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800",
                snippet: "Governing bodies evaluate energy return rates and sole thickness parameters to maintain competitive parity.",
                content: `<p><strong>MONACO</strong> — Dynamic mechanical tests assess whether plate-loaded foam footwear configurations fall within approved thickness standards for international competition.</p>`
            }
        ],
        movies: [
            {
                title: "Indie Studio Leverages Neural Rendering Systems for Real-Time Visual Effects",
                category: "Movies",
                source: "Cinematic Tech Report",
                time: "June 16, 2026 • 20:45 UTC",
                imageUrl: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800",
                snippet: "Independent filmmakers deploy GPU-accelerated environments to render cinematic-grade lighting on small budgets.",
                content: `<p><strong>LOS ANGELES, CA</strong> — Micro-budget productions utilize neural background synthesis, reducing visual effects post-production times from months to hours.</p>`
            }
        ]
    };onal reports release.</p>
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
                }
            ];
        }

        // Initially render everything
        renderArticles(allArticles);
        checkUrlCategory();
    };

    // Check URL parameters for category selection
    const checkUrlCategory = () => {
        const params = new URLSearchParams(window.location.search);
        const catParam = params.get('category') || window.location.hash.replace('#', '');
        if (catParam) {
            console.log("URL category param detected:", catParam);
            setTimeout(() => {
                triggerFilter(catParam);
                const targetSec = document.querySelector('.feed-grid-section');
                if (targetSec) {
                    targetSec.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            }, 300);
        }
    };

    // Render Articles into grid
    const renderArticles = (articles, selectedCategory = 'all', injectStubs = null) => {
        if (!newsGrid) return;
        
        let displayArticles = [...articles];
        
        // Filter out if category is selected and not 'all'
        if (selectedCategory !== 'all') {
            displayArticles = articles.filter(a => {
                const categoryMatch = a.category && a.category.toLowerCase() === selectedCategory.toLowerCase();
                const sel = selectedCategory.toLowerCase();
                // Match parent categories
                if (sel === 'sports') {
                    return categoryMatch || (a.category && ['sports', 'football', 'tennis', 'athletics'].includes(a.category.toLowerCase()));
                }
                if (sel === 'entertainment') {
                    return categoryMatch || (a.category && ['entertainment', 'celebrity', 'style', 'movies'].includes(a.category.toLowerCase()));
                }
                if (sel === 'world') {
                    return categoryMatch || (a.category && ['world', 'worldnews', 'world-news', 'geopolitics', 'us', 'uspolitics', 'us-politics'].includes(a.category.toLowerCase()));
                }
                if (sel === 'business') {
                    return categoryMatch || (a.category && ['business', 'markets', 'economy', 'finance'].includes(a.category.toLowerCase()));
                }
                if (sel === 'tech') {
                    return categoryMatch || (a.category && ['tech', 'technology', 'ai', 'cybersecurity', 'biotech'].includes(a.category.toLowerCase()));
                }
                if (sel === 'lifestyle') {
                    return categoryMatch || (a.category && ['lifestyle', 'travel', 'luxury', 'fitness', 'relationships'].includes(a.category.toLowerCase()));
                }
                if (sel === 'health') {
                    return categoryMatch || (a.category && ['health', 'wellness', 'medicine'].includes(a.category.toLowerCase()));
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
            'all': 'geopolitics',
            'global': 'geopolitics',
            'world': 'world',
            'us': 'us',
            'uspolitics': 'uspolitics',
            'us-politics': 'uspolitics',
            'geopolitics': 'geopolitics',
            'business': 'business',
            'markets': 'markets',
            'economy': 'economy',
            'finance': 'finance',
            'tech': 'tech',
            'technology': 'tech',
            'ai': 'ai',
            'cybersecurity': 'cybersecurity',
            'biotech': 'biotech',
            'lifestyle': 'luxury',
            'travel': 'travel',
            'luxury': 'luxury',
            'fitness': 'fitness',
            'relationships': 'relationships',
            'health': 'health',
            'wellness': 'wellness',
            'medicine': 'medicine',
            'sports': 'football',
            'football': 'football',
            'tennis': 'tennis',
            'athletics': 'athletics',
            'entertainment': 'celebrity',
            'celebrity': 'celebrity',
            'style': 'style',
            'movies': 'movies'
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

    // Wire up dropdown items (All 30+ Categories/Sub-categories)
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
