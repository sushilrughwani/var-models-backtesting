---
title: "Balancing the Model and Error Checks"
duration: 18
---

## Lecture outline
- 00:00 - Hook: the balance check shows 6.79 at midnight before a deadline
- 02:00 - Why models break and why checks matter
- 04:00 - Building the checks section and a master flag
- 07:00 - The six-step diagnosis process
- 10:00 - The halving rule: omissions versus sign errors
- 11:30 - Whiteboard: fixing Northwind's 6.79 imbalance
- 15:00 - Errors that do not break the balance
- 16:30 - Recap and traps

## Slides
### Slide 1: First Links Rarely Balance
- Errors are normal; finding them fast is the skill
- Checks catch breaks as they happen
### Slide 2: The Checks Section
- Balance check with a tolerance
- Cash check, net income check
- Revolver non-negative and within limit
### Slide 3: Excel Checks
- `=IF(ABS(E20-E40)>0.005,1,0)`
- `=IF(OR(E60<-0.001,E60>$C$61),1,0)`
- Master: `=SUM(E90:E95)` shown on every sheet
### Slide 4: Diagnosis Steps 1 to 3
- Historical years first
- First forecast year that fails
- Constant difference or changing difference
### Slide 5: Diagnosis Steps 4 to 6
- Compare difference with line items
- Walk every balance sheet line to the cash flow
- Turn off the circuit breaker while searching
### Slide 6: The Halving Rule
- Difference = item: omission
- Difference = 2 x item: sign error
### Slide 7: Northwind Draft Model
- Assets 382.17, liabilities and equity 375.39
- Difference 6.79; half = 3.39 = change in NWC
### Slide 8: The Fix
- NWC line linked as `=E47-D47` instead of `=-(E47-D47)`
- CFO 92.41 to 85.44; revolver 8.64 to 15.55
- Both sides 382.17
### Slide 9: Omission Example
- PP&E roll-forward without depreciation
- Difference 22.20 = D&A
### Slide 10: Balanced but Wrong
- Wrong growth rate, wrong tax rate, misclassified costs
- Use ratio and reasonableness checks
### Slide 11: Key Takeaways
- Checks in one place, master flag everywhere
- Diagnose systematically
- Never plug

## Whiteboard examples
**Example 1: Sign error.** Assets 382.17, liabilities and equity 375.39, difference 6.79. Halve: 3.39, the change in NWC. The working capital line had the wrong sign, so CFO was 85.44 + 2 x 3.39 = 92.22 before the interest knock-on (92.41 after lower interest raised net income to 66.81). The extra cash over-repaid the revolver to 8.64. Fix the sign: revolver 15.55, totals 382.17.

**Example 2: Omission.** PP&E rolled forward as 200.0 + 44.0 = 244.0, with no depreciation. Assets exceed liabilities and equity by 22.20, exactly D&A. Add depreciation to the roll-forward: 221.80.

**Example 3: Dividend omitted from cash flow.** Dividends of 19.99 deducted from retained earnings but not from financing cash flow, with no revolver sweep. Cash is overstated by 19.99, so assets exceed liabilities and equity by 19.99: an omission.

## Questions to ask students
- The model is out by 9.97 and the change in inventory is 4.98. What do you suspect? (A sign error on the inventory line.)
- Why use a tolerance in the balance check? (Floating-point rounding can leave tiny non-zero differences.)
- Where do you start looking: the last forecast year or the first? (The first year that fails.)
- Can a model balance and still be wrong? (Yes; assumption errors do not break the balance.)
- Why turn off the circuit breaker during diagnosis? (To stop errors from feeding round the interest loop and changing the numbers while you search.)

## Analogies
- The balance check is a smoke alarm: it will not tell you which room is burning, but you know to look.
- The halving rule is like a bank statement off by twice a payment: you probably recorded a payment as a deposit.
- Diagnosing year by year is like finding the first domino that fell.

## Recording tips
- Break the model deliberately on screen and fix it live; students learn more from watching a diagnosis than a clean build.
- Write the halving rule large on the whiteboard and leave it up.
- Show the master flag turning from ERROR to OK; it is a satisfying moment that sticks.
