---
title: "Lists, Dictionaries and Tuples"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a portfolio is a list of positions and a price feed is a lookup table; Python has a structure for each
- 02:00 - Lists: creation, zero-based indexing, negative indexes, slicing's half-open rule
- 05:00 - Mutating lists and list comprehensions: growth factors and filtering gains
- 07:30 - Dictionaries: ticker-to-price and rating-to-spread lookups, `.get`, `.items()`
- 10:00 - Tuples: immutable trade records, unpacking, multiple return values
- 11:30 - Live worked example: market values and weights of a 3-stock portfolio
- 15:00 - Aliasing vs copying, choosing the right structure
- 17:00 - Traps recap

## Slides
### Slide 1: Lists, Dictionaries and Tuples
- Containers for many values at once
- Cash flows, portfolios and lookup tables

### Slide 2: Lists
- Ordered, mutable: `[-1000, 250, 300]`
- Index from 0; `x[-1]` is the last item
- `append`, `pop`, `len`, `sum`

### Slide 3: Slicing
- `x[start:stop]` includes start, excludes stop
- `x[1:3]` has 2 items
- `x[:k]` and `x[k:]` split without overlap

### Slide 4: Comprehensions
- `[1 + r for r in returns]` growth factors
- `[r for r in returns if r > 0]` filter
- Readable one-line loops

### Slide 5: Dictionaries
- Key → value lookup table
- `d["A"]` (KeyError if missing) vs `d.get("BB", default)`
- Loop with `.items()`

### Slide 6: Tuples
- Immutable: `("ACME", "BUY", 200, 52.10)`
- Unpack: `ticker, side, qty, px = trade`
- Used for multiple return values

### Slide 7: Worked Example - Portfolio Weights
- Values: 10,420 / 18,450 / 5,065
- Total USD 33,935
- Weights 30.71% / 54.37% / 14.93%

### Slide 8: Aliasing vs Copying
- `b = a` creates a second label, not a copy
- Edit through `b` changes `a`
- Use `a.copy()` for scenarios

### Slide 9: Which Structure?
- Ordered series → list
- Lookup by name → dict
- Fixed record → tuple

### Slide 10: Traps
- Off-by-one slices and zero-based indexes
- KeyError on missing keys
- Assigning into a tuple

## Whiteboard examples
1. **Portfolio weights.** 200 ACME × 52.10 = 10,420; 1,000 BETA × 18.45 = 18,450; 50 GAMMA × 101.30 = 5,065. Total = **33,935**. Weights: 10,420/33,935 = **30.71%**, 18,450/33,935 = **54.37%**, 5,065/33,935 = **14.93%** (rounded figures add to 100.01%).
2. **Slicing drill.** `x = [10, 20, 30, 40, 50, 60]`. `x[2:5]` = **[30, 40, 50]**; `x[-2:]` = **[50, 60]**; `x[::2]` = **[10, 30, 50]** (every second item).
3. **Compounding with a comprehension.** Returns 1.2%, -3.4%, 0.5%, -2.1%, 1.8%. Growth factors 1.012, 0.966, 1.005, 0.979, 1.018. Product − 1 = **-2.08%** over the five days, even though the simple sum of returns is -2.0%.

## Questions to ask students
- How many items does `x[3:7]` contain? (4.)
- What is the difference between `d["BB"]` and `d.get("BB")` when "BB" is missing? (The first raises KeyError; the second returns None or the given default.)
- Why use a tuple rather than a list for an executed trade? (It should not change, and immutability prevents accidental edits.)
- After `b = a; b.append(5)`, does `a` contain 5? (Yes, both names point to the same list.)
- Which structure would you use to map credit ratings to spreads? (A dictionary.)

## Analogies
- **A list is a numbered row of lockers starting at locker 0.** You find things by position.
- **A dictionary is a phone book.** You look up by name, not by page number, and it is fast however thick it gets.
- **A tuple is a printed trade confirmation.** You can read it, but you cannot edit it; you issue a new one.

## Recording tips
- Draw the list with index numbers above and below (0..5 and -6..-1) before slicing; it removes most confusion.
- Show aliasing with a diagram of two labels pointing to one box, then run the code.
- Keep the portfolio example on screen and change one price to show the weights update automatically.
