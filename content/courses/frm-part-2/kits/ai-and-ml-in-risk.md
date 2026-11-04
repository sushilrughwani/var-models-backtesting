---
title: "Artificial Intelligence and Machine Learning in Risk Management"
duration: 20
---

## Lecture outline
- 00:00 - Hook: a fraud model is 97.6% accurate. Is it any good?
- 02:00 - Supervised, unsupervised, reinforcement learning and generative AI in risk
- 05:00 - Confusion matrix: precision, recall, false positive rate; Whiteboard 1
- 10:00 - AI-specific risks: explainability, bias, overfitting, drift, security, vendors, hallucination
- 14:00 - Fairness testing: disparate impact ratio; Whiteboard 2
- 16:00 - Governance: inventory, validation, monitoring, human oversight
- 18:00 - Exam traps and recap

## Slides
### Slide 1: AI and ML in Risk Management
- Data-driven models with flexible structure
- Big gains, new risks
- Governance through model risk management

### Slide 2: Types of Learning
- Supervised: default, fraud, loss prediction
- Unsupervised: clustering, anomaly detection for AML
- Reinforcement: execution and hedging; generative AI for documents and code

### Slide 3: The Confusion Matrix
- TP, FP, FN, TN
- Precision = TP / (TP + FP); Recall = TP / (TP + FN)
- FPR = FP / (FP + TN)

### Slide 4: The Accuracy Trap
- Rare events make accuracy meaningless
- A "never flag" model scores 99% with 1% fraud
- Choose thresholds on cost of misses versus cost of alerts

### Slide 5: Explainability
- Complex models are hard to interpret
- SHAP and LIME give local attributions
- Approximations, not the model itself

### Slide 6: Bias and Fairness
- Historical data can embed past discrimination
- Proxies (postcode) carry bias even without protected fields
- Disparate impact ratio below about 0.8: investigate

### Slide 7: Overfitting and Drift
- Flexible models memorise noise
- Out-of-time testing, cross-validation, regularisation
- Monitor for data drift and concept drift

### Slide 8: Security, Vendors and Generative AI
- Adversarial inputs, data poisoning
- Concentration on a few vendors and foundation models
- Hallucination and data leakage

### Slide 9: Governance
- Inventory including vendor and embedded models
- Independent validation, ongoing monitoring
- Human oversight and senior accountability

### Slide 10: Traps and Takeaways
- Precision is not recall
- Removing protected fields does not remove bias
- Vendor and generative AI models are in scope

## Whiteboard examples
**Example 1 - Fraud model.** 10,000 transactions, 100 frauds; model flags 300, of which 80 are frauds.
- TP 80, FP 220, FN 20, TN 9,680.
- Accuracy 97.6% (versus 99.0% for a model that never flags).
- Precision 26.7%; recall 80.0%; FPR 2.22%.
- Raise the threshold so the model flags 150 with 60 frauds: precision 40.0%, recall 60.0%, FPR 90 / 9,900 = 0.91%. Fewer wasted investigations, more missed fraud.

**Example 2 - Fairness screen.** Approval rates 60% (reference) and 42% (protected).
- Ratio = 0.42 / 0.60 = 0.70 < 0.8: investigate variables acting as proxies, and test alternative models.

## Questions to ask students
- Which metric tells you what share of actual frauds the model catches? (Recall.)
- A model's alerts are mostly false alarms. Which metric is low? (Precision.)
- Why can a model discriminate even if it never sees gender or ethnicity? (Other variables act as proxies for them.)
- What is concept drift? (A change in the relationship between inputs and the outcome, so a once-good model degrades.)
- Does a vendor-supplied AI tool fall under model risk management? (Yes; the bank remains accountable.)

## Analogies
- Precision versus recall is a fishing net: a fine mesh catches every fish (high recall) and lots of weed (low precision).
- An unexplainable model is a brilliant employee who cannot tell you why: useful, but you would not let them sign off loans unsupervised.
- Data drift is a map of a city that keeps building new roads: the map was accurate when drawn, but becomes less so each year.

## Recording tips
- Draw the 2 × 2 confusion matrix and keep it on screen while computing each metric.
- Students reverse precision and recall; tie each to its denominator (flags versus actual frauds).
- Keep governance practical: show it as a lifecycle loop from development to validation to monitoring.
