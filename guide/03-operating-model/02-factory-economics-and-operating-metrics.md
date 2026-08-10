---
title: Factory Economics and Operating Metrics
status: draft-for-study
audience: [executive, architect, product, platform, senior-engineer]
last_verified: 2026-08-09
mission_control_commit: b31e27564deb1c03c167e61b5ee094567c2ba7b1
---

# Factory Economics and Operating Metrics

## 1. The problem

Agent activity is easy to measure and easy to mistake for value. Tokens,
sessions, generated lines, tool calls, and pull-request volume can all rise while
customer outcomes slow, defects increase, and engineers spend more time
recovering or reviewing low-quality work.

An AI Software Factory succeeds only when it improves speed, quality, and
engineering leverage together. Its measurement system must connect business
intent to validated outcomes and make the costs of attention, rework, delay,
and failure visible.

## 2. Why the problem exists

Local optimization fragments the lifecycle. Coding tools report generation
speed. CI reports test duration. finance sees model spend. product sees feature
delivery. incident systems see failure. Without shared lineage, nobody can
calculate the economics of one governed Mission.

Automation can also shift rather than remove work. Faster implementation may
create slower review. More parallelism may create merge conflicts. Cheaper
models may increase validation and recovery cost. Metrics must expose the whole
system rather than reward one stage.

## 3. Enduring Principle

### Measure validated customer value, not activity

The primary lead-time clock starts when business intent becomes a governed
Mission. It stops when the change is deployed, independently validated in
production or a production-equivalent environment, and the expected customer
outcome is confirmed. Merge time is an intermediate measure, not the outcome.

The first three executive measures are:

1. **Lead Time to Validated Customer Value** — elapsed time from governed intent
   to confirmed outcome.
2. **Change Failure Rate** — the proportion of deployments that cause rollback,
   hotfix, emergency intervention, customer regression, reliability or security
   incident, or SLA/SLO violation within a default seven-day observation window.
3. **Engineering Leverage** — valuable outcomes per unit of scarce engineering
   capacity without increasing cognitive load or coordination cost.

These form a constraint system. Speed without quality is rework. Quality without
speed is delay. Throughput without human sustainability is hidden debt.

```mermaid
flowchart LR
    Intent["Governed business intent"] --> Delivery["Validated delivery"]
    Delivery --> Outcome["Confirmed customer value"]
    Intent -. "lead time" .-> Outcome
    Delivery --> Failure["7-day failure observation"]
    People["Human time and attention"] --> Delivery
    Compute["Model, tool, and infrastructure cost"] --> Delivery
```

### Build a metric hierarchy

**Business outcomes:** adoption, revenue, retention, risk reduction, or customer
problem solved.

**Delivery outcomes:** lead time, deployment frequency, change failure,
recovery time, accepted WorkOrders, and outcome confirmation.

**Factory effectiveness:** autonomous completion, first-pass validation,
recovery success, evidence completeness, approval latency, review time, and cost
per accepted outcome.

**Operational diagnostics:** tokens, tool calls, model latency, queue depth,
lease expiry, retries, provider errors, and context size.

Diagnostic metrics explain outcomes. They are not the outcomes.

### Define engineering leverage carefully

No single number proves leverage. Use a balanced evidence set:

- reduced lead time with stable or improved change failure rate;
- increased throughput of accepted, validated work;
- reduced human implementation hours per work item;
- reduced waiting and coordination time;
- more time spent on architecture, product, and customer problems;
- stable or lower review and recovery burden; and
- improved developer satisfaction and perceived control.

The objective is more customer value per engineer, not more commits per
engineer.

### Measure flow and attention

Break lead time into queue, planning, approval, execution, validation, review,
deployment, and outcome-observation time. This reveals whether the factory
accelerates work or moves the bottleneck.

Human attention is a constrained resource. Track number of interventions,
decision latency, time per approval, evidence inspection time, false alarms,
and repeated requests. An autonomy system that consumes more senior attention
than it returns has negative leverage.

### Attribute full cost

Cost per accepted WorkOrder should include model and token spend, tools,
infrastructure, CI, storage, human implementation, review, recovery, rework,
incidents, and allocated platform operation. Estimate uncertainty explicitly.

