---
title: "Logical Functions: IF, IFS, AND, OR and IFERROR"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a covenant report that says "Pass" for a company with zero EBITDA. How did that happen?
- 02:00 - Logical tests, comparison operators, TRUE = 1 and FALSE = 0
- 04:00 - IF syntax and why the third argument always matters
- 06:00 - AND, OR, NOT and nesting them inside IF
- 08:30 - IFS vs nested IF, and why the order of conditions matters
- 11:00 - IFERROR and IFNA: planned error handling vs cover-ups
- 13:00 - Live build: covenant tester with risk bands
- 16:30 - Traps and recap

## Slides
### Slide 1: Logical Functions
- Decisions inside formulas
- IF, IFS, AND, OR, NOT
- IFERROR and IFNA for error handling

### Slide 2: Logical Tests
- Operators: =, <>, >, <, >=, <=
- Result is TRUE or FALSE
- Text comparisons ignore case
- TRUE = 1, FALSE = 0 in arithmetic

### Slide 3: IF
- =IF(test, value_if_true, value_if_false)
- Results can be numbers, text or calculations
- Missing third argument returns FALSE

### Slide 4: AND, OR, NOT
- AND: all tests TRUE
- OR: at least one TRUE
- NOT: flips the result
- Usually wrapped in IF

### Slide 5: From Nested IF to IFS
- Nested: =IF(B2<2,"Low",IF(B2<3.5,"Moderate","High"))
- IFS: =IFS(B2<2,"Low",B2<3.5,"Moderate",TRUE,"High")
- Returns the first TRUE result

### Slide 6: Order Matters in IFS
- Most restrictive condition first
- Greater-or-equal tiers: largest threshold first
- End with TRUE as a catch-all, or risk #N/A

### Slide 7: IFERROR and IFNA
- IFERROR catches every error type
- IFNA catches only #N/A (safer for lookups)
- Errors are information: do not bury them

### Slide 8: Covenant Tester
- Leverage ≤ 3.5 and coverage ≥ 4.0
- =IFERROR(IF(AND(B2/C2<=3.5,C2/D2>=4),"Pass","Breach"),"Check data")
- Borrower 1: 3.23 and 4.64 → Pass

### Slide 9: Breach and Bad Data
- Borrower 2: 4.00 and 3.75 → Breach
- Borrower 3: EBITDA 0 → #DIV/0! → "Check data"
- A message that prompts action

### Slide 10: Risk Bands with IFS
- =IFS(B2/C2<2,"Low",B2/C2<3.5,"Moderate",TRUE,"High")
- 3.23 → Moderate; 4.00 → High

### Slide 11: Traps Recap
- Wrong IFS order; missing TRUE
- Chained comparisons are not allowed
- Numbers in quotes compare as text
- Blanket IFERROR(...,0)

## Whiteboard examples
**Example 1 - Covenant tester.** Net debt 420, EBITDA 130, interest 28: leverage = 420/130 = 3.23 (≤ 3.5, TRUE), coverage = 130/28 = 4.64 (≥ 4, TRUE) → Pass. Net debt 300, EBITDA 75, interest 20: leverage = 4.00 (FALSE), coverage = 3.75 (FALSE) → Breach. EBITDA 0: division error → IFERROR → "Check data".

**Example 2 - Commission tiers, right and wrong order.** Sales 180,000. Correct: `=IFS(B2>=250000,5%,B2>=150000,4%,B2>=50000,3%,TRUE,0)*B2` → 4% × 180,000 = 7,200. Wrong order: `=IFS(B2>=50000,3%,B2>=150000,4%,B2>=250000,5%,TRUE,0)*B2` → first test already TRUE → 3% × 180,000 = 5,400. Same inputs, 1,800 difference.

**Example 3 - Boolean arithmetic.** `=(B2>100)*50` with B2 = 120 returns 1 × 50 = 50; with B2 = 80 returns 0 × 50 = 0. Show this as a compact alternative to `IF(B2>100,50,0)`, but note the IF version is clearer for reviewers.

## Questions to ask students
- What does IF return if the test is FALSE and you omitted the third argument? (FALSE.)
- AND(TRUE, FALSE, TRUE) returns what? (FALSE.)
- Why should the 250,000 tier be tested before the 50,000 tier in an IFS with ">=" conditions? (IFS stops at the first TRUE; a large value would otherwise stop at the lowest tier.)
- What happens in IFS if no condition is TRUE and there is no catch-all? (#N/A.)
- Why prefer IFNA over IFERROR around a lookup? (IFNA only hides "not found"; other errors such as #NAME? or #REF! remain visible.)

## Analogies
- IFS is a bouncer checking a guest list from the top: the first rule you match decides your fate, and nobody reads further down.
- AND is a series circuit (every switch must be on); OR is a parallel circuit (any switch lights the bulb).
- IFERROR is a smoke-detector silencer: useful when you know it is just toast, dangerous if you leave it on permanently.

## Recording tips
- Use Formulas > Evaluate Formula on the covenant cell to step through AND and IF live; students love seeing each piece resolve.
- Show the wrong-order IFS result next to the right one; the 1,800 difference makes the point stick.
- Keep the zero-EBITDA borrower in the example; it motivates IFERROR better than any definition.
