---
title: "Exchange Rate Calculations"
duration: 26
---

## Lecture outline
- 00:00 - Hook: the euro rose 4.55% against the dollar. Did the dollar fall 4.55%? (No, and that is a classic exam trap.)
- 03:00 - Reading quotes: base versus price currency, direct versus indirect
- 06:00 - Percentage appreciation and depreciation of each currency
- 10:00 - Cross rates: chaining quotes so the common currency cancels
- 14:00 - Covered interest parity: intuition with the borrow-convert-invest route, then the formula
- 19:00 - Forward points, premium and discount, annualising
- 23:00 - Points to outright; recap and exam traps

## Slides
### Slide 1: The Quote Convention
- S(A/B): units of price currency A per one unit of base currency B
- USD/EUR 1.1000: one euro costs 1.10 dollars
- Always identify the base currency first

### Slide 2: Direct and Indirect Quotes
- Direct: domestic currency per unit of foreign currency
- Indirect: foreign currency per unit of domestic currency
- Same market rate, different perspective

### Slide 3: Percentage Change of the Base Currency
- %Δ base = S1 / S0 − 1
- Quote rises: base appreciates
- Quote falls: base depreciates

### Slide 4: Percentage Change of the Price Currency
- Use the inverted quote: S0 / S1 − 1
- Not the negative of the base currency's change
- Different denominators create the asymmetry

### Slide 5: Cross Rates
- S(A/C) = S(A/B) × S(B/C)
- The common currency must cancel
- Same position in both quotes: invert one first

### Slide 6: Covered Interest Parity
- Forward route equals borrow, convert, invest route
- F(A/B) = S(A/B) × (1 + i_A τ) / (1 + i_B τ)
- Price currency rate on top, base currency rate below

### Slide 7: Premium or Discount
- Lower-yielding currency trades at a forward premium
- Higher-yielding currency trades at a forward discount
- Approximation: F − S ≈ S × (i_A − i_B) × τ

### Slide 8: Forward Points
- Points = (F − S) × 10,000 (× 100 for JPY pairs)
- Positive points: base at a premium
- Outright = spot + points / 10,000

### Slide 9: Annualising the Premium
- Premium = F / S − 1
- Annualised = premium × 360 / days

### Slide 10: Exam Traps
- Asymmetric percentage changes
- Invert before chaining when needed
- Rates in the right place, scaled by days/360
- Divide points by 10,000

## Whiteboard examples
1. **Percentage change and cross rate.**
   - USD/EUR 1.1000 to 1.1500: euro +4.55% (1.15/1.10 − 1), dollar −4.35% (1.10/1.15 − 1)
   - USD/EUR 1.1000 and JPY/USD 150.00: JPY/EUR = 150 × 1.10 = 165.00
   - CAD/USD 1.3600 and AUD/USD 1.5200: CAD/AUD = 1.36 / 1.52 = 0.8947
2. **Forward at a premium.** USD/EUR spot 1.1000, USD 5%, EUR 3%, 180 days.
   - F = 1.1000 × 1.025 / 1.015 = 1.11084
   - Points = +108.4; euro at a 0.985% premium for 180 days, 1.97% annualised
3. **Forward at a discount.** USD/GBP spot 1.2600, USD 4%, GBP 5%, 90 days.
   - F = 1.2600 × (1 + 0.04 × 0.25) / (1 + 0.05 × 0.25) = 1.2600 × 1.0100 / 1.0125 = 1.25689
   - Points = −31.1; the pound, the higher-yielding currency, trades at a forward discount

## Questions to ask students
- In a CHF/USD quote, which currency is the base? (The US dollar.)
- MXN/USD rises from 17.00 to 18.50. By how much did the peso change? (17.00/18.50 − 1 = −8.11%.)
- If the base currency has the higher interest rate, will forward points be positive or negative? (Negative; the base trades at a discount.)
- Spot 1.2500 and points +40. What is the outright forward? (1.2540.)
- Why must the higher-yielding currency trade at a forward discount? (Otherwise borrowing the low-rate currency and investing in the high-rate one with a forward hedge would be riskless profit.)

## Analogies
- A cross rate is a currency relay: pass euros to dollars, then dollars to yen, and the dollar baton disappears.
- Covered interest parity is a seesaw: whatever extra interest one currency pays is taken back by a weaker forward rate.
- Percentage asymmetry is like a 50% fall followed by a 50% rise: the base you measure from changes the answer.

## Recording tips
- Show the units cancelling explicitly in every cross-rate example; students who track units rarely make inversion errors.
- Write the CIP formula with the currency labels next to each rate so students see which rate sits where.
- Do one forward at a premium and one at a discount back to back so students connect the sign of the points to the interest differential.
