# Content Authoring Specification

This file defines the exact formats for everything under `/content`. The app and the validation scripts depend on these formats. Follow them precisely.

## Golden rules

1. **Original only.** Write every sentence in your own words. Never copy or closely paraphrase CFA Institute or GARP curriculum text, official/sample questions, or Learning Outcome Statements. Do not write "LOS" or quote any official reading text. Topic names that are generic finance terms are fine.
2. **Accuracy first.** Every formula and every number must be correct. For numeric work, compute values with code (e.g. `node -e "..."` or python3) before writing them. Never guess a number.
3. **Teaching quality.** Write like an excellent instructor: intuition first, then the formula, then a worked example, then traps.
4. **No fake social proof.** Never invent statistics like pass rates or student counts.
5. **Math:** use KaTeX syntax. In Markdown files: inline `$...$`, display `$$...$$` on their own lines. Do not use `\(` `\)` or `\[` `\]`. Do not use `\begin{align}` (use `\begin{aligned}` inside `$$`). Dollar amounts in prose: write `USD 100` or `100 dollars` or `\$100` - never a bare `$` followed by a number in Markdown, because it would start a math span. Indian rupees: write `INR 1,000`.
6. **JSON escaping:** inside JSON strings a LaTeX backslash MUST be doubled (`"\\frac{a}{b}"`). A single backslash like `"\frac"` silently becomes a form-feed character and breaks validation. Prefer plain text / Unicode (σ, β, √, ×, ≈) in questions and flashcards; use `$...$` math there only when it truly helps. Inside JSON, `$...$` math is rendered too, so currency in JSON strings must also be written as `USD 100` (never a bare `$100`).

## Directory layout

```
content/
  courses/<courseSlug>/course.json          # structure (modules + lesson metadata)
  courses/<courseSlug>/lessons/<lessonSlug>.md   # student notes
  courses/<courseSlug>/kits/<lessonSlug>.md      # instructor teaching kit
  courses/<courseSlug>/quizzes/<lessonSlug>.json # end-of-lesson quiz (array of Question)
  questions/<courseSlug>/<topicSlug>.json   # question bank (array of Question)
  flashcards/<courseSlug>/<topicSlug>.json  # flashcards (array of Flashcard)
  mocks/<mockId>.json                       # mock exam definitions
  blog/<slug>.md                            # blog articles
  formulas/index.ts                         # formula library (TypeScript)
```

`<topicSlug>` is always the `slug` of a module in that course's `course.json`.

## 1. Student lesson notes - `lessons/<lessonSlug>.md`

600-900 words of body text (not counting formulas). Structure (use exactly these H2 headings, in this order):

```markdown
---
title: "Lesson title (same as course.json)"
---

## Learning goals
- 3-5 bullets, starting with a verb ("Calculate...", "Explain...", "Distinguish...").

## Explanation
Clear teaching prose with H3 subsections (### ...). Intuition first, then formulas in $$...$$.
Define every variable after a formula.

## Worked example
A fully worked numeric (or for qualitative topics: a scenario-based) example, step by step,
with every intermediate number shown and the final answer in **bold**.

## Common exam traps
- 3-5 bullets of specific mistakes candidates make.

## Key takeaways
- 4-6 crisp bullets.
```

For Python lessons, include fenced code blocks with ```python. For Excel lessons, show formulas in backticks, e.g. `=PMT(B2/12, B3*12, -B1)`.

## 2. Instructor teaching kit - `kits/<lessonSlug>.md`

Used by the instructor to record lectures. Not visible to students. Structure (exact H2 headings):

```markdown
---
title: "Lesson title"
duration: 35          # estimated lecture length in minutes (integer)
---

## Lecture outline
- 00:00 - Hook: ...
- 03:00 - ...
(6-10 timestamped segments that add up to the duration)

## Slides
### Slide 1: Title of slide
- bullet
- bullet
### Slide 2: ...
(8-15 slides, each "### Slide N: Title" followed by 2-5 bullets of slide content)

## Whiteboard examples
1-3 examples to work live on the whiteboard, with numbers and the full solution.

## Questions to ask students
- 4-6 questions (with the expected answer in parentheses).

## Analogies
- 2-4 analogies or mental models that make the concept click.

