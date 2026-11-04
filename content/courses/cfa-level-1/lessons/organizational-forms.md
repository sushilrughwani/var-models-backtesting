---
title: "Organizational Forms, Corporate Issuer Features and Ownership"
---

## Learning goals
- Compare sole proprietorships, general partnerships, limited partnerships and corporations on legal identity, owner liability, taxation, control and access to capital.
- Explain why the corporation dominates large-scale business despite the double taxation of its profits.
- Calculate the after-tax income an owner keeps under pass-through taxation versus corporate (double) taxation.
- Distinguish public from private companies and describe the main routes between them: IPO, direct listing, SPAC merger and take-private buyout.

## Explanation

### Five questions that classify any business
Five questions classify any organizational form:

1. **Is the business a legal person separate from its owners?** If so, it can contract, own assets and be sued in its own name.
2. **How much can owners lose?** Unlimited liability means personal assets are at risk for business debts; limited liability caps the loss at the amount invested.
3. **Who runs it?** Owner-operated firms combine ownership and control; corporations separate them.
4. **How are profits taxed?** Either once at the owner level (pass-through) or twice: at the company level and again when distributed.
5. **How easily can it raise money and transfer ownership?**

### Sole proprietorship and general partnership
A **sole proprietorship** is one person doing business with no separate legal identity. Setup is cheap and the owner keeps all profit and control, but liability is unlimited and growth is capped by the owner's wealth. Profits are taxed as the owner's personal income.

A **general partnership** pools two or more owners under a partnership agreement. It adds capital and skills, but every general partner has unlimited liability, including for obligations created by the other partners. Profits pass through to partners' personal tax returns.

### Limited partnership
A **limited partnership** has at least one **general partner** (GP), who manages the business and has unlimited liability, and one or more **limited partners** (LPs), who contribute capital, take no part in management and can lose only what they invested. This structure is widely used for private equity and hedge funds. Taxation is usually pass-through.

### Corporation (limited company)
A **corporation** is a separate legal entity owned by shareholders. Its key features are:

- **Limited liability** for shareholders.
- **Separation of ownership and control**: shareholders elect a board, which appoints managers. This lets many passive investors fund one business but creates the agency problems covered in later lessons.
- **Transferable shares** and perpetual life, so ownership can change without disrupting operations.
- **Double taxation** in many jurisdictions: the company pays corporate tax, and shareholders pay tax again on dividends.

The effective combined tax rate on distributed corporate profit is

$$
t_{\text{eff}} = 1 - (1 - t_c)(1 - t_d)
$$

where $t_c$ is the corporate tax rate and $t_d$ is the shareholder's tax rate on dividends.

### Public versus private companies
A **public company** has exchange-listed shares: it gains liquidity, equity access and a market price, but faces heavy disclosure, regulatory cost and short-term scrutiny. A **private company** has no listed shares; ownership is concentrated (founders, families, private equity), disclosure is limited and shares are illiquid, but managers can take a longer view.

Routes from private to public:

- **Initial public offering (IPO)**: new and/or existing shares are sold to the public with an investment bank underwriting the issue.
- **Direct listing**: existing shares simply begin trading; traditionally no new capital is raised and no underwriter is needed.
- **SPAC merger**: a listed shell company that raised cash merges with the private firm, making it public.

The reverse route is a **take-private** (often a leveraged buyout): a buyer acquires all public shares and delists the firm.

## Worked example
Lena runs a consulting business that earns pretax profit of USD 200,000 a year. She is comparing two structures:

- **Pass-through** (sole proprietorship or partnership): the profit is taxed once at her personal rate of 35%.
- **Corporation**: the company pays 25% corporate tax and distributes all after-tax profit as dividends, which are taxed at 20%.

**Step 1 - Pass-through.** Tax = 0.35 × 200,000 = 70,000. Lena keeps 200,000 - 70,000 = **USD 130,000**.

**Step 2 - Corporation, company level.** Corporate tax = 0.25 × 200,000 = 50,000, leaving 150,000 to pay as a dividend.

**Step 3 - Corporation, shareholder level.** Dividend tax = 0.20 × 150,000 = 30,000. Lena keeps 150,000 - 30,000 = **USD 120,000**.

**Step 4 - Effective rate check.**

$$
t_{\text{eff}} = 1 - (0.75)(0.80) = 1 - 0.60 = 0.40
$$

So 40% of profit goes to tax under the corporate form versus 35% under pass-through. Lena keeps 10,000 dollars less as a corporation; in exchange she gains limited liability, an easier path to outside investors and the option to retain profits (deferring the dividend tax).

## Common exam traps
- Adding the two tax rates (25% + 20% = 45%) instead of applying them sequentially; the dividend tax applies only to profit left after corporate tax.
- Assuming limited partners can help run the business. Taking an active management role can cost them their limited liability.
- Forgetting that in a general partnership each partner is liable for debts created by the others, not just for their own share.
- Believing a traditional direct listing raises new capital. It mainly provides liquidity for existing holders; an IPO is the classic capital-raising route.

## Key takeaways
- Organizational forms differ on legal identity, liability, control, taxation and access to capital.
- Sole proprietorships and general partnerships are simple and taxed once, but owners face unlimited liability.
- Limited partnerships split roles: the GP manages with unlimited liability; LPs invest with limited liability.
- Corporations offer limited liability, transferable shares and separation of ownership from control, usually at the cost of double taxation: $1-(1-t_c)(1-t_d)$.
- Public companies trade liquidity and capital access for disclosure and scrutiny; firms move between public and private via IPOs, direct listings, SPACs and buyouts.
