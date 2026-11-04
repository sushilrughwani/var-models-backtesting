---
title: "The Black-Scholes-Merton Model"
---

## Learning goals
- State the key assumptions of the Black-Scholes-Merton (BSM) model and explain the lognormal price distribution.
- Calculate European call and put prices with the BSM formula and verify them with put-call parity.
- Adjust BSM for continuous dividend yields and for known discrete dividends.
- Explain implied volatility and what the volatility smile reveals about the model's limits.

## Explanation

### From trees to a formula
In the binomial lesson, the price of an option converged as the number of steps grew. BSM is that limit: a closed-form price for European options when the stock moves continuously. The underlying logic is the same. Over each instant, a position in the stock and the option can be combined into a riskless portfolio, so the option can be priced as if investors were risk-neutral.

### Assumptions
- The stock price follows geometric Brownian motion, so prices are **lognormally** distributed and continuously compounded returns are normal.
- Volatility $\sigma$ and the risk-free rate $r$ are constant and known.
- Trading is continuous, with no transaction costs, taxes or short-sale restrictions.
- There are no riskless arbitrage opportunities.
- The option is European (exercise only at expiry), and in the basic model the stock pays no dividends.

Under the lognormal model, $\ln S_T$ is normal with mean $\ln S_0 + (\mu - \sigma^2/2)T$ and variance $\sigma^2 T$, where $\mu$ is the expected return. In pricing, $\mu$ is replaced by $r$.

### The pricing formula
For a non-dividend-paying stock:

$$
c = S_0 N(d_1) - K e^{-rT} N(d_2), \qquad p = K e^{-rT} N(-d_2) - S_0 N(-d_1)
$$

$$
d_1 = \frac{\ln(S_0/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}
$$

where $S_0$ is the stock price, $K$ the strike, $T$ the time to expiry in years, $r$ the continuously compounded risk-free rate, $\sigma$ the annual volatility and $N(\cdot)$ the standard normal cumulative distribution function.

Read the call formula as "what you get minus what you pay." $N(d_2)$ is the risk-neutral probability that the call finishes in the money, so $K e^{-rT} N(d_2)$ is the present value of the expected strike payment. $S_0 N(d_1)$ is the present value of receiving the stock when exercised. $N(d_1)$ is also the call's delta, which you will meet in the next lesson. Calls and puts must satisfy **put-call parity**: $c - p = S_0 - K e^{-rT}$.

### Dividends
With a continuous dividend yield $q$ (used for stock indices and, with $q = r_f$, for currencies), replace $S_0$ by $S_0 e^{-qT}$:

$$
c = S_0 e^{-qT} N(d_1) - K e^{-rT} N(d_2), \qquad d_1 = \frac{\ln(S_0/K) + (r - q + \sigma^2/2)T}{\sigma\sqrt{T}}
$$

With known discrete dividends before expiry, subtract the present value of those dividends from $S_0$ and use the adjusted price in the standard formula. Dividends lower call values and raise put values, because the stock price drops on the ex-dividend date. For American calls on dividend-paying stocks, a common shortcut (Black's approximation) values European calls expiring just before each ex-dividend date and at final expiry, and takes the largest.

### Implied volatility
Every input except $\sigma$ is observable. **Implied volatility** is the $\sigma$ that makes the BSM price equal the market price, found by trial and error because the formula cannot be inverted algebraically. Traders quote options in implied volatility because it is comparable across strikes and maturities. If BSM were exactly right, implied volatility would be the same for every strike. In practice equity options show a **smile or skew**, with higher implied volatility for low strikes, reflecting fat tails and crash risk that the lognormal assumption ignores.

## Worked example
$S_0 = 100$, $K = 95$, $r = 4\%$, $\sigma = 25\%$, $T = 0.75$ years, no dividends.

**Step 1 - building blocks.** $\ln(100/95) = 0.051293$; $(r + \sigma^2/2)T = (0.04 + 0.03125) \times 0.75 = 0.053438$; $\sigma\sqrt{T} = 0.25 \times 0.866025 = 0.216506$.

**Step 2 - d1 and d2.**

$$
d_1 = \frac{0.051293 + 0.053438}{0.216506} = 0.48373, \qquad d_2 = 0.48373 - 0.21651 = 0.26722
$$

**Step 3 - normal probabilities.** $N(d_1) = 0.68571$ and $N(d_2) = 0.60535$.

**Step 4 - call price.** $K e^{-rT} = 95 e^{-0.03} = 92.1923$.

$$
c = 100 \times 0.68571 - 92.1923 \times 0.60535 = 68.5712 - 55.8086 = 12.76
$$

**Step 5 - put via parity.**

$$
p = c - S_0 + K e^{-rT} = 12.7624 - 100 + 92.1923 = 4.95
$$

**Step 6 - add a 2% dividend yield.** Now $d_1 = 0.41445$, $d_2 = 0.19794$, $N(d_1) = 0.66073$, $N(d_2) = 0.57845$ and $S_0 e^{-qT} = 98.5112$. The call falls to **11.76** and the put rises to **5.44**, as expected when dividends lower the forward stock price.

The answers are: **call 12.76, put 4.95** without dividends.

## Common exam traps
- Forgetting to square $\sigma$ in $d_1$, or forgetting $\sqrt{T}$ in the denominator.
- Discounting the stock term instead of the strike term (only $K$ is multiplied by $e^{-rT}$ when $q = 0$).
- Using $N(d_1)$ and $N(d_2)$ for the put instead of $N(-d_1)$ and $N(-d_2)$.
- Subtracting undiscounted dividends from the stock price; use their present value.
- Assuming the BSM price works for American puts; early exercise value is not captured.

## Key takeaways
- BSM assumes lognormal prices, constant volatility and rates, and frictionless continuous trading.
- Call = $S_0N(d_1) - Ke^{-rT}N(d_2)$; put = $Ke^{-rT}N(-d_2) - S_0N(-d_1)$.
- $N(d_2)$ is the risk-neutral probability of exercise for a call.
- Dividend yield: replace $S_0$ with $S_0e^{-qT}$; discrete dividends: subtract their present value.
- Implied volatility is the market's price of an option expressed as a volatility.
- Volatility smiles show where the lognormal assumption fails.
