---
title: "Interest Rates"
duration: 28
---

## Lecture outline
- 00:00 - Hook: is 10% annual or 9.53% continuous the better deal? (They are the same.)
- 02:00 - Reference rates: Treasury, repo, SOFR and the end of LIBOR
- 06:00 - Compounding frequencies and conversion to continuous compounding
- 10:00 - Zero rates and pricing a coupon bond as a bundle of zeros
- 14:00 - Bond yield and par yield
- 17:00 - Forward rates from zero rates
- 20:00 - FRAs: payoff and valuation
- 24:00 - Term structure theories
- 26:00 - Recap and traps

## Slides
### Slide 1: Choosing a Risk-Free Rate
- Treasury rates: low because of tax and regulatory demand
- LIBOR: unsecured, credit premium, submission-based; now replaced
- SOFR and other overnight rates; repo is secured borrowing
### Slide 2: Compounding Matters
- USD 100 at 10%: 110 annually, 110.25 semiannually
- $R_c = m \ln(1 + R_m/m)$
- $R_m = m(e^{R_c/m} - 1)$
### Slide 3: Zero Rates
- Rate on a single payment at T
- Discount factor $e^{-RT}$
- Obtained by bootstrapping traded bonds
### Slide 4: Bond Pricing
- Bond = portfolio of zero-coupon bonds
- $B = \sum c_i e^{-R_i t_i}$
- Example: 2-year 6% bond = 101.7984
### Slide 5: Yield and Par Yield
- Yield: one rate that reproduces the price (4.981% continuous)
- Par yield: coupon that makes price = 100
- $c = (100 - 100d)m/A$: 5.046% in the example
### Slide 6: Forward Rates
- $R_F = (R_2T_2 - R_1T_1)/(T_2 - T_1)$
- Upward curve: forwards above zeros
- Example 1.0-1.5 years: 5.40% continuous, 5.4736% semiannual
### Slide 7: FRA Payoff
- Fixes $R_K$ on notional L for $T_1$ to $T_2$
- Fixed receiver gets $L(R_K - R_M)(T_2 - T_1)$ at $T_2$
- Rates quoted with compounding matching the period
### Slide 8: FRA Valuation
- Assume forward rate is realised
- $V = L(R_K - R_F)(T_2 - T_1)e^{-R_2T_2}$
- Example: receive 6% on 10m: USD 24,493
### Slide 9: Term Structure Theories
- Expectations: forwards = expected spot rates
- Segmentation: separate markets by maturity
- Liquidity preference: term premium, curves usually slope up
### Slide 10: Takeaways
- Convert before you compare
- Discount each flow at its own zero rate
- Forwards and FRAs come straight from the zero curve

## Whiteboard examples
**1. Conversions.**
- 6% semiannual → continuous: 2 ln(1.03) = 5.9118%.
- 5% continuous → quarterly: 4(e^0.0125 - 1) = 5.0314%.
- 8% quarterly → continuous: 4 ln(1.02) = 7.9211%.

**2. Bond, yield, par yield.** Zeros (continuous): 0.5y 4.0%, 1y 4.5%, 1.5y 4.8%, 2y 5.0%. Bond: 2-year, 6% semiannual.
- PVs: 2.9406 + 2.8680 + 2.7916 + 93.1983 = 101.7984.
- Yield: 4.981% continuous (5.043% semiannual).
- Discount factors: 0.980199, 0.955997, 0.930531, 0.904837; A = 3.771564.
- Par yield = (100 - 90.4837) × 2 / 3.771564 = 5.046%.

**3. Forward and FRA.**
- R_F(1.0, 1.5) = (0.072 - 0.045)/0.5 = 5.40% continuous → 5.4736% semiannual.
- Receive 6% semiannual on USD 10m: 10m × (0.06 - 0.054736) × 0.5 × e^(-0.072) = USD 24,493.

## Questions to ask students
- Which is higher: a rate with annual or with continuous compounding that gives the same growth? (The annual rate.)
- If the zero curve is flat at 5%, what are forward rates? (Also 5%.)
- Why must the FRA rate be expressed with the period's compounding frequency? (Because the payoff is calculated as a simple rate times the period length.)
- What is the value of an FRA when R_K equals the current forward rate? (Zero.)
- Why did LIBOR lose favour? (Based on submissions rather than transactions, vulnerable to manipulation, thin underlying market.)

## Analogies
- Compounding frequency is like currency: 10% annual and 9.53% continuous are the same amount in different units.
- A coupon bond is a fruit basket: price each fruit (cash flow) at its own market price (zero rate) and add them up.
- A forward rate is the toll for the next stretch of road implied by the total fares to two destinations.

## Recording tips
- Do conversions on a calculator on screen; students need to see ln and e^x keystrokes.
- Draw the zero curve and shade the area between T1 and T2 to show the forward rate visually.
- Emphasise discounting the FRA from T2 and converting the forward rate to the FRA's compounding basis.
