---
title: "Option Pricing: Black-Scholes and Binomial Trees"
---

## Learning goals
- Implement the Black-Scholes formulas for European calls and puts with `scipy.stats.norm`.
- Calculate delta, gamma, vega and theta and interpret each one.
- Build a vectorised Cox-Ross-Rubinstein binomial tree for European and American options.
- Check pricing code with put-call parity and convergence tests.

## Explanation

### Two routes to the same answer
An option's fair value is the discounted expected payoff under risk-neutral probabilities: a world in which every asset is expected to earn the risk-free rate. The **binomial tree** gets there step by step, letting the price move up or down in each small interval. **Black-Scholes** is the limit of that tree as the steps become infinitely small, giving a closed-form formula. In code, the tree is more flexible (it handles early exercise); the formula is faster and gives Greeks analytically.

### Black-Scholes
For a non-dividend-paying stock:

$$
C = S\,N(d_1) - K e^{-rT} N(d_2), \qquad P = K e^{-rT} N(-d_2) - S\,N(-d_1)
$$

$$
d_1 = \frac{\ln(S/K) + (r + \sigma^2/2)T}{\sigma\sqrt{T}}, \qquad d_2 = d_1 - \sigma\sqrt{T}
$$

where $S$ is the spot price, $K$ the strike, $T$ the time to expiry in years, $r$ the continuously compounded risk-free rate, $\sigma$ the annual volatility and $N(\cdot)$ the standard normal CDF (`norm.cdf`). Put-call parity, $C - P = S - Ke^{-rT}$, must hold for European options and makes an excellent unit test.

### The Greeks
- **Delta** $= N(d_1)$ for a call: change in option value per 1-unit move in the stock; also the hedge ratio.
- **Gamma** $= \phi(d_1)/(S\sigma\sqrt{T})$: how fast delta changes.
- **Vega** $= S\,\phi(d_1)\sqrt{T}$: value change per 1.00 (that is, 100 percentage points) change in volatility; divide by 100 for a one-point move.
- **Theta**: value change per year as time passes (divide by 365 or 252 for a daily figure). Long options usually lose value over time.

Here $\phi$ is the standard normal density (`norm.pdf`).

### The binomial tree
With $N$ steps of length $\Delta t = T/N$, the CRR parameters are

$$
u = e^{\sigma\sqrt{\Delta t}}, \quad d = 1/u, \quad p = \frac{e^{r\Delta t} - d}{u - d}
$$

where $u$ and $d$ are the up and down factors and $p$ is the risk-neutral probability of an up move. We compute payoffs at expiry, then step backwards, discounting the probability-weighted average of the two children. For an American option we also compare with the immediate exercise value at every node and keep the larger.

### The code
The backward induction is vectorised: at each step `V[:-1]` and `V[1:]` are the up and down children of every node, so only one loop over time is needed.

```python
import numpy as np
from scipy.stats import norm

def bs_price(S, K, T, r, sigma, kind="call"):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    if kind == "call":
        return S * norm.cdf(d1) - K * np.exp(-r * T) * norm.cdf(d2)
    return K * np.exp(-r * T) * norm.cdf(-d2) - S * norm.cdf(-d1)

def bs_greeks_call(S, K, T, r, sigma):
    d1 = (np.log(S / K) + (r + 0.5 * sigma**2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)
    delta = norm.cdf(d1)
    gamma = norm.pdf(d1) / (S * sigma * np.sqrt(T))
    vega = S * norm.pdf(d1) * np.sqrt(T)              # per 1.00 change in sigma
    theta = (-S * norm.pdf(d1) * sigma / (2 * np.sqrt(T))
             - r * K * np.exp(-r * T) * norm.cdf(d2))  # per year
    return delta, gamma, vega, theta

def binomial(S, K, T, r, sigma, N, kind="call", american=False):
    dt = T / N
    u = np.exp(sigma * np.sqrt(dt)); d = 1 / u
    p = (np.exp(r * dt) - d) / (u - d)
    disc = np.exp(-r * dt)
    ST = S * u ** np.arange(N, -1, -1) * d ** np.arange(0, N + 1)
    V = np.maximum(ST - K, 0) if kind == "call" else np.maximum(K - ST, 0)
    for i in range(N - 1, -1, -1):
        V = disc * (p * V[:-1] + (1 - p) * V[1:])
        if american:
            Si = S * u ** np.arange(i, -1, -1) * d ** np.arange(0, i + 1)
            exercise = Si - K if kind == "call" else K - Si
            V = np.maximum(V, exercise)
    return V[0]

S, K, T, r, sigma = 100, 100, 1.0, 0.05, 0.20
c, p = bs_price(S, K, T, r, sigma), bs_price(S, K, T, r, sigma, "put")
print(f"BS call {c:.4f}  BS put {p:.4f}")
print(f"Parity check C - P = {c - p:.4f}, S - K e^(-rT) = {S - K * np.exp(-r * T):.4f}")
dl, gm, vg, th = bs_greeks_call(S, K, T, r, sigma)
print(f"delta {dl:.4f} gamma {gm:.4f} vega {vg:.4f} theta {th:.4f}")
for N in (10, 100, 500):
    print(f"N={N:3d} binomial call {binomial(S, K, T, r, sigma, N):.4f}")
print(f"European put (N=500): {binomial(S, K, T, r, sigma, 500, 'put'):.4f}")
print(f"American put (N=500): {binomial(S, K, T, r, sigma, 500, 'put', True):.4f}")
```

