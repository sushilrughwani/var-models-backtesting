---
title: "Volatility Smiles"
duration: 22
---

## Lecture outline
- 00:00 - Hook: if Black-Scholes were right, every strike would have the same implied volatility. Show a real-looking skew and ask what went wrong
- 02:00 - Implied volatility and what the smile tells us about the distribution
- 05:00 - Put-call parity: why calls and puts share one smile; Whiteboard 1
- 09:00 - Currency smile: fat tails on both sides, jumps and stochastic volatility
- 12:00 - Equity skew: leverage, volatility feedback, crashophobia; Whiteboard 2
- 16:00 - Volatility surface, term structure and the frown
- 19:00 - Greeks under a smile, exam traps and recap

## Slides
### Slide 1: Volatility Smiles
- Implied volatility differs by strike and maturity
- The smile reveals the market's real distribution
- Currency versus equity patterns

### Slide 2: What Implied Volatility Is
- The volatility that makes Black-Scholes match the market price
- Constant across strikes only if prices are lognormal
- Used as a quoting convention

### Slide 3: Put-Call Parity Links the Smiles
- c − p = S₀ − Ke^(−rT) for market and model prices
- Pricing errors of calls and puts are equal
- Same strike and maturity, same implied volatility

### Slide 4: The Currency Smile
- Lowest volatility at the money, higher in both wings
- Implied distribution: fatter tails both sides, taller peak
- Causes: jumps and non-constant volatility

### Slide 5: The Equity Skew
- Implied volatility falls as strike rises
- Fat left tail, thin right tail
- Low-strike puts are expensive

### Slide 6: Why Equities Skew
- Leverage: lower price, riskier equity
- Volatility feedback: higher vol, lower price
- Crashophobia: demand for crash protection since 1987

### Slide 7: The Volatility Surface
- Implied volatility by strike and maturity
- Smiles flatten as maturity lengthens
- Dealers interpolate it to price any option

### Slide 8: The Frown
- Expected single large jump: bimodal distribution
- At-the-money volatility highest, wings lower
- Examples: binary takeover, court ruling

### Slide 9: Greeks with a Smile
- Spot moves can shift the implied volatility of an option
- Black-Scholes delta is no longer exact
- Adjust delta for how the smile moves

### Slide 10: Traps and Takeaways
- One smile for calls and puts
- FX symmetric, equity downward skew
- Jump expected: frown

## Whiteboard examples
**Example 1 - Parity and implied volatility.** S₀ = 100, K = 100, r = 5%, T = 1. Market call = 10.4506.
- Ke^(−rT) = 95.1229.
- Put from parity = 10.4506 − 100 + 95.1229 = 5.5735.
- Black-Scholes put at 20% = 5.5735, and the call at 20% = 10.4506, so both implied volatilities are 20%.

**Example 2 - Cost of the skew.** Same inputs, 90-strike put.
- Price at 20%: 2.3101. Price at 25%: 3.7514.
- Skew premium = 1.4413, about 62% more than the flat-volatility price.
- Contrast: a 110-strike call at 20% is 6.0401; if the skew lowers its volatility to 17%, it is 4.8573.

## Questions to ask students
- A European call has an implied volatility of 30%. What is the implied volatility of the put with the same strike and maturity? (30%, by put-call parity.)
- Which option is relatively most expensive under an equity skew: a 90-strike put or a 110-strike call? (The 90-strike put.)
- Why does leverage generate a skew? (A price fall raises debt relative to equity, making equity riskier and more volatile.)
- What shape do you expect before a binary FDA decision on a biotech stock? (A frown, because the distribution is bimodal.)
- Do smiles get stronger or weaker as maturity increases? (Weaker; they flatten.)

## Analogies
- The smile is a translation table: the market speaks "real distribution", Black-Scholes speaks "lognormal", and implied volatility is the dictionary between them.
- Equity puts are like flood insurance after a flood: since 1987 everyone wants it, so it is priced above what a calm model says.
- A frown is like a coin flip on price: the stock will be either much higher or much lower, rarely in between.

## Recording tips
- Draw the currency smile and equity skew side by side, with their implied distributions underneath.
- Students often think calls and puts have separate smiles; prove it with parity before moving on.
- Use the skew premium in money (1.44) to make the pattern feel concrete.