Compare marginal cost and marginal value. A more expensive model can be cheaper
overall if it reduces retries and review. A cheaper run that fails validation is
inventory, not value.

### Use cohorts and baselines

Compare similar repositories, risk bands, change types, and autonomy levels.
Establish a stable pre-factory baseline and use medians and percentiles rather
than averages alone. Avoid causal claims from simultaneous organizational,
tooling, and product changes without an experimental design.

## 4. Tradeoffs and alternatives

Comprehensive measurement can become surveillance. Measure workflows and
systems, not individual developer productivity. Lines of code, commits, hours
online, and prompt volume are especially harmful as performance targets.

Business outcomes can take weeks to observe, while teams need fast feedback.
Use leading indicators, but label them as proxies. Do not quietly substitute
“PR merged” for customer value.

Cost attribution will be imperfect. A transparent range is better than a precise
but incomplete number. The measurement system itself has operational cost and
should remain proportional to the decisions it supports.

## 5. Current Mission Control Implementation

At commit
[`b31e27564deb1c03c167e61b5ee094567c2ba7b1`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1),
Mission Control has useful operational telemetry but not a complete factory
economics system.

Convex records run cost, duration, tokens, cost events, generic metrics, workflow
success, failures, retries, pauses, model cost, completed Tasks, policy denials,
activity, blocked work, and pending approvals. Factory Configuration versions
bound maximum cost, runtime, and attempts. Analytics pages can display run,
Task, spend, denial, activity, and workflow performance summaries.

Several measures remain proxies. Task completion is not WorkOrder acceptance.
Run success is not validated customer value. Activity streaks and tool-call
volume are operational information, not productivity. Some analytics queries
collect bounded local-scale data and are not yet a scalable outcome model.

The V1 decision log selects GitHub Issues with governed labels and exact
repository/commit linkage as the source for production defects, incidents, and
rollbacks. The program plan calls for cost per accepted WorkOrder, developer
review time, recovery metrics, trust, and outcome economics, but the complete
Mission-to-production measurement chain is not currently proven.

## 6. Future Vision

Mission Control should create an immutable metric timeline from Mission
governance through Plan, WorkOrder, Task, Attempt, evidence, PR, deployment,
production observation, and outcome confirmation. Every duration and cost
should roll up without changing the meaning of the underlying records.

The executive view should lead with the three coupled measures and expose flow,
quality, leverage, cost, and confidence underneath. It should segment by risk,
repository, workflow, autonomy level, and time window and visibly distinguish
measured facts, proxies, and missing data.

## 7. Versioned references

- [Analytics](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/analytics.ts)
- [Generic metrics](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/metrics.ts)
- [Workflow metrics](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/workflowMetrics.ts)
- [Cost events](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/convex/costEvents.ts)
- [V1 decisions](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/decisions/ai-software-factory-v1-decisions.md)
- [V1 program plan](https://github.com/jaydubya818/MissionControl/blob/b31e27564deb1c03c167e61b5ee094567c2ba7b1/docs/plans/2026-08-02-feat-ai-software-factory-v1-program-plan.md)

## 8. Notes and lessons learned

Mission Control already measures much of what is easiest to count. The mastery
challenge is to resist presenting those numbers as proof of value. The system
needs lineage from intent to accepted outcome before factory ROI is defensible.

## 9. Interview and discussion questions

1. When exactly does lead time start and stop?
2. Why is time to merge insufficient?
3. How do you define a change failure?
4. What proves engineering leverage without surveilling developers?
5. How would you calculate cost per accepted WorkOrder?
6. Which current Mission Control metrics are proxies?
7. How would you establish causal confidence in a factory rollout?

## 10. Whiteboard exercise

Draw a metric tree from customer outcome down to delivery, factory, and runtime
diagnostics. Add a team that doubles PR throughput while review time and change
failure rise. Explain why the factory has not improved and which bottleneck to
address.

## 11. Hands-on lab

Select ten comparable changes. Define the start, stop, seven-day failure window,
human time, total cost, and accepted outcome for each. Map which data Mission
Control can currently supply and which requires GitHub or manual evidence.

Required evidence: metric dictionary, lineage map, missing-data register,
baseline and target, confidence limits, and an executive readout that does not
use commits, tokens, or lines of code as value.
