---
title: "The Building Blocks of Risk Management"
---

## Learning goals
- Distinguish risk from uncertainty and explain why the distinction matters for measurement.
- Calculate expected loss for a credit exposure and explain why it is a cost, not a risk.
- Estimate unexpected loss from a loss distribution and link it to capital.
- Classify the major risk types and describe how they interact.
- Describe the steps of the risk management process.

## Explanation

### Risk is not the same as a bad outcome
In everyday language "risky" means "something bad might happen". A risk manager is more precise: **risk** is the variability of outcomes around what we expect. A lottery ticket and a government bond can both lose money, but only one of them has outcomes that vary widely.

Two related ideas sit at the base of the subject:

- **Risk** applies when we can describe the possible outcomes and attach reasonably reliable probabilities to them. Car-insurance claims or daily equity returns are examples.
- **Uncertainty** (sometimes called Knightian uncertainty) applies when we cannot list the outcomes or cannot assign credible probabilities. A brand-new technology or an unprecedented pandemic is closer to uncertainty.

The practical point: models handle risk well and uncertainty badly. Good risk managers know which one they face and add judgement, stress tests and buffers when they are in uncertain territory.

### Expected loss: the cost of doing business
Some losses are near-certain over a large portfolio. A credit-card lender knows that a fraction of borrowers will default every year. That average loss is the **expected loss (EL)**:

$$
EL = PD \times LGD \times EAD
$$

where $PD$ is the probability of default over the horizon, $LGD$ is the loss given default (the share of the exposure lost after recoveries) and $EAD$ is the exposure at default. Because EL is predictable, firms price it into products (loan spreads, insurance premiums) and cover it with provisions. EL is a cost, not a risk.

### Unexpected loss: why firms hold capital
What really threatens a firm is the possibility that losses come in far above average. **Unexpected loss (UL)** measures that deviation. Two common definitions:

1. As a standard deviation. For a single loan with a fixed LGD:
$$
UL = EAD \times LGD \times \sqrt{PD(1-PD)}
$$
2. As a quantile gap: the loss at a high confidence level (say 99%) minus the expected loss. This is how economic capital is usually framed:
$$
UL_{\alpha} = L_{\alpha} - EL
$$
where $L_{\alpha}$ is the loss not exceeded with probability $\alpha$.

EL is covered by pricing and provisions; UL is covered by **capital**. Losses beyond the chosen quantile are the tail that even capital may not absorb.

### The main risk types
- **Market risk**: losses from moves in prices, rates, FX and commodities.
- **Credit risk**: counterparties fail to pay or are downgraded.
- **Liquidity risk**: funding liquidity (cannot raise cash) and market liquidity (cannot sell without a large price impact).
- **Operational risk**: failed processes, people, systems or external events, including fraud and cyber attacks.
- **Business and strategic risk**: demand falls, competitors win, strategy fails.
- **Reputational risk**: loss of trust, often a consequence of the others.

These are not separate boxes. A market crash raises borrower defaults (credit), forces margin calls (liquidity) and stresses systems (operational). Risk managers worry most about these **interactions**.

### The risk management process
1. **Identify** risks the firm is exposed to.
2. **Measure** them (EL, UL, VaR, scenarios).
3. **Decide** what to do: retain, avoid, mitigate or transfer, consistent with the firm's risk appetite.
4. **Monitor and report** exposures against limits, and repeat.

Risk management does not mean eliminating risk. A bank that took no risk would earn nothing. The goal is to take the risks the firm is paid for and understands, at a size it can survive.

## Worked example
A bank's loan book has a one-year loss distribution (in USD millions):

| Loss | Probability | Cumulative |
|---|---|---|
| 0 | 0.800 | 0.800 |
| 2 | 0.120 | 0.920 |
| 5 | 0.050 | 0.970 |
| 12 | 0.025 | 0.995 |
| 30 | 0.005 | 1.000 |

**Step 1 - Expected loss.**
$EL = 0(0.80) + 2(0.12) + 5(0.05) + 12(0.025) + 30(0.005) = 0 + 0.24 + 0.25 + 0.30 + 0.15 = 0.94$ million.

**Step 2 - 99% loss quantile.** The cumulative probability first reaches at least 0.99 at a loss of 12 (cumulative 0.995). So $L_{99\%} = 12$ million.

**Step 3 - Unexpected loss.** $UL = 12 - 0.94 =$ **USD 11.06 million**, which is the capital needed at 99% confidence.

**Step 4 - Single-loan check.** For one loan with EAD USD 10 million, PD 2% and LGD 40%: $EL = 10{,}000{,}000 \times 0.02 \times 0.40 = 80{,}000$, and $UL = 10{,}000{,}000 \times 0.40 \times \sqrt{0.02 \times 0.98} = 4{,}000{,}000 \times 0.14 =$ **USD 560,000**. The UL is seven times the EL: the threat lies in the variability, not the average.

## Common exam traps
- Treating EL as the amount of capital needed. Capital covers UL; EL is covered by pricing and provisions.
- Using the recovery rate in place of LGD. LGD = 1 - recovery rate.
- Reading the quantile off the wrong row: pick the first loss where the cumulative probability is at least the confidence level.
- Forgetting to subtract EL when UL is defined as quantile minus expected loss.
- Confusing risk (measurable probabilities) with uncertainty (probabilities unknown).

## Key takeaways
- Risk is variability of outcomes with known probabilities; uncertainty is when those probabilities are unknown.
- $EL = PD \times LGD \times EAD$ is a predictable cost priced into products.
- UL is the deviation above EL and is what capital is held against.
- Market, credit, liquidity, operational, business and reputational risks interact, especially in a crisis.
- The process is identify, measure, decide, monitor; the aim is to take rewarded risks, not zero risk.
