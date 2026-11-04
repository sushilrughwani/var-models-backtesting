---
title: "Funds Transfer Pricing"
---

## Learning goals
- Explain why banks use funds transfer pricing (FTP) and how it moves interest rate and liquidity risk to a central treasury.
- Build an FTP rate from a matched-maturity base rate, a term liquidity premium and contingent liquidity charges.
- Decompose a bank's net interest margin into asset, liability and treasury (mismatch) contributions.
- Identify the weaknesses of single-pool FTP and the incentive problems poor FTP creates.

## Explanation

### The problem FTP solves
A branch that gathers deposits and a lending desk that makes loans both touch the same balance sheet. Without an internal price for money, nobody knows which unit actually creates value. Worse, a lending desk would happily make long-dated fixed-rate loans funded by short-term deposits, booking a fat margin today while the bank as a whole bears the interest rate and liquidity risk.

**Funds transfer pricing** is the internal pricing system in which a central **treasury** (or ALM unit) "buys" funds from deposit-gathering units and "sells" funds to lending units at transfer rates. Done properly it:

- measures the true profitability of products, customers and business lines;
- moves interest rate and liquidity risk out of the business lines and into treasury, where it can be hedged and managed against limits;
- prices liquidity explicitly, so lenders pay for the stable funding their assets consume and deposit gatherers are rewarded for stable funding they bring in.

### Building the FTP rate
Under the **matched-maturity** method, each transaction is priced at origination using curves that match its repricing and liquidity profile:

$$
\text{FTP rate} = \text{Base rate}_{\text{reprice}} + \text{Liquidity premium}_{\text{maturity}} + \text{Contingent liquidity charge} + \text{Option cost}
$$

- **Base rate** - the swap (or OIS) rate for the transaction's *repricing* term. A 5-year fixed loan gets the 5-year swap rate; a 5-year floating loan resetting quarterly gets the 3-month rate. This transfers interest rate risk.
- **Term liquidity premium** - the bank's incremental cost of borrowing for the transaction's *funding* term over the base rate. It rises with maturity and charges long assets for the stable funding they need. Deposits receive a liquidity credit based on their behavioural stability.
- **Contingent liquidity charge** - the cost of holding a buffer of low-yielding HQLA against potential outflows (deposit run-off, undrawn credit lines). It is the negative carry on the buffer, roughly the HQLA required per unit of product times the yield shortfall of HQLA versus funding.
- **Option cost** - for prepayable mortgages or deposits with early-withdrawal rights.

The FTP rate is locked for the life of the transaction, so the business line's margin is protected from later rate moves; treasury carries the mismatch.

### Margin decomposition
With a loan at rate $r_L$ and a deposit at rate $r_D$:

$$
\underbrace{r_L - r_D}_{\text{bank NIM}} = \underbrace{(r_L - \text{FTP}_L)}_{\text{lending margin}} + \underbrace{(\text{FTP}_D - r_D)}_{\text{deposit margin}} + \underbrace{(\text{FTP}_L - \text{FTP}_D)}_{\text{treasury margin}}
$$

where $\text{FTP}_L$ is the transfer rate charged to the loan and $\text{FTP}_D$ is the transfer credit paid to the deposit. The treasury margin is the reward (and risk) of maturity transformation, and treasury decides how much of it to hedge.

### Weak designs and incentives
- **Single pool rate** - one average rate for all assets and liabilities. Simple, but it ignores maturity: long fixed loans look too profitable and stable deposits look too cheap, encouraging excessive maturity mismatch.
- **Zero or flat liquidity premium** - before 2008 many banks charged no term liquidity cost, so long illiquid assets and contingent commitments seemed free. This contributed to funding fragility.
- **Ignoring behavioural maturity** - non-maturity deposits are contractually overnight but behaviourally sticky; treasury models a core/volatile split to assign appropriate credits.

Good FTP is governed by ALCO, transparent, consistent across business lines and aligned with the bank's LCR and NSFR costs.

## Worked example
A bank makes a USD 100 million 5-year fixed-rate loan at 6.5%, funded by a USD 100 million 1-year retail term deposit at 2.0%. Curves: 5-year swap 3.8%, 1-year swap 3.2%; term liquidity premium 0.6% for 5 years and 0.2% for 1 years.

1. Loan FTP: $3.8\% + 0.6\% = 4.4\%$.
2. Deposit FTP credit: $3.2\% + 0.2\% = 3.4\%$.
3. Lending margin: $6.5\% - 4.4\% = 2.1\%$, so USD 2.1 million a year.
4. Deposit margin: $3.4\% - 2.0\% = 1.4\%$, so USD 1.4 million.
5. Treasury margin: $4.4\% - 3.4\% = 1.0\%$, so USD 1.0 million.
6. Check: $2.1 + 1.4 + 1.0 = 4.5\% = 6.5\% - 2.0\%$.

So **the lending desk earns 2.1%, the deposit branch 1.4% and treasury 1.0%** for running the maturity and liquidity mismatch. If rates rise next year, the deposit reprices higher, but the business lines' margins are locked; treasury's margin absorbs the shock unless hedged.

**Contingent liquidity add-on.** A corporate deposit has a 40% stressed run-off, so the bank holds HQLA equal to 40% of it. If HQLA yields 3.0% while the deposit's FTP credit is 3.4%, the negative carry is $0.40 \times (3.4\% - 3.0\%) = 0.16\%$, which is deducted from that deposit's FTP credit.

## Common exam traps
- Using the loan's final maturity for the base rate of a floating-rate loan; the base rate follows the repricing term, the liquidity premium follows the funding term.
- Forgetting that deposits receive an FTP *credit* (benefit), not a charge.
- Assuming the business line bears interest rate risk under matched-maturity FTP; it is transferred to treasury.
- Thinking single-pool FTP is neutral; it subsidises long assets and penalises stable funding.
- Omitting contingent liquidity charges for undrawn commitments and runnable deposits.

## Key takeaways
- FTP is the internal price of funds that measures true profitability and centralises interest rate and liquidity risk in treasury.
- Matched-maturity FTP = base rate for the repricing term + term liquidity premium + contingent liquidity and option costs.
- Bank NIM splits into lending margin, deposit margin and treasury margin.
- Single-pool and zero-liquidity-premium designs create incentives for excessive maturity transformation.
- FTP should be governed by ALCO and aligned with regulatory liquidity costs.
