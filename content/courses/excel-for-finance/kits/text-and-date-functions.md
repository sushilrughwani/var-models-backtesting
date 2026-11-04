---
title: "Text and Date Functions"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a report title that reads "Period ending 45747". What went wrong?
- 02:00 - Cleaning text: TRIM, PROPER, case functions, SUBSTITUTE, VALUE
- 04:30 - Splitting text by position with LEFT, MID, RIGHT and FIND
- 07:00 - Joining text: ampersand, TEXTJOIN, and TEXT for formatting numbers and dates
- 09:00 - Dates are serial numbers: DATE, YEAR/MONTH/DAY, subtracting dates
- 11:00 - EOMONTH vs EDATE, NETWORKDAYS, WORKDAY, YEARFRAC
- 13:30 - Live build: split a position code and build a quarter-end schedule with labels
- 16:30 - Traps and recap

## Slides
### Slide 1: Text and Date Functions
- Clean imported data
- Build readable labels
- Generate reliable period schedules

### Slide 2: Cleaning Text
- TRIM: strip and collapse spaces
- PROPER / UPPER / LOWER for case
- SUBSTITUTE to replace; VALUE to convert to a number

### Slide 3: Splitting by Position
- LEFT, RIGHT, MID extract characters
- FIND returns a separator's position (SEARCH ignores case)
- Cut relative to FIND, not to a fixed count

### Slide 4: Joining Text
- Ampersand: =A2&" - "&B2
- TEXTJOIN(", ", TRUE, range) skips blanks
- TEXT(0.0425,"0.00%") → "4.25%"

### Slide 5: Dates Are Numbers
- 1 Jan 2025 = 45658; 15 Mar 2025 = 45731
- Subtract dates to get days
- Joining a raw date to text shows the serial

### Slide 6: Core Date Functions
- DATE, YEAR, MONTH, DAY, TODAY
- EDATE: move by months, same day number
- EOMONTH: last day of the target month

### Slide 7: EDATE vs EOMONTH
- EDATE(30-Apr-2025, 1) = 30-May-2025
- EOMONTH(30-Apr-2025, 1) = 31-May-2025
- Use EOMONTH for period ends

### Slide 8: Business Days and Year Fractions
- NETWORKDAYS counts weekdays, both ends included
- WORKDAY returns a date n business days away
- YEARFRAC(start, end, 3) = actual/365

### Slide 9: Live Example - Split a Code
- "ACME-2030-USD": FIND("-") = 5
- LEFT → ACME; VALUE(MID) → 2030; RIGHT → USD
- PROPER(TRIM("  acme   corp  ")) → Acme Corp

### Slide 10: Live Example - Quarter Ends
- Close 15-Mar-2025; EOMONTH(close, 0) = 31-Mar-2025
- Then EOMONTH(prev, 3): 30-Jun, 30-Sep, 31-Dec
- Stub = 16 days; YEARFRAC to year-end = 0.7973

### Slide 11: Traps Recap
- Dates and percentages joined without TEXT
- EDATE drift off month-end
- MID returns text; non-breaking spaces survive TRIM

## Whiteboard examples
**Example 1 - Split a code.** A2 = "ACME-2030-USD". FIND("-",A2) = 5. LEFT(A2,5−1) = "ACME". MID(A2,6,4) = "2030" (text) → VALUE → 2030. RIGHT(A2,3) = "USD". Then try "BETAINC-2032-EUR": FIND gives 8, LEFT takes 7 characters = "BETAINC", showing why FIND beats a fixed count.

**Example 2 - Quarter-end schedule.** Close date 15-Mar-2025 (serial 45731). EOMONTH(close,0) = 31-Mar-2025 (45747). Stub days = 45747 − 45731 = 16. Next ends: 30-Jun-2025 (45838), 30-Sep-2025 (45930), 31-Dec-2025 (46022). YEARFRAC(close, 31-Dec-2025, 3) = (46022 − 45731)/365 = 291/365 = 0.7973.

**Example 3 - Labels.** `="Q"&ROUNDUP(MONTH(D1)/3,0)&"-"&YEAR(D1)` for 30-Sep-2025: MONTH = 9, 9/3 = 3 → "Q3-2025". `="Period ending "&D1` → "Period ending 45930"; fix with `TEXT(D1,"dd-mmm-yyyy")` → "Period ending 30-Sep-2025".

## Questions to ask students
- What does `=DATE(2025,3,31)-DATE(2025,3,15)` return? (16.)
- What is `EOMONTH(DATE(2024,1,15),1)`? (29-Feb-2024, because 2024 is a leap year.)
- Why does "Period ending "&D1 show a five-digit number? (Dates are stored as serial numbers; joining drops the format, so wrap in TEXT.)
- MID returns "2030"; can you add 1 to it directly in all cases? (It is text; Excel may coerce it in arithmetic, but lookups and comparisons treat it as text, so wrap in VALUE.)
- Which function would you use to find a settlement date two business days after trade date? (WORKDAY(trade_date, 2, holidays).)

## Analogies
- A date in Excel is a page number in a giant diary that started in 1900; the formatting just prints the heading on the page.
- FIND is a bookmark: once you know where the dash is, you can cut anywhere relative to it.
- EOMONTH is a magnet that snaps every date to the end of its month.

## Recording tips
- Change a date cell to General format on screen so viewers see the serial number appear; it demystifies everything afterwards.
- Build the split-code formulas step by step, putting FIND in its own helper cell first.
- Mention that date entry depends on regional settings, which is why DATE(y,m,d) is safer in shared models.
