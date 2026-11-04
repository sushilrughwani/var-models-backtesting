---
title: "Hedge Funds and Due Diligence"
---

## Learning goals
- Describe the features that distinguish hedge funds from traditional funds, including fees, leverage and liquidity terms.
- Explain the risk exposures of major hedge fund strategies, including hidden option-like and short-volatility risks.
- Identify biases in hedge fund return data and adjust reported volatility for return smoothing.
- Calculate net investor returns under management fees, incentive fees and a high-water mark.
- Outline the investment and operational due diligence an allocator should perform.

## Explanation

### What makes a hedge fund different
Hedge funds are private, lightly regulated pools that can short, use leverage and derivatives, and hold illiquid positions. Investors accept restricted liquidity (lock-ups, notice periods, **gates** that cap redemptions) and pay a management fee on assets plus an **incentive fee** on profits. A **high-water mark** means incentive fees are paid only on gains that take NAV above its previous peak; a **hurdle rate** requires a minimum return first. The incentive fee works like a call option for the manager: big upside, limited downside, which can encourage risk-taking, especially when the fund is far below its high-water mark.

### Strategies and their real exposures
Many strategies that look market-neutral carry hidden systematic risk:
- **Equity long/short**: usually net long, so it carries meaningful market beta.
- **Merger arbitrage**: long target, short acquirer; small steady gains, large losses when deals fail in market sell-offs. The payoff resembles selling put options on the market.
- **Convertible and fixed-income arbitrage**: earn spreads and liquidity premiums with high leverage; losses cluster in liquidity crises when spreads widen together.
- **Distressed and event-driven**: credit and liquidity risk.
- **Global macro and managed futures**: directional bets on rates, currencies and commodities; trend followers often gain in prolonged crises, behaving like long volatility.

The lesson from factor theory applies: much hedge fund "alpha" is compensation for bearing crash, liquidity or volatility risk. Linear regressions on market returns understate this, because short-option payoffs only reveal themselves in the tails.

### Problems with hedge fund data
- **Survivorship bias**: failed funds leave databases, so average returns are overstated and risk understated.
- **Backfill (instant history) bias**: funds join databases after a good track record and add their past returns.
- **Return smoothing**: illiquid holdings are marked with stale or model prices, so reported returns are serially correlated and too smooth. If observed returns follow a smoothing process with first-order autocorrelation $\rho$, a simple adjustment is

$$
\sigma_{true} \approx \sigma_{obs}\sqrt{\frac{1+\rho}{1-\rho}}
$$

where $\sigma_{obs}$ is the volatility of reported returns. Smoothing inflates Sharpe ratios and understates correlation with markets.

### Due diligence
**Investment due diligence** asks: What is the edge, and why should it persist? Does the strategy match the stated style? How is risk measured and limited (leverage, concentration, stop-losses, liquidity matching between assets and redemption terms)? Is performance explained by the stated bets?

**Operational due diligence** often matters more, because many fund failures stem from operational weakness or fraud rather than bad trades:
- Independent **valuation** by a reputable administrator, not by the portfolio manager.
- Credible **auditor**, **prime broker** and **custodian**; verify assets exist.
- Segregation of duties; strong compliance; cash controls that require multiple signatures.
- Governance, key-person risk and conflicts of interest; side letters giving some investors better terms.
- Legal terms: fees, lock-ups, gates, and the manager's ability to suspend redemptions.

Red flags include returns that are too smooth, refusal to explain the strategy, a small unknown auditor for a large fund, and self-administration.

## Worked example
A fund starts the year with NAV of USD 100 million and a high-water mark of USD 105 million (it lost money last year). Fees: 2% management fee on beginning NAV and 20% incentive fee on gains above the high-water mark after the management fee. Gross return: 15%.

**Step 1: gross NAV.** $100 \times 1.15 = 115$.

**Step 2: management fee.** $0.02 \times 100 = 2$; NAV after fee $= 113$.

**Step 3: incentive fee.** Gain above the high-water mark $= 113 - 105 = 8$; fee $= 0.20 \times 8 = 1.6$.

**Step 4: ending NAV.** $113 - 1.6 = 111.4$, so the investor's net return is **11.4%**. Without the high-water mark the incentive fee would be $0.20 \times 13 = 2.6$ and the net return only 10.4%.

**Smoothing check.** The fund reports 12% volatility with first-order autocorrelation of 0.4. Adjusted volatility $= 12\% \times \sqrt{1.4/0.6} = 18.33\%$. A reported Sharpe ratio of 1.0 falls to about $12/18.33 = 0.65$ on the adjusted figure.

## Common exam traps
- Charging the incentive fee on all gains when NAV starts below the high-water mark.
- Treating low reported volatility and correlation as genuine diversification instead of possible smoothing.
- Assuming "arbitrage" strategies are riskless; many are leveraged short-volatility bets.
- Focusing due diligence only on returns and ignoring valuation, custody and governance.
- Forgetting that survivorship and backfill biases both overstate database returns.

## Key takeaways
- Hedge funds combine leverage, shorting, illiquidity and option-like incentive fees.
- Many strategies earn premiums for crash, liquidity or volatility risk that appear only in the tails.
- Database returns are biased upward and reported volatility is biased downward by smoothing.
- High-water marks protect investors from paying twice for the same gains.
- Operational due diligence (independent valuation, custody, controls) is as important as investment due diligence.
