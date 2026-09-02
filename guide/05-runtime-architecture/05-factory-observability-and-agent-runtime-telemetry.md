---
title: Factory Observability and Agent Runtime Telemetry
status: draft-for-study
audience: [architect, senior-engineer, ai-engineer, platform, executive]
last_verified: 2026-08-11
mission_control_local_head: a49064875d0711253d74029e3066cc74c7c1c2a5
---

# Factory Observability and Agent Runtime Telemetry

## 1. The problem

An agentic factory can be busy while making no progress, cheap while producing unsafe work, or successful according to a model while violating authority. Operators need to understand outcome, control state, execution health, cost, and evidence freshness across asynchronous systems without reading raw transcripts.

## 2. Why the problem exists

One governed outcome crosses browser, database, orchestrator, model provider, tool servers, worker, repository, CI, and deployment system. Retries fragment traces. Background work outlives requests. High-cardinality identifiers make metrics expensive. Prompts and tool arguments may contain secrets. Most importantly, telemetry reports observations; it must not silently become the authoritative business state.

## 3. Enduring Principle

### Observe from intent to outcome

Use a stable correlation spine:

`Mission -> Plan revision -> WorkOrder revision -> Task -> Attempt -> trace -> span/tool call -> artifact/evidence -> PR -> release`

Every signal should carry tenant/workspace/repository scope, relevant domain IDs, execution-manifest digest, source/head SHA when known, actor or workload identity, and timestamp. Correlation must not grant access: authorization still filters what each viewer may retrieve.

### Separate authority, evidence, audit, and telemetry

| Record | Primary purpose | May be sampled? | Controls advancement? |
| --- | --- | --- | --- |
| Domain state | Current authoritative workflow decision | No | Yes |
| Audit event | Who decided or changed authority | No | Supports accountability |
| Evidence receipt | Proof for a claim about an exact subject | No | Yes, through policy |
| Trace/log/metric | Diagnose behavior and measure health | Often | No, unless promoted through an evidence-producing control |

A trace showing `status=success` cannot accept a WorkOrder. A validator can transform an attributable observation into an evidence receipt under an explicit method and policy.

### Instrument the control and execution planes

Control-plane spans should cover Mission/Plan decisions, policy evaluation, WorkOrder release, dispatch, acceptance, and exception handling. Execution-plane spans should cover claim/renew/reconcile lease, sandbox creation, model invocation, tool call, command, test, commit, publication, receipt ingestion, and cleanup.

Use links rather than false parent-child relationships when asynchronous retries or external CI runs have independent lifecycles. Preserve attempt number and idempotency key so duplicate events can be explained.

### Measure four kinds of health

**Outcome:** lead time to validated value, throughput, change failure, rework, acceptance, and customer signal.

**Control:** blocked gates, policy denials, exception age, approval latency, stale/missing/conflicting evidence, unauthorized attempts, and autonomy demotions.

**Runtime:** queue age, lease expiry, heartbeat lag, retry rate, timeout, cancellation latency, sandbox failures, publication failures, and reconciliation backlog.

**AI economics and quality:** model/provider, input/output/cache tokens, latency, cost, tool-call success, task/eval success, human override, and routing decision outcome.

Token volume and agent activity are diagnostic inputs, not productivity measures.

### Capture decisions without exposing hidden reasoning

Record the decision input class, selected policy/routing rule, model and configuration, structured output, confidence where calibrated, tool choices, and result. Do not require or persist private chain-of-thought. Retain user content, prompts, tool arguments, and outputs only under classification, redaction, access, and retention rules. Default observability should be metadata-first and content-off.

### Make freshness and silence observable

Evidence has valid-from/valid-until semantics and a subject digest. Alert when required evidence approaches expiry, the subject changes, a verifier becomes unhealthy, or no expected heartbeat/result arrives. Absence is a signal only when the system defines what should have happened and by when.

### Design operator alerts around action

An alert should say what outcome is affected, why it matters, which record is authoritative, current risk, recommended action, owner, and deadline. Deduplicate by governed incident, suppress downstream symptoms, and escalate by consequence and duration. The factory UI should prioritize exceptions and decisions over a wall of agent activity.

### Use open telemetry carefully

OpenTelemetry provides standard traces, metrics, logs, baggage, and context propagation. W3C Trace Context supports cross-service propagation. However, OpenTelemetry CI/CD conventions are release-candidate, while GenAI conventions have moved to a separate repository and many old attributes are deprecated or still development status. Pin convention versions, place unstable mappings behind an adapter, and keep Mission Control IDs as the durable domain vocabulary.

## 4. Tradeoffs

Full-fidelity traces improve debugging but increase cost, privacy risk, and cardinality. Sample successful low-risk detail while retaining unsampled domain/audit/evidence records and error traces. Metrics aggregate well but lose causality; traces explain one run but not fleet trends. Logs remain useful for unstructured diagnostics but should not be the primary integration contract.

## 5. Current Mission Control Implementation

Mission Control contains `runEvents`, `runArtifacts`, health/metrics surfaces, a monitoring dashboard with secret-pattern redaction, model-router usage fields, QC views, and execution/trace inspector UI. The current staged working tree adds stronger Attempt lease events and execution-manifest lineage; those staged-only additions are not treated as committed capability.

The implementation is not yet a demonstrated end-to-end OpenTelemetry architecture. Cross-service trace context, standardized model/tool spans, durable alert ownership, evidence-freshness SLOs, and complete cost attribution to validated customer outcomes remain incomplete or proposed.

## 6. Future Vision

Define a versioned factory telemetry contract and instrument one golden path first. Export via OpenTelemetry while retaining an internal schema adapter. Build three operator views: outcome and risk, active exceptions, and one Attempt trace. Add SLOs for dispatch latency, stale leases, evidence freshness, and reconciliation. Promote telemetry into release evidence only through explicit validators.

## 7. Versioned references

- Mission Control local HEAD: `a49064875d0711253d74029e3066cc74c7c1c2a5`; Attempt additions are staged-only
- Product sources: `convex/factory/attempts.ts`, `convex/schema.ts`, `apps/mission-control-ui/src/MonitoringDashboard.tsx`, `apps/mission-control-ui/src/eos/views/ExecutionInspectorView.tsx`, `packages/model-router/src/types.ts`
- OpenTelemetry semantic conventions 1.43.0; CI/CD status Release Candidate
- W3C Trace Context; Google SRE monitoring and canary guidance

## 8. Personal notes and lessons learned

- Authoritative state tells me what the factory decided; telemetry helps me understand how it behaved.
- Observability without Mission and WorkOrder correlation becomes expensive agent wallpaper.
- The most valuable alert identifies the human decision now required.
- Evidence freshness is an operational SLO, not a documentation concern.

## 9. Design review questions

1. How do audit events, evidence, and telemetry differ?
2. What would you put on an operator dashboard for 20 parallel Missions?
3. How do you trace asynchronous retries without lying about parentage?
4. How do you observe model decisions without retaining sensitive reasoning?
5. Which signals would cause autonomy demotion?

## 10. Whiteboard exercise

Trace one WorkOrder from dispatch through a timed-out Attempt, lease expiry, retry, PR publication, validation, and acceptance. Show span links, authoritative records, metrics, evidence, and alerts. Explain which data can be sampled and which cannot.

## 11. Hands-on lab

Instrument the controlled lab’s API and browser test with trace IDs, then correlate them manually to one Mission Control Attempt and GitHub Actions run. Force a timeout and retry. Produce a timeline showing queue delay, lease events, model/tool latency, test duration, cost, and final evidence. Redact sensitive content and document the retention policy.
