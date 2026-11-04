---
title: "Anatomy of the Great Financial Crisis"
---

## Learning goals
- Describe how the housing boom, subprime lending and securitization set the stage for the 2007-2009 crisis.
- Explain how short-term wholesale funding (repo and asset-backed commercial paper) turned credit losses into a run on the financial system.
- Calculate how rising repo haircuts force deleveraging.
- Trace the key events from the first fund freezes in 2007 to the Lehman failure in 2008.
- Interpret the LIBOR-OIS spread as a gauge of bank funding stress.

## Explanation

### The build-up: housing and credit
In the early 2000s, low interest rates, rising house prices and abundant global savings fuelled US mortgage lending. Underwriting standards slipped: subprime and "Alt-A" loans with low down payments, little income verification and adjustable rates with low initial "teaser" rates became common. The **originate-to-distribute** model meant lenders sold loans into securitizations rather than holding them, weakening their incentive to screen borrowers.

Loans were pooled into mortgage-backed securities, and tranches of those were repackaged again into CDOs. Senior tranches received AAA ratings based on models that assumed limited correlation in defaults across regions - an assumption that failed once house prices fell nationally. Many banks kept these "safe" tranches or parked them in off-balance-sheet vehicles.

### Leverage and fragile funding
Large dealers ran balance sheets with leverage of 30 times or more, financed heavily overnight in the **repo** market, where loans are secured by collateral minus a **haircut**. Structured investment vehicles (SIVs) and conduits funded long-term mortgage assets with short-term **asset-backed commercial paper (ABCP)**. This maturity mismatch looked safe as long as lenders kept rolling their funding.

### From losses to panic
House prices peaked around 2006 and subprime delinquencies rose. The total subprime losses were large but not, by themselves, enough to sink the system. What made it systemic was **uncertainty about who held the losses**. Because securitized exposures were opaque, investors pulled back from anything mortgage-related:

- In August 2007, BNP Paribas froze redemptions on three funds, and the ABCP market seized up.
- In September 2007, depositors queued outside Northern Rock in the UK.
- Repo lenders raised haircuts on securitized collateral sharply, the "run on repo" - a bank run in the wholesale market, without queues.

### The 2008 climax
- **March 2008:** Bear Stearns lost its repo funding within days and was acquired by JPMorgan with Federal Reserve support.
- **September 2008:** Fannie Mae and Freddie Mac were placed into conservatorship; **Lehman Brothers** filed for bankruptcy on 15 September; AIG, which had sold large amounts of credit default swap protection, received emergency Fed lending; the Reserve Primary Fund, a money market fund holding Lehman paper, "broke the buck".
- **October 2008:** the US Congress approved the USD 700 billion TARP programme, and governments worldwide injected capital and guaranteed bank debt.

### Measuring the stress: LIBOR-OIS
The LIBOR-OIS spread compares unsecured interbank borrowing rates with the expected overnight policy rate over the same term. It captures the credit and liquidity premium banks charge each other. Before August 2007 it sat at a few basis points; after Lehman it spiked to several hundred basis points, signalling that banks did not trust each other.

### Contagion channels
Losses spread through fire sales (forced selling depresses prices and marks across all holders), counterparty exposures, liquidity hoarding and loss of confidence. Central banks responded as lenders of last resort with new facilities for dealers, commercial paper and money funds.

## Worked example
**Part A - The run on repo.** A dealer has USD 5 billion of equity and finances securitized bonds entirely through repo. Its maximum asset holding is equity divided by the haircut.

- Haircut 2%: $5 / 0.02 = 250$, so USD 250 billion of assets.
- Haircut rises to 8%: $5 / 0.08 = 62.5$, so USD 62.5 billion.
- Required asset sales: $250 - 62.5 = 187.5$, so **USD 187.5 billion**.

Every dealer doing the same thing at once depresses prices, which erodes equity and pushes haircuts higher still.

**Part B - Negative equity at home.** A household buys a USD 300,000 home with 5% down, borrowing USD 285,000. Prices fall 12%: the home is worth $300{,}000 \times 0.88 = 264{,}000$. Equity is $264{,}000 - 285{,}000 = -21{,}000$. The household is under water by **USD 21,000**, so default becomes rational for some borrowers - and their defaults feed back into MBS losses.

## Common exam traps
- Blaming the crisis solely on subprime losses; the systemic damage came from leverage, maturity mismatch and opacity that triggered funding runs.
- Forgetting that a run can happen without depositors: repo haircut increases and ABCP non-rollovers are runs too.
- Computing deleveraging from the change in haircut times assets instead of equity divided by each haircut.
- Reading a wider LIBOR-OIS spread as a signal of looser monetary policy; it signals bank credit and liquidity stress.
- Mixing up the order of events: Bear Stearns (March 2008) came before Lehman (September 2008).

## Key takeaways
- Weak underwriting plus originate-to-distribute created poor-quality mortgage assets that were rated as safe.
- High leverage and short-term wholesale funding made institutions vulnerable to runs.
- Opacity about where losses sat converted a credit problem into a systemic panic.
- Higher haircuts force deleveraging: maximum assets = equity / haircut.
- The LIBOR-OIS spread is a key barometer of interbank stress.
- Policy responses included lender-of-last-resort facilities, capital injections and guarantees.
