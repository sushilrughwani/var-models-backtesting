---
title: "Currency Exchange Rates: Understanding Equilibrium Value"
---

## Learning goals
- Calculate cross rates with bid-offer spreads and forward rates using covered interest rate parity.
- Explain uncovered interest parity, purchasing power parity and the international Fisher effect, and how they link together.
- Calculate the return on a carry trade and explain why the trade can crash.
- Evaluate how monetary policy, fiscal policy, current account balances and capital flows influence exchange rates.

## Explanation

### Quote conventions and cross rates
We write exchange rates as **price currency / base currency**. USD/EUR = 1.1000 means one euro (the base) costs 1.1000 US dollars. Dealers quote a **bid** (the price at which they buy the base currency) and an **offer** (the price at which they sell it). You always trade at the side that is worse for you.

To build a cross rate, chain the quotes so the middle currency cancels. For JPY/EUR from USD/EUR and JPY/USD:

$$
\frac{JPY}{EUR} = \frac{USD}{EUR} \times \frac{JPY}{USD}
$$

The cross **bid** multiplies the two bids and the cross **offer** multiplies the two offers. If you must invert a quote, the inverted bid is 1/offer and the inverted offer is 1/bid.

### Covered interest rate parity
Covered parity is an arbitrage relationship: investing at home must earn the same as converting, investing abroad and locking in the conversion back with a forward. For a horizon of $\tau$ days with a 360-day convention:

$$
F_{P/B} = S_{P/B} \times \frac{1 + i_P \left(\frac{\tau}{360}\right)}{1 + i_B \left(\frac{\tau}{360}\right)}
$$

where $F$ is the forward rate, $S$ the spot rate, $i_P$ the price-currency interest rate and $i_B$ the base-currency rate. The currency with the **higher** interest rate trades at a forward **discount**. Forward points are $(F - S)$ scaled by 10,000 for most pairs.

### Uncovered interest parity and the carry trade
Uncovered interest parity (UIP) says the **expected** spot rate equals today's forward rate, so the high-yield currency is expected to depreciate by exactly the interest differential. There is no arbitrage enforcing it, and in practice UIP fails over short horizons: high-yield currencies often hold steady or even appreciate. The **carry trade** exploits this by borrowing a low-yield (funding) currency and investing in a high-yield (investment) currency:

$$
R_{carry} = (1 + i_H)(1 + \%\Delta S_{H}) - (1 + i_L)
$$

where $i_H$ is the investment rate, $i_L$ the funding rate and $\%\Delta S_H$ the change in the value of the investment currency against the funding currency. Returns are typically small and steady but negatively skewed: in a risk-off panic, investors unwind together and the high-yield currency can collapse, wiping out years of carry. This is often described as "picking up coins in front of a steamroller."

### PPP, Fisher and real interest rate parity
- **Relative PPP**: the expected change in the spot rate equals the inflation differential. It holds poorly in the short run but is a useful long-run anchor.
- **International Fisher effect**: nominal rate differentials equal expected inflation differentials, which holds when **real interest rate parity** holds (real rates are equal across countries).
- If covered parity, UIP, ex ante PPP and real rate parity all hold, the forward rate is an unbiased predictor of the future spot rate.

### Fundamental drivers of exchange rates
- **Balance of payments**: persistent current account deficits put long-run pressure on a currency, but capital flows dominate in the short run. Surges of capital inflows into emerging markets can cause appreciation followed by sharp reversals.
- **Mundell-Fleming (short run, open economy)**: with high capital mobility, expansionary fiscal policy plus restrictive monetary policy pushes rates up and causes strong appreciation. Expansionary monetary policy plus restrictive fiscal policy causes depreciation. With low capital mobility, trade flows matter more, so fiscal expansion tends to weaken the currency.
- **Portfolio balance (long run)**: sustained fiscal deficits must be financed by investors who eventually demand higher returns, so the currency can weaken in the long run even if it rose initially.
- **Monetary approach**: faster money supply growth leads to higher inflation and depreciation. Dornbusch overshooting says the currency first depreciates beyond its long-run PPP level because goods prices are sticky.
- **Intervention and capital controls**: central banks of small economies with large reserves can lean against flows, but intervention rarely changes the trend for major currencies.

## Worked example
Spot USD/EUR is 1.1000. The 180-day USD rate is 4.5% and the EUR rate is 2.5% (360-day basis). Find the 180-day forward rate and forward points.

Step 1: Price currency is USD, base is EUR.

Step 2: USD factor = 1 + 0.045 × 180/360 = 1.0225. EUR factor = 1 + 0.025 × 180/360 = 1.0125.

Step 3: F = 1.1000 × 1.0225 / 1.0125 = 1.10864.

Step 4: Forward points = (1.108642 − 1.100000) × 10,000 = **+108.6 points**, so the forward is **USD/EUR 1.1086**. The euro trades at a forward premium of 0.99% (1.108642 / 1.1000 − 1) because it has the lower interest rate.

Extension (carry trade): an investor borrows JPY at 0.5% and invests in AUD at 4.5% for one year. The AUD depreciates 2% against the JPY. Return = 1.045 × 0.98 − 1.005 = **1.91%**. The crude approximation 4.5 − 0.5 − 2 = 2.0% is close but not exact.

## Common exam traps
- Putting the interest rates upside down in covered parity: the price-currency rate goes in the **numerator**.
- Forgetting to scale annual rates by days/360 for periods under one year.
- Treating UIP as an arbitrage condition. Only covered parity is enforced by arbitrage.
- Mixing bid and offer sides when building cross rates; the cross offer uses both offers.
- Assuming fiscal expansion always strengthens a currency: the answer depends on capital mobility and the time horizon.

## Key takeaways
- Cross rates chain quotes so the common currency cancels; respect bid-offer sides.
- Covered parity is arbitrage-based; the higher-yield currency trades at a forward discount.
- UIP fails in the short run, which is what makes carry trades profitable on average but crash-prone.
- PPP and real rate parity are long-run anchors, not short-run forecasting tools.
- Policy mix and capital mobility determine whether fiscal or monetary shifts strengthen a currency.
