---
title: "Introduction to Big Data Techniques"
duration: 18
---

## Lecture outline
- 00:00 - Hook: a fund counts cars in retailer car parks from satellite photos before earnings. Is that an edge or noise?
- 02:00 - What fintech covers for an investment manager
- 04:00 - The Vs of big data and traditional versus alternative data sources
- 07:00 - Supervised, unsupervised and deep learning with one example each
- 10:00 - Training, validation and test samples; overfitting versus underfitting
- 12:30 - Confusion matrix, precision, recall, accuracy and F1 (worked live)
- 16:00 - Text analytics and NLP applications; recap and exam traps

## Slides
### Slide 1: Why Big Data Matters to Analysts
- Information edges now come from data most investors do not process
- Technology lowers the cost of collecting and analysing that data
- The exam tests vocabulary, model families and simple evaluation metrics

### Slide 2: What Fintech Covers
- Big data and the infrastructure to store and process it
- Machine learning to find patterns and make predictions
- Automation: algorithmic trading, robo-advice
- Distributed ledgers for recording ownership

### Slide 3: The Vs of Big Data
- Volume: quantity of data
- Velocity: speed of arrival (real time versus monthly)
- Variety: structured, semi-structured, unstructured
- Veracity: reliability and noise

### Slide 4: Traditional vs Alternative Data
- Traditional: prices, filings, government statistics
- Individuals: social media, reviews, search activity
- Business processes: card transactions, corporate exhaust
- Sensors: satellites, shipping trackers, Internet of Things

### Slide 5: Supervised Learning
- Labelled data: features plus a known target
- Regression (numeric target) or classification (category target)
- Example: predict default or no default from financial ratios

### Slide 6: Unsupervised and Deep Learning
- Unsupervised: no labels, find structure (clustering, dimension reduction)
- Example: group stocks by return behaviour rather than by sector label
- Deep learning: many-layer neural networks for images, speech, text

### Slide 7: Overfitting vs Underfitting
- Training sample fits, validation sample tunes, test sample judges
- Overfit: too complex, memorises noise, great in sample, poor out of sample
- Underfit: too simple, poor everywhere

### Slide 8: The Confusion Matrix
- TP, FP, FN, TN
- Precision = TP / (TP + FP)
- Recall = TP / (TP + FN)
- Accuracy = (TP + TN) / total; F1 = 2PR / (P + R)

### Slide 9: Text Analytics and NLP
- Clean, tokenise, remove stop words, count terms
- Sentiment of earnings calls, news monitoring, report classification
- Output becomes a feature in a model

### Slide 10: Exam Traps
- Precision vs recall denominators
- Clustering is unsupervised
- High in-sample fit is not proof of a good model
- Variety means forms of data, not number of vendors

## Whiteboard examples
1. **Dividend-cut classifier.** Test sample of 200: TP = 40, FP = 10, FN = 20, TN = 130.
   - Precision = 40/50 = 0.80
   - Recall = 40/60 = 0.6667
   - Accuracy = 170/200 = 0.85
   - F1 = 2(0.80)(0.6667)/(0.80 + 0.6667) = 1.0667/1.4667 = 0.7273
2. **The lazy model.** Same 200 companies (60 actual cutters). A model that always predicts "no cut" has TP = 0, FP = 0, FN = 60, TN = 140.
   - Accuracy = 140/200 = 0.70, which sounds decent
   - Recall = 0/60 = 0, so it catches no cutters at all
   - Lesson: accuracy alone misleads when classes are unbalanced.

## Questions to ask students
- A model trained on 10 years of data has 99% in-sample accuracy and 55% out-of-sample accuracy. What is the problem? (Overfitting; the model is too complex.)
- Grouping bonds into clusters without any predefined labels is which kind of learning? (Unsupervised.)
- Satellite images of oil storage tanks are what type of alternative data? (Sensor data.)
- Which metric should you raise if missing a fraud case is very costly? (Recall.)
- Earnings call transcripts are an example of which data form? (Unstructured.)

## Analogies
- Overfitting is a student who memorises last year's exam answers: perfect on that paper, lost on a new one.
- Precision is "how often is the smoke alarm right when it rings"; recall is "how many real fires did it ring for".
- Unsupervised learning is sorting a box of mixed buttons into piles without being told what the categories are.

## Recording tips
- Put the 2x2 confusion matrix on screen and keep it visible while you derive each metric; students lose track of which cell is which.
- Spend extra time on the lazy-model example; it makes the case for recall and F1 better than any definition.
- Keep the vocabulary pace brisk; this reading is tested with short definitional items.
