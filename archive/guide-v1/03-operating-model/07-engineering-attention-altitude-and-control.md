---
title: Engineering Attention Altitude and Governed Control
status: review-ready
audience: [executive, architect, engineering-leader, product, senior-engineer, ai-engineer, platform, quality]
last_verified: 2026-09-01
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: high
topics: [engineering-attention, leverage, control, abstraction, human-oversight, evaluated-coverage, out-of-distribution]
---

# Engineering Attention Altitude and Governed Control

## Quick Read

- **Purpose:** Decide when an engineer should inspect implementation details and
  when the factory can safely summarize, delegate, or automate them.
- **Core tradeoff:** Higher attention altitude can create leverage, but it
  reduces direct inspection. The correct level depends on risk, novelty,
  evidence, reversibility, and evaluated coverage.
- **Control model:** Direct control comes from inspecting and performing the
  work. Governed control comes from contracts, independent evidence, bounded
  authority, recovery, and explicit decisions. Neither is universally better.

## 1. The problem

AI coding agents can produce more candidate work than engineers can inspect
line by line. If humans review every token and every diff, automation produces
little leverage. If humans supervise only dashboards and outcome summaries,
design defects and silent assumptions may pass outside the system's evaluated
coverage.

The design problem is therefore not “human in the loop or fully autonomous.” It
is choosing the right level of human attention for each decision while keeping
accountability and recovery intact.

## 2. Five attention levels

| Level | Human attention | Typical objects | Direct inspection | Appropriate when |
| --- | --- | --- | --- | --- |
| 1. Implementation | Lines, commands, schemas, tests, tool arguments | Code diff, migration, query, shell command, credential scope | Highest | Novel or high-impact change; evidence weak; exact mechanics matter |
| 2. Component | Interfaces, modules, dependencies, failure paths | Service contract, package, API, repository subsystem | High | Local architecture and compatibility are the main risk |
| 3. Workflow | Intent, tasks, attempts, evidence, approval, recovery | Feature workflow, defect repair, dependency update, incident path | Moderate | The workflow is bounded and its validators are trusted |
| 4. System | Policies, portfolios, SLOs, exceptions, trends, incidents | Factory control plane, repository fleet, capability catalog | Low | Repeated workflows are stable and exceptions are visible |
| 5. Outcome | Customer value, risk, economics, confidence | Business outcome, adoption, quality, cost, strategic tradeoff | Lowest | Lower layers have proven controls and the decision is truly outcome-level |

This is not a career ladder and not a one-way progression. A staff engineer may
operate at outcome level for a mature workflow and drop immediately to a tool
argument when a new failure appears.

## 3. Move up for leverage

Move attention upward only when most of these conditions are true:

- the domain, repository, and workflow are understood;
- the work is familiar, bounded, and sufficiently repetitive;
- inputs and acceptance criteria are explicit;
- representative evaluations cover normal and critical slices;
- independent validators are reliable and difficult for the executor to game;
- failures are detected early and classified correctly;
- rollback, cancellation, and recovery have been exercised;
- permissions, side effects, time, and cost are bounded;
- observed outcomes show sustained benefit without unacceptable regressions;
- exceptions route back to a named human with enough evidence to decide.

Recurrence is a signal to evaluate automation, not proof that automation is
safe. A frequently repeated task can still be unsuitable when its failures are
rare, severe, or hard to observe.

## 4. Move down for control

Move attention closer to implementation when any of these conditions appears:

- the domain, repository, dependency, or failure is unfamiliar;
- the action is difficult to reverse or has a large blast radius;
- data, identity, privacy, financial, legal, or security consequences increase;
- evaluation coverage is weak, stale, or contradicted by production behavior;
- system design, algorithmic complexity, performance, or exact semantics matter;
- the agent changes a boundary, migration, policy, permission, or public
  contract;
- tool results conflict, provenance is incomplete, or missing data is material;
- retries repeat without measurable improvement;
- cost, latency, failure rate, or user impact departs from its approved envelope;
- a task is outside the distribution represented by the qualified models,
  contexts, tools, skills, and evaluation cases.

Dropping attention altitude is not a failure of autonomy. It is the normal
control response to uncertainty.

## 5. Direct control and governed control

### Direct control

The human performs or inspects the consequential details. This produces strong
local understanding but consumes scarce attention and does not automatically
scale. Direct inspection can still miss defects when the reviewer lacks context
or is overloaded.

### Governed control

The human defines intent, constraints, acceptance, authority, and escalation,
then relies on bounded execution and independent evidence. This can scale
further, but only if the surrounding contracts and validators are credible.

| Question | Direct control answers with | Governed control answers with |
| --- | --- | --- |
| What was allowed? | Human instruction and review | Versioned policy and execution grant |
| What ran? | Observed commands or diff | Immutable attempt manifest and event trace |
| Was it correct? | Expert inspection | Independent tests, checks, evidence, and accountable decision |
| What failed? | Manual diagnosis | Failure classification, correlated telemetry, and replay |
| Can it be stopped? | Human intervention | Scoped cancel, revoke, quarantine, and kill controls |
| Can it recover? | Manual repair | Rollback, retry, reconciliation, and verified restoration |

