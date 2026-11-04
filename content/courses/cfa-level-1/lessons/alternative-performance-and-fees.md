---
title: "Alternative Investment Performance and Returns"
---

## Learning goals
- Calculate management and incentive fees under hard and soft hurdle rates.
- Apply a high-water mark across several years of gains and losses.
- Distinguish whole-of-fund (European) and deal-by-deal (American) waterfalls and explain clawbacks.
- Compute the return on a leveraged position and explain why it magnifies gains and losses.
- Identify biases that make reported alternative returns look better than they are.

## Explanation

### The two-part fee
Most alternative funds charge a **management fee**, a fixed percentage of assets, and an **incentive fee** (called carried interest in private equity), a share of profits. Private equity typically charges the management fee on committed capital; hedge funds charge it on assets under management (AUM). Always check whether the management fee uses beginning or ending AUM, and whether the incentive fee is computed before or after the management fee.

### Hurdle rates
A **hurdle rate** is a minimum return the fund must earn before the manager receives any incentive fee.
- **Hard hurdle**: the incentive fee applies only to the return *above* the hurdle.
- **Soft hurdle**: once the hurdle is cleared, the incentive fee applies to the *entire* gain.

A **catch-up** clause lets the GP receive a large share of profits just above the hurdle until it has "caught up" to its full percentage of all profits, which makes a hurdle behave like a soft hurdle.

### High-water mark
A **high-water mark (HWM)** is the highest net asset value on which an incentive fee has been paid. After a loss, the manager earns no incentive fee until the fund climbs back above the HWM, so investors are not charged twice for the same gain. Management fees are still charged during the recovery.

$$
\text{Incentive fee} = p \times \max\big(0,\ V_{\text{pre}} - \max(\text{HWM},\ \text{hurdle level})\big)
$$

where $p$ is the incentive rate and $V_{\text{pre}}$ is the value after management fees but before the incentive fee. (This form is for a hard hurdle.)

### Waterfalls and clawbacks
A **whole-of-fund (European) waterfall** pays carried interest only after LPs have received all contributed capital plus any preferred return. It favours LPs. A **deal-by-deal (American) waterfall** pays carry on each profitable exit as it happens, so the GP is paid earlier. That creates a risk that early winners earn carry and later losers leave the GP overpaid; a **clawback** provision forces the GP to return the excess.

### Measuring returns
Private funds usually report the **internal rate of return (IRR)**, which accounts for the timing of capital calls and distributions, and the **multiple of invested capital (MOIC)**, total value divided by paid-in capital, which ignores timing. A high IRR on a quick deal may correspond to a small multiple, so look at both.

### Leverage
Borrowing magnifies returns on the investor's own capital:

$$
r_L = r + \frac{V_b}{V_c}\,(r - r_b)
$$

where $r$ is the return on the total portfolio, $V_b$ is borrowed funds, $V_c$ is the investor's own cash, and $r_b$ is the borrowing rate. With an 8% asset return, a 5% borrowing cost and equal amounts of debt and equity, $r_L = 0.08 + 1 \times 0.03 = 11\%$. If the asset return falls below the borrowing cost, leverage reduces the return.

### Why reported returns flatter
- **Appraisal smoothing**: valuations lag market moves, understating volatility and correlation.
- **Survivorship bias**: failed funds drop out of databases.
- **Backfill bias**: managers join a database after a good track record and their past returns are added.
- **Illiquidity**: redemption gates, lockups and the inability to rebalance are costs not visible in returns.

## Worked example
A hedge fund starts with USD 200 million. Fees: 2% management fee on year-end AUM and a 20% incentive fee calculated net of the management fee.

**Year 1 (8% hurdle)**: gross value rises to 240 million.
1. Management fee: $0.02 \times 240 = 4.80$ million, leaving $235.20$ million.
2. Hurdle level: $200 \times 1.08 = 216$ million.
3. Hard hurdle: incentive $= 0.20 \times (235.20 - 216) = 3.84$ million. Ending NAV $= 231.36$ million, a net return of 15.68%.
4. Soft hurdle (for comparison): hurdle cleared, so incentive $= 0.20 \times (235.20 - 200) = 7.04$ million, a net return of 14.08%.

Assume the hard hurdle applied, so the HWM is now 231.36 million. For years 2 and 3, assume no hurdle, only the HWM.

**Year 2**: gross return of −10%.
5. Gross value: $231.36 \times 0.90 = 208.22$ million; management fee $= 4.16$ million; NAV $= 204.06$ million (−11.80%). Below the HWM, so no incentive fee.

**Year 3**: gross return of +20%.
6. Gross value: $204.06 \times 1.20 = 244.87$ million; management fee $= 4.90$ million; value before incentive $= 239.97$ million.
7. Incentive applies only above the HWM: $0.20 \times (239.97 - 231.36) = 1.72$ million.
8. Ending NAV: $239.97 - 1.72 =$ **238.25 million**, a year 3 net return of 16.76%.

Without the HWM, the incentive fee would have been $0.20 \times (239.97 - 204.06) = 7.18$ million, so the HWM saved investors about 5.46 million.

## Common exam traps
- Applying a soft-hurdle calculation when the question describes a hard hurdle, or vice versa.
- Forgetting that management fees are still charged when the fund is below its high-water mark.
- Computing the incentive fee on the gross gain when it is stated as net of the management fee.
- Assuming a deal-by-deal waterfall favours LPs; it favours the GP, which is why clawbacks exist.
- Treating database averages as unbiased; survivorship and backfill both push reported returns up.

## Key takeaways
- Fees = management fee on assets plus an incentive fee on profits; check the fee base and the order of deduction.
- A hard hurdle charges incentive only above the hurdle; a soft hurdle charges it on the whole gain once cleared.
- A high-water mark stops managers earning incentive fees twice on the same gains.
- European waterfalls protect LPs; American waterfalls pay GPs earlier and rely on clawbacks.
- Leverage magnifies returns in both directions; reported alternative returns tend to be biased upward and smoothed.
