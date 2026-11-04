---
title: "Estimating WACC in Practice"
duration: 22
---

## Lecture outline
- 00:00 - Hook: move WACC by one percentage point and Northwind's value swings by hundreds of millions
- 02:00 - Why WACC pairs with FCFF; the formula and the weights
- 05:00 - CAPM inputs: risk-free rate and equity risk premium
- 08:00 - Beta: why peers, unlevering and relevering
- 12:00 - Live Excel: Northwind peer beta table and relevering
- 16:00 - Cost of debt: yield versus coupon, after tax
- 18:00 - Assemble WACC, sanity check against market weights
- 20:00 - Exam traps and recap

## Slides
### Slide 1: The Price of Capital
- Lenders and shareholders both want a return
- WACC blends them by their share of funding
- It is the discount rate for FCFF

### Slide 2: The Formula
- $\text{WACC} = \frac{E}{D+E}k_e + \frac{D}{D+E}k_d(1-t)$
- Target weights at market values
- Only debt gets the tax adjustment

### Slide 3: CAPM
- $k_e = r_f + \beta_L \times \text{ERP}$
- Risk-free: long government bond, same currency
- ERP: a house view, applied consistently

### Slide 4: Peer Betas
- Own regression beta is noisy
- Peer betas embed peer leverage
- Unlever, take the median, relever

### Slide 5: Unlever and Relever
- $\beta_U = \beta_L / [1+(1-t)D/E]$
- $\beta_L = \beta_U[1+(1-t)D/E]$
- D/E, not D/(D+E)

### Slide 6: Northwind Peers
- Ashby 1.035 at D/E 0.20 gives 0.900
- Calder 1.209 at 0.40 gives 0.930; Fenwick 0.903 at 0.10 gives 0.840
- Median unlevered beta 0.90

### Slide 7: Relevered Beta and Cost of Equity
- Target D/E = 25/75 = 0.3333
- Beta = 0.90 × 1.25 = 1.125
- $k_e$ = 4.2% + 1.125 × 5.6% = 10.5%

### Slide 8: Cost of Debt
- Today's yield: 4.2% + 1.8% spread = 6.0%
- After tax: 6.0% × 0.75 = 4.5%
- Never the historical coupon

### Slide 9: Northwind WACC
- 0.75 × 10.5% + 0.25 × 4.5%
- = 7.875% + 1.125% = 9.00%
- Market debt weight today 23.4%, close to target

### Slide 10: Excel Formulas
- `=B5/(1+(1-$C$2)*C5)` and `=MEDIAN(D5:D7)`
- `=D8*(1+(1-$C$2)*C9)` then `=C3+D10*C4`
- Every input in its own labelled cell

### Slide 11: Traps
- D/(D+E) used as D/E
- Book weights, coupon rates, missing tax shield
- Currency mismatch

## Whiteboard examples
**Example 1 - Full Northwind WACC.**
- Unlevered betas: 1.035/1.15 = 0.900; 1.209/1.30 = 0.930; 0.903/1.075 = 0.840; median 0.90.
- Relevered: 0.90 × (1 + 0.75 × 0.3333) = 1.125.
- $k_e$ = 4.2% + 1.125 × 5.6% = 10.5%; after-tax $k_d$ = 4.5%.
- WACC = 0.75 × 10.5% + 0.25 × 4.5% = 9.00%.

**Example 2 - The D/(D+E) mistake.**
- Relever with 0.25 instead of 0.3333: 0.90 × (1 + 0.75 × 0.25) = 1.069.
- $k_e$ = 4.2% + 1.069 × 5.6% = 10.19%, about 0.31 points too low; WACC would fall to about 8.76%.

**Example 3 - What if beta were 1.0?**
- $k_e$ = 4.2% + 5.6% = 9.8%; WACC = 0.75 × 9.8% + 1.125% = 8.475%, about 8.5%.
- Use this to preview the sensitivity table later in the course.

## Questions to ask students
- Why not use Northwind's own five-year regression beta? (It is statistically noisy and reflects past leverage; peers give a more robust estimate.)
- A peer has no debt. What is its unlevered beta? (Equal to its levered beta.)
- Northwind's old bond has a 4% coupon but trades to yield 6%. Which do you use? (6%, the current yield.)
- If Northwind's target leverage rises, what happens to its levered beta? (It rises, because equity holders bear more financial risk.)
- Why is the tax adjustment only on debt? (Interest is deductible; dividends are not.)

## Analogies
- Beta as a car's engine plus its trailer: unlevering removes each peer's trailer (debt) so you compare engines, then you hitch on Northwind's own trailer.
- WACC as a blended mortgage rate: two loans at different rates average to one rate weighted by their size.
- The ERP as a house blend of coffee: firms choose different blends, but you must not switch blends halfway through the model.

## Recording tips
- Spend the most time on the unlever-relever round trip; draw the leverage "trailer" on screen.
- Show the market-weight sanity check in Excel so students see target weights are anchored in reality.
- Keep the final 9.00% on screen as you close; the next three lessons reuse it.
