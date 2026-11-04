---
title: "Analysis of Long-Term Assets"
---

## Learning goals
- Distinguish costs that should be capitalised from those that should be expensed, and explain the effect on profit, cash flow and ratios.
- Calculate depreciation under the straight-line, double-declining balance and units-of-production methods.
- Apply the impairment tests under IFRS and US GAAP and explain why they can give different answers.
- Describe the cost and revaluation models and where revaluation gains and losses are reported.

## Explanation

### Capitalise or expense?
A cost that will produce benefits over several years is **capitalised**: recorded as an asset and spread over its useful life through depreciation (tangible assets) or amortisation (intangibles). A cost that benefits only the current period is **expensed** immediately. The purchase price of a machine plus delivery, installation and testing is capitalised; routine repairs and staff training are expensed. Interest incurred while constructing a long-lived asset for the company's own use is also capitalised.

Compared with expensing, capitalising a cost in the year it is incurred gives:

- **Higher net income** in that year (only one year's depreciation hits profit), but lower income in later years.
- **Higher total assets and equity**, so lower leverage ratios. Return on assets and equity is usually higher in the first year (because income is higher) and lower in later years.
- **Higher CFO and lower (more negative) CFI**, because the cash outflow is classified as investing rather than operating. Total cash flow is unchanged.

Internally developed intangibles differ between frameworks. IFRS expenses **research** but capitalises **development** costs once technical feasibility and other criteria are met. US GAAP generally expenses both, with exceptions such as software developed for sale after feasibility is established.

### Depreciation methods
The **straight-line** method spreads the depreciable amount evenly:

$$
\text{Annual depreciation} = \frac{\text{Cost} - \text{Residual value}}{\text{Useful life}}
$$

**Double-declining balance (DDB)** front-loads expense by applying twice the straight-line rate to the opening net book value:

$$
\text{DDB depreciation}_t = \frac{2}{N} \times \text{Book value}_{t-1}
$$

where $N$ is the useful life in years. Residual value is ignored in the formula but acts as a floor: book value is never depreciated below it. **Units of production** charges cost minus residual value per unit of actual output, so expense follows usage.

Longer useful lives and higher residual values lower annual depreciation and raise profit; analysts compare these estimates with peers. IFRS also requires **component depreciation**: significant parts with different lives (an aircraft's engines and its body) are depreciated separately.

### Impairment
An asset is impaired when its carrying amount is more than the company can recover from it.

- **IFRS (one step)**: compare carrying amount with **recoverable amount**, the higher of fair value less costs to sell and value in use (present value of expected cash flows). The impairment loss is the excess. Reversals are allowed (except for goodwill), up to the carrying amount that would have existed without the impairment.
- **US GAAP (two steps)**: first, a **recoverability test**: the asset is impaired only if its carrying amount exceeds the **undiscounted** future cash flows. If it fails, the loss is carrying amount minus **fair value**. Reversals are prohibited for assets held for use.

Because undiscounted cash flows are relatively high, US GAAP triggers impairment less often.

### Cost versus revaluation model
US GAAP requires the **cost model** (cost less accumulated depreciation and impairment). IFRS also permits the **revaluation model**, carrying assets at fair value. An upward revaluation goes to **OCI** and accumulates in a revaluation surplus in equity, except that it is recognised in profit to the extent it reverses a loss previously taken to profit. A downward revaluation goes to profit, except to the extent it reverses an earlier surplus.

## Worked example
Torres Logistics buys a sorting machine for USD 100,000 with a residual value of USD 10,000 and a five-year life.

**Step 1 - Straight-line.** (100,000 - 10,000) / 5 = USD 18,000 a year.

**Step 2 - DDB at 2/5 = 40%.**

| Year | Opening book value | Depreciation | Closing book value |
|---|---|---|---|
| 1 | 100,000 | 40,000 | 60,000 |
| 2 | 60,000 | 24,000 | 36,000 |
| 3 | 36,000 | 14,400 | 21,600 |
| 4 | 21,600 | 8,640 | 12,960 |
| 5 | 12,960 | 2,960 | 10,000 |

In year 5, 40% of 12,960 would be 5,184, but that would push book value below the 10,000 residual, so depreciation is capped at **2,960**. Total depreciation is 90,000 under both methods; only the timing differs.

**Step 3 - Impairment.** A different asset has a carrying amount of USD 50,000, undiscounted future cash flows of USD 52,000, value in use of USD 45,000 and fair value of USD 40,000 with costs to sell of USD 2,000.

- US GAAP: 52,000 exceeds 50,000, so the recoverability test is passed and **no impairment** is recorded.
- IFRS: recoverable amount = max(40,000 - 2,000, 45,000) = 45,000. Impairment loss = 50,000 - 45,000 = **USD 5,000**.

## Common exam traps
- Saying capitalising lowers operating cash flow; it raises CFO and lowers CFI.
- Subtracting residual value before applying the DDB rate.
- Depreciating below residual value in the final years of DDB.
- Using discounted cash flows for the US GAAP recoverability test, or undiscounted cash flows for the IFRS recoverable amount.
- Sending all revaluation gains to profit; increases go to OCI unless they reverse a prior loss in profit.

## Key takeaways
- Capitalising boosts current profit, assets and CFO; expensing does the opposite, with the same total cash.
- DDB front-loads depreciation, straight-line spreads it evenly and units of production follows usage.
- IFRS impairment compares carrying amount with the higher of fair value less costs to sell and value in use.
- US GAAP uses an undiscounted recoverability test, then measures the loss against fair value, with no reversals.
- Only IFRS allows the revaluation model; upward revaluations normally go to OCI.
