---
title: "Machine Learning"
duration: 28
---

## Lecture outline
- 00:00 - Hook: a model that predicts last year's returns perfectly and next year's terribly. Why?
- 02:00 - Supervised, unsupervised, deep and reinforcement learning
- 05:00 - Overfitting, bias-variance trade-off, data splits and cross-validation
- 09:00 - Supervised tour: LASSO, SVM, KNN, CART, ensembles and random forests
- 15:00 - Unsupervised tour: PCA, k-means, hierarchical clustering
- 19:00 - Whiteboard 1: PCA variance explained
- 21:00 - Neural networks and whiteboard 2: one node
- 25:00 - Algorithm selection drill, traps and recap

## Slides
### Slide 1: Machine Learning for Analysts
- Finding patterns too complex for linear regression
- Prediction first, interpretation second
- Exam focus: choosing the right tool and spotting overfitting

### Slide 2: The Families
- Supervised: labelled target (regression, classification)
- Unsupervised: no target (dimension reduction, clustering)
- Deep and reinforcement learning

### Slide 3: Overfitting
- Great in-sample, poor out-of-sample
- Training, validation and test samples
- Learning curve gap = variance error

### Slide 4: Bias vs Variance
- Bias error: too simple, underfits
- Variance error: too complex, overfits
- Optimal complexity minimises total out-of-sample error

### Slide 5: Controlling Overfitting
- k-fold cross-validation
- Regularisation (penalise complexity)
- Pruning, ensembles, simpler models

### Slide 6: LASSO and SVM
- LASSO: SSE + λΣ|b|; shrinks some coefficients to zero
- λ is a hyperparameter
- SVM: widest-margin boundary between classes

### Slide 7: KNN and CART
- KNN: vote of k nearest neighbours; choice of k and distance matters
- CART: if-then splits, interpretable
- Unpruned trees overfit

### Slide 8: Ensembles and Random Forests
- Bagging: models on bootstrap samples
- Random forest: many trees, random feature subsets
- Lower variance, less interpretable

### Slide 9: PCA
- Correlated features → uncorrelated components
- Eigenvalue share = variance explained
- Keep enough for 85-95%; lose interpretability

### Slide 10: Clustering
- K-means: choose k, assign to nearest centroid, iterate
- Hierarchical: dendrogram, no k needed upfront
- Agglomerative (bottom-up) vs divisive (top-down)

### Slide 11: Neural Networks
- Node: weighted sum + bias → activation function
- Sigmoid, ReLU
- Backpropagation; learning rate; deep = many hidden layers

### Slide 12: Which Algorithm?
- Labelled + need interpretability → CART / penalised regression
- Labelled + accuracy priority → random forest, neural net
- No labels → PCA (reduce) or clustering (group)

## Whiteboard examples
**Example 1 - PCA.** Eigenvalues 4.2, 2.1, 1.0, 0.4, 0.3; total 8.0. Cumulative shares: 52.5%, 78.75%, 91.25%, 96.25%, 100%. Three components needed for 85%.

**Example 2 - One neural node.** x = (0.5, -1.0, 2.0), w = (0.4, 0.3, -0.2), b = 0.1. z = 0.2 - 0.3 - 0.4 + 0.1 = -0.4. Sigmoid: 1/(1 + e^0.4) = 0.401. ReLU: 0. Common mistake: dropping the bias gives z = -0.5 and sigmoid 0.378.

**Example 3 - Match the problem.** (a) Predict a bond's rating class from 30 ratios → supervised classification (CART, random forest, SVM). (b) Reduce 100 correlated yield-curve points to a few drivers → PCA. (c) Group clients by behaviour, number of groups unknown → hierarchical clustering. (d) Train an execution agent rewarded for low slippage → reinforcement learning.

## Questions to ask students
- Training accuracy 98%, validation accuracy 70%: which error dominates? (Variance error - overfitting.)
- What happens to LASSO coefficients as λ increases? (They shrink; more become exactly zero.)
- What does k mean in KNN versus k-means? (Neighbours voting vs number of clusters.)
- Why does a random forest use random feature subsets? (To decorrelate trees and reduce variance.)
- Eigenvalues 3, 1, 1: what share does PC1 explain? (60%.)

## Analogies
- Overfitting as a student who memorises past papers word for word and fails when the questions change.
- Random forest as a panel of experts who each saw different evidence; their majority vote beats any one of them.
- PCA as summarising a 20-instrument orchestra by its two or three dominant melodies.

## Recording tips
- Keep algorithms in a one-page table (type, how it works, strength, weakness); vignettes test matching more than mechanics.
- Show a learning-curve chart when discussing bias vs variance.
- Do the node calculation slowly and say "bias" explicitly; it is the most-dropped term.
