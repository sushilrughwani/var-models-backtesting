---
title: "The Term Structure of Interest Rates"
duration: 28
---

## Lecture outline
- 00:00 - Hook: "You can lock in a 2-year rate today, or a 1-year rate and roll it. What 1-year rate next year makes you indifferent?"
- 03:00 - Spot, par and forward curves; why YTM curves suffer from the coupon effect; bootstrapping in words.
- 07:00 - Forward rate notation and the no-arbitrage equation.
- 10:00 - Whiteboard: 1y1y, 2y1y and 1y2y forwards from a spot curve.
- 15:00 - Forwards versus spots: the average versus marginal intuition.
- 17:00 - Par rates from spot rates; pricing consistency check.
- 20:00 - Yield curve shapes.
- 22:00 - Term structure theories with a comparison table.
- 27:00 - Recap and preview of duration.

## Slides
### Slide 1: The Term Structure of Interest Rates
- How rates vary with maturity for one credit quality
- Three curves: spot, par, forward
- Theories that explain the shape

### Slide 2: The Spot Curve
- Zero-coupon yield for each maturity
- One rate per cash flow, no coupon effect
- Bootstrapped from par bonds

### Slide 3: The Par Curve
- Coupon rate that prices each maturity at 100
- Close to newly issued government bonds
- p_N = (1 − DF_N) / ΣDF_t

### Slide 4: Forward Rates
- Rate agreed today for a future loan
- Notation: AyBy = starts in A years, lasts B years
- (1 + z_B)^B = (1 + z_A)^A × (1 + f)^(B−A)

### Slide 5: Spot as an Average of Forwards
- (1 + z_3)^3 = (1 + z_1)(1 + f_1,1)(1 + f_2,1)
- Upward curve: forwards above spots
- Downward curve: forwards below spots

### Slide 6: Pricing Consistency
- Discount with spot rates or chained forwards
- Same price either way
- Any difference is an arbitrage

### Slide 7: Yield Curve Shapes
- Normal (upward), flat, inverted, humped
- Inversion often precedes recessions
- Shape reflects expectations and risk premiums

### Slide 8: Expectations Theories
- Unbiased: forward = expected future spot
- Local: all bonds earn the risk-free rate over short horizons
- Both assume no (or only short-horizon) risk premium

### Slide 9: Liquidity Preference
- Investors demand extra yield for longer maturities
- Forward = expected spot + liquidity premium
- Upward slope possible even with flat expectations

### Slide 10: Segmented Markets and Preferred Habitat
- Segmented: each maturity set by its own supply and demand
- Preferred habitat: investors leave their segment for enough extra yield
- Explains humps and kinks from investor demand

### Slide 11: Recap
- Spot, par, forward: same information, three lenses
- Compute forwards with compounding, annualise with the root
- Know what each theory says forwards mean

## Whiteboard examples
**Example 1 - forwards.** Spot rates: 1y 3.0%, 2y 3.5%, 3y 4.0%.
- 1y1y = 1.035²/1.03 − 1 = **4.00%** (approximation 2 × 3.5 − 3 = 4.0%)
- 2y1y = 1.04³/1.035² − 1 = **5.01%**
- 1y2y = (1.04³/1.03)^(1/2) − 1 = **4.50%**

**Example 2 - par rates.** DF₁ = 0.970874, DF₂ = 0.933511, DF₃ = 0.888996.
- 1-year par = 3.00%
- 2-year par = (1 − 0.933511)/(1.904385) = **3.49%**
- 3-year par = (1 − 0.888996)/(2.793381) = **3.97%**

**Example 3 - consistency.** 3-year 5% bond: with spots, 4.8544 + 4.6676 + 93.3446 = **102.87**. With forwards: 5/1.03 + 5/(1.03 × 1.04) + 105/(1.03 × 1.04 × 1.0501) = **102.87**.

**Example 4 - reverse.** 1-year spot 2.5%, 1y1y forward 3.5%. 2-year spot = (1.025 × 1.035)^(1/2) − 1 = **3.00%**.

## Questions to ask students
- If the spot curve is downward sloping, are forward rates above or below spot rates? (Below.)
- Under unbiased expectations, what does an upward-sloping curve imply? (Short rates are expected to rise.)
- Can the curve slope upward under liquidity preference if rates are expected to stay constant? (Yes - the liquidity premium alone can create the slope.)
- On an upward-sloping curve, is the 5-year par rate above or below the 5-year spot rate? (Below.)
- Which theory says a pension fund would never buy 2-year bonds no matter the yield? (Segmented markets.)

## Analogies
- Spot rate as your season batting average; the forward rate is the next game. To raise the average, the next game must beat it, just as forwards sit above spots on a rising curve.
- Forwards are the toll for each stretch of motorway; the spot rate is the average toll per kilometre for the whole trip.
- Preferred habitat is a commuter who prefers the train but will drive if petrol becomes cheap enough.

## Recording tips
- Draw a timeline with arrows for every forward calculation; students struggle most with the notation, not the algebra.
- Show the spot, par and forward curves on one chart so viewers see forwards above, par slightly below spots.
- Summarise the theories in a single table (what forwards mean, risk premium yes/no) and leave it on screen during the recap.
