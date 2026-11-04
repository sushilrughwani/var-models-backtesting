---
title: "Big Data Projects"
duration: 24
---

## Lecture outline
- 00:00 - Hook: 80% of a data scientist's time is cleaning data - what does that work actually involve?
- 02:00 - The five-step workflow, structured vs text
- 05:00 - Cleansing and wrangling structured data; normalisation vs standardisation
- 09:00 - Text preparation: cleansing, stop words, stemming, lemmatisation, tokens, BOW, DTM, n-grams
- 13:00 - Data exploration: feature selection and engineering, TF and DF
- 16:00 - Confusion matrix, precision, recall, accuracy, F1, ROC, RMSE
- 18:00 - Whiteboard: dividend-cut classifier and feature rescaling
- 22:00 - Exam traps and recap

## Slides
### Slide 1: Big Data Projects
- From raw data to a trained, evaluated model
- Structured and unstructured (text) data
- Applies the ML toolkit from the previous lesson

### Slide 2: The Five Steps
- Conceptualisation
- Data collection
- Preparation and wrangling → exploration → model training

### Slide 3: Cleansing Structured Data
- Incomplete, invalid, inaccurate, inconsistent
- Non-uniform formats, duplicates
- Trim or winsorise outliers

### Slide 4: Wrangling and Rescaling
- Extraction, aggregation, filtration, selection, conversion
- Normalise: (X - min)/(max - min), outlier-sensitive
- Standardise: (X - μ)/σ

### Slide 5: Preparing Text
- Strip HTML, punctuation, numbers, white space
- Lowercase, remove stop words
- Stemming vs lemmatisation

### Slide 6: Representing Text
- Tokens → bag-of-words
- Document term matrix: documents × tokens
- N-grams keep phrases like "interest rate"

### Slide 7: Data Exploration
- Visualise: histograms, box plots, word clouds
- Feature selection: chi-square, mutual information, TF/DF filters
- Feature engineering: ratios, one-hot encoding, n-grams

### Slide 8: Confusion Matrix
- TP, FP (Type I), FN (Type II), TN
- Precision = TP/(TP + FP)
- Recall = TP/(TP + FN)

### Slide 9: Accuracy, F1, ROC
- Accuracy misleads with unbalanced classes
- F1 = harmonic mean of precision and recall
- ROC: TPR vs FPR; higher AUC better

### Slide 10: Regression Metrics and Tuning
- RMSE for continuous targets
- Tune hyperparameters on validation error
- Balance bias and variance

### Slide 11: Exam Traps
- Precision vs recall denominators
- Normalise ≠ standardise
- Feature engineering lives in exploration

## Whiteboard examples
**Example 1 - Confusion matrix.** TP = 180, FP = 40, FN = 20, TN = 260.
- Precision = 180/220 = 0.818; recall = 180/200 = 0.900; accuracy = 440/500 = 0.880.
- F1 = 2(0.818)(0.900)/(1.718) = 0.857. FPR = 40/300 = 0.133.

**Example 2 - The accuracy trap.** 1,000 bonds, 30 defaults. A model that always predicts "no default" has accuracy 970/1,000 = 97% but recall 0 - useless for a credit desk.

**Example 3 - Rescaling.** Feature range 2 to 12, mean 6, SD 2.5, value 5: normalised 0.30, standardised -0.40. Add an outlier at 52: the normalised value collapses to 3/50 = 0.06, showing normalisation's outlier sensitivity.

## Questions to ask students
- Which metric matters most if missing a fraud is very costly? (Recall.)
- What does a document term matrix contain? (Documents as rows, tokens as columns, counts in cells.)
- "Running", "ran", "runs" → "run" via the dictionary form: stemming or lemmatisation? (Lemmatisation.)
- Why might a token with extremely high document frequency be removed? (It behaves like a stop word and adds no discrimination.)
- An AUC of 0.5 means what? (No better than random guessing.)

## Analogies
- Data cleansing as washing and peeling vegetables; wrangling as chopping them to the size the recipe needs.
- Precision vs recall as a fishing net: a fine net (high recall) catches every fish plus a lot of seaweed; a selective net (high precision) brings in only fish but misses some.
- Bag-of-words as tipping a sentence into a bag and counting the words - order lost, content kept.

## Recording tips
- Draw the confusion matrix and colour-code the denominators for precision (row) and recall (column).
- Keep a two-column table on screen: structured workflow vs text workflow, step by step.
- Repeat that F1 is a harmonic mean, so it sits closer to the lower of precision and recall.
