---
title: "Analysis of Inventories"
---

## Learning goals
- Calculate cost of goods sold and ending inventory under FIFO, LIFO and weighted average cost.
- Explain how the choice of method affects profit, taxes, cash flow and ratios when prices are rising.
- Convert LIFO figures to a FIFO basis using the LIFO reserve.
- Apply lower of cost and net realisable value rules, including reversals, under IFRS and US GAAP.
- Calculate and interpret inventory turnover and days of inventory on hand.

## Explanation

### The cost-flow problem
When identical units are bought at different prices, the company must decide which costs go to the income statement (cost of goods sold, COGS) and which stay on the balance sheet (ending inventory). The total is fixed by the **goods available for sale**:

$$
\text{Beginning inventory} + \text{Purchases} = \text{COGS} + \text{Ending inventory}
$$

Every method splits the same total differently.

- **FIFO (first in, first out)**: the oldest costs are expensed first. Ending inventory holds the newest costs, so it is close to current replacement value.
- **LIFO (last in, first out)**: the newest costs are expensed first, so COGS is close to current cost but ending inventory can carry very old, low costs. LIFO is **permitted under US GAAP only**; IFRS prohibits it.
- **Weighted average cost**: every unit carries the average cost of goods available, giving results between FIFO and LIFO.
- **Specific identification**: used for unique, high-value items such as cars or jewellery.

### Effects when prices are rising
With rising prices and stable or growing quantities, LIFO produces **higher COGS, lower gross profit, lower taxes and therefore higher operating cash flow**, but a lower inventory balance, lower current ratio and lower equity. FIFO does the opposite: profits and balance-sheet values look stronger but more tax is paid. Cash flow before tax is identical; only the tax bill differs.

A **LIFO liquidation** occurs when a LIFO firm sells more units than it buys and dips into old, cheap layers. COGS falls sharply and margins jump, but the boost is not sustainable; analysts strip it out.

### Converting LIFO to FIFO
US companies on LIFO disclose the **LIFO reserve**, the gap between FIFO and LIFO inventory:

$$
\text{Inventory}_{\text{FIFO}} = \text{Inventory}_{\text{LIFO}} + \text{LIFO reserve}
$$

$$
\text{COGS}_{\text{FIFO}} = \text{COGS}_{\text{LIFO}} - \Delta\text{LIFO reserve}
$$

where $\Delta$LIFO reserve is ending minus beginning reserve. To restate equity, add the reserve times $(1-t)$ to retained earnings and the remainder, reserve times $t$, to deferred tax liabilities.

### Write-downs
Inventory cannot be carried above what it can recover. Under IFRS, inventory is measured at the **lower of cost and net realisable value (NRV)**, where NRV is the expected selling price less costs to complete and sell. A write-down is an expense. If NRV later recovers, the write-down is **reversed**, but only up to the original cost. US GAAP uses lower of cost and NRV for FIFO and weighted average inventory, and **lower of cost or market** for LIFO and the retail method; **reversals are not allowed** under US GAAP.

### Inventory ratios

$$
\text{Inventory turnover} = \frac{\text{COGS}}{\text{Average inventory}}, \qquad \text{Days of inventory on hand} = \frac{365}{\text{Inventory turnover}}
$$

High turnover usually signals efficient management, but if paired with falling sales it may mean the firm is running too lean. Under LIFO with rising prices, turnover looks artificially high because the denominator holds old costs; converting to FIFO gives a fairer comparison.

## Worked example
Penrose Supply starts the year with 100 units at USD 10. It buys 200 units at USD 12 and then 100 units at USD 15. It sells 250 units at USD 25 each. It uses periodic inventory.

**Step 1 - Goods available.** 1,000 + 2,400 + 1,500 = USD 4,900 for 400 units. Sales revenue = 250 × 25 = USD 6,250.

**Step 2 - FIFO.** COGS = 100 × 10 + 150 × 12 = **2,800**. Ending inventory = 50 × 12 + 100 × 15 = 2,100. Gross profit = 6,250 - 2,800 = 3,450.

**Step 3 - LIFO.** COGS = 100 × 15 + 150 × 12 = **3,300**. Ending inventory = 50 × 12 + 100 × 10 = 1,600. Gross profit = 2,950.

**Step 4 - Weighted average.** Average cost = 4,900 / 400 = 12.25. COGS = 250 × 12.25 = **3,062.50**; ending inventory = 150 × 12.25 = 1,837.50; gross profit = 3,187.50.

**Step 5 - Check.** For each method, COGS plus ending inventory equals 4,900. The LIFO reserve at year-end is 2,100 - 1,600 = **USD 500**, exactly the extra profit FIFO reports before tax this year (3,450 - 2,950), because the reserve started at zero.

## Common exam traps
- Mixing up which costs stay in inventory: FIFO leaves the newest costs, LIFO the oldest.
- Saying LIFO gives lower operating cash flow in rising prices; it gives higher CFO because of lower taxes.
- Subtracting the ending LIFO reserve from LIFO COGS instead of the change in the reserve.
- Allowing write-down reversals under US GAAP, or reversing above original cost under IFRS.
- Forgetting that IFRS does not permit LIFO.

## Key takeaways
- All methods split the same goods available between COGS and ending inventory.
- In rising prices LIFO means higher COGS, lower profit and taxes, higher CFO and lower inventory.
- Add the LIFO reserve to inventory, and subtract its change from COGS, to compare with FIFO firms.
- Inventory is carried at the lower of cost and NRV; IFRS allows reversals up to cost, US GAAP does not.
- Turnover and days on hand measure efficiency but are distorted by LIFO.
