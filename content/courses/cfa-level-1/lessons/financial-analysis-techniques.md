---
title: "Financial Analysis Techniques"
---

## Learning goals
- Calculate activity, liquidity, solvency and profitability ratios from a set of financial statements.
- Compute the cash conversion cycle and explain what it reveals about working capital management.
- Decompose return on equity using the three-part and five-part DuPont models.
- Interpret ratios in context, using trends, peers and the limitations of ratio analysis.

## Explanation

### Why ratios?
Raw numbers do not compare well: a 600 million profit means something very different for a 5 billion company than for a 50 billion one. Ratios scale results so you can compare a company with its own past (**time-series**) and with competitors (**cross-sectional**). A ratio never gives an answer on its own; it tells you where to dig.

A practical convention: when a ratio mixes an income statement flow with a balance sheet stock, use the **average** balance for the period.

### Activity ratios: how efficiently assets are used

$$
\text{Receivables turnover} = \frac{\text{Revenue}}{\text{Avg receivables}}, \quad \text{DSO} = \frac{365}{\text{Receivables turnover}}
$$

$$
\text{Inventory turnover} = \frac{\text{COGS}}{\text{Avg inventory}}, \quad \text{DOH} = \frac{365}{\text{Inventory turnover}}
$$

$$
\text{Payables turnover} = \frac{\text{Purchases}}{\text{Avg payables}}, \quad \text{DPO} = \frac{365}{\text{Payables turnover}}
$$

where DSO is days sales outstanding, DOH days of inventory on hand and DPO days payables outstanding. COGS is often used as a proxy for purchases when purchases are not reported. **Total asset turnover** = revenue ÷ average total assets.

The **cash conversion cycle** measures how long cash is tied up in operations:

$$
\text{CCC} = \text{DSO} + \text{DOH} - \text{DPO}
$$

Shorter is generally better, but an extremely high DPO may mean the company is struggling to pay suppliers.

### Liquidity ratios: can short-term bills be paid?
- **Current ratio** = current assets ÷ current liabilities.
- **Quick ratio** = (cash + marketable securities + receivables) ÷ current liabilities. It excludes inventory and prepaid items, which are harder to convert to cash.
- **Cash ratio** = (cash + marketable securities) ÷ current liabilities.

### Solvency ratios: can long-term obligations be met?
- **Debt-to-equity** = total debt ÷ total equity; **debt-to-assets** = total debt ÷ total assets.
- **Financial leverage** = average total assets ÷ average total equity.
- **Interest coverage** = EBIT ÷ interest expense.

Remember from earlier lessons that lease liabilities and pension deficits are debt-like.

### Profitability ratios
Gross, operating and net margins divide gross profit, EBIT and net income by revenue. **ROA** = net income ÷ average total assets and **ROE** = net income ÷ average equity.

### DuPont analysis
DuPont breaks ROE into drivers so you can see *why* it changed.

$$
\text{ROE} = \underbrace{\frac{NI}{\text{Revenue}}}_{\text{net margin}} \times \underbrace{\frac{\text{Revenue}}{\text{Assets}}}_{\text{asset turnover}} \times \underbrace{\frac{\text{Assets}}{\text{Equity}}}_{\text{leverage}}
$$

The five-part version splits net margin further:

$$
\text{ROE} = \frac{NI}{EBT} \times \frac{EBT}{EBIT} \times \frac{EBIT}{\text{Revenue}} \times \frac{\text{Revenue}}{\text{Assets}} \times \frac{\text{Assets}}{\text{Equity}}
$$

where $NI/EBT$ is the **tax burden** (higher = lower tax), $EBT/EBIT$ the **interest burden** (higher = less interest), and $EBIT/\text{Revenue}$ the operating margin. A rising ROE driven by leverage is riskier than one driven by better margins or turnover.

## Worked example
Orion Manufacturing (all figures in millions, balance sheet figures are averages):
Revenue 5,000; COGS 3,000; SG&A 1,100; interest expense 100; tax rate 25%. Total assets 6,000; equity 2,400; total debt 2,000; receivables 625; inventory 500; payables 375; current assets 1,800 (of which cash 300); current liabilities 1,200.

**Step 1 - Income statement.** EBIT = 5,000 − 3,000 − 1,100 = 900. EBT = 900 − 100 = 800. Tax = 200. NI = 600.

**Step 2 - Activity.** Receivables turnover = 5,000 ÷ 625 = 8.0, DSO = 45.6 days. Inventory turnover = 3,000 ÷ 500 = 6.0, DOH = 60.8 days. Payables turnover (COGS proxy) = 3,000 ÷ 375 = 8.0, DPO = 45.6 days. CCC = 45.6 + 60.8 − 45.6 = **60.8 days**.

**Step 3 - Liquidity.** Current ratio = 1,800 ÷ 1,200 = 1.50. Quick ratio = (300 + 625) ÷ 1,200 = 0.77.

**Step 4 - Solvency.** Debt-to-equity = 2,000 ÷ 2,400 = 0.83. Debt-to-assets = 0.33. Leverage = 6,000 ÷ 2,400 = 2.5. Interest coverage = 900 ÷ 100 = 9.0×.

**Step 5 - Three-part DuPont.** Net margin = 600 ÷ 5,000 = 12%. Asset turnover = 5,000 ÷ 6,000 = 0.833. ROE = 12% × 0.833 × 2.5 = 25%.

**Step 6 - Five-part DuPont.** Tax burden = 600 ÷ 800 = 0.75. Interest burden = 800 ÷ 900 = 0.889. EBIT margin = 900 ÷ 5,000 = 18%. ROE = 0.75 × 0.889 × 0.18 × 0.833 × 2.5 = **25%**, matching ROE = 600 ÷ 2,400.

## Common exam traps
- Using ending balances when the question gives beginning and ending figures; average them.
- Adding DPO in the cash conversion cycle instead of subtracting it.
- Misreading the burden ratios: a *higher* interest burden ratio means *less* interest cost.
- Including inventory in the quick ratio.
- Praising a higher ROE without checking whether it came from leverage rather than operations.

## Key takeaways
- Ratios make companies comparable across time and peers, but they raise questions rather than answer them.
- CCC = DSO + DOH − DPO measures how long operating cash is tied up.
- Liquidity ratios look at short-term obligations; solvency ratios at long-term capital structure and coverage.
- ROE = net margin × asset turnover × leverage; the five-part model separates tax, interest and operating effects.
- Always interpret ratios in context: industry norms, accounting choices and one-off items can distort them.
