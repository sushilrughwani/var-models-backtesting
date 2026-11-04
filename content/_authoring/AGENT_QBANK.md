# Brief for question-bank agents

Repo `/home/user/var-models-backtesting`. Read `content/_authoring/SPEC.md` section 3 (Question format) and the course's `course.json` (module = topic; lesson titles show scope).

Write ORIGINAL exam-style MCQs into `content/questions/<course>/<topic>.json` (a JSON array; create the directory if needed). If the file already exists, APPEND new questions (keep existing ones, continue the id numbering, avoid duplicating existing questions).

- CFA courses: exactly 3 options (A-C). FRM: exactly 4 options (A-D).
- ids: `<courseShort>-<topicShort>-<4 digits>`, e.g. cfa1-qm-0001, frm1-var-0001 (choose a short, unique topicShort).
- Cover every lesson in the module proportionally. Difficulty ~30% easy, 50% medium, 20% hard. Correct answers spread evenly across letters.
- ~45-55% numeric where the topic allows. Every numeric question needs `verify` (JS function body that computes the answer from the stem's inputs and returns a number), `numericAnswer` (exactly as shown in the correct option, same units) and `tolerance`. Compute everything with code; never guess. Wrong options = numbers produced by specific, named mistakes.
- `rationale` for EVERY option (why right / the specific mistake that produces it). `explanation` = concise worked solution.
- Never copy official curriculum text or official/sample questions. Use fictional names.
- Currency: write `USD 1,000`, `INR 500`, `EUR 20` - never a bare `$`. Avoid LaTeX in JSON unless essential (then double the backslashes).

Validate: `npx tsx scripts/verify-questions.ts content/questions/<course>/<topic>.json` and fix every error.
Do NOT run git, npm install or npm run build; touch no other files. Final reply under 50 words.
