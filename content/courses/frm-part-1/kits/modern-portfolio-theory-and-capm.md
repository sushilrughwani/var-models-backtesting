---
title: "Modern Portfolio Theory and the CAPM"
duration: 30
---

## Lecture outline
- 00:00 - Hook: two risky assets can combine into something safer than either. How?
- 03:00 - Two-asset portfolio return and risk; role of correlation
- 08:00 - Whiteboard: two-asset portfolio
- 11:00 - Efficient frontier and the minimum-variance portfolio
- 14:00 - Adding the risk-free asset: tangency portfolio, CML, separation theorem
- 18:00 - Systematic vs idiosyncratic risk and beta
- 21:00 - CAPM and the SML; alpha; whiteboard CAPM and CML
- 26:00 - Assumptions, CML vs SML, exam traps and recap

## Slides
### Slide 1: Modern Portfolio Theory and the CAPM
- Diversification and the efficient frontier
- The capital market line
- Beta and the CAPM

### Slide 2: Two-Asset Portfolio
- $E(R_p) = w_A E(R_A) + w_B E(R_B)$
- $\sigma_p^2 = w_A^2\sigma_A^2 + w_B^2\sigma_B^2 + 2w_Aw_B\rho\sigma_A\sigma_B$
- Risk falls below the weighted average unless $\rho = 1$

### Slide 3: Correlation Drives Diversification
- $\rho = 1$: no benefit, straight line
- $\rho < 1$: curve bends left
- $\rho = -1$: a zero-risk portfolio exists

### Slide 4: The Efficient Frontier
- Upper edge of the feasible set
- Starts at the minimum-variance portfolio
- Highest return for each risk level

### Slide 5: Capital Market Line
- Line from $R_f$ tangent to the frontier at $M$
- $E(R_p) = R_f + \frac{E(R_M)-R_f}{\sigma_M}\sigma_p$
- Slope = market Sharpe ratio

### Slide 6: Separation Theorem
- Everyone holds the same risky portfolio $M$
- Risk preference decides lending vs borrowing
- Investment and financing decisions separate

### Slide 7: Which Risk Is Rewarded?
- Idiosyncratic risk diversifies away for free
- Systematic risk cannot be diversified
- Only systematic risk earns a premium

### Slide 8: Beta
- $\beta_i = \text{Cov}(R_i,R_M)/\sigma_M^2 = \rho_{iM}\sigma_i/\sigma_M$
- Market beta = 1; risk-free beta = 0

### Slide 9: CAPM and SML
- $E(R_i) = R_f + \beta_i[E(R_M) - R_f]$
- Above the SML: undervalued, positive alpha
- Below the SML: overvalued

### Slide 10: CML vs SML
- CML: total risk, efficient portfolios only
- SML: beta, all assets and portfolios

### Slide 11: CAPM Assumptions
- Mean-variance investors, identical expectations, one period
- Unlimited borrowing and lending at $R_f$
- No taxes, costs or frictions

### Slide 12: Recap
- Diversify, hold $M$, lever up or down
- Price assets by beta
- Next: performance measures built on these ideas

## Whiteboard examples
**Example 1: Two-asset portfolio.** A: 8%, 12%. B: 14%, 25%. $\rho = 0.3$, weights 60/40.
- Return = 4.8% + 5.6% = 10.4%.
- Variance = 0.005184 + 0.01 + 0.00432 = 0.019504; sd = 13.97% versus 17.2% weighted average.

**Example 2: CML.** $R_f$ 3%, $E(R_M)$ 9%, $\sigma_M$ 15%. Slope 0.40.
- Target sd 10%: return 7.0% with 66.7% in $M$, 33.3% risk-free.
- Target sd 20%: return 3% + 0.40 x 20% = 11.0%, achieved by borrowing (133.3% in $M$).

**Example 3: CAPM alpha.** $\beta$ = 1.3: required 3% + 1.3 x 6% = 10.8%. Forecast 12%, alpha +1.2%, undervalued. Also: covariance 0.024 gives $\beta$ = 0.024/0.0225 = 1.067.

## Questions to ask students
- Two assets have correlation 1. Is there any diversification benefit? (No, portfolio sd equals the weighted average.)
- What is the beta of the risk-free asset? (Zero.)
- A stock has very high total volatility but low beta. Does CAPM require a high return? (No, only systematic risk is priced.)
- Can an individual stock plot on the CML? (Generally no; it carries idiosyncratic risk so it lies below the CML, but it plots on the SML.)
- A stock's forecast return is below its CAPM required return. Buy or sell? (Sell or avoid: it is overvalued, negative alpha.)

## Analogies
- Diversification is like a choir: individual voices wobble, but the wobbles partly cancel and the overall sound is steadier.
- The CML is a menu with one dish (the market portfolio) served in different portion sizes, from "mostly cash" to "leveraged".
- Beta is how hard a stock is tied to the market tide; idiosyncratic risk is its own splashing, which disappears when you look at the whole ocean.

## Recording tips
- Show an interactive or pre-drawn chart of the frontier for several correlations; seeing the curve bend makes the idea stick.
- Explicitly contrast the CML and SML on one slide with axes labelled; this is the most common confusion.
- Write the CAPM with brackets around the market risk premium every time to prevent the beta-times-market-return error.
