---
title: "The Arbitrage Pricing Theory and Multifactor Models"
duration: 26
---

## Lecture outline
- 00:00 - Hook: why a stock can fall on a day the market rises (an inflation surprise hit it)
- 02:00 - Recap of the CAPM and its single priced risk; the case for more factors
- 05:00 - The multifactor return-generating model: expected part, surprises, noise
- 09:00 - The APT pricing equation, assumptions and factor risk premiums
- 13:00 - APT versus CAPM: assumptions, flexibility, which factors
- 16:00 - Whiteboard: expected return, realized return with surprises
- 20:00 - Hedging factor exposures with factor portfolios
- 23:00 - Arbitrage when a diversified portfolio is mispriced; exam traps and recap

## Slides
### Slide 1: One factor is not enough
- CAPM: only market beta is priced
- Real returns respond to growth, inflation, credit spreads, oil
- Multifactor models let each force act separately
### Slide 2: The return-generating model
- $R_i = E(R_i) + \sum_j \beta_{ij} F_j + e_i$
- $F_j$ = surprise (actual minus expected), mean zero
- $e_i$ = firm-specific shock, diversifiable
### Slide 3: Only news moves prices
- Expected inflation is already in the price
- Surprise = actual - consensus forecast
- Same data print can be good or bad news depending on expectations
### Slide 4: APT assumptions
- Returns follow a factor model
- Many assets, so idiosyncratic risk diversifies away
- No riskless arbitrage on well-diversified portfolios
### Slide 5: The APT equation
- $E(R_i) = R_f + \sum_j \beta_{ij}\lambda_j$
- $\lambda_j$ = premium on a pure factor portfolio
- Premiums can be negative (insurance-like factors)
### Slide 6: APT versus CAPM
- CAPM: equilibrium, one factor, strong investor assumptions
- APT: no-arbitrage, many factors, weak assumptions
- APT does not name the factors; Fama-French is one popular choice
### Slide 7: Worked example set-up
- $R_f = 3\%$, $\lambda_{GDP} = 5\%$, $\lambda_{INF} = 2\%$
- $\beta_{GDP} = 1.2$, $\beta_{INF} = 0.5$
- Expected return = 10%
### Slide 8: Realized return with surprises
- GDP: expected 3%, actual 2% so surprise -1%
- Inflation: expected 2%, actual 3% so surprise +1%
- $R = 10 - 1.2 + 0.5 + 0.5 = 9.8\%$
### Slide 9: Factor portfolios
- Sensitivity 1 to one factor, 0 to the rest
- Portfolio sensitivities are value-weighted averages
- Short $\beta_j \times$ value to neutralize factor $j$
### Slide 10: Arbitrage mechanics
- Mispriced portfolio vs replicating mix with same betas
- Long cheap, short expensive: zero investment, zero factor risk
- Positive profit forces prices back to the APT line
### Slide 11: Exam traps
- Levels instead of surprises
- Missing the risk-free rate
- Hedge size = beta x value, not value

## Whiteboard examples
**Example 1 - APT and realized return.** $R_f = 3\%$, premiums 5% (GDP) and 2% (inflation), sensitivities 1.2 and 0.5. Expected return $= 3 + 1.2(5) + 0.5(2) = 10\%$. Surprises: GDP $2 - 3 = -1\%$, inflation $3 - 2 = +1\%$, firm shock $+0.5\%$. Realized $= 10 - 1.2 + 0.5 + 0.5 = 9.8\%$.

**Example 2 - Hedging.** A USD 50 million portfolio has $\beta_1 = 0.9$ and $\beta_2 = 1.4$. To remove factor 1 only, short $0.9 \times 50 = $ USD 45 million of factor portfolio 1. New sensitivities: $\beta_1 = 0$, $\beta_2 = 1.4$ unchanged, since factor portfolio 1 has zero loading on factor 2.

**Example 3 - Single-factor arbitrage.** $R_f = 4\%$. Portfolio B: $\beta = 0.5$, $E(R) = 7\%$, so the implied premium is $(7 - 4)/0.5 = 6\%$. Portfolio A: $\beta = 1.0$, $E(R) = 12\%$, but APT says $4 + 6 = 10\%$. Replicate A with 2 units of B and $-1$ unit of the risk-free asset: beta $= 2(0.5) = 1.0$, return $= 2(7) - 4 = 10\%$. Long A, short the replica: zero beta, zero investment, profit $12 - 10 = 2\%$.

## Questions to ask students
- Why does the model use factor surprises rather than factor levels? (Expected values are already priced; only unexpected news moves returns.)
- What does a factor premium of -1% mean? (Exposure to that factor acts like insurance, so investors accept a lower return for it.)
- Which model needs stronger assumptions, the APT or the CAPM? (The CAPM.)
- How much of a factor portfolio must be shorted to remove an exposure of 0.8 on a USD 20 million portfolio? (USD 16 million.)
- Does the APT tell you which factors to use? (No; factor selection is empirical.)

## Analogies
- A multifactor model is a mixing desk: each slider (factor) changes the song (return) by its own amount, and the beta is how far that slider is pushed.
- Factor surprises are like weather forecasts: the umbrella seller's sales react to unexpected rain, not to rain everyone saw coming.
- APT arbitrage is like two shops selling identical bundles at different prices: buy from one, sell to the other, until prices converge.

## Recording tips
- Write "surprise = actual - expected" on screen and keep it visible during the realized-return example; this is where most students slip.
- Show the CAPM equation side by side with the APT equation so the one-factor special case is obvious.
- Pause after the hedging example and ask viewers to predict the new sensitivities before revealing them.
