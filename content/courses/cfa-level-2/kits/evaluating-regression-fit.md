---
title: "Evaluating Regression Model Fit and Interpreting Model Results"
duration: 24
---

## Lecture outline
- 00:00 - Hook: add a column of random numbers to a regression and R-squared goes up. Is the model better?
- 02:00 - ANOVA table: SST = SSR + SSE, mean squares, SEE
- 05:00 - R-squared, its flaw, and adjusted R-squared
- 08:00 - AIC and BIC: formulas, lower is better, prediction vs parsimony
- 11:00 - Overall F-test
- 13:00 - Joint F-test with restricted and unrestricted models
- 17:00 - Whiteboard: full ANOVA-to-model-choice walk-through
- 21:00 - Forecasting and forecast intervals; traps and recap

## Slides
### Slide 1: Evaluating Model Fit
- Is the model useful? Which model is best?
- Tools: R², adjusted R², AIC, BIC, F-tests
- Then: using the model to forecast

### Slide 2: The ANOVA Table
- SST = SSR + SSE
- MSR = SSR/k, MSE = SSE/(n - k - 1)
- SEE = √MSE

### Slide 3: R-Squared
- R² = SSR/SST
- Never falls when a variable is added
- Rewards clutter

### Slide 4: Adjusted R-Squared
- $\bar R^2 = 1 - \frac{n-1}{n-k-1}(1-R^2)$
- Rises only if the new variable's |t| > 1
- Can be negative; not "percent explained"

### Slide 5: AIC and BIC
- AIC = n ln(SSE/n) + 2(k + 1)
- BIC = n ln(SSE/n) + ln(n)(k + 1)
- Lower is better; BIC penalises parameters more

### Slide 6: Which Criterion When?
- Forecasting focus → AIC
- Best-fitting parsimonious model → BIC
- They can disagree - that is a classic vignette question

### Slide 7: Overall F-Test
- H0: all slopes = 0
- F = MSR/MSE, df = (k, n - k - 1)
- One-tailed, reject in the upper tail

### Slide 8: Joint Test of a Subset
- Restricted model drops q variables
- F = [(SSE_R - SSE_U)/q] / [SSE_U/(n - k - 1)]
- Denominator always from the unrestricted model

### Slide 9: Forecasting
- Point forecast: plug in forecast X values
- Interval: $\hat Y_f \pm t_c s_f$
- $s_f$ > SEE: includes coefficient estimation error

### Slide 10: Exam Traps
- Lower AIC/BIC wins
- Higher R² does not justify a variable
- Restricted vs unrestricted df mix-ups

## Whiteboard examples
**Example 1 - From ANOVA to decisions.** n = 40, k = 4, SST = 500, SSE = 180.
- SSR = 320; R² = 0.640; adjusted R² = 1 - (39/35)(0.36) = 0.599.
- MSR = 80; MSE = 5.143; F = 15.56 > F(4,35) critical 2.64 → model significant. SEE = 2.27.

**Example 2 - Joint test.** Drop two variables; SSE_R = 210.
- F = (30/2)/(180/35) = 2.92 < F(2,35) critical 3.27 → cannot reject that both are zero.
- Common wrong answer: forgetting to divide by q gives 5.83 and the wrong conclusion.

**Example 3 - AIC vs BIC.** Full: AIC = 40 ln(4.5) + 10 = 70.16; BIC = 40 ln(4.5) + 5 ln(40) = 78.61. Restricted (k = 2, SSE 210): AIC = 40 ln(5.25) + 6 = 72.33; BIC = 40 ln(5.25) + 3 ln(40) = 77.40. AIC picks the full model, BIC picks the restricted one.

## Questions to ask students
- Can R² fall when a variable is added? (No; it can only stay the same or rise.)
- When does adjusted R² rise after adding a variable? (When that variable's |t| exceeds 1.)
- Two models: AIC 70 vs 72. Which is preferred for forecasting? (The one with AIC 70.)
- Why does BIC favour smaller models than AIC? (Its penalty per parameter is ln(n), which exceeds 2 once n ≥ 8.)
- In the joint test, which model supplies the denominator? (The unrestricted model.)

## Analogies
- Adjusted R² as a restaurant bill with a cover charge: each extra variable costs something, so it must add enough flavour to be worth it.
- AIC vs BIC as two judges: AIC cares about how well you will perform next season; BIC cares about how elegant your play is with the fewest players.
- Joint F-test as testing a team, not individual players: a pair of correlated players may look useless alone but matter together.

## Recording tips
- Build the ANOVA table live, cell by cell; students lose marks when they cannot locate SSR versus SSE in vignette output.
- Emphasise the AIC/BIC disagreement - item sets love asking which model to pick for a stated purpose.
- Put the joint-F formula on screen and highlight which pieces come from which model.
