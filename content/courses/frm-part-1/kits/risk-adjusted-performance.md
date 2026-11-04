---
title: "Risk-Adjusted Performance Measures"
duration: 24
---

## Lecture outline
- 00:00 - Hook: Fund A returned 12%, Fund B returned 10%. Which manager would you hire?
- 02:00 - Why raw returns mislead; the idea of return per unit of risk
- 04:00 - Sharpe ratio and M-squared
- 07:00 - Treynor ratio and Jensen's alpha
- 11:00 - Information ratio and tracking error
- 13:00 - Sortino ratio and downside deviation
- 15:00 - Whiteboard: compare Fund A and Fund B on all measures
- 20:00 - Choosing the right measure; why rankings disagree
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Risk-Adjusted Performance Measures
- Sharpe, Treynor, Jensen's alpha
- Information ratio, Sortino
- Matching the measure to the investor

### Slide 2: Sharpe Ratio
- $(R_p - R_f)/\sigma_p$
- Reward per unit of total risk
- Use when the portfolio is the whole of wealth

### Slide 3: M-Squared
- $M^2 = R_f + \text{Sharpe}_p \times \sigma_M$
- Return at market volatility
- Compare directly with the market return

### Slide 4: Treynor Ratio
- $(R_p - R_f)/\beta_p$
- Reward per unit of systematic risk
- Use for one portfolio among many

### Slide 5: Jensen's Alpha
- $R_p - [R_f + \beta_p(R_M - R_f)]$
- Distance above the SML in percentage points
- Positive alpha = beat the CAPM

### Slide 6: Information Ratio
- $(R_p - R_B)/TE$
- Tracking error = sd of active returns
- Measures consistency of beating the benchmark

### Slide 7: Sortino Ratio
- $(R_p - MAR)/DD$
- Downside deviation uses only returns below MAR
- Good for skewed strategies

### Slide 8: Which Measure When?
- Whole wealth: Sharpe, M-squared
- Diversified plan sleeve: Treynor, alpha
- Active mandate: information ratio
- Downside-focused investor: Sortino

### Slide 9: Rankings Can Disagree
- High idiosyncratic risk: good Treynor, poor Sharpe
- Always ask which risk the investor bears

### Slide 10: Recap
- Numerator: excess return (over $R_f$, benchmark or MAR)
- Denominator: the relevant risk
- Next: multifactor models extend the CAPM benchmark

## Whiteboard examples
**Example 1: Fund comparison.** $R_f$ 3%, $R_M$ 10%, $\sigma_M$ 15%. A: 12%, sd 18%, beta 1.2. B: 10%, sd 12%, beta 0.8.
- Sharpe: A 0.500, B 0.583, market 0.467.
- Treynor: A 7.5%, B 8.75%, market 7.0%.
- Alpha: A 12 - 11.4 = 0.6%; B 10 - 8.6 = 1.4%.
- M-squared: A 10.5%, B 11.75%.
- B wins on every measure despite the lower raw return.

**Example 2: IR and Sortino for Fund A.** Benchmark 10%, TE 4%: IR = 2/4 = 0.50. MAR 3%, downside deviation 10%: Sortino = 9/10 = 0.90.

## Questions to ask students
- A pension plan holds 30 managers. Which measure suits evaluating one of them? (Treynor or Jensen's alpha, because idiosyncratic risk diversifies across managers.)
- Can a fund have positive alpha but a Sharpe ratio below the market's? (Yes, if it carries large idiosyncratic risk.)
- What goes in the denominator of the information ratio? (Tracking error, the sd of portfolio minus benchmark returns.)
- Why would an option-selling fund look better on Sharpe than on Sortino? (Its returns have small upside volatility but rare large losses, which downside deviation captures more directly; Sharpe treats all volatility equally and can understate tail risk.)
- What does M-squared of 11.75% versus a market return of 10% mean? (At market volatility, the fund would have beaten the market by 1.75 points.)

## Analogies
- Sharpe is fuel efficiency for a car you drive alone; Treynor is fuel efficiency for one truck in a fleet, where only the shared fuel price risk matters.
- The information ratio is a batting average against a specific pitcher: how reliably the manager beats the benchmark.
- Sortino is a teacher who only marks you down for wrong answers, not for showing off on bonus questions.

## Recording tips
- Build a single comparison table on screen and fill it in measure by measure; it becomes a ready-made revision sheet.
- Repeat the "which risk does the investor bear?" question each time you introduce a ratio.
- Students confuse tracking error with total standard deviation; show the active-return series explicitly.
