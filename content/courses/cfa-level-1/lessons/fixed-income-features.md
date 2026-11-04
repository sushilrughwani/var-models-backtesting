---
title: "Fixed-Income Instrument Features"
---

## Learning goals
- Identify the core features that define a bond: issuer, maturity, par value, coupon rate and frequency, and currency.
- Explain how seniority, collateral and credit enhancements change what a bondholder recovers in default.
- Distinguish affirmative from negative covenants and explain why each protects lenders.
- Describe the main contingency provisions (call, put and conversion) and who each one benefits.
- Calculate the periodic coupon payment from the coupon rate, par value and payment frequency.

## Explanation

### A bond is a contract, so read the contract
A bond is a loan cut into tradable pieces: the **issuer** promises a schedule of payments and the **bondholder** pays cash today for that promise. The terms sit in the legal contract, the **indenture** (or trust deed). Because thousands of investors own the same issue, a **trustee** monitors the issuer and acts for bondholders collectively.

### The basic features
- **Issuer**: sovereign and local governments, agencies, supranational bodies, companies, and special purpose vehicles in securitisations. The issuer's ability to pay drives credit risk.
- **Maturity date**: the date the principal is repaid. **Tenor** is the time remaining until that date. Bonds of one year or less trade in the money market; longer ones trade in the capital market. A **perpetual** bond has no maturity.
- **Par value** (face, principal or nominal value): the amount repaid at maturity. Prices are usually quoted as a percentage of par, so a price of 98.50 means 98.5% of par.
- **Coupon rate and frequency**: the annual interest rate applied to par, paid annually, semiannually, quarterly or monthly.
- **Currency**: home or foreign; a **dual-currency** bond pays coupons and principal in different currencies.

The periodic coupon is

$$
\text{Coupon payment} = \frac{c \times F}{m}
$$

where $c$ is the annual coupon rate, $F$ is the par value and $m$ is the number of payments per year.

### Seniority, collateral and credit enhancement
**Secured** bonds are backed by specific assets that bondholders can claim in default. **Unsecured** bonds (often called debentures) rely only on the issuer's general credit. Within unsecured debt, **senior** claims rank ahead of **subordinated** claims. Higher ranking means higher expected recovery and therefore a lower yield.

Issuers can also add **credit enhancements**. *Internal* enhancements include subordination (tranching), overcollateralisation and reserve accounts. *External* enhancements include bank guarantees, letters of credit and surety bonds, which make the bond only as strong as the guarantor. **Covered bonds**, common for banks, give investors a claim on a ring-fenced pool of assets *and* recourse to the issuer.

### Covenants
Covenants are promises in the indenture.
- **Affirmative covenants** say what the issuer *must* do: pay on time, maintain insurance, file financial reports, keep assets in good order. 
- **Negative covenants** say what the issuer *must not* do: take on extra debt beyond a ratio limit, pledge assets already serving as collateral to new lenders (negative pledge), pay excessive dividends, or sell key assets. They protect bondholders from the issuer moving value toward shareholders.

Stricter covenants reduce lenders' risk and therefore the yield.

### Contingency provisions
These are embedded options that change the cash flows when some event occurs.
- **Call provision**: the *issuer* may redeem early, usually when rates fall. Investors demand a higher yield to compensate.
- **Put provision**: the *investor* may sell the bond back to the issuer, usually when rates rise or credit worsens. Investors accept a lower yield.
- **Conversion provision**: the *investor* may exchange the bond for a set number of shares. The equity upside lets the issuer pay a lower coupon.

Rule of thumb: an option owned by the issuer raises the yield; an option owned by the investor lowers it.

### Legal and tax points
**Domestic** bonds are issued by local borrowers under local law; **foreign** bonds are issued by foreign borrowers in a local market; **Eurobonds** are issued outside the jurisdiction of the currency's country. Some government bonds pay tax-exempt coupons.

## Worked example
Delta Logistics issues a bond with these terms: par value USD 1,000,000 per block, coupon 4.5% paid semiannually, 7-year maturity, senior secured by a warehouse portfolio, a covenant capping debt at 3.0× EBITDA, and a call provision after year 3.

**Step 1 - coupon payment.** $c = 0.045$, $F = 1{,}000{,}000$, $m = 2$:

$$
\frac{0.045 \times 1{,}000{,}000}{2} = 22{,}500
$$

The investor receives **USD 22,500 every six months**, or USD 45,000 a year.

**Step 2 - classify the features.**
- Senior secured: high in the priority ranking, backed by collateral, so expected recovery is high.
- Debt cap at 3.0× EBITDA: a **negative covenant** (restricts what the issuer can do).
- Call after year 3: an option held by the **issuer**, so investors demand extra yield versus an otherwise identical non-callable bond.

**Step 3 - net effect.** Collateral and the covenant lower the required yield; the call raises it.

## Common exam traps
- Dividing the coupon rate by the frequency but forgetting to multiply by par (or vice versa); the coupon is always based on par, never on price.
- Mixing up who owns the option: calls belong to the issuer (higher yield), puts and conversion rights belong to the investor (lower yield).
- Labelling a requirement to pay taxes or file reports as a negative covenant; "must do" items are affirmative.
- Assuming a guaranteed bond is risk-free: an external enhancement is only as good as the guarantor's credit.

## Key takeaways
- The indenture defines the bond; the trustee enforces it for all holders.
- Coupon payment = annual coupon rate × par ÷ payments per year.
- Secured beats unsecured, and senior beats subordinated, in recovery.
- Affirmative covenants require actions; negative covenants restrict them.
- Issuer-owned options raise the yield investors demand; investor-owned options lower it.
