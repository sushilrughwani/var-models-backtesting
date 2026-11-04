---
title: "Funds Transfer Pricing"
duration: 22
---

## Lecture outline
- 00:00 - Hook: the lending desk reports record profits while the bank is sitting on a time bomb - how?
- 02:00 - What FTP is and the role of treasury
- 05:00 - Building the rate: base rate, liquidity premium, contingent charges, option costs
- 09:00 - Margin decomposition into lending, deposit and treasury margins
- 12:00 - Whiteboard: loan and deposit example
- 16:00 - Weak designs: single pool, zero liquidity premium, behavioural maturity
- 19:00 - Exam traps and recap

## Slides
### Slide 1: Who really made the money?
- Lenders and deposit gatherers share one balance sheet
- Without an internal price, profit is mis-attributed
- Hidden mismatch risk
### Slide 2: The FTP mechanism
- Treasury buys funds from deposit units
- Treasury sells funds to lending units
- Rates locked at origination
### Slide 3: Building blocks
- Base rate for the repricing term
- Term liquidity premium for the funding term
- Contingent liquidity charge and option cost
### Slide 4: Base versus liquidity premium
- Fixed 5-year loan: 5-year swap rate
- Floating 5-year loan: 3-month base rate, 5-year liquidity premium
- Interest rate risk versus liquidity risk transfer
### Slide 5: Margin decomposition
- NIM = lending margin + deposit margin + treasury margin
- Treasury margin = FTP loan - FTP deposit
- Treasury hedges or runs the mismatch
### Slide 6: Worked example
- Loan 6.5%, FTP 4.4%: lending margin 2.1%
- Deposit 2.0%, FTP credit 3.4%: deposit margin 1.4%
- Treasury 1.0%; total 4.5%
### Slide 7: Contingent liquidity
- HQLA buffer for runnable deposits and undrawn lines
- Charge = buffer share x negative carry
- 40% x 0.4% = 0.16%
### Slide 8: Weak designs
- Single pool rate ignores maturity
- Zero liquidity premium made long assets look free
- Behavioural maturity for non-maturity deposits
### Slide 9: Governance
- ALCO owns the methodology
- Transparent and consistent across businesses
- Aligned with LCR and NSFR costs
### Slide 10: Exam traps
- Base rate follows repricing, not maturity
- Deposits get a credit
- Business lines do not bear rate risk

## Whiteboard examples
**Example 1 - Margin split.** Loan 6.5% (5-year fixed), deposit 2.0% (1-year). FTP loan = 3.8 + 0.6 = 4.4%; FTP deposit = 3.2 + 0.2 = 3.4%. Margins: 2.1% + 1.4% + 1.0% = 4.5%. On USD 100m: 2.1m, 1.4m, 1.0m.

**Example 2 - Second set.** Loan 7.0% (4-year fixed), 4-year swap 4.1%, liquidity premium 0.7%: FTP 4.8%, lending margin 2.2%. Deposit 2.5% (6-month), 6-month swap 3.6% + 0.1%: credit 3.7%, deposit margin 1.2%. Treasury margin 1.1%. Total 4.5%.

**Example 3 - Contingent charge.** Corporate deposit, 40% run-off, HQLA yield 3.0%, FTP credit 3.4%: charge 0.40 x 0.4% = 0.16%; net credit 3.24%.

## Questions to ask students
- Which base rate applies to a 10-year mortgage that resets every year? (The 1-year rate, plus a 10-year liquidity premium)
- Under matched-maturity FTP, who bears the loss if rates rise after a fixed-rate loan is funded with short deposits? (Treasury, unless it hedges)
- Why did zero liquidity premiums contribute to the 2008 crisis? (They made long illiquid assets and contingent lines look free, encouraging excessive maturity transformation)
- What happens to a deposit's FTP credit if it has a high run-off rate? (It is reduced by a contingent liquidity charge)
- What is the flaw of a single pool rate? (It ignores maturity, subsidising long assets and penalising stable funding)

## Analogies
- FTP as an internal wholesale market: branches sell deposits to treasury and lenders buy money from it, so every unit sees a market price.
- Treasury as the bank's warehouse manager: it carries the inventory risk so the shops (business lines) can focus on customers.
- A single pool rate as charging the same rent for a one-night hotel stay and a ten-year lease.

## Recording tips
- Draw a three-box diagram (deposit unit, treasury, lending unit) with arrows and rates.
- Emphasise repricing versus funding term with the floating-rate loan example.
- Show the decomposition summing back to NIM - it reassures students the method is consistent.
