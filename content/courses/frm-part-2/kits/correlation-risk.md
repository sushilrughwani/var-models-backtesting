---
title: "Correlation Basics and Empirical Properties"
duration: 26
---

## Lecture outline
- 00:00 - Hook: in a crash, "everything goes down together". Why that sentence is a statement about correlation risk
- 03:00 - Where correlation risk lives: diversified portfolios, credit tranches, wrong-way risk
- 07:00 - Correlation swaps: payoff, realised leg as an average of pairs
- 11:00 - Whiteboard 1: three-stock correlation swap payoff
- 14:00 - Correlation and VaR: same positions, different correlation, different VaR
- 18:00 - Empirical properties: higher in downturns, mean reversion, volatile correlation
- 21:00 - Copulas: marginals plus dependence; Gaussian versus Student-t; tail dependence
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Correlation Basics and Empirical Properties
- Correlation is a risk factor, not a fixed input
- Trading it, measuring it, modelling it
- Copulas for joint distributions

### Slide 2: Where Correlation Risk Shows Up
- Diversification fails when correlations jump towards one
- Default correlation drives credit portfolio and tranche losses
- Wrong-way risk: exposure grows as counterparty credit worsens

### Slide 3: The Correlation Swap
- Buyer receives realised correlation, pays fixed
- Payoff = N × (ρ realised − ρ fixed)
- Realised leg = average of n(n−1)/2 pairwise correlations

### Slide 4: Correlation in the VaR Formula
- VaR = z × √[(σ₁V₁)² + (σ₂V₂)² + 2ρσ₁V₁σ₂V₂]
- Two longs: VaR rises with ρ; equals sum of stand-alone VaRs at ρ = 1
- Long-short: VaR falls as ρ rises

### Slide 5: Stress the Correlation, Not Just the Volatility
- Calm-market ρ understates crisis VaR
- Example: ρ from 0.5 to 0.9 adds about USD 39k of 99% VaR
- Run correlation stress tests alongside volatility shocks

### Slide 6: Empirical Property 1 - Downturns
- Average equity correlation is highest in recessions and crashes
- Diversification is weakest when it is most needed

### Slide 7: Empirical Property 2 - Mean Reversion
- Δρ = a(μ − ρ previous) + noise
- a = speed of mean reversion; autocorrelation = 1 − a
- Correlation is volatile and non-normal

### Slide 8: Copulas
- Map each variable to a percentile with its own CDF
- Link the percentiles with a dependence structure
- Marginals and dependence modelled separately

### Slide 9: Which Copula?
- Gaussian: simple, zero tail dependence
- Student-t: symmetric tail dependence
- Clayton or Gumbel: dependence concentrated in one tail

### Slide 10: Traps and Takeaways
- Average, do not sum, pairwise correlations
- Autocorrelation = 1 − a, not a
- Gaussian copula understates joint crashes

## Whiteboard examples
**Example 1 - Correlation swap.** Notional USD 1,000,000 per unit of correlation, fixed 0.30, three stocks with realised pairwise correlations 0.50, 0.30, 0.40.
- Pairs: 3 × 2 / 2 = 3. Average = 1.20 / 3 = 0.40.
- Payoff to buyer = 1,000,000 × (0.40 − 0.30) = USD 100,000.

**Example 2 - Correlation shock to VaR.** USD 10m in A (σ = 2%), USD 5m in B (σ = 1%). Dollar vols 200,000 and 50,000. z = 2.326.
- ρ = 0.5: variance = 4.0e10 + 0.25e10 + 1.0e10 = 5.25e10; σ = 229,129; VaR = 532,954.
- ρ = 0.9: variance = 4.0e10 + 0.25e10 + 1.8e10 = 6.05e10; σ = 245,967; VaR = 572,120.
- ρ = 1.0: σ = 250,000; VaR = 581,500 (sum of stand-alone VaRs 465,200 + 116,300).
- Correlation shock from 0.5 to 0.9 adds USD 39,166.

**Example 3 - Mean reversion.** Long-run mean 0.35, a = 0.78, last month's correlation 0.30.
- Expected change = 0.78 × (0.35 − 0.30) = 0.039, so expected correlation = 0.339.
- Autocorrelation = 1 − 0.78 = 0.22.

## Questions to ask students
- If you own a correlation swap and markets crash, do you expect to make or lose money? (Make money: correlations typically rise in a crash and you receive realised correlation.)
- With five stocks, how many pairwise correlations go into the realised leg? (5 × 4 / 2 = 10.)
- Does higher correlation raise the VaR of a long A, short B position? (No, it lowers it, because the positions offset more reliably.)
- A mean-reversion rate of 0.8 implies what autocorrelation? (0.2.)
- Why did Gaussian copula CDO pricing underestimate senior tranche risk? (No tail dependence, so joint defaults in a crisis were too unlikely in the model.)

## Analogies
- Diversification is an umbrella that folds up in a storm: correlations rise exactly when you need cover.
- A copula is the glue between bricks: the bricks are the marginal distributions, and you can change the glue without changing the bricks.
- Mean reversion is a rubber band: the further correlation stretches from its average, the harder it is pulled back.

## Recording tips
- Show the VaR example as a short table with three rows (ρ = 0.5, 0.9, 1.0) so the effect is visible at a glance.
- Students often confuse the swap notional with a per-percentage-point notional; say the units out loud each time.
- Keep the copula part visual: draw two marginal curves feeding into a unit square of percentiles.
