---
title: "Portfolio Risk and Return: Part I"
duration: 30
---

## Lecture outline
- 00:00 - Hook: sure USD 50 or a coin flip for USD 100? Poll the audience
- 03:00 - Risk aversion, risk neutrality, risk seeking
- 06:00 - The utility function and how to use it; decimals warning
- 11:00 - Indifference curves: shape and what steepness means
- 14:00 - Two-asset portfolio return and risk; the role of correlation
- 19:00 - Minimum-variance frontier, global minimum-variance portfolio, efficient frontier
- 23:00 - Adding a risk-free asset: the CAL and two-fund separation
- 26:00 - Optimal allocation y* worked example
- 28:30 - Exam traps and recap

## Slides
### Slide 1: Three attitudes to risk
- Risk averse: needs extra return to accept extra risk
- Risk neutral: cares only about expected return
- Risk seeking: enjoys the gamble
- Portfolio theory assumes risk aversion
### Slide 2: The utility function
- $U = E(r) - \tfrac{1}{2}A\sigma^2$
- Use decimals: 10% is 0.10
- A > 0 averse, A = 0 neutral, A < 0 seeker
- Pick the portfolio with the highest U
### Slide 3: Indifference curves
- Same utility along each curve
- Upward sloping and convex for risk-averse investors
- Higher A = steeper curves; curves further up-left = higher utility
### Slide 4: Two-asset portfolio
- $E(R_p) = w_1E(R_1) + w_2E(R_2)$
- $\sigma_p^2 = w_1^2\sigma_1^2 + w_2^2\sigma_2^2 + 2w_1w_2\rho\sigma_1\sigma_2$
- Risk below weighted average whenever ρ < 1
### Slide 5: Correlation drives the curve
- ρ = +1: straight line, no benefit
- ρ between -1 and +1: bowed curve
- ρ = -1: a zero-risk combination exists
### Slide 6: The frontiers
- Minimum-variance frontier: lowest σ for each return
- Global minimum-variance portfolio: leftmost point
- Efficient frontier: the part above the GMV portfolio
### Slide 7: The capital allocation line
- $E(R_C) = R_f + \frac{E(R_P) - R_f}{\sigma_P}\sigma_C$
- Slope = Sharpe ratio of P
- Best CAL is tangent to the efficient frontier
### Slide 8: Optimal investor portfolio
- $y^* = \frac{E(R_P) - R_f}{A\sigma_P^2}$
- Tangency of CAL with highest indifference curve
- Two-fund separation: same risky portfolio, personal mix
### Slide 9: Exam traps
- Percentages in utility formula
- Whole frontier is not efficient
- Optimal risky portfolio does not depend on A
### Slide 10: Recap
- Utility ranks choices; correlation creates diversification; CAL plus A gives the final mix

## Whiteboard examples
1. **Utility ranking.** A = 4. P1: 8%, 10%; P2: 12%, 20%; P3: 15%, 28%. U1 = 0.08 - 2(0.01) = 0.0600; U2 = 0.12 - 2(0.04) = 0.0400; U3 = 0.15 - 2(0.0784) = -0.0068. Choose P1. Then ask: at A = 0 the investor would choose P3 (highest return).
2. **Two-asset portfolio.** Stocks 10%/20%, bonds 5%/8%, ρ = 0.3, weights 60/40. E = 8%. Variance = 0.0144 + 0.001024 + 0.002304 = 0.017728, σ = 13.31% versus weighted-average σ of 15.2%.
3. **Optimal allocation.** Rf = 3%, risky fund 10%/20%, A = 4: y* = 0.07 / 0.16 = 0.4375. Resulting complete portfolio: E = 0.03 + 0.4375(0.07) = 6.06%, σ = 0.4375 × 20% = 8.75%.

## Questions to ask students
- What is the utility of a risk-free asset yielding 4%? (0.04 - the variance term is zero.)
- Which investor has steeper indifference curves, A = 2 or A = 6? (A = 6.)
- If ρ = +1, what is σ of a 50/50 portfolio of assets with σ 10% and 20%? (15%, the weighted average.)
- Is a portfolio on the minimum-variance frontier below the GMV portfolio efficient? (No - another portfolio has the same risk and higher return.)
- If A doubles, what happens to y*? (It halves.)

## Analogies
- Utility is a restaurant review score: taste (return) minus a penalty for food poisoning risk, and cautious diners weight the penalty more heavily.
- The efficient frontier is the "best price" line at a car dealer: for each budget (risk), the car with the most horsepower (return). Anything below the line is overpriced.
- Two-fund separation is like a coffee shop: everyone gets the same espresso (tangency portfolio); you only choose how much milk (risk-free asset) to add.

## Recording tips
- Show the decimals mistake explicitly by computing utility with 10 instead of 0.10 so students see the absurd answer.
- Animate the two-asset curve for several correlations; it makes the role of ρ intuitive.
- Stress that computing the complete portfolio's return and risk after finding y* (end of whiteboard 3) is a common follow-up question.
