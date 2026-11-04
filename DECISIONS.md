# DECISIONS

Choices made during the unattended build, each with a short reason.

1. **Repository.** The platform is built at the root of this repository, on branch `claude/vibrant-fermi-ghsaxj`. The existing VaR notebook stays where it is and has no effect on the app. The old Python `.gitignore` ignored `lib/`, so it was replaced with a Node/Next.js one.
2. **Framework versions.** Next.js 16 (App Router), React 19, Tailwind CSS v4 (configured CSS-first through `@tailwindcss/postcss`), TypeScript in strict mode.
3. **Content formats.**
   - Lesson notes and teaching kits are Markdown files with YAML frontmatter. Markdown keeps LaTeX readable, because backslashes need no escaping.
   - Quizzes, the question bank, flashcards and mocks are JSON, so they map directly onto future database rows and onto admin import/export.
   - The formula library is TypeScript using `String.raw`, so LaTeX needs no escaping.
   - A content test fails on stray control characters in JSON strings, which catches mistakes like `\frac` turning into a form feed.
4. **Question verification.** Numeric questions carry `verify` (a JavaScript function body as a string that returns a number) and `numericAnswer`. `scripts/verify-questions.ts` runs each `verify`. It checks that the result matches `numericAnswer`, and that the number in the correct option's text matches too.
5. **Topics.** A module's `slug` is the topic key used by questions, flashcards and analytics. Weak-topic detection therefore works per module.
6. **Admin edits.** Course builder and question manager edits are saved in localStorage as a draft workspace, then exported as JSON to commit into `/content`. Student pages read the committed `/content` files, not the drafts. A real database removes this split later.
7. **Access control (mock).** Route guards and paywalls run client-side only. Paid lesson HTML is still sent to the browser. HANDOVER.md explains the server-side enforcement that is required.
8. **Rendering.** Public, course and lesson pages are statically generated from `/content` at build time.
9. **Placeholders.** The brand name stays literally `[BRAND NAME]` and the instructor `[INSTRUCTOR NAME]`, as instructed. Both live only in `config/site.ts`.
10. **Mock exams.** Half-length CFA Level I mock: 90 questions in 135 minutes (2 sessions of 45). Half-length FRM Part I mock: 50 questions in 120 minutes. Mock questions are drawn from the bank, as the brief specifies.
