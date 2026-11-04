---
title: "Variables, Data Types and Operators"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a trade blotter row (ticker, quantity, price, is_long) and the four types hiding in it
- 02:00 - Variables as labels; naming rules and good names
- 04:00 - The four basic types and `type()`
- 06:00 - Arithmetic operators: `/` vs `//`, `%`, `**`, precedence, negative floor division
- 09:00 - Floating-point precision: `0.1 + 0.2`, safe comparison, the `decimal` module
- 11:00 - Comparisons, `and`/`or`/`not`, f-strings for money and percentages, type conversion
- 13:30 - Live worked example: round-trip trade P&L with commissions
- 16:30 - Traps recap and practice prompts

## Slides
### Slide 1: Variables, Data Types and Operators
- Every model is built from numbers, text and true/false flags
- Today: store them, combine them, display them cleanly

### Slide 2: Variables Are Labels
- `price = 42.37` attaches a name to a value
- snake_case, no leading digits, case-sensitive
- No type declarations needed

### Slide 3: Four Basic Types
- `int`: share counts, days
- `float`: prices, rates, returns
- `str`: tickers, sectors
- `bool`: `True` / `False` from comparisons

### Slide 4: Arithmetic Operators
- `/` true division (always float)
- `//` floor division, `%` remainder
- `**` power; precedence `**` > `* / // %` > `+ -`
- `-7 // 2` is `-4`

### Slide 5: Floating-Point Reality
- `0.1 + 0.2` prints `0.30000000000000004`
- Never compare floats with `==`
- Use `round()` or `math.isclose()`; `decimal` for ledgers

### Slide 6: Comparisons and Logic
- `== != < <= > >=` return booleans
- Combine with `and`, `or`, `not`
- `=` assigns, `==` compares

### Slide 7: f-Strings for Reports
- `{x:,.2f}` gives `14,469.95`
- `{r:.2%}` gives `11.37%` (multiplies by 100 for you)
- `{t:6s}` pads text for aligned columns

### Slide 8: Type Conversion
- File data often arrives as text
- `"300" * 2` gives `"300300"`
- `int()`, `float()`, `str()` convert

### Slide 9: Worked Example - Trade P&L
- 300 shares, buy 48.20, sell 53.75, 9.95 commission each way
- Cost 14,469.95; proceeds 16,115.05
- P&L 1,645.10; return 11.37%

### Slide 10: Traps
- Double-scaling percentages
- `==` on floats
- Arithmetic on strings; negative floor division

## Whiteboard examples
1. **Trade P&L.** Cost = 48.20 × 300 + 9.95 = 14,460.00 + 9.95 = 14,469.95. Proceeds = 53.75 × 300 − 9.95 = 16,125.00 − 9.95 = 16,115.05. P&L = 1,645.10. Return = 1,645.10 / 14,469.95 = 0.11369 = **11.37%**.
2. **Operator table, predict before running.** `7 / 2` = 3.5; `7 // 2` = 3; `7 % 2` = 1; `2 ** 10` = 1024; `-7 // 2` = **-4** (floor of -3.5). Use the last one to show that floor means "down the number line", not "towards zero".
3. **Months from days.** 400 days: `400 // 30` = 13 whole 30-day months, `400 % 30` = 10 days left over. Check: 13 × 30 + 10 = 400.

## Questions to ask students
- What type is `10 / 2`? (float: `5.0`; true division always returns a float.)
- What does `f"{0.0537:.1%}"` show? (`5.4%`.)
- Why is `0.1 + 0.2 == 0.3` False? (0.1 and 0.2 cannot be stored exactly in binary, so the sum is 0.30000000000000004.)
- What is `"50" + "25"`? (`"5025"`, string concatenation, not 75.)
- What does `pnl > 0 and ret > 0.10` return when pnl is 1,645.10 and ret is 0.1137? (`True`.)

## Analogies
- **Variables are sticky notes, not boxes.** The note `price` is stuck on a value; re-assigning moves the note to a new value.
- **Floats are like measuring with a ruler marked in thirds.** You can get very close to 0.1 but never land on it exactly, so you check "close enough".
- **f-strings are the "Format Cells" dialog of Python.** Same number underneath, presentation chosen at display time.

## Recording tips
- Ask students to predict each operator result before you press Shift+Enter; the `-7 // 2` surprise sticks.
- Show the double-scaled percentage bug (`1137.00%`) on screen; it appears in real reports.
- Keep every rate as a decimal throughout the lesson and say so out loud; it sets the convention for the whole course.
