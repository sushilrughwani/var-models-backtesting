---
title: "Portfolio Optimisation"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a portfolio that is less risky than its safest asset - how is that possible?
- 03:00 - Portfolio maths in matrix form: `w @ mu`, `w @ cov @ w`, building `cov` from vols and correlations
- 07:00 - Two-asset minimum variance by hand (whiteboard)
- 11:00 - `scipy.optimize.minimize`: objective, bounds, constraints
- 15:00 - Live code: GMV and maximum-Sharpe portfolios for bonds, equity, EM
- 19:00 - Efficient frontier loop and the lambda default-argument trick
- 22:00 - Estimation error and practical fixes
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Portfolio Optimisation
- Mean-variance: lowest risk for each level of return
- Tools: NumPy matrix algebra + `scipy.optimize.minimize`
- Outputs: GMV, max Sharpe, efficient frontier

### Slide 2: Matrix Portfolio Maths
- Return: $\mu_p = w^\top\mu$ → `w @ mu`
- Volatility: $\sigma_p = \sqrt{w^\top\Sigma w}$ → `np.sqrt(w @ cov @ w)`
- Covariance: `np.outer(vols, vols) * corr`

### Slide 3: Two-Asset Closed Form
- $w_1^* = (\sigma_2^2 - \sigma_{12}) / (\sigma_1^2 + \sigma_2^2 - 2\sigma_{12})$
- Example: 10%/20% vols, ρ = 0.25 → w1 = 87.5%
- Portfolio vol 9.68% < 10%

### Slide 4: Setting Up minimize
- Objective: function of w returning a number
- `bounds=[(0, 1)] * n` for long-only
- `{"type": "eq", "fun": lambda w: w.sum() - 1}`

### Slide 5: Minimum-Variance Portfolio
- Objective: `w @ cov @ w`
- Result: 93.5% bonds, 5.3% equity, 1.2% EM
- Vol 5.90%, below bonds' own 6%

### Slide 6: Maximum-Sharpe Portfolio
- Objective: `-port_stats(w)[2]` (negative Sharpe)
- Result: 70.5% / 14.2% / 15.3%
- Sharpe 0.490, return 5.64%, vol 7.43%

### Slide 7: Efficient Frontier
- Add constraint `w @ mu - target = 0`
- Loop over targets from GMV return to max asset return
- Vol rises 5.90% → 24.00% as target rises 4.30% → 11.00%

### Slide 8: Python Gotcha - Late Binding
- `lambda w: w @ mu - tgt` reads tgt when called
- Fix: `lambda w, t=tgt: w @ mu - t`
- Matters whenever constraints are stored and solved later

### Slide 9: Estimation Error
- μ and Σ are estimates, not truths
- Small changes in μ → big swings in weights
- Remedies: weight caps, shrinkage, favour GMV

### Slide 10: Exam Traps
- `*` vs `@`
- Forgetting the negative sign or the budget constraint
- Mixing daily and annual inputs

### Slide 11: Key Takeaways
- Diversification is in the covariance terms
- `minimize` + bounds + constraints = long-only optimiser
- Frontier = loop of constrained minimisations

## Whiteboard examples
1. **Two-asset GMV.** σA = 10%, σB = 20%, ρ = 0.25, μA = 6%, μB = 12%.
   - σAB = 0.25 × 0.10 × 0.20 = 0.005.
   - wA = (0.04 − 0.005) / (0.01 + 0.04 − 0.01) = 0.035 / 0.04 = 0.875; wB = 0.125.
   - Return = 0.875 × 6% + 0.125 × 12% = 6.75%.
   - Variance = 0.765625 × 0.01 + 0.015625 × 0.04 + 2 × 0.109375 × 0.005 = 0.009375 → vol 9.68%.
2. **Portfolio volatility with the quadratic form.** w = (0.6, 0.4), σ = (10%, 20%), ρ = 0.3.
   - σ12 = 0.006. Variance = 0.36 × 0.01 + 0.16 × 0.04 + 2 × 0.24 × 0.006 = 0.01288.
   - Vol = 11.35% versus a 14% weighted average: the 2.65-point gap is the diversification benefit.

## Questions to ask students
- Why can the GMV portfolio have lower volatility than every individual asset? (Correlations below 1 make covariance terms small, so risks partly offset)
- Which portfolio needs no expected-return estimates? (The minimum-variance portfolio)
- How do you maximise with a function called `minimize`? (Minimise the negative of the objective)
- What does `bounds=[(0, 1)] * n` enforce? (No short selling and no single weight above 100%)
- If equity's expected return is nudged up by 1%, what usually happens to the optimal weights? (They shift sharply toward equity: weights are very sensitive to return inputs)

## Analogies
- Diversification is like a team of rowers who are slightly out of sync: the boat wobbles less than any single rower would on their own.
- The optimiser is an "error maximiser": like a shopper who always buys whatever is mislabelled as cheapest, it piles into assets whose returns are overestimated.
- The efficient frontier is a menu where every dish is the cheapest way (in risk) to buy a given amount of return.

## Recording tips
- After running the frontier loop, plot volatility against return with matplotlib and overlay random Dirichlet portfolios (`rng.dirichlet(np.ones(3), size=5000)`) so students see the frontier as the left edge of a cloud.
- Live-demo estimation error: change EM's expected return from 11% to 12% and rerun the max-Sharpe optimisation.
- Slow down on the `constraints` dictionary syntax; it is unfamiliar to most beginners.
