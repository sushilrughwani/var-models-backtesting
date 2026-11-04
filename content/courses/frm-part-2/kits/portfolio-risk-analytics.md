---
title: "Portfolio Risk: Analytical Methods"
duration: 26
---

## Lecture outline
- 00:00 - Hook: the CIO asks "which desk do I cut to reduce VaR by 10%?"
- 02:00 - Recap delta-normal VaR; individual, undiversified and diversified VaR
- 06:00 - Marginal VaR and beta to the portfolio
- 10:00 - Incremental VaR: exact versus linear approximation
- 13:00 - Component VaR and why the pieces add up
- 16:00 - Whiteboard: two-asset portfolio, every measure
- 22:00 - Optimisation and best hedge; exam traps and recap

## Slides
### Slide 1: Where does the risk come from?
- Total VaR is one number; decisions need a breakdown
- Which positions add risk at the margin?
- Which trades would reduce risk most?
### Slide 2: Portfolio VaR recap
- $\text{VaR}_p = z_\alpha \sigma_p W$, $\sigma_p^2 = \mathbf{w}^\top\Sigma\mathbf{w}$
- Individual VaR: $z_\alpha \sigma_i |x_i|$
- Undiversified VaR = sum of individual VaRs (correlations all +1)
### Slide 3: Marginal VaR
- Extra VaR per extra dollar in position $i$
- $\Delta\text{VaR}_i = z_\alpha\,\text{cov}(R_i,R_p)/\sigma_p = \beta_i\,\text{VaR}_p/W$
- Beta is to the portfolio, not to the market
### Slide 4: Incremental VaR
- Change in VaR from an entire proposed trade
- Exact: revalue with and without the trade
- Approximate: $(\Delta\text{VaR})^\top \mathbf{a}$, fine for small trades
### Slide 5: Component VaR
- $\text{CVaR}_i = \Delta\text{VaR}_i \cdot x_i = w_i\beta_i\text{VaR}_p$
- Sums exactly to diversified VaR because $\sum w_i\beta_i = 1$
- Negative component = natural hedge
### Slide 6: Three measures, three questions
- Marginal: what does one more dollar do?
- Incremental: what does this trade do?
- Component: how much of today's VaR belongs to each position?
### Slide 7: Two-asset example setup
- USD 60m at 20% vol, USD 40m at 12% vol, ρ = 0.3
- 95% confidence, z = 1.645
- Goal: VaR, betas, marginal, component, incremental
### Slide 8: Two-asset example results
- Diversified VaR 23.36m; undiversified 27.64m
- Betas 1.333 and 0.50
- Components 18.69m (80%) and 4.67m (20%)
### Slide 9: Optimising with marginal VaR
- Optimum: excess return / marginal VaR equal for all assets
- Shift capital toward the asset with the higher ratio
- Best hedge: marginal VaR of the hedge asset = 0
### Slide 10: Exam traps
- Market beta versus portfolio beta
- Conditional VaR (expected shortfall) is not component VaR
- Linear IVaR breaks for large trades

## Whiteboard examples
**Example 1: Full decomposition.** W = 100m; x1 = 60m, σ1 = 20%; x2 = 40m, σ2 = 12%; ρ = 0.3; z = 1.645.
- Dollar vols 12 and 4.8. σp² = 144 + 23.04 + 34.56 = 201.6 → σp = 14.199m
- VaRp = 1.645 × 14.199 = 23.36m; individual 19.74m and 7.90m; undiversified 27.64m
- cov(R1,Rp) = 0.6 × 0.04 + 0.4 × 0.0072 = 0.02688; σp² (returns) = 0.02016; β1 = 1.333
- cov(R2,Rp) = 0.4 × 0.0144 + 0.6 × 0.0072 = 0.01008; β2 = 0.50
- Marginal VaR 0.3114 and 0.1168 per dollar; components 18.69m and 4.67m, total 23.36m
- Add 5m to asset 2: IVaR ≈ 0.584m (exact 0.597m)

**Example 2: Shortcut with given beta.** Portfolio VaR 10m on 100m; a 25m position has beta 1.4 to the portfolio.
- Marginal VaR = 1.4 × 10/100 = 0.14 per dollar
- Component VaR = 0.25 × 1.4 × 10 = 3.5m (35% of VaR from 25% of capital)

**Example 3: Best hedge.** Against Example 1's asset 1 holding: x2* = -0.3 × 0.20 × 60 / 0.12 = -30m (a short of USD 30m in asset 2).

## Questions to ask students
- Why is undiversified VaR always at least as large as diversified VaR? (Correlations below +1 reduce portfolio volatility; equality only at ρ = +1.)
- What does a beta to the portfolio of 0.5 tell you? (The position adds half the average risk per dollar; it is diversifying.)
- Can component VaR be negative? (Yes, when the position is negatively correlated with the portfolio, i.e. a hedge.)
- When should you not trust the linear incremental VaR formula? (For large trades relative to the portfolio; revalue fully instead.)
- What is the marginal VaR of the best-hedge position? (Zero.)

## Analogies
- Restaurant bill split: component VaR is splitting the bill by what each diner actually ordered, so the shares add exactly to the total. Undiversified VaR is everyone paying for a full meal even when they shared dishes.
- Marginal VaR as the next spoonful of salt: in a bland dish (low beta) it barely changes the taste; in an already salty dish (high beta) it changes it a lot.
- Best hedge as balancing a seesaw: you add weight on the other side until the next small push no longer moves it.

## Recording tips
- Keep a running table on screen with position, beta, marginal VaR, component VaR and percentage so students see the pieces fill in.
- Stress the 80/20 result: 60% of capital produced 80% of risk. That is the takeaway risk committees care about.
- Explicitly warn about the acronym clash between component VaR and conditional VaR.
