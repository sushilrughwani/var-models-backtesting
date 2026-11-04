---
title: "Using Futures for Hedging"
duration: 28
---

## Lecture outline
- 00:00 - Hook: an airline hedges jet fuel with heating oil. How many contracts, and how good is the hedge?
- 03:00 - Short vs long hedges; arguments for and against hedging
- 07:00 - Basis, effective price and basis risk; strengthening vs weakening
- 12:00 - Minimum-variance hedge ratio, regression view and hedge effectiveness
- 16:00 - Optimal number of contracts and tailing the hedge
- 19:00 - Whiteboard: airline cross hedge and basis outcome
- 22:00 - Stock index futures: full hedges and changing beta
- 26:00 - Stack and roll; recap and traps

## Slides
### Slide 1: Two Kinds of Hedge
- Short hedge: you will sell the asset (farmer, exporter)
- Long hedge: you will buy the asset (airline, importer)
- Goal: reduce variability of the outcome
### Slide 2: Should Firms Hedge?
- Shareholders can diversify on their own
- Unhedged competitors can make hedging look bad
- Hedge losses are hard to explain without context
### Slide 3: Basis
- $b = S - F$
- Converges to zero at delivery for the same asset
- Mismatched asset or dates create basis risk
### Slide 4: Effective Price
- Effective price = $S_2 + (F_1 - F_2) = F_1 + b_2$
- $F_1$ known at inception; $b_2$ uncertain
- Strengthening basis helps shorts; weakening helps longs
### Slide 5: Minimum-Variance Hedge Ratio
- $h^* = \rho \sigma_S / \sigma_F$
- Slope of regression of ΔS on ΔF
- Hedge effectiveness = $\rho^2$
### Slide 6: Number of Contracts
- $N^* = h^* Q_A / Q_F$
- Tailing: $N^* = h^* V_A / V_F$
- Round to whole contracts
### Slide 7: Airline Example
- h* = 0.90 × 0.030 / 0.036 = 0.75
- N* = 0.75 × 2,000,000 / 42,000 = 35.71 → 36 long
- Effectiveness 81%
### Slide 8: Basis Outcome
- F1 = 2.20; at close S2 = 2.10, F2 = 2.05
- b2 = 0.05; effective price 2.25
- Paid 2.10 spot plus 0.15 futures loss
### Slide 9: Hedging Equity Portfolios
- $N^* = \beta P / (F m)$
- USD 25m, beta 1.3, contract 250,000: short 130
- Fully hedged portfolio earns about the risk-free rate
### Slide 10: Changing Beta
- $N = (\beta^* - \beta) P / (F m)$
- Negative: sell; positive: buy
- Beta 1.3 to 0.6: sell 70
### Slide 11: Stack and Roll
- Roll near contracts into later ones for long exposures
- Rollover basis risk at each roll
- Margin calls can strain cash before the exposure pays off
### Slide 12: Takeaways
- Basis risk is the residual risk of a hedge
- Use $\rho \sigma_S/\sigma_F$, not 1, for cross hedges
- Beta drives index hedges

## Whiteboard examples
**1. Airline cross hedge.** Exposure 2,000,000 gallons; contract 42,000 gallons; σS = 0.030, σF = 0.036, ρ = 0.90.
- h* = 0.75; N* = 35.71 → buy 36 contracts.
- Effectiveness = 0.81.
- Basis: F1 = 2.20, S2 = 2.10, F2 = 2.05 → effective price = 2.20 + 0.05 = 2.25.

**2. Equity portfolio.** P = USD 25m, β = 1.3, F = 5,000, m = 50.
- Contract value = 250,000.
- Full hedge: 1.3 × 100 = 130 short.
- Target beta 0.6: (0.6 - 1.3) × 100 = -70 → sell 70.
- Target beta 1.8: (1.8 - 1.3) × 100 = +50 → buy 50.

**3. Farmer.** Short futures at 5.40; close with S2 = 5.10, F2 = 5.25.
- Effective price = 5.40 - 0.15 = 5.25.

## Questions to ask students
- Who benefits when the basis weakens? (Long hedgers, because they pay F1 + b2.)
- If ρ = 0.6, what fraction of variance does the optimal hedge remove? (36%.)
- Why can the minimum-variance hedge ratio exceed 1? (If spot is more volatile than futures and correlation is high, e.g. ρσS/σF > 1.)
- What does a portfolio with beta fully hedged earn in theory? (Roughly the risk-free rate.)
- How do you raise a portfolio's beta with futures? (Buy index futures.)

## Analogies
- Basis risk is wearing a raincoat of slightly the wrong size: you stay mostly dry, but some water gets in at the edges.
- The hedge ratio is a recipe conversion: if heating oil moves 1.2 times as much as jet fuel and they track closely, you need less of it.
- Changing beta with futures is a volume dial: turn it down by selling, up by buying, without touching the stocks.

## Recording tips
- Derive $F_1 + b_2$ on the board from the cash flows; students remember what they see derived.
- Put the regression scatter of ΔS vs ΔF on screen to show h* as the slope and ρ² as the fit.
- Emphasise the multiplier when valuing an index contract; it is the most common numeric slip.
