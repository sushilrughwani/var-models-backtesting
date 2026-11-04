---
title: "Parametric Approaches: Extreme Value"
duration: 24
---

## Lecture outline
- 00:00 - Hook: dam engineers design for a once-in-a-thousand-years flood with only 80 years of records. Risk managers face the same problem.
- 02:00 - Why normal and historical methods fail at extreme quantiles
- 05:00 - Block maxima and the GEV: Fréchet, Gumbel, Weibull
- 09:00 - Whiteboard: GEV quantile versus Gumbel quantile
- 12:00 - Peaks over threshold and the generalised Pareto distribution
- 15:00 - Whiteboard: POT VaR and ES
- 19:00 - Threshold choice, estimation, mean-excess plots
- 22:00 - Limits of EVT, traps and recap

## Slides
### Slide 1: Parametric Approaches: Extreme Value
- Model the tail, not the whole distribution
- A limit theorem for extremes
- Two tools: GEV and POT

### Slide 2: The Tail Problem
- Normal tails are too thin
- Historical samples have too few extreme points
- EVT extrapolates with theoretical support

### Slide 3: Block Maxima and the GEV
- Keep the largest loss in each block
- H(x) = exp[−(1 + ξ(x − μ)/σ)^(−1/ξ)]
- Location μ, scale σ, shape ξ

### Slide 4: Three Tail Families
- ξ > 0 Fréchet: heavy power tail, typical for returns
- ξ = 0 Gumbel: thin exponential tail
- ξ < 0 Weibull: finite upper end point

### Slide 5: GEV Quantile
- x_p = μ + (σ/ξ)[(−ln p)^(−ξ) − 1]
- Gumbel limit: x_p = μ − σ ln(−ln p)
- Block maxima waste data

### Slide 6: Peaks over Threshold
- Keep every loss above threshold u
- Excesses follow a GPD with scale β and shape ξ
- More efficient use of the data

### Slide 7: POT VaR and ES
- VaR = u + (β/ξ)[((n/N_u)(1 − α))^(−ξ) − 1]
- ES = VaR/(1 − ξ) + (β − ξu)/(1 − ξ)
- ES needs ξ < 1

### Slide 8: Choosing the Threshold
- Too low: bias from non-tail data
- Too high: variance from few exceedances
- Mean-excess plot and stability of ξ

### Slide 9: Limits of EVT
- Assumes i.i.d. extremes; apply to GARCH residuals
- Multivariate EVT: curse of dimensionality
- Large parameter uncertainty

### Slide 10: Exam Traps
- Positive ξ means Fréchet
- n/N_u, not N_u/n
- Add the threshold back

### Slide 11: Recap
- GEV for maxima, GPD for exceedances
- Shape parameter drives everything
- Next: correlation and dependence between risk factors

## Whiteboard examples
**Example 1: GEV quantile.** μ = 2%, σ = 0.7%, ξ = 0.3, p = 0.99.
- −ln 0.99 = 0.0100503; raised to −0.3 = 3.97508; minus 1 = 2.97508.
- × σ/ξ = 2.3333 gives 6.94185; x = 8.94%.
- Gumbel: 2 + 0.7 × 4.60015 = 5.22%. The heavy tail adds over 3.7 percentage points.

**Example 2: POT VaR and ES.** n = 1,000, N_u = 50, u = 2%, β = 0.6, ξ = 0.25, α = 99%.
- (1000/50) × 0.01 = 0.2; 0.2^(−0.25) = 1.49535; minus 1 = 0.49535; × 2.4 = 1.18884.
- VaR = 3.19%.
- ES = 3.18884/0.75 + (0.6 − 0.5)/0.75 = 4.25178 + 0.13333 = 4.39%.

**Example 3: POT with different inputs.** n = 2,000, N_u = 80, u = 3%, β = 0.8, ξ = 0.2, α = 99.5%.
- (2000/80) × 0.005 = 0.125; 0.125^(−0.2) = 1.51572; minus 1 = 0.51572; × 4 = 2.06287.
- VaR = 5.06%. ES = (5.06287 + 0.8 − 0.6)/0.8 = 6.58%.

## Questions to ask students
- Which GEV family fits equity returns, and why? (Fréchet, because returns have fat, power-law tails, ξ > 0.)
- Why is POT usually preferred to block maxima? (It uses every large loss, not one per block.)
- What happens to ES in the GPD model if ξ ≥ 1? (The tail mean is infinite, so ES is undefined.)
- What is the cost of a very high threshold? (Few exceedances and noisy parameter estimates.)
- Why apply EVT to GARCH residuals rather than raw returns? (Raw extremes cluster; residuals are closer to i.i.d.)

## Analogies
- EVT is the flood engineer's toolkit: design the dam from the record floods, not from average rainfall.
- The shape parameter is the thickness of the tail's "tail": ξ > 0 means the monsters keep getting bigger, ξ < 0 means there is a ceiling.
- Threshold choice is like zooming a camera: too wide and the subject blurs into the background, too tight and there are too few pixels.

## Recording tips
- Sketch the three GEV densities side by side; seeing the Fréchet tail stretch out makes ξ intuitive.
- Write the POT VaR formula in coloured pieces (threshold, scale factor, rescaled probability) before plugging numbers.
- Remind students that EVT inputs (β, ξ, u) will be given in exam questions; the skill is plugging them in correctly.
