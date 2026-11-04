---
title: "Capital Investments and Capital Allocation"
---

## Learning goals
- Classify capital projects by type and explain why each needs a different level of analysis.
- Calculate the net present value (NPV) and internal rate of return (IRR) of a project and apply their decision rules.
- Explain why NPV and IRR can rank mutually exclusive projects differently and which rule to follow.
- Identify common capital allocation pitfalls and describe the main types of real options.

## Explanation

### Types of capital projects
Capital allocation is the process of choosing which long-term investments a firm makes. Projects fall into broad groups:

- **Going concern projects**: maintaining the business or replacing worn equipment, often to cut costs. Usually routine and lightly analysed.
- **Regulatory and compliance projects**: required by law or safety rules (pollution controls, safety upgrades). They may have negative NPV on their own but are a cost of staying in business.
- **Expansion projects**: growing existing products or entering new markets. Forecasts are less certain, so analysis is more detailed.
- **Other projects**: new products, research or acquisitions with high uncertainty; often require the most scrutiny and senior approval.

The guiding principles are the same for all: use **incremental after-tax cash flows**, include **opportunity costs** and **externalities** (cannibalisation of existing sales), ignore **sunk costs**, and let financing costs enter through the discount rate rather than the cash flows.

### Net present value
NPV measures how much value a project adds today:

$$
\text{NPV} = \sum_{t=1}^{n} \frac{CF_t}{(1+r)^t} - CF_0
$$

where $CF_0$ is the initial outlay, $CF_t$ is the after-tax cash flow in year $t$, $r$ is the project's required rate of return (its cost of capital) and $n$ is the project life. **Accept if NPV > 0.** A positive NPV means the project earns more than investors require and should, in theory, raise shareholder wealth by exactly that amount.

### Internal rate of return
The IRR is the discount rate that sets NPV to zero:

$$
0 = \sum_{t=1}^{n} \frac{CF_t}{(1+\text{IRR})^t} - CF_0
$$

It must be found by trial and error or a financial calculator. **Accept if IRR > r.** For a single independent project with conventional cash flows (one outflow then inflows), NPV and IRR always give the same accept or reject decision.

### When NPV and IRR disagree
For **mutually exclusive** projects, rankings can conflict when projects differ in **scale** or in the **timing** of cash flows. Suppose Project A costs 100 and returns 120 in one year, while Project B costs 300 and returns 345. At a 10% required return, A has an IRR of 20% and NPV of 9.09; B has an IRR of 15% and NPV of 13.64. IRR prefers A, NPV prefers B. **Follow NPV**, because it measures the money value added and assumes cash flows are reinvested at the cost of capital, while IRR implicitly assumes reinvestment at the IRR itself. IRR can also give multiple answers or none when cash flows change sign more than once.

### Capital allocation pitfalls
- **Inertia**: copying last year's budget instead of reallocating capital to the best opportunities.
- **Source of capital bias**: treating internally generated cash as "free".
- **Failing to consider alternatives**, including doing nothing or delaying.
- **Pet projects** pushed by influential managers with optimistic forecasts.
- **Focusing on EPS, net income or ROE** rather than NPV; a project can boost near-term earnings yet destroy value.
- **Ignoring overhead, cannibalisation or competitor responses** in the forecasts.

### Real options
Many projects contain choices that add value beyond the static NPV: **timing options** (delay until information arrives), **abandonment options** (exit if results disappoint), **expansion options** (scale up if successful) and **flexibility options** (switch inputs or outputs). Project NPV including options = NPV without options + value of options − cost of options.

## Worked example
Delta Robotics is evaluating a new production cell costing 1,000 today. Expected after-tax cash flows are 400 in year 1, 450 in year 2 and 500 in year 3. The required return is 10%.

**Step 1 - Discount each cash flow.**
- Year 1: 400 / 1.10 = 363.64
- Year 2: 450 / 1.10² = 450 / 1.21 = 371.90
- Year 3: 500 / 1.10³ = 500 / 1.331 = 375.66

**Step 2 - Sum and subtract the outlay.** 363.64 + 371.90 + 375.66 = 1,111.19. NPV = 1,111.19 − 1,000 = **111.19**.

**Step 3 - IRR.** Find the rate where NPV = 0. At 15%, NPV ≈ 16.85; at 16%, NPV ≈ −0.42. Interpolating, or using a calculator (CF0 = −1,000, C01 = 400, C02 = 450, C03 = 500, IRR CPT), IRR = **15.98%**.

**Step 4 - Decision.** NPV is positive and IRR exceeds 10%, so Delta should **accept** the project. It is expected to add about 111 dollars of value per 1,000 invested.

## Common exam traps
- Including sunk costs, such as a market study already paid for, in the project cash flows.
- Subtracting interest expense from cash flows and then also discounting at the cost of capital (double counting financing).
- Choosing the higher-IRR project among mutually exclusive projects when NPV ranks them differently.
- Ignoring cannibalisation of existing products, which reduces incremental cash flow.
- Rejecting a compliance project only because its standalone NPV is negative when the alternative is closing the business.

## Key takeaways
- Classify projects (going concern, regulatory, expansion, other) to decide how much analysis each needs.
- Use incremental after-tax cash flows; include opportunity costs and externalities; ignore sunk costs.
- Accept projects with NPV > 0 or IRR > required return; the rules agree for independent conventional projects.
- For mutually exclusive projects with conflicting rankings, follow NPV.
- Avoid inertia, pet projects and earnings-focused decisions; value real options explicitly.
