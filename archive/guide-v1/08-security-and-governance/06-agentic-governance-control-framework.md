---
title: Agentic Governance Control Framework
status: review-ready
audience: [executive, architect, security, platform, operations, quality, legal, compliance]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: critical
topics: [governance, controls, identity, incidents, recertification]
---

# Agentic Governance Control Framework

## Quick Read

- **Purpose:** Convert governance principles into ten testable control families.
- **Control contract:** Owner, intent, enforcement point, evidence, test,
  exception, failure response, and review cadence.
- **Core rule:** A policy document or visible button is not proof that a control
  prevents, detects, contains, or recovers from failure.
- **Maturity:** Review-ready control design; operating effectiveness must be
  established in the target system.

## 1. The problem

Autonomous systems connect probabilistic decisions to tools that change real
systems. Risk compounds across delegated steps, external content, shared
memory, suppliers, and retries. Governance that reviews only the final output
cannot reconstruct authority, identify the failed control, or contain a live
incident.

## 2. Enduring Principle

### Govern every transfer of authority

Controls attach to identities, records, grants, state transitions, tool calls,
artifacts, evidence, approvals, releases, incidents, and learning promotions.
They record observable decision and action lineage, not hidden model reasoning.

## 3. Control catalog

| ID | Control family | Owner | Primary enforcement | Required evidence | Test and cadence |
|---|---|---|---|---|---|
| GOV-01 | Authority-chain mapping | Governance owner | Control plane and policy service | Actor, delegator, grant, scope, expiry, decision chain | Trace one high-risk action quarterly and after authority changes |
| GOV-02 | Unique identity | Identity owner | Identity provider, workload issuer, tool gateway | Human/service/workload/agent/capability identities and credential events | Deny shared, expired, and wrong-scope credentials each release |
| GOV-03 | Risk and autonomy tiers | System owner | Admission and policy decision points | Classification, ceiling, allowed/prohibited actions, approval rule | Boundary cases and promotion regression each policy change |
| GOV-04 | Emergency control | Incident authority | Orchestrator, scheduler, gateway, credential broker | Pause, cancel, revoke, quarantine, rollback, recovery records | Failure injection at risk-based cadence |
| GOV-05 | Agentic attack resistance | Security owner | Ingestion, context compiler, model/tool gateway, sandbox | Sanitization, provenance, policy denials, alerts, containment | Indirect-instruction, tool, memory, context, and supply-chain attacks each release |
| GOV-06 | Human override and dual control | Decision owner | Approval service and protected operation | Named approvers, decision, reason, counterevidence, timing | Reject self-approval and missing second party quarterly |
| GOV-07 | Decision and delegation lineage | Audit owner | Event and evidence pipeline | Correlated inputs, versions, actions, outputs, decisions, delegations | Reconstruct sampled runs and every material incident |
| GOV-08 | External capability diligence | Capability owner | Intake and registry admission | Ownership, provenance, data use, security, service, exit, incident terms | Intake plus periodic recertification and material supplier change |
| GOV-09 | Incident reporting | Incident owner | Detection and case management | Classification, timeline, scope, notification decisions, postmortem | Tabletop twice yearly and after significant change |
| GOV-10 | Periodic recertification | Governance owner | Registry and system inventory | Current model, evaluator, policy, capability, autonomy, owner, evidence | Risk-based cycle and event-triggered review |

## 4. Required control record

```yaml
control:
  id: GOV-04
  version: 3
  subject_scope: [factory-system:payments-delivery]
  owner: role:incident-control-owner
  intent: "Bound unsafe or uncontrolled execution"
  enforcement_points: [orchestrator, tool-gateway, credential-broker]
  preventive_actions: [admission-deny, scoped-grant]
  detective_signals: [policy-denial, runaway-loop, anomalous-side-effect]
  response_actions: [pause, cancel, revoke, quarantine]
  evidence_schema: control-evidence@2
  test_suite: emergency-control-suite@4
  exception_policy: policy:material-exception@2
  review_cadence: P90D
  last_result: pass-with-finding
```

