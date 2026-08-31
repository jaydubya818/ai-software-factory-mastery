---
title: Control Tower Monitoring, Detection, and Response
status: review-ready
audience: [executive, architect, platform, operations, sre, security, quality, product]
last_verified: 2026-08-30
lifecycle: [execute, verify, deliver, learn]
risk: critical
topics: [control-tower, monitoring, drift, detection, incident-response, improvement]
---

# Control Tower Monitoring, Detection, and Response

## Quick Read

- **Operating loop:** Observe -> Evaluate -> Detect -> Triage -> Respond ->
  Verify -> Improve.
- **Purpose:** Connect inventory, authority, health, quality, safety, cost,
  drift, incidents, response, and verified closure in one operating view.
- **Core rule:** An anomaly may trigger investigation or containment. It must
  never silently rewrite prompts, policies, models, evaluators, or capabilities.
- **Evidence boundary:** A dashboard is a projection. Authoritative records and
  retained evidence remain in their owning systems.

## 1. The problem

Individual dashboards show calls, latency, cost, test results, policy events,
or incidents. Operators need to know which governed system, release, autonomy
grant, owner, and outcome are affected; what response is active; when it is
due; and whether recovery has been independently verified. Without that spine,
signals become unactionable noise and changes occur outside governance.

## 2. Enduring Principle

### Operate through governed subjects and explicit response state

The control tower reads the system inventory and links telemetry and evidence
to exact subjects. It does not become the source of truth for policy, workflow,
incidents, or capability versions. Actions invoke the same authorized control
APIs used elsewhere; UI and API behavior remain equivalent.

## 3. Response lifecycle

| Stage | Question | Owned output | Exit condition |
|---|---|---|---|
| Observe | What happened and what is the current state? | Correlated signals and coverage gaps | Required telemetry/evidence collected or gap recorded |
| Evaluate | Is behavior inside expected quality, safety, policy, reliability, cost, and outcome bounds? | Evaluations against pinned baselines | Evaluation completes with uncertainty |
| Detect | Is there meaningful change or violation? | Deduplicated finding with subject and severity candidate | Finding created or normal variation recorded |
| Triage | What is scope, urgency, owner, and likely class? | Severity, owner, deadline, incident link | Response decision made |
| Respond | Continue, contain, pause, retry, fallback, reconfigure, rollback, quarantine, or retire? | Authorized control actions | Enforcement acknowledged and reconciled |
| Verify | Is the system safe, correct, and restored? | Independent recovery result and residual risk | Named owner accepts closure or escalates |
| Improve | Which controlled change prevents recurrence? | Evaluated proposal, approval, rollout, rollback | Promotion or explicit rejection recorded |

## 4. Control-tower subject model

Every view starts with a `FactorySystemRecord` and links current lifecycle,
risk, autonomy ceiling, owners, releases, workflows, capabilities, models,
tools, data, policy decisions, denials, exceptions, evidence freshness,
dependencies, incidents, cost, performance, and outcomes. The current response
records owner, severity, state, deadline, action, acknowledgement, verification,
and escalation.

## 5. Signal and drift catalog

| Signal family | Examples | Comparison |
|---|---|---|
| Health | queue age, dependency availability, errors, saturation | SLO and capacity baseline |
| Behavior | route, plan depth, tool sequence, stop reason, retries | Qualified configuration baseline |
| Model/context/tool/evaluator | version, source mix, tool success, grader distribution | Pinned version and slice baseline |
| Quality and outcome | acceptance, escaped defect, rollback, customer measure | Quality contract and outcome target |
| Safety/security/privacy | policy denial, injection signal, data destination, credential anomaly | Zero-tolerance and risk thresholds |
| Cost/latency | tokens, calls, environments, human time, end-to-end percentiles | Budget and service objective |
| Governance | expired review, exception age, owner gap, evidence freshness | Inventory and control policy |

