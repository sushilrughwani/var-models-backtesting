---
title: "Default Risk: Quantitative Methodologies"
duration: 26
---

## Lecture outline
- 00:00 - Hook: shareholders of a nearly bankrupt firm still own something valuable - an option
- 02:00 - Merton set-up: equity as a call, debt as risk-free debt minus a put
- 06:00 - Distance to default and PD = N(-DD)
- 10:00 - Whiteboard: the USD 100 m firm, physical and risk-neutral PD
- 15:00 - Backing out asset value and volatility from equity data
- 17:00 - KMV shortcut: default point, linear DD and EDF mapping
- 20:00 - Credit scoring: Altman Z-score and logistic regression, discrimination and calibration
- 24:00 - Exam traps and recap

## Slides
### Slide 1: Where does PD come from?
- Structural models: default driven by asset value versus debt
- Statistical models: default predicted from financial ratios
- Today: both families
### Slide 2: Merton's payoff picture
- At T: equity = max(V - D, 0), a call on assets
- Debt = min(V, D) = D - max(D - V, 0)
- Risky debt = risk-free debt minus a put
### Slide 3: Distance to default
- DD = [ln(V/D) + (μ - σ²/2)T] / (σ√T)
- PD = N(-DD)
- More leverage or more volatility shrinks DD
### Slide 4: Physical vs risk-neutral
- Use μ: real-world PD
- Use r: risk-neutral PD = N(-d2)
- μ > r so risk-neutral PD is higher
### Slide 5: Worked firm
- V 100, D 80, μ 8%, σ 25%, T 1
- DD 1.088, PD 13.84%
- Risk-neutral PD 18.74%, spread about 2.32%
### Slide 6: Unobservable inputs
- Solve E = V N(d1) - D e^(-rT) N(d2)
- And σ_E E = N(d1) σ_V V
- Two equations, two unknowns: V and σ_V
### Slide 7: KMV shortcut
- Default point = STD + 0.5 × LTD
- DD ≈ (V - DP) / (σ_V V)
- Map DD to empirical EDF, not the normal curve
### Slide 8: Altman Z-score
- Z = 1.2X1 + 1.4X2 + 3.3X3 + 0.6X4 + 1.0X5
- Below 1.81 distress; above 2.99 safe
- A ranking score, not a probability
### Slide 9: Logistic scoring
- z = β0 + Σ βk xk
- PD = 1 / (1 + e^(-z))
- Validate discrimination (ROC, accuracy ratio) and calibration
### Slide 10: Exam traps
- μ versus r
- Asset vol, not equity vol
- DP is not total liabilities

## Whiteboard examples
**Example 1 - Merton PD.** $V = 100$, $D = 80$, $\mu = 8\%$, $\sigma_V = 25\%$, $T = 1$, $r = 3\%$. $\ln 1.25 = 0.2231$; drift $0.04875$; $DD = 0.2719/0.25 = 1.088$; $PD = N(-1.088) = 13.84\%$. Risk-neutral: $d_2 = 0.888$, PD $= 18.74\%$. Equity 24.15, debt 75.85, yield 5.32%, spread 2.32%.

**Example 2 - KMV shortcut.** Assets 500, STD 150, LTD 200, $\sigma_V = 20\%$. $DP = 250$; $DD = 250/100 = 2.5$. Ask what DD would be with DP set to total debt 350 (1.5) to show why the default point matters.

**Example 3 - Z-score.** $X_1 = 0.10$, $X_2 = 0.15$, $X_3 = 0.08$, $X_4 = 0.9$, $X_5 = 1.1$. $Z = 0.12 + 0.21 + 0.264 + 0.54 + 1.1 = 2.234$: grey zone. Logistic follow-up: score $z = -3$ gives $PD = 1/(1+e^{3}) = 4.74\%$.

## Questions to ask students
- Why is equity a call option on the firm? (Shareholders get V - D if positive and zero otherwise due to limited liability.)
- What happens to equity value if asset volatility rises? (It rises, like any call, while debt value falls.)
- Which PD is larger, risk-neutral or physical? (Risk-neutral, because it uses r < μ.)
- Why does KMV use only half of long-term debt in the default point? (Long-term debt is not due immediately, so firms survive with assets below total liabilities.)
- What two properties do we test in a scoring model? (Discriminatory power and calibration.)

## Analogies
- Shareholders hold a lottery ticket on the firm: they keep the upside, and limited liability caps their downside at zero.
- Distance to default is the number of "bad-weather standard deviations" between the river level and the top of the flood wall.
- A Z-score is a credit thermometer: it tells you who is running a fever, not the exact probability they end up in hospital.

## Recording tips
- Draw the payoff diagrams for equity and debt at maturity before any formula.
- Show the DD formula with the leverage and drift terms colour-coded; most errors are in the drift term.
- Stress the μ-versus-r switch with a side-by-side calculation.
