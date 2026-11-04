---
title: "Fundamental Review of the Trading Book"
duration: 24
---

## Lecture outline
- 00:00 - Hook: in 2008 some banks held illiquid credit in the trading book with a 10-day VaR horizon. Why was that a problem?
- 03:00 - Four weaknesses of the old regime and FRTB's response to each
- 06:00 - Expected shortfall at 97.5% versus VaR at 99%; stress calibration
- 10:00 - Liquidity horizons and the cascading ES formula
- 13:00 - Whiteboard 1: liquidity-adjusted ES
- 17:00 - Desk-level approval: backtesting, P&L attribution, NMRFs, default risk charge
- 20:00 - Standardised approach and the trading book boundary
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Fundamental Review of the Trading Book
- New market risk capital framework after 2008
- Internal models and standardised approach both rebuilt
- Tail risk, liquidity and boundary arbitrage

### Slide 2: What Went Wrong Before
- 99% VaR blind to the tail
- One 10-day horizon for every position
- Book-switching arbitrage; crude fallback approach

### Slide 3: Expected Shortfall at 97.5%
- Average loss in the worst 2.5% of outcomes
- Normal case: 2.338σ versus 2.326σ for 99% VaR
- Charges more when tails are fat

### Slide 4: Stress Calibration
- ES calibrated to a period of significant stress
- Replaces separate stressed VaR
- Reduced factor set scaled by current full / reduced ES ratio

### Slide 5: Liquidity Horizons
- 10, 20, 40, 60, 120 days
- Longer for less liquid factors
- Incremental band scaling: √((LH_j − LH_{j−1}) / 10)

### Slide 6: Desk-Level Approval
- Backtesting at 99% and 97.5%
- Fail: more than 12 exceptions at 99% or more than 30 at 97.5% in 250 days
- P&L attribution: risk-model P&L versus front-office hypothetical P&L

### Slide 7: Other IMA Charges
- Non-modellable risk factors: stress-scenario capital
- Default risk charge: jump to default
- Failing desks move to the standardised approach

### Slide 8: Standardised Approach
- Sensitivities-based method: delta, vega, curvature
- Default risk charge
- Residual risk add-on for exotic payoffs

### Slide 9: The Boundary
- Presumptive assignment by instrument type and intent
- Switching tightly restricted
- No capital benefit from switching

### Slide 10: Traps and Takeaways
- ES 97.5% ≈ VaR 99% under normality
- Incremental, not total, horizon scaling
- Approval desk by desk

## Whiteboard examples
**Example 1 - Liquidity-adjusted ES.** 10-day ES (USD m): all factors 20; LH ≥ 20: 12; LH ≥ 40: 8; LH ≥ 60: 4; LH ≥ 120: 2.
- Terms: 20² = 400; 12² × 1 = 144; 8² × 2 = 128; 4² × 2 = 32; 2² × 6 = 24.
- Sum = 728; ES = √728 = 26.98.
- Wrong approach (scale everything to 120 days): 20 × √12 = 69.28.

**Example 2 - ES versus VaR under normality.** Daily σ of a book = USD 1m.
- 99% VaR = 2.326 × 1m = USD 2.326m.
- 97.5% ES = φ(1.96) / 0.025 × 1m = 2.338 × 1m = USD 2.338m.
- Difference about 0.5%; with fat tails ES would be noticeably larger.

**Example 3 - Desk backtesting.** Over 250 days a desk has 9 exceptions at 99% and 33 at 97.5%.
- 99% test passes (9 ≤ 12) but 97.5% test fails (33 > 30), so the desk loses IMA approval and uses the standardised approach.

## Questions to ask students
- Why did regulators choose 97.5% ES rather than 99% ES? (It gives similar capital to 99% VaR under normality while capturing tail shape.)
- What does a 120-day liquidity horizon mean economically? (It would take about 120 days to exit or hedge the risk in stressed markets.)
- In the cascade, why use LH_j − LH_{j−1}? (Each band is charged only for the extra time beyond the previous horizon, avoiding double counting.)
- Which charge captures exotic payoffs that sensitivities miss? (The residual risk add-on.)
- What happens when a desk fails P&L attribution? (It is capitalised under the standardised approach.)

## Analogies
- Liquidity horizons are like evacuation times: everyone leaves the building through the same door for the first 10 days, but only the slowest have to stay for 120.
- VaR is the height of the flood barrier; ES is the average depth of water when the barrier is breached.
- Desk-level approval is a driving test for each driver, not a single licence for the whole family.

## Recording tips
- Put the liquidity-horizon table on screen and fill in the terms column live.
- Stress the incremental horizon factor; it is the most common calculation error.
- Keep the standardised approach to its three building blocks; avoid drowning students in risk weights.
