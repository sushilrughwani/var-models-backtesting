---
title: "Logical Functions: IF, IFS, AND, OR and IFERROR"
---

## Learning goals
- Write IF formulas that return different values or calculations depending on a test.
- Combine several conditions with AND, OR and NOT.
- Replace deep nested IFs with IFS and order its conditions correctly.
- Handle errors deliberately with IFERROR and IFNA without hiding genuine mistakes.

## Explanation

### Every logical formula starts with a test
A logical test is any expression that evaluates to TRUE or FALSE: `B2>=0.05`, `C4="Fixed"`, `D7<>0`. The comparison operators are `=`, `<>`, `>`, `<`, `>=` and `<=`. Text comparisons ignore case, so `"fixed"="FIXED"` is TRUE. Behind the scenes TRUE behaves as 1 and FALSE as 0 in arithmetic, which is why `=(B2>100)*50` returns 50 or 0.

### IF: one decision
`=IF(logical_test, value_if_true, value_if_false)`

The value arguments can be numbers, text in quotes, cell references or whole calculations. For example, a bonus of 10% of salary only when a target is hit: `=IF(C2>=D2, B2*10%, 0)`. If you leave out the third argument and the test fails, IF returns FALSE, which then looks odd in a report, so always supply it.

### AND, OR, NOT: several conditions
- `AND(test1, test2, ...)` is TRUE only if every test is TRUE.
- `OR(test1, test2, ...)` is TRUE if at least one test is TRUE.
- `NOT(test)` flips TRUE and FALSE.

They return TRUE/FALSE on their own, so they almost always sit inside an IF: `=IF(AND(B2<=3.5, C2>=4), "Pass", "Breach")`.

### IFS: many outcomes without nesting
Before IFS (Excel 2019 and Microsoft 365), multiple outcomes required nested IFs such as `=IF(B2<2,"Low",IF(B2<3.5,"Moderate","High"))`, which become unreadable after three levels. IFS lists test/result pairs:

`=IFS(B2<2, "Low", B2<3.5, "Moderate", TRUE, "High")`

IFS returns the result of the **first** TRUE test and ignores the rest, so order matters. With thresholds, test the most restrictive condition first (smallest for "less than" tests, largest for "greater than or equal" tests). The final `TRUE` acts as a catch-all; without it, a value that meets no condition returns #N/A.

### IFERROR and IFNA: planned error handling
`=IFERROR(value, value_if_error)` returns the calculation unless it produces any error (#DIV/0!, #N/A, #VALUE!, #REF!, #NAME?...), in which case it returns your fallback. `IFNA` catches only #N/A, which is safer for lookups because it does not hide other problems such as a misspelled function name.

Use these sparingly. An error is information: it tells you data is missing or a formula is broken. Wrapping a whole model in IFERROR(...,0) turns visible errors into silent zeros.

## Worked example
A bank tests two loan covenants each quarter: net debt / EBITDA must be at most 3.5, and EBITDA / interest must be at least 4.0. For each borrower, net debt is in B, EBITDA in C and interest expense in D. The formula in E2, filled down:

`=IFERROR(IF(AND(B2/C2<=3.5, C2/D2>=4), "Pass", "Breach"), "Check data")`

**Borrower 1** (row 2): net debt 420, EBITDA 130, interest 28.
- Leverage = 420 / 130 = 3.23, which is ≤ 3.5: TRUE.
- Coverage = 130 / 28 = 4.64, which is ≥ 4.0: TRUE.
- AND(TRUE, TRUE) = TRUE, so E2 shows **Pass**.

**Borrower 2** (row 3): net debt 300, EBITDA 75, interest 20.
- Leverage = 300 / 75 = 4.00 > 3.5: FALSE.
- Coverage = 75 / 20 = 3.75 < 4.0: FALSE.
- AND returns FALSE (one FALSE is enough), so E3 shows **Breach**.

**Borrower 3** (row 4): EBITDA 0. B4/C4 returns #DIV/0!, the error flows through AND and IF, and IFERROR replaces it with **Check data**, a message that prompts action rather than a misleading Pass or Breach.

Add a risk band in F2 with IFS on leverage:

`=IFS(B2/C2<2, "Low", B2/C2<3.5, "Moderate", TRUE, "High")`

Borrower 1: 3.23 is not below 2, but is below 3.5, so **Moderate**. Borrower 2: 4.00 fails both tests and falls to the catch-all, **High**.

## Common exam traps
- Ordering IFS thresholds wrongly: with `B2>=50000` tested before `B2>=150000`, a value of 180,000 stops at the first, lower tier.
- Omitting the final TRUE in IFS, so unmatched values return #N/A.
- Writing `=IF(B2>=1<=5, ...)` instead of `AND(B2>=1, B2<=5)`; Excel cannot chain comparisons.
- Typing numbers as text in a test (`B2>"100"`), which compares text, not values.
- Using IFERROR to return 0 everywhere, which hides broken references and makes totals silently wrong.

## Key takeaways
- IF chooses between two outcomes based on a TRUE/FALSE test.
- AND needs every condition TRUE; OR needs at least one.
- IFS returns the first TRUE result, so put the most restrictive condition first and end with TRUE.
- TRUE and FALSE act as 1 and 0 in arithmetic.
- Use IFERROR for expected, explainable errors and IFNA for lookups; never as a blanket cover-up.
