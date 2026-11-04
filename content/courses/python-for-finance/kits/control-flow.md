---
title: "Control Flow: Conditions and Loops"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a 40-year cash-flow schedule. Typing 40 discount formulas vs one loop
- 02:00 - Blocks and indentation: the colon, 4 spaces, why moving a line changes meaning
- 04:00 - if / elif / else: leverage buckets, first-true-branch rule, ordering conditions
- 07:00 - for loops and enumerate(): the NPV formula as a loop
- 10:00 - Live worked example: NPV of -1000, 300, 400, 500 at 8%
- 12:30 - while loops: doubling time at 7%, avoiding infinite loops
- 14:30 - break, continue, loop-else: payback period and counting losing days
- 16:30 - Traps recap: accumulator placement, off-by-one t, elif order

## Slides
### Slide 1: Control Flow: Conditions and Loops
- Make decisions and repeat work automatically
- The engine behind every schedule, screen and simulation

### Slide 2: Blocks and Indentation
- A colon opens a block
- Indented lines (4 spaces) belong to it
- Indentation is meaning, not style

### Slide 3: if / elif / else
- Checked top to bottom
- Only the first true branch runs
- Put the narrowest condition first

### Slide 4: Example - Leverage Buckets
- Debt/EBITDA < 2: low
- < 4: moderate; otherwise high
- 3.4 gives "moderate leverage"

### Slide 5: for Loops
- One pass per item in a sequence
- `enumerate()` gives (position, item)
- Position = time index t for discounting

### Slide 6: NPV as a Loop
- $NPV = \sum_t CF_t/(1+r)^t$
- Accumulator `npv = 0.0` before the loop
- `npv += cf / (1 + rate) ** t` inside

### Slide 7: while Loops
- Repeat while a condition holds
- Unknown number of iterations
- Must move towards the exit; guard with a max count

### Slide 8: Doubling Time
- USD 1,000 at 7%: 11 years to pass 2,000
- Balance after 11 years: 2,104.85
- Rule of 72 check: 72 / 7 ≈ 10.3

### Slide 9: break, continue, else
- `break` exits; `continue` skips to the next item
- Loop `else` runs only if no `break`
- Payback example: year 4

### Slide 10: Traps
- Accumulator reset inside the loop
- elif order; off-by-one time index
- Infinite while loops

## Whiteboard examples
1. **NPV loop trace.** Cash flows -1000, 300, 400, 500 at 8%. Build a table: t = 0 → -1000.00; t = 1 → 300/1.08 = 277.78; t = 2 → 400/1.1664 = 342.94; t = 3 → 500/1.259712 = 396.92. Running total: -1000.00, -722.22, -379.29, **17.63** (adding the rounded PVs gives 17.64; carry full precision).
2. **Doubling time.** USD 1,000 at 7%: 1.07¹⁰ = 1.9672 so the balance is 1,967.15 after 10 years, still below 2,000. Year 11: 1,967.15 × 1.07 = **2,104.85**, so the loop prints 11.
3. **Payback.** -5,000 then 1,200, 1,500, 1,800, 2,000. Cumulative: -5,000, -3,800, -2,300, -500, +1,500. Turns non-negative in **year 4**; `break` fires, so loop-else does not print "Never pays back".

## Questions to ask students
- In the leverage example, what bucket does 1.5 get if you swap the first two conditions? ("moderate leverage", because `< 4` would be checked first and is true.)
- Why does `enumerate()` suit discounting? (It supplies t = 0, 1, 2, ... alongside each cash flow.)
- What happens if `npv = 0.0` is moved inside the loop? (It resets each pass; only the last PV survives.)
- What is the danger in `while balance < 2000` if the rate is 0? (The balance never grows, so the loop never ends.)
- When does a loop's `else` block run? (Only when the loop completes without hitting `break`.)

## Analogies
- **if/elif is a bouncer with a guest list read top to bottom.** You go through the first door that lets you in and never see the others.
- **A for loop is an assembly line.** Each cash flow passes the same station (discount and add) exactly once.
- **A while loop is "keep pouring until the glass is full".** You don't know how many pours it takes, but you must be pouring something.

## Recording tips
- Use a print inside the NPV loop on screen so students see the running total; remove it afterwards to show the clean version.
- Demonstrate an infinite loop on purpose and show how to stop the cell, so students are not scared when it happens.
- Turn on visible whitespace or indentation guides in the editor when explaining blocks.
