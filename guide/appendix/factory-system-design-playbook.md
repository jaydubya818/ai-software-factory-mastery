---
title: Factory System Design Playbook
status: reference
audience: [architect, builder, operator, product]
last_verified: 2026-09-07
lifecycle: [plan, execute, evaluate, deliver, learn]
risk: variable
topics: [architecture, planning, routing, recovery, evidence, economics, operations]
---

# Factory System Design Playbook

Use this playbook for time-boxed architecture questions, architecture reviews,
production design sessions, Factory Definition workshops, and engineering
leadership discussions.
It turns an architecture discussion into a reviewable operating contract for one
software-factory workflow. Bring the people who own the outcome, execution,
verification, and release. Leave with explicit boundaries, evidence requirements,
failure behavior, and the next qualification gate.

The six architecture areas remain **Intent, Harness, Capability, Model, Trust,
and Learning**. These questions connect them; they do not introduce another
lifecycle. Start with one repository and a repeatable workload. Use the
[enterprise delivery companion](./enterprise-multi-factory-delivery.md) when an
objective actually requires coordinated factory outcomes.

Use one stable design sequence throughout the conversation:

> **Requirements → scale → invariants → components → state → authority → failure
> modes → economics → observability → rollout → recovery → learning**

For a time-boxed design discussion, this sequence keeps the explanation coherent.
For a production review, every step must leave an owner, record, or test. Do not
name infrastructure until the workload semantics make the choice relevant.

## 1. Complete a workload worksheet

The builder describes the result and the decisions that matter. Platform defaults
can select implementation machinery within those boundaries. An architect can
still constrain the design; hiding infrastructure does not remove architectural
control.

Copy this table into the design packet and fill every row. Short, concrete answers
are better than architecture prose. Use UNKNOWN when a fact has not been measured,
then name its owner and resolution gate.

| Worksheet field | Record before execution |
| --- | --- |
| Workflow | Name one repeatable unit of work and its trigger, input, required output, and completion boundary. |
| User or business intent | State the observable user or business result, owner, priority, constraints, and explicit non-goals. |
| Repositories and systems | Name exact source repositories, services, environments, external dependencies, systems of record, and data classifications. |
| Baseline cycle time | Record the current median and useful tail for the same workload cohort and time window, or UNKNOWN with a measurement owner. |
| Current human effort | Record hands-on and waiting time by role, including review, coordination, recovery, and release work. |
| Volume and scale | Expected arrival rate, burst, concurrency, payload and repository size, deadline, retention, recovery objective, and growth assumption. |
| Invariants and failure modes | List what must always hold and the realistic ways intent, execution, verification, delivery, or observation can fail. |
| Acceptance criteria | Give every claim a stable identifier, threshold, subject, owner, and the condition under which it becomes stale. |
| Verification strategy | Map each criterion to deterministic checks, independent judgment where necessary, negative cases, and the evidence it must produce. |
| Authority boundaries | Identify who or what may plan, dispatch, call tools, publish, accept, release, contain, restore, override, and promote. |
| Rollback or repair | Name the restoration target, irreversible effects, compensation procedure, stop threshold, decision owner, and proof of recovery. |
| Economics | Set the approved request, Attempt, WorkOrder, verification, retry, and human-attention envelope; state ACTUAL, ESTIMATED, and UNKNOWN coverage. |
| Candidate Factory capabilities | List deterministic tools, skills, agents, models, context sources, harnesses, environments, policies, and evaluators that could satisfy the workload. Record qualification gaps instead of assuming eligibility. |
| Release and observation | Define rollout cohort, release owner, user-success signal, observation window, failure trigger, and the next learning decision. |

Unknown information is an open decision. If it changes permissions, correctness,
cost exposure, or reversibility, resolve it before dispatch. For other uncertainty,
record the assumption, owner, and the point when it must be checked.

See [intent engineering](../02-design/06-intent-and-specification-engineering.md)
for the complete specification contract.

## 2. Review the plan as a governed artifact

