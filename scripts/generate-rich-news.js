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
        <p>The breakthrough came in the 114th minute when a brilliant cross-field pass was met with a clinical volley, sending the stadium into a frenzy. Analysts are calling this match one of the greatest finals in modern sports history, highlighting the strategic shifts implemented by the manager in the second half.</p>
        <p>With this victory, Real Madrid reinforces their dominant position at the pinnacle of continental football, securing a historical legacy that will inspire future generations of athletes worldwide. Celebrations are expected to continue in the Spanish capital throughout the week.</p>
      `
    },
    {
      title: "Wimbledon Finals: Historic Straight-Sets Tennis Championship Declared",
      snippet: "A historic day on the grass courts as a rising young phenom sweeps the tennis finals, signaling a major generational shift in professional tennis.",
      image: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=800",
      content: `
        <p><strong>LONDON, United Kingdom</strong> — The grass courts of Wimbledon witnessed a historic changing of the guard as a 19-year-old tennis prodigy captured the men's singles championship in straight sets. Facing a seasoned veteran, the young athlete displayed ice-cold composure and a devastating serve that left spectators and commentators in awe.</p>
        <p>From the opening game, the rookie dominated the baseline rallies, hitting winner after winner with surgical precision. The final set concluded with a spectacular ace, cementing a 6-4, 6-3, 6-2 triumph that will go down in tennis folklore.</p>
        <p>The sports world is abuzz with speculation about the start of a new dominant era in tennis, as sponsors and fans rally behind the newly crowned champion who has defied all pre-tournament odds.</p>
      `
    },
    {
      title: "Manchester City Clinches English Premier League Title After Final Day Drama",
      snippet: "A spectacular second-half comeback seals the Premier League trophy, securing City's place at the top of English football.",
      image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800",
      content: `
        <p><strong>MANCHESTER, UK</strong> — Manchester City retained the Premier League title in the most dramatic fashion, overcoming a two-goal deficit on the final day of the season to win 3-2. The victory triggered wild celebrations at the Etihad Stadium as City secured their fourth consecutive league crown.</p>
        <p>Two quick-fire goals in the final ten minutes turned the game on its head, leaving their rivals stunned. The manager praised his players' resilience, calling it 'a testament to the character and spirit of this football club.'</p>
        <p>The triumph marks another chapter of dominance for the Manchester club, who continue to set new benchmarks in domestic and international competition.</p>
      `
    },
    {
      title: "Formula 1: Monaco Grand Prix Delivers Masterclass in Wet Weather Racing",
      snippet: "Sudden downpours turn the legendary street circuit into a tactical battlefield, leading to an unexpected podium finish.",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
      content: `
        <p><strong>MONTE CARLO, Monaco</strong> — Sudden torrential rain transformed the Monaco Grand Prix into a high-stakes tactical chess game, resulting in one of the most unpredictable races of the season. Drivers struggled for grip on the narrow street circuit as teams scrambled to adapt their tire strategies.</p>
        <p>A series of daring overtakes and pit-stop blunders shook up the grid, allowing a mid-tier team to claim a historic first-place finish. The winner described the race as 'pure adrenaline from start to finish.'</p>
        <p>As the dust settles, Formula 1 analysts are praising the safety protocols and driver skill that prevented major incidents under extremely challenging track conditions.</p>
      `
    },
    {
      title: "NBA Finals: Golden State Warriors Reclaim Championship Ring in Game 6",
      snippet: "A spectacular three-point shooting showcase seals the victory, bringing the Larry O'Brien trophy back to the Bay Area.",
      image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800",
      content: `
        <p><strong>SAN FRANCISCO, USA</strong> — The Golden State Warriors clinched another NBA Championship with an emphatic Game 6 victory, dominating the fourth quarter with their signature fast-paced offense. The home crowd erupted as the final buzzer sounded, celebrating a hard-fought season.</p>
        <p>The finals MVP delivered a stunning 42-point performance, breaking multiple shooting records along the way. 'We stayed united through all the injuries and doubts,' the star player remarked during the trophy ceremony.</p>
        <p>With this championship, the franchise solidifies its status as one of the greatest modern sports dynasties, with plans already underway for next season's campaign.</p>
      `
    },
    {
      title: "Lionel Messi Announces Final International Campaign Ahead of World Cup",
      snippet: "The legendary football icon confirms the upcoming global tournament will mark his final appearance in the national jersey.",
      image: "https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=800",
      content: `
        <p><strong>BUENOS AIRES, Argentina</strong> — Football legend Lionel Messi has officially announced that the upcoming World Cup will be his final tournament representing Argentina. The decision marks the end of an era for international football, sparking emotional tributes from fans and players worldwide.</p>
        <p>'I want to enjoy these final games with my teammates and give everything to bring home another trophy,' Messi stated in an exclusive interview.</p>
        <p>The national team manager emphasized that Messi's leadership off the pitch will be just as crucial as his magic on it as the squad prepares for the tournament.</p>
      `
    },
    {
      title: "Paris Olympic Committee Unveils Carbon-Neutral Athletes Village",
      snippet: "The newly constructed complex utilizes solar integration and geothermal cooling, setting a new standard for sustainable sports events.",
      image: "https://images.unsplash.com/photo-1578873376229-25a115af1b28?w=800",
      content: `
        <p><strong>PARIS, France</strong> — The Paris Olympic Committee has officially opened the Athletes Village, showcasing an array of eco-friendly innovations designed to minimize the event's environmental footprint. The village features recycled timber structures, rooftop solar arrays, and an innovative underground water cooling system.</p>
        <p>By avoiding traditional air conditioning and utilizing sustainable materials, the organizers expect to cut emissions by 50% compared to previous games. 'This is a model for the future of urban design,' the mayor of Paris noted during the opening tour.</p>
        <p>Athletes from around the world have begun moving into the facility, praising the comfortable living spaces and focus on ecological sustainability.</p>
      `
    },
    {
      title: "NFL Super Bowl: Underdog Franchise Secures Historic Overtime Victory",
      snippet: "A dramatic goal-line stand in the final seconds of overtime crowns a new champion, capping off a remarkable season.",
      image: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=800",
      content: `
        <p><strong>LAS VEGAS, USA</strong> — The NFL season concluded with a Super Bowl for the ages as the underdog team secured a historic overtime victory. A sensational touchdown drive in the dying seconds of the extra period sealed the win, leaving stadium spectators in absolute disbelief.</p>
        <p>The winning quarterback, who was drafted in the final round, was named MVP after throwing for four touchdowns and zero interceptions. 'No one believed in us, but we believed in each other,' he said holding the Lombardi Trophy.</p>
        <p>Cities across the home state are preparing massive parade routes to welcome back the champion squad, marking their first league title in over four decades.</p>
      `
    }
  ],
  TECH: [
    {
      title: "Next-Gen Quantum Smartphone Launch Verified by Leading Tech Labs",
      snippet: "The world's first commercially viable consumer quantum processor phone has been launched, featuring military-grade dynamic encryption keys.",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
      content: `
        <p><strong>SILICON VALLEY, USA</strong> — Tech pioneers have officially launched the first consumer smartphone powered by a micro-quantum processor. This breakthrough device offers processing speeds up to 100 times faster than traditional silicon chips, marking a paradigm shift in mobile computing.</p>
        <p>The primary feature drawing attention from cybersecurity firms is the phone's hardware-level quantum key distribution (QKD), which generates dynamically changing encryption keys that are physically impossible to intercept or decode by unauthorized parties.</p>
        <p>Pre-orders have surged across international tech hubs, with corporate enterprises and government agencies securing initial production runs to guarantee communication security in sensitive operating environments.</p>
      `
    },
    {
      title: "Silicon Valley Showcases Holographic Gadgets Targeting Consumer Markets",
      snippet: "Top hardware developers unveiled ultra-slim interactive holographic glass interfaces set to replace traditional monitors and tablet displays.",
      image: "https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800",
      content: `
        <p><strong>SAN FRANCISCO, USA</strong> — Leading electronics manufacturers have showcased a series of interactive holographic displays designed to replace traditional screens. The devices project high-definition 3D visuals directly into the air, allowing users to interact with files and applications using intuitive hand gestures.</p>
        <p>By employing advanced spatial light modulators and infrared tracking sensors, the holographic glass creates a seamless, lag-free workspace that integrates naturally with modern smart home environments.</p>
        <p>Consumer tech commentators are calling this the most significant interface innovation since the multi-touch capacitive screen, predicting widespread adoption within the executive computing sector by next year.</p>
      `
    },
    {
      title: "ChatGPT-5 Release Date Leaked: Next-Gen AI System Capable of Real-Time Reasoning",
      snippet: "Leaked documents reveal a massive leap in multi-modal capabilities, enabling the AI to reason and interact with human speed.",
      image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800",
      content: `
        <p><strong>SAN FRANCISCO, USA</strong> — Internal documents leaked from leading artificial intelligence research labs suggest that ChatGPT-5 is slated for release late this quarter. The system represents a monumental upgrade, moving beyond pattern recognition to deep symbolic reasoning and planning.</p>
        <p>According to the leak, the model can autonomously write, test, and deploy software applications in real-time while dynamically correcting logic errors. Additionally, its conversational latency has been reduced to sub-100ms, making interactions feel indistinguishable from human voice communication.</p>
        <p>Safety boards are currently reviewing the model to ensure compliance with international ethical guidelines, while tech enterprises brace for a wave of automation potential across customer support and analytics.</p>
      `
    },
    {
      title: "Apple Vision Pro 2 Launches with Neural Interface and Extended Battery",
      snippet: "The upgraded spatial computing headset introduces direct eye-tracking control and a lightweight external battery pack.",
      image: "https://images.unsplash.com/photo-1608248597481-496100c8c836?w=800",
      content: `
        <p><strong>CUPERTINO, USA</strong> — Apple has officially announced the Vision Pro 2, addressing key user feedback from the first generation with a lighter carbon-fiber chassis and double the computing power. The headset introduces 'Neural Link' eye tracking, which allows users to execute commands simply by thinking about them.</p>
        <p>An upgraded external battery pack provides up to six hours of continuous operation, making the device viable for full-day professional workspaces. The integration of next-generation micro-OLED displays virtually eliminates motion sickness and eye strain.</p>
        <p>The spatial computing market is expected to expand rapidly as corporate developers launch dedicated productivity suites designed specifically for the new headset architecture.</p>
      `
    },
    {
      title: "NVIDIA Unveils Blackwell Ultra AI Chips to Power Next-Gen Neural Networks",
      snippet: "The ultra-advanced chip architecture promises a 30x performance boost in LLM training speeds while cutting energy use in half.",
      image: "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=800",
      content: `
        <p><strong>SANTA CLARA, USA</strong> — NVIDIA CEO Jensen Huang unveiled the Blackwell Ultra chip family, designed to power the next generation of multi-trillion parameter artificial intelligence models. The hardware features a new high-speed interconnect system that enables seamless communication across thousands of nodes.</p>
        <p>Initial benchmarks show a staggering 30x improvement in training and inference speeds for large language models, while utilizing advanced thermal management to reduce power consumption by 50%.</p>
        <p>Cloud service providers have immediately queued up orders for the chips, anticipating a massive surge in demand from corporate clients building custom generative models.</p>
      `
    },
    {
      title: "Sony and Honda Unveil Afeela EV Prototype with Integrated Gaming Console",
      snippet: "The electric vehicle features a panoramic entertainment dashboard powered by PlayStation 5 cloud streaming technology.",
      image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=800",
      content: `
        <p><strong>TOKYO, Japan</strong> — The joint venture between Sony and Honda has showcased the latest prototype of their Afeela electric vehicle. The car features a revolutionary interactive dashboard that spans the entire cabin, offering passengers access to high-fidelity cloud gaming and media streaming.</p>
        <p>Advanced autonomous driving sensors monitor road conditions in real-time, allowing the vehicle to handle complex highway routes without driver intervention. 'We are redefining what a vehicle cabin can be,' the Sony representative stated.</p>
        <p>Pre-orders for the production model are expected to open next year, with initial deliveries targeting the North American and Asian markets.</p>
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
        <p>By employing high-density lithium-metal anodes and a solid electrolyte layer, the vehicle eliminates the overheating risks associated with traditional liquid lithium-ion packs, enabling continuous high-speed charging without degradation.</p>
        <p>Production is scheduled to begin in limited quantities next year, with luxury car collectors and tech executives representing the primary customer base for this groundbreaking vehicle.</p>
      `
    },
    {
      title: "Next-Gen Hydrogen Sedans Enter Mass Production to Disrupt Electric Markets",
      snippet: "Leading automakers launch mass-production facilities for zero-emission hydrogen fuel-cell sedans, targeting long-range executive travel.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
      content: `
        <p><strong>TOKYO, Japan</strong> — In a bold bid to challenge the dominance of battery-electric vehicles, Japanese automotive giants have launched their first dedicated mass-production facility for hydrogen fuel-cell passenger sedans.</p>
        <p>The new line of vehicles offers a refuel time of under five minutes and emits only pure water vapor, making them an ideal choice for long-distance travel and taxi fleets operating in urban centers with limited electric grid capacity.</p>
        <p>Government subsidies and infrastructure investments in hydrogen refueling stations across Europe and the US are expected to boost sales and accelerate the transition toward zero-emission transportation.</p>
      `
    },
    {
      title: "Tesla Cyberbeast 2 Launches with Enhanced Autopilot and Solar Roof Panel",
      snippet: "The upgraded electric truck features a built-in solar array that adds up to 15 miles of driving range per day from sunlight.",
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800",
      content: `
        <p><strong>AUSTIN, USA</strong> — Tesla has officially launched the Cyberbeast 2, featuring a revised suspension system and an integrated solar roof array. The lightweight solar panels charge the battery continuously throughout the day, providing an additional 15 miles of range under normal sunlight conditions.</p>
        <p>The truck is equipped with the latest Full Self-Driving (FSD) computer, which utilizes neural nets to navigate complex urban intersections and construction zones with minimal driver supervision.</p>
        <p>Early reviews praise the vehicle's rugged build quality and off-road capability, positioning it as a versatile utility vehicle for both suburban and industrial environments.</p>
      `
    },
    {
      title: "Porsche Unveils All-Electric 911 Hybrid with Track-Optimized Power System",
      snippet: "The legendary sports car adopts an advanced electric-hybrid drivetrain to deliver unprecedented track performance.",
      image: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800",
      content: `
        <p><strong>STUTTGART, Germany</strong> — Porsche has revealed the first hybrid version of the iconic 911, combining a twin-turbocharged flat-six engine with a high-performance electric motor. The hybrid system is designed primarily to boost acceleration and power delivery out of corners.</p>
        <p>An innovative regenerative braking system recovers energy during deceleration, charging a compact lightweight battery pack optimized for rapid power cycles. 'We have preserved the classic driving feel while embracing modern electrification,' the design director noted.</p>
        <p>The model will hit dealerships late this year, targeting sports car enthusiasts looking for the ultimate combination of traditional combustion and electric boost.</p>
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
        <p>The coveted Palme d'Or was awarded to a breakout director for a gripping psychological drama, receiving a standing ovation from the audience during the closing ceremony.</p>
        <p>Fashion houses took center stage on the red carpet, with sustainable luxury fabrics and vintage revivals representing the most prominent style trends of the evening.</p>
      `
    },
    {
      title: "Met Gala Style Unveiled: Luxury Outfits Redefine Modern Runway Themes",
      snippet: "High-fashion statements dominate the museum steps as prominent celebrities showcase custom handcrafted luxury wear designed by AI.",
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800",
      content: `
        <p><strong>NEW YORK, USA</strong> — The Metropolitan Museum of Art hosted the annual Met Gala, with this year's theme pushing the boundaries of technology and fashion. Prominent celebrities arrived in breathtaking outfits that featured intricate 3D-printed elements and fiber-optic fabrics.</p>
        <p>One of the night's highlights was a dress designed entirely through collaborative AI models, utilizing recycled ocean plastics to construct a stunning, liquid-like silhouette that shifted color under the camera flashes.</p>
        <p>Commentators are praising the event's focus on technological innovation and ecological sustainability, hailing it as a pivotal moment for modern high fashion.</p>
      `
    },
    {
      title: "Taylor Swift Announces Extended Global Tour with Dynamic Ticket Pricing",
      snippet: "The pop icon confirms new dates across Asia and Europe, adopting blockchain tickets to prevent secondary scalping.",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800",
      content: `
        <p><strong>LOS ANGELES, USA</strong> — Taylor Swift has announced an extension of her record-breaking world tour, adding 30 new dates across major stadiums in Europe, South America, and Asia. To combat rampant ticket scalping, the tour organizers are deploying blockchain-based digital tickets.</p>
        <p>The smart tickets are tied directly to the buyer's mobile device and cannot be resold on secondary platforms for inflated prices. 'We want to ensure our real fans get access at the original price,' Swift's management team stated.</p>
        <p>Demand is expected to break previous records, with millions of fans queuing up online for the initial pre-sale rounds starting next week.</p>
      `
    },
    {
      title: "Rihanna Launches Luxury Eco-Friendly Makeup Line under Fenty Brand",
      snippet: "The new cosmetics line features biodegradable packaging and organic formulations, targeting the clean beauty market.",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=800",
      content: `
        <p><strong>PARIS, France</strong> — Rihanna has unveiled the latest expansion of her Fenty Beauty empire, introducing a line of premium, zero-waste cosmetics. The products utilize fully biodegradable bamboo packaging and organic, plant-based formulations free from synthetic chemicals.</p>
        <p>The clean beauty line has received immediate praise from environmental groups and beauty influencers alike for its commitment to sustainability without sacrificing product performance or color range.</p>
        <p>The collection will launch in retail stores worldwide this Friday, capitalising on the rapidly growing consumer demand for ecological personal care items.</p>
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
        <p>Powered entirely by solar micro-grids and featuring organic farm-to-table dining, the resorts cater to high-profile travelers seeking privacy and deep rejuvenation through personalized wellness programs.</p>
        <p>Booking waitlists have extended up to a year, indicating a massive shift in luxury travel preferences toward sustainable, slow-travel experiences far removed from crowded tourism hubs.</p>
      `
    },
    {
      title: "High-Speed Trans-European Rail Routes Expand Connecting Capital Corridors",
      snippet: "New luxury sleeper train networks connect major continental hubs, offering sustainable premium travel alternatives to regional flights.",
      image: "https://images.unsplash.com/photo-1532103054090-334e6e60ab29?w=800",
      content: `
        <p><strong>BRUSSELS, Belgium</strong> — European transport authorities have launched a series of high-speed luxury sleeper trains connecting major cities across the continent, offering a comfortable and eco-friendly alternative to regional air travel.</p>
        <p>The trains feature private suites, gourmet dining cars, and high-speed Wi-Fi, allowing business executives and leisure travelers to work and relax while traveling between Paris, Berlin, Vienna, and Rome overnight.</p>
        <p>With regional flight restrictions tightening across Europe, train passenger numbers are projected to grow by 40% over the next two years, driving investments in new track infrastructure.</p>
      `
    },
    {
      title: "Kyoto Tourism Board Restricts Access to Historic Districts to Prevent Crowding",
      snippet: "New regulations limit entry to geisha districts during peak hours, protecting local culture and heritage sites.",
      image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800",
      content: `
        <p><strong>KYOTO, Japan</strong> — The Kyoto Tourism Board has implemented new access controls in the historic Gion district to combat overcrowding and preserve the neighborhood's traditional atmosphere. Under the new rules, tourists are restricted from entering private alleys during evening hours.</p>
        <p>Local authorities have installed multilingual signage and deployed patrol officers to educate visitors on local customs and prevent inappropriate photography of geishas.</p>
        <p>Travel agencies are shifting focus toward guided cultural tours in lesser-known temples to distribute foot traffic more evenly across the city.</p>
      `
    },
    {
      title: "Luxury Cruise Ship Sets Sail on First Carbon-Neutral Arctic Expedition",
      snippet: "The hybrid-electric cruise vessel utilizes advanced bio-fuels and batteries to navigate fragile polar ecosystems safely.",
      image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?w=800",
      content: `
        <p><strong>TROMSO, Norway</strong> — A new hybrid-electric expedition vessel has departed on its maiden voyage to the Arctic Circle. The state-of-the-art cruise ship utilizes a combination of advanced low-emission bio-fuels and massive battery packs to operate silently in fragile polar waters.</p>
        <p>The ship's silent propulsion system minimizes disturbance to marine wildlife, while on-board laboratories allow passengers to participate in citizen-science research alongside marine biologists.</p>
        <p>The expedition marks a major milestone for the cruise industry, proving that polar exploration can be conducted with minimal ecological impact.</p>
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
        <p>Rescue teams have been deployed to Guaire and surrounding areas to clear debris and check for survivors in collapsed structures. Infrastructure damage is reported to be significant along coastal roads, prompting government officials to appeal for caution.</p>
        <p>International aid agencies are coordinating emergency shipments of food, water, and medical supplies to the affected regions, while seismic sensors monitor ongoing aftershocks.</p>
      `
    },
    {
      title: "Global Energy Transition Stabilizes as Geothermal Power Gained Ground",
      snippet: "Recent developments in deep-crust boring technology unlock massive clean heat reservoirs, supplying power to regional grids.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      content: `
        <p><strong>REYKJAVIK, Iceland</strong> — Breakthroughs in deep-bore geothermal drilling have unlocked massive clean energy potential, allowing power plants to tap into superheated steam reservoirs located miles below the Earth's crust.</p>
        <p>The new drilling technique utilizes advanced electromagnetic bits that melt through hard granite layer without mechanical wear, cutting setup costs for geothermal plants by up to 60%.</p>
        <p>Energy analysts predict that geothermal power will play a critical role in stabilizing national grids as countries phase out coal and gas plants in favor of renewable energy sources.</p>
      `
    },
    {
      title: "UN Climate Summit Agrees on Landmark Accord to Limit Plastics Production",
      snippet: "Delegates from 190 nations sign a legally binding treaty to reduce global plastics manufacturing by 40% over the next decade.",
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800",
      content: `
        <p><strong>GENEVA, Switzerland</strong> — Representatives from 190 countries have signed a historic agreement at the UN Climate Summit, committing to a legally binding treaty to curb the global production of single-use plastics.</p>
        <p>The accord mandates a 40% reduction in plastics manufacturing by 2035, alongside strict regulations on industrial plastic waste exports and penalties for marine dumping. 'This is a turning point for global ecological health,' the UN environment chief declared.</p>
        <p>Environmental groups celebrate the treaty as a massive victory, while packaging companies scramble to scale up production of biodegradable alternatives.</p>
      `
    },
    {
      title: "UK Prime Minister Announces Major Green Energy Investment Package",
      snippet: "A massive state funding injection aims to construct three new offshore wind farms, creating thousands of green jobs.",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800",
      content: `
        <p><strong>LONDON, United Kingdom</strong> — The UK Government has unveiled a multi-billion-pound investment package designed to accelerate the country's transition to renewable energy. The funding will support the construction of three massive wind farms off the Scottish coast.</p>
        <p>The wind farms are expected to generate enough electricity to power over five million homes once fully operational, reducing reliance on natural gas imports. 'This is about energy security and future-proofing our economy,' the Prime Minister stated.</p>
        <p>The initiative is expected to create over 15,000 skilled engineering and construction jobs across regional industrial hubs over the next five years.</p>
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
        <p>Stock indices responded positively to the announcement, with the S&P 500 and Dow Jones Industrial Average posting modest gains in late trading. Critics warn that keeping rates low for too long could reignite housing market bubbles.</p>
        <p>The Fed Chairman emphasized that the central bank remains data-dependent, ready to adjust monetary policies if global supply chains encounter further disruption.</p>
      `
    },
    {
      title: "Tech Stocks Rally Amid Breakthroughs in Neuromorphic Chip Architectures",
      snippet: "Public markets respond with record gains as major hardware companies finalize production runs for brain-inspired computing units.",
      image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800",
      content: `
        <p><strong>NEW YORK, USA</strong> — Technology sector shares led a massive market rally following reports that major hardware manufacturers have successfully developed commercially viable brain-inspired neuromorphic microchips.</p>
        <p>These chips process data in a manner similar to human synapses, drastically reducing power consumption and latency for localized AI processing in autonomous vehicles and mobile devices.</p>
        <p>Investment banks have upgraded target ratings for several leading semiconductor stocks, anticipating a massive wave of hardware replacement cycle purchases across data centers.</p>
      `
    },
    {
      title: "Gold Prices Hit Record High Amid Geopolitical Uncertainties in Middle East",
      snippet: "Investors flock to safe-haven assets as tensions rise, pushing gold prices above $2,400 per ounce.",
      image: "https://images.unsplash.com/photo-1610375461246-83df859d849d?w=800",
      content: `
        <p><strong>LONDON, UK</strong> — Gold prices surged to an all-time high of $2,425 per ounce as geopolitical instability in the Middle East drove investors toward safe-haven assets. Analysts attribute the rally to central bank purchases and a general risk-averse sentiment in global markets.</p>
        <p>The price spike has boosted mining stock valuations while putting pressure on jewelry manufacturers and industrial electronics firms that rely on gold components.</p>
        <p>Financial advisors recommend maintaining a diversified portfolio, noting that precious metals offer crucial protection against inflation and currency devaluation during times of global crisis.</p>
      `
    },
    {
      title: "Microsoft and OpenAI Plan $100 Billion Stargate Supercomputer Project",
      snippet: "The proposed data center complex will house millions of advanced AI chips, targeting artificial general intelligence.",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
      content: `
        <p><strong>REDMOND, USA</strong> — Microsoft and OpenAI are reportedly collaborating on plans for a massive data center project named 'Stargate,' estimated to cost up to $100 billion. The supercomputer will house millions of advanced AI accelerators to push the boundaries of model capabilities.</p>
        <p>The project highlights the massive infrastructure demands of generative AI, requiring dedicated nuclear power connections to satisfy its immense energy needs. 'The scale of this project is unprecedented,' an industry analyst noted.</p>
        <p>The first phase of the project is projected to become operational by 2028, setting the stage for a new era of corporate computing dominance.</p>
      `
    }
  ]
};

// Compile a large database by repeating/extending templates to reach 60 articles
const allArticles = [];

// Helper to copy template and randomize slightly to create unique articles
function addArticle(cat, index, template) {
  const timeOffset = index * 4; // hours ago
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

// Generate articles across all categories (8 articles per category = 56 total)
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