Evidence binds the exact control version, subject, environment, identity,
injection, expected result, actual result, timestamps, artifacts, reviewer,
and unresolved findings. Evidence expires when a material dependency or
enforcement point changes.

## 5. Risk and autonomy tiers

| Tier | Typical authority | Human decision | Examples of prohibited escalation |
|---|---|---|---|
| 0 — Observe | Read approved low-sensitivity sources | Policy admission | Any mutation or external communication |
| 1 — Assist | Draft or recommend; no direct effect | Human accepts output | Publication, merge, deployment |
| 2 — Reversible action | Bounded reversible mutation in isolated scope | Review before consequential publication | Privilege grant or irreversible change |
| 3 — Consequential action | Publish, merge, or stage deployment with evidence | Named approval; dual control where required | Broader scope, self-approval, production data mutation |
| 4 — Restricted | Exceptional privileged or destructive action | Explicit exception and two-person control | Autonomous execution by default |

Tier assignment follows potential impact, not model confidence. Each grant is
short-lived, resource-scoped, purpose-bound, and no broader than both the
system ceiling and current workflow decision.

## 6. Threat and control chain

External text, repository content, tool results, memory, and retrieved context
are untrusted inputs. Preserve provenance and separate data from instructions.
Validate tool schemas and destination scopes, broker credentials only after
policy, isolate execution, inspect outputs and side effects, and convert only
independent results into evidence. Compromise of one agent or capability must
not grant policy administration, evidence acceptance, or wider credentials.

## 7. Exceptions, incidents, and recertification

An exception names the control, subject, reason, compensating controls, owner,
approver, start, expiry, and exit criteria. It cannot silently renew. Incidents
record the authority and data affected, containment, preservation, notification
decision, recovery, and lessons. Recertification rechecks ownership,
classification, model and evaluator versions, capability dependencies,
policy, evidence freshness, incidents, drift, cost, and actual outcomes.

## 8. Failure modes and recovery

| Failure | Detection | Containment | Recovery |
|---|---|---|---|
| Shared identity obscures actor | Identity and audit reconciliation | Revoke credential and pause affected work | Issue unique identity and replay authorization test |
| Control exists only in UI | API-side negative test succeeds unexpectedly | Block action at gateway | Add server-side enforcement and retest all channels |
| Correlated builder and evaluator | Runtime/configuration comparison | Mark evidence ineligible | Run independent evaluator context |
| Supplier capability changes silently | Digest or behavior drift | Quarantine capability | Re-intake, evaluate, and recertify exact version |
| Recertification expires | Inventory due-date alert | Reduce autonomy or block new high-risk work | Complete review and record decision |

## 9. Observability, retention, and privacy

Control telemetry includes decisions, denials, grants, exceptions, overrides,
tests, incidents, revocations, and review freshness. Retain enough input and
action lineage to reproduce authorization without storing unnecessary secrets,
personal data, or hidden reasoning. Redaction must be deterministic and
reviewable; original sensitive evidence remains in a restricted store.

## 10. Tradeoffs and implementation choices

Central policy improves consistency; local enforcement reduces latency and
supports fail-safe operation. Use versioned policy bundles with a central
decision authority, explicit cache expiry, local deny defaults for critical
actions, and reconciliation. A modular monolith can implement the catalog in
V1 if enforcement interfaces, identities, and evidence remain explicit.

## 11. References and stability

- [NIST AI RMF 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf), published
- [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf), published
- [NIST SSDF publications](https://csrc.nist.gov/Projects/ssdf/publications), current publication index
- [OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/), current guidance
- [SLSA 1.2](https://slsa.dev/spec/v1.2/), published

## 12. Review exercise

Select a high-risk workflow. Build a control-to-evidence matrix for all ten
families. Inject one missing identity, one indirect instruction, one expired
exception, and one failed emergency action. The review passes only when the
system denies or contains each case and a second reviewer can reconstruct why.
