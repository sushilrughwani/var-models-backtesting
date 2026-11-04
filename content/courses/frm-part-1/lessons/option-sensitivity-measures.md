---
title: "Option Sensitivity Measures: The Greeks"
---

## Learning goals
- Define delta, gamma, vega, theta and rho and calculate them for European options using BSM.
- Estimate an option's value change for a stock move using the delta-gamma approximation.
- Construct a delta-neutral and a delta-gamma-neutral position using the stock and a traded option.
- Explain how the Greeks change with moneyness and time to expiry, and the trade-off between gamma and theta.

## Explanation

### Why Greeks?
A trader who sells options cannot simply wait and hope. The Greeks are partial derivatives of the option value that tell the trader how the position responds to each input: the stock price, volatility, time and interest rates. They play the same role for options that DV01 and convexity played for bonds in earlier lessons.

### Delta
**Delta** is the change in option value per unit change in the stock price. Under BSM for a non-dividend-paying stock:

$$
\Delta_{call} = N(d_1), \qquad \Delta_{put} = N(d_1) - 1
$$

Call deltas lie between 0 and 1, put deltas between −1 and 0. Deep in-the-money calls have deltas near 1; far out-of-the-money calls near 0. A position is **delta-neutral** when its total delta is zero; it is then insensitive to small stock moves. The stock itself has delta 1, so the simplest hedge for a short call is to buy $\Delta$ shares per option. Because delta changes as the stock moves, the hedge must be rebalanced: this is dynamic hedging.

### Gamma
**Gamma** is the rate of change of delta with respect to the stock price:

$$
\Gamma = \frac{N'(d_1)}{S_0 \sigma \sqrt{T}}, \qquad N'(x) = \frac{1}{\sqrt{2\pi}} e^{-x^2/2}
$$

Gamma is the same for a call and a put with the same strike and expiry, is highest for at-the-money options close to expiry, and is always positive for long options. Combining delta and gamma gives a second-order approximation, just like duration and convexity:

$$
\Delta V \approx \Delta \cdot \Delta S + \tfrac{1}{2}\,\Gamma\,(\Delta S)^2
$$

The stock has zero gamma, so only another option can change a portfolio's gamma.

### Vega
**Vega** is the sensitivity to volatility: $\mathcal{V} = S_0\sqrt{T}\,N'(d_1)$, per 1.00 change in $\sigma$ (divide by 100 for a one-point change). Vega is positive for long calls and puts, largest at the money, and larger for longer maturities.

### Theta
**Theta** is the change in value as time passes, holding everything else fixed. For a call:

$$
\Theta_{call} = -\frac{S_0 N'(d_1)\sigma}{2\sqrt{T}} - rKe^{-rT}N(d_2)
$$

Theta is usually negative for long options: time decay. It is quoted per year and often divided by 365 for a per-day figure. For a delta-neutral portfolio, BSM implies $\Theta + \tfrac12\sigma^2 S^2 \Gamma = r\Pi$, so positive gamma comes at the cost of negative theta. Long gamma traders gain from big moves but bleed value every day.

### Rho
**Rho** is the sensitivity to the interest rate: $\rho_{call} = KTe^{-rT}N(d_2)$, positive for calls and negative for puts. It is usually the least important Greek for short-dated equity options.

### Delta-gamma hedging
To neutralize both delta and gamma: first buy or sell a traded option to offset gamma, because that also changes delta; then use the stock (zero gamma) to remove the remaining delta.

$$
n_{opt} = -\frac{\Gamma_{port}}{\Gamma_{opt}}, \qquad n_{stock} = -\left(\Delta_{port} + n_{opt}\Delta_{opt}\right)
$$

## Worked example
**Part A - Greeks of one call.** Using the call from the BSM lesson: $S_0 = 100$, $K = 95$, $r = 4\%$, $\sigma = 25\%$, $T = 0.75$, with $d_1 = 0.48373$, $N(d_1) = 0.68571$, $N(d_2) = 0.60535$, $N'(d_1) = 0.354894$.

- Delta $= 0.68571$ (put delta $= -0.31429$).
- Gamma $= 0.354894 / (100 \times 0.25 \times 0.866025) = 0.016392$.
- Vega $= 100 \times 0.866025 \times 0.354894 = 30.7347$, so about 0.31 per volatility point.
- Theta $= -5.1225 - 0.04 \times 92.1923 \times 0.60535 = -5.1225 - 2.2323 = -7.3548$ per year, or about $-0.0202$ per day.
- Rho $= 95 \times 0.75 \times e^{-0.03} \times 0.60535 = 41.8566$, about 0.42 per 1% rate change.

**Part B - delta-gamma approximation.** If the stock rises by 3: delta alone predicts $0.68571 \times 3 = 2.0571$. Adding gamma: $2.0571 + 0.5 \times 0.016392 \times 9 = 2.0571 + 0.0738 = 2.1309$. Full repricing gives 2.1285, so the gamma term closes most of the gap.

**Part C - hedge a book.** A portfolio has delta +1,200 and gamma −500. A traded option has delta 0.60 and gamma 0.04.

1. Gamma: buy $500 / 0.04 = 12{,}500$ options.
2. New delta: $1{,}200 + 12{,}500 \times 0.60 = 8{,}700$.
3. Delta: sell 8,700 shares.

**Answer: buy 12,500 options and sell 8,700 shares** to be delta- and gamma-neutral.

## Common exam traps
- Fixing delta first in a delta-gamma hedge; the option trade that fixes gamma also changes delta.
- Thinking the stock can hedge gamma; its gamma is zero.
- Using $N(d_1)$ as the put delta instead of $N(d_1) - 1$.
- Forgetting the $\tfrac12$ in the gamma term or applying gamma to $\Delta S$ instead of $(\Delta S)^2$.
- Reporting vega or theta in the wrong units (per 1.00 versus per point, per year versus per day).

## Key takeaways
- Delta = first-order stock sensitivity; call $N(d_1)$, put $N(d_1) - 1$.
- Gamma = curvature; highest at the money near expiry, identical for calls and puts.
- Vega is largest at the money and for long maturities; theta is usually negative.
- $\Delta V \approx \Delta\cdot\Delta S + \tfrac12\Gamma(\Delta S)^2$.
- Hedge gamma with options first, then delta with the stock.
- Long gamma means paying theta: big moves help, quiet days hurt.
