---
title: "VaR Mapping"
duration: 24
---

## Lecture outline
- 00:00 - Hook: 200,000 positions, one covariance matrix. How big would it be if every position were its own factor?
- 02:00 - Why map: risk factors, vertices, mapping error
- 05:00 - Principal, duration and cash-flow mapping compared
- 09:00 - Undiversified versus diversified VaR formulas
- 11:00 - Whiteboard: 3-year coupon bond mapped onto three vertices
- 16:00 - Forwards, FRAs and swaps as building blocks
- 19:00 - Equity beta mapping and option delta mapping
- 22:00 - Traps and recap

## Slides
### Slide 1: VaR Mapping
- Replace instruments with exposures to risk factors
- Fewer factors, tractable covariance matrix
- Cost: mapping error

### Slide 2: Risk Factors and Vertices
- Zero rates at standard maturities
- Equity indices, exchange rates, commodity prices
- Volatilities and correlations estimated per factor

### Slide 3: Three Bond Mapping Methods
- Principal: all value at average principal maturity
- Duration: all value at the duration vertex
- Cash flow: each PV at its own vertex

### Slide 4: Ranking the Methods
- Principal ignores coupons and tends to overstate risk
- Duration assumes parallel shifts
- Cash-flow mapping is the most accurate

### Slide 5: VaR of Mapped Positions
- Individual VaR = x_i × V_i
- Undiversified = sum of individual VaRs
- Diversified = √(Σ Σ x_iV_i x_jV_j ρ_ij)

### Slide 6: Currency Forwards
- Long foreign zero-coupon bond
- Short domestic zero-coupon bond
- Long spot exchange rate exposure

### Slide 7: FRAs and Swaps
- Pay-fixed 6x12 FRA: long 6-month zero, short 12-month zero
- Pay-fixed swap: long floater, short fixed-coupon bond
- Floater maps to the next reset date

### Slide 8: Equities and Options
- Beta mapping: VaR = zσ_m Σβ_i x_i
- Ignores specific risk
- Options: delta-equivalent position, plus gamma if needed

### Slide 9: Exam Traps
- Map present values, not face values
- Do not apply z twice to VaR percentages
- Watch the direction of FRAs and swaps

### Slide 10: Recap
- Mapping makes enterprise VaR computable
- Choice of method trades accuracy for simplicity
- Next: modelling the extreme tail directly with EVT

## Whiteboard examples
**Example 1: Cash-flow mapping a coupon bond.** 3-year 8% annual coupon, face USD 100m; zero rates 4%, 4.5%, 5%; vertex VaRs 0.3%, 0.6%, 0.9%; ρ(1,2) = 0.95, ρ(1,3) = 0.90, ρ(2,3) = 0.97.
- PVs: 7.6923, 7.3258, 93.2945 (total 108.3126).
- Individual VaRs: 0.02308, 0.04396, 0.83965.
- Undiversified: 0.90668 = USD 906,682. Diversified: 0.90326 = USD 903,261. Benefit about USD 3,421.
- Principal mapping: 108.3126 × 0.009 = USD 974,813.

**Example 2: Two-vertex portfolio.** USD 30m mapped to the 2-year vertex (VaR 0.6%) and USD 50m to the 5-year vertex (VaR 1.1%), correlation 0.8.
- Individual VaRs 0.18 and 0.55. Undiversified = 0.73m.
- Diversified = √(0.18² + 0.55² + 2 × 0.8 × 0.18 × 0.55) = √0.4933 = USD 0.70m.

**Example 3: Beta mapping.** USD 4m in a stock with β = 1.2 and USD 6m in a stock with β = 0.8; index volatility 5%; z = 1.645.
- Beta-weighted exposure = 4.8 + 4.8 = 9.6m. VaR = 1.645 × 0.05 × 9.6m = USD 789,600 (systematic only).

## Questions to ask students
- Which mapping method would you choose for a regulator who wants accuracy? (Cash-flow mapping.)
- Why is the diversification benefit inside one bond small? (Adjacent vertices are highly correlated.)
- A long EUR forward for a USD investor maps to which three factors? (EUR zero rate, USD zero rate, EUR/USD spot.)
- What risk does beta mapping leave out? (Specific, idiosyncratic risk.)
- How is a long call option mapped? (As delta times the underlying position.)

## Analogies
- Mapping is like a city map at one scale: you see the main roads (factors) but not every alleyway (specific risk).
- Cash-flow mapping is sorting groceries into fridge, freezer and pantry; principal mapping throws everything in the freezer.
- A swap is two bonds holding hands in opposite directions.

## Recording tips
- Display the correlation matrix on screen while computing diversified VaR so students see where each cross term comes from.
- Spend extra time on derivative decompositions; draw cash-flow arrows above and below a timeline.
- Repeat that vertex VaRs already include z, the most common arithmetic slip.
