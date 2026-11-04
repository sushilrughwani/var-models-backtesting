---
title: "From Enterprise Value to Equity Value per Share"
duration: 20
---

## Lecture outline
- 00:00 - Hook: same EV, two analysts, share prices 3 dollars apart; the bridge is where it happens
- 02:00 - EV versus equity value: the house, the mortgage and the car in the garage
- 05:00 - Bridge items: debt, leases, cash, NCI, associates, pensions
- 09:00 - Live Excel: Northwind equity value
- 11:00 - Diluted shares: RSUs and the treasury stock method
- 14:00 - The circularity and the closed-form price
- 17:00 - Exam traps and recap

## Slides
### Slide 1: Two Different Values
- EV: value of operations to all capital providers
- Equity value: what shareholders own
- The bridge converts one to the other

### Slide 2: The Bridge
- EV − debt + cash − NCI − debt-like items + non-operating assets
- Balance sheet at the valuation date
- Consistency with FCFF is the rule

### Slide 3: Debt-Like Items
- Borrowings and lease liabilities (if lease costs excluded from EBITDA)
- Unfunded pensions, cash provisions, preferred shares
- Non-controlling interest

### Slide 4: Non-Operating Assets
- Excess cash
- Equity-method associates
- Investments whose income is outside EBIT

### Slide 5: Northwind Bridge (USD m)
- EV 1,989.11 − debt 420 + cash 95
- − NCI 18 + associate 30
- Equity value 1,676.11

### Slide 6: Treasury Stock Method
- RSUs count in full
- Options: $n(1-K/P)$ new shares if in the money
- Out-of-the-money options add nothing

### Slide 7: The Circularity
- Price depends on dilution; dilution depends on price
- Closed form: $P = (V + nK)/(S + R + n)$
- `=(C30+C33*C34)/(C31+C32+C33)`

### Slide 8: Northwind Price
- (1,676.11 + 80) / 54.6 = 32.16
- Diluted shares 52.11 million
- Upside to 27.50: 16.96%

### Slide 9: Traps
- Basic shares (33.52) or options without proceeds (30.70)
- NCI sign errors
- Double counting cash or leases

## Whiteboard examples
**Example 1 - Northwind bridge.**
- 1,989.11 − 420 + 95 − 18 + 30 = 1,676.11

**Example 2 - Price three ways.**
- Closed form: (1,676.11 + 4.0 × 20) / (50 + 0.6 + 4.0) = 1,756.11 / 54.6 = 32.16
- Iteration: start 1,676.11 / 50 = 33.52; shares = 54.6 − 80 / 33.52 = 52.21, price 32.10; shares 52.11, price 32.17; converges to 32.16
- TSM check: 4.0 × (1 − 20/32.16) = 1.51; diluted 52.11; 1,676.11 / 52.11 = 32.16

**Example 3 - Market-price dilution for a comps sheet.**
- At USD 27.50: new option shares = 4.0 × (1 − 20/27.50) = 1.09; diluted shares = 50 + 0.6 + 1.09 = 51.69 million
- Market cap = 27.50 × 51.69 = 1,421.5 million; this is the version used in trading comps next lesson

## Questions to ask students
- Why do we add cash but not the interest it earns? (Interest income is excluded from FCFF; the cash is valued directly in the bridge.)
- Northwind owns 80% of a subsidiary and consolidates it. Why subtract NCI? (EV includes 100% of its cash flows, but 20% belongs to outsiders.)
- An option has a strike of USD 40 and the implied price is 32.16. How many new shares? (Zero, it is out of the money.)
- Why is the associate added rather than included in EV? (Its profit is below EBIT, so FCFF never captured it.)
- If lease costs were deducted in EBITDA, should lease liabilities be in the bridge? (No, that would double count.)

## Analogies
- House, mortgage and the car in the garage: EV is the house; subtract the mortgage, add the drawer cash and the separately owned car.
- NCI as a flatmate's share: you value the whole flat's rent, then remember one room belongs to someone else.
- The treasury stock method as a pizza with late guests who bring cash: more slices are cut, but their cash buys back some slices.

## Recording tips
- Build the bridge as a waterfall on screen, with each item's sign in a separate column.
- Derive the closed-form price on the whiteboard; students love seeing the circularity vanish.
- Contrast the 33.52, 32.16 and 30.70 answers side by side so the dilution traps stick.
