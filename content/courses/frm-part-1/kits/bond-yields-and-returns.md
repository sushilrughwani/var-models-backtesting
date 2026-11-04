---
title: "Returns, Spreads and Yields"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a portfolio manager says her bond fund "yields 5%" but returned 1% last year. Is she lying?
- 02:30 - Realized gross and net return; reinvestment and financing.
- 05:30 - Spreads as a constant added to the benchmark curve.
- 08:30 - Yield to maturity, its assumptions, reinvestment risk and the coupon effect.
- 11:30 - Whiteboard 1: price and YTM of the 3-year 6% bond on a 3/4/5% curve.
- 14:00 - Carry roll-down scenarios: realized forwards, unchanged term structure, unchanged yields.
- 17:00 - Whiteboard 2: one-year returns of 3.00%, 4.92% and 6.69%.
- 21:00 - P&L decomposition: carry roll-down, rates, spreads; Whiteboard 3 quick return.
- 23:00 - Recap and traps.

## Slides
### Slide 1: Returns, Spreads and Yields
- Yields are promises, returns are outcomes
- Spreads measure extra compensation versus a benchmark
- Carry roll-down depends on your assumed path

### Slide 2: Realized Gross Return
- R = (P1 + C − P0) / P0
- Full (dirty) prices
- Multi-period: multiply gross returns, reinvest coupons

### Slide 3: Net Return
- Subtract financing (repo) costs and fees
- Leverage magnifies both return and funding drag
- Net = bond return minus cost of borrowed money

### Slide 4: Spread to the Curve
- Constant s added to every benchmark spot rate
- Chosen so discounted cash flows equal market price
- Captures credit and liquidity premia

### Slide 5: Yield to Maturity
- Single rate that equates PV to price
- Realized only if held to maturity, no default, reinvest at YTM
- Reinvestment risk when rates fall

### Slide 6: The Coupon Effect
- Same maturity, different coupons, different yields
- Each YTM weights the spot rates differently
- YTM is a summary, not a discount rate for pricing

### Slide 7: Carry Roll-Down Scenarios
- Realized forwards: return = one-period spot rate
- Unchanged term structure: roll-down gains on rising curve
- Unchanged yields: return = YTM

### Slide 8: Why Roll-Down Is Not Free
- Forward rates already price in rising rates
- If forwards come true, no bond beats the short rate
- Roll-down is a bet that the curve does not move up as forwards predict

### Slide 9: P&L Decomposition
- Carry roll-down (expected path)
- Rate changes (curve moves versus path)
- Spread changes (credit and liquidity)

### Slide 10: Recap
- Always state the scenario behind any expected return
- Spread to the curve beats yield differences
- Realized return needs coupons, prices and financing

## Whiteboard examples
**Example 1 - price and YTM.** 3-year, 6% annual coupon, spot rates 3%, 4%, 5%.
- 6/1.03 = 5.8252; 6/1.04² = 5.5473; 106/1.05³ = 91.5668
- P0 = **102.9394**
- YTM by trial: y = **4.9222%** (closer to 5% because the last cash flow dominates)

**Example 2 - three scenarios, one year later.**
- Forwards: f(1,2) = 1.04²/1.03 − 1 = 5.0097%; f(2,3) = 1.05³/1.04² − 1 = 7.0289%
- Realized forwards: P1 = 6/1.050097 + 106/(1.050097 × 1.070289) = 100.0275; R = (100.0275 + 6 − 102.9394)/102.9394 = **3.00%**
- Unchanged term structure: P1 = 6/1.03 + 106/1.04² = 103.8282; R = **6.69%**
- Unchanged yield at 4.9222%: R = **4.92%**
- Roll-down difference: 103.8282 − 100.0275 = 3.80

**Example 3 - quick realized return.** Buy at 98.00, receive a 5.00 coupon, sell at 99.00.
- R = (99 + 5 − 98)/98 = **6.12%**

## Questions to ask students
- If forward rates are realized, what return does a 30-year bond earn over the next year? (The current one-year spot rate.)
- Why might a bond's realized return be below its purchase YTM even with no default? (Rates rose, lowering the exit price, or coupons were reinvested at lower rates.)
- What is the difference between the spread to the curve and a yield spread? (The first adds a constant to each spot rate; the second subtracts one benchmark yield from the bond's yield.)
- In an upward-sloping curve, which scenario gives the highest one-year expected return? (Unchanged term structure.)
- A bond returned 4% and was funded at 3% repo on 90% of its value. Roughly what is the net return on equity? (Roughly (4% − 0.9 × 3%)/0.1 = 13%.)

## Analogies
- YTM is the speed limit sign; realized return is your actual average speed after traffic.
- Roll-down is like a ball on a slope: on a rising curve, bonds slide toward lower yields and higher prices as they age, but only if the slope stays where it is.
- The spread is a "risk surcharge" added to every leg of a journey, not just the last one.

## Recording tips
- Show all three scenarios side by side in a table; the contrast is the key insight.
- Students often think realized-forward returns should vary by bond; pause and stress that all bonds earn the short rate.
- Have a spreadsheet ready to solve the YTM live so students see it is iterative.
