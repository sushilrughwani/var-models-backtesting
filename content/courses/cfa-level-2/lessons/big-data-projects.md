---
title: "Big Data Projects"
---

## Learning goals
- Outline the steps of a big data project for structured and unstructured (text) data.
- Explain data cleansing, wrangling, normalisation and standardisation, and the main text-preparation steps.
- Describe feature selection and feature engineering for structured and text data.
- Calculate and interpret precision, recall, accuracy, F1 score and RMSE, and use them to judge a model.

## Explanation

### The project workflow
Building on the machine learning toolkit from the previous lesson, a big data project follows five broad steps:
1. **Conceptualisation**: define the problem, the output, who will use it and how it fits existing processes.
2. **Data collection**: gather structured data (tables, databases) or unstructured data (text, images), internally or from vendors and web scraping.
3. **Data preparation and wrangling**: clean and transform the raw data.
4. **Data exploration**: visualise, select and engineer features.
5. **Model training**: choose the method, train, evaluate and tune.

For text, the same structure applies but steps 2-4 look different: text problem formulation, curation, preparation and wrangling, then exploration.

### Preparing structured data
**Cleansing** fixes errors: incompleteness (missing values), invalidity (outside meaningful ranges), inaccuracy, inconsistency, non-uniformity (mixed formats such as dates or currencies) and duplication. **Wrangling** transforms the clean data: extraction (deriving new variables, such as age from a birth date), aggregation, filtration (removing irrelevant rows), selection (removing irrelevant columns) and conversion of data types. Outliers can be trimmed (removed) or winsorised (replaced with a cut-off value).

Features on very different scales distort many algorithms, so they are rescaled:
$$
X_{\text{norm}} = \frac{X_i - X_{\min}}{X_{\max} - X_{\min}}, \qquad X_{\text{std}} = \frac{X_i - \mu}{\sigma}
$$
**Normalisation** maps values into [0, 1] but is sensitive to outliers. **Standardisation** centres on zero with unit standard deviation, is less sensitive to outliers and works best when data are roughly normal.

### Preparing text
Cleansing removes HTML tags, most punctuation, numbers (or replaces them with a token) and extra white space. Wrangling then normalises the text: lowercasing, removing **stop words** (very common words like "the" and "is"), **stemming** (cutting words to a root, so "investing" becomes "invest") or **lemmatisation** (reducing to the dictionary form, more accurate but costlier). The cleaned text is split into **tokens**, and a **bag-of-words (BOW)** collects the distinct tokens. A **document term matrix (DTM)** has one row per document, one column per token, and counts in the cells. **N-grams** keep short word sequences ("interest rate") whose meaning differs from the single words.

### Exploring and engineering features
For structured data, use histograms, box plots and correlation matrices, then select features with statistical tests and engineer new ones (ratios, interaction terms, one-hot encoding of categories). For text, **term frequency** (a token's count divided by total tokens) and **document frequency** (share of documents containing the token) help remove noise: very frequent tokens act like stop words, very rare ones are often typos. Feature selection tools include chi-square tests and mutual information. Word clouds give a visual check. Too few features underfit; too many overfit.

### Evaluating a classifier
A **confusion matrix** counts true positives (TP), false positives (FP, Type I errors), false negatives (FN, Type II errors) and true negatives (TN):
$$
\text{Precision} = \frac{TP}{TP + FP}, \quad \text{Recall} = \frac{TP}{TP + FN}
$$
$$
\text{Accuracy} = \frac{TP + TN}{TP + FP + TN + FN}, \quad F1 = \frac{2 \times P \times R}{P + R}
$$
Precision matters when false positives are costly; recall matters when missing a true case is costly. F1 (the harmonic mean) is better than accuracy when classes are unbalanced. The **ROC curve** plots the true positive rate (recall) against the false positive rate, $FP/(FP + TN)$, across cut-offs; a larger area under the curve (AUC) is better, and 0.5 is a coin toss. For continuous predictions, use **RMSE**, $\sqrt{\sum (\text{predicted} - \text{actual})^2 / n}$. Tuning then adjusts hyperparameters, guided by validation error, to balance bias and variance.

## Worked example
An analyst trains a model to flag earnings-call transcripts that precede a dividend cut. On 500 test transcripts:

| | Actual cut | No cut |
|---|---|---|
| Predicted cut | TP = 180 | FP = 40 |
| Predicted no cut | FN = 20 | TN = 260 |

**Step 1 - Precision.** $180/(180 + 40) = 180/220 = 0.818$.

**Step 2 - Recall.** $180/(180 + 20) = 180/200 = 0.900$.

**Step 3 - Accuracy.** $(180 + 260)/500 = 0.880$.

**Step 4 - F1.**
$$
F1 = \frac{2(0.818)(0.900)}{0.818 + 0.900} = 0.857
$$
The model catches 90% of actual cuts, and 82% of its warnings are correct; **F1 = 0.857**. False positive rate $= 40/300 = 0.133$, one point on the ROC curve.

**Step 5 - Rescaling a feature.** Debt/EBITDA ranges from 2 to 12 with mean 6 and standard deviation 2.5. For an issuer at 5: normalised $= (5-2)/10 = 0.30$; standardised $= (5-6)/2.5 = -0.40$.

**Step 6 - RMSE of a companion regression.** Forecast errors of 0.5, -1.0, 2.0 and -0.5 give RMSE $= \sqrt{(0.25 + 1 + 4 + 0.25)/4} = $ **1.17**.

## Common exam traps
- Swapping the precision and recall denominators: precision divides by predicted positives, recall by actual positives.
- Relying on accuracy with unbalanced classes, where a "never predict the event" model looks good.
- Confusing normalisation (range 0 to 1) with standardisation (mean 0, standard deviation 1).
- Thinking stemming and lemmatisation are identical; lemmatisation returns real dictionary words.
- Placing feature engineering in data preparation rather than in data exploration.

## Key takeaways
- Five steps: conceptualise, collect, prepare and wrangle, explore, train.
- Cleansing fixes errors; wrangling transforms; rescale with normalisation or standardisation.
- Text becomes tokens, a bag-of-words and a document term matrix.
- Precision guards against false alarms, recall against misses; F1 balances them.
- ROC/AUC and RMSE complete the evaluation toolkit before tuning.
