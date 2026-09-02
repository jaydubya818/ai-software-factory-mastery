---
title: Authority, Autonomy, and Emergency Control
status: review-ready
audience: [architect, security, platform, operations, quality, product, executive]
last_verified: 2026-08-30
lifecycle: [intent, execute, verify, deliver, learn]
risk: critical
topics: [authority, autonomy, identity, emergency-control, containment, recovery]
---

# Authority, Autonomy, and Emergency Control

## Quick Read

- **Purpose:** Define how authority is delegated, exercised, reduced, revoked,
  contained, and restored.
- **Core distinction:** Pause, cancel, revoke, quarantine, rollback, failover,
  and shutdown solve different failure states.
- **Safety rule:** Emergency containment must not depend on the component being
  contained or on an ordinary approval path that may be unavailable.
- **Proof:** Exercise the control, preserve evidence, verify the resulting
  state, and test recovery. A button alone proves nothing.

## 1. The problem

Autonomy is safe only while current authority, policy, dependencies, and
evidence remain valid. A running workflow may become unsafe after credential
theft, compromised context, an evaluator failure, cost runaway, production
incident, policy change, or operator cancellation. The system needs precise
controls that bound current work without corrupting state or hiding partial
effects.

## 2. Enduring Principle

### Authority is a revocable chain, not a role label

```mermaid
flowchart LR
  Human["Named human authority"] --> Policy["Policy decision"]
  Policy --> Grant["Short-lived scoped grant"]
  Grant --> Workload["Workload identity"]
  Workload --> Attempt["Attempt manifest"]
  Attempt --> Tool["Tool authorization"]
  Tool --> Effect["Observed side effect"]
  Effect --> Evidence["Independent evidence"]
  Evidence --> Decision["Acceptance or escalation"]
```

The chain records delegator, recipient, subject, purpose, scope, constraints,
policy version, issued and expiry times, and revocation handle. The narrowest
applicable ceiling wins. An agent cannot delegate authority it does not hold,
change policy, approve its own high-risk result, or convert telemetry into
acceptance evidence.

## 3. Emergency action semantics

| Action | Meaning | State effect | Authority effect | Recovery requirement |
|---|---|---|---|---|
| Pause | Stop scheduling new steps; preserve resumable state | Running to paused at a safe checkpoint | Existing grants may remain but cannot be used | Revalidate context, policy, grants, leases, and dependencies before resume |
| Cancel | End the requested workflow | Terminal cancelled after compensation decision | Revoke attempt-scoped grants | Reconcile partial side effects; start new work for a retry |
| Revoke | Invalidate a credential, capability, version, or grant | Affected calls fail closed | Explicit authority removal | Issue a new qualified grant only after review |
| Quarantine | Isolate a subject from selection and propagation | Quarantined lifecycle state | Deny new use and constrain investigation access | Root-cause, remediate, re-evaluate, and approve restricted return |
| Rollback | Restore a known earlier release or configuration | New controlled transition | Requires release authority | Verify restored artifact, data compatibility, and outcomes |
| Failover | Route to an approved alternate dependency or region | Continue under alternate version/scope | Uses preauthorized contingency grant | Verify equivalence, capacity, and later reconciliation |
| Shutdown | Stop a service or control domain | Unavailable until deliberate restart | Revoke or disable broad runtime authority | Rebuild trust, restore state, and perform controlled restart |

A generic kill switch is insufficient because it cannot express which state,
effects, grants, or recovery obligations remain.

## 4. Command and event contracts

Every emergency command includes command ID, subject selector, requested
action, actor identity, delegated role, reason, severity, expected version,
idempotency key, issued time, deadline, and notification policy. The control
plane records acceptance or rejection before dispatch. Components emit
`control.requested`, `control.acknowledged`, `control.enforced`,
`control.failed`, and `control.verified` events with one correlation key.

Acknowledgement is not enforcement. Enforcement is not verified safety.
Verification checks scheduling, running work, credentials, queues, network
access, side effects, artifacts, and downstream systems.

## 5. Control sequence

1. Detect or receive a credible report.
2. Resolve subject and blast radius from inventory and live state.
3. Authorize the narrowest sufficient emergency action.
4. Record the command durably before dispatch where possible.
5. Fan out through independent control paths to scheduler, orchestrator, tool
   gateway, credential broker, and deployment system.
6. Preserve attempts, events, artifacts, and relevant volatile state.
7. Reconcile acknowledgement with observed enforcement.
8. Escalate on timeout; use a broader control only when justified.
9. Diagnose and choose compensate, rollback, failover, retire, or repair.
10. Independently verify recovery before restoring authority.

## 6. Identity and delegated authorization

Human login establishes the decision actor. A policy decision creates a
purpose-bound grant. A workload identity system delivers short-lived
credentials to the exact runtime. Tool gateways verify identity, grant,
resource, tenant, action, and policy version. Credential exchange never turns
a broad service credential into wider agent authority. Revocation propagates
to issuers, caches, gateways, active leases, and queued work.

The [SPIFFE Workload API](https://spiffe.io/docs/latest/spiffe-specs/spiffe_workload_api/)
is one published pattern for workload identity delivery; it does not define
the factory's business authorization model.

## 7. Failure and recovery matrix

| Failure | Required behavior | Evidence |
|---|---|---|
| Orchestrator unavailable | Independent scheduler/gateway control path denies new effects | Gateway denials and queue freeze |
| Worker ignores pause | Lease expires; gateway denies tool calls; worker isolated | Lease, identity, and network events |
| Duplicate cancel command | Idempotent terminal result; no duplicate compensation | Command deduplication record |
| Revocation cache stale | Critical tools fail closed after bounded cache TTL | Cache version and denial test |
| Partial external side effect | Record uncertainty, stop retry, reconcile with provider | Provider idempotency key and reconciliation result |
| Control operator unavailable | Delegated backup assumes authority under policy | On-call transfer and signed decision |
| Recovery uses changed context | Resume denied; create new manifest or explicit replan | Context/version comparison |

## 8. Performance, availability, and cost

Set control objectives by risk: command acceptance, acknowledgement,
enforcement, and verification deadlines. Emergency paths need reserved
capacity, independent credentials, durable state, and regular exercise. Cost
controls must not prevent containment. Track control latency, failed fan-out,
stale grants, orphaned work, unverified states, recovery time, and repeated
false activation.

## 9. Human override and dual control

Every high-impact action has a named override point and accountable owner.
Dual control applies when one compromised or mistaken identity could create an
irreversible or privileged effect. Emergency containment may use a single
delegated incident authority when delay is more dangerous, but restoration of
broad authority requires the defined approval and independent verification.

## 10. Versioning, tests, and nonclaims

Emergency contracts are versioned across clients and enforcement points.
Backward-incompatible semantics require staged rollout, compatibility tests,
and a rollback path. Test no-op, partial, late, duplicate, unauthorized, and
dependency-failure cases. This review-ready design does not prove response
times, revocation completeness, or disaster independence in any deployment.

## 11. Hands-on lab

Complete the [Authority, Containment, and Decision Replay Lab](../10-labs/10-authority-containment-and-decision-replay-lab.md).
Inject a runaway attempt, fail the primary orchestrator, issue duplicate
controls, and leave one partial external effect. Produce command, identity,
policy, enforcement, reconciliation, recovery, and reviewer evidence.
