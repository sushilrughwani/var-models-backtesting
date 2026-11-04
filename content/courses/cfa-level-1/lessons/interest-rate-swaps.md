---
title: "Pricing and Valuation of Interest Rate Swaps"
---

## Learning goals
- Describe a plain-vanilla interest rate swap and explain why it is equivalent to a portfolio of forward contracts.
- Calculate the par swap rate from spot rates or discount factors.
- Calculate the value of an existing swap to the fixed-rate payer and receiver after rates change.
- Explain why a swap has zero value at initiation and how its value changes with interest rates.

## Explanation

### What a plain-vanilla swap is
In a fixed-for-floating interest rate swap, two parties exchange interest payments on the same **notional principal**, which itself never changes hands. The **fixed-rate payer** pays a fixed swap rate and receives a floating reference rate (for example, an overnight-rate-based benchmark). The **fixed-rate receiver** does the opposite. On each settlement date only the **net** difference is paid.

A company with floating-rate debt that fears rising rates can enter a pay-fixed swap to convert its debt to fixed. A bank with fixed-rate mortgages funded by floating deposits might do the same.

### A swap is a portfolio of forwards
On each settlement date, the fixed payer effectively has a forward commitment: pay the fixed rate, receive whatever floating rate is set for that period. Each exchange looks like a forward rate agreement (from the forward lesson) with the same fixed rate. A swap therefore bundles a series of FRAs. One difference: the separate FRAs would each have their own fair rate (the implied forward rates), but the swap uses a **single** fixed rate for every period. Some exchanges therefore have positive value and some negative at initiation, while the total is zero.

### The par swap rate
At initiation the fixed rate is chosen so that the swap's value is zero. A convenient way to see it: a pay-fixed swap is like issuing a fixed-rate bond and buying a floating-rate bond with the same notional. A floating-rate bond resets to market rates and trades at par on reset dates. So the swap is worth zero when the fixed-rate bond also prices at par. That fixed rate is the **par swap rate**:

$$
s_N = \frac{1 - DF_N}{\sum_{i=1}^{N} DF_i}, \qquad DF_i = \frac{1}{(1 + z_i)^i}
$$

where $DF_i$ is the discount factor for period $i$, $z_i$ is the spot (zero-coupon) rate for period $i$, and $N$ is the number of periods (annual settlement here).

### Valuing a swap after initiation
Once rates move, the swap's fixed rate $s_0$ is no longer the market's par rate. The value to the fixed-rate payer is the present value of the difference between the new par rate for the remaining term and the old fixed rate:

$$
V_{\text{pay-fixed}} = (s_{\text{new}} - s_0) \times \sum_{i=1}^{n} DF_i \times \text{Notional}
$$

where $s_{\text{new}}$ is the current par swap rate for the remaining $n$ periods and the $DF_i$ are current discount factors. The receiver's value is the negative. Intuition: if rates rise, the fixed payer is locked in at a below-market rate, so the swap has positive value to the payer. Equivalently, value = par minus the PV of a fixed-rate bond paying $s_0$, on a per-notional basis.

## Worked example
Spot rates are 3.0%, 3.5% and 4.0% for one, two and three years. (a) Find the par rate for a three-year annual-pay swap. (b) One year later, the one- and two-year spot rates are 4.0% and 4.5%. Find the value to the fixed-rate payer on a notional of USD 10 million.

**Step 1: Discount factors.** $DF_1 = 1/1.03 = 0.970874$, $DF_2 = 1/1.035^2 = 0.933511$, $DF_3 = 1/1.04^3 = 0.888996$. Sum $= 2.793381$.

**Step 2: Par swap rate.** $s_3 = (1 - 0.888996)/2.793381 = 0.111004/2.793381 = 3.9738\%$.

**Step 3: New discount factors one year later.** $DF_1 = 1/1.04 = 0.961538$, $DF_2 = 1/1.045^2 = 0.915730$. Sum $= 1.877268$.

**Step 4: New two-year par rate.** $(1 - 0.915730)/1.877268 = 4.4890\%$.

**Step 5: Value to the fixed payer.** $(0.044890 - 0.039738) \times 1.877268 \times 10{,}000{,}000 = 96{,}710$.

**Bond check.** PV of a fixed bond paying 3.9738%: $397{,}381 \times 0.961538 + 10{,}397{,}381 \times 0.915730 = 9{,}903{,}290$. Value $= 10{,}000{,}000 - 9{,}903{,}290 = 96{,}710$.

**Answer: the par swap rate is 3.97%, and after rates rise the swap is worth about USD 96,710 to the fixed-rate payer (and −USD 96,710 to the receiver).**

## Common exam traps
- Averaging the spot rates to get the swap rate. Use the discount-factor formula.
- Using $1 - DF_1$ instead of $1 - DF_N$ in the numerator.
- Getting the sign wrong: rising rates help the fixed **payer**, not the receiver.
- Forgetting that only the remaining periods, with today's discount factors, enter the valuation.
- Thinking notional principal is exchanged in an interest rate swap. Only net interest is paid.

## Key takeaways
- A plain-vanilla swap exchanges fixed for floating interest on a notional that is never exchanged.
- A swap is a portfolio of forward rate agreements with a single fixed rate.
- The par swap rate is $(1 - DF_N)/\sum DF_i$ and gives the swap zero value at initiation.
- After initiation, the payer's value is $(s_{\text{new}} - s_0) \times \sum DF \times$ notional.
- Higher rates increase the value to the fixed payer; lower rates increase the value to the fixed receiver.
