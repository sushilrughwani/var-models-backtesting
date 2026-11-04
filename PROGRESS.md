# PROGRESS

Resume rule: read this file and DECISIONS.md first, then continue from the first unchecked item.

## Phase 0 - Setup
- [x] Next.js + TypeScript (strict) + Tailwind + KaTeX + Vitest + recharts + lucide-react scaffold
- [x] /config/site.ts (brand, instructor, contact, socials, palette, prices INR + USD)
- [x] /lib/data repository layer (local implementation reading /content)
- [x] /lib/storage interface (localStorage, try/catch everywhere)
- [x] Content format spec (content/_authoring/SPEC.md) + course structure files

## Phase 1 - Design system and public site
- [x] Design system: typography, colors, buttons, inputs, cards, badges, tabs, accordions, modals, toasts, tables
- [x] /styleguide page
- [x] Layouts: public (header/footer), student (sidebar), instructor (sidebar)
- [x] Light/dark mode toggle
- [x] Home page (hero, exams/courses, how it works, features, instructor, labeled sample testimonials, FAQ, CTA)
- [x] Course catalog with filters (CFA / FRM / Skills, level)
- [x] Course detail page (overview, who for, curriculum accordion, instructor, pricing tiers, FAQ, free preview)
- [x] Pricing page (Self-Study, Premium, Bundle) with INR/USD toggle
- [x] About, Contact (mock form), Free Resources hub, Blog index + post pages
- [x] Legal pages (Terms, Privacy, Refund) marked TEMPLATE
- [x] Footer trademark disclaimer
- [x] 404 page
- [x] Mock auth (Guest/Student/Instructor role switcher) + route guards
- [x] Mock payments (checkout, coupons, plan selection) + toasts
- [ ] Build passes + commit

## Phase 2 - Student platform
- [ ] Dashboard (enrolled courses + progress, continue, streak, weak topics, weekly plan)
- [x] Course player (sidebar, video placeholder, KaTeX notes, takeaways, resources, mark complete, prev/next, personal notes, bookmarks)
- [x] End-of-lesson quiz with instant feedback
- [ ] Question bank (filters, practice mode, timed mode, flags, review incorrect, analytics charts)
- [ ] Mock exams (timed, section-based, topic report)
- [ ] Flashcards (SM-2, decks, daily queue)
- [ ] Formula library (search, grouped, KaTeX, variables, intuition, calculator link)
- [ ] Study planner (exam date + hours/week -> weekly plan)
- [x] Lesson Q&A / discussion UI (sample threads, INTEGRATION marker)
- [ ] Profile/settings page
- [ ] Certificate page (printable template)
- [ ] Build passes + commit

## Phase 3 - Instructor admin
- [ ] Overview dashboard (DEMO analytics)
- [ ] Course builder (CRUD courses/modules/lessons, reorder, publish, free preview, local save, JSON export/import)
- [ ] Question bank manager (CRUD, tags, difficulty, JSON + CSV import/export)
- [ ] Teaching kit viewer (by course/lesson, printable)
- [ ] Students list (mock), coupon manager (mock), announcement composer (mock), pricing editor
- [ ] Initial README.md, HANDOVER.md, CONTENT_GUIDE.md
- [ ] Build passes + commit

## Phase 4 - Financial calculators (30, each with KaTeX formula, inputs, result, explanation, Vitest tests)
- [x] TVM (PV/FV/PMT/N/rate)
- [x] NPV and IRR
- [x] Holding period and annualized return
- [x] Arithmetic vs geometric mean
- [x] Two-asset portfolio return and risk
- [x] Risk-adjusted performance (Sharpe, Treynor, Sortino, Jensen's alpha, information ratio)
- [x] CAPM
- [x] WACC
- [x] FCFF DCF valuation
- [x] Gordon growth model
- [x] Bond price and YTM
- [x] Duration & convexity (Macaulay, modified, convexity, price change approximation)
- [x] Forward rates from spot rates
- [x] Forward/futures pricing with cost of carry
- [x] FRA valuation
- [x] Black-Scholes with Greeks
- [x] n-step binomial option pricing
- [x] Put-call parity checker
- [x] Parametric VaR
- [x] Historical VaR (sample data)
- [x] Expected Shortfall
- [x] Two-asset portfolio VaR
- [x] EWMA volatility
- [x] GARCH(1,1) forecast
- [x] Expected loss (PD x LGD x EAD)
- [x] Hazard rate from credit spread
- [x] z/t hypothesis test
- [x] DuPont analysis
- [x] Loan amortization schedule
- [x] Covered interest rate parity forward
- [x] All calculator tests pass + build + commit

## Phase 5 - Core content
- [x] CFA Level I: structure (~90 lessons) + notes + teaching kits + quizzes
- [x] FRM Part I: structure (~60 lessons) + notes + teaching kits + quizzes
- [x] Excel for Finance (~15 lessons) full
- [x] Financial Modeling and Valuation (~20 lessons) full
- [x] Python for Finance (~20 lessons, code examples) full
- [x] Skeletons: CFA Level II, CFA Level III, FRM Part II
- [x] Question bank: 250 CFA L1 (A-C) + 150 FRM I (A-D), rationale for every option
- [x] 300 flashcards
- [ ] Half-length CFA L1 mock + half-length FRM I mock
- [x] Printable formula sheets per topic
- [x] 6 blog articles
- [ ] Build passes + commit after each course

## Phase 6 - Verification
- [ ] verify field on every numeric question + scripts/verify-questions.ts, all pass
- [x] All calculator tests pass
- [ ] Independent subagent review of 15% sample; fixes applied; re-sample
- [ ] Route crawler script: every route renders without crash / console errors
- [ ] Zero TypeScript errors
- [ ] VERIFICATION.md written

## Phase 7 - Handover documents
- [ ] README.md final
- [ ] HANDOVER.md final (mocks, INTEGRATION list, auth, DB schema, payments + webhooks, secure video, access control, security checklist, deployment, task estimates)
- [ ] CONTENT_GUIDE.md final
- [ ] DECISIONS.md + PROGRESS.md finalized

## Phase 8 - Expansion
- [ ] 1. Question bank to 1000 (CFA L1 600, FRM I 400), all verified
- [x] 2. FRM Part II full lessons + kits + quizzes
- [ ] 3. CFA Level II full lessons + kits + quizzes
- [ ] 4. Second set of mock exams (CFA L1 + FRM I)
- [ ] 5. Flashcards to 800
- [ ] 6. CFA Level III full lessons + kits + quizzes
- [ ] 7. Blog articles to 20 total


## Status notes
- Content: CFA L1 92, FRM I 60, Excel 15, Fin Modeling 20, Python 20, FRM II 33 (full), CFA L2 14 of 44 lessons; each with notes + teaching kit + quiz. 1416 questions (400 bank + quizzes) verified, 300 flashcards, 183 formulas, 6 blog posts, 30 calculators (227 tests).
- Phase 1 and Phase 4 build/commit done; lesson pages render. Remaining: student dashboard/qbank/mocks/flashcards/formulas/planner/profile/certificate pages, instructor admin, mocks, Phase 6-7, rest of Phase 8.