A planning model proposes a strategy. An approved Plan revision is the durable
contract consumed by orchestration. Changing the planner must not lose that
contract or rewrite execution history.

Before releasing WorkOrders, check:

1. Every deliverable traces to the approved intent and acceptance criteria.
2. The dependency graph is valid, required inputs have owners, and the join
   defines integration verification and partial-success behavior.
3. Each task requests qualified capabilities within its scope. Delegation
   subdivides the parent's authority and budget; it cannot multiply them.
4. The aggregate budget covers parallel children, retries, verification, and
   recovery. Task count and simultaneous execution have separate limits.
5. Required artifacts, independent verification, stop conditions, and decisions
   exist before execution starts.

Material changes create a new revision with a reason and impact assessment. Show
which downstream work, evidence, or approvals are no longer current. Stop affected
dispatch until the new revision satisfies its required gates. Local tactics can
adapt inside the approved boundaries without asking a human to approve every
tool call.

Measure planner quality through missing dependencies, rejected plans, downstream
rework, budget variance, and human corrections. A successful parser or valid
graph does not prove a good strategy.

## 3. Route eligible work, then allocate resources

Routing and scheduling answer different questions. The
[routing chapter](../03-build/22-routing-and-the-escalation-ladder.md) owns the
capability-selection rules; the
[control-plane chapter](../03-build/13-control-plane-orchestrator-and-execution-plane.md)
owns admission and lifecycle authority.

| Boundary | Decision | Required record |
| --- | --- | --- |
| Objective routing | Which factory can deliver the required outcome? | Outcome class, scope, qualification, and selected factory. |
| WorkOrder routing | Which qualified Factory Version and compatible Execution Profile can satisfy this work? | Exact composition, authority, constraints, and admission result. |
| Task routing | Which eligible deterministic tool, skill, agent, or model should perform this task? | Eligible set, rejected alternatives and reasons, selected version, policy, and qualification evidence. |
| Scheduling | When and where may admitted work run? | Dependency readiness, priority, quota, capacity, reservation, lease, and deadline. |

Apply security, data location, tool support, context capacity, quality, and other
hard requirements before optimizing latency or cost. Sometimes the right route
is a compiler, query, or codemod. Deterministic tools still require authorization
and validation of their output.

Start with explicit routing rules and a qualified default. Add adaptive selection
only when representative outcomes justify it. A fallback is eligible only if its
exact configuration satisfies the same hard requirements; provider unavailability
does not grant permission to send data elsewhere.

Under contention, bounded queues and per-scope limits should produce an honest
waiting or blocked state. Show the reason, remaining deadline, and responsible
owner. Reserve capacity for verification and recovery so producer fan-out cannot
consume everything needed to finish safely. Add fair-share scheduling or
checkpoint preemption when measured contention warrants their complexity.

## 4. Bind context and execution to an exact attempt

Keep authoritative workflow state outside disposable workers. A worker receives
an identity-bound execution envelope containing the repository revision, qualified
composition, context references, tool grants, environment, lease, and resource
limits. Persist artifacts and evidence before declaring a durable checkpoint.

Context retrieval must check permission as well as relevance. Retain source,
revision or retrieval time, classification, and the reason an item was selected.
Review freshness when a dependency or source changes. Permission-sensitive
knowledge also needs scoped caches, evidence access, retention, and deletion
rules; an index or embedding does not remove the original access restrictions.

Retrieved instructions can inform implementation within policy. They cannot
create authority, relax evidence requirements, or acquire credentials. Treat
generated code, repository content, and tool output as untrusted until the
relevant checks have passed.

Reproducibility means the configuration, inputs, operations, and evidence can be
reconstructed. It does not promise identical model tokens. Preserve operational
records and concise decision reasons; private model reasoning is not a required
audit artifact.

The [context and skills practices](./context-skills-engineering.md) explain
package versioning and evaluation in greater depth.

## 5. Specify failure and recovery before adding retries

The [durable execution chapter](../03-build/14-durable-execution.md) defines
Attempts, leases, cancellation, and reconciliation. Use this table as a drill
brief, with an owner and retained evidence for each applicable row.

