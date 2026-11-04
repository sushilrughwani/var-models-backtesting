---
title: "Liquidity Coverage and Net Stable Funding Ratios"
---

## Learning goals
- Explain the purpose and time horizon of the liquidity coverage ratio (LCR) and the net stable funding ratio (NSFR).
- Calculate HQLA after haircuts and recognise the caps on Level 2 assets.
- Calculate net cash outflows using run-off and inflow rates, including the 75% inflow cap.
- Calculate the NSFR from available and required stable funding factors and explain how each ratio binds.

## Explanation

### Why two ratios
Before 2008, many banks met capital rules yet failed because they ran out of cash. Basel III added two complementary liquidity standards:

- The **LCR** is a **short-term survival** test: can the bank survive a severe 30-day stress using its own stock of liquid assets?
- The **NSFR** is a **structural** test: is the bank's one-year funding profile stable enough to support its assets, limiting excessive maturity transformation?

Both must be at least 100%.

### The liquidity coverage ratio

$$
\text{LCR} = \frac{\text{Stock of HQLA}}{\text{Total net cash outflows over 30 days}} \ge 100\%
$$

**High-quality liquid assets (HQLA)** must be unencumbered and easy to sell or repo in stress:

| Level | Examples | Haircut | Cap |
|---|---|---|---|
| 1 | Cash, central bank reserves, 0% risk-weight sovereign bonds | 0% | none |
| 2A | 20% risk-weight sovereigns, high-grade covered and corporate bonds | 15% | Level 2 total at most 40% of HQLA |
| 2B | Lower-rated corporate bonds, certain equities and RMBS | 25-50% | at most 15% of HQLA |

**Net cash outflows** apply stress run-off rates to liabilities and commitments, and inflow rates to contractual receivables:

$$
\text{Net outflows} = \text{Outflows} - \min(\text{Inflows},\ 0.75 \times \text{Outflows})
$$

The 75% cap means a bank must always hold HQLA against at least 25% of its gross outflows - it cannot rely entirely on expected inflows. Typical run-off rates: stable insured retail deposits 5% (3% in some jurisdictions), less stable retail 10%, operational deposits 25%, non-operational deposits of non-financial corporates 40%, unsecured wholesale funding from financial institutions 100%, undrawn committed credit facilities to corporates 10%. Inflows from performing loans are typically 50% from non-financial customers and 100% from financial institutions.

### The net stable funding ratio

$$
\text{NSFR} = \frac{\text{Available stable funding (ASF)}}{\text{Required stable funding (RSF)}} \ge 100\%
$$

**ASF** weights each liability by how stable it is over one year: capital and liabilities with maturity of a year or more 100%, stable retail deposits 95%, less stable retail 90%, short-term funding from non-financial corporates 50%, short-term funding from financial institutions 0%.

**RSF** weights each asset by how much stable funding it needs: cash 0%, Level 1 securities 5%, Level 2A 15%, Level 2B 50%, short-term loans 50%, residential mortgages with low risk weights 65%, other loans over a year 85%, fixed and non-performing assets 100%, plus small factors for off-balance-sheet commitments (for example 5% of undrawn facilities).

### How the ratios bind
The LCR is sensitive to short-term wholesale funding: replacing a term deposit with overnight interbank funding hits the denominator at 100%. Banks respond by holding more HQLA (costly, because HQLA yields little), lengthening wholesale funding and attracting operational and retail deposits. The NSFR penalises funding long, illiquid assets with short-term money; it pushes banks toward longer-dated debt and away from relying on short-term financial-sector funding. Together they reduce run risk at the cost of lower net interest margins.

## Worked example
A bank (USD million) holds cash and reserves 400, sovereign bonds (Level 1) 1,200, covered bonds (Level 2A) 300 and corporate bonds (Level 2B, 50% haircut) 100.

**HQLA:** Level 1 $= 1{,}600$; Level 2A $= 300 \times 0.85 = 255$; Level 2B $= 100 \times 0.50 = 50$. HQLA $= 1{,}905$. Level 2 share $= 305/1{,}905 = 16.0\%$ and Level 2B share $= 2.6\%$, so no cap binds.

**Outflows:** stable retail $4{,}000 \times 5\% = 200$; less stable retail $2{,}000 \times 10\% = 200$; operational deposits $1{,}500 \times 25\% = 375$; corporate non-operational $1{,}000 \times 40\% = 400$; financial unsecured $300 \times 100\% = 300$; undrawn facilities $2{,}000 \times 10\% = 200$. Total $= 1{,}675$.

**Inflows:** non-financial loans $600 \times 50\% = 300$; financial loans $200 \times 100\% = 200$. Total 500, below the cap of $0.75 \times 1{,}675 = 1{,}256.25$.

**LCR** $= 1{,}905 / (1{,}675 - 500) = 1{,}905 / 1{,}175 =$ **162.1%**.

**NSFR:** ASF $=$ capital $1{,}000 \times 100\%$ + stable retail $4{,}000 \times 95\%$ + less stable retail $2{,}000 \times 90\%$ + corporate deposits $2{,}500 \times 50\%$ + financial funding $300 \times 0\%$ + long-term debt $1{,}200 \times 100\%$ $= 1{,}000 + 3{,}800 + 1{,}800 + 1{,}250 + 0 + 1{,}200 = 9{,}050$.

RSF $=$ cash 0 + Level 1 $1{,}200 \times 5\% = 60$ + Level 2A $300 \times 15\% = 45$ + Level 2B $100 \times 50\% = 50$ + short-term interbank loans $200 \times 15\% = 30$ + mortgages $4{,}000 \times 65\% = 2{,}600$ + long-term corporate loans $3{,}000 \times 85\% = 2{,}550$ + short-term loans $1{,}500 \times 50\% = 750$ + fixed assets $300 \times 100\% = 300$ + undrawn facilities $2{,}000 \times 5\% = 100$ $= 6{,}485$.

**NSFR** $= 9{,}050 / 6{,}485 =$ **139.6%**. Both ratios comfortably exceed 100%.

## Common exam traps
- Forgetting the 75% inflow cap, which overstates the LCR when inflows are large.
- Applying haircuts to Level 1 assets (they have none) or forgetting the 15% Level 2A haircut.
- Mixing horizons: the LCR covers 30 days of stress; the NSFR covers one year of structural funding.
- Reversing ASF and RSF factors: higher ASF is good (stable liabilities); higher RSF means an asset needs more stable funding.
- Treating short-term funding from financial institutions as partly stable; its ASF factor is 0% and its LCR run-off is 100%.

## Key takeaways
- LCR = HQLA / 30-day net cash outflows; NSFR = ASF / RSF; both must be at least 100%.
- HQLA Level 1 has no haircut; Level 2A takes 15% and Level 2B 25-50%, with 40% and 15% caps.
- Net outflows deduct inflows capped at 75% of gross outflows.
- ASF rewards stable funding; RSF charges illiquid, long-dated assets.
- The ratios reduce run risk and maturity transformation, at a cost to net interest margin.
