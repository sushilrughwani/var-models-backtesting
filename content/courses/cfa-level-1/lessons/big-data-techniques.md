---
title: "Introduction to Big Data Techniques"
---

## Learning goals
- Describe what fintech covers and why it matters to investment managers.
- Explain the characteristics that make a data set "big data" and distinguish traditional from alternative data.
- Distinguish supervised, unsupervised and deep learning, and explain overfitting and underfitting.
- Calculate and interpret precision, recall, accuracy and the F1 score for a classification model.
- Identify practical applications of big data techniques, including text analytics and natural language processing.

## Explanation

### What fintech means for investing
Fintech is the use of technology to deliver or improve financial services. For an investment professional the relevant pieces are: very large data sets, the tools to store and process them, machine learning (ML) to find patterns, automation of tasks such as trade execution and advice (robo-advisers), and distributed ledger technology for recording ownership. Earlier lessons in this module gave you regression and hypothesis testing; ML can be viewed as a broader, more flexible toolkit for the same goal of learning relationships from data.

### What makes data "big"
Big data is usually described by three core characteristics, with a fourth often added:

- **Volume** - the sheer quantity, from gigabytes to petabytes and beyond.
- **Velocity** - how fast new data arrive; real-time feeds versus monthly releases.
- **Variety** - structured data (tables of prices), semi-structured (web pages, HTML) and unstructured (text, images, audio).
- **Veracity** - how trustworthy the data are; large sets often contain errors, duplicates and noise.

Sources fall into two groups. **Traditional data** come from markets, company filings and government statistics. **Alternative data** come from individuals (social media posts, product reviews), business processes (credit card transactions, corporate exhaust) and sensors (satellite images of car parks, shipping trackers, the Internet of Things). Alternative data can give an information edge, but they raise questions about cleaning cost, legal use and privacy.

### Machine learning in three families
**Supervised learning** trains on labelled data: each observation has inputs (features) and a known outcome (target). The algorithm learns a mapping from features to target, which can be a number (regression) or a category (classification, such as "default" or "no default").

**Unsupervised learning** has no labels. The algorithm looks for structure on its own, for example grouping stocks into clusters with similar return behaviour, or reducing hundreds of correlated variables to a few factors.

**Deep learning** uses neural networks with many layers. It excels at complex, unstructured inputs such as images, speech and text, and it can be used in supervised, unsupervised or reinforcement settings.

### Fitting problems
Data are split into a **training sample** (used to fit the model), a **validation sample** (used to tune it) and a **test sample** (used once, to judge out-of-sample performance).

- **Overfitting**: the model memorises noise in the training data. In-sample accuracy is excellent but out-of-sample accuracy is poor. The model is too complex.
- **Underfitting**: the model is too simple to capture the real pattern and performs poorly even in sample.

### Measuring a classifier
For a two-class model, outcomes go into a confusion matrix: true positives (TP), false positives (FP), false negatives (FN) and true negatives (TN).

$$
\text{Precision} = \frac{TP}{TP + FP} \qquad \text{Recall} = \frac{TP}{TP + FN}
$$

$$
\text{Accuracy} = \frac{TP + TN}{TP + FP + FN + TN} \qquad F1 = \frac{2 \times P \times R}{P + R}
$$

Precision answers "when the model says positive, how often is it right?" Recall answers "of all actual positives, how many did the model catch?" F1 is the harmonic mean of precision ($P$) and recall ($R$), useful when classes are unbalanced.

### Text analytics and NLP
Text analytics turns unstructured words into structured inputs: cleaning (removing punctuation and stop words), tokenising, and counting terms. Natural language processing goes further, interpreting meaning and sentiment. Practical uses include scoring the tone of earnings call transcripts, monitoring news for a portfolio and classifying analyst reports.

## Worked example
An analyst builds a model that flags companies likely to cut their dividend next year. On a test sample of 200 companies the results are: TP = 40, FP = 10, FN = 20, TN = 130.

**Step 1 - Precision.** $40 / (40 + 10) = 40/50 = 0.80$. When the model raises a flag, it is right 80% of the time.

**Step 2 - Recall.** $40 / (40 + 20) = 40/60 = 0.6667$. The model catches about two-thirds of the actual dividend cutters.

**Step 3 - Accuracy.** $(40 + 130)/200 = 170/200 = 0.85$.

**Step 4 - F1 score.**

$$
F1 = \frac{2 \times 0.80 \times 0.6667}{0.80 + 0.6667} = \frac{1.0667}{1.4667} = 0.7273
$$

**Interpretation.** Accuracy of 85% looks impressive, but only 60 of 200 companies actually cut, so a model that always predicted "no cut" would already be 70% accurate. The **F1 score of about 0.73** is the better summary. If missing a dividend cut is very costly for the portfolio, the analyst should push recall higher, accepting more false alarms.

## Common exam traps
- Mixing up precision and recall: precision divides by predicted positives (TP + FP), recall by actual positives (TP + FN).
- Thinking high in-sample accuracy proves a good model. That is the signature of overfitting; judge on the test sample.
- Classifying clustering as supervised learning. Clustering has no labels, so it is unsupervised.
- Treating variety as meaning "many sources". Variety is about the different forms of data: structured, semi-structured and unstructured.
- Assuming alternative data are automatically better. Veracity, cleaning cost and legal constraints can wipe out the edge.

## Key takeaways
- Big data are defined by volume, velocity, variety and veracity; alternative data come from individuals, business processes and sensors.
- Supervised learning uses labelled targets, unsupervised learning finds structure without labels, deep learning uses multi-layer neural networks.
- Overfitting means great in-sample, poor out-of-sample results; underfitting means poor results everywhere.
- Precision = TP/(TP+FP), recall = TP/(TP+FN), and F1 balances the two.
- Text analytics and NLP convert words into signals such as sentiment scores.