Every drill follows the same response path: **detect → contain → reconcile →
recover → verify → learn**. Run the drills relevant to the workload before
increasing its autonomy or blast radius.

### Model failure

- **Detect:** invalid structure, failed criteria, policy refusal, hallucinated facts,
  or repeated activity without progress.
- **Contain:** stop the current Attempt from gaining more tools, budget, or release
  authority.
- **Reconcile:** preserve outputs and determine whether the failure came from the
  model, context, Plan, tool, or verifier.
- **Recover:** change the information or strategy, use a qualified route, or
  escalate; do not repeat the identical prompt indefinitely.
- **Verify:** rerun the affected criteria against the exact replacement candidate.
- **Learn:** add the case to the workload evaluation set and reconsider routing or
  capability qualification.

### Stale context

- **Detect:** compare source revision, retrieval time, dependency identity, policy,
  and required freshness with the frozen Context Package.
- **Contain:** stop dependent Tasks and mark affected evidence ineligible.
- **Reconcile:** identify which decisions and artifacts consumed the stale item.
- **Recover:** retrieve authorized current context and create a new governed input
  or Plan revision where material.
- **Verify:** rerun impacted criteria and currentness checks.
- **Learn:** improve freshness SLOs, invalidation signals, and provenance coverage.

### Worker crash

- **Detect:** missed heartbeat, expired lease, or lost execution channel.
- **Contain:** fence the old Attempt from publication or state mutation.
- **Reconcile:** inspect the last durable checkpoint and external effects.
- **Recover:** start a new Attempt from a proven boundary with new ownership.
- **Verify:** validate restored artifacts and the complete final candidate.
- **Learn:** retain the fault case and adjust checkpoint placement only from
  measured recovery cost.

### Lease loss

- **Detect:** ownership token or lease epoch no longer matches authoritative state.
- **Contain:** fail every consequential stale-worker commit closed.
- **Reconcile:** compare late events and artifacts with the current Attempt without
  accepting them.
- **Recover:** current ownership continues or a new lease is admitted.
- **Verify:** prove that authoritative state and external publication did not move.
- **Learn:** add late-event and stale-publication regressions to runtime tests.

### Verifier disagreement

- **Detect:** conflicting results for the same criterion and exact subject.
- **Contain:** keep the Quality Gate unresolved; a vote cannot erase a hard failure.
- **Reconcile:** compare methods, inputs, assumptions, versions, and independent
  failure modes.
- **Recover:** correct the faulty evaluator or obtain the missing domain evidence.
- **Verify:** rerun the disputed criterion and any invalidated aggregate decision.
- **Learn:** calibrate evaluator error and add the disagreement to evaluator tests.

### Candidate mutation

- **Detect:** candidate identity differs from the Verification Subject or approved
  publication subject.
- **Contain:** reject approval, publication, and release for the changed bytes.
- **Reconcile:** locate the mutation and every receipt bound to the prior candidate.
- **Recover:** freeze the intended candidate as a new subject.
- **Verify:** rerun all criteria invalidated by the mutation.
- **Learn:** strengthen immutable candidate storage and exact-subject gates.

### Cost overrun

- **Detect:** reservations, observed use, or committed liability approach a task,
  Attempt, WorkOrder, or cohort limit.
- **Contain:** deny new spend while preserving verification and safe-shutdown
  allowance defined by policy.
- **Reconcile:** settle late or ambiguous provider observations as ACTUAL,
  ESTIMATED, or UNKNOWN.
- **Recover:** replan, choose an eligible lower-cost route, reduce scope, or request
  explicit budget authority.
- **Verify:** confirm no child, retry, or late receipt exceeded aggregate liability.
- **Learn:** update estimates and routing evidence without rewriting historical cost.

### Provider ambiguity

- **Detect:** timeout or disconnect leaves the provider's execution or charge
  unknown.
- **Contain:** retain liability and prevent automatic duplicate dispatch.
- **Reconcile:** query the authoritative provider result using the logical request
  identity; keep UNKNOWN when no authoritative answer exists.
