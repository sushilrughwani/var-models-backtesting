---
title: "Lookup Functions: XLOOKUP, INDEX and MATCH"
duration: 22
---

## Lecture outline
- 00:00 - Hook: insert one column in a rate table and watch a VLOOKUP report silently change every number
- 02:30 - What lookups are for, and the three weaknesses of VLOOKUP
- 05:30 - XLOOKUP syntax: exact match default, if_not_found, match_mode, search_mode
- 09:00 - MATCH returns a position, INDEX returns an item; combining them
- 12:00 - Two-way lookups with INDEX + two MATCHes and with nested XLOOKUP
- 15:00 - Approximate matching for tier tables
- 17:30 - Live build: yield grid lookup and tiered fee calculator
- 20:30 - Traps and recap

## Slides
### Slide 1: Lookup Functions
- Find a key, return a matching item
- XLOOKUP, INDEX, MATCH
- One source table, many formulas

### Slide 2: VLOOKUP's Weaknesses
- Looks right only
- Hard-coded column number breaks on inserted columns
- Default is approximate match

### Slide 3: XLOOKUP Syntax
- =XLOOKUP(value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
- Exact match by default
- Return column can be left or right of the key

### Slide 4: XLOOKUP Options
- match_mode: 0 exact, -1 next smaller, 1 next larger, 2 wildcard
- search_mode: 1 first-to-last, -1 last-to-first
- if_not_found replaces #N/A with your message

### Slide 5: MATCH
- Returns a position, not a value
- Type 0 exact; type 1 (default) needs ascending data; type -1 descending
- Always type the 0 for exact lookups

### Slide 6: INDEX + MATCH
- =INDEX(return_range, MATCH(key, lookup_range, 0))
- Works in every Excel version
- Survives inserted columns

### Slide 7: Two-Way Lookups
- =INDEX(data, MATCH(row_key, rows, 0), MATCH(col_key, cols, 0))
- =XLOOKUP(row_key, rows, XLOOKUP(col_key, cols, data))

### Slide 8: Yield Grid Example
- A-rated, 7-year bond
- MATCH rating = 3, MATCH maturity = 3
- INDEX(B2:E5, 3, 3) = 4.25%

### Slide 9: Tier Tables Need Approximate Match
- Store lower thresholds, sorted
- XLOOKUP mode -1 or MATCH type 1
- Exact match returns #N/A between thresholds

### Slide 10: Tiered Fee Example
- AUM 7,500,000; thresholds 0 / 1m / 5m / 20m
- Next smaller threshold 5,000,000 → 0.60%
- Fee = 45,000

### Slide 11: Why Lookups Fail
- Missing 0 in MATCH
- Ranges of different sizes
- Trailing spaces, numbers stored as text

### Slide 12: Recap
- XLOOKUP first choice in modern Excel
- INDEX/MATCH for compatibility and two-way grids
- Handle not-found cases on purpose

## Whiteboard examples
**Example 1 - Yield grid.** Ratings AAA, AA, A, BBB in A2:A5; maturities 2, 5, 7, 10 in B1:E1; A-row yields 3.55, 3.95, 4.25, 4.50. For A / 7 years: MATCH("A",A2:A5,0) = 3; MATCH(7,B1:E1,0) = 3; INDEX(B2:E5,3,3) = 4.25%. Then ask for BBB / 5 years: row 4, column 2 → 4.55%.

**Example 2 - Tiered fee.** Thresholds 0, 1,000,000, 5,000,000, 20,000,000 with rates 1.00%, 0.80%, 0.60%, 0.40%. AUM 7,500,000: next smaller threshold is 5,000,000 → 0.60% → fee 7,500,000 × 0.006 = 45,000. AUM 25,000,000: threshold 20,000,000 → 0.40% → fee 100,000. AUM exactly 1,000,000: exact match → 0.80% → fee 8,000.

**Example 3 - The VLOOKUP trap.** `=VLOOKUP("A",A2:E5,4,FALSE)` returns 4.25 (the 7-year column, 4th column of the table). Insert a new column after column B: the same formula now returns the 5-year yield because column 4 has shifted. The INDEX/MATCH version keeps returning 4.25.

## Questions to ask students
- What is XLOOKUP's default match mode? (Exact match.)
- What does MATCH return: a value or a position? (A position.)
- What happens if you omit the 0 in MATCH on an unsorted list? (Approximate match; it may return a wrong position without any error.)
- Which XLOOKUP match_mode suits a tax-bracket table of lower thresholds? (-1, exact or next smaller.)
- How would you find the most recent price for a ticker in a log sorted by date ascending? (XLOOKUP with search_mode -1, last to first.)

## Analogies
- MATCH is asking "which seat number is Sam in?"; INDEX is "who is sitting in seat 3?". Together they find anyone, wherever the seating chart is moved.
- VLOOKUP's column number is like giving directions as "the fourth house on the left": build a new house and you arrive at the wrong door.
- A threshold table is a staircase: approximate match tells you which step you are standing on.

## Recording tips
- Do the inserted-column demo live; it is the single most convincing argument for XLOOKUP and INDEX/MATCH.
- Evaluate the MATCH parts separately in helper cells first, then combine them, so viewers see the positions.
- Mention version support: XLOOKUP needs Microsoft 365 or Excel 2021; INDEX/MATCH works everywhere.
