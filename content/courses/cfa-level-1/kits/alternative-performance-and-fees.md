---
title: "Alternative Investment Performance and Returns"
duration: 26
---

## Lecture outline
- 00:00 - Hook: a fund returned 20% gross; why did investors receive only about 15%?
- 02:00 - The two-part fee: management fee bases (committed capital vs AUM) and incentive fees
- 05:00 - Hard vs soft hurdles and the catch-up clause
- 08:00 - High-water marks: why investors should not pay twice for the same gain
- 11:00 - Whiteboard: three-year fee calculation with hurdle and HWM
- 17:00 - Waterfalls: European vs American, and clawbacks
- 20:00 - Return measures (IRR vs MOIC), leverage formula
- 23:00 - Biases in reported returns, exam traps and recap

## Slides
### Slide 1: Performance and Fees in Alternatives
- Gross return is not what investors get
- Fees, hurdles, high-water marks and waterfalls decide the split
- Reported returns also carry biases

### Slide 2: The Two-Part Fee
- Management fee: % of committed capital (PE) or AUM (hedge funds)
- Incentive fee / carried interest: % of profits
- Check: beginning or ending AUM? Incentive before or after management fee?

### Slide 3: Hard vs Soft Hurdle
- Hard: incentive only on return above the hurdle
- Soft: once cleared, incentive on the whole gain
- Catch-up clause makes a hurdle behave like a soft hurdle

### Slide 4: High-Water Mark
- Highest NAV on which an incentive fee was paid
- No incentive until the fund recovers above it
- Management fees still charged during recovery

### Slide 5: Incentive Fee Formula
- Fee = p x max(0, V_pre - max(HWM, hurdle level))
- V_pre = value after management fee, before incentive
- Shown for a hard hurdle

### Slide 6: Worked Example Setup
- Start USD 200m; 2% management fee on year-end AUM; 20% incentive net of management fee
- Year 1: gross to 240m, 8% hurdle
- Years 2-3: -10% then +20%, HWM only

### Slide 7: Distribution Waterfalls
- European (whole-of-fund): carry after LPs get all capital plus preferred return
- American (deal-by-deal): carry on each profitable exit
- Clawback returns overpaid carry to LPs

### Slide 8: Return Measures
- IRR: timing-sensitive, uses actual cash flow dates
- MOIC: total value / paid-in capital; ignores timing
- Read both; high IRR can hide a small multiple

### Slide 9: Leverage
- r_L = r + (Vb / Vc)(r - r_b)
- Magnifies gains when r > r_b and losses when r < r_b
- Example: 8% asset, 5% debt, 1:1 leverage -> 11%

### Slide 10: Why Reported Returns Flatter
- Appraisal smoothing understates volatility and correlation
- Survivorship bias: dead funds disappear
- Backfill bias: good histories added after the fact
- Illiquidity costs are invisible in return series

### Slide 11: Recap
- Compute fees step by step: management fee, then hurdle/HWM, then incentive
- Know which structures favour LPs vs GPs
- Adjust mentally for biases when comparing to public markets

## Whiteboard examples
**Example 1: Three-year fee path.** Start USD 200m. 2% management fee on year-end AUM, 20% incentive net of management fee.
- Year 1 (8% hard hurdle): gross 240m. Management fee 4.80m, leaving 235.20m. Hurdle level 216m. Incentive 0.20 x 19.20 = 3.84m. NAV 231.36m (net 15.68%). Under a soft hurdle the incentive would be 0.20 x 35.20 = 7.04m (net 14.08%).
- Year 2 (-10% gross, HWM 231.36m): gross 208.22m, management fee 4.16m, NAV 204.06m (-11.80%). No incentive.
- Year 3 (+20% gross): gross 244.87m, management fee 4.90m, pre-incentive 239.97m. Incentive 0.20 x (239.97 - 231.36) = 1.72m. NAV 238.25m (+16.76%).
- Without the HWM: incentive 0.20 x (239.97 - 204.06) = 7.18m. HWM saves investors about 5.46m.

**Example 2: Leverage.** Own capital 40, borrowed 60, asset return 6%, borrowing rate 4%. r_L = 0.06 + (60/40)(0.02) = 9%. If the asset returns 2% instead: r_L = 0.02 + 1.5 x (-0.02) = -1%.

## Questions to ask students
- Under a soft hurdle that is cleared, what is the incentive fee base? (The entire gain, not just the excess over the hurdle.)
- Does a fund below its high-water mark charge a management fee? (Yes; only the incentive fee is suspended.)
- Which waterfall do LPs prefer and why? (European, because carry is paid only after all capital and the preferred return are returned.)
- What does MOIC ignore that IRR captures? (The timing of cash flows.)
- Name two biases that inflate hedge fund database returns. (Survivorship and backfill.)

## Analogies
- A high-water mark is like a video game save point: the manager gets a reward only for reaching new territory, not for replaying a level already cleared.
- Hard hurdle = a tax-free allowance (only income above it is taxed); soft hurdle = an eligibility threshold (once you qualify, everything counts).
- Appraisal smoothing is like a weather report that averages the past month: it never looks as stormy as the actual day.

## Recording tips
- Build the three-year table one row at a time on screen; do not reveal the whole table at once.
- Emphasise the order of operations: management fee first, then compare with hurdle/HWM, then incentive.
- Show the HWM saving (about 5.46m) as the punchline; it makes the concept memorable.
