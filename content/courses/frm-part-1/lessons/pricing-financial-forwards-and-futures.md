---
title: "Determination of Forward and Futures Prices"
---

## Learning goals
- Explain why the no-arbitrage forward price equals the spot price grown at the cost of carry.
- Calculate forward prices for assets with no income, known cash income, a continuous yield and for currencies.
- Construct the cash-and-carry or reverse cash-and-carry arbitrage when a quoted forward price is mispriced.
- Value an existing forward contract after market prices have moved.
- Explain when futures and forward prices can differ.

## Explanation

### The core idea: two ways to own the asset later
Suppose you want to own one share in nine months. You can (1) buy it today and hold it, financing the purchase with borrowed money, or (2) agree a forward price today and pay it in nine months. Both routes end with the same share at the same date, so in a market without arbitrage they must cost the same. Holding the asset costs you interest on the money tied up (the **carry**), but pays you any income the asset throws off. The forward price is therefore the spot price plus net carry.

We use continuous compounding, as in the earlier interest rates lesson, because it makes the algebra clean.

### Asset with no income
$$
F_0 = S_0 e^{rT}
$$
where $F_0$ is the forward price agreed today, $S_0$ is the spot price, $r$ is the risk-free rate (continuously compounded, per year) and $T$ is time to delivery in years.

### Asset with known cash income
If the asset pays known cash amounts (for example a dividend or a bond coupon) before delivery, the forward buyer does not receive them. Subtract their present value $I$:
$$
F_0 = (S_0 - I)\,e^{rT}
$$

### Asset with a known yield
If income is paid as a continuous yield $q$ (a stock index's dividend yield, for instance):
$$
F_0 = S_0 e^{(r-q)T}
$$

### Currencies
A unit of foreign currency is an asset that earns the foreign risk-free rate $r_f$. Quoting $S_0$ as domestic currency per unit of foreign currency:
$$
F_0 = S_0 e^{(r - r_f)T}
$$
This is interest rate parity. The currency with the higher interest rate trades at a forward discount. Storage costs, which behave like negative income, are covered in the next lesson on commodities.

### Arbitrage when the price is wrong
- **Quoted forward too high** ($F_{\text{quoted}} > F_0$): cash-and-carry. Borrow, buy the asset, short the forward. At delivery hand over the asset, receive $F_{\text{quoted}}$ and repay the loan.
- **Quoted forward too low**: reverse cash-and-carry. Short-sell the asset, invest the proceeds, go long the forward.

### Valuing an existing contract
A long forward written earlier at delivery price $K$ is worth
$$
f = (F_0 - K)\,e^{-rT}
$$
where $F_0$ is today's forward price for the same delivery date. You locked in buying at $K$ when the market price for that date is now $F_0$; the gain is received at $T$, so discount it. A short position is worth $-f$.

### Forwards versus futures
If interest rates are constant (or known in advance), futures and forward prices for the same delivery date are equal. When futures prices are positively correlated with interest rates, daily settlement favours the long: gains are reinvested at higher rates and losses financed at lower rates, so futures prices tend to be slightly above forward prices. Negative correlation reverses this. For short-dated contracts the difference is usually ignored.

## Worked example
A stock trades at USD 60. It will pay dividends of USD 0.80 in 3 months and USD 0.80 in 6 months. The risk-free rate is 5% per year with continuous compounding. Find the 9-month forward price.

1. PV of the first dividend: $0.80e^{-0.05 \times 0.25} = 0.7901$.
2. PV of the second dividend: $0.80e^{-0.05 \times 0.5} = 0.7802$.
3. $I = 0.7901 + 0.7802 = 1.5703$.
4. $F_0 = (60 - 1.5703)e^{0.05 \times 0.75} = 58.4297 \times 1.03821 = $ **USD 60.66**.

**Arbitrage check.** A dealer quotes USD 62.00. The forward is too high, so use cash-and-carry:
- Borrow 0.7901 for 3 months, 0.7802 for 6 months and 58.4297 for 9 months (total 60) and buy the share.
- Short the forward at 62.00.
- Each dividend repays its matching loan exactly.
- At 9 months deliver the share for 62.00 and repay $58.4297e^{0.0375} = 60.66$.
- Riskless profit: $62.00 - 60.66 = $ **USD 1.34** per share.

**Valuing an old contract.** You hold a long forward on this stock for the same date with $K = 58$. Its value is $(60.66 - 58)e^{-0.0375} = $ **USD 2.56**.

**Currency.** EUR spot is 1.0850 USD, the USD rate is 4.5% and the EUR rate is 2.5%. The 6-month forward is $1.0850e^{(0.045-0.025)\times 0.5} = $ **1.0959 USD per EUR**: the lower-yielding euro trades at a forward premium.

## Common exam traps
- Subtracting the dividend itself instead of its present value, or adding income instead of subtracting it.
- Swapping $r$ and $r_f$ in the currency formula. Check the quote: with domestic per foreign, the domestic rate goes first.
- Forgetting to discount the payoff when valuing an existing forward: the value is $(F_0 - K)e^{-rT}$, not $F_0 - K$.
- Mixing up the arbitrage direction. An expensive forward is sold; the asset is bought with borrowed money.
- Assuming futures and forward prices are always equal. They differ when interest rates are random and correlated with the underlying.

## Key takeaways
- Forward price = spot price carried forward at the risk-free rate, less the value of any income the holder would forgo.
- No income: $S_0e^{rT}$; known income: $(S_0 - I)e^{rT}$; yield: $S_0e^{(r-q)T}$; currency: $S_0e^{(r-r_f)T}$.
- Mispricing creates cash-and-carry (forward too high) or reverse cash-and-carry (forward too low) arbitrage.
- An existing long forward is worth the discounted gap between today's forward price and the delivery price.
- Futures equal forwards when rates are deterministic; positive correlation between rates and the underlying pushes futures slightly higher.