- **Recover:** accept the reconciled result, retry safely, use a qualified fallback,
  or escalate.
- **Verify:** bind any replacement result and cost to the correct Attempt.
- **Learn:** improve idempotency, receipt ingestion, and provider-specific recovery.

### Tool failure

- **Detect:** schema error, policy denial, partial side effect, unavailable service,
  or semantically invalid result.
- **Contain:** revoke or pause the exact Tool Grant when integrity is uncertain.
- **Reconcile:** inspect the destination and durable receipt before another call.
- **Recover:** correct input, use an authorized operation, compensate, or block.
- **Verify:** validate both the returned data and any external effect.
- **Learn:** add negative cases to tool qualification and narrow authority if needed.

### Publication uncertainty

- **Detect:** the source host does not confirm whether an exact candidate was
  published.
- **Contain:** do not create another publication or claim success.
- **Reconcile:** read the destination by repository, branch or pull-request head,
  and logical publication identity.
- **Recover:** adopt the confirmed result or perform one authorized idempotent retry.
- **Verify:** bind publication currentness to the exact candidate and evidence.
- **Learn:** strengthen destination reconciliation and late-event tests.

### Production regression

- **Detect:** the declared outcome, quality, security, or economic threshold fails
  during the observation window.
- **Contain:** stop new admission for the smallest qualified affected scope and
  decide separately how active work is treated.
- **Reconcile:** join release, Factory Version, route, context, evidence, and
  production signals without assuming one cause.
- **Recover:** restore a tested version, roll forward, compensate, or repair under
  current authority.
- **Verify:** prove service and user outcome recovery, not merely deployment health.
- **Learn:** create a regression case and Improvement Candidate for governed review.

### Conflicting agents

- **Detect:** overlapping write sets, incompatible assumptions, or dependency
  revisions invalidate another Task's work.
- **Contain:** prevent shared mutable publication and pause the affected join.
- **Reconcile:** identify the governing Plan dependency and authoritative artifact.
- **Recover:** serialize the conflicting unit, rebase a candidate, or revise the
  Plan with explicit invalidation.
- **Verify:** run local checks and global integration verification on the joined state.
- **Learn:** improve decomposition, ownership boundaries, and conflict prediction.

### Stale evidence

- **Detect:** source, candidate, Plan, Factory Version, policy, verifier assumption,
  runtime identity, or external dependency no longer matches validity conditions.
- **Contain:** revoke the affected transition's eligibility.
- **Reconcile:** trace every claim and decision that depended on the evidence.
- **Recover:** produce current Evidence against the exact subject and conditions.
- **Verify:** recompute the Quality Gate before approval or release.
- **Learn:** add machine-evaluable invalidation rules and monitor their coverage.

Use separate timeouts for tool calls, inference, Attempts, WorkOrders, and the
objective. Retry allowances follow failure class, idempotency, progress, cost,
and remaining deadline. A timeout is not proof that an external operation failed.
Cancellation is not rollback, and rollback may not reverse a data migration or
an exposed secret. Name a compensation or repair procedure before authorizing
an irreversible action.

## 6. Make acceptance a set of supported claims

Create a trace from **criterion → verification method → exact subject → evidence
→ decision**. Record the candidate and dependency identities, environment,
verifier version, policy, result, and validity conditions. Evidence is current
only while the conditions required by the acceptance contract remain satisfied.

Differentiate a failing criterion, missing evidence, stale evidence, and an
evaluator that could not complete. A changed candidate or material dependency
can require re-verification. A security revocation can invalidate eligibility
even when an older composition is reproducible.

Verifier disagreement needs an explanation at the criterion level. It is not
settled by counting model votes. Prefer executable checks where correctness is
deterministic; use model judgment for claims that need it and calibrate that
judgment against independent cases. Generated code and generated tests can share
the same mistaken assumption. Use trusted fixtures, adversarial cases, held-out
evaluations, and domain review appropriate to consequence.

