---
title: "NumPy Arrays and Vectorised Calculations"
duration: 20
---

## Lecture outline
- 00:00 - Hook: `[1, 2] * 2` vs `np.array([1, 2]) * 2`, and a loop vs vectorised timing on a million numbers
- 02:00 - Creating arrays: `np.array`, `np.arange`, shape and dtype; aliasing with `b = a`
- 04:30 - Vectorised returns with `prices[1:] / prices[:-1] - 1`
- 07:00 - NPV without a loop: discount factors and the `@` dot product
- 09:30 - Boolean masks, counting losses, `np.where`
- 12:00 - 2-D arrays: axis=0 vs axis=1, portfolio returns with `R @ w`, broadcasting
- 15:00 - Live worked example: mean, std (ddof 0 vs 1), cumulative return, annualised vol
- 18:30 - Traps recap and preview of pandas

## Slides
### Slide 1: NumPy Arrays and Vectorised Calculations
- One type, contiguous memory, element-wise maths
- Shorter code that reads like the formula
- Usually much faster than Python loops

### Slide 2: Creating Arrays
- `np.array([100.0, 102.0, 99.5])`
- `np.arange(4)` gives `[0 1 2 3]`
- Check `.shape` and `.dtype`

### Slide 3: Vectorised Returns
- $r_t = P_t / P_{t-1} - 1$
- `prices[1:] / prices[:-1] - 1`
- n prices → n − 1 returns

### Slide 4: NPV Without a Loop
- `t = np.arange(len(cf))`
- `d = (1 + rate) ** -t`
- `npv = cf @ d` (17.63 for our project)

### Slide 5: Boolean Masks
- `r < 0` → array of True/False
- `r[r < 0]` filters; `(r < 0).sum()` counts
- `np.where(cond, a, b)` vectorised if/else

### Slide 6: 2-D Arrays and Axis
- Rows = days, columns = assets
- `axis=0` → one value per asset
- `axis=1` → one value per day

### Slide 7: Portfolio Returns and Broadcasting
- `R @ w` gives each day's portfolio return
- `R - R.mean(axis=0)` demeans every column
- Smaller arrays stretch to match

### Slide 8: Standard Deviation and ddof
- NumPy default `ddof=0` (population)
- Sample: `std(ddof=1)` divides by n − 1
- pandas defaults to ddof=1: be explicit

### Slide 9: Worked Example
- Mean 1.1305%; std 2.1896% (pop) vs 2.5283% (sample)
- Cumulative 4.5% = 104.5/100 − 1
- Annualised vol ≈ 40.14%

### Slide 10: Traps
- Shape mismatch from bad slices
- Wrong axis
- Integer dtype truncation; aliasing and views

## Whiteboard examples
1. **Returns by hand.** Prices 100, 102, 99.5, 101, 104.5. Returns: 102/100 − 1 = **2.00%**; 99.5/102 − 1 = **−2.45%**; 101/99.5 − 1 = **1.51%**; 104.5/101 − 1 = **3.47%**. Mean = 0.04522/4 = **1.1305%**.
2. **ddof matters for small samples.** Same returns: squared deviations sum to about 0.0019177. Divide by 4 → variance 0.00047942, std **2.1896%**. Divide by 3 → variance 0.00063922, std **2.5283%**. Annualise sample std: 0.025283 × √252 = **40.14%**.
3. **Portfolio return via dot product.** Day-1 returns 1.0%, 0.2%, −0.4% with weights 0.5, 0.3, 0.2: 0.005 + 0.0006 − 0.0008 = **0.48%**.

## Questions to ask students
- How many returns do 250 prices produce? (249.)
- What does `(r < 0).sum()` compute? (The number of negative returns, because True counts as 1.)
- On a days × assets array, which axis gives per-asset means? (axis=0.)
- Why might `a[0] = 0.5` store 0 in an array? (The array has an integer dtype, so the value is truncated.)
- What is the NumPy default for `std()`: sample or population? (Population, ddof=0.)

## Analogies
- **Vectorisation is a stamp, a loop is a pen.** A loop writes each value by hand; an array operation stamps the whole sheet at once.
- **Slicing for returns is sliding a ruler by one row.** Lay "today" over "yesterday" and divide line by line.
- **Broadcasting is a template.** One row of column means is copied down to every row automatically.

## Recording tips
- Time a pure-Python loop vs a NumPy expression on 1,000,000 numbers with `%timeit` in the notebook; the speed difference sells the lesson.
- Draw the two shifted arrays (`prices[1:]` over `prices[:-1]`) before running the code.
- Print shapes often; saying "shape (4,)" out loud trains students to debug shape errors themselves.