Drift can be data, semantic, context, model, prompt, tool, evaluator, workflow,
policy, cost, reliability, or business-outcome drift. A statistical change is
not automatically harmful; a policy violation may be critical without
statistical significance.

## 6. Baselines, thresholds, and alert quality

Baselines are versioned by workflow, risk, repository class, tenant, model
profile, and time window. Thresholds include absolute policy limits,
rate/ratio changes, percentile shifts, budget burn, evidence expiry, and
multisignal conditions. Each detection rule names owner, severity, window,
minimum sample, uncertainty, false-positive disposition, deduplication key,
suppression and maintenance rules, retention, privacy, and runbook.

Suppression never hides security incidents or control failures without a
recorded exception. Repeated false positives produce a reviewed rule-change
proposal; operators do not disable protection informally.

## 7. Response actions and authority

- **Continue with observation:** variation is explained and within policy.
- **Pause:** hold new steps at a safe checkpoint while preserving state.
- **Cancel:** end work and reconcile partial effects.
- **Retry:** repeat only under the operation's idempotency contract.
- **Fallback:** select a prequalified alternative with explicit changed limits.
- **Reconfigure:** follow change control; never silently mutate live policy or
  prompts from an anomaly.
- **Rollback:** restore a known version and verify data/outcomes.
- **Quarantine:** block selection and isolate the affected subject.
- **Retire:** remove authority and traffic, retain evidence, and delete by policy.

Each action displays requested effect, subject, authority, risk, evidence,
deadline, expected acknowledgement, recovery implication, and alternate action.

## 8. Detection-to-closure contract

```yaml
finding:
  id: finding-811
  subject: factory-system:payments-delivery@7
  rule: behavior-drift/tool-sequence@3
  baseline: baseline:bounded-change@12
  observed_window: 2026-08-30T17:00:00Z/2026-08-30T18:00:00Z
  evidence_refs: [trace-query:91, evaluation:44]
  severity: high
  owner: role:runtime-oncall
  deadline: 2026-08-30T18:15:00Z
  response: quarantine-capability-version
  control_ref: control-command:204
  state: verifying
  recovery_evidence: evaluation:49
  residual_risk: "Affected prior releases under review"
```

A finding progresses through `new`, `triaged`, `responding`, `contained`,
`recovering`, `verifying`, `closed`, or `escalated`. Closure records detection
quality, response, affected scope, verified recovery, residual risk,
notifications, postmortem, and improvement disposition.

## 9. Failure modes

| Failure | Protection |
|---|---|
| Dashboard stale during incident | Show last-updated and authoritative links; use control APIs directly |
| Duplicate alerts | Subject/rule/window deduplication and incident grouping |
| Missing telemetry | Coverage alarm and explicit uncertainty; do not infer normal |
| Automated response loops | Bounded actions, cooldowns, durable state, human escalation |
| Compromised signal source | Cross-source corroboration and evidence integrity |
| Response command not enforced | Separate acknowledgement and observed verification deadlines |
| Recovery causes regression | Independent post-recovery quality and outcome checks |

## 10. Accessibility and operator experience

Color never carries state alone. Tables, labels, timestamps, owner, severity,
and next action provide a complete text equivalent. Keyboard users can select
subjects, inspect evidence, and invoke authorized controls. Confirmations state
the effect and recovery implication. Loading, empty, stale, permission-denied,
partial-data, success, failure, and unknown states are explicit.

## 11. Tradeoffs and nonclaims

A unified view improves coordination but can become a dangerous administrative
super-console. Keep it a least-privilege projection with narrow control APIs,
step-up authorization, dual control where required, and full audit. This
review-ready design does not prove detection quality, response time, closure
effectiveness, or production accessibility.

## 12. Review exercise

Inject a quality regression, cost spike, stale evidence, and compromised tool
version into one synthetic system. Demonstrate deduplication, triage,
containment, owner escalation, rollback or quarantine, independent recovery
verification, postmortem, and a change-controlled improvement proposal.
