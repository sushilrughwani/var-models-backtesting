---
title: "Term Structure Models of Interest Rates"
---

## Learning goals
- Build one step of a binomial short-rate tree for a model with no drift, a constant drift and mean reversion.
- Explain what the drift term represents and why a time-dependent drift lets a model match today's curve.
- Calculate the expected future short rate and the half-life of a mean-reverting (Vasicek) process.
- Describe the convexity effect and how volatility and maturity drive it.
- Compare normal, square-root (CIR) and lognormal volatility specifications.

## Explanation

### Why model the short rate?
To value bonds with embedded options, callable debt or interest rate derivatives, we need a model of how the whole curve can evolve. A **short-rate model** describes the dynamics of the instantaneous rate $r$; every bond price then follows by discounting along all possible rate paths. Each model has two building blocks: a **drift** (where the rate is expected to go) and a **volatility** (how uncertain that is).

### Model 1: no drift
$$
dr = \sigma\,dw
$$

where $\sigma$ is the annual basis-point volatility of the short rate and $dw$ is a normally distributed shock with mean zero and variance $dt$. In a binomial tree with step $dt$, the rate moves up or down by $\sigma\sqrt{dt}$ with probability one-half each. Rates are normally distributed, so they can go negative, and the model implies a curve that slopes down at long maturities because of convexity (see below).

### Model 2: constant drift
$$
dr = \lambda\,dt + \sigma\,dw
$$

The drift $\lambda$ blends the market's expected rate change with a **risk premium** demanded for bearing rate risk. Each node shifts by $\lambda\,dt$ before the up/down move. Letting the drift vary by period, $\lambda(t)$, gives the **Ho-Lee** model, which can be calibrated to fit today's observed term structure exactly.

### Vasicek: mean reversion
$$
dr = k(\theta - r)\,dt + \sigma\,dw
$$

where $k$ is the speed of mean reversion and $\theta$ is the long-run level. When $r$ is below $\theta$ the drift is positive, and vice versa. Economically, central banks and the business cycle pull rates back towards a normal level. Useful results:

$$
E[r_T] = \theta + (r_0 - \theta)e^{-kT}, \qquad \text{half-life} = \frac{\ln 2}{k}
$$

The half-life is the time for the expected gap to $\theta$ to halve. Mean reversion also dampens long-horizon uncertainty, so long-maturity yields are less volatile than short ones, which matches the data better than Model 1.

### Choices for volatility
- **Normal (Models 1, 2, Vasicek):** volatility in basis points, independent of the rate level. Simple and analytic, but allows negative rates.
- **Time-dependent volatility:** $\sigma(t)$ lets volatility decline with horizon to fit cap prices.
- **CIR (square-root):** $dr = k(\theta - r)dt + \sigma\sqrt{r}\,dw$. Basis-point volatility shrinks as $r$ falls, which keeps rates non-negative.
- **Lognormal:** model $\ln r$, so volatility is proportional to the rate level; rates cannot go negative.

### The convexity effect
Bond prices are convex in rates: a fall in rates raises the price more than an equal rise lowers it. Uncertainty therefore *raises* the expected discounted value of a bond and *lowers* its yield. In Model 1 the reduction in the $T$-year zero yield is

$$
\text{convexity effect} = \frac{\sigma^2 T^2}{6}
$$

It grows with the square of volatility and the square of maturity, which is why it is negligible at the short end but meaningful for 30-year bonds.

## Worked example
Today's short rate is 5%, basis-point volatility is 1.2% per year and the tree uses monthly steps ($dt = 1/12$).

**Step 1 - Model 1.** $\sigma\sqrt{dt} = 0.012 \times \sqrt{1/12} = 0.3464\%$. Up node $= 5.3464\%$, down node $= 4.6536\%$.

**Step 2 - Model 2 with λ = 0.24% per year.** Monthly drift $= 0.0024/12 = 0.02\%$. Up node $= 5\% + 0.02\% + 0.3464\% = 5.3664\%$; down node $= 4.6736\%$.

**Step 3 - Vasicek** with $r_0 = 4\%$, $\theta = 6\%$, $k = 0.10$, $\sigma = 1\%$. Monthly drift $= 0.10 \times (6\% - 4\%)/12 = 0.0167\%$. Shock $= 0.01\sqrt{1/12} = 0.2887\%$. Up node $= 4.3053\%$, down node $= 3.7280\%$.

**Step 4 - expected rate in 5 years.** $6\% + (4\% - 6\%)e^{-0.5} = 6\% - 1.2131\% = 4.7869\%$. Half-life $= \ln 2 / 0.10 = 6.93$ years.

**Step 5 - convexity.** Back in Model 1 with $\sigma = 1.2\%$, a 10-year zero yield is lowered by $0.012^2 \times 10^2 / 6 = 0.0024$, or **24 basis points**. At 30 years it is 216 basis points, which shows why long-maturity yields can lie below expected average short rates.

## Common exam traps
- Scaling the shock by $dt$ instead of $\sqrt{dt}$; only the drift scales linearly with time.
- Forgetting that the Model 2 drift includes a risk premium, not just expected rate changes.
- Using $k$ as the half-life: the half-life is $\ln 2/k$, about $0.693/k$.
- Saying CIR or lognormal models have constant basis-point volatility; both make volatility rise with the rate level.
- Getting the sign of convexity wrong: it lowers yields, and the effect grows with maturity squared.

## Key takeaways
- Short-rate models combine a drift and a volatility; trees move the rate by drift × dt plus or minus σ√dt.
- Model 1 has no drift; Model 2 adds a drift that includes a risk premium; Ho-Lee makes the drift time-dependent to fit today's curve.
- Vasicek mean reverts: expected rate approaches θ at speed k, with half-life ln 2 / k.
- CIR and lognormal specifications tie volatility to the rate level and prevent negative rates.
- Convexity lowers long yields by roughly σ²T²/6 in the simplest model.
