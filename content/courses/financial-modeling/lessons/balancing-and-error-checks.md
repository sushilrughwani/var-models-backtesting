---
title: "Balancing the Model and Error Checks"
---

## Learning goals
- Build balance, cash and debt checks that flag errors automatically.
- Apply a systematic process to find why a balance sheet does not balance.
- Use the size and pattern of an imbalance to diagnose its likely cause.
- Distinguish errors that break the balance from errors that do not.

## Explanation

### Why checks matter
In the previous lesson Northwind's balance sheet balanced at 382.17 because every movement was linked once. In real life, the first time you link the statements it almost never balances. Models also break later, when someone inserts a row or changes a formula. Checks catch problems the moment they appear, and a disciplined diagnosis process finds the cause in minutes rather than hours.

### Building checks
Gather every check on one checks section, each returning 0 when fine and 1 when not, and sum them into a master flag displayed at the top of every sheet.

- **Balance check**: `=IF(ABS(E20-E40)>0.005,1,0)`, where row 20 is total assets and row 40 is total liabilities and equity. Use a small tolerance rather than an exact equality, because floating-point rounding can leave tiny differences.
- **Cash check**: balance sheet cash equals the cash flow statement's closing cash.
- **Net income check**: net income on the cash flow statement equals the income statement.
- **Debt checks**: revolver balance not negative and not above its limit, for example `=IF(OR(E60<-0.001,E60>$C$61),1,0)`.
- **Master check**: `=SUM(E90:E95)` across all years, with a label such as `=IF(SUM(E90:J95)=0,"OK","ERROR")`.

### Diagnosing an imbalance
Work through these steps in order:

1. **Check the historical years.** If a historical year does not balance, the data entry is wrong; fix that first.
2. **Find the first forecast year that fails.** Errors propagate, so the first broken year contains the root cause.
3. **Is the difference constant or changing?** A constant difference across all years often points to an opening balance problem; a changing one points to a flow (a cash flow line or schedule) error.
4. **Compare the difference with line items.** If the difference equals a line item, something has been omitted from one statement. If **half** the difference equals a line item, that item probably has the wrong sign:

$$
\text{Sign error: } |\text{Difference}| = 2 \times |\text{Item}| \qquad \text{Omission: } |\text{Difference}| = |\text{Item}|
$$

5. **Walk the mapping.** For each balance sheet line, confirm its change appears exactly once in the cash flow statement with the right sign.
6. **Turn off the circuit breaker** if the model is circular, so that errors are not feeding back on themselves while you search.

### Balancing is not the same as being right
Some errors leave the balance sheet balanced: a wrong growth rate, tax applied at the wrong rate, or a cost classified in the wrong line. These need reasonableness checks: margins, growth and ratios compared with history and peers.

## Worked example
A colleague's first draft of the Northwind FY2026E model (USD m) shows total assets of 382.17 but liabilities and equity of only 375.39. FY2025A balances at 362.10.

**Step 1: history.** FY2025A balances, so the error is in the forecast.

**Step 2: size.** Difference = 382.17 − 375.39 = 6.79 (6.788 unrounded). Assets exceed liabilities and equity.

**Step 3: compare with line items.** No line equals 6.79. Half of it is 3.39, which matches the change in net working capital.

**Step 4: inspect.** In the cash flow statement the formula for CFO is `=E30+E31+E32` where E32 already contains the cash flow line −3.39 entered as +3.39. CFO shows 92.41 instead of the correct 85.44 (the slightly different net income comes from lower interest in the flawed draft). The excess cash repaid extra revolver, which closed at 8.64 instead of 15.55, so liabilities are understated.

**Step 5: fix and confirm.** Correct the sign so the line is `=-(E47-D47)`. Net income returns to 66.63, CFO to 85.44, the revolver to 15.55 and both sides to **382.17**. The master check reads OK.

**A second illustration.** If the PP&E roll-forward had omitted depreciation, PP&E would show 244.00 instead of 221.80. Assets would exceed liabilities and equity by 22.20, exactly the D&A figure: an omission, not a sign error.

## Common exam traps
- Plugging the difference into cash or equity, which hides the real error and may hide others.
- Starting the search in the last forecast year rather than the first year that fails.
- Forgetting that a sign error produces a difference of twice the item, not the item itself.
- Testing equality with `=E20=E40`, which can fail on tiny rounding differences.
- Assuming a balanced model is correct; assumption errors do not break the balance.

## Key takeaways
- Put all checks in one place and roll them into a master flag.
- Fix history first, then find the first forecast year that fails.
- Difference equal to an item suggests an omission; twice an item suggests a sign error.
- Every balance sheet change must appear once, with the right sign, in the cash flow statement.
- A balanced model still needs reasonableness checks on its assumptions.
