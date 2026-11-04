---
title: "Introduction to Derivatives"
---

## Learning goals
- Define a derivative and distinguish forwards, futures and options.
- Calculate payoffs and profits for long and short positions in forwards, calls and puts.
- Explain how hedgers, speculators and arbitrageurs use derivatives.
- Show how options give speculators leverage and why that leverage cuts both ways.

## Explanation

### What is a derivative?
A derivative is a contract whose value depends on (is derived from) the value of an underlying variable: a stock, an index, an exchange rate, an interest rate, a commodity, even the weather. Derivatives let you transfer a risk without transferring the asset itself. They trade on exchanges (standardised contracts) and over the counter (bilateral, customised contracts); the next lesson compares the two venues.

### Forwards and futures
A **forward contract** is an agreement today to buy or sell an asset at a fixed delivery price $K$ on a future date $T$. Nothing is paid upfront (the delivery price is set so that the contract is worth zero at inception). At maturity:

$$
\text{Long forward payoff} = S_T - K, \qquad \text{Short forward payoff} = K - S_T
$$

where $S_T$ is the spot price of the asset at maturity. The payoffs are linear and symmetric: one side's gain is the other's loss.

A **futures contract** is economically similar but is traded on an exchange, standardised and settled daily through margin accounts, which largely removes counterparty risk. Futures mechanics get their own lesson.

### Options
An option gives the holder a **right, not an obligation**. A **call** is the right to buy at strike $K$; a **put** is the right to sell at $K$. European options can be exercised only at maturity; American options at any time up to maturity. Because the holder has a right, the option has a price (premium) $c$ or $p$ paid upfront.

$$
\text{Long call payoff} = \max(S_T - K, 0), \qquad \text{Long put payoff} = \max(K - S_T, 0)
$$

Profit equals payoff minus the premium (ignoring the time value of the premium). The writer (short side) receives the premium and has the mirror-image payoff, so a short call has unlimited potential loss.

Key asymmetry: a forward obliges both parties, so the hedger locks in a price and gives up upside. An option protects against adverse moves while keeping favourable ones, at the cost of the premium.

### Three types of traders
- **Hedgers** use derivatives to reduce an existing risk. An exporter expecting foreign currency sells it forward to lock in the domestic value; an investor buys puts to put a floor under a portfolio.
- **Speculators** take a view and want leverage. Options and futures let them control a large exposure with a small outlay.
- **Arbitrageurs** lock in riskless profits from mispricing across markets. Their activity quickly closes the gaps, so true arbitrage opportunities are small and short-lived.

A recurring theme in derivative disasters is a trader mandated to hedge or arbitrage who quietly becomes a speculator. Strong limits and independent monitoring are essential.

## Worked example
**Hedger.** A US exporter will receive GBP 10 million in three months. The three-month forward rate is 1.2850 USD per GBP. Selling GBP forward locks in 10,000,000 × 1.2850 = **USD 12.85 million**, whatever the spot rate turns out to be. If spot ends at 1.2500 the hedge gains 10m × (1.2850 − 1.2500) = USD 350,000, offsetting the lower value of the receipt; if spot ends at 1.3200 the hedge loses USD 350,000 and the exporter forgoes the upside.

**Speculator.** A stock trades at USD 50. A three-month call with strike 55 costs USD 2.00. A speculator has USD 10,000.
- Strategy 1: buy 10,000 / 50 = 200 shares.
- Strategy 2: buy 10,000 / 2 = 5,000 calls.

If the stock rises to USD 65:
- Shares: profit = 200 × (65 − 50) = USD 3,000 (30% return).
- Calls: payoff per call = 65 − 55 = 10; profit = 5,000 × (10 − 2) = USD 40,000 (400% return).

If the stock falls to USD 45:
- Shares: loss = 200 × (45 − 50) = −USD 1,000 (−10%).
- Calls: expire worthless; loss = **−USD 10,000** (−100%).

The calls break even at $S_T = K + c = 55 + 2 = 57$. Leverage magnifies both directions.

**Arbitrageur.** A share trades at GBP 100 in London and USD 128 in New York, with the exchange rate at 1.30 USD per GBP. The London price in dollars is 100 × 1.30 = USD 130. Buy in New York at 128, sell in London for the equivalent of 130: riskless profit = **USD 2 per share**, ignoring transaction costs.

## Common exam traps
- Forgetting to subtract the premium when asked for profit rather than payoff.
- Thinking a forward has an upfront cost; at inception its value is zero.
- Confusing the right of the option holder with the obligation of the writer.
- Using $K - c$ instead of $K + c$ as the breakeven for a long call (it is $K - p$ for a long put).
- Assuming hedging improves the outcome; it reduces variability and can produce a worse result than not hedging.

## Key takeaways
- A derivative's value comes from an underlying variable.
- Forward and futures payoffs are linear: $S_T - K$ for the long side.
- Calls pay $\max(S_T - K, 0)$, puts pay $\max(K - S_T, 0)$; profit subtracts the premium.
- Hedgers reduce risk, speculators seek leveraged exposure, arbitrageurs exploit mispricing.
- Options provide leverage: large percentage gains, but the premium can be lost entirely.
- Controls must stop hedgers and arbitrageurs from drifting into speculation.
