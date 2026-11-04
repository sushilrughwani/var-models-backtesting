---
title: "Formatting Conventions for Financial Work"
duration: 16
---

## Lecture outline
- 00:00 - Hook: the same income statement shown badly formatted and well formatted. Which error can you spot in 5 seconds?
- 02:00 - Three questions every number must answer: unit, input or formula, sign
- 03:30 - Number format conventions: amounts, negatives, percentages, multiples, dates
- 06:00 - Colour conventions: blue, black, green, red
- 08:00 - Custom number formats: the four sections and building blocks
- 10:30 - Live build: income statement extract in USD thousands, then millions
- 13:30 - Displayed vs stored values and why totals do not foot
- 15:00 - Traps and recap

## Slides
### Slide 1: Formatting Conventions for Financial Work
- Formatting is communication
- Units, inputs vs formulas, signs
- Readers should never need the formula bar to understand a number

### Slide 2: Number Format Conventions
- Thousands separators; units stated once in headers
- Negatives in parentheses: (7,890)
- Percentages 0.0%; multiples 0.0x
- Periods labelled 2025A, 2026E

### Slide 3: Percent Pitfall
- 7.5% is stored as 0.075
- Typing 7.5 into a percent cell gives 750%
- Formulas use the stored value, not the display

### Slide 4: Colour Conventions
- Blue: hard-coded inputs and historical data
- Black: formulas on the same sheet
- Green: links to other sheets
- Red: external links or failed checks

### Slide 5: Layout Habits
- Right-align numbers so decimals line up
- Center Across Selection instead of merging
- Light fill for input cells, documented on a cover sheet

### Slide 6: Custom Formats - Four Sections
- positive ; negative ; zero ; text
- Example: #,##0;(#,##0);"-"
- Open with Ctrl+1, Custom

### Slide 7: Building Blocks
- 0 forces a digit, # optional digit
- Trailing comma scales by 1,000; two commas by 1,000,000
- Quoted text is literal: 0.0"x", 0"E"

### Slide 8: Live Example - Thousands
- Revenue 12,456,700 → 12,457
- COGS −7,890,250 → (7,890)
- Gross profit 4,566,450 → 4,566; margin 36.7%

### Slide 9: Why the Total Does Not Foot
- Displayed 12,457 − 7,890 = 4,567, but the sheet shows 4,566
- Each display is rounded on its own
- Fix: a rounding note, or ROUND in published tables

### Slide 10: Switching to Millions
- #,##0.0,,;(#,##0.0,,)
- 12.5, (7.9), 4.6
- Zero formula changes needed

### Slide 11: Traps Recap
- Percent entry errors
- Dividing by 1,000 in formulas instead of formatting
- Wrong section order; blue formulas

## Whiteboard examples
**Example 1 - Income statement in thousands.** Revenue 12,456,700, COGS −7,890,250. Gross profit = 12,456,700 − 7,890,250 = 4,566,450. With `#,##0,;(#,##0,);"-"`: 12,457, (7,890), 4,566. Margin = 4,566,450 / 12,456,700 = 0.36659 → 36.7%. Then show the footing gap: 12,457 − 7,890 = 4,567 ≠ 4,566.

**Example 2 - Displayed sum.** A1:A3 each hold 2.4 with zero-decimal format, so each shows 2. `=SUM(A1:A3)` stores 7.2 and shows 7. With `=ROUND(A1,0)` in helper cells, the sum is 2 + 2 + 2 = 6 and the table foots.

**Example 3 - Read the format.** Value −2,500 with format `#,##0;(#,##0);"-"` shows (2,500). Value 0 shows a dash. Value 4,876,250 with `#,##0.0,,` shows 4.9.

## Questions to ask students
- What does blue font tell a reviewer? (The cell is a hard-coded input or historical value, not a formula.)
- What does a single trailing comma in a number format do? (Scales the display by 1,000.)
- In a four-section custom format, which section is applied to zero values? (The third.)
- A cell displays 7.5% and you use it in a formula; what value does Excel use? (0.075.)
- Why might a column of displayed numbers not add to the displayed total? (Each cell is rounded for display separately; stored values are exact.)

## Analogies
- Formatting is the clothing a number wears: it changes how it looks, never who it is.
- The colour convention is a traffic-light system for reviewers: blue means "someone typed this, check the source", black means "this follows from the logic".
- A trailing comma is a zoom-out lens: the picture is the same, you just see it at a different scale.

## Recording tips
- Show the formula bar next to the formatted cell whenever you change a format, so viewers see the stored value is unchanged.
- Type the custom format codes slowly and read each section aloud; students lose track of the semicolons.
- Put the bad-vs-good income statement side by side for the hook; it sells the whole lesson.
