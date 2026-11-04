---
title: "Artificial Intelligence and Machine Learning in Risk Management"
---

## Learning goals
- Distinguish supervised, unsupervised and reinforcement learning and match each to risk management uses.
- Calculate accuracy, precision, recall and false positive rate from a confusion matrix and explain why accuracy misleads on imbalanced data.
- Identify the main risks of AI models: opacity, bias, overfitting, drift, data and vendor issues, and generative AI errors.
- Apply a simple fairness test to model outcomes across groups.
- Describe how model risk management and governance extend to AI.

## Explanation

### What machine learning adds
Traditional risk models specify a functional form (say, a logistic regression with a handful of ratios). **Machine learning (ML)** lets the data choose much of the structure, capturing non-linear effects and interactions across hundreds of variables. **Artificial intelligence (AI)** is the broader field, which now includes generative models that produce text and code.

- **Supervised learning** learns from labelled outcomes: credit default prediction, fraud classification, loss forecasting.
- **Unsupervised learning** finds structure without labels: clustering customers, flagging unusual transactions for anti-money-laundering review.
- **Reinforcement learning** learns actions by trial and reward: trade execution and hedging strategies.
- **Generative AI** drafts reports, summarises documents and assists with code.

### Measuring a classifier
For a binary model (fraud / not fraud), outcomes form a confusion matrix of true positives (TP), false positives (FP), false negatives (FN) and true negatives (TN):

$$
\text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall} = \frac{TP}{TP + FN}, \quad \text{FPR} = \frac{FP}{FP + TN}
$$

Precision is the share of alerts that are genuine; recall (sensitivity) is the share of actual frauds caught; the false positive rate is the share of legitimate cases wrongly flagged. When the event is rare, **accuracy** $= (TP + TN)/N$ is misleading, because a model that never flags anything still looks accurate.

### Risks specific to AI models
- **Explainability:** complex models (gradient-boosted trees, neural networks) are hard to interpret. Lenders must explain adverse credit decisions, and validators must understand what drives outputs. Post-hoc tools such as SHAP values and LIME attribute individual predictions to inputs, but they approximate the model rather than reveal it.
- **Bias and fairness:** models trained on historical decisions can reproduce past discrimination, even without protected attributes, through proxies like postcode.
- **Overfitting:** flexible models can memorise noise. Use out-of-sample and out-of-time testing, cross-validation and regularisation.
- **Data quality and drift:** if the population or relationships change (data drift, concept drift), performance decays silently. Ongoing monitoring is essential.
- **Robustness and security:** adversarial inputs, data poisoning and model theft.
- **Third-party and concentration risk:** many firms rely on the same vendors and foundation models, which creates correlated failures.
- **Generative AI:** confident but false output ("hallucination"), leakage of confidential data in prompts, and copyright questions.

### Fairness testing
A simple screen compares favourable outcome rates across groups:

$$
\text{Disparate impact ratio} = \frac{\text{approval rate of protected group}}{\text{approval rate of reference group}}
$$

A ratio below about 0.8 (the "four-fifths" rule of thumb) is a red flag for further investigation, not proof of discrimination.

### Governance
AI does not need a new rulebook so much as a stricter application of model risk management:
- Keep a complete **inventory**, including vendor and embedded models, tiered by materiality.
- **Independent validation** of data, design, performance, stability, fairness and explainability before use.
- **Ongoing monitoring** with thresholds that trigger retraining or withdrawal.
- **Human oversight** for high-impact decisions and clear accountability at senior level.
- **Documentation** sufficient for a qualified third party to reproduce results.

## Worked example
A bank tests a fraud model on 10,000 transactions, of which 100 are fraudulent. The model flags 300 transactions, and 80 of those are actual frauds.

**Step 1 - confusion matrix.** TP = 80; FP = 300 − 80 = 220; FN = 100 − 80 = 20; TN = 9,900 − 220 = 9,680.

**Step 2 - accuracy.** $(80 + 9{,}680)/10{,}000 = 97.6\%$. A model that never flags anything scores 99.0%, so accuracy is useless here.

**Step 3 - precision.** $80/300 = 26.7\%$: about one alert in four is genuine.

**Step 4 - recall.** $80/100 = 80.0\%$ of frauds are caught.

**Step 5 - false positive rate.** $220/9{,}900 = 2.22\%$ of legitimate customers are inconvenienced.

**Step 6 - fairness check on a related credit model.** Approval rates are 60% for the reference group and 42% for a protected group: ratio $= 0.42/0.60 = 0.70$. This is below 0.8, so the model needs investigation.

**Conclusion:** the fraud model has **precision 26.7% and recall 80%**; the operating threshold should be set by weighing investigation costs against fraud losses.

## Common exam traps
- Judging a rare-event model by accuracy rather than precision, recall and false positive rate.
- Confusing precision (quality of alerts) with recall (coverage of actual events).
- Assuming that removing protected attributes removes bias; proxies can carry it.
- Treating explainability tools as a full view of the model; they are approximations.
- Thinking vendor or generative AI models fall outside model risk management; they are in scope.

## Key takeaways
- ML captures non-linear patterns and is used in credit, fraud, AML, trading and operations.
- Precision, recall and false positive rate matter more than accuracy for rare events.
- Key AI risks are opacity, bias, overfitting, drift, security, vendor concentration and hallucination.
- Fairness ratios below about 0.8 warrant investigation.
- Governance extends model risk management: inventory, validation, monitoring, human oversight and accountability.
