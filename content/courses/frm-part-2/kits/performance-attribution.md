---
title: "Portfolio Performance Evaluation and Attribution"
duration: 24
---

## Lecture outline
- 00:00 - Hook: two managers both returned 11%; who was better?
- 02:00 - Time-weighted versus dollar-weighted returns
- 04:00 - Sharpe, Treynor, Jensen, M-squared, information ratio; which to use when
- 09:00 - Whiteboard: computing all risk-adjusted measures
- 12:00 - Market timing regressions
- 15:00 - Returns-based style analysis and style drift
- 18:00 - Whiteboard: Brinson allocation, selection, interaction
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Return alone is not performance
- Higher return may just mean more risk
- Need the right return measure and the right risk adjustment
- Then explain where the outperformance came from
### Slide 2: Time- versus dollar-weighted
- Time-weighted: strips out client cash flows, judges the manager
- Dollar-weighted (IRR): reflects flow timing, judges the investor's experience
- Use time-weighted for manager evaluation
### Slide 3: Total-risk measures
- Sharpe: $(R_P - R_f)/\sigma_P$
- M-squared: $R_f + S_P\sigma_M - R_M$, in return units
- Right when the fund is the investor's whole portfolio
### Slide 4: Systematic-risk measures
- Treynor: $(R_P - R_f)/\beta_P$
- Jensen's alpha: $R_P - [R_f + \beta_P(R_M - R_f)]$
- Right when the fund is one sleeve of a diversified portfolio
### Slide 5: Information ratio
- Active return / tracking error
- Measures skill relative to a benchmark
- Ties back to active risk budgeting
### Slide 6: Market timing tests
- Good timing makes the characteristic line convex
- Treynor-Mazuy: squared market excess return term
- Henriksson-Merton: up-market dummy term; positive c = timing skill
### Slide 7: Returns-based style analysis
- Regress fund returns on style indices
- Coefficients ≥ 0 and sum to 1 = effective asset mix
- Rolling windows reveal style drift; 1 - R² = selection
### Slide 8: Brinson attribution formulas
- Allocation: $(w_P - w_B)(R_{B,i} - R_B)$
- Selection: $w_B(R_{P,i} - R_{B,i})$
- Interaction: $(w_P - w_B)(R_{P,i} - R_{B,i})$
### Slide 9: Attribution example result
- Active return 1.85%
- Allocation 0.60%, selection 1.00%, interaction 0.25%
- Most value came from equity stock picking
### Slide 10: Exam traps
- Match the measure to the investor's situation
- Selection uses benchmark weights
- Timing skill is the curvature coefficient, not the intercept

## Whiteboard examples
**Example 1: Risk-adjusted measures.** Portfolio 11%, σ 18%, β 1.2; market 9%, σ 15%; risk-free 3%.
- Sharpe = 8/18 = 0.444; market Sharpe = 6/15 = 0.400
- Treynor = 8/1.2 = 6.67% (market: 6%)
- Jensen's alpha = 11 - (3 + 1.2 × 6) = 0.80%
- M² = 3 + 0.444 × 15 - 9 = 0.67%
- With active return 1.8% and tracking error 4.5%, IR = 0.40.

**Example 2: Brinson attribution.** Benchmark 60/40 equities/bonds at 10%/4%; portfolio 70/30 at 12%/3.5%.
- R_B = 7.6%, R_P = 9.45%, active = 1.85%
- Allocation: 0.10 × 2.4 = 0.24; -0.10 × (-3.6) = 0.36; total 0.60%
- Selection: 0.6 × 2 = 1.20; 0.4 × (-0.5) = -0.20; total 1.00%
- Interaction: 0.10 × 2 = 0.20; -0.10 × (-0.5) = 0.05; total 0.25%
- Sum 1.85% ✓

## Questions to ask students
- A retiree holds only this fund. Which ratio should she use? (Sharpe or M-squared, because total risk matters.)
- Why use time-weighted returns for a mutual fund manager? (The manager does not control investor deposits and withdrawals.)
- In Treynor-Mazuy, what sign of c shows timing ability? (Positive: the line is convex.)
- What does a rising weight on "small growth" in rolling style analysis of a large-value fund signal? (Style drift.)
- Why does underweighting bonds earn positive allocation in the example? (Bonds underperformed the total benchmark, 4% versus 7.6%.)

## Analogies
- M-squared as a fair race: put every runner on the same track length (same volatility), then compare finishing times.
- Style analysis as a recipe tasting: you cannot see the recipe (holdings) but by tasting the dish (returns) you infer it is mostly flour, some sugar, a little salt.
- Brinson attribution as a restaurant review: allocation is choosing the right dishes for the menu, selection is cooking each dish well.

## Recording tips
- Build the Brinson table column by column on screen; students lose track if all three effects appear at once.
- Emphasise the measure-choice rule (whole wealth versus one sleeve) because it is tested conceptually.
- Point out that subtracting R_B in allocation does not change the total but does change each sector's sign.
