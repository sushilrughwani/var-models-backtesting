---
title: "Default Risk: Quantitative Methodologies"
---

## Learning goals
- Explain the Merton structural model, in which equity is a call option on the firm's assets.
- Calculate distance to default and the corresponding probability of default.
- Distinguish physical (real-world) PDs from risk-neutral PDs and explain why they differ.
- Apply the practitioner (KMV-style) distance-to-default shortcut and the EDF mapping idea.
- Interpret credit scoring models such as the Altman Z-score and logistic regression scores.

## Explanation

### The structural view: default as an option outcome
In the previous lesson PD was an input. Here we ask where it comes from. Robert Merton's insight was that a firm with debt is like a leveraged bet on its own assets. If the market value of assets $V$ at debt maturity $T$ is above the face value of debt $D$, shareholders repay the debt and keep the rest. If $V_T < D$, they walk away and creditors take the assets. So:

- Equity is a **call option** on the firm's assets with strike $D$.
- Risky debt equals risk-free debt minus a **put option** on the assets.

Default happens when assets fall below the debt barrier at maturity, so PD depends on how far assets sit above the barrier relative to their volatility.

### Distance to default
Assuming assets follow geometric Brownian motion with drift $\mu$ and volatility $\sigma_V$:
$$
DD = \frac{\ln(V_0/D) + (\mu - \tfrac{1}{2}\sigma_V^2)T}{\sigma_V\sqrt{T}}, \qquad PD = N(-DD)
$$
where $V_0$ is today's asset value, $D$ the default point, $T$ the horizon and $N(\cdot)$ the standard normal CDF. DD counts how many standard deviations the expected log-asset value lies above the default point.

### Physical versus risk-neutral PD
Using the expected asset return $\mu$ gives the **physical PD**, the real-world chance of default. Replacing $\mu$ with the risk-free rate $r$ gives $N(-d_2)$, the **risk-neutral PD** embedded in option prices and credit spreads. Since investors demand a risk premium, $\mu > r$, so the risk-neutral PD is higher. Spread-implied PDs are therefore larger than historical default rates - a recurring exam point.

### Getting the inputs
$V_0$ and $\sigma_V$ are not observable. In practice they are backed out from the observed equity value $E$ and equity volatility $\sigma_E$ by solving two equations together: the Black-Scholes call value $E = V N(d_1) - De^{-rT}N(d_2)$ and the volatility link $\sigma_E E = N(d_1)\sigma_V V$.

### The practitioner shortcut and EDF
Commercial implementations (the KMV approach) simplify in two ways. First, the default point is set at short-term debt plus half of long-term debt, because firms rarely default the moment assets touch total liabilities. Second, distance to default is measured linearly:
$$
DD \approx \frac{V_0 - DP}{\sigma_V V_0}, \qquad DP = STD + 0.5\,LTD
$$
Rather than trusting the normal distribution to convert DD into PD, the model maps DD to an **expected default frequency (EDF)** using a large historical database of how often firms with a given DD actually defaulted. This fixes the normal model's tendency to understate tail PDs.

### Credit scoring: the statistical alternative
Structural models need traded equity. For private firms and retail borrowers, lenders use statistical scoring.

- **Altman Z-score** (public manufacturers): $Z = 1.2X_1 + 1.4X_2 + 3.3X_3 + 0.6X_4 + 1.0X_5$, where $X_1$ is working capital/total assets, $X_2$ retained earnings/total assets, $X_3$ EBIT/total assets, $X_4$ market value of equity/book liabilities and $X_5$ sales/total assets. Scores below 1.81 signal distress; above 2.99 is safe; in between is a grey zone.
- **Logistic regression** produces a score $z = \beta_0 + \sum \beta_k x_k$ and converts it to a probability: $PD = 1/(1 + e^{-z})$. A score of $-3$ maps to a PD of 4.74%.

Scoring models are judged by discriminatory power (ranking good and bad borrowers, measured with ROC curves or the accuracy ratio) and by calibration (whether predicted PDs match realised default rates).

## Worked example
A firm has asset value USD 100 m, debt with face value USD 80 m due in one year, expected asset return 8%, asset volatility 25% and a risk-free rate of 3%.

**Step 1 - Leverage term.** $\ln(100/80) = \ln 1.25 = 0.2231$.

**Step 2 - Drift term.** $\mu - \tfrac{1}{2}\sigma_V^2 = 0.08 - 0.5(0.0625) = 0.04875$.

**Step 3 - Distance to default.**
$$
DD = \frac{0.2231 + 0.04875}{0.25} = \frac{0.2719}{0.25} = 1.088
$$

**Step 4 - Physical PD.** $PD = N(-1.088) = 13.84\%$.

**Step 5 - Risk-neutral PD.** Replace 8% with 3%: $d_2 = (0.2231 + 0.03 - 0.03125)/0.25 = 0.888$, so $N(-0.888) = 18.74\%$ - higher, as expected.

**Step 6 - Equity value.** $d_1 = 0.888 + 0.25 = 1.138$; $E = 100N(1.138) - 80e^{-0.03}N(0.888) = 24.15$. Debt is worth $100 - 24.15 = 75.85$, implying a yield of 5.32% and a **credit spread of about 2.32%**.

**Shortcut check.** A second firm has assets of 500, short-term debt 150, long-term debt 200 and asset volatility 20%. $DP = 150 + 100 = 250$; $DD = (500 - 250)/(0.20 \times 500) = \mathbf{2.5}$.

## Common exam traps
- Using the risk-free rate when the question asks for the real-world PD (or $\mu$ when it asks for the risk-neutral PD).
- Forgetting the $-\tfrac{1}{2}\sigma_V^2$ convexity term in the drift.
- Setting the KMV default point at total liabilities rather than short-term debt plus half of long-term debt.
- Plugging equity volatility into the DD formula instead of asset volatility.
- Reading a Z-score as a probability. It is a score; higher means safer.

## Key takeaways
- Equity is a call on firm assets; risky debt is risk-free debt minus a put.
- $PD = N(-DD)$, with DD measuring the cushion above the default point in standard deviations.
- Risk-neutral PDs exceed physical PDs because $\mu > r$.
- KMV uses DP = STD + 0.5 LTD and maps DD to empirical EDFs.
- Scoring models (Z-score, logistic) serve firms without traded equity and are validated for discrimination and calibration.
