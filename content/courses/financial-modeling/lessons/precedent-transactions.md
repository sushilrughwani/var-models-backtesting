---
title: "Precedent Transactions"
---

## Learning goals
- Explain why acquisition multiples usually exceed trading multiples.
- Calculate a control premium from the undisturbed share price and the offer price.
- Compute a deal's enterprise value and EV/LTM EBITDA multiple from offer terms.
- Apply a precedent multiple range to the target and judge which deals are relevant.

## Explanation

### What a buyer pays for control
Trading comps price a minority stake: a few shares bought on the exchange. When a company buys another outright, it gains control of strategy, cash flows and costs, and often expects synergies. Sellers demand a share of that value, so acquirers pay a **control premium** above the market price. Precedent transaction analysis looks at what acquirers actually paid in comparable deals and applies those multiples to the target. It answers: "What might Northwind fetch if someone bought the whole company?"

The analogy is buying a whole apartment block rather than one flat: you pay more per flat because you control the building, can renovate it and can cut running costs.

### The control premium

$$
\text{Control premium} = \frac{\text{Offer price}}{\text{Undisturbed price}} - 1
$$

The **undisturbed price** is the share price before rumours or leaks moved it, typically one day to four weeks before announcement. Using the price the day before a leaked announcement understates the true premium.

### Deal enterprise value
For each precedent, rebuild EV at the offer price:

$$
EV_{\text{deal}} = \text{Offer price} \times \text{Diluted shares at offer} + \text{Net debt} + \text{NCI}
$$

Dilution uses the treasury stock method at the offer price, because in-the-money options are cashed out in a takeover. Multiples are usually quoted on **LTM** (last twelve months) EBITDA at announcement, because that is what was known when the price was agreed. Be consistent: apply LTM deal multiples to the target's LTM EBITDA.

### Choosing relevant deals
Good precedents are recent (market conditions and interest rates change multiples), in the same sector, of similar size and of a similar type. Strategic buyers with large synergies often pay more than financial sponsors. Note deals struck at the top of a credit cycle, distressed sales and contested auctions, and discuss whether they belong.

### Excel layout
Each deal is a row: date, acquirer, target, offer price, diluted shares, net debt, EV and LTM EBITDA. Then:
- Deal EV: `=D5*E5+F5`
- Multiple: `=G5/H5`
- Summary: `=QUARTILE.INC(I5:I9,1)`, `=MEDIAN(I5:I9)`, `=QUARTILE.INC(I5:I9,3)`

## Worked example
Northwind Components Ltd's LTM EBITDA at 31 December 2025 (fiscal 2025 actual) is USD 200 million. Bridge adjustments from the equity value lesson total −313 million, and dilution uses the closed-form price with 50.0 million basic shares, 0.6 million RSUs and 4.0 million options struck at USD 20.00.

**Step 1 - Rebuild one deal.** Tamsin Industrial acquired Orrin Gearworks for USD 26.00 per share. Orrin had 40.0 million basic shares and 2.6 million options struck at USD 16.00. Option shares at the offer price = 2.6 × (1 − 16/26) = 1.0 million, so diluted shares are 41.0 million and equity value is 26.00 × 41.0 = 1,066. Net debt was 182, so EV = 1,248. LTM EBITDA was 120: EV/LTM EBITDA = **10.4x**.

**Step 2 - Control premium for that deal.** Orrin's undisturbed price four weeks before announcement was USD 20.00: premium = 26.00 / 20.00 − 1 = 30.0%.

**Step 3 - Summarise five precedents.** EV/LTM EBITDA: 9.5x, 10.4x, 11.0x, 9.8x, 10.9x. First quartile 9.8x, median 10.4x, third quartile 10.9x. Premiums were 28%, 35%, 30%, 25% and 32%, median 30%.

**Step 4 - Implied EV.** 9.8 × 200 = 1,960; 10.4 × 200 = 2,080; 10.9 × 200 = 2,180.

**Step 5 - Per share.** At the median, equity = 2,080 − 313 = 1,767 and price = (1,767 + 80) / 54.6 = 33.83. The quartiles give 31.63 and 35.66.

**Step 6 - Premium cross-check.** Northwind's undisturbed price is USD 27.50; a 30% premium implies 27.50 × 1.30 = 35.75, near the top of the multiple-based range.

**Precedent transactions value Northwind at USD 31.63 to 35.66 per share**, above the trading comps range of 29.42 to 32.23, which is what a control premium should produce.

## Common exam traps
- Measuring the premium from a price already inflated by leaks or rumours.
- Applying LTM deal multiples to the target's forward EBITDA, which overstates value (9.8x on 219 gives 35.04 instead of 31.63).
- Using basic rather than diluted shares at the offer price when rebuilding deal EV.
- Treating stale deals from a different rate environment as equally relevant.
- Forgetting that precedent values include a control premium, so they are not a fair minority-stake value for a share purchase on the market.

## Key takeaways
- Acquirers pay for control and synergies, so deal multiples typically exceed trading multiples.
- Control premium = offer price / undisturbed price − 1.
- Rebuild deal EV at the offer price with treasury stock method dilution.
- Apply LTM deal multiples to LTM EBITDA and favour recent, similar deals.
- Northwind: 9.8x to 10.9x LTM EBITDA gives USD 31.63 to 35.66 per share.
