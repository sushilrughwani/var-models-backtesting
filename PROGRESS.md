# PROGRESS

Resume rule: read this file and DECISIONS.md first, then continue from the first unchecked item.

## Phase 0 - Setup
- [ ] Next.js + TypeScript (strict) + Tailwind + KaTeX + Vitest + recharts + lucide-react scaffold
- [ ] /config/site.ts (brand, instructor, contact, socials, palette, prices INR + USD)
- [ ] /lib/data repository layer (local implementation reading /content)
- [ ] /lib/storage interface (localStorage, try/catch everywhere)
- [ ] Content format spec (content/_authoring/SPEC.md) + course structure files

## Phase 1 - Design system and public site
- [ ] Design system: typography, colors, buttons, inputs, cards, badges, tabs, accordions, modals, toasts, tables
- [ ] /styleguide page
- [ ] Layouts: public (header/footer), student (sidebar), instructor (sidebar)
- [ ] Light/dark mode toggle
- [ ] Home page (hero, exams/courses, how it works, features, instructor, labeled sample testimonials, FAQ, CTA)
- [ ] Course catalog with filters (CFA / FRM / Skills, level)
- [ ] Course detail page (overview, who for, curriculum accordion, instructor, pricing tiers, FAQ, free preview)
- [ ] Pricing page (Self-Study, Premium, Bundle) with INR/USD toggle
- [ ] About, Contact (mock form), Free Resources hub, Blog index + post pages
- [ ] Legal pages (Terms, Privacy, Refund) marked TEMPLATE
- [ ] Footer trademark disclaimer
- [ ] 404 page
- [ ] Mock auth (Guest/Student/Instructor role switcher) + route guards
- [ ] Mock payments (checkout, coupons, plan selection) + toasts
- [ ] Build passes + commit

## Phase 2 - Student platform
- [ ] Dashboard (enrolled courses + progress, continue, streak, weak topics, weekly plan)
- [ ] Course player (sidebar, video placeholder, KaTeX notes, takeaways, resources, mark complete, prev/next, personal notes, bookmarks)
- [ ] End-of-lesson quiz with instant feedback
- [ ] Question bank (filters, practice mode, timed mode, flags, review incorrect, analytics charts)
- [ ] Mock exams (timed, section-based, topic report)
- [ ] Flashcards (SM-2, decks, daily queue)
- [ ] Formula library (search, grouped, KaTeX, variables, intuition, calculator link)
- [ ] Study planner (exam date + hours/week -> weekly plan)
- [ ] Lesson Q&A / discussion UI (sample threads, INTEGRATION marker)
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
- [ ] TVM (PV/FV/PMT/N/rate)
- [ ] NPV and IRR
- [ ] Holding period and annualized return
- [ ] Arithmetic vs geometric mean
- [ ] Two-asset portfolio return and risk
- [ ] Risk-adjusted performance (Sharpe, Treynor, Sortino, Jensen's alpha, information ratio)
- [ ] CAPM
- [ ] WACC
- [ ] FCFF DCF valuation
- [ ] Gordon growth model
- [ ] Bond price and YTM
- [ ] Duration & convexity (Macaulay, modified, convexity, price change approximation)
- [ ] Forward rates from spot rates
- [ ] Forward/futures pricing with cost of carry
- [ ] FRA valuation
- [ ] Black-Scholes with Greeks
- [ ] n-step binomial option pricing
- [ ] Put-call parity checker
- [ ] Parametric VaR
- [ ] Historical VaR (sample data)
- [ ] Expected Shortfall
- [ ] Two-asset portfolio VaR
- [ ] EWMA volatility
- [ ] GARCH(1,1) forecast
- [ ] Expected loss (PD x LGD x EAD)
- [ ] Hazard rate from credit spread
- [ ] z/t hypothesis test
- [ ] DuPont analysis
- [ ] Loan amortization schedule
- [ ] Covered interest rate parity forward
- [ ] All calculator tests pass + build + commit

## Phase 5 - Core content
- [ ] CFA Level I: structure (~90 lessons) + notes + teaching kits + quizzes
- [ ] FRM Part I: structure (~60 lessons) + notes + teaching kits + quizzes
- [ ] Excel for Finance (~15 lessons) full
- [ ] Financial Modeling and Valuation (~20 lessons) full
- [ ] Python for Finance (~20 lessons, code examples) full
- [ ] Skeletons: CFA Level II, CFA Level III, FRM Part II
- [ ] Question bank: 250 CFA L1 (A-C) + 150 FRM I (A-D), rationale for every option
- [ ] 300 flashcards
- [ ] Half-length CFA L1 mock + half-length FRM I mock
- [ ] Printable formula sheets per topic
- [ ] 6 blog articles
- [ ] Build passes + commit after each course

## Phase 6 - Verification
- [ ] verify field on every numeric question + scripts/verify-questions.ts, all pass
- [ ] All calculator tests pass
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
- [ ] 2. FRM Part II full lessons + kits + quizzes
- [ ] 3. CFA Level II full lessons + kits + quizzes
- [ ] 4. Second set of mock exams (CFA L1 + FRM I)
- [ ] 5. Flashcards to 800
- [ ] 6. CFA Level III full lessons + kits + quizzes
- [ ] 7. Blog articles to 20 total
