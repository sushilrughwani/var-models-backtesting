---
title: "Commodity Forwards and Futures"
---

## Learning goals
- Distinguish investment commodities from consumption commodities and explain why the distinction matters for pricing.
- Calculate commodity forward prices that include storage costs, either as a cash amount or as a proportional rate.
- Explain the convenience yield and back out the implied convenience yield from an observed futures price.
- Describe contango and backwardation and relate them to the cost of carry.
- Explain lease rates for investment commodities such as gold.

## Explanation

### Why commodities are different
In the previous lesson the forward price was spot carried forward at the risk-free rate, minus any income. Commodities add two complications. First, they are costly to hold: warehouses, insurance, pipelines and spoilage cost money. Second, many commodities are held for use, not investment. A refinery keeps crude oil in its tanks because running out would shut the plant, not because it wants to earn a return.

This gives two types of commodity:
- **Investment commodities** (gold, silver) are held by many investors purely as stores of value. Holders will sell or lend them whenever arbitrage pays, so the full cost-of-carry formula holds as an equality.
- **Consumption commodities** (crude oil, copper, wheat, natural gas) are held mainly as inputs. Holders will not happily lend out their inventory, so arbitrage only enforces an upper bound on the forward price.

### Storage costs
Storage costs are negative income. If $U$ is the present value of all storage costs during the contract,
$$
F_0 = (S_0 + U)\,e^{rT}
$$
If storage is a constant proportion $u$ of the commodity's value per year,
$$
F_0 = S_0 e^{(r+u)T}
$$
For an investment commodity these hold with equality. If the forward were higher, you would buy the commodity, pay storage, and sell forward (cash-and-carry). If it were lower, an investor holding gold would sell the gold, invest the cash and buy it back forward.

### Consumption commodities and the convenience yield
For a consumption commodity only the first arbitrage works, so
$$
F_0 \le (S_0 + U)\,e^{rT}
$$
The gap reflects the **convenience yield** $y$: the benefit of physically holding inventory, such as keeping a production line running during a shortage. It is defined by
$$
F_0 = S_0 e^{(r + u - y)T}
\quad\text{or}\quad
F_0 e^{yT} = (S_0 + U)\,e^{rT}
$$
where $y$ is the continuously compounded convenience yield per year. Convenience yield is high when inventories are low and supply disruptions are feared, and close to zero when inventories are plentiful.

### Cost of carry
The **cost of carry** $c$ collects every term: interest plus storage minus income. For a commodity, $c = r + u$, and
$$
F_0 = S_0 e^{(c - y)T}
$$
For an investment commodity $y = 0$.

### Contango and backwardation
- **Contango**: futures prices rise with maturity, $F_0 > S_0$. Typical when inventories are ample and carry costs dominate.
- **Backwardation**: futures prices fall with maturity, $F_0 < S_0$. Occurs when the convenience yield exceeds $r + u$, often during tight supply.

Do not confuse these with *normal backwardation*, which compares the futures price with the *expected* future spot price.

### Lease rates
Gold owners can lend their gold to others for a fee called the lease rate $\ell$. Because owning gold earns this income, the forward price is $F_0 = S_0 e^{(r - \ell)T}$, the same structure as an asset paying a yield.

## Worked example
Crude oil trades at USD 80 per barrel. Storage costs USD 0.50 per barrel per quarter, paid at the end of each quarter. The risk-free rate is 4% per year, continuously compounded. The 1-year futures price is USD 81.50.

**Step 1: PV of storage.** Payments at 0.25, 0.5, 0.75 and 1.0 years:
$$
U = 0.50\left(e^{-0.01} + e^{-0.02} + e^{-0.03} + e^{-0.04}\right) = 1.9507
$$

**Step 2: Full-carry upper bound.**
$$
(S_0 + U)e^{rT} = 81.9507 \times e^{0.04} = 85.30
$$
Without storage costs it would be only $80e^{0.04} = 83.26$.

**Step 3: Compare.** The market price of 81.50 is below 85.30. For oil this is not an arbitrage: the people who hold oil will not sell inventory to exploit it.

**Step 4: Implied convenience yield.** Solve $81.50\,e^{y} = 85.30$:
$$
y = 0.04 - \ln\!\left(\frac{81.50}{81.9507}\right) = 0.0455
$$
The implied convenience yield is **about 4.55% per year**. The market is in contango ($81.50 > 80$), but much less steep than full carry would imply.

## Common exam traps
- Applying the cost-of-carry equality to a consumption commodity and declaring an arbitrage when the futures price is below full carry.
- Subtracting storage costs instead of adding them. Storage is negative income, so it raises the forward price.
- Adding the convenience yield to the carry. It reduces the forward price, exactly like a dividend yield.
- Confusing backwardation (futures below spot) with normal backwardation (futures below expected future spot).
- Forgetting to discount storage costs paid at different dates before adding them to the spot price.

## Key takeaways
- Investment commodities obey full cost of carry; consumption commodities obey only an upper bound.
- Storage costs raise forward prices: $(S_0 + U)e^{rT}$ or $S_0e^{(r+u)T}$.
- Convenience yield captures the value of physical inventory and lowers forward prices: $F_0 = S_0e^{(r+u-y)T}$.
- Contango means futures above spot; backwardation means futures below spot, typically when convenience yield is high.
- Gold lease rates act like a dividend yield on gold.
