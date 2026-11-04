---
title: "Learning From Financial Disasters"
---

## Learning goals
- Classify famous risk-management failures by their dominant risk type: interest rate, funding liquidity, model, rogue trading and operational.
- Explain how leverage turned modest asset losses into catastrophic equity losses in cases such as Orange County and LTCM.
- Describe the control failures behind rogue-trading losses at Barings, Société Générale and others.
- Calculate the equity impact of an asset shock for a leveraged portfolio.
- Draw general lessons for governance, limits and liquidity planning.

## Explanation

### Why study disasters?
Each famous loss is a natural experiment showing which defences failed. The pattern repeats: a strategy that worked for years, growing leverage or position size, controls that existed on paper but not in practice, and a shock that exposed everything at once.

### Interest rate risk and leverage: Orange County (1994)
The county's treasurer, Robert Citron, ran an investment pool of about USD 7.5 billion and used reverse repurchase agreements to borrow and expand holdings to roughly USD 20 billion, much of it in notes and structured securities (including inverse floaters) that lost value when rates rose. For years falling rates produced high returns and the strategy was praised. When the Federal Reserve raised rates repeatedly in 1994, the pool lost about USD 1.6 billion and the county filed for bankruptcy. Lessons: leverage multiplies duration; oversight bodies should understand what they approve; disclosure should state market-value risk, not just yield.

### Funding liquidity risk: Metallgesellschaft (1993)
A US subsidiary of the German group sold long-term contracts to supply oil products at fixed prices, then hedged them with short-dated futures that were rolled over each month (a "stack-and-roll" hedge). When oil prices fell, the futures produced large immediate margin calls, while gains on the long-dated customer contracts would arrive only over years. Contango also made each roll costly. Parent-company management closed the positions at a loss of roughly USD 1.3 billion. Lessons: an economically sensible hedge can still fail through cash-flow mismatch; funding needs must be planned; the decision to unwind can lock in losses.

### Model risk and leverage: Long-Term Capital Management (1998)
LTCM ran convergence and relative-value trades with balance-sheet leverage of around 25 to 1 and very large derivatives positions. After Russia defaulted in August 1998, investors fled to liquid, safe assets; spreads that the models expected to narrow widened instead, and correlations across supposedly unrelated trades jumped. The fund lost most of its capital, and the Federal Reserve Bank of New York coordinated a recapitalization of about USD 3.6 billion by a group of banks. Lessons: models calibrated on calm periods understate tail correlation; crowded trades are illiquid exactly when you need to exit; stress tests and liquidity horizons matter more than VaR.

### Rogue trading and operational risk
- **Barings (1995):** Nick Leeson in Singapore controlled both trading and settlement, hid losses in an error account and built huge Nikkei futures positions. After the Kobe earthquake the market fell and losses of about GBP 830 million destroyed the bank.
- **Sumitomo Corporation (1996):** a copper trader's unauthorized positions over a decade led to losses of about USD 2.6 billion.
- **Société Générale (2008):** Jérôme Kerviel built unauthorized index futures positions of around EUR 50 billion, concealed by fictitious offsetting trades; unwinding cost about EUR 4.9 billion.
- **JPMorgan "London Whale" (2012):** a hedging portfolio grew into a large credit-derivatives bet; a change to the VaR model lowered measured risk, and losses reached about USD 6.2 billion.

Common threads: no segregation of duties, ignored red flags (profits too large for the stated strategy), weak follow-up on limit breaches and alerts, and model changes that reduced reported risk without scrutiny.

### Conduct risk: Bankers Trust (1994)
Clients such as Procter & Gamble and Gibson Greetings suffered large losses on leveraged swaps they did not fully understand. Lawsuits and taped conversations damaged the bank's reputation. Lesson: selling products that clients cannot evaluate creates legal and reputational risk.

## Worked example
**Part A - Leverage and duration (stylized Orange County).** A pool has equity of USD 7.5 billion and total assets of USD 20.5 billion financed by repos. The asset duration is 2.8. Rates rise by 3 percentage points.

$$
\Delta V \approx -D \times V \times \Delta y = -2.8 \times 20.5 \times 0.03 = -1.722
$$

Loss = USD 1.722 billion. As a share of equity: $1.722 / 7.5 = 22.96\%$. Without leverage (assets = equity = 7.5), the loss would have been $2.8 \times 3\% = 8.4\%$. Leverage of $20.5 / 7.5 = 2.73$ times multiplies the equity hit by the same factor.

**Part B - Balance-sheet leverage (stylized LTCM).** Equity USD 4.7 billion, assets USD 125 billion.

Leverage $= 125 / 4.7 = 26.6$. A 2% fall in asset values costs $0.02 \times 125 = 2.5$ billion, which is $2.5 / 4.7 = $ **53.2% of equity**. A move of under 4% would wipe the fund out.

## Common exam traps
- Labelling Metallgesellschaft a pure market-risk loss; the core problem was funding liquidity and cash-flow mismatch of a hedge.
- Thinking LTCM failed because of fraud; it was leverage, model and liquidity risk in openly held positions.
- Computing an equity loss without multiplying by leverage (assets divided by equity).
- Treating rogue trading as unpredictable bad luck; the recurring cause is weak segregation of duties and ignored warning signs.
- Assuming VaR captures the risk of crowded or illiquid trades.

## Key takeaways
- Leverage converts small asset moves into large equity losses: equity return ≈ leverage × asset return.
- Hedges must be judged on cash flow and funding, not just economics.
- Models calibrated on calm data understate tail correlations and liquidity risk.
- Segregation of front and back office, timely reconciliation and investigation of unusual profits stop rogue traders.
- Culture and governance - who can challenge whom - sit behind almost every disaster.
