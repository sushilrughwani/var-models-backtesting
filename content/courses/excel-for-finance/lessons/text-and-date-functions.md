---
title: "Text and Date Functions"
---

## Learning goals
- Clean and split messy text with TRIM, PROPER, LEFT, MID, RIGHT, FIND and SUBSTITUTE.
- Build readable labels by joining text, numbers and dates with `&`, TEXT and TEXTJOIN.
- Explain how Excel stores dates as serial numbers and calculate day counts.
- Generate month-end and quarter-end schedules with EOMONTH and EDATE.

## Explanation

### Text functions: cleaning imported data
Data pulled from systems and PDFs often arrives with stray spaces, inconsistent capitals and several fields jammed into one cell. The core toolkit:

- `TRIM(text)` removes leading and trailing spaces and collapses repeated inner spaces to one.
- `UPPER`, `LOWER`, `PROPER` change case; `PROPER("acme corp")` gives "Acme Corp".
- `LEFT(text, n)`, `RIGHT(text, n)`, `MID(text, start, n)` extract characters by position.
- `LEN(text)` counts characters; `FIND(find, text)` returns the position of a substring (case-sensitive; `SEARCH` is the case-insensitive version).
- `SUBSTITUTE(text, old, new)` replaces text, for example removing thousands separators from a number imported as text.
- `VALUE(text)` converts a numeric-looking string into a real number.

FIND is what makes splitting flexible: instead of assuming a code always has four letters, find the position of the separator and cut relative to it.

### Joining text
The ampersand joins anything: `=A2&" - "&B2`. `TEXTJOIN(", ", TRUE, A2:A10)` joins a range with a delimiter and skips blanks. When a number or date joins text, it loses its formatting, so wrap it in `TEXT(value, format)`: `TEXT(0.0425,"0.00%")` gives "4.25%".

### How Excel stores dates
A date is just a number: the count of days since the start of 1900, so 1 January 2025 is 45658 and 15 March 2025 is 45731. Formatting makes it look like a date. This has two consequences. Subtracting two dates gives the number of days between them. And joining a date to text without TEXT exposes the raw serial number.

Key date functions:
- `DATE(year, month, day)` builds a date safely (better than typing a date string that depends on regional settings).
- `YEAR`, `MONTH`, `DAY` take a date apart; `TODAY()` returns the current date and updates every day.
- `EDATE(date, months)` moves forward or back a number of months, keeping the day number where possible.
- `EOMONTH(date, months)` returns the **last day** of the month that many months away; `EOMONTH(date, 0)` is the end of the current month.
- `NETWORKDAYS(start, end, [holidays])` counts weekdays, including both endpoints; `WORKDAY(start, days, [holidays])` returns a date a number of business days away.
- `YEARFRAC(start, end, basis)` gives the fraction of a year between two dates; basis 3 is actual/365.

### EDATE vs EOMONTH
Financial periods end on month-ends, which do not all share a day number. `EDATE(DATE(2025,4,30),1)` gives 30 May, which is not a month-end, while `EOMONTH(DATE(2025,4,30),1)` gives 31 May. For period-end schedules, EOMONTH is the safe choice.

## Worked example
A deal team pastes position codes such as "ACME-2030-USD" into A2 and the issuer name "  acme   corp  " into B2. The deal closed on 15 March 2025 (C1 contains `=DATE(2025,3,15)`).

**Step 1 - split the code.** `FIND("-",A2)` returns 5.
- Issuer ticker: `=LEFT(A2, FIND("-",A2)-1)` takes 5 − 1 = 4 characters: **ACME**.
- Maturity year: `=VALUE(MID(A2, FIND("-",A2)+1, 4))` starts at position 6 and takes 4 characters: **2030** as a number.
- Currency: `=RIGHT(A2, 3)`: **USD**.

**Step 2 - clean the name.** `=PROPER(TRIM(B2))`: TRIM gives "acme corp", PROPER gives **Acme Corp**.

**Step 3 - quarter-end schedule.** First period end in D1: `=EOMONTH(C1, 0)` returns 31-Mar-2025 (serial 45747). In E1: `=EOMONTH(D1, 3)` filled right gives 30-Jun-2025, 30-Sep-2025 and 31-Dec-2025.

**Step 4 - stub period length.** `=D1-C1` = 45747 − 45731 = **16 days**.

**Step 5 - year fraction to year-end.** `=YEARFRAC(C1, DATE(2025,12,31), 3)`: days = 46022 − 45731 = 291, so 291 / 365 = **0.7973**.

**Step 6 - labels.** `="Q"&ROUNDUP(MONTH(D1)/3,0)&"-"&YEAR(D1)` gives "Q1-2025", and `="Period ending "&TEXT(D1,"dd-mmm-yyyy")` gives "Period ending 31-Mar-2025". Without TEXT the second label would read "Period ending 45747".

## Common exam traps
- Joining a date or percentage to text without TEXT, producing a serial number or a long decimal in the label.
- Using EDATE for month-end schedules and drifting off month-end after a 30-day month.
- Forgetting that LEFT, MID and RIGHT return text: "2030" from MID will not behave as a number until wrapped in VALUE.
- Assuming TRIM removes every invisible character; non-breaking spaces from web data need SUBSTITUTE with `CHAR(160)`.
- Off-by-one day counts: `end − start` excludes the start day, whereas NETWORKDAYS counts both ends.

## Key takeaways
- TRIM and PROPER tidy imported names; FIND makes LEFT and MID splits flexible.
- Use `&` or TEXTJOIN to build labels and TEXT to control how numbers and dates appear in them.
- Dates are serial numbers, so subtracting dates gives days.
- EOMONTH builds reliable month-end and quarter-end schedules.
- YEARFRAC converts a date range into a fraction of a year for accruals.