Output:

```
BS call 10.4506  BS put 5.5735
Parity check C - P = 4.8771, S - K e^(-rT) = 4.8771
delta 0.6368 gamma 0.0188 vega 37.5240 theta -6.4140
N= 10 binomial call 10.2534
N=100 binomial call 10.4306
N=500 binomial call 10.4466
European put (N=500): 5.5695
American put (N=500): 6.0888
```

### Reading the results
- Parity holds to four decimals, so call and put formulas are consistent.
- Delta 0.6368: the call gains about 0.64 per 1-point rise in the stock. Vega 37.52 means a one-point rise in volatility (0.01) adds about 0.375. Theta −6.41 per year is about −0.0176 per calendar day (÷ 365) or −0.0254 per trading day (÷ 252).
- The binomial price converges toward Black-Scholes as $N$ grows (10.2534, 10.4306, 10.4466 versus 10.4506), oscillating slightly on the way.
- The American put (6.0888) is worth more than the European put (5.5695) because early exercise can be valuable when the put is deep in the money. For a call on a non-dividend stock, early exercise is never optimal, so American and European calls have the same value.

## Worked example
**Part 1: Black-Scholes by hand.** S = 100, K = 100, T = 1, r = 5%, σ = 20%.
1. $d_1$ = [ln(1) + (0.05 + 0.02) × 1] / 0.20 = 0.07 / 0.20 = 0.35.
2. $d_2$ = 0.35 − 0.20 = 0.15.
3. N(0.35) = 0.6368; N(0.15) = 0.5596.
4. Discounted strike: 100 × e^−0.05 = 95.1229.
5. C = 100 × 0.6368 − 95.1229 × 0.5596 = 63.6831 − 53.2325 = **10.4506**.
6. Put by parity: P = C − S + Ke^−rT = 10.4506 − 100 + 95.1229 = **5.5735**.

**Part 2: a one-step tree.** Same S, K, r and T, but with u = 1.2 and d = 0.8 chosen for simple arithmetic.

```python
import numpy as np

S, K, r, T, u, d = 100, 100, 0.05, 1.0, 1.2, 0.8
p = (np.exp(r * T) - d) / (u - d)                 # risk-neutral up probability
call_up, call_down = max(S * u - K, 0), max(S * d - K, 0)
call = np.exp(-r * T) * (p * call_up + (1 - p) * call_down)
delta = (call_up - call_down) / (S * u - S * d)  # hedge ratio
print(f"p={p:.4f} call={call:.4f} delta={delta:.2f}")
```

```
p=0.6282 call=11.9508 delta=0.50
```

1. Up price 120 → call payoff 20; down price 80 → payoff 0.
2. p = (e^0.05 − 0.8) / (1.2 − 0.8) = (1.05127 − 0.8) / 0.4 = 0.6282.
3. Call = e^−0.05 × (0.6282 × 20 + 0.3718 × 0) = 0.95123 × 12.5636 = **11.9508**.
4. Hedge ratio = (20 − 0) / (120 − 80) = 0.50 shares per call. The one-step value differs from Black-Scholes because a single step with these wide u and d is a crude model, which is why we use hundreds of steps.

## Common exam traps
- Passing volatility or rates as whole numbers (20 instead of 0.20).
- Using the real-world expected return instead of the risk-free rate in $p$ or in $d_1$.
- Reading vega as the change for a one-point move without dividing by 100.
- Forgetting the early-exercise check (`np.maximum(V, exercise)`) when pricing American options.
- Expecting a binomial tree with few steps to match Black-Scholes exactly.

## Key takeaways
- Black-Scholes is a few lines with `norm.cdf`; test it with put-call parity.
- Greeks come straight from $d_1$, $d_2$, `norm.cdf` and `norm.pdf`.
- A vectorised CRR tree needs one loop over time steps, not over nodes.
- Trees converge to Black-Scholes as steps increase and handle American exercise naturally.
- An American put is worth more than its European twin; an American call on a non-dividend stock is not.
