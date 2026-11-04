---
title: "Machine Learning"
---

## Learning goals
- Distinguish supervised, unsupervised and deep or reinforcement learning, and match problems to each.
- Explain overfitting, the bias-variance trade-off and the tools that control it (cross-validation, regularisation, pruning, ensembles).
- Describe how the main algorithms work: penalised regression, SVM, KNN, CART, random forests, PCA, k-means, hierarchical clustering and neural networks.
- Calculate variance explained by principal components and the output of a neural network node.

## Explanation

### Three families
- **Supervised learning** uses labelled data: the target is known in training. Regression predicts a continuous target; classification predicts a category.
- **Unsupervised learning** has no labels; it finds structure, either by reducing dimensions or by clustering.
- **Deep learning and reinforcement learning** use layered neural networks for complex patterns (images, text); reinforcement learning has an agent learn by trial and error to maximise a reward.

### Overfitting and generalisation
A model that memorises training noise performs well in-sample and badly on new data. Split data into **training**, **validation** and **test** samples. Errors decompose into **bias error** (the model is too simple, underfitting), **variance error** (the model is too sensitive to the particular training sample, overfitting) and irreducible **base error**. Adding complexity lowers bias but raises variance; the best model sits where total out-of-sample error is lowest. A learning curve plots accuracy against sample size: a persistent gap between training and validation accuracy signals variance error.

Remedies: **k-fold cross-validation** (rotate which fold is held out, then average the validation error), **regularisation** (penalise complexity), simpler models, and ensembles.

### Supervised algorithms
- **Penalised regression (LASSO)** minimises the sum of squared residuals plus $\lambda \sum |b_j|$. Larger $\lambda$ shrinks coefficients, setting some exactly to zero, so it selects features. $\lambda$ is a **hyperparameter**, set by the researcher, not estimated from the data.
- **Support vector machine (SVM)** finds the boundary with the widest margin between two classes; soft-margin versions tolerate some misclassification.
- **K-nearest neighbours (KNN)** classifies a new point by majority vote of its $k$ closest training points. Results depend on the distance measure and on $k$: too small is noisy, too large blurs classes.
- **Classification and regression trees (CART)** split data on the feature and cut-off that best separate the target, producing interpretable if-then rules. Unchecked trees overfit; pruning or a maximum depth controls them.
- **Ensembles** combine models. **Bagging** trains on bootstrap resamples; a **random forest** bags many trees, each using a random subset of features, which reduces variance. Majority voting across diverse models usually beats any single one.

### Unsupervised algorithms
- **Principal components analysis (PCA)** converts correlated features into uncorrelated composites (eigenvectors). Each component's **eigenvalue** measures the variance it explains:
$$
\text{Share explained by component } i = \frac{\lambda_i}{\sum_{j=1}^{p} \lambda_j}
$$
where $\lambda_i$ is the eigenvalue and $p$ the number of original features. Analysts keep enough components to explain, say, 85-95% of variance. The cost is interpretability.
- **K-means** partitions observations into $k$ clusters by repeatedly assigning points to the nearest centroid and recomputing centroids. $k$ must be chosen in advance and results depend on starting centroids.
- **Hierarchical clustering** builds a tree (dendrogram) either bottom-up (agglomerative) or top-down (divisive), without fixing $k$ first.

### Neural networks
Inputs feed into hidden layers of nodes. Each node computes a **summation** and applies an **activation function**:
$$
\text{output} = f\!\left(\sum_i w_i x_i + b\right)
$$
where $w_i$ are weights, $x_i$ inputs, $b$ a bias and $f$ a non-linear function such as the sigmoid $1/(1+e^{-z})$ or ReLU $\max(0, z)$. Training adjusts weights by backpropagation to reduce error, with the learning rate as a hyperparameter. Many hidden layers make a **deep** network.

## Worked example
**Part A - PCA.** A quant reduces five correlated macro factors. Eigenvalues: 4.2, 2.1, 1.0, 0.4, 0.3 (total 8.0).
- PC1: $4.2/8.0 = 52.5\%$.
- PC1 + PC2: $6.3/8.0 = 78.75\%$.
- PC1 to PC3: $7.3/8.0 = 91.25\%$.
To explain at least 85% of variance, the quant keeps **three components**.

**Part B - Neural node.** Inputs $x = (0.5, -1.0, 2.0)$, weights $w = (0.4, 0.3, -0.2)$, bias 0.1.
$$
z = 0.5(0.4) + (-1.0)(0.3) + 2.0(-0.2) + 0.1 = 0.2 - 0.3 - 0.4 + 0.1 = -0.4
$$
Sigmoid output: $1/(1 + e^{0.4}) = 1/(1 + 1.492) = $ **0.401**. With ReLU the output would be $\max(0, -0.4) = $ **0**.

**Part C - Choosing tools.** A fund wants to group 500 stocks by return behaviour with no predefined labels and does not know how many groups exist: **hierarchical clustering** suits this. It also wants to predict default (yes/no) from 40 ratios and needs a model it can explain to a credit committee: **CART** with pruning, possibly checked against a random forest for accuracy.

## Common exam traps
- Calling PCA or clustering supervised; neither uses a target variable.
- Thinking more complexity always helps: beyond a point variance error dominates.
- Believing LASSO's $\lambda$ is estimated by OLS; it is a hyperparameter chosen via validation.
- Confusing KNN (supervised classification, $k$ = neighbours) with k-means (unsupervised clustering, $k$ = clusters).
- Forgetting the bias term, or the activation step, when computing a node's output.

## Key takeaways
- Supervised = labelled target; unsupervised = structure only; deep learning = layered networks.
- Overfitting means low bias, high variance; cross-validation, regularisation and ensembles fight it.
- LASSO shrinks and selects; random forests reduce variance; CART is interpretable.
- PCA keeps components by cumulative eigenvalue share; k-means needs $k$ chosen first.
- A neural node is a weighted sum plus bias passed through an activation function.
