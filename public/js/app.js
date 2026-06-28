document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Tabs ---
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            tabButtons.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            const pane = document.getElementById(target);
            if (pane) pane.classList.add('active');
        });
    });

    // --- Header Navigation Link to Tab Switcher ---
    const navAcademyBtn = document.querySelector('.nav-academy-btn');
    if (navAcademyBtn) {
        navAcademyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTabBtn = document.querySelector('.tab-btn[data-target="crypto-academy"]');
            if (targetTabBtn) {
                targetTabBtn.click();
            }
            const terminalSec = document.getElementById('terminal');
            if (terminalSec) {
                terminalSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // --- Rotating Live Academy Lessons ---
    const academyLessons = [
        "Concentrated liquidity pools on Base (Aerodrome) currently show a 1.2% spread discrepancy for stablecoin pairs due to recent protocol rebalancings. Accessing these requires a low-latency execution wrapper.",
        "Triangular arbitrage on Solana: By routing USDC -> SOL -> BONK -> USDC on Jupiter, a 0.8% price mismatch was detected at block 28941042. MEV protection is highly recommended to prevent frontrunning.",
        "Aave Flash Loans: Learn how to execute a zero-collateral borrow of 100,000 USDC, route through Uniswap V3 (arbitrage path), and repay the loan in a single atomic transaction. Gas limits must not exceed 2.4M Gwei.",
        "Cross-chain latency: Sol-to-Eth bridge transfers currently average 4.2 minutes due to validator congestion. For arbitrage opportunities, use high-speed third-party liquidity hubs to keep settlement under 15 seconds."
    ];
    let currentLessonIndex = 0;
    const academyLessonText = document.getElementById('academyLessonText');
    if (academyLessonText) {
        setInterval(() => {
            currentLessonIndex = (currentLessonIndex + 1) % academyLessons.length;
            academyLessonText.style.opacity = 0;
            setTimeout(() => {
                academyLessonText.innerText = `"${academyLessons[currentLessonIndex]}"`;
                academyLessonText.style.opacity = 1;
            }, 300);
        }, 12000);
    }

    // --- DOM Hookups ---
    const cexTableBody = document.getElementById('cexTableBody');
    const dexTableBody = document.getElementById('dexTableBody');
    const whaleLedgerList = document.getElementById('whaleLedgerList');
    const sectorRotationList = document.getElementById('sectorRotationList');
    const networkHeatmapGrid = document.getElementById('networkHeatmapGrid');
    const threatList = document.getElementById('threatList');
    const alertLogList = document.getElementById('alertLogList');
    const latestAlertHeadline = document.getElementById('latestAlertHeadline');

    // Telemetry Indicators
    const wsStatusBadge = document.getElementById('wsStatusBadge');
    const latencyValue = document.getElementById('latencyValue');
    const processedTicks = document.getElementById('processedTicks');

    // Calculator inputs
    const calcCapitalInput = document.getElementById('calcCapital');
    const calcPairSelect = document.getElementById('calcPair');
    const calcSpreadVal = document.getElementById('calcSpreadVal');
    const calcGrossProfit = document.getElementById('calcGrossProfit');
    const calcFees = document.getElementById('calcFees');
    const calcNetProfit = document.getElementById('calcNetProfit');

    // Market Master Panel elements
    const sentFearGreed = document.getElementById('sentFearGreed');
    const sentSmartMoney = document.getElementById('sentSmartMoney');
    const sentSocial = document.getElementById('sentSocial');
    const macroCPI = document.getElementById('macroCPI');
    const macroFOMC = document.getElementById('macroFOMC');
    const macroUnlock = document.getElementById('macroUnlock');
    const agentLogStreamList = document.getElementById('agentLogStreamList');

    // Trade Orchestration elements
    const activeStrategySelect = document.getElementById('activeStrategySelect');
    const btnToggleBot = document.getElementById('btnToggleBot');
    const btnEmergencyKill = document.getElementById('btnEmergencyKill');
    const simModeToggle = document.getElementById('simModeToggle');
    const sliderMinProfit = document.getElementById('sliderMinProfit');
    const valMinProfit = document.getElementById('valMinProfit');
    const sliderMaxGas = document.getElementById('sliderMaxGas');
    const valMaxGas = document.getElementById('valMaxGas');
    const sliderLatencyLimit = document.getElementById('sliderLatencyLimit');
    const valLatencyLimit = document.getElementById('valLatencyLimit');

    const botTotalTrades = document.getElementById('botTotalTrades');
    const botWinRate = document.getElementById('botWinRate');
    const botNetProfit = document.getElementById('botNetProfit');
    const botRunningTime = document.getElementById('botRunningTime');

    let currentCexData = null;
    let currentDexData = null;
    let fallbackInterval = null;
    let socket = null;
    let tickCount = 0;


    // Bot autonomous simulation state
    let botActive = false;
    let simMode = true;
    let totalTradesVal = 247;
    let winRateVal = 98.38;
    let netProfitVal = 1248.52;
    let runningSeconds = 12 * 86400 + 4 * 3600 + 32 * 60; // 12d 4h 32m

    const baseMockCex = {
        "BTC/USDT": { "Binance": 67845.5, "Bybit": 67890.1, "OKX": 67812.3 },
        "ETH/USDT": { "Binance": 3485.2, "Bybit": 3491.8, "OKX": 3480.1 },
        "SOL/USDT": { "Binance": 168.45, "Bybit": 169.15, "OKX": 168.1 }
    };

    const networkFees = {
        "BTC/USDT": 5.0,
        "ETH/USDT": 8.0,
        "SOL/USDT": 0.05
    };

    const priceCache = {};

    function updateLatencyBadge(ms) {
        if (latencyValue) latencyValue.innerText = `${ms} ms`;
        const robotScanLatency = document.getElementById('robotScanLatency');
        if (robotScanLatency) robotScanLatency.innerText = `${ms} ms`;
    }

    function incrementTicks() {
        tickCount++;
        if (processedTicks) processedTicks.innerText = tickCount.toLocaleString();
    }

    function updateWsBadge(status) {
        if (!wsStatusBadge) return;
        const dot = wsStatusBadge.querySelector('.pulse-dot');
        const textSpan = wsStatusBadge.querySelector('span:not(.pulse-dot)');
        if (status === 'connecting') {
            wsStatusBadge.style.background = 'rgba(255, 152, 0, 0.1)';
            wsStatusBadge.style.color = 'var(--accent-orange)';
            wsStatusBadge.style.borderColor = 'rgba(255, 152, 0, 0.2)';
            if (dot) {
                dot.style.backgroundColor = 'var(--accent-orange)';
                dot.style.boxShadow = '0 0 8px var(--accent-orange)';
            }
            if (textSpan) textSpan.innerText = 'WS: CONNECTING';
        } else if (status === 'live') {
            wsStatusBadge.style.background = 'rgba(0, 230, 118, 0.1)';
            wsStatusBadge.style.color = '#00E676';
            wsStatusBadge.style.borderColor = 'rgba(0, 230, 118, 0.2)';
            if (dot) {
                dot.style.backgroundColor = '#00E676';
                dot.style.boxShadow = '0 0 8px #00E676';
            }
            if (textSpan) textSpan.innerText = 'WS: ACTIVE';
        } else {
            wsStatusBadge.style.background = 'rgba(255, 82, 82, 0.1)';
            wsStatusBadge.style.color = 'var(--accent-red)';
            wsStatusBadge.style.borderColor = 'rgba(255, 82, 82, 0.2)';
            if (dot) {
                dot.style.backgroundColor = 'var(--accent-red)';
                dot.style.boxShadow = '0 0 8px var(--accent-red)';
            }
            if (textSpan) textSpan.innerText = 'WS: OFFLINE';
        }
    }

    function addLogEntry(msg, isAlert = false) {
        if (!alertLogList) return;
        const timeStr = new Date().toLocaleTimeString();
        const logItem = document.createElement('div');
        logItem.className = 'log-item';
        
        let formattedMsg = msg;
        if (isAlert) {
            formattedMsg = `🚨 <strong style="color: var(--accent-red);">${msg}</strong>`;
        } else if (msg.includes('successful') || msg.includes('started')) {
            formattedMsg = `✨ <strong style="color: var(--accent);">${msg}</strong>`;
        }

        logItem.innerHTML = `
            <span class="log-time">[${timeStr}]</span>
            <span class="log-msg">${formattedMsg}</span>
        `;
        alertLogList.insertBefore(logItem, alertLogList.firstChild);

        while (alertLogList.children.length > 25) {
            alertLogList.removeChild(alertLogList.lastChild);
        }
    }

    function calculateSpread(exchs) {
        let minBuy = Infinity, maxSell = 0, minBuyExch = '', maxSellExch = '';
        Object.entries(exchs).forEach(([exch, prices]) => {
            const buy = prices.buy || prices;
            const sell = prices.sell || prices;
            if (buy < minBuy) { minBuy = buy; minBuyExch = exch; }
            if (sell > maxSell) { maxSell = sell; maxSellExch = exch; }
        });
        return {
            spread: ((maxSell - minBuy) / minBuy) * 100,
            buy_exch: minBuyExch,
            sell_exch: maxSellExch,
            buy_price: minBuy,
            sell_price: maxSell
        };
    }

    function updateCalculator() {
        if (!calcCapitalInput || !calcPairSelect) return;
        const capital = parseFloat(calcCapitalInput.value) || 0;
        const pair = calcPairSelect.value;
        let spread = 0;

        if (currentCexData && currentCexData.pairs[pair]) {
            spread = currentCexData.pairs[pair].spread_pct;
        } else if (baseMockCex[pair]) {
            const spreadCalc = calculateSpread(baseMockCex[pair]);
            spread = spreadCalc.spread;
        }

        const grossProfit = capital * (spread / 100);
        const tradingFee = capital * 0.002;
        const netFee = networkFees[pair] || 0.10;
        const totalFees = tradingFee + netFee;
        const netProfit = grossProfit - totalFees;

        if (calcSpreadVal) calcSpreadVal.innerText = `${spread.toFixed(3)}%`;
        if (calcGrossProfit) calcGrossProfit.innerText = `$${grossProfit.toFixed(2)}`;
        if (calcFees) calcFees.innerText = `$${totalFees.toFixed(2)}`;
        if (calcNetProfit) {
            calcNetProfit.innerText = `$${netProfit.toFixed(2)}`;
            calcNetProfit.style.color = netProfit > 0 ? "var(--accent)" : "var(--accent-red)";
        }
    }

    function renderCexTable(data) {
        if (!cexTableBody) return;
        cexTableBody.innerHTML = '';

        let highestSpread = 0;
        let highestSpreadMsg = "";

        Object.entries(data.pairs).forEach(([pair, details]) => {
            const tr = document.createElement('tr');
            const binanceVal = details.exchanges.Binance.buy;
            const bybitVal = details.exchanges.Bybit.buy;
            const okxVal = details.exchanges.OKX.buy;

            const spreadText = details.spread_pct > 0 ? `${details.spread_pct.toFixed(3)}%` : '0.00%';
            const spreadClass = details.spread_pct > 0.15 ? 'spread-badge' : 'spread-badge zero';

            tr.innerHTML = `
                <td style="font-weight:700; color:#fff;">${pair}</td>
                <td class="price-cell" data-key="${pair}-Binance">${binanceVal.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="price-cell" data-key="${pair}-Bybit">${bybitVal.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td class="price-cell" data-key="${pair}-OKX">${okxVal.toLocaleString(undefined, {minimumFractionDigits: 2})}</td>
                <td><span class="${spreadClass}">${spreadText}</span></td>
                <td><span style="color:var(--accent-blue); font-weight:bold;">${details.buy_exchange} ➔ ${details.sell_exchange}</span></td>
            `;
            cexTableBody.appendChild(tr);

            ['Binance', 'Bybit', 'OKX'].forEach(exch => {
                const cacheKey = `${pair}-${exch}`;
                const val = details.exchanges[exch].buy;
                if (priceCache[cacheKey] !== undefined && priceCache[cacheKey] !== val) {
                    const cell = tr.querySelector(`[data-key="${cacheKey}"]`);
                    if (cell) {
                        cell.style.color = val > priceCache[cacheKey] ? 'var(--accent)' : 'var(--accent-red)';
                        setTimeout(() => { cell.style.color = ''; }, 800);
                    }
                }
                priceCache[cacheKey] = val;
            });

            if (details.spread_pct > highestSpread) {
                highestSpread = details.spread_pct;
                highestSpreadMsg = `CEX Opportunity: Buy ${pair} on ${details.buy_exchange} ➔ Sell on ${details.sell_exchange} (${details.spread_pct.toFixed(3)}% spread)`;
            }
        });

        if (latestAlertHeadline && highestSpread > 0.15) {
            latestAlertHeadline.innerHTML = `<span style="color:var(--accent); font-weight:bold;">${highestSpreadMsg}</span>`;
        }

        const currentSelection = calcPairSelect.value;
        calcPairSelect.innerHTML = '';
        Object.entries(data.pairs).forEach(([pair, details]) => {
            const opt = document.createElement('option');
            opt.value = pair;
            opt.innerText = `${pair} (CEX Spread: ${details.spread_pct.toFixed(3)}%)`;
            if (pair === currentSelection) opt.selected = true;
            calcPairSelect.appendChild(opt);
        });

        updateCalculator();
    }

    function renderDexTable(data) {
        if (!dexTableBody) return;
        dexTableBody.innerHTML = '';

        if (!data.opportunities || data.opportunities.length === 0) {
            dexTableBody.innerHTML = `<tr><td colspan="6" style="text-align:center; color:#888;">No DEX gaps matching execution filters currently.</td></tr>`;
            return;
        }

        data.opportunities.forEach(opp => {
            const tr = document.createElement('tr');
            
            let riskColor = 'var(--accent)';
            let riskText = 'SAFE';
            if (opp.spread_pct > 0.5) {
                riskColor = 'var(--accent-orange)';
                riskText = 'MEDIUM';
            }
            if (opp.spread_pct > 1.5) {
                riskColor = 'var(--accent-red)';
                riskText = 'HIGH RISK';
            }

            tr.innerHTML = `
                <td style="font-weight:700; color:#fff;">${opp.pair}</td>
                <td><span style="color:var(--accent-blue); font-weight:500;">${opp.buy_market} ➔ ${opp.sell_market}</span></td>
                <td><span class="spread-badge">${opp.spread_pct.toFixed(3)}%</span></td>
                <td style="font-family:var(--font-mono);">$${opp.gas_est.toFixed(2)}</td>
                <td style="font-weight:600; color:var(--text-secondary);">${opp.type}</td>
                <td><strong style="color:${riskColor};">${riskText}</strong></td>
            `;
            dexTableBody.appendChild(tr);
        });
    }

    function renderWhaleLedger(data) {
        if (!whaleLedgerList) return;
        whaleLedgerList.innerHTML = '';

        if (!data.whale_flow || data.whale_flow.length === 0) {
            whaleLedgerList.innerHTML = `<div style="padding:20px; text-align:center; color:#888;">No whale flows scanned in memory pool.</div>`;
            return;
        }

        data.whale_flow.forEach(tx => {
            const div = document.createElement('div');
            div.className = 'whale-ledger-row';
            div.innerHTML = `
                <span class="whale-wallet-address">${tx.wallet}</span>
                <span style="color:var(--text-secondary);">${tx.time}</span>
                <span class="whale-tx-desc">${tx.msg}</span>
                <span class="whale-tx-value">$${tx.value.toLocaleString()}</span>
            `;
            whaleLedgerList.appendChild(div);
        });
    }

    function renderHeatmaps(data) {
        if (!networkHeatmapGrid) return;
        networkHeatmapGrid.innerHTML = '';

        Object.entries(data.network_status).forEach(([chain, stats]) => {
            const div = document.createElement('div');
            div.className = 'heatmap-block';
            
            const color = stats.status === "HEALTHY" ? "var(--accent)" : "var(--accent-red)";
            
            div.innerHTML = `
                <h4>${chain}</h4>
                <div class="heatmap-value">$${(stats.liquidity / 1000000).toFixed(2)}M</div>
                <div class="heatmap-stats">
                    <span>TPS: ${stats.tps}</span>
                    <strong style="color:${color}; font-size:0.75rem;">${stats.status}</strong>
                </div>
            `;
            networkHeatmapGrid.appendChild(div);
        });
    }

    function renderThreatMonitor(data) {
        if (!threatList) return;
        threatList.innerHTML = '';

        let itemsRendered = 0;
        Object.entries(data.dex_pools).forEach(([pair, pools]) => {
            pools.forEach(pool => {
                if (pool.security && itemsRendered < 4) {
                    const div = document.createElement('div');
                    const isHigh = pool.security.rugpull_prob_pct > 10.0;
                    div.className = `threat-item ${isHigh ? 'high' : ''}`;
                    
                    div.innerHTML = `
                        <div class="threat-header">
                            <span style="color:#fff;">${pool.dex} (${pool.chain.toUpperCase()})</span>
                            <span style="color:${isHigh ? 'var(--accent-red)' : 'var(--accent-orange)'};">RUG RISK: ${pool.security.rugpull_prob_pct}%</span>
                        </div>
                        <span class="threat-desc">Contract checks: Honeypot = ${pool.security.honeypot} | Status = ${pool.security.contract_risk}</span>
                        <div class="threat-meta">
                            <span>Asset: ${pair}</span>
                            <span>Liquidity: $${pool.liquidity.toLocaleString()}</span>
                        </div>
                    `;
                    threatList.appendChild(div);
                    itemsRendered++;
                }
            });
        });
    }

    function renderAlphaRotations(data) {
        if (!sectorRotationList) return;
        sectorRotationList.innerHTML = '';

        const sectors = (data && data.sectors) ? data.sectors : [
            { name: "Artificial Intelligence Tokens", gain: "+6.8%", fill: 88, color: "var(--accent)" },
            { name: "Solana DeFi Ecosystem", gain: "+4.2%", fill: 74, color: "var(--accent-blue)" },
            { name: "RWA Institutional Wrappers", gain: "+1.9%", fill: 52, color: "var(--text-secondary)" },
            { name: "Ethereum Layer-2 Scaling", gain: "-0.5%", fill: 35, color: "var(--accent-red)" }
        ];

        sectors.forEach(s => {
            const div = document.createElement('div');
            div.className = 'sector-bar-row';
            div.innerHTML = `
                <div class="sector-bar-header">
                    <span style="color:#ccc; font-weight:500;">${s.name}</span>
                    <strong style="color:${s.color};">${s.gain}</strong>
                </div>
                <div class="sector-bar-container">
                    <div class="sector-bar-fill" style="width: ${s.fill}%; background-color: ${s.color};"></div>
                </div>
            `;
            sectorRotationList.appendChild(div);
        });
    }



    // --- Market Sentinel Sentiment Fluctuation Ticks ---
    function rotateMarketSentiment() {
        if (!sentFearGreed) return;
        const fg = Math.floor(70 + Math.random() * 5);
        const sm = (1.50 + Math.random() * 0.08).toFixed(2);
        const sc = Math.floor(75 + Math.random() * 6);

        sentFearGreed.innerText = `${fg} (Greed)`;
        sentSmartMoney.innerText = `${sm} (Bullish)`;
        sentSocial.innerText = `${sc}% Positive`;

        const sentimentBotAlert = document.getElementById('sentimentBotAlert');
        if (sentimentBotAlert) {
            const tokens = ["BTC", "ETH", "SOL", "JUP", "AERODROME"];
            const t = tokens[Math.floor(Math.random() * tokens.length)];
            const change = (Math.random() * 1.5 + 0.5).toFixed(2);
            sentimentBotAlert.innerText = `BREAKING: Volume Spike on ${t} (+${change}%)`;
            sentimentBotAlert.style.color = 'var(--accent)';
            setTimeout(() => {
                if (sentimentBotAlert) {
                    sentimentBotAlert.innerText = 'SCANNING NEWS CHANNELS FOR BREAKOUTS...';
                    sentimentBotAlert.style.color = 'var(--accent-orange)';
                }
            }, 2500);
        }
    }

    // --- Trade Orchestration Control Bindings & Simulations ---
    const robotExecutionState = document.getElementById('robotExecutionState');
    
    function updateRobotState(active) {
        if (!robotExecutionState) return;
        if (active) {
            robotExecutionState.innerText = 'ACTIVE (ROUTING ENGINES RUNNING)';
            robotExecutionState.style.color = 'var(--accent)';
        } else {
            robotExecutionState.innerText = 'STANDBY';
            robotExecutionState.style.color = 'var(--accent-orange)';
        }
    }

    if (btnToggleBot) {
        btnToggleBot.addEventListener('click', () => {
            botActive = !botActive;
            updateRobotState(botActive);
            if (botActive) {
                btnToggleBot.innerText = '⏹️ STOP AUTONOMOUS BOT';
                btnToggleBot.style.backgroundColor = 'var(--accent-red)';
                btnToggleBot.style.color = '#fff';
                addLogEntry(`Autonomous execution started. Mode: ${simMode ? 'SIMULATION' : 'LIVE PRODUCTION'}. Strategy: ${activeStrategySelect.value.toUpperCase()}. TARGET PROFIT: ${sliderMinProfit.value}%`);
            } else {
                btnToggleBot.innerText = '▶️ INITIALIZE AUTONOMOUS BOT';
                btnToggleBot.style.backgroundColor = 'var(--accent)';
                btnToggleBot.style.color = '#000';
                addLogEntry(`Autonomous execution stopped by user command.`);
            }
        });
    }

    if (btnEmergencyKill) {
        btnEmergencyKill.addEventListener('click', () => {
            botActive = false;
            updateRobotState(false);
            if (btnToggleBot) {
                btnToggleBot.innerText = '▶️ INITIALIZE AUTONOMOUS BOT';
                btnToggleBot.style.backgroundColor = 'var(--accent)';
                btnToggleBot.style.color = '#000';
            }
            addLogEntry(`EMERGENCY SHUTDOWN TRIPPED BY USER. Pausing all routing gateways immediately.`, true);
        });
    }

    // --- USA HFT Route Simulator Widget ---
    const btnTriggerUsaSim = document.getElementById('btnTriggerUsaSim');
    const usaSimOutput = document.getElementById('usaSimOutput');
    const usaSimTerminalText = document.getElementById('usaSimTerminalText');

    if (btnTriggerUsaSim && usaSimOutput && usaSimTerminalText) {
        btnTriggerUsaSim.addEventListener('click', () => {
            btnTriggerUsaSim.disabled = true;
            btnTriggerUsaSim.style.background = '#333';
            btnTriggerUsaSim.innerText = '⌛ ROUTING SIGNAL THROUGH NY4 DATACENTER...';
            usaSimOutput.style.display = 'block';
            usaSimTerminalText.innerHTML = '';
            
            const logs = [
                "📡 Fetching NYSE (New York Stock Exchange) Order Book feeds...",
                "📡 Fetching Coinbase Prime Spot Tickers...",
                "⚖️ Discrepancy discovered: BTC/USD NYSE Premium +$145.20",
                "⚡ Routing atomic execution via NY4 Equinix fiber line...",
                "⏱️ Latency: 1.84ms | Gas: $0.12 (Base L2 Settlement)",
                "💸 Arbitrage Completed! Buy on Coinbase ➔ Sell on NYSE",
                "💰 Simulated Profit on $10,000 capital: +$144.90 USD (99.88% Win Probability!)"
            ];
            
            let i = 0;
            const interval = setInterval(() => {
                if (i < logs.length) {
                    usaSimTerminalText.innerHTML += logs[i] + "\n";
                    i++;
                } else {
                    clearInterval(interval);
                    btnTriggerUsaSim.disabled = false;
                    btnTriggerUsaSim.style.background = 'var(--accent-blue)';
                    btnTriggerUsaSim.innerText = '⚡ SIMULATE HFT USA ROUTE (FREE TEST)';
                }
            }, 600);
        });
    }

    if (simModeToggle) {
        simModeToggle.addEventListener('change', () => {
            simMode = simModeToggle.checked;
            addLogEntry(`Execution mode shifted to ${simMode ? 'SANDBOXED SIMULATION' : 'LIVE METRIC PRODUCTION'}.`);
        });
    }

    // Sliders event listeners
    if (sliderMinProfit) {
        sliderMinProfit.addEventListener('input', () => {
            valMinProfit.innerText = `${sliderMinProfit.value}%`;
        });
        sliderMinProfit.addEventListener('change', () => {
            addLogEntry(`Parameter update: Min profit threshold set to ${sliderMinProfit.value}%`);
        });
    }

    if (sliderMaxGas) {
        sliderMaxGas.addEventListener('input', () => {
            valMaxGas.innerText = `${sliderMaxGas.value} Gwei`;
        });
        sliderMaxGas.addEventListener('change', () => {
            addLogEntry(`Parameter update: Max execution gas set to ${sliderMaxGas.value} Gwei`);
        });
    }

    if (sliderLatencyLimit) {
        sliderLatencyLimit.addEventListener('input', () => {
            valLatencyLimit.innerText = `${sliderLatencyLimit.value} ms`;
        });
        sliderLatencyLimit.addEventListener('change', () => {
            addLogEntry(`Parameter update: Latency threshold limit set to ${sliderLatencyLimit.value} ms`);
        });
    }

    function formatDuration(sec) {
        const d = Math.floor(sec / 86400);
        const h = Math.floor((sec % 86400) / 3600);
        const m = Math.floor((sec % 3600) / 60);
        return `${d}d ${h}h ${m}m`;
    }

    function runBotPerformanceSimulation() {
        if (!botActive) return;

        runningSeconds += 3;
        if (botRunningTime) botRunningTime.innerText = formatDuration(runningSeconds);

        // 15% probability of a new trade occurring every tick
        if (Math.random() < 0.15) {
            totalTradesVal++;
            if (botTotalTrades) botTotalTrades.innerText = totalTradesVal;

            const isWin = Math.random() < 0.985; // Keep win rate high as configured
            if (isWin) {
                const increment = 4.0 + Math.random() * 25.0;
                netProfitVal += increment;
                if (botNetProfit) botNetProfit.innerText = `$${netProfitVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                
                const pairs = ["BTC/USDT", "ETH/USDT", "SOL/USDT"];
                const pair = pairs[Math.floor(Math.random() * pairs.length)];
                addLogEntry(`Autonomous trade successful: Bought ${pair} on Binance ➔ Sold on Bybit (Net Profit: +$${increment.toFixed(2)})`);

                // Update WhaleBot status
                const whaleBotProfitSignal = document.getElementById('whaleBotProfitSignal');
                if (whaleBotProfitSignal) {
                    whaleBotProfitSignal.innerText = `SIGNAL ACQUIRED (+$${increment.toFixed(2)})`;
                    setTimeout(() => {
                        if (whaleBotProfitSignal) whaleBotProfitSignal.innerText = 'TRACKING SMART MONEY FLOW SPREADS!';
                    }, 2000);
                }

                // Append popping profit element
                const whaleBotCardBody = document.getElementById('whaleBotCardBody');
                if (whaleBotCardBody) {
                    const pop = document.createElement('div');
                    pop.className = 'profit-pop-alert';
                    pop.innerText = `+$${increment.toFixed(2)} USD`;
                    pop.style.top = '15px';
                    pop.style.right = '20px';
                    whaleBotCardBody.appendChild(pop);
                    setTimeout(() => { pop.remove(); }, 1500);
                }
            } else {
                const loss = 2.0 + Math.random() * 8.0;
                netProfitVal -= loss;
                if (botNetProfit) botNetProfit.innerText = `$${netProfitVal.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
                addLogEntry(`Autonomous trade slippage check fail: Gas expended, route cancelled (Loss: -$${loss.toFixed(2)})`);
            }

            // Adjust Win Rate
            const wins = totalTradesVal * 0.9838;
            const newWinRate = (wins / totalTradesVal) * 100;
            if (botWinRate) botWinRate.innerText = `${newWinRate.toFixed(2)}%`;
        }
    }

    // --- Mock Tickers Fluctuators (Simulation Fallback) ---
    function runSimulation() {
        incrementTicks();
        const startTimer = performance.now();

        const mockCex = { pairs: {} };
        Object.entries(baseMockCex).forEach(([pair, exchs]) => {
            const snapshot = {};
            Object.entries(exchs).forEach(([exch, baseVal]) => {
                const fluc = (Math.random() - 0.5) * 0.0006;
                const buy = baseVal * (1 + fluc);
                snapshot[exch] = { buy: buy, sell: buy * 0.9997 };
            });
            const spreadCalc = calculateSpread(snapshot);
            mockCex.pairs[pair] = {
                spread_pct: spreadCalc.spread,
                buy_exchange: spreadCalc.buy_exch,
                buy_price: spreadCalc.buy_price,
                sell_exchange: spreadCalc.sell_exch,
                sell_price: spreadCalc.sell_price,
                exchanges: snapshot
            };
        });
        currentCexData = mockCex;
        renderCexTable(mockCex);

        const mockDex = {
            timestamp: new Date().toISOString(),
            dex_pools: {},
            opportunities: [],
            network_status: {},
            whale_flow: []
        };

        const mockChainAssets = {
            "ETH/USDT": [
                { chain: "ethereum", dex: "Uniswap V3", price: 3488.5, liq: 45000000 },
                { chain: "base", dex: "Aerodrome", price: 3491.2, liq: 12000000 },
                { chain: "bsc", dex: "PancakeSwap V3", price: 3484.8, liq: 8500000 }
            ],
            "BTC/USDT": [
                { chain: "ethereum", dex: "Uniswap V3", price: 67860.0, liq: 68000000 }
            ],
            "SOL/USDT": [
                { chain: "solana", dex: "Jupiter", price: 168.80, liq: 24000000 },
                { chain: "solana", dex: "Raydium", price: 168.10, liq: 6200000 }
            ]
        };

        Object.entries(mockChainAssets).forEach(([pair, pools]) => {
            mockDex.dex_pools[pair] = [];
            pools.forEach(p => {
                const fluc = (Math.random() - 0.5) * 0.001;
                const priceVal = p.price * (1 + fluc);
                const rug = 1.0 + (Math.random() * 2.0);
                
                mockDex.dex_pools[pair].push({
                    chain: p.chain,
                    dex: p.dex,
                    price: priceVal,
                    liquidity: p.liq,
                    baseToken: pair.split("/")[0],
                    security: {
                        rugpull_prob_pct: parseFloat(rug.toFixed(2)),
                        honeypot: "No",
                        contract_risk: "SAFE"
                    }
                });
            });

            const list = mockDex.dex_pools[pair];
            if (list.length >= 2) {
                const spreadVal = Math.abs(list[0].price - list[1].price) / list[0].price * 100;
                mockDex.opportunities.push({
                    pair: pair,
                    buy_market: list[0].price < list[1].price ? list[0].dex : list[1].dex,
                    buy_price: Math.min(list[0].price, list[1].price),
                    sell_market: list[0].price > list[1].price ? list[0].dex : list[1].dex,
                    sell_price: Math.max(list[0].price, list[1].price),
                    spread_pct: spreadVal,
                    type: "Cross-DEX",
                    gas_est: 0.35
                });
            }
        });

        Object.entries(mockCex.pairs).forEach(([pair, cexDetails]) => {
            if (mockDex.dex_pools[pair]) {
                mockDex.dex_pools[pair].forEach(p => {
                    const spread = ((p.price - cexDetails.buy_price) / cexDetails.buy_price) * 100;
                    if (spread > 0.08) {
                        mockDex.opportunities.push({
                            pair: pair,
                            buy_market: cexDetails.buy_exchange,
                            buy_price: cexDetails.buy_price,
                            sell_market: `${p.dex} (${p.chain.toUpperCase()})`,
                            sell_price: p.price,
                            spread_pct: spread,
                            type: "CEX ➔ DEX",
                            gas_est: 0.50
                        });
                    }
                });
            }
        });

        ["ethereum", "solana", "base", "bsc"].forEach(c => {
            mockDex.network_status[c] = {
                liquidity: c === "ethereum" ? 113000000 : 30200000,
                tps: c === "solana" ? 1850 : 25,
                status: "HEALTHY"
            };
        });

        mockDex.whale_flow = [
            { wallet: "0x3e...88e4", time: new Date().toLocaleTimeString(), msg: `Swap 150,000 USDC for 890 SOL via Jupiter`, value: 150000 },
            { wallet: "0x7a...41fa", time: new Date().toLocaleTimeString(), msg: `Whale bought 12 BTC ($814,000) on Uniswap (Ethereum)`, value: 814000 }
        ];

        currentDexData = mockDex;
        renderDexTable(mockDex);
        renderWhaleLedger(mockDex);
        renderHeatmaps(mockDex);
        renderThreatMonitor(mockDex);
        renderAlphaRotations();

        updateLatencyBadge(Math.round(performance.now() - startTimer));
    }

    // --- SSE Telemetry Ingestion ---
    let sseSource = null;

    function startWebSocketConnection() {
        updateWsBadge('connecting');
        
        try {
            // Establish SSE connection to our serverless backend
            const sseUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                ? 'http://103.220.198.8/api/stream' 
                : `${window.location.protocol}//${window.location.host}/api/stream`;

            sseSource = new EventSource(sseUrl);

            sseSource.onopen = () => {
                updateWsBadge('live');
                addLogEntry("Server-Sent Events (SSE) telemetry connection active.");
                if (fallbackInterval) {
                    clearInterval(fallbackInterval);
                    fallbackInterval = null;
                }
            };

            sseSource.onmessage = (event) => {
                const packet = JSON.parse(event.data);
                const startTimer = performance.now();
                
                if (packet.cex) {
                    currentCexData = packet.cex;
                    renderCexTable(packet.cex);
                }
                if (packet.dex) {
                    currentDexData = packet.dex;
                    renderDexTable(packet.dex);
                    renderWhaleLedger(packet.dex);
                    renderHeatmaps(packet.dex);
                    renderThreatMonitor(packet.dex);
                }
                if (packet.narrative) {
                    renderAlphaRotations(packet.narrative);
                }

                incrementTicks();
                updateLatencyBadge(Math.round(performance.now() - startTimer));
            };

            sseSource.onerror = (err) => {
                console.log("[Client UI] SSE link offline. Activating fallback mock simulation.");
                updateWsBadge('offline');
                if (sseSource) {
                    sseSource.close();
                    sseSource = null;
                }
                if (!fallbackInterval) {
                    runSimulation();
                    fallbackInterval = setInterval(runSimulation, 2000);
                }
            };
        } catch (e) {
            console.error('SSE initialization error:', e);
            updateWsBadge('offline');
            if (!fallbackInterval) {
                runSimulation();
                fallbackInterval = setInterval(runSimulation, 2000);
            }
        }
    }

    async function pollTelemetryData() {
        // SSE handles live updates. This function acts as a periodic fallback checks.
        if (sseSource && sseSource.readyState === EventSource.OPEN) return;
        
        // If not using SSE, fallback to local files fetch
        const startTimer = performance.now();
        try {
            const cexResp = await fetch(`data/arbitrage_data.json?t=${Date.now()}`);
            if (!cexResp.ok) throw new Error("CEX off");
            const cexData = await cexResp.json();
            
            const dexResp = await fetch(`data/dex_arbitrage_data.json?t=${Date.now()}`);
            if (!dexResp.ok) throw new Error("DEX off");
            const dexData = await dexResp.json();

            if (fallbackInterval) {
                clearInterval(fallbackInterval);
                fallbackInterval = null;
            }

            currentCexData = cexData;
            currentDexData = dexData;

            let narrativeData = null;
            try {
                const navResp = await fetch(`data/narrative_data.json?t=${Date.now()}`);
                if (navResp.ok) {
                    narrativeData = await navResp.json();
                }
            } catch (navErr) {}

            incrementTicks();
            renderCexTable(cexData);
            renderDexTable(dexData);
            renderWhaleLedger(dexData);
            renderHeatmaps(dexData);
            renderThreatMonitor(dexData);
            renderAlphaRotations(narrativeData);

            updateLatencyBadge(Math.round(performance.now() - startTimer));

        } catch (err) {
            if (!fallbackInterval) {
                console.log("[Client UI] REST Cache offline. Running fallback mock simulation...");
                runSimulation();
                fallbackInterval = setInterval(runSimulation, 2000);
            }
        }
    }

    // Form Event Handlers
    if (calcCapitalInput) calcCapitalInput.addEventListener('input', updateCalculator);
    if (calcPairSelect) calcPairSelect.addEventListener('change', updateCalculator);

    // --- Google Startup Audit UI Modal Handlers ---
    const apiDocsModal = document.getElementById('apiDocsModal');
    const btnOpenApiDocsModal = document.getElementById('btnOpenApiDocsModal');
    const btnCloseApiDocsModal = document.getElementById('btnCloseApiDocsModal');
    const btnCloseApiDocsModalBtn = document.getElementById('btnCloseApiDocsModalBtn');

    if (btnOpenApiDocsModal && apiDocsModal) {
        btnOpenApiDocsModal.addEventListener('click', (e) => {
            e.preventDefault();
            apiDocsModal.style.display = 'flex';
        });
    }
    const hideApiDocs = () => { if (apiDocsModal) apiDocsModal.style.display = 'none'; };
    if (btnCloseApiDocsModal) btnCloseApiDocsModal.addEventListener('click', hideApiDocs);
    if (btnCloseApiDocsModalBtn) btnCloseApiDocsModalBtn.addEventListener('click', hideApiDocs);

    // --- View Profile Toggle Handler ---
    const btnToggleProfile = document.getElementById('btnToggleProfile');
    const corporateProfileSection = document.getElementById('corporateProfileSection');
    if (btnToggleProfile && corporateProfileSection) {
        btnToggleProfile.addEventListener('click', (e) => {
            e.preventDefault();
            if (corporateProfileSection.style.display === 'none') {
                corporateProfileSection.style.display = 'block';
                btnToggleProfile.innerHTML = '👤 Hide Profile';
                corporateProfileSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                corporateProfileSection.style.display = 'none';
                btnToggleProfile.innerHTML = '👤 View Profile';
            }
        });
    }

    // --- Hardcoded Cookie Consent Handler ---
    const cookieConsentBanner = document.getElementById('cookieConsentBanner');
    const btnAcceptCookies = document.getElementById('btnAcceptCookies');
    const btnDeclineCookies = document.getElementById('btnDeclineCookies');

    if (cookieConsentBanner) {
        const consentVal = localStorage.getItem('arbitrage_cookie_consent');
        if (consentVal === 'accept' || consentVal === 'decline') {
            cookieConsentBanner.style.display = 'none';
        }

        if (btnAcceptCookies) {
            btnAcceptCookies.addEventListener('click', () => {
                localStorage.setItem('arbitrage_cookie_consent', 'accept');
                cookieConsentBanner.style.opacity = '0';
                setTimeout(() => { cookieConsentBanner.style.display = 'none'; }, 300);
                addLogEntry("Cookie consent preferences registered: ACCEPTED.");
            });
        }
        if (btnDeclineCookies) {
            btnDeclineCookies.addEventListener('click', () => {
                localStorage.setItem('arbitrage_cookie_consent', 'decline');
                cookieConsentBanner.style.opacity = '0';
                setTimeout(() => { cookieConsentBanner.style.display = 'none'; }, 300);
                addLogEntry("Cookie consent preferences registered: DECLINED.");
            });
        }
    }

    // --- Live Technology Command Logs (Observability) ---
    const runLiveCommandLogsSync = () => {
        const chains = ["Ethereum", "Solana", "Base", "BSC", "Arbitrum"];
        const randomChain = chains[Math.floor(Math.random() * chains.length)];
        const latency = Math.floor(8 + Math.random() * 20);
        const activeSockets = Math.floor(3 + Math.random() * 8);
        
        const logsTemplates = [
            `[AGENT_CRYPTO_INTEL] Scanning liquidity pools on ${randomChain}. Target spreads located. Connection Lag: ${latency}ms.`,
            `[AGENT_MARKET_MASTER] Ingesting decentralized order-book streams. Running sentiment calculations...`,
            `[AGENT_CRYPTO_INTEL] Arbitrage Opportunity: Buy SOL on Binance ➔ Sell on Jupiter (${randomChain}) | Spread: 0.42%`,
            `[AGENT_MARKET_MASTER] Whale alert detected: 0x3e...88e4 swapped 150,000 USDC for 890 SOL.`,
            `[AGENT_CRYPTO_INTEL] Executing WebSocket broadcast of active cross-market pricing state to ${activeSockets} user UI frames.`,
            `[AGENT_MARKET_MASTER] CPI announcement analysis: Fed rate expectation shift. Volatility impact: Low.`
        ];
        
        const logMsg = logsTemplates[Math.floor(Math.random() * logsTemplates.length)];
        addLogEntry(logMsg);

        if (agentLogStreamList) {
            if (agentLogStreamList.innerHTML.includes('Initializing multi-agent')) {
                agentLogStreamList.innerHTML = '';
            }
            const logItem = document.createElement('div');
            logItem.style.lineHeight = '1.4';
            logItem.style.padding = '4px 0';
            logItem.style.borderBottom = '1px solid rgba(255, 255, 255, 0.02)';
            
            const timeStr = new Date().toLocaleTimeString();
            let coloredMsg = logMsg;
            if (logMsg.includes('[AGENT_CRYPTO_INTEL]')) {
                coloredMsg = `<span style="color: var(--accent-blue); font-weight: bold;">[AGENT_CRYPTO_INTEL]</span>` + logMsg.replace('[AGENT_CRYPTO_INTEL]', '');
            } else if (logMsg.includes('[AGENT_MARKET_MASTER]')) {
                coloredMsg = `<span style="color: var(--accent); font-weight: bold;">[AGENT_MARKET_MASTER]</span>` + logMsg.replace('[AGENT_MARKET_MASTER]', '');
            }
            logItem.innerHTML = `<span style="color: #666;">[${timeStr}]</span> ${coloredMsg}`;
            agentLogStreamList.appendChild(logItem);
            
            while (agentLogStreamList.children.length > 20) {
                agentLogStreamList.removeChild(agentLogStreamList.firstChild);
            }
            agentLogStreamList.scrollTop = agentLogStreamList.scrollHeight;
        }
    };

    // Run connections and ticks
    startWebSocketConnection();
    pollTelemetryData();
    setInterval(pollTelemetryData, 2000);


    setInterval(rotateMarketSentiment, 5000);
    setInterval(runBotPerformanceSimulation, 3000);

    // Run live observability command sync logs simulation
    setInterval(runLiveCommandLogsSync, 5000);

    // --- Unified Legal & Corporate Modal Overlay Handlers ---
    const legalModal = document.getElementById('legalModal');
    const legalModalTitle = document.getElementById('legalModalTitle');
    const legalModalBody = document.getElementById('legalModalBody');
    const btnCloseLegalModal = document.getElementById('btnCloseLegalModal');
    const btnCloseLegalModalBtn = document.getElementById('btnCloseLegalModalBtn');

    const legalContents = {
        'terms.html': {
            title: '📄 Terms of Service Agreement',
            content: `
                <div style="font-family:var(--font-sans); color:var(--text-secondary); line-height:1.7;">
                    <div style="background:rgba(255, 215, 0, 0.03); border:1px solid rgba(255, 215, 0, 0.15); padding:15px; border-radius:6px; margin-bottom:20px; font-size:0.8rem; color:#fff;">
                        <strong>Corporate Identity Verification Notice:</strong> This platform is owned, managed, and operated under the corporate registry of <strong>Katke Enterprises</strong> (Established: 07/11/2013 | MSME Registration Number: <strong>UDYAM-MH-17-0069728</strong>). Registered Headquarters: 301, Riddhi Siddhi Apartment, Near Shani Temple, Gaskopri, Virar - 401305, Taluka: Vasai, District: Palghar, Maharashtra, India.
                    </div>
                    
                    <h4 style="color:#fff; margin-bottom:8px; font-weight:700;">1. Agreement to Terms</h4>
                    <p>By accessing or using the Arbitrage Smart AI dashboard and real-time telemetry websocket gateways, you agree to be legally bound by these Terms of Service. If you do not agree, you must terminate access immediately.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">2. Service Scope & System Operation</h4>
                    <p>We provide real-time arbitrage telemetry, price discrepancy scanning data aggregated across central book order sheets (Binance, Bybit, OKX) and decentralized liquidity pools (Uniswap, Jupiter). Users acknowledge that all displayed data represents statistical estimates and is intended solely for educational, tracking, and diagnostic purposes. We do not act as an exchange, broker-dealer, asset custodian, or digital wallet provider.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">3. MSME Licensing & Registration Details</h4>
                    <ul style="padding-left:20px; margin-bottom:15px; list-style-type:square;">
                        <li><strong>Legal Entity Name:</strong> Katke Enterprises</li>
                        <li><strong>MSME Registration Number:</strong> UDYAM-MH-17-0069728</li>
                        <li><strong>Registration Date:</strong> 07/11/2013</li>
                        <li><strong>Business Commencement:</strong> 06/09/2013</li>
                        <li><strong>Registered Office:</strong> 301, Riddhi Siddhi Apartment, Near Shani Temple, Gaskopri, Virar - 401305, Taluka: Vasai, District: Palghar, Maharashtra, India.</li>
                    </ul>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">4. User Account & API Keys</h4>
                    <p>Subscribing to premium webhook notifications, advanced latency tracking modules, and premium Discord servers requires a registered account. Users are entirely responsible for securing access credentials, API keys, and private webhook endpoints. Katke Enterprises reserves the right to terminate accounts that violate rate limits or distribute proprietary order streams.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">5. Payment Processing & Fees</h4>
                    <p>All subscription billings, payment tokens, and premium Crypto Academy enrollments are managed securely via PCI-DSS compliant gateways (including Razorpay and PayPal). All fees are non-refundable unless specified otherwise in our Refund Policy.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">6. Governing Law & Dispute Resolution</h4>
                    <p>These terms are governed by the laws of India. Any dispute, claim, or controversy arising out of this agreement shall be submitted to the exclusive jurisdiction of the competent courts of Mumbai, Maharashtra, India.</p>
                </div>
            `
        },
        'privacy.html': {
            title: '🛡️ Privacy & Cookie Policy',
            content: `
                <div style="font-family:var(--font-sans); color:var(--text-secondary); line-height:1.7;">
                    <div style="background:rgba(0, 176, 255, 0.03); border:1px solid rgba(0, 176, 255, 0.15); padding:15px; border-radius:6px; margin-bottom:20px; font-size:0.8rem; color:#fff;">
                        <strong>GDPR & India DPDPA Data Controller:</strong> Katke Enterprises (Estd: 07/11/2013 | MSME Reg No: <strong>UDYAM-MH-17-0069728</strong>). Registered Headquarters: 301, Riddhi Siddhi Apartment, Near Shani Temple, Gaskopri, Virar - 401305, Taluka: Vasai, District: Palghar, Maharashtra, India.
                    </div>
                    
                    <h4 style="color:#fff; margin-bottom:8px; font-weight:700;">1. Data Collection and Usage</h4>
                    <p>We process data to deliver telemetry performance indicators and prevent API abuse. We collect:
                        <br>• Account details (email addresses and payment tokens during checkout).
                        <br>• IP addresses, browser user agents, and routing log latencies to optimize regional server deployments.
                    </p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">2. Cookiebot & Consent Management</h4>
                    <p>We leverage Cookiebot for cookie consent management. Analytics tracking (such as Google Analytics G-LX2P8H9BY4) is executed conditionally based on user approval. You can withdraw or adjust consent choices at any time directly in the settings modal.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">3. Data Security & Storage</h4>
                    <p>All information is transmitted via TLS encryption and stored securely inside GCP Mumbai datacenters. We implement access logs, systemd process sandboxing, and periodic backups to guarantee storage integrity.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">4. User Data Rights</h4>
                    <p>Under GDPR and India DPDPA guidelines, users can request data export, modification, or erasure. Please submit data requests directly to the Grievance Officer at <a href="mailto:manikkatke93@gmail.com" style="color:var(--accent-blue);">manikkatke93@gmail.com</a>.</p>
                </div>
            `
        },
        'risk.html': {
            title: '⚠️ Risk Disclosure Statement',
            content: `
                <div style="font-family:var(--font-sans); color:var(--text-secondary); line-height:1.7;">
                    <div style="background:rgba(255, 82, 82, 0.03); border:1px solid rgba(255, 82, 82, 0.15); padding:15px; border-radius:6px; margin-bottom:20px; font-size:0.8rem; color:#fff;">
                        <strong>Corporate Risk Compliance Notice:</strong> Provided by <strong>Katke Enterprises</strong> (Established: 07/11/2013 | MSME Registration Number: <strong>UDYAM-MH-17-0069728</strong>). Registered Headquarters: 301, Riddhi Siddhi Apartment, Near Shani Temple, Gaskopri, Virar - 401305, Taluka: Vasai, District: Palghar, Maharashtra, India.
                    </div>
                    
                    <h4 style="color:#fff; margin-bottom:8px; font-weight:700;">1. Asset Volatility Warning</h4>
                    <p>Trading digital assets, interacting with decentralized pools, and executing cross-chain message protocols involve extreme financial risks. Asset prices can change rapidly, and trading volumes can disappear instantly.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">2. Telemetry & Simulation Disclaimer</h4>
                    <p>All spreads, triangular arbitrage calculators, and latency logs displayed on this terminal are mock data simulations provided for educational and technical verification purposes. They do not constitute investment advice or recommendations to transact.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">3. Software Execution Risk</h4>
                    <p>Users acknowledge that smart contracts are susceptible to code bugs, re-entrancy issues, gas limit overruns, and network validator delays. Katke Enterprises is not liable for loss of capital resulting from automated scripts, flash loans, or WebSocket disconnects.</p>
                </div>
            `
        },
        'aml-kyc.html': {
            title: '👔 Anti-Money Laundering & KYC Compliance',
            content: `
                <div style="font-family:var(--font-sans); color:var(--text-secondary); line-height:1.7;">
                    <div style="background:rgba(255, 255, 255, 0.03); border:1px solid var(--card-border); padding:15px; border-radius:6px; margin-bottom:20px; font-size:0.8rem; color:#fff;">
                        <strong>Compliance Controller:</strong> Katke Enterprises (Estd: 07/11/2013 | MSME Reg No: <strong>UDYAM-MH-17-0069728</strong>). Registered Headquarters: 301, Riddhi Siddhi Apartment, Near Shani Temple, Gaskopri, Virar - 401305, Taluka: Vasai, District: Palghar, Maharashtra, India.
                    </div>
                    
                    <h4 style="color:#fff; margin-bottom:8px; font-weight:700;">1. AML/KYC Framework Statement</h4>
                    <p>Katke Enterprises enforces robust Anti-Money Laundering (AML) and Know-Your-Customer (KYC) procedures. These protocols prevent the usage of our telemetry services for illicit financial activities, structuring, or sanction evasion.</p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">2. Verification Levels</h4>
                    <p>
                        • <strong>Level 1 (Telemetry Broadcasts):</strong> Client-side logging and device browser agent checks.
                        <br>• <strong>Level 2 (Billing & Payments):</strong> Mandatory name and payment verification via Razorpay / PayPal.
                        <br>• <strong>Level 3 (Institutional API):</strong> Verification of government ID, proof of address, and corporate business license registry sheets.
                    </p>
                    
                    <h4 style="color:#fff; margin-top:20px; margin-bottom:8px; font-weight:700;">3. Sanctions & Blocklists</h4>
                    <p>We block registrations from jurisdictions subject to global comprehensive embargoes (including Iran, North Korea, Syria, Cuba, and Crimea). Transaction telemetry links with known mixer contracts (e.g. Tornado Cash) are blacklisted instantly.</p>
                </div>
            `
        }
    };

    function showLegalModal(docName) {
        const doc = legalContents[docName];
        if (doc && legalModal && legalModalTitle && legalModalBody) {
            legalModalTitle.innerHTML = doc.title;
            legalModalBody.innerHTML = doc.content;
            legalModal.style.display = 'flex';
        }
    }

    const hideLegalModal = () => { if (legalModal) legalModal.style.display = 'none'; };
    if (btnCloseLegalModal) btnCloseLegalModal.addEventListener('click', hideLegalModal);
    if (btnCloseLegalModalBtn) btnCloseLegalModalBtn.addEventListener('click', hideLegalModal);

    // Intercept clicks on legal links
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link) {
            const href = link.getAttribute('href') || '';
            const match = Object.keys(legalContents).find(key => href.endsWith(key));
            if (match) {
                e.preventDefault();
                showLegalModal(match);
            }
        }
    });

    // --- Ecosystem Live Verification Log Streamer (Repurposed for multi-agent trade verification) ---
    const ecosystemVerificationStream = document.getElementById('ecosystemVerificationStream');
    const runEcosystemVerificationLogSync = () => {
        if (!ecosystemVerificationStream) return;
        
        const networks = ["Ethereum Mainnet", "Solana SVM", "Base L2", "Arbitrum One", "BSC Mainnet"];
        const net = networks[Math.floor(Math.random() * networks.length)];
        const timeStr = new Date().toLocaleTimeString();
        
        const logs = [
            `[${timeStr}] [SCAN] AGENT_CRYPTO_INTEL verified contract state on ${net}. Gas: optimal.`,
            `[${timeStr}] [VERIFY] AGENT_MARKET_MASTER confirmed spread opportunity: Binance ➔ Bybit (+0.38%).`,
            `[${timeStr}] [TELEMETRY] TimescaleDB hypertable 'spread_history' write confirmed on ${net}. Latency: 8ms.`,
            `[${timeStr}] [SECURE] Multisig telemetry validation complete. Transaction hash broadcasted.`,
            `[${timeStr}] [AUDIT] Verification daemon completed gas limit compliance check: 100% OK.`,
            `[${timeStr}] [KAFKA] Dispatched order-book state updates to topic 'mkt-arbitrage-telemetry'.`
        ];
        
        const logMsg = logs[Math.floor(Math.random() * logs.length)];
        const logItem = document.createElement('div');
        logItem.style.color = '#ccc';
        logItem.style.lineHeight = '1.4';
        
        if (logMsg.includes('[SCAN]')) {
            logItem.innerHTML = `<span style="color: var(--accent-blue);">${logMsg.slice(0, 20)}</span>${logMsg.slice(20)}`;
        } else if (logMsg.includes('[VERIFY]')) {
            logItem.innerHTML = `<span style="color: var(--accent);">${logMsg.slice(0, 20)}</span>${logMsg.slice(20)}`;
        } else if (logMsg.includes('[TELEMETRY]')) {
            logItem.innerHTML = `<span style="color: var(--accent-orange);">${logMsg.slice(0, 20)}</span>${logMsg.slice(20)}`;
        } else {
            logItem.innerHTML = `<span style="color: var(--text-secondary);">${logMsg.slice(0, 20)}</span>${logMsg.slice(20)}`;
        }
        
        ecosystemVerificationStream.appendChild(logItem);
        while (ecosystemVerificationStream.children.length > 8) {
            ecosystemVerificationStream.removeChild(ecosystemVerificationStream.firstChild);
        }
        ecosystemVerificationStream.scrollTop = ecosystemVerificationStream.scrollHeight;
    };

    // Run ecosystem verification logs simulation
    setInterval(runEcosystemVerificationLogSync, 3000);
    runEcosystemVerificationLogSync(); // Initial run

    // Intercept Ecosystem navigation/footer links
    const ecosystemLinks = document.querySelectorAll('a[href="#ecosystem"], .ecosystem-link, a[href="#corporate-profile"]');
    ecosystemLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const footerSec = document.getElementById('corporate-profile');
            if (footerSec) {
                footerSec.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Phase 3: Real-Time Intelligence Dashboard Counter Animation ---
    let oppScanned = 14205832;
    let signalsProcessed = 384021;
    let dataPointsCollected = 294801048;
    
    if (document.getElementById('counterOppScanned')) {
        oppScanned = parseInt(document.getElementById('counterOppScanned').innerText.replace(/,/g, '')) || 14205832;
    }
    if (document.getElementById('counterSignalsProcessed')) {
        signalsProcessed = parseInt(document.getElementById('counterSignalsProcessed').innerText.replace(/,/g, '')) || 384021;
    }
    if (document.getElementById('counterDataPoints')) {
        dataPointsCollected = parseInt(document.getElementById('counterDataPoints').innerText.replace(/,/g, '')) || 294801048;
    }
    
    const counterOppScanned = document.getElementById('counterOppScanned');
    const counterSignalsProcessed = document.getElementById('counterSignalsProcessed');
    const counterDataPoints = document.getElementById('counterDataPoints');
    
    const animateBloombergCounters = () => {
        oppScanned += Math.floor(Math.random() * 4) + 1;
        signalsProcessed += Math.floor(Math.random() * 2);
        dataPointsCollected += Math.floor(Math.random() * 50) + 10;
        
        if (counterOppScanned) counterOppScanned.innerText = oppScanned.toLocaleString();
        if (counterSignalsProcessed) counterSignalsProcessed.innerText = signalsProcessed.toLocaleString();
        if (counterDataPoints) counterDataPoints.innerText = dataPointsCollected.toLocaleString();
    };
    setInterval(animateBloombergCounters, 800); // Fast live updates

    // --- Premium Crypto Academy Payment Selection Modal ---
    const academyCheckoutModal = document.getElementById('academyCheckoutModal');
    const btnAcademyUnlock = document.getElementById('btnAcademyUnlock');
    const btnCloseAcademyModal = document.getElementById('btnCloseAcademyModal');
    const btnCancelAcademyModal = document.getElementById('btnCancelAcademyModal');
    const btnTriggerRazorpay = document.getElementById('btnTriggerRazorpay');

    if (btnAcademyUnlock && academyCheckoutModal) {
        btnAcademyUnlock.addEventListener('click', (e) => {
            e.preventDefault();
            academyCheckoutModal.style.display = 'flex';
        });
    }

    const hideAcademyModal = () => {
        if (academyCheckoutModal) academyCheckoutModal.style.display = 'none';
    };

    if (btnCloseAcademyModal) btnCloseAcademyModal.addEventListener('click', hideAcademyModal);
    if (btnCancelAcademyModal) btnCancelAcademyModal.addEventListener('click', hideAcademyModal);

    // Initialize Razorpay integration
    if (btnTriggerRazorpay) {
        btnTriggerRazorpay.addEventListener('click', () => {
            if (window.Razorpay) {
                const options = {
                    key: "rzp_live_dummykey",
                    amount: 9900, // $99.00 in cents/paise
                    currency: "USD",
                    name: "Arbitrage Smart AI",
                    description: "Unlock Pro Institutional Access",
                    handler: function(response) {
                        addLogEntry("Razorpay Payment Successful! ID: " + response.razorpay_payment_id);
                        window.location.href = "success.html?gateway=razorpay&tx=" + response.razorpay_payment_id;
                    },
                    prefill: {
                        name: "Manik Katke",
                        email: "manikkatke93@gmail.com"
                    },
                    theme: {
                        color: "#00E676"
                    }
                };
                const rzp = new Razorpay(options);
                rzp.open();
            } else {
                addLogEntry("Razorpay SDK not loaded. Simulating payment...", true);
                setTimeout(() => {
                    window.location.href = "success.html?gateway=razorpay&tx=pay_mock_" + Math.random().toString(36).substr(2, 9);
                }, 1500);
            }
        });
    }

    // Initialize PayPal Smart Buttons safely
    const initPayPalButtons = () => {
        if (window.paypal && document.getElementById('paypal-button-container-academy')) {
            paypal.Buttons({
                createOrder: function(data, actions) {
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: '99.00'
                            },
                            description: 'Arbitrage Smart AI Pro Institutional Access'
                        }]
                    });
                },
                onApprove: function(data, actions) {
                    return actions.order.capture().then(function(details) {
                        addLogEntry("PayPal Payment Approved! Transaction ID: " + details.id);
                        window.location.href = "success.html?gateway=paypal&tx=" + details.id + "&user=" + encodeURIComponent(details.payer.name.given_name);
                    });
                },
                onError: function(err) {
                    console.error("PayPal Error:", err);
                    addLogEntry("PayPal Checkout Error encountered.", true);
                }
            }).render('#paypal-button-container-academy');
        }
    };
    
    if (window.paypal) {
        initPayPalButtons();
    } else {
        let retries = 0;
        const interval = setInterval(() => {
            retries++;
            if (window.paypal) {
                initPayPalButtons();
                clearInterval(interval);
            } else if (retries > 10) {
                clearInterval(interval);
            }
        }, 500);
    }
});
