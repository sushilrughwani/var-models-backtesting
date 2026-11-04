---
title: "Fundamental Review of the Trading Book"
---

## Learning goals
- Explain the weaknesses of the earlier market risk framework that the Fundamental Review of the Trading Book (FRTB) set out to fix.
- Compare 97.5% expected shortfall with 99% VaR and explain the switch.
- Calculate a liquidity-horizon-adjusted expected shortfall from 10-day ES figures.
- Describe the desk-level approval tests, non-modellable risk factors and the default risk charge in the internal models approach.
- Outline the building blocks of the standardised approach and the tighter trading book boundary.

## Explanation

### Why the rules changed
The 2008 crisis exposed four problems in the old regime. First, **99% VaR** says nothing about losses beyond the quantile. Second, every position was treated as if it could be exited in **10 days**, even illiquid credit. Third, banks could move positions between the banking book and the trading book to pick the lower capital charge. Fourth, the standardised approach was too crude to serve as a credible fallback for internal models. FRTB responds on all four fronts.

### From VaR to expected shortfall
Under the internal models approach (IMA), capital rests on **expected shortfall at 97.5%**, the average loss in the worst 2.5% of outcomes. ES is subadditive and sees the shape of the tail. For a normal distribution the two measures are almost identical:

$$
\text{ES}_{97.5\%} = \sigma\,\frac{\phi(1.960)}{0.025} = 2.338\,\sigma, \qquad \text{VaR}_{99\%} = 2.326\,\sigma
$$

where $\phi$ is the standard normal density. So the change keeps capital broadly similar for thin-tailed books but charges more when tails are fat. ES must also be calibrated to a period of **significant stress**, replacing the separate stressed VaR. Because full stressed history may not exist for every factor, banks compute ES on a reduced set of factors and scale it up by the ratio of full to reduced ES in the current period.

### Liquidity horizons
Each risk factor is assigned a **liquidity horizon** of 10, 20, 40, 60 or 120 days, reflecting how long it takes to exit or hedge in stressed markets. Major-currency interest rates and large-cap equity prices sit at 10 days; high-yield credit spreads sit further out; the least liquid factors get 120 days. ES is computed for a 10-day base horizon and then cascaded:

$$
\text{ES} = \sqrt{\text{ES}_T(P)^2 + \sum_{j \ge 2}\left(\text{ES}_T(P,j)\sqrt{\frac{LH_j - LH_{j-1}}{T}}\right)^2}
$$

where $T = 10$ days, $\text{ES}_T(P)$ is the 10-day ES with all factors shocked, $\text{ES}_T(P,j)$ is the 10-day ES shocking only factors with liquidity horizon at least $LH_j$, and $LH_j$ is the $j$-th horizon in the list. Each band adds only the *extra* time over the previous horizon, so illiquid factors are charged for longer without double counting.

Diversification across risk classes is only partly recognised. The capital for modellable factors blends the ES of the whole book with the sum of stand-alone ES figures by risk class (rates, credit, equity, FX, commodities): $\text{IMCC} = 0.5\,\text{ES}_{\text{all}} + 0.5\sum_i \text{ES}_i$.

### Model approval at desk level
Approval is granted desk by desk, not for the whole bank. Each desk must pass:

- **Backtesting** of its 1-day VaR at 99% and 97.5% (a desk with more than 12 exceptions at 99%, or more than 30 at 97.5%, over the last 250 days fails).
- **P&L attribution**, comparing the risk model's theoretical P&L with the front office's hypothetical P&L using statistical tests of their correlation and distribution.

A failing desk moves to the standardised approach. Risk factors without enough real price observations become **non-modellable risk factors (NMRFs)** and are capitalised through a separate stress-scenario charge. A **default risk charge** captures jump-to-default risk on credit and equity positions.

### The standardised approach
The revised standardised approach (SA) is risk-sensitive and acts as a floor and fallback. It has three parts:

- **Sensitivities-based method:** delta, vega and curvature charges by risk class, aggregated with prescribed risk weights and correlations (and stressed versions of those correlations).
- **Default risk charge:** jump-to-default losses with offsetting rules.
- **Residual risk add-on:** a simple notional-based charge for exotic payoffs not captured elsewhere.

### A firmer boundary
Instruments are presumed to belong in the trading book or banking book by type and intent, and switching is tightly restricted. Any capital reduction from a switch is not recognised.

## Worked example
A desk reports 10-day ES at 97.5% (USD millions) for nested subsets of risk factors:

| Subset shocked | Liquidity horizon | 10-day ES |
|---|---|---|
| All factors | 10 | 20 |
| LH ≥ 20 | 20 | 12 |
| LH ≥ 40 | 40 | 8 |
| LH ≥ 60 | 60 | 4 |
| LH ≥ 120 | 120 | 2 |

**Step 1 - base term.** $20^2 = 400$.

**Step 2 - 20-day band.** Factor $\sqrt{(20-10)/10} = 1$; term $= 12^2 \times 1 = 144$.

**Step 3 - 40-day band.** Factor $\sqrt{2}$; term $= 8^2 \times 2 = 128$.

**Step 4 - 60-day band.** Factor $\sqrt{2}$; term $= 4^2 \times 2 = 32$.

**Step 5 - 120-day band.** Factor $\sqrt{6}$; term $= 2^2 \times 6 = 24$.

**Step 6 - combine.** $\sqrt{400 + 144 + 128 + 32 + 24} = \sqrt{728} =$ **USD 26.98 million**. Scaling all of it to 120 days ($20\sqrt{12} = 69.28$) would be far too punitive.

## Common exam traps
- Thinking ES at 97.5% is far more conservative than VaR at 99% under normality; they differ by about 0.5%.
- Scaling each band by $\sqrt{LH_j/T}$ instead of by the incremental horizon $\sqrt{(LH_j - LH_{j-1})/T}$.
- Assuming model approval is bank-wide; under FRTB it is desk by desk.
- Confusing the residual risk add-on (exotics) with the default risk charge (jump to default).
- Forgetting that ES must be calibrated to a stress period.

## Key takeaways
- FRTB replaces 99% VaR and stressed VaR with stress-calibrated 97.5% expected shortfall.
- Liquidity horizons of 10 to 120 days lengthen the risk horizon for less liquid factors through a cascading formula.
- Desks must pass backtesting and P&L attribution to use internal models; failures fall back to the standardised approach.
- Non-modellable factors and default risk receive separate capital charges.
- The standardised approach combines sensitivities-based charges, a default risk charge and a residual risk add-on.
