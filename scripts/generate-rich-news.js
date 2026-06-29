import fs from 'fs';
import path from 'path';

const categoriesData = {
  SPORTS: [
    {
      title: "Real Madrid Claims UEFA Champions League Trophy in Thrilling Football Final",
      snippet: "Real Madrid secured a dramatic 3-2 victory in the final minutes of extra time, cementing their legacy once again on Europe's grandest football stage.",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800",
      content: `
        <p><strong>MUNICH, Germany</strong> — In an unforgettable night of European football, Real Madrid clinched their latest UEFA Champions League title with a dramatic 3-2 victory over their rivals. The match, which extended into extra time, kept fans on the edge of their seats as both sides showcased masterclasses in tactical play and sheer determination.</p>
        
        <h2>A Tactical Chess Match in Munich</h2>
        <p>The first half began with intense pressure from both sides, leading to early defensive errors. A tactical shift in the 65th minute allowed Real Madrid to exploit gaps in the opposition's midfield transition. The coach's decision to bring on fresh wingers paid off handsomely, turning the tide of possession and offensive speed.</p>
        
        <blockquote>
            "We played with our hearts on our sleeves tonight. When we went down in the first half, we never lost faith in our system. This trophy belongs to every single fan who traveled to support us."
            <br><small>— Real Madrid Team Captain</small>
        </blockquote>

        <h2>The Definitive Moments of the Match</h2>
        <p>The breakthrough came in the 114th minute when a brilliant cross-field pass was met with a clinical volley, sending the stadium into a frenzy. Key highlights of the second-half resurgence included:</p>
        <ul>
            <li><strong>Tactical Restructuring:</strong> Shifting to a compact 4-3-3 formation to clog the central passing channels.</li>
            <li><strong>Precision Set Pieces:</strong> Utilizing near-post runs to disrupt zonal marking structures.</li>
            <li><strong>Exceptional Goalkeeping:</strong> Three crucial stops during the final minutes of extra time preserved the narrow lead.</li>
        </ul>

        <h2>Long-Term Institutional Impact</h2>
        <p>With this victory, Real Madrid reinforces their dominant position at the pinnacle of continental football, securing a historical legacy that will inspire future generations of athletes worldwide. Financial analysts estimate that the victory will boost the club's commercial sponsorships and merchandising revenues by over 18% in the coming fiscal year, cementing their status as the world's most valuable football franchise.</p>
      `
    },
    {
      title: "Wimbledon Finals: Historic Straight-Sets Tennis Championship Declared",
      snippet: "A historic day on the grass courts as a rising young phenom sweeps the tennis finals, signaling a major generational shift in professional tennis.",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800",
      content: `
        <p><strong>LONDON, United Kingdom</strong> — The grass courts of Wimbledon witnessed a historic changing of the guard as a 19-year-old tennis prodigy captured the men's singles championship in straight sets. Facing a seasoned veteran, the young athlete displayed ice-cold composure and a devastating serve that left spectators and commentators in awe.</p>

        <h2>Redefining the Baseline Game on Grass</h2>
        <p>From the opening game, the rookie dominated the baseline rallies, hitting winner after winner with surgical precision. The final set concluded with a spectacular ace, cementing a 6-4, 6-3, 6-2 triumph that will go down in tennis folklore. Sporting critics are praising the champion's unique grip and aggressive return strategy, which neutralized the opponent's signature slice.</p>

        <blockquote>
            "I dreamed of this moment since I first picked up a racket at age five. To stand here holding this trophy is a feeling that words cannot adequately capture."
            <br><small>— Wimbledon Men's Champion</small>
        </blockquote>

        <h2>Key Statistical Metrics from the Match</h2>
        <p>A closer look at the match telemetry shows a highly lopsided performance in several critical departments:</p>
        <ul>
            <li><strong>First Serve Percentage:</strong> An outstanding 78% success rate, winning 90% of those points.</li>
            <li><strong>Unforced Errors:</strong> Restrained to a mere 12 throughout the entire three-set match.</li>
            <li><strong>Net Points Won:</strong> Converging on 15 out of 18 attempts, demonstrating superb spatial awareness.</li>
        </ul>

        <h2>The Dawn of a New Tennis Dynasty</h2>
        <p>The sports world is abuzz with speculation about the start of a new dominant era in tennis, as sponsors and fans rally behind the newly crowned champion who has defied all pre-tournament odds. Industry marketing experts predict this victory will launch a massive wave of endorsement contracts, securing the player's position as the new face of global athletics.</p>
      `
    }
  ],
  TECH: [
    {
      title: "Next-Gen Quantum Smartphone Launch Verified by Leading Tech Labs",
      snippet: "The world's first commercially viable consumer quantum processor phone has been launched, featuring military-grade dynamic encryption keys.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      content: `
        <p><strong>SILICON VALLEY, USA</strong> — Tech pioneers have officially launched the first consumer smartphone powered by a micro-quantum processor. This breakthrough device offers processing speeds up to 100 times faster than traditional silicon chips, marking a paradigm shift in mobile computing and user interface responsiveness.</p>

        <h2>Breaking the Silicon Barrier</h2>
        <p>For decades, chip developers have warned about the physical limitations of silicon transistors. The new quantum mobile chipset utilizes sub-atomic particle entanglement to perform calculations, practically bypassing heat generation limits and allowing true multi-tasking without throttling.</p>

        <blockquote>
            "This is not a progressive step; it is a leap off the cliff of classical computing. We have brought room-temperature quantum computing out of the research facility and into the consumer's palm."
            <br><small>— Chief Hardware Architect</small>
        </blockquote>

        <h2>Unbreakable Security Infrastructure</h2>
        <p>The primary feature drawing attention from cybersecurity firms is the phone's hardware-level quantum key distribution (QKD):</p>
        <ul>
            <li><strong>Dynamic Entangled Keys:</strong> Cryptographic tokens change state instantly if any attempt is made to intercept the signal.</li>
            <li><strong>Zero Cache Overhead:</strong> Cryptographic calculations are solved at the hardware layer, bypassing standard operating system vulnerabilities.</li>
            <li><strong>Quantum-Resistant Protocols:</strong> Algorithms are fully prepared for the future arrival of commercial quantum mainframes.</li>
        </ul>

        <h2>Consumer Market Reception & Enterprise Demand</h2>
        <p>Pre-orders have surged across international tech hubs, with corporate enterprises and government agencies securing initial production runs to guarantee communication security in sensitive operating environments. Analysts predict that quantum mobile technology will replace standard flagship smartphones in corporate corridors within the next three years.</p>
      `
    },
    {
      title: "Silicon Valley Showcases Holographic Gadgets Targeting Consumer Markets",
      snippet: "Top hardware developers unveiled ultra-slim interactive holographic glass interfaces set to replace traditional monitors and tablet displays.",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800",
      content: `
        <p><strong>SAN FRANCISCO, USA</strong> — Leading electronics manufacturers have showcased a series of interactive holographic displays designed to replace traditional screens. The devices project high-definition 3D visuals directly into the air, allowing users to interact with files and applications using intuitive hand gestures.</p>

        <h2>The End of Flat-Panel Monitors</h2>
        <p>By employing advanced spatial light modulators and infrared tracking sensors, the holographic glass creates a seamless, lag-free workspace that integrates naturally with modern smart home environments. Users can stretch, rotate, and minimize application windows floating in mid-air, creating a high-tech desktop workspace.</p>

        <blockquote>
            "The screen has been a bottleneck for human creativity for half a century. We are finally expanding the digital workspace into three-dimensional space."
            <br><small>— Spatial Interface Design Lead</small>
        </blockquote>

        <h2>Technical Highlights of Holographic Glass</h2>
        <p>The system utilizes several cutting-edge hardware layers to achieve a realistic projection:</p>
        <ul>
            <li><strong>Micro-Laser Arrays:</strong> Millions of localized laser diodes project coherent light waves that intersect in three-dimensional space.</li>
            <li><strong>Time-of-Flight Gesture Cameras:</strong> Sub-millimeter tracking captures fine finger adjustments for precise drawing and modeling.</li>
            <li><strong>Eye-Tracking Focus Calibration:</strong> Adjusts projection depth dynamically based on where the user is looking.</li>
        </ul>

        <h2>Market Projections and Enterprise Integration</h2>
        <p>Consumer tech commentators are calling this the most significant interface innovation since the multi-touch capacitive screen, predicting widespread adoption within the executive computing sector by next year. Software giants have already begun releasing compatible operating system patches to support spatial holographic workspaces natively.</p>
      `
    }
  ],
  AUTO: [
    {
      title: "Autonomous Electric Supercar Unveiled with Mach-Speed Battery Architecture",
      snippet: "The new luxury electric vehicle features solid-state battery technology capable of charging from 0% to 100% in under three minutes.",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800",
      content: `
        <p><strong>STUTTGART, Germany</strong> — A premier European automaker has stunned the automotive world by unveiling a concept electric supercar equipped with a revolutionary solid-state battery. The vehicle boasts a range of over 800 miles on a single charge and can replenish its battery fully in under three minutes.</p>

        <h2>Solid-State Energy Densities Unleashed</h2>
        <p>By employing high-density lithium-metal anodes and a solid ceramic electrolyte layer, the vehicle eliminates the overheating risks associated with traditional liquid lithium-ion packs, enabling continuous high-speed charging without degradation. This solves the primary bottleneck that has plagued the electric vehicle market for a decade.</p>

        <blockquote>
            "We have built a sports car that respects the planet without compromising on track-performance. Solid-state technology makes range anxiety a historical relic."
            <br><small>— Lead Powertrain Engineer</small>
        </blockquote>

        <h2>Aerodynamic and AI Architecture</h2>
        <p>The vehicle features a carbon-fiber shell and an onboard autonomous piloting mainframe trained on racing simulators:</p>
        <ul>
            <li><strong>Active Aerodynamic Flaps:</strong> Adjust drag coefficients dynamically during cornering and braking.</li>
            <li><strong>Predictive Thermal Management:</strong> Pre-cools batteries ahead of high-performance driving segments.</li>
            <li><strong>Mach-Speed Charging Grid compatibility:</strong> Supports 800V and 1200V supercharger infrastructures.</li>
        </ul>

        <h2>Global Launch and Distribution Strategy</h2>
        <p>Production is scheduled to begin in limited quantities next year, with luxury car collectors and tech executives representing the primary customer base. Dealerships across major luxury hubs have reported record deposit registrations, signaling strong consumer confidence in the future of electrified high-performance travel.</p>
      `
    }
  ],
  CELEBRITY: [
    {
      title: "Cannes Film Festival: Red Carpet Highlights and Top Director Awards",
      snippet: "Global filmmakers gather as independent cinema sweeps the top honors, featuring high-profile celebrity appearances and style showcases.",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800",
      content: `
        <p><strong>CANNES, France</strong> — The Cannes Film Festival concluded with a series of surprise victories as independent, foreign-language films dominated the main awards. Celebrities from around the globe walked the red carpet, showcasing stunning custom outfits that set new trends for the fashion season.</p>

        <h2>Independent Cinema Sweeps the Palme d'Or</h2>
        <p>The coveted Palme d'Or was awarded to a breakout director for a gripping psychological drama, receiving a standing ovation from the audience during the closing ceremony. Critics praised the film's minimal scoring and rich dialogue, marking a return to classic cinematic storytelling methods.</p>

        <blockquote>
            "Cinema is an international language. This award is a validation for independent storytellers everywhere who refuse to dilute their vision for commercial grids."
            <br><small>— Palme d'Or Winning Director</small>
        </blockquote>

        <h2>Red Carpet Style & High Fashion Trends</h2>
        <p>Fashion houses took center stage on the red carpet, with several prominent trends emerging from the opening night:</p>
        <ul>
            <li><strong>Sustainable Luxury:</strong> Hand-woven organic silk and recycled gemstone accessories dominated the outfits.</li>
            <li><strong>Vintage Revivals:</strong> Classic silhouettes from the 1950s and 60s re-imagined with modern asymmetrical tailoring.</li>
            <li><strong>AI-Assisted Couture:</strong> Dynamic fabrics that adapt drape and structure based on ambient lighting.</li>
        </ul>

        <h2>Industry Financial Outlook</h2>
        <p>Distributors reported a highly active marketplace, with several high-value acquisition contracts signed during the festival. Industry analysts predict a strong recovery for theatrical releases as independent titles secure global distribution pipelines across major streaming platforms and art-house theaters.</p>
      `
    }
  ],
  TRAVEL: [
    {
      title: "Hidden Luxury Eco-Resorts Discovered Across Pristine Southeast Asian Islands",
      snippet: "Travel experts catalog off-grid carbon-neutral private luxury villas offering ultra-premium hospitality experiences and wellness retreats.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800",
      content: `
        <p><strong>BALI, Indonesia</strong> — Travel connoisseurs have compiled a list of the most exclusive, off-grid eco-resorts tucked away in remote corners of Southeast Asia. These private island destinations offer premium luxury while operating with a zero-carbon footprint.</p>

        <h2>A Zero-Carbon Footprint Paradise</h2>
        <p>Powered entirely by solar micro-grids and featuring organic farm-to-table dining, the resorts cater to high-profile travelers seeking privacy and deep rejuvenation through personalized wellness programs. The villas are built using locally sourced bamboo and volcanic stone, blending seamlessly with the natural jungle landscape.</p>

        <blockquote>
            "True luxury today is not about gold-plated fixtures; it is about absolute silence, clean air, and reconnecting with the earth without leaving a footprint."
            <br><small>— Eco-Hospitality Developer</small>
        </blockquote>

        <h2>Exclusive Guest Amenities and Wellness Focus</h2>
        <p>Guests have access to curated wellness therapies and off-grid adventures designed to soothe modern cognitive fatigue:</p>
        <ul>
            <li><strong>Holistic Sound Therapy:</strong> Meditation chambers built inside natural limestone caves.</li>
            <li><strong>Organic Culinary Journeys:</strong> Menus customized daily by nutritionists utilizing ingredients harvested from on-site permaculture gardens.</li>
            <li><strong>Private Marine Safaris:</strong> Guided electric catamaran tours to coral restoration reefs.</li>
        </ul>

        <h2>The Rapid Growth of Slow Travel</h2>
        <p>Booking waitlists have extended up to a year, indicating a massive shift in luxury travel preferences toward sustainable, slow-travel experiences far removed from crowded tourism hubs. Hospitality groups are expanding portfolios to meet this high-yield, environmentally conscious demand.</p>
      `
    }
  ],
  WORLD: [
    {
      title: "Devastating Quakes Strike Coastlines Leading to Dynamic Evacuations",
      snippet: "Twin offshore earthquakes prompt emergency responses across coastal hubs, with regional rescue agencies active in establishing safety zones.",
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=800",
      content: `
        <p><strong>CARACAS, Venezuela</strong> — A powerful pair of offshore earthquakes measuring 7.2 and 7.5 on the Richter scale struck the Venezuelan coastline within minutes of each other, triggering emergency evacuations and localized tsunami warnings.</p>

        <h2>Mobilizing Regional Disaster Response</h2>
        <p>Rescue teams have been deployed to Guaire and surrounding areas to clear debris and check for survivors in collapsed structures. Infrastructure damage is reported to be significant along coastal roads, prompting government officials to appeal for caution and restrict non-essential travel.</p>

        <blockquote>
            "Our primary focus is safety and stabilization. Emergency crews are working round the clock to restore power and communication lines to isolated districts."
            <br><small>— Disaster Management Spokesperson</small>
        </blockquote>

        <h2>Seismic Analysis & Geotechnical Reports</h2>
        <p>Geological departments indicate that the quakes occurred along the active Caribbean tectonic plate boundary:</p>
        <ul>
            <li><strong>Twin Ruptures:</strong> Two distinct slips occurred along parallel fault lines, doubling the seismic impact.</li>
            <li><strong>Aftershock Risks:</strong> Over 120 minor tremors recorded within the first 12 hours, complicating rescue efforts.</li>
            <li><strong>Tsunami Wave Watch:</strong> Coastal sensors monitor water level fluctuations to detect potential secondary swells.</li>
        </ul>

        <h2>International Relief Efforts Coordinated</h2>
        <p>International aid agencies are coordinating emergency shipments of food, water, and medical supplies to the affected regions. Neighbouring countries have pledged technical support and search-and-rescue teams to accelerate recovery operations in the worst-hit coastal cities.</p>
      `
    }
  ],
  BUSINESS: [
    {
      title: "Central Bank Adjusts Interest Rates to Counteract Inflationary Pressure",
      snippet: "Financial regulatory bodies announce coordinated rate changes to stabilize sovereign yields amid fluctuating market dynamics.",
      image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800",
      content: `
        <p><strong>NEW YORK, USA</strong> — The Federal Reserve has announced a surprise 25-basis-point interest rate cut, citing stable inflation metrics and a desire to bolster employment figures during the summer transition.</p>

        <h2>Monetary Policy Restructuring</h2>
        <p>Stock indices responded positively to the announcement, with the S&P 500 and Dow Jones Industrial Average posting modest gains in late trading. The central bank indicated that this policy adjustment aims to ease borrowing constraints for small businesses and accelerate infrastructure investments.</p>

        <blockquote>
            "Our economy remains resilient, but fine-tuning rates allows us to sustain positive momentum without triggering inflationary spikes."
            <br><small>— Central Bank Governor</small>
        </blockquote>

        <h2>Market Implications & Bond Market Telemetry</h2>
        <p>Investment portfolios have immediately adjusted allocations to capitalize on the new rate environment:</p>
        <ul>
            <li><strong>Sovereign Bonds:</strong> Yields on 10-year treasury notes adjusted downwards in response to the Fed's statement.</li>
            <li><strong>Real Estate Financing:</strong> Mortgage applications surged as commercial banks lowered lending premiums.</li>
            <li><strong>Foreign Exchange:</strong> The US dollar showed minor adjustments against a basket of major trading currencies.</li>
        </ul>

        <h2>Global Central Bank Coordination</h2>
        <p>The Fed Chairman emphasized that the central bank remains data-dependent, ready to adjust monetary policies if global supply chains encounter further disruption. European and Asian financial regulators are expected to meet next week to coordinate interest rate postures.</p>
      `
    }
  ],
  FINANCE: [
    {
      title: "Global Stock Markets Rally as Corporate Earnings Defy Recessionary Warnings",
      snippet: "Major stock indices surge following strong quarterly earnings reports from leading tech and consumer conglomerates.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
      content: `
        <p><strong>NEW YORK, USA</strong> — Wall Street posted its strongest weekly performance of the fiscal year as top-tier corporate earnings comfortably beat analyst projections, dispelling fears of an impending consumer slowdown.</p>

        <h2>Technology Giants Drive the Market Surge</h2>
        <p>Record-breaking revenues from major chip manufacturers and cloud providers fueled the rally, pushing indices to historic highs. Financial institutions report a substantial flow of institutional capital back into equity markets, reversing the defensive bond-heavy posture held during the previous quarter.</p>

        <blockquote>
            "The corporate sector has shown incredible adaptation. Optimization strategies and AI automation integrations are finally showing up as fat operating margins."
            <br><small>— Chief Investment Officer</small>
        </blockquote>

        <h2>Key Financial Highlights from Trading Week</h2>
        <p>Market telemetry points to broad-based accumulation across multiple sectors:</p>
        <ul>
            <li><strong>NASDAQ Composite:</strong> Surged by 3.4%, led by hardware manufacturing and software service providers.</li>
            <li><strong>Bond Yield Stabilization:</strong> The yield on the benchmark 10-year Treasury note stabilized at 3.92%.</li>
            <li><strong>Commodity Markets:</strong> Crude oil and gold futures consolidated within narrow trading ranges.</li>
        </ul>

        <h2>Future Outlook for Capital Allocations</h2>
        <p>Wealth management firms are recommending clients maintain a balanced posture, warning that while corporate margins are strong, geopolitical trade friction could introduce short-term volatility in regional distribution supply chains.</p>
      `
    }
  ],
  LIFESTYLE: [
    {
      title: "The Rise of Slow Living: How Urban Professionals are Reclaiming Balance",
      snippet: "A growing movement toward digital detoxes and offline hobbies gains popularity among high-stress corporate circles.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800",
      content: `
        <p><strong>SAN FRANCISCO, USA</strong> — Urban professionals are increasingly embracing the concept of 'slow living' to counteract the cognitive overload associated with constant connectivity and corporate burnout.</p>

        <h2>Reclaiming Attention in a Digital Era</h2>
        <p>The movement advocates for structured periods of digital disconnection, allowing the nervous system to recover from notifications and screen fatigue. Yoga studios, gardening clubs, and analog cooking workshops report record membership sign-ups across major cities.</p>

        <blockquote>
            "I spent a decade responding to emails within ten seconds. Shifting to slow living allowed me to reclaim my creative focus and improve my mental health."
            <br><small>— Corporate Executive Turned Wellness advocate</small>
        </blockquote>

        <h2>Practical Strategies for Daily Balance</h2>
        <p>Wellness experts recommend incorporating minor offline routines to cultivate awareness and reduce stress:</p>
        <ul>
            <li><strong>Screen-Free Mornings:</strong> Avoiding phone usage for the first hour after waking up.</li>
            <li><strong>Tactile Hobbies:</strong> Engaging in pottery, gardening, or physical book reading.</li>
            <li><strong>Mindful Commuting:</strong> Bypassing podcasts and media during travel to encourage quiet observation.</li>
        </ul>

        <h2>Corporate Adoption of Wellness Programs</h2>
        <p>Recognizing the cost of burnout, several forward-thinking enterprises have begun introducing mandatory quiet hours and offline weekends. HR executives report that these initiatives have improved employee retention and overall productivity metrics.</p>
      `
    }
  ],
  HEALTH: [
    {
      title: "Clinical Trials Verify Breakthrough in Cellular Rejuvenation Therapy",
      snippet: "Medical researchers report successful reversal of biological age markers in initial human trial participants.",
      image: "https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=800",
      content: `
        <p><strong>BOSTON, USA</strong> — Leading biotech researchers have announced encouraging results from human clinical trials targeting cellular rejuvenation. The therapy successfully reversed key biological age markers by restoring cellular energy pathways.</p>

        <h2>Targeting the Root Causes of Aging</h2>
        <p>The treatment utilizes custom mRNA strands to instruct senescent cells to restore their mitochondria, improving energy production and reducing inflammatory secretions. Participants showed improvements in cardiovascular elasticity, muscle density, and cognitive processing speeds.</p>

        <blockquote>
            "This is the first time we have actively reversed biological age markers in human subjects rather than simply slowing down their decline."
            <br><small>— Chief Medical Researcher</small>
        </blockquote>

        <h2>Detailed Clinical Metrics and Observations</h2>
        <p>The double-blind study monitored 120 participants over a twelve-month period:</p>
        <ul>
            <li><strong>Telomere Extension:</strong> Monitored telomeres showed an average length increase equivalent to 8 years of biological age.</li>
            <li><strong>Inflammatory Reductions:</strong> Systemic biomarkers like C-reactive protein (CRP) dropped by 35%.</li>
            <li><strong>Cardiovascular Output:</strong> VO2 max averages improved by 14% across all age groups.</li>
        </ul>

        <h2>Path to Commercial Regulatory Approval</h2>
        <p>The research team is preparing to submit data to the FDA for Phase III trials. If approved, this cellular therapy could revolutionize preventative medicine and reduce healthcare costs associated with age-related chronic illnesses.</p>
      `
    }
  ]
};

// Compile a large database by repeating/extending templates to reach 80 articles
const allArticles = [];

// Helper to copy template and randomize slightly to create unique articles
function addArticle(cat, index, template) {
  const timeOffset = index * 3; // hours ago
  const dateObj = new Date();
  dateObj.setHours(dateObj.getHours() - timeOffset);
  
  const sources = ["Global Pulse Intel", "Pulse News Wire", "Sentinel Intelligence", "Financial Times Desk", "Reuters Syndicate"];
  const randomSource = sources[index % sources.length];
  
  allArticles.push({
    title: `${template.title} [Vol. ${index + 1}]`,
    snippet: template.snippet,
    category: cat,
    source: randomSource,
    time: `${dateObj.toLocaleDateString()}, ${dateObj.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`,
    imageUrl: template.image,
    content: template.content,
    link: "#"
  });
}

// Generate articles across all categories (8 articles per category = 80 total)
Object.keys(categoriesData).forEach(cat => {
  const templates = categoriesData[cat];
  for (let i = 0; i < 8; i++) {
    const template = templates[i % templates.length];
    addArticle(cat, i, template);
  }
});

// Write to files
const dataPath = path.join('data', 'news.json');
fs.writeFileSync(dataPath, JSON.stringify(allArticles, null, 2), 'utf-8');
console.log(`🎉 Successfully generated ${allArticles.length} rich articles inside data/news.json!`);
