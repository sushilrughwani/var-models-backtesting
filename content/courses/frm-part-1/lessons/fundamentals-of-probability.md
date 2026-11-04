---
title: "Fundamentals of Probability"
---

## Learning goals
- Describe sample spaces, events and the basic axioms that every probability must satisfy.
- Calculate the probability of unions, intersections and complements of events.
- Compute conditional probabilities and test whether two events are independent.
- Distinguish independent events from mutually exclusive events.
- Apply Bayes' rule to update a prior probability after observing new information.

## Explanation

### Why risk managers start here
Every risk number you will meet later in the course, from VaR to a default probability, is a statement about probability. Before we can model returns or losses, we need a precise language for "how likely" and for how likelihoods change when we learn something. That language is built from a handful of rules.

### Sample spaces and events
The **sample space** $\Omega$ is the set of all possible outcomes of an experiment, such as every possible credit state of a loan at year end. An **event** is any subset of outcomes, for example "the loan defaults". A probability assigns each event a number with three properties: it lies between 0 and 1, the whole sample space has probability 1, and the probability of a union of non-overlapping events is the sum of their probabilities.

From these axioms come the everyday rules. The **complement** of $A$ (written $A^c$, "not A") satisfies $P(A^c) = 1 - P(A)$. For any two events, the **addition rule** avoids double-counting the overlap:

$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$

where $A \cup B$ means "A or B or both" and $A \cap B$ means "both A and B".

### Conditional probability
A conditional probability shrinks the sample space to the outcomes where $B$ has happened, then asks how much of that smaller world also contains $A$:

$$
P(A \mid B) = \frac{P(A \cap B)}{P(B)}, \qquad P(B) > 0
$$

Rearranging gives the **multiplication rule** $P(A \cap B) = P(A \mid B)\,P(B)$.

### Independence versus mutual exclusivity
Events are **independent** when learning that one occurred tells you nothing about the other: $P(A \mid B) = P(A)$, which is equivalent to $P(A \cap B) = P(A)P(B)$. Events are **mutually exclusive** when they cannot happen together, so $P(A \cap B) = 0$. These ideas are almost opposites. If two mutually exclusive events each have positive probability, then knowing one happened tells you for certain the other did not, so they are dependent.

Independence can also be **conditional**. Two borrowers in the same region may default independently once we condition on the state of the regional economy, yet be dependent unconditionally because both are exposed to that economy. This is the intuition behind the single-factor credit models you will see later.

### The law of total probability and Bayes' rule
If events $B_1, \dots, B_k$ are mutually exclusive and together cover the sample space, any probability can be built up scenario by scenario:

$$
P(A) = \sum_{i=1}^{k} P(A \mid B_i)\,P(B_i)
$$

**Bayes' rule** reverses the conditioning, turning "how likely is the evidence given the state" into "how likely is the state given the evidence":

$$
P(B \mid A) = \frac{P(A \mid B)\,P(B)}{P(A)}
$$

Here $P(B)$ is the **prior**, $P(A \mid B)$ is the **likelihood** of the evidence, $P(A)$ is the total probability of the evidence and $P(B \mid A)$ is the **posterior**.

## Worked example
A bank's early-warning model flags borrowers it thinks will default within a year. Historically 3% of borrowers default. The model flags 90% of borrowers who go on to default, but it also flags 8% of borrowers who do not default. A borrower has just been flagged. What is the probability that this borrower defaults?

**Step 1 - define events.** $D$ = default, $F$ = flagged. Prior $P(D) = 0.03$, so $P(D^c) = 0.97$. Likelihoods: $P(F \mid D) = 0.90$ and $P(F \mid D^c) = 0.08$.

**Step 2 - joint probabilities.** $P(F \cap D) = 0.90 \times 0.03 = 0.0270$. $P(F \cap D^c) = 0.08 \times 0.97 = 0.0776$.

**Step 3 - total probability of a flag.** $P(F) = 0.0270 + 0.0776 = 0.1046$.

**Step 4 - Bayes' rule.**

$$
P(D \mid F) = \frac{0.0270}{0.1046} = 0.2581
$$

**The flagged borrower defaults with probability of about 25.8%.** The flag raises the default probability more than eightfold relative to the 3% prior, yet roughly three out of four flagged borrowers still do not default. The reason is the low base rate: there are so many healthy borrowers that even an 8% false-alarm rate produces more false flags (0.0776) than true flags (0.0270).

A quick check on independence: if bond A defaults with probability 0.04, bond B with 0.06 and both default with probability 0.01, then $0.04 \times 0.06 = 0.0024 \neq 0.01$, so the defaults are positively dependent. The probability that at least one defaults is $0.04 + 0.06 - 0.01 = 0.09$.

## Common exam traps
- Forgetting to subtract the intersection in the addition rule, which double-counts the overlap.
- Confusing $P(A \mid B)$ with $P(B \mid A)$. The model's 90% hit rate is not the probability that a flagged borrower defaults.
- Ignoring the base rate. A low prior can keep the posterior modest even when the evidence is strong.
- Treating mutually exclusive events as independent. With positive probabilities they are always dependent.
- Multiplying probabilities to get a joint probability without first checking that independence is stated or justified.

## Key takeaways
- Probabilities lie in $[0, 1]$, the complement rule is $P(A^c) = 1 - P(A)$, and unions require subtracting the overlap.
- Conditional probability restricts attention to the world in which the conditioning event occurred.
- Independence means $P(A \cap B) = P(A)P(B)$; mutually exclusive means $P(A \cap B) = 0$.
- The law of total probability builds an unconditional probability from scenario-by-scenario pieces.
- Bayes' rule converts a prior into a posterior, and the base rate matters as much as the accuracy of the evidence.