An approval brief should show the original intent, change scope, criterion
coverage, residual risk, unusual behavior, reversibility, and exact action under
review. Record overrides with actor, reason, scope, and applicable authority.
Some policies cannot be waived by the requester. Reduce approval fatigue through
risk-proportional gates and better evidence, rather than turning every decision
into a routine click.

See [evaluation engineering](../04-prove/29-evaluation-engineering.md) and
[proof packages](../04-prove/31-quality-contracts-proof-packages-and-certificates.md).

## 7. Observe value and account for the whole cohort

Execution complete, verified, accepted, released, and outcome proven are separate
claims. Define the user outcome and observation window before release. A healthy
deployment can still produce incorrect behavior or fail to solve the user's
problem. When signals are unavailable, retain an unknown or pending outcome.

Use separate measures for separate decisions:

| Decision | Measure and interpretation |
| --- | --- |
| Can work finish reliably? | Queue time, completion latency, successful recovery, and deadline misses by workload class. |
| Is verification useful? | First-pass verification, false findings, missed defects, flaky checks, and evaluator uncertainty. |
| Does work earn acceptance? | Accepted verified outcomes divided by the declared eligible workload cohort; record rejection and rework. |
| Does delivery create value? | The workload's observed user result, escaped defects, regressions, and rollback or repair within its declared window. |
| Is it economical? | All attributable cohort costs divided by accepted verified outcomes; show measurement coverage and human effort. |
| Is the review experience workable? | Human review minutes, decision wait, repeated overrides, and post-approval failures. |

Include failed attempts, retries, verification, tools, compute, sandbox time, and
human effort in the declared cost scope. Separate ACTUAL, ESTIMATED, and UNKNOWN
components. Missing provider billing is not zero. No accepted outcomes makes cost
per accepted outcome undefined. Compare like workloads over declared windows;
do not compare a measured total against another route's partial token cost.

For a simple illustrative calculation, if a cohort consumes 120 currency units
and produces eight accepted verified outcomes, its cost per accepted outcome is
15 units. If compute and human costs are absent, label 15 as a partial observed
cost, not the full economic result. These numbers are arithmetic examples, not
benchmarks or measured factory performance.

The [economics chapter](../02-design/09-tokenomics-and-factory-economics.md)
defines the detailed accounting contract.

## 8. Qualify improvements and contain regressions

Treat a Factory Version as a qualified composition, with exact component
identities and compatibility constraints. The Execution Profile bounds a
particular execution. Qualification does not activate either one, and a model,
tool, or verifier upgrade can change behavior even if application code is stable.

Follow a bounded progression: representative offline evaluation, shadow use
where appropriate, a limited authorized cohort, observed comparison, then an
explicit promotion decision. Shadow execution still consumes resources and may
expose data; prohibit consequential writes and keep the same permission controls.
Set quality, policy, outcome, and economic stop thresholds before the experiment.

Incident and outcome signals feed a diagnosis and an Improvement Candidate.
Prefer a context correction, skill revision, deterministic check, or routing-rule
change when it solves the problem. Training adds data-permission, evaluation,
distribution, and deletion obligations; it is an optimization to justify, not
the default learning mechanism.

Contain the smallest reliable scope: a repository, Factory Version, capability,
route, or execution profile, but only where that control is implemented and
qualified. Stop new work first, explicitly decide the treatment of active work,
preserve evidence, and restore only with current authority and a tested target.
Autonomy is granted by workload and action, can be reduced, and should never
rise merely because the factory produced a confident explanation.

See [incident operations](../05-operate/36-resilience-incidents-and-the-control-tower.md)
and [governed learning](../06-improve/40-governed-learning.md).

## 9. Work through one dependency upgrade

This is an illustrative design exercise. It reports no executed trial or
production qualification.

**Intent:** upgrade one dependency in one repository while preserving the current
public interface. The owner supplies the allowed version range, test requirements,
cost ceiling, and release window. A major-version migration is a non-goal. The
baseline cohort currently takes a median 95 minutes and 38 minutes of human effort
per accepted upgrade; these are illustrative planning values, not benchmark claims.

