---
title: "Analyzing Income Statements"
---

## Learning goals
- Explain when revenue is recognised using the five-step contract-based model.
- Distinguish matching, period costs and the effect of estimates on reported expenses.
- Identify non-recurring items such as discontinued operations and unusual items, and explain why analysts separate them.
- Calculate the weighted average number of shares, basic EPS and diluted EPS using the if-converted and treasury stock methods.

## Explanation

### Revenue recognition
Under both IFRS and US GAAP, revenue follows a five-step logic: (1) identify the contract with a customer, (2) identify the separate **performance obligations** (distinct promised goods or services), (3) determine the transaction price, (4) allocate that price to the obligations based on relative standalone selling prices, and (5) recognise revenue **when (or as) each obligation is satisfied**, meaning control has passed to the customer. Control can pass at a point in time (a retail sale) or over time (a construction contract measured by progress). Cash received in advance creates a liability (contract liability or unearned revenue), not revenue.

### Expense recognition
Expenses are recognised to **match** the revenues they help produce: cost of goods sold is recognised when the related sale is recorded. Costs that cannot be linked to specific revenue, such as administrative salaries, are **period costs** expensed as incurred. Many expenses depend on estimates: the bad debt allowance, warranty provisions and depreciation lives. Aggressive estimates (low bad debt rates, long useful lives) push profit up today, so analysts compare these assumptions with peers.

### Non-recurring and unusual items
Analysts want to forecast **sustainable** earnings, so they separate items that are unlikely to repeat:

- **Discontinued operations**: a component the company has disposed of or classified as held for sale. Its results are shown separately, **net of tax**, below income from continuing operations.
- **Unusual or infrequent items** (restructuring charges, gains on asset sales, litigation settlements): reported within continuing operations, **pre-tax**, but often disclosed separately.
- **Changes in accounting policy** are applied retrospectively (prior periods restated); **changes in estimate** are applied prospectively.

### Earnings per share
Basic EPS shows profit available to common shareholders per share outstanding on average during the year:

$$
\text{Basic EPS} = \frac{\text{Net income} - \text{Preferred dividends}}{\text{Weighted average common shares}}
$$

Shares issued or repurchased are weighted by the fraction of the year they were outstanding. Stock dividends and splits are applied retroactively, as if they had always existed.

Diluted EPS asks what EPS would be if every **dilutive** security had been converted:

$$
\text{Diluted EPS} = \frac{\text{NI} - \text{Pref. div.} + \text{Conv. pref. div.} + \text{Conv. debt interest}(1-t)}{\text{Wtd. avg. shares} + \text{New shares from conversions and options}}
$$

where $t$ is the tax rate. Two methods generate the new shares:

- **If-converted method** (convertible preferred and convertible bonds): add back the preferred dividends or after-tax interest that would no longer be paid, and add the shares issued on conversion.
- **Treasury stock method** (options and warrants): assume exercise, and assume the proceeds buy back shares at the average market price. Incremental shares are

$$
\text{Incremental shares} = N - \frac{N \times K}{\bar{P}}
$$

where $N$ is the number of options, $K$ the exercise price and $\bar{P}$ the average share price. Options are dilutive only when $\bar{P} > K$.

A security is **antidilutive** if including it raises EPS; it is then excluded. A quick test: if the per-share add-back (for example, preferred dividends divided by new shares) is below basic EPS, the security is dilutive.

## Worked example
Halden Corp reports net income of USD 12,000,000 and pays preferred dividends of USD 1,000,000. It had 5,000,000 common shares at 1 January and issued 1,200,000 shares on 1 April. The preferred shares are convertible into 800,000 common shares. There are 400,000 employee options with an exercise price of USD 20; the average share price was USD 25.

**Step 1 - Weighted average shares.** The new shares were outstanding 9 of 12 months:

$$
5{,}000{,}000 + 1{,}200{,}000 \times \tfrac{9}{12} = 5{,}900{,}000
$$

**Step 2 - Basic EPS.**

$$
\frac{12{,}000{,}000 - 1{,}000{,}000}{5{,}900{,}000} = \text{USD } 1.86
$$

**Step 3 - Dilution test for the preferred.** Add-back per new share = 1,000,000 / 800,000 = USD 1.25, which is below 1.86, so it is dilutive.

**Step 4 - Treasury stock method for options.** Proceeds = 400,000 × 20 = USD 8,000,000; shares repurchased = 8,000,000 / 25 = 320,000; incremental shares = 400,000 - 320,000 = 80,000.

**Step 5 - Diluted EPS.** The preferred dividend is added back (so the numerator is the full net income) and both sets of new shares are added:

$$
\frac{12{,}000{,}000}{5{,}900{,}000 + 800{,}000 + 80{,}000} = \frac{12{,}000{,}000}{6{,}780{,}000}
$$

Diluted EPS is **USD 1.77**, against basic EPS of USD 1.86.

## Common exam traps
- Forgetting to subtract preferred dividends in basic EPS, or forgetting to add them back for convertible preferred in diluted EPS.
- Using year-end shares instead of the time-weighted average.
- Adding all option shares instead of only the net incremental shares from the treasury stock method.
- Including an antidilutive security; diluted EPS can never exceed basic EPS.
- Reporting discontinued operations pre-tax or unusual items net of tax; it is the other way round.

## Key takeaways
- Revenue is recognised when control of a promised good or service passes to the customer, allocated across performance obligations.
- Expenses follow matching or are period costs; estimates drive many of them and can flatter earnings.
- Separate discontinued operations (net of tax, below the line) and unusual items to judge sustainable profit.
- Basic EPS uses profit to common holders over weighted average shares.
- Diluted EPS uses if-converted and treasury stock methods and excludes antidilutive securities.