## Recording tips
- 2-3 practical tips (what to emphasise, where students get lost, what to show on screen).
```

## 3. Question format (quizzes and question bank)

A JSON array of objects:

```json
{
  "id": "cfa1-fi-0001",
  "course": "cfa-level-1",
  "topic": "fixed-income",
  "difficulty": "medium",
  "kind": "numeric",
  "stem": "A 3-year annual-pay bond has a 5% coupon and a par value of 100. If the yield to maturity is 6%, the bond's price is closest to:",
  "options": ["97.33", "100.00", "102.72"],
  "answer": "A",
  "explanation": "Discount each cash flow at 6%: 5/1.06 + 5/1.06^2 + 105/1.06^3 = 97.33.",
  "rationale": {
    "A": "Correct. PV of coupons and principal at 6% is 97.33.",
    "B": "Incorrect. A bond trades at par only when the coupon rate equals the yield.",
    "C": "Incorrect. This is roughly the price at a 4% yield; a yield above the coupon means a discount."
  },
  "verify": "const y=0.06; return 5/(1+y)+5/(1+y)**2+105/(1+y)**3;",
  "numericAnswer": 97.33,
  "tolerance": 0.01,
  "tags": ["bond-pricing"]
}
```

Rules:
- `id`: globally unique. Quizzes: `q-<courseShort>-<lessonSlug>-<n>` (e.g. `q-cfa1-time-value-of-money-1`). Bank: `<courseShort>-<topicShort>-<4 digits>`. courseShort: `cfa1`, `cfa2`, `cfa3`, `frm1`, `frm2`, `xl`, `fm`, `py`.
- `options`: CFA courses have exactly 3 options (A-C). FRM courses have exactly 4 (A-D). Skill-course quizzes use 4 options.
- Do NOT write letters inside option text ("A. 97.33" is wrong; "97.33" is right).
- `answer`: letter of the correct option. Vary the position of the correct answer (roughly even spread of A/B/C(/D)).
- `rationale`: one entry for EVERY option, explaining why it is correct or why it is wrong (name the specific mistake that produces each wrong number).
- `kind: "numeric"` whenever the answer is a computed number. Numeric questions MUST include:
  - `verify`: the body of a JavaScript function (no arguments) that computes the exact answer from the inputs in the stem and `return`s a number. Use only plain JS and `Math`. No external libraries. If you need the normal CDF, implement it inline (e.g. an erf approximation) - or prefer questions where the z-value is given in the stem.
  - `numericAnswer`: the number shown in the correct option (same units: if the option says "4.25%", numericAnswer is 4.25 and verify must return 4.25, not 0.0425).
  - `tolerance`: absolute tolerance consistent with the rounding shown in the option (e.g. 0.01 for 2 decimals, 0.5 for whole numbers, 0.005 for a percentage with 2 decimals rounded).
  - The correct option text must contain that number as its first number (commas allowed: "1,234.56"). The validation script parses the first number in the correct option and checks it against `numericAnswer` too.
  - Wrong options should be plausible numbers produced by specific mistakes.
- `kind: "conceptual"` questions have no verify field.
- Mix: about 40-50% numeric where the topic allows (Ethics is almost entirely conceptual - scenario-based).
- `difficulty`: easy / medium / hard. Aim for about 30% easy, 50% medium, 20% hard.
- Ethics questions: write original scenarios with fictional names and firms. Refer to standards generically by subject (e.g. "the standard on duties to clients regarding suitability"), not by quoting text.
- Quiz files additionally set `"lesson": "<lessonSlug>"` on every question.
- `stem` can end with "is closest to:" for numeric CFA-style items, or be a direct question.

## 4. Flashcards - `flashcards/<courseSlug>/<topicSlug>.json`

```json
[{ "id": "fc-cfa1-quant-001", "course": "cfa-level-1", "topic": "quantitative-methods",
   "front": "What does the coefficient of variation measure?",
   "back": "Risk per unit of return: CV = standard deviation / mean. Lower CV = less risk per unit of expected return.",
   "tags": ["statistics"] }]
```
Front: one question or prompt. Back: answer in 1-3 sentences, may include a formula.

## 5. Course structure - `courses/<slug>/course.json`

See existing files for the shape (type `Course` in `lib/data/types.ts`). Lesson slugs are unique within a course and are kebab-case.

## 6. Blog - `blog/<slug>.md`

```markdown
---
title: "..."
excerpt: "One-sentence summary."
date: "2026-11-01"
tags: ["study-strategy", "cfa"]
---
Body in Markdown, 900-1500 words, H2/H3 headings.
```
