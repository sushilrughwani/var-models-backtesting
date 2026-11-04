---
title: "Machine Learning Methods"
---

## Learning goals
- Distinguish supervised, unsupervised and reinforcement learning and give a risk-management use for each.
- Explain overfitting, the bias-variance trade-off and the role of training, validation and test samples.
- Compare ridge, LASSO and elastic net regularisation.
- Describe principal components analysis and K-means clustering.
- Calculate accuracy, precision, recall and the F1 score from a confusion matrix.

## Explanation

### What is different about machine learning?
Classical econometrics, as in the regression lessons, starts from a theory, specifies a small model and tests hypotheses about its coefficients. Machine learning (ML) puts prediction first: it lets flexible algorithms search large datasets for patterns, often with many more candidate variables and non-linear relationships. The price of that flexibility is a much greater risk of finding patterns that are only noise.

### Three types of learning
- **Supervised learning** uses labelled data: each observation has inputs (features) and a known outcome. Regression predicts a number (a loss amount); classification predicts a category (default or no default).
- **Unsupervised learning** has no labels and looks for structure, such as groups of similar customers or a few factors driving many yield-curve points.
- **Reinforcement learning** trains an agent by trial and error to maximise a reward, for example an execution algorithm learning to split a large order.

### Preparing the data
Many algorithms are sensitive to scale, so features are rescaled. **Standardisation** subtracts the mean and divides by the standard deviation; **normalisation** maps values into [0, 1]:

$$
z = \frac{x - \bar x}{s_x}, \qquad x^{*} = \frac{x - x_{\min}}{x_{\max} - x_{\min}}
$$

### Overfitting and the bias-variance trade-off
A model that is too simple misses real structure (**underfitting**, high bias). A model that is too complex memorises the noise in its training data (**overfitting**, high variance): it fits the training sample brilliantly and forecasts poorly. Expected prediction error combines squared bias, variance and irreducible noise, and the best model balances the first two.

To detect overfitting, split the data. The **training set** estimates the model, the **validation set** tunes choices such as the penalty strength or the number of variables, and the untouched **test set** gives an honest final estimate of performance. With limited data, **k-fold cross-validation** rotates the validation role across $k$ blocks. The tell-tale sign of overfitting is low training error with much higher validation error. For time series, the validation data should come after the training data to avoid look-ahead.

### Regularisation
Regularisation adds a penalty for large coefficients to the OLS objective, shrinking the model towards simplicity:

$$
\text{Ridge: } \min \sum_{i}(y_i - \hat y_i)^2 + \lambda\sum_{j}\beta_j^2 \qquad \text{LASSO: } \min \sum_{i}(y_i - \hat y_i)^2 + \lambda\sum_{j}|\beta_j|
$$

$\lambda \geq 0$ sets the penalty strength (chosen on the validation set); $\lambda = 0$ gives OLS. **Ridge** shrinks all coefficients towards zero but rarely to exactly zero, and handles correlated features well. **LASSO** can set coefficients exactly to zero, so it performs variable selection. **Elastic net** combines both penalties. Features should be standardised first, so the penalty treats them equally.

### Unsupervised tools
**Principal components analysis (PCA)** converts many correlated variables into a few uncorrelated components ordered by the variance they explain. The share explained by component $j$ is its eigenvalue divided by the sum of all eigenvalues. For yield curves, three components (level, slope, curvature) usually explain almost all movement.

**K-means clustering** groups observations into $K$ clusters: pick $K$ initial centroids, assign each point to the nearest one, recompute each centroid as its cluster's mean, and repeat until assignments stop changing. $K$ is chosen by the analyst, for instance with the elbow method.

### Evaluating a classifier
A confusion matrix counts true positives (TP), false positives (FP), true negatives (TN) and false negatives (FN):

$$
\text{Accuracy} = \frac{TP + TN}{N}, \quad \text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall} = \frac{TP}{TP + FN}, \quad F_1 = \frac{2PR}{P + R}
$$

Precision asks "of those flagged, how many were right?"; recall asks "of the true cases, how many did we catch?". With rare events, accuracy can mislead: a model that never predicts default looks accurate if defaults are rare.

## Worked example
A lender tests a default classifier on 500 borrowers, 50 of whom defaulted. It flags 70 borrowers, 40 of whom default.

**Step 1 - confusion matrix.** TP = 40, FN = 50 − 40 = 10, FP = 70 − 40 = 30, TN = 450 − 30 = 420.

**Step 2 - accuracy.** $(40 + 420)/500 = 0.92$.

**Step 3 - precision and recall.** Precision $= 40/70 = 0.571$. Recall $= 40/50 = 0.80$.

**Step 4 - F1.** $2(0.571)(0.80)/(0.571 + 0.80) = $ **0.667**. False positive rate $= 30/450 = 0.067$.

**Step 5 - sanity check.** A naive rule predicting "no default" for everyone scores accuracy $450/500 = 0.90$ but recall 0. The model's 0.92 accuracy looks only slightly better, while its recall of **0.80** shows its real value.

**Step 6 - PCA.** For a separate set of four rate factors, eigenvalues are 3.2, 1.1, 0.4 and 0.3 (sum 5.0). The first component explains $3.2/5.0 = 64\%$, and the first two explain $4.3/5.0 = 86\%$.

## Common exam traps
- Judging a model on training-sample fit; only validation or test performance reveals overfitting.
- Saying ridge regression selects variables; only LASSO (or elastic net) can set coefficients exactly to zero.
- Confusing precision (denominator: predicted positives) with recall (denominator: actual positives).
- Relying on accuracy when the positive class is rare.
- Treating K-means or PCA as supervised methods; neither uses labels.

## Key takeaways
- Supervised learning uses labels, unsupervised finds structure, reinforcement learns from rewards.
- Overfitting means low bias but high variance; detect it with validation and test samples.
- Ridge shrinks, LASSO shrinks and selects, elastic net does both.
- PCA reduces dimension; K-means groups similar observations.
- Use precision, recall and F1, not accuracy alone, for imbalanced classification.
