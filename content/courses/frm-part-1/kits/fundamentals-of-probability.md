---
title: "Fundamentals of Probability"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a default-warning model flags a borrower. Is default now likely?
- 02:00 - Sample spaces, events and the three axioms
- 05:00 - Complements and the addition rule (with a Venn diagram)
- 08:00 - Conditional probability and the multiplication rule
- 11:00 - Independence, mutual exclusivity and conditional independence
- 14:00 - Law of total probability
- 16:00 - Bayes' rule and the early-warning model on the whiteboard
- 21:00 - Exam traps and recap

## Slides
### Slide 1: Probability is the language of risk
- VaR, default probabilities and stress losses are probability statements
- We need rules for "how likely" and for updating beliefs
- Today: events, conditioning, independence, Bayes

### Slide 2: Sample spaces and events
- Sample space Ω: every possible outcome
- Event: a subset of outcomes (for example "loan defaults")
- Axioms: 0 ≤ P(A) ≤ 1, P(Ω) = 1, disjoint probabilities add

### Slide 3: Complement and addition rules
- P(not A) = 1 − P(A)
- P(A or B) = P(A) + P(B) − P(A and B)
- Subtract the overlap so it is counted once

### Slide 4: Conditional probability
- P(A | B) = P(A and B) / P(B)
- Shrink the world to "B happened"
- Multiplication rule: P(A and B) = P(A | B) P(B)

### Slide 5: Independence
- P(A | B) = P(A), equivalently P(A and B) = P(A) P(B)
- Learning B tells you nothing about A
- Test it with numbers, never assume it

### Slide 6: Mutually exclusive is not independent
- Mutually exclusive: P(A and B) = 0
- With positive probabilities, one occurring rules out the other
- Therefore mutually exclusive events are dependent

### Slide 7: Conditional independence
- Borrowers may be independent given the economy
- Unconditionally dependent through the shared factor
- Foundation of one-factor credit models

### Slide 8: Law of total probability
- Partition the world into scenarios B1, ..., Bk
- P(A) = Σ P(A | Bi) P(Bi)
- A weighted average of scenario probabilities

### Slide 9: Bayes' rule
- P(B | A) = P(A | B) P(B) / P(A)
- Prior × likelihood ÷ evidence = posterior
- Always build P(A) with total probability first

### Slide 10: Early-warning model
- Base rate 3%, hit rate 90%, false-alarm rate 8%
- P(flag) = 0.1046
- P(default | flag) = 0.2581

### Slide 11: Exam traps
- Forgetting the overlap in unions
- Swapping P(A | B) and P(B | A)
- Ignoring the base rate

## Whiteboard examples
**Example 1 - Two bonds.** P(A) = 0.04, P(B) = 0.06, P(A and B) = 0.01.
- P(at least one default) = 0.04 + 0.06 − 0.01 = 0.09.
- P(neither) = 1 − 0.09 = 0.91.
- P(A | B) = 0.01 / 0.06 = 0.1667, far above P(A) = 0.04.
- Independence would require P(A and B) = 0.04 × 0.06 = 0.0024, so the defaults are dependent.

**Example 2 - Early-warning model (Bayes).** P(D) = 0.03, P(F | D) = 0.90, P(F | not D) = 0.08.
- Joint: P(F and D) = 0.0270; P(F and not D) = 0.08 × 0.97 = 0.0776.
- P(F) = 0.1046.
- P(D | F) = 0.0270 / 0.1046 = 0.2581.
- P(D | no flag) = (0.10 × 0.03) / (0.10 × 0.03 + 0.92 × 0.97) = 0.003 / 0.8954 = 0.00335.

**Example 3 - Two independent defaults.** P(A) = 0.03 and P(B) = 0.05, independent.
- P(both) = 0.0015.
- P(exactly one) = 0.03 × 0.95 + 0.97 × 0.05 = 0.0285 + 0.0485 = 0.077.

## Questions to ask students
- P(A) = 0.3, P(B) = 0.5, P(A and B) = 0.15. Independent? (Yes, 0.3 × 0.5 = 0.15.)
- Can two mutually exclusive events with positive probabilities be independent? (No; one occurring tells you the other did not.)
- If evidence is equally likely in every scenario, what is the posterior? (It equals the prior; the evidence is uninformative.)
- Why is P(default | flag) only about 26% when the model catches 90% of defaulters? (The base rate is low, so false flags outnumber true ones.)
- What does conditional independence of borrowers given the economy imply for unconditional default correlation? (Defaults can still be correlated through the shared economic factor.)

## Analogies
- Conditional probability is a zoom lens: you crop the picture to the part where B is true and measure how much of it is A.
- Bayes' rule is a detective weighing a clue: a clue that is much more likely if the suspect is guilty moves suspicion a lot, but a rare crime keeps suspicion grounded.
- The base-rate problem is a smoke alarm in a city of non-fires: most alarms are false even if the alarm rarely misses a real fire.

## Recording tips
- Draw a 2 × 2 table (flag / no flag by default / no default) filled with joint probabilities; many students find it easier than the formula.
- Pause on the independence-versus-mutually-exclusive distinction; it appears in exam questions disguised as wording traps.
- Show the 0.0270 versus 0.0776 comparison on screen to make the base-rate effect visible.
