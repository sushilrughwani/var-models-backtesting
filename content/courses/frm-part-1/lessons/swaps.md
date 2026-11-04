---
title: "Properties of Interest Rate Swaps and Currency Swaps"
---

## Learning goals
- Describe the cash flows of a plain vanilla interest rate swap and explain how it transforms a liability or asset.
- Calculate the gains available from the comparative advantage argument and critique that argument.
- Value an interest rate swap as the difference between a fixed-rate bond and a floating-rate bond.
- Explain why swaps are now discounted with overnight indexed swap (OIS) rates.
- Value a fixed-for-fixed currency swap in terms of two bonds.

## Explanation

### Plain vanilla interest rate swap
In a plain vanilla swap one party pays a **fixed rate** and the other pays a **floating rate** (today usually a compounded overnight rate such as SOFR) on the same **notional principal**. The notional is never exchanged; only the net interest difference changes hands on each payment date.

Swaps transform exposures. A company with floating-rate debt can enter a pay-fixed swap and effectively convert its loan into fixed-rate debt. An investor holding fixed-rate bonds can enter a pay-fixed swap to turn them into floating-rate assets. Dealers stand in the middle, quoting slightly different rates to each side and earning the bid-ask spread.

### The comparative advantage argument
Suppose company A can borrow fixed at 4.0% or floating at SOFR + 0.3%, and company B at 5.2% fixed or SOFR + 0.9%. B pays more in both markets, but its disadvantage is 1.2% in fixed and only 0.6% in floating. If A borrows fixed, B borrows floating, and they swap, the total saving is
$$
\text{Gain} = \Delta_{\text{fixed}} - \Delta_{\text{floating}} = 1.2\% - 0.6\% = 0.6\%
$$
to be shared between A, B and any dealer.

The argument is appealing but questionable. The spreads differ largely because floating-rate loans let lenders reprice credit risk at each reset, while fixed loans lock it in. B's "cheap" floating funding can become expensive if its credit deteriorates, so the gain is partly an illusion of comparing unlike contracts.

### Valuation as two bonds
For the party receiving fixed, a swap is a long fixed-rate bond and a short floating-rate bond, both with face value equal to the notional:
$$
V_{\text{swap}} = B_{\text{fix}} - B_{\text{fl}}
$$
$B_{\text{fix}}$ is the present value of the fixed coupons plus notional. $B_{\text{fl}}$ equals the notional immediately after a reset date, because a floating bond pays the market rate. Between resets it equals the notional plus the known next floating payment, discounted to the next reset. The payer of fixed has value $B_{\text{fl}} - B_{\text{fix}}$.

Equivalently, a swap is a portfolio of forward rate agreements: assume forward rates are realised, compute each net payment and discount. Both methods give the same answer.

### OIS discounting
Before 2008 swaps were discounted at interbank (LIBOR) rates. The crisis showed those rates contained bank credit and liquidity risk. Collateralised derivatives are now discounted at **OIS rates**, the best available proxy for the risk-free rate, because the collateral earns an overnight rate. Today forward-looking interbank rates have largely been replaced by overnight benchmarks.

### Currency swaps
In a fixed-for-fixed currency swap, the parties exchange principal in two currencies at the start, swap interest payments in each currency, and re-exchange principal at maturity. For the party receiving domestic and paying foreign:
$$
V_{\text{swap}} = B_D - S_0\,B_F
$$
where $B_D$ and $B_F$ are the bond values in their own currencies and $S_0$ is the spot rate in domestic per foreign. Because principal is exchanged, currency swaps carry much more credit exposure than interest rate swaps.

## Worked example
A company receives fixed 4% annually and pays floating on USD 100 million. Exactly three years remain and a floating reset has just occurred. Continuously compounded zero rates are 3.2% (1 year), 3.5% (2 years) and 3.7% (3 years).

1. Discount factors: $e^{-0.032} = 0.96851$, $e^{-0.070} = 0.93239$, $e^{-0.111} = 0.89494$.
2. PV of coupons and principal (USD millions): $4(0.96851) = 3.8740$, $4(0.93239) = 3.7296$, $104(0.89494) = 93.0736$.
3. $B_{\text{fix}} = 3.8740 + 3.7296 + 93.0736 = 100.6772$.
4. $B_{\text{fl}} = 100$ (just reset).
5. $V = 100.6772 - 100 = $ **USD 0.68 million** to the fixed receiver. The counterparty paying fixed has a value of −USD 0.68 million.

**Comparative advantage split.** Using A and B above, if they share the 0.6% gain equally with no dealer, A ends up paying SOFR + 0.0% (instead of SOFR + 0.3%) and B pays 4.9% fixed (instead of 5.2%). One swap achieving this: A borrows at 4.0% fixed, receives 4.0% from B and pays SOFR to B.

## Common exam traps
- Forgetting that a floating-rate bond is worth par right after a reset; do not discount the floating leg as if it were fixed.
- Getting the sign wrong: receive-fixed value is $B_{\text{fix}} - B_{\text{fl}}$; pay-fixed is the reverse.
- Computing comparative advantage as the sum of the differences instead of the difference of differences.
- Treating the comparative advantage gain as a free lunch; it ignores the credit repricing embedded in floating loans.
- In currency swaps, multiplying by the spot rate the wrong way or forgetting the final principal exchange.

## Key takeaways
- A plain vanilla swap exchanges fixed for floating interest on a notional that is never paid.
- Comparative advantage gain = difference in fixed spreads minus difference in floating spreads, but the argument has weaknesses.
- Receive-fixed swap value = fixed bond minus floating bond; the floating bond is at par on reset dates.
- Swaps can also be valued as a series of FRAs; collateralised swaps are discounted at OIS rates.
- Currency swaps exchange principal and interest in two currencies: $V = B_D - S_0B_F$.
