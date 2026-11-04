---
title: "Machine Learning Methods"
duration: 24
---

## Lecture outline
- 00:00 - Hook: a fraud model with 99.5% accuracy that catches no fraud
- 02:00 - Econometrics versus machine learning; supervised, unsupervised and reinforcement learning
- 05:00 - Data preparation: standardisation and normalisation
- 07:00 - Overfitting, bias-variance trade-off, training/validation/test, k-fold cross-validation
- 11:00 - Regularisation: ridge, LASSO, elastic net
- 15:00 - Unsupervised tools: PCA and K-means
- 18:00 - Confusion matrix and classification metrics; whiteboard example
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Machine Learning Methods
- Prediction first, flexible models, large datasets
- Same core risk: mistaking noise for signal
- Builds on regression and model-selection ideas

### Slide 2: Types of Learning
- Supervised: labelled outcomes (regression, classification)
- Unsupervised: no labels (clustering, dimension reduction)
- Reinforcement: learn actions from rewards

### Slide 3: Preparing Features
- Standardise: (x - mean)/sd
- Normalise: (x - min)/(max - min), range 0 to 1
- Needed before penalties, distances and PCA

### Slide 4: Overfitting
- Underfit: high bias; overfit: high variance
- Error = bias² + variance + irreducible noise
- Symptom: low training error, high validation error

### Slide 5: Splitting the Data
- Training: estimate; validation: tune; test: final honest score
- k-fold cross-validation when data are scarce
- Time series: validate on later data only

### Slide 6: Ridge and LASSO
- Ridge penalty λΣβ²: shrinks, keeps all variables
- LASSO penalty λΣ|β|: shrinks and sets some to zero
- Elastic net: both; λ chosen on validation data

### Slide 7: Principal Components Analysis
- Turns correlated variables into uncorrelated components
- Share explained = eigenvalue / sum of eigenvalues
- Yield curves: level, slope, curvature

### Slide 8: K-means Clustering
- Choose K, assign to nearest centroid, update centroids, repeat
- K chosen by the analyst (elbow method)
- Use: segmenting borrowers or trading behaviour

### Slide 9: The Confusion Matrix
- TP, FP, TN, FN
- Accuracy, precision, recall, F1
- Accuracy misleads when events are rare

### Slide 10: Recap
- Validate out of sample, regularise, choose the right metric
- Ridge vs LASSO is a favourite exam distinction
- Next module: financial markets and products

## Whiteboard examples
**Example 1: Default classifier.** 500 borrowers, 50 defaults; model flags 70, of which 40 default.
- TP = 40, FN = 10, FP = 30, TN = 420.
- Accuracy 0.92; precision 40/70 = 0.571; recall 0.80; F1 = 0.667.
- Naive "no default" rule: accuracy 0.90, recall 0.

**Example 2: Scaling a feature.** Debt-to-income of 12 when the sample mean is 8, sd 2, min 2, max 22.
- Standardised: (12 - 8)/2 = 2.0. Normalised: (12 - 2)/(22 - 2) = 0.5.

**Example 3: PCA variance shares.** Eigenvalues 3.2, 1.1, 0.4, 0.3 (sum 5.0).
- PC1 explains 64%; PC1 + PC2 explain 86%; keep two components.

## Questions to ask students
- A model has training R² of 0.95 and validation R² of 0.30. What is happening? (Overfitting: high variance.)
- Which penalty can drop variables entirely? (LASSO, through the absolute-value penalty.)
- Is clustering supervised or unsupervised? (Unsupervised; there are no labels.)
- Precision is 0.60 and recall is 0.75. What is F1? (2 × 0.45/1.35 = 0.667.)
- Why should the test set never be used to choose λ? (It would no longer give an unbiased estimate of out-of-sample performance.)

## Analogies
- Overfitting: a student who memorises last year's exam answers and fails when the questions change.
- Ridge vs LASSO: ridge turns down the volume on every instrument in the band; LASSO sends some players home.
- Precision vs recall: a fishing net; a fine mesh catches every fish (recall) but also lots of junk (low precision).

## Recording tips
- Draw the U-shaped validation-error curve against model complexity; it summarises the whole overfitting discussion.
- Build the confusion matrix as a 2 × 2 grid on screen and colour-code which cells each metric uses.
- Keep the maths light; emphasise intuition and the exam distinctions (ridge vs LASSO, precision vs recall, supervised vs unsupervised).
