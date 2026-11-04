---
title: "Option Pricing: Black-Scholes and Binomial Trees"
duration: 24
---

## Lecture outline
- 00:00 - Hook: one model with a closed-form answer, one built from coin flips - and they agree to three decimals
- 02:00 - Risk-neutral pricing intuition; one-step tree on the whiteboard
- 06:00 - Black-Scholes formulas and `norm.cdf`; hand calculation of d1, d2, C and P
- 10:00 - Live code: `bs_price`, put-call parity test
- 13:00 - Greeks: delta, gamma, vega, theta and their units
- 16:00 - Vectorised CRR tree; convergence for N = 10, 100, 500
- 20:00 - American vs European: early exercise check
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Option Pricing in Python
- Black-Scholes: closed form, fast, analytic Greeks
- Binomial tree: flexible, handles American exercise
- Same answer in the limit

### Slide 2: Risk-Neutral Pricing
- Value = discounted expected payoff under risk-neutral probabilities
- Every asset grows at the risk-free rate in this world
- Real-world expected return does not appear

### Slide 3: One-Step Tree
- S = 100 → 120 or 80; K = 100; r = 5%
- p = (e^0.05 − 0.8)/0.4 = 0.6282
- Call = e^−0.05 × 0.6282 × 20 = 11.9508

### Slide 4: Black-Scholes Formulas
- $C = S N(d_1) - K e^{-rT} N(d_2)$
- $d_1 = [\ln(S/K) + (r + \sigma^2/2)T] / (\sigma\sqrt{T})$, $d_2 = d_1 - \sigma\sqrt{T}$
- `norm.cdf` for N(·)

### Slide 5: Base Case Results
- S = K = 100, T = 1, r = 5%, σ = 20%
- Call 10.4506, put 5.5735
- Parity: C − P = 4.8771 = S − Ke^−rT

### Slide 6: The Greeks
- Delta 0.6368 (hedge ratio)
- Gamma 0.0188 (curvature)
- Vega 37.52 per 1.00 vol → 0.375 per vol point
- Theta −6.41 per year → −0.0176 per calendar day

### Slide 7: CRR Tree Parameters
- u = e^{σ√Δt}, d = 1/u
- p = (e^{rΔt} − d)/(u − d)
- Backward induction with `V[:-1]` and `V[1:]`

### Slide 8: Convergence
- N = 10: 10.2534
- N = 100: 10.4306
- N = 500: 10.4466 → BS 10.4506

### Slide 9: American Options
- At each node: `V = np.maximum(V, exercise)`
- American put 6.0888 vs European 5.5695
- American call = European call without dividends

### Slide 10: Exam Traps
- 20 vs 0.20 for volatility
- Real-world return in p
- Vega and theta unit conversions

### Slide 11: Key Takeaways
- Test with parity and convergence
- Greeks from d1, d2, cdf and pdf
- Trees for early exercise, formula for speed

## Whiteboard examples
1. **Black-Scholes by hand.** S = 100, K = 100, T = 1, r = 5%, σ = 20%.
   - d1 = (0 + 0.07)/0.20 = 0.35; d2 = 0.15.
   - N(d1) = 0.6368, N(d2) = 0.5596, Ke^−rT = 95.1229.
   - C = 63.6831 − 53.2325 = 10.4506. P = 10.4506 − 100 + 95.1229 = 5.5735.
2. **One-step tree.** u = 1.2, d = 0.8, r = 5%, T = 1.
   - p = (1.05127 − 0.8)/0.4 = 0.6282.
   - Call = 0.95123 × (0.6282 × 20) = 11.9508. Delta = 20/40 = 0.50.
   - Replication check: buy 0.5 shares (50) and borrow the PV of 40 (38.0492): cost 50 − 38.0492 = 11.9508.
3. **Parity.** C = 8, S = 50, K = 52, r = 4%, T = 0.5: P = 8 − 50 + 52e^−0.02 = 8.97.

## Questions to ask students
- Why does the expected return of the stock not appear in Black-Scholes? (Options are priced by replication, so only the risk-free rate matters)
- Vega is 37.52. What happens to the call if volatility rises from 20% to 21%? (It rises by about 0.375)
- Why does the binomial price wobble as N increases? (The strike falls at different positions relative to the terminal nodes, creating odd-even oscillation)
- Which is worth more: an American or a European put? (American, because early exercise can be optimal)
- What does `V[:-1]` represent in the backward loop? (The up-child values for every node at the previous step)

## Analogies
- Risk-neutral pricing is like pricing an insurance policy by the cost of building the hedge, not by guessing whether the house will burn down.
- The binomial tree is a pixelated photo of Black-Scholes; more steps, more pixels, sharper image.
- Delta is the speedometer of the option relative to the stock; gamma is the accelerator pedal.

## Recording tips
- Show the convergence table and a quick plot of binomial price vs N to make the oscillation visible.
- Keep the `bs_price` and `binomial` functions on screen side by side when comparing outputs.
- Stress units: rates and vols as decimals, vega per 1.00, theta per year.
