---
title: "Volatility Smiles"
---

## Learning goals
- Explain why put-call parity forces European calls and puts with the same strike and maturity to share one implied volatility.
- Describe the typical smile in currency options and the skew in equity options, and the implied distributions behind them.
- Explain the main economic reasons for the equity skew, including leverage and crash fear.
- Interpret the volatility surface and how an anticipated large jump changes the smile's shape.
- Quantify how much a higher implied volatility adds to the price of an out-of-the-money option.

## Explanation

### Implied volatility and the smile
The Black-Scholes-Merton model assumes a single constant volatility and lognormal prices. If that were true, backing out the **implied volatility** from market prices would give the same number for every strike. It does not. Plotting implied volatility against strike (or moneyness, $K/S$) produces a curve called the **volatility smile**. The smile is the market's way of saying the true distribution is not lognormal; traders still quote prices in Black-Scholes volatility units because the scale is familiar.

### Put-call parity: one smile for calls and puts
For European options on a non-dividend-paying asset:

$$
c - p = S_0 - Ke^{-rT}
$$

where $c$ and $p$ are call and put prices, $S_0$ is the spot price, $K$ the strike, $r$ the continuously compounded risk-free rate and $T$ the time to expiry. The relation holds for market prices (by no-arbitrage) and for Black-Scholes prices at any volatility. Subtracting the two shows that the pricing error of the call equals that of the put. So if a call's implied volatility is 22%, a put with the same strike and maturity also has an implied volatility of 22%. There is a single smile per maturity, not separate call and put smiles.

### Currency options: a symmetric smile
FX implied volatilities are typically lowest near the money and higher for both deep in-the-money and out-of-the-money strikes. The implied distribution has **fatter tails on both sides** and a taller peak than the lognormal. Two causes: exchange-rate volatility is not constant (it clusters), and exchange rates jump, for example on central bank interventions or devaluations. Both features make large moves in either direction more likely than the lognormal predicts.

### Equity options: the skew
Equity implied volatility usually **falls as strike rises**: low-strike puts are expensive relative to high-strike calls. The implied distribution has a fat left tail and a thinner right tail. Explanations:

- **Leverage:** when the share price falls, equity becomes a smaller cushion against fixed debt, so the firm's equity becomes riskier and volatility rises.
- **Volatility feedback:** higher volatility raises required returns, which pushes prices lower.
- **Crashophobia:** since the 1987 crash, investors pay a premium for protection against sudden market drops, bidding up out-of-the-money puts.

### Volatility surface and term structure
Implied volatility also varies with maturity. Combining strike and maturity gives the **volatility surface**, which dealers interpolate to price non-standard options. Short-dated smiles are usually more pronounced; as maturity lengthens, the smile flattens because the effects of jumps average out. When short-dated volatility is unusually low, the term structure tends to slope up, and when it is high, it tends to slope down.

### Unusual shapes: the frown
If the market expects a single large jump, such as a binary takeover outcome or a court ruling, the price distribution becomes **bimodal**. At-the-money options then carry the highest implied volatility and both wings carry less, producing a **frown**.

### Greeks and smiles
When volatility depends on strike, a change in spot price can shift the implied volatility of a given option, so the Black-Scholes delta is no longer exact. Practitioners adjust delta to reflect how the smile moves as the spot price changes.

## Worked example
Spot $S_0 = 100$, strike $K = 100$, $r = 5\%$, $T = 1$ year.

**Step 1 - call price at 20% volatility.** Black-Scholes gives $c = 10.4506$.

**Step 2 - put from parity.** $Ke^{-rT} = 100e^{-0.05} = 95.1229$. Then $p = c - S_0 + Ke^{-rT} = 10.4506 - 100 + 95.1229 = 5.5735$.

**Step 3 - check implied volatility.** The Black-Scholes put price at 20% is also 5.5735, so the put's implied volatility is exactly 20%, the same as the call's.

**Step 4 - the skew in money terms.** Now price a 90-strike put. At a flat 20% volatility it is worth 2.3101. If the equity skew lifts its implied volatility to 25%, it is worth 3.7514. The skew adds $3.7514 - 2.3101 = 1.4413$, so the market charges **about 1.44 (62% more) for crash protection** than a flat-volatility model would.

## Common exam traps
- Claiming calls and puts with the same strike and maturity can have different implied volatilities; put-call parity rules that out for European options.
- Mixing up shapes: currency options show a roughly symmetric smile, equities a downward skew.
- Saying a skew implies a fatter right tail for equities; it implies a fatter left tail.
- Forgetting that a single anticipated jump produces a frown, not a smile.
- Treating the smile as proof Black-Scholes is useless: it is still the quoting convention, just with strike-dependent volatility.

## Key takeaways
- Implied volatility varies with strike and maturity, revealing a non-lognormal distribution.
- Put-call parity gives European calls and puts with the same strike and maturity the same implied volatility.
- FX smiles reflect fat tails on both sides from jumps and stochastic volatility.
- Equity skews reflect a fat left tail, explained by leverage, volatility feedback and crash fear.
- The volatility surface combines smile and term structure; smiles flatten as maturity lengthens.
- An expected one-off jump creates a bimodal distribution and a volatility frown.
