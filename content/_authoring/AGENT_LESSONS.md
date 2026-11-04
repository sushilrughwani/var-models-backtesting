# Brief for lesson-writing agents

You are writing original teaching content for a paid online finance exam-prep platform. The repo is `/home/user/var-models-backtesting`. The instructor will use your teaching kits to record lectures, and students will study from your notes. Quality and accuracy matter more than speed.

## Read first
1. `content/_authoring/SPEC.md` - exact file formats (mandatory, follow precisely).
2. `content/courses/<course>/course.json` - lesson titles and summaries. Use the lesson `title` exactly; match the scope described by `summary` and the module.

## For EACH lesson slug assigned to you, create 3 files
- `content/courses/<course>/lessons/<slug>.md` - student notes, 600-900 words, exact H2 headings from SPEC.
- `content/courses/<course>/kits/<slug>.md` - instructor teaching kit, exact H2 headings, 8-15 slides, timestamped outline.
- `content/courses/<course>/quizzes/<slug>.json` - 4 quiz questions (3-5 allowed) using the Question format, each with `"lesson": "<slug>"`, rationale for every option, and `verify` + `numericAnswer` + `tolerance` for numeric questions. CFA courses use exactly 3 options; FRM and skill courses use exactly 4. Quiz ids: `q-<courseShort>-<slug>-<n>`.

## Quality bar
- Original wording only. Do not reproduce CFA Institute / GARP curriculum text, official questions or Learning Outcome Statements.
- Explain like the best instructor the student ever had: intuition, then formula (KaTeX), then a worked example with every step, then exam traps.
- Every number must be computed with code before you write it (run `node -e '...'` or `python3 -c '...'`). Never guess.
- Teaching kits must be genuinely useful for recording: realistic timestamps adding up to the `duration`, slide bullets that could be pasted into a deck, whiteboard examples with full solutions, questions with expected answers, memorable analogies.
- Lessons should build on earlier lessons in the course and stay within the lesson's scope.
- Python lessons: include runnable code using only the standard library, numpy, pandas, scipy, matplotlib or statsmodels. Excel lessons: show exact formulas.

## Validate (required) - fix every error before finishing
```
npx tsx scripts/validate-content.ts <course> <slug1> <slug2> ...
npx tsx scripts/verify-questions.ts content/courses/<course>/quizzes/<slug>.json ...
```
Fix word-count warnings too (target 600-900 words of notes).

## Rules
- Only create or modify files for your assigned lessons. Do not touch any other file.
- Do NOT run git, `npm install`, `npm run build` or `npm run dev`.
- Your final reply must be SHORT (under 80 words): the number of lessons completed, and any problem you could not fix. Do not paste content into the reply.
