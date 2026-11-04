---
title: "Pricing and Valuation of Forward Contracts"
duration: 28
---

## Lecture outline
- 00:00 - Hook: you agreed in January to buy a used car in December for 10,000. In June, similar cars sell for 12,000. Is your agreement worth anything?
- 03:00 - Price versus value: definitions and why $V_0 = 0$.
- 07:00 - Value during the life: formula, intuition, long versus short.
- 12:00 - Whiteboard: the 50/54 share example, both valuation routes.
- 17:00 - Adding income and costs to the mid-life value.
- 20:00 - Currency forwards and covered interest rate parity.
- 24:00 - Implied forward rates and FRAs.
- 26:00 - Traps and recap.

## Slides
### Slide 1: Price vs Value
- Forward price $F_0$: fixed delivery price in the contract
- Forward value $V_t$: what the contract is worth today
- At initiation $V_0 = 0$
### Slide 2: Setting the Forward Price
- No-arbitrage: $F_0 = [S_0 - PV(I) + PV(C)](1+r)^T$
- Chosen so neither side pays to enter
### Slide 3: Value During the Life
- $V_t(\text{long}) = S_t - PV_t(I) + PV_t(C) - F_0/(1+r)^{T-t}$
- Short value = −long value
- Alternative: $(F_t - F_0)/(1+r)^{T-t}$
### Slide 4: Value at Expiration
- Discount factor = 1, no carry left
- $V_T = S_T - F_0$ = payoff
### Slide 5: Worked Example
- $S_0 = 50$, $r = 5\%$, $T = 1$: $F_0 = 52.50$
- At 4 months, $S_t = 54$: PV of $F_0$ = 50.82
- Long value 3.18, short value −3.18
### Slide 6: Currency Forwards
- $F_0 = S_0 (1+r_{price})^T / (1+r_{base})^T$
- Higher-rate currency at forward discount
- Covered interest rate parity
### Slide 7: Currency Example
- Spot 1.1000 USD/EUR, USD 4.5%, EUR 3%
- One-year forward = 1.1160 USD/EUR
- EUR (lower rate) at a forward premium
### Slide 8: Implied Forward Rates and FRAs
- $(1+z_2)^2 = (1+z_1)(1+IFR_{1,1})$
- 3% and 3.5% spot rates give a 4.00% forward rate
- FRA fixed rate = implied forward rate
### Slide 9: Exam Traps
- Price is fixed; value moves
- Discount $F_0$ over remaining time $T - t$
- Only remaining income counts
### Slide 10: Key Takeaways
- $V_0 = 0$ by construction
- Mid-life value = spot minus PV of delivery price
- Same carry logic prices FX and rate forwards

## Whiteboard examples
1. **Share forward mid-life.** $S_0 = 50$, $r = 5\%$, $T = 1$, so $F_0 = 52.50$. At $t = 4/12$, $S_t = 54$. Remaining $T - t = 0.6667$. $1.05^{0.6667} = 1.03306$. PV of $F_0$ = 50.8198. Long value = 3.1802; short value = −3.1802. Check: $F_t = 54 \times 1.03306 = 55.785$, $(55.785 - 52.50)/1.03306 = 3.18$.
2. **Short position losing.** $S_0 = 120$, $r = 4\%$, $T = 1$: $F_0 = 124.80$. After six months $S_t = 115$. PV of $F_0 = 124.80/1.04^{0.5} = 122.376$. Long value = $115 - 122.376 = -7.376$; short value = +7.38.
3. **Currency forward.** Spot 1.1000 USD/EUR, $r_{USD} = 4.5\%$, $r_{EUR} = 3\%$, $T = 1$: $F_0 = 1.1000 \times 1.045/1.03 = 1.1160$.

## Questions to ask students
- What is a forward contract worth on the day it is signed? (Zero.)
- Spot rises after initiation. Who gains, long or short? (Long.)
- Why do we discount $F_0$ but not $S_t$? ($S_t$ is already a today value; $F_0$ is paid at $T$.)
- If USD rates exceed EUR rates, does the USD/EUR forward exceed spot? (Yes, EUR trades at a forward premium.)
- One-year rate 3%, two-year rate 3.5%: one-year rate in one year? (About 4.00%.)

## Analogies
- The forward price is the price tag stapled to a pre-order; the value is what someone would pay you today to take over your pre-order.
- Valuing a forward mid-life is like valuing a coupon "buy for 52.50 later": worth the item today minus the present cost of the voucher price.
- Covered interest parity is a seesaw: the currency that pays more interest today must cost less in the forward market.

## Recording tips
- Write "PRICE = fixed, VALUE = moves" in large letters and keep it visible throughout.
- Show both valuation routes for the worked example; students gain confidence when two methods agree.
- Pause on remaining time $T - t$; this is where most arithmetic errors occur.
