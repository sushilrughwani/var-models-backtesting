---
title: "Portfolio Risk and Return: Part II"
duration: 30
---

## Lecture outline
- 00:00 - Hook: if everyone sees the same frontier, who holds the "bad" stocks?
- 03:00 - From the CAL to the CML; the market portfolio; lending and borrowing
- 07:00 - Systematic versus unsystematic risk; why only one is priced
- 10:00 - Beta: definition, formula, market model
- 14:00 - CAPM and its assumptions
- 18:00 - The security market line; CML versus SML; spotting mispricing
- 22:00 - Performance measures: Sharpe, Treynor, M², Jensen's alpha
- 27:00 - Exam traps and recap

## Slides
### Slide 1: Everyone holds the market
- Same expectations, same tangency portfolio
- All risky assets must be held, so tangency = market portfolio
- Investors differ only in lending or borrowing
### Slide 2: Capital market line
- $E(R_p) = R_f + \frac{E(R_m) - R_f}{\sigma_m}\sigma_p$
- Slope = market Sharpe ratio
- Higher borrowing rate creates a kink at M
### Slide 3: Two kinds of risk
- Systematic: market-wide, undiversifiable, priced
- Unsystematic: firm-specific, diversifiable, not priced
- Total variance = systematic + unsystematic
### Slide 4: Beta
- $\beta_i = \text{Cov}(R_i,R_m)/\sigma_m^2 = \rho_{i,m}\sigma_i/\sigma_m$
- Market β = 1, risk-free β = 0
- Estimated as slope of the market model regression
### Slide 5: CAPM
- $E(R_i) = R_f + \beta_i[E(R_m) - R_f]$
- Assumptions: risk aversion, frictionless markets, homogeneous expectations, single period, borrow/lend at Rf
### Slide 6: Security market line
- Required return against beta
- Above SML: undervalued, buy; below: overvalued, sell
- Applies to every asset, efficient or not
### Slide 7: CML vs SML
- CML: x-axis σ, efficient portfolios only
- SML: x-axis β, all securities
### Slide 8: Total-risk measures
- Sharpe = excess return / σ
- M² = Rf + Sharpe × σm − Rm, in percentage points
- Use when the portfolio is the investor's whole wealth
### Slide 9: Systematic-risk measures
- Treynor = excess return / β
- Jensen's alpha = actual − CAPM-required return
- Use for one piece of a diversified portfolio
### Slide 10: Exam traps
- σ versus β mix-ups
- Valuation direction relative to SML
- Covariance divided by σm² for beta
### Slide 11: Recap
- CML, priced risk, beta, CAPM/SML, four performance measures

## Whiteboard examples
1. **CML and CAPM.** Rf = 3%, E(Rm) = 9%, σm = 16%. Efficient portfolio with σ = 12%: 3% + (6/16)(12%) = 7.5%. Stock Z: σ = 32%, ρ = 0.6, β = 0.6 × 32/16 = 1.2. Required = 3% + 1.2 × 6% = 10.2%. Forecast 11.5% plots above SML: undervalued by 1.3 percentage points.
2. **Performance scorecard.** Fund: Rp = 12%, σ = 20%, β = 1.1; market return 9%. Sharpe = 0.45 (market 0.375). Treynor = 9/1.1 = 8.18% (market 6%). Alpha = 12 − 9.6 = 2.4%. M² = 3 + 0.45 × 16 − 9 = 1.2%. Show that the fund leveraged down to σ = 16% would earn 10.2%, which is 1.2 points above the market.

## Questions to ask students
- What is the beta of a stock with zero correlation to the market? (Zero, whatever its σ.)
- A stock's forecast return is below its CAPM required return. Buy or sell? (Sell - overvalued, plots below the SML.)
- Why is unsystematic risk not rewarded? (Investors can diversify it away at no cost.)
- Which measure would you use for one of 20 managers in a pension fund? (Treynor or Jensen's alpha - systematic risk matters there.)
- Can a portfolio lie on the SML but below the CML? (Yes - an inefficient portfolio with unsystematic risk is correctly priced by CAPM but is not on the CML.)

## Analogies
- Beta is the amplifier volume knob: market music plays for everyone; a β of 1.5 plays it 50% louder.
- Unsystematic risk is like a parking ticket you could have avoided for free by reading the sign - nobody pays you for taking it.
- The SML is the fair-price list; a stock above the line is a sale item, a stock below is overpriced.

## Recording tips
- Draw the CML and SML side by side with different x-axes; this is the single most-tested contrast.
- Build a four-row table of performance measures (numerator, risk measure, when to use) and leave it up while solving.
- Students often forget M² ends with "minus Rm"; say it out loud each time.