**Plan:** inspect the impact, produce an isolated candidate, verify compatibility,
and prepare a decision brief. Dependencies, acceptance criteria, verification,
authority implications, expected cost, and current revision are visible. Reserve
budget for verification and one bounded recovery attempt. Reject a Plan that
silently expands repository or release scope.

**Factory Version and WorkOrder:** the approved Plan selects a qualified immutable
Factory Version and compatible Execution Profile. The WorkOrder binds the exact
repository revision, criteria, 24-unit ceiling, publisher boundary, and human
acceptance owner. Qualification does not activate a new factory composition.

**Route and execute:** use package inspection and deterministic checks first.
Select a qualified agent only for changes requiring judgment. Admit the exact
profile, repository state, context, and tool grants before execution.

**Producer Attempt, candidate, and recovery:** the producer creates an unpublished
candidate in isolated state. Simulate a worker loss after candidate persistence.
A new Attempt resumes from the checkpoint with a new lease. The original worker's
late result cannot replace the current candidate. A timed-out publication request
is reconciled against the destination before another write is attempted.

**Verifier Attempt and approval:** an independent verifier checks the exact
candidate and criterion coverage. A changed dependency lock invalidates affected
evidence. The human reviews residual risk and accepts only the current verified
candidate. Publication and production release retain their own authority.

**Release, outcome economics, and learning candidate:** after release, track the
defined compatibility and user signals through the agreed window. Suppose the
accepted WorkOrder records 11 ACTUAL units, 4 ESTIMATED human-effort units, and 3
UNKNOWN provider units. Report 15 measured/estimated units plus 3 UNKNOWN, never
an invented total of 18. With one accepted and released outcome, the observed
partial cost per accepted outcome is 15; business value remains UNKNOWN until the
observation window closes. A regression creates an incident, attributable repair
work, a regression case, and a Learning Signal. A proposed skill or verifier
change becomes an Improvement Candidate, passes evaluation and qualification,
then requires approval before a new Factory Version is promoted. Restoration of
the prior version remains a separate authorized action.

## 10. Leave the review with an actionable packet

Keep a concise packet containing the workload brief, exact Plan and configuration,
criterion/evidence map, budget and capacity assumptions, failure drill results,
release/observation contract, and unresolved decisions with owners. Record the
main design tradeoff and what would justify changing it.

For an initial line, reuse existing source control, CI/CD, compute, identity,
and diagnostic systems. Build the control contracts and evidence joins that are
missing. Defer a new harness, universal routing engine, recursive agent fleet,
custom training platform, or multi-region topology until workload evidence
demonstrates a need.

## Mission Control: implementation boundary

At source revision
[`ee870794`](https://github.com/jaydubya818/MissionControl/blob/ee870794cddb426824fc881a520ccdda028060d6/docs/product/software-factory-capability-maturity.md),
governed planning, Attempts, leases, independent verification, and diagnostic
evidence provide a foundation. Broader routing remains gated. Inference
accounting has offline qualification; real provider billing and full accepted
outcome economics remain unqualified. Learning is advisory.

The
[incident qualification record](https://github.com/jaydubya818/MissionControl/blob/ee870794cddb426824fc881a520ccdda028060d6/docs/testing/evidence/factory-incident-command-production-v55/README.md)
proves pause and separately authorized restoration of dispatch for one exact
repository, using a synthetic qualification incident. It does not qualify every
control, repository, or real customer incident. Prioritize a complete observed
workload and readable decisions over duplicating these existing subsystems.

These are source- and evidence-bound observations, not a claim that this
playbook's full design is implemented or currently enabled in any deployment.

## Retain this

- Define the outcome, evidence, budget, and authority before dispatch.
- Route only eligible capabilities; schedule within capacity and quota.
- Recover from durable facts; reconcile uncertain effects before retrying.
- Keep proof current and decisions separate from model confidence.
- Observe user value, qualify improvements, and expand authority from evidence.