Governed control is not “hands off.” It moves human effort from performing every
step to designing the system, calibrating validators, reviewing exceptions, and
owning consequential decisions.

## 6. Evaluated coverage and out-of-distribution work

An agent workflow is **inside evaluated coverage** when its material inputs,
state, tools, side effects, failure modes, and expected outcomes are represented
by current qualification evidence. A task is **outside evaluated coverage**
when one or more of those dimensions differs materially from what was tested.

Examples include:

- a familiar code change in a new language or framework;
- a normal migration against an unfamiliar data volume or tenancy model;
- an approved tool used with a new side effect or permission scope;
- a known repository after a major architecture or dependency change;
- a common incident with a novel cause or conflicting telemetry;
- a task whose acceptance depends on domain knowledge absent from the current
  context and evaluation set.

Out-of-distribution detection is not a single model score. Use combined signals:
repository and dependency fingerprints, schema compatibility, task
classification, source freshness, tool eligibility, evaluation coverage,
uncertainty, novelty, conflict, and production drift. When coverage is unclear,
reduce autonomy and request closer inspection.

## 7. Put attention policy into the workflow

For each workflow define:

1. **Default altitude:** the normal human review level.
2. **Mandatory inspection points:** migrations, public interfaces, security
   boundaries, high-impact changes, or other locally material objects.
3. **Escalation triggers:** novelty, risk, conflict, missing evidence, budget,
   drift, repeated failure, and authority exceptions.
4. **Evidence package:** the minimum facts needed to decide without recreating
   the entire run.
5. **Drill-down path:** direct links from an outcome to workflow, task, attempt,
   tool call, artifact, and source evidence.
6. **Return condition:** what proof allows attention to move back up after an
   incident or regression.

The interface should never trap a reviewer at a summary. Every aggregate claim
must be traceable to the exact underlying records without changing their
meaning.

## 8. Metrics for attention and leverage

Do not measure leverage as generated code volume. Use coupled measures:

- **Flow:** time from governed intent to accepted production outcome;
- **Quality:** escaped defects, rework, rollback, incidents, and acceptance
  stability;
- **Leverage:** accepted outcome per unit of human attention;
- **Cost:** model, tool, compute, platform, and human review cost;
- **Confidence:** evidence freshness, coverage, independence, and uncertainty.

Segment by risk, repository, workflow, autonomy level, change type, and time.
Distinguish measured facts from proxies and missing data. A faster workflow that
increases rework or hides human review time has not demonstrated leverage.

## 9. Failure modes

| Failure | What it looks like | Correction |
| --- | --- | --- |
| Automation bias | Reviewers accept polished summaries without inspecting evidence | Show counterevidence, uncertainty, and required drill-downs |
| Review theater | Human approval exists but the packet cannot support a decision | Define minimum independent evidence and decision options |
| Detail addiction | Every change receives the same line-by-line review | Risk-tier review and promote only proven workflow slices |
| Altitude lock-in | Leaders cannot reach underlying records or engineers never see outcomes | Bidirectional traceability from metric to event and back |
| Proxy optimization | Throughput rises while customer value or quality falls | Couple flow, quality, leverage, cost, and confidence |
| Stale trust | Autonomy remains high after model, context, repository, or provider change | Expiring qualification and event-driven recertification |
| Hidden human work | Manual cleanup is excluded from automation metrics | Capture total attention, intervention, rework, and exception cost |

## 10. Operating checklist

- Is the current attention level explicit for each risk tier and workflow?
- Can a reviewer drill from outcome to exact attempt, evidence, and artifact?
- Are mandatory inspection objects defined by consequence rather than habit?
- Does promotion require measured flow, quality, leverage, cost, and confidence?
- Are facts, proxies, uncertainty, and missing data visually distinct?
- Does material novelty reduce autonomy automatically or require re-admission?
- Can humans cancel, restrict, quarantine, reject, and request revision?
- Are human interventions, review time, rework, and exceptions measured?
- After an incident, is the return-to-service evidence explicit?
- Does the system preserve the meaning of underlying records when metrics roll
  up?

## 11. Relationship to compounding engineering

Compounding engineering moves recurring knowledge into reusable instructions,
skills, tools, evaluations, and platform capabilities. That increases leverage
only when the reusable capability is versioned, owned, tested, observable, and
revocable. The goal is not to remove human attention. It is to spend attention
on the highest-value decisions and make repeated lower-level work safely
reusable.

## 12. Related guide chapters

- [Compounding Engineering and Human Attention](./05-compounding-engineering-and-human-attention.md)
- [Factory Economics and Operating Metrics](./02-factory-economics-and-operating-metrics.md)
- [Enterprise Governance Operating Model and Decision Rights](./06-enterprise-governance-operating-model-and-decision-rights.md)
- [Operational Autonomy and Trust Calibration](../02-first-principles/01-operational-autonomy-and-trust-calibration.md)
- [Agentic Architecture Patterns and Autonomy Selection](../06-ai-engineering/10-agentic-architecture-patterns-and-autonomy-selection.md)

