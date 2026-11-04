---
title: "Calculating and Applying VaR"
duration: 30
---

## Lecture outline
- 00:00 - Hook: the risk committee wants one number by 8am for a book of 4,000 positions including options. How do you produce it?
- 03:00 - Historical simulation: mechanics, 500-day window, picking the quantile
- 08:00 - Strengths and weaknesses of historical simulation, ghost effects
- 11:00 - Delta-normal VaR: single and two-asset positions
- 15:00 - Options: Taylor expansion, delta and delta-gamma approximations
- 19:00 - Whiteboard: 1,000 calls, delta and delta-gamma VaR, long versus short
- 24:00 - Monte Carlo full revaluation and choosing a method
- 27:00 - Square-root-of-time scaling, traps and recap

## Slides
### Slide 1: Calculating and Applying VaR
- Three engines: historical, delta-normal, Monte Carlo
- Linear versus non-linear positions
- Scaling across horizons

### Slide 2: Historical Simulation
- Apply each past day's factor changes to today's portfolio
- Sort the resulting P&L; read the quantile
- 500 scenarios: 99% VaR ≈ 5th-worst loss; ES = average of worst 5

### Slide 3: Pros and Cons of Historical Simulation
- No distributional assumption; captures fat tails and non-linearity
- Depends entirely on the window chosen
- VaR jumps when a big day enters or leaves the window

### Slide 4: Delta-Normal VaR
- Assume normal factor changes and linear exposure
- Single position: VaR = Vσz
- Two positions: combine dollar variances with correlation

### Slide 5: Why Options Break Linearity
- ΔP ≈ δΔS + ½Γ(ΔS)²
- Delta captures slope; gamma captures curvature
- Ignoring gamma misstates VaR

### Slide 6: Delta and Delta-Gamma VaR
- Delta: VaR ≈ |δ|·S·σ·z
- Long option: subtract ½Γ(Sσz)²
- Short option: add ½Γ(Sσz)²

### Slide 7: Monte Carlo Full Revaluation
- Simulate thousands of factor scenarios from a model
- Reprice every position on every scenario
- Most flexible; slowest; model risk

### Slide 8: Choosing a Method
- Linear book, need speed: delta-normal
- Options with large moves: full revaluation
- Want no distribution assumption: historical

### Slide 9: Horizon Scaling
- VaR_T = VaR_1 × √T for i.i.d. zero-mean returns
- Fails with autocorrelation or volatility clustering
- Gamma term grows with T, not √T

### Slide 10: Exam Traps
- Absolute value of delta for puts
- Gamma sign: long cushions, short amplifies
- 5th-worst loss (VaR) versus average of worst 5 (ES)

### Slide 11: Recap
- Pick the method to match the book's linearity and data
- Know the delta and delta-gamma formulas cold
- Next: measuring volatility itself with EWMA and GARCH

## Whiteboard examples
**Example 1: Long calls.** 1,000 calls, S = USD 100, daily σ = 2%, δ = 0.6, Γ = 0.04, 99% z = 2.326.
- ΔS = 100 × 0.02 × 2.326 = 4.652.
- Delta VaR = 1,000 × 0.6 × 4.652 = USD 2,791.20.
- Gamma term per option = 0.5 × 0.04 × 4.652² = 0.4328.
- Delta-gamma VaR = 1,000 × (2.7912 − 0.4328) = USD 2,358.38.
- If short: 1,000 × (2.7912 + 0.4328) = USD 3,224.00.
- 10-day (square-root rule): 2,358.38 × √10 ≈ USD 7,457.85.

**Example 2: Historical simulation.** 500 days of P&L. The six worst losses (USD m) are 8.1, 6.4, 5.9, 5.2, 4.8, 4.5.
- 99% tail = 1% × 500 = 5 scenarios.
- VaR (5th-worst convention) = 4.8; with the 6th-worst convention, 4.5.
- ES = (8.1 + 6.4 + 5.9 + 5.2 + 4.8) / 5 = 30.4 / 5 = 6.08.

## Questions to ask students
- A long put has delta −0.4. Is its delta-normal VaR negative? (No; use |δ|, VaR is a positive loss.)
- Why does positive gamma reduce VaR? (Convexity makes losses grow more slowly than the delta line suggests.)
- Your historical window covers only calm years. What is the risk? (VaR understates tail risk; consider a stressed window.)
- When is delta-normal good enough? (Mostly linear books, short horizons, moderate moves.)
- Can you apply √T to a 1-day VaR of a strongly mean-reverting P&L? (Not reliably; the i.i.d. assumption fails.)

## Analogies
- Historical simulation is replaying old game footage against today's team: realistic, but only for the plays you happen to have on tape.
- Delta is the speedometer, gamma is the accelerator: for a quick check speed is enough, but over a longer stretch acceleration matters.
- Monte Carlo is a flight simulator: you can test any storm you can program, but it is only as realistic as the physics you code in.

## Recording tips
- Draw the option payoff curve with its tangent line at the current price; show that the curve sits above the tangent for a long option.
- Write the long and short delta-gamma formulas side by side; the sign flip is the most-tested point.
- Mention that VaR quantile conventions differ and exam questions will tell you which to use.
