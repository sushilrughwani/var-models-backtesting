---
title: "Model Misspecification"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a model shows five "significant" factors. After fixing the standard errors, only one survives. What happened?
- 02:00 - Four forms of misspecification: omitted variable, form, scaling, pooling
- 06:00 - Heteroskedasticity: conditional vs unconditional, consequences
- 09:00 - Breusch-Pagan test and robust standard errors (whiteboard 1)
- 13:00 - Serial correlation: consequences, the lagged-Y twist, Breusch-Godfrey and DW
- 17:00 - Multicollinearity: symptoms and VIF (whiteboard 2)
- 21:00 - The summary grid: coefficients vs standard errors, Type I vs Type II
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Model Misspecification
- When the model's structure does not match reality
- Some problems bias coefficients; others only distort standard errors
- Diagnose, then fix

### Slide 2: Four Forms of Misspecification
- Omitted variable → biased, inconsistent coefficients
- Wrong functional form (logs, squares)
- Inappropriate scaling; inappropriate pooling of regimes

### Slide 3: Heteroskedasticity
- Unconditional: harmless
- Conditional (variance linked to X): standard errors too small
- Inflated t → too many Type I errors

### Slide 4: Breusch-Pagan Test
- Regress squared residuals on the X variables
- BP = n × R², chi-square with k df
- One-tailed; large value → heteroskedasticity

### Slide 5: Fixing Heteroskedasticity
- Robust (White) standard errors
- Coefficients unchanged, t-statistics corrected
- Generalised least squares as an alternative

### Slide 6: Serial Correlation
- Common in time series
- Positive SC: standard errors too small
- Lagged Y as regressor → coefficients inconsistent

### Slide 7: Detecting and Fixing Serial Correlation
- Breusch-Godfrey: residuals on X and lagged residuals
- DW ≈ 2(1 - r); well below 2 = positive SC
- Newey-West standard errors

### Slide 8: Multicollinearity
- Highly correlated X variables
- Standard errors inflated → Type II errors
- Symptom: high R², significant F, insignificant t's

### Slide 9: Variance Inflation Factor
- VIF = 1/(1 - R²_j)
- > 5 investigate, > 10 serious
- Remedies: drop, re-proxy, more data

### Slide 10: The Summary Grid
- Heteroskedasticity: unbiased, SE too small
- Serial correlation: consistent (unless lagged Y), SE too small
- Multicollinearity: unbiased, SE too large

### Slide 11: Exam Traps
- "Biased coefficients" is usually the wrong answer
- White ≠ Newey-West
- BP uses n, df = k

## Whiteboard examples
**Example 1 - Breusch-Pagan.** n = 60, k = 3, auxiliary R² = 0.15. BP = 60 × 0.15 = 9.0 > 7.815 (5% chi-square, 3 df) → reject homoskedasticity. Variation: R² = 0.12 → BP = 7.2 < 7.815 → fail to reject. Show that the conclusion flips on a small change, so precision matters.

**Example 2 - VIF.** Regress X1 on X2 and X3: R² = 0.85 → VIF = 1/0.15 = 6.67 (investigate). If R² = 0.60 → VIF = 2.5 (fine). If R² = 0.92 → VIF = 12.5 (serious).

**Example 3 - Diagnose the vignette.** Output: R² = 0.78, F = 41.3 (p < 0.001), none of four t-stats above 1.6. Students name the problem (multicollinearity) and the remedy (drop or combine correlated variables, check VIFs).

## Questions to ask students
- Does conditional heteroskedasticity bias the slope coefficients? (No; it distorts the standard errors.)
- In the BP test with 5 independent variables, how many degrees of freedom? (5.)
- Which standard-error correction handles both heteroskedasticity and serial correlation? (Newey-West.)
- What does a DW of about 2 suggest? (No first-order serial correlation.)
- A variable's VIF is 4. Should you worry? (Not much; below the common threshold of 5.)
- When does serial correlation make coefficients inconsistent? (When a lagged dependent variable is a regressor.)

## Analogies
- Heteroskedasticity as a ruler that stretches: your measurements (coefficients) are on average right, but your stated precision is a lie.
- Multicollinearity as two singers in unison: you hear the song clearly (high R²) but cannot tell who is singing which part (large standard errors).
- Serial correlation as an echo in a room: each observation repeats part of the last one, so you have less independent information than your sample size suggests.

## Recording tips
- Keep the summary grid on screen for the last third of the lecture; most item-set questions can be answered from it.
- Stress the distinction between "coefficients wrong" and "standard errors wrong" repeatedly - it is the core skill.
- Show a fan-shaped residual plot next to the BP calculation so students link the picture to the test.
