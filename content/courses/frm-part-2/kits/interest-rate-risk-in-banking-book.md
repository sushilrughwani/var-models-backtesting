---
title: "Interest Rate Risk in the Banking Book"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a bank stuffed with safe government bonds lost its depositors in days when rates rose - why?
- 02:00 - Why the banking book needs its own framework
- 04:00 - Four sources: repricing, yield curve, basis, option risk
- 08:00 - Repricing gaps and the NII formula
- 11:00 - Whiteboard: bucketed NII example
- 14:00 - EVE and the duration gap
- 17:00 - Whiteboard: EVE example and outlier test
- 20:00 - NII versus EVE, six shocks, non-maturity deposits, traps

## Slides
### Slide 1: Hidden losses
- Banking book mostly at amortised cost
- Rate moves hit NII slowly and value silently
- Unrealised losses plus deposit flight can be fatal
### Slide 2: Four sources of IRRBB
- Repricing (gap) risk
- Yield curve risk
- Basis risk and option risk (behavioural and automatic)
### Slide 3: Repricing gap
- Gap = RSA - RSL per bucket
- Negative gap: liability-sensitive
- Rates up hurts a negative gap
### Slide 4: NII formula
- Delta NII = sum of Gap x Delta r x (1 - t)
- t = bucket midpoint in years
- Cumulative gap version is cruder
### Slide 5: NII example
- Buckets: -300, +100, -100
- -2.625 + 0.625 - 0.25 = -2.25
- Cumulative gap method: -3.0
### Slide 6: Economic value of equity
- EVE = PV assets - PV liabilities
- Delta EVE = -(D_A A - D_L L) Delta y
- Duration gap = D_A - (L/A) D_L
### Slide 7: EVE example
- 2.0 x 1,000 - 1.6 x 920 = 528
- x 2% = -10.56
- 13.2% of Tier 1, below 15%
### Slide 8: NII versus EVE
- NII: next 1-3 years of earnings
- EVE: value of all future cash flows
- Hedging one can worsen the other
### Slide 9: Supervisory framework
- Six shocks: parallel up/down, steepener, flattener, short up/down
- Outlier: EVE loss above 15% of Tier 1
- Core versus non-core non-maturity deposits
### Slide 10: Exam traps
- Watch the sign of the gap
- Weight liabilities by L/A in the duration gap
- Stable NII does not mean low risk

## Whiteboard examples
**Example 1 - Bucketed NII.** Gaps -300 (midpoint 1.5m), +100 (4.5m), -100 (9m); +100 bp. Contributions: -300 x 0.01 x 10.5/12 = -2.625; +100 x 0.01 x 7.5/12 = +0.625; -100 x 0.01 x 3/12 = -0.25. Total -2.25.

**Example 2 - EVE.** A = 1,000, D_A = 2.0; L = 920, D_L = 1.6; +200 bp. Delta EVE = -(2,000 - 1,472) x 0.02 = -10.56; Tier 1 80: 13.2%.

**Example 3 - Simple gap.** RSA 600, RSL 750 within one year; +150 bp: Delta NII = -150 x 0.015 = -2.25. Then rates fall 150 bp: +2.25.

## Questions to ask students
- A bank funds prime-linked loans with SOFR-linked deposits, both resetting monthly. Which IRRBB source remains? (Basis risk)
- A bank has a positive one-year gap. Do falling rates help or hurt NII? (Hurt)
- Why does the duration gap weight liability duration by L/A? (Liabilities are smaller than assets; the equity cushion has no duration of its own)
- What is the EVE outlier threshold? (Decline in EVE greater than 15% of Tier 1 capital)
- Why might mortgage prepayments reduce a bank's gain when rates fall? (Borrowers refinance, so high-yield assets are replaced at lower rates - negative convexity)

## Analogies
- Repricing gap as two escalators moving at different speeds: assets and liabilities catch up with new rates at different times.
- NII versus EVE as monthly salary versus net worth: a pay freeze (stable NII) can coexist with your house losing value (EVE).
- Non-maturity deposits as a lake: water flows in and out daily, but a core level stays for years.

## Recording tips
- Build the gap table on screen and fill in contributions one bucket at a time.
- Show the sign convention with a quick plus/minus grid: gap sign versus rate direction.
- Mention that supervisory shock sizes vary by currency, so exam questions will give them.
