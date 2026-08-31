---
title: AI Software Factory Reference Architecture
status: review-ready
audience: [executive, architect, senior-engineer, platform, security, product]
last_verified: 2026-08-30
mission_control_local_head: a49064875d0711253d74029e3066cc74c7c1c2a5
---

# AI Software Factory Reference Architecture

## Quick Read

- **Purpose:** Connect intent, authority, execution, verification, delivery,
  operations, and learning through one canonical architecture.
- **Four synchronized views:** Lifecycle; logical components; deployment and
  trust boundaries; authority and evidence.
- **Core rule:** Planes own decisions and records. They do not require one
  service per box.
- **Evidence boundary:** This is review-ready architecture. The case-study
  section states the narrower implementation evidence separately.

## 1. The problem

Individual components—agents, queues, policy engines, CI, evidence stores—do not explain how a factory remains governable. A reference architecture must connect business authority to execution, assurance, delivery, and feedback while preserving clear ownership of every decision.

## 2. Why the problem exists

Architectures often center the most novel component, usually the model. This hides the durable system: identities, state machines, contracts, isolation, evidence, policy, and human decisions. It also encourages duplicate sources of truth and direct UI-to-executor coupling.

## 3. Enduring Principle

### Organize the factory into cooperating planes

```mermaid
flowchart TB
  Human["Human governance: intent, risk, approval, exceptions"]
  Control["Control plane: Missions, Plans, WorkOrders, policy, state"]
  Execution["Execution plane: Tasks, Attempts, agents, tools, sandboxes"]
  Quality["Quality plane: contracts, validators, evidence, eligibility"]
  Delivery["Delivery plane: SCM, CI/CD, artifact registry, rollout"]
  Data["Data plane: authoritative records, audit, evidence, telemetry"]
  Security["Security plane: identity, authorization, isolation, provenance"]
  Feedback["Outcome plane: production signals, incidents, customer value"]
  Human --> Control
  Control --> Execution
  Execution --> Quality
  Quality --> Control
  Control --> Delivery
  Delivery --> Feedback
  Feedback --> Control
  Data --- Control
  Data --- Execution
  Data --- Quality
  Security --- Control
  Security --- Execution
  Security --- Quality
  Security --- Delivery
```

Planes are responsibility boundaries, not necessarily deployable services. A small V1 may implement several in one codebase while preserving their contracts.

### Control plane

Owns authoritative hierarchy, specification baselines, policy evaluation, approvals, dispatch eligibility, lifecycle transitions, exceptions, and reconciliation. It decides what may happen; it should not perform arbitrary repository mutation.

### Execution plane

Accepts frozen, bounded execution manifests. It claims work through leases, invokes models and atomic tools, operates in isolated sandboxes, produces artifacts and structured completion reports, and tolerates retries. It cannot expand its own authority or accept its own WorkOrder.

### Quality plane

Compiles quality contracts, runs independent deterministic and probabilistic validators, normalizes evidence, evaluates freshness and contradictions, and recommends or records eligibility under policy. Builder and validator execution contexts are logically separate.

### Delivery and outcome planes

The factory governs delivery but may delegate mechanics to GitHub Actions, Argo CD, or another system. It binds approvals and evidence to exact artifacts, observes canaries and production outcomes, and reopens or quarantines work when reality contradicts pre-release claims.

### Data plane

Maintain distinct stores or logical record classes for authoritative domain state, append-only audit history, immutable evidence, large artifacts, and sampled telemetry. Use one correlation spine, classification, retention, encryption, backup, and tenant isolation model. Never reconstruct authority from logs.

### Security plane

Every human, service, agent configuration, worker, and tool endpoint has an identity. Authorization is capability- and scope-based. Dangerous actions require explicit grants, risk gates, and short-lived credentials. Sandboxing, network/file boundaries, secret brokering, provenance, and tamper resistance constrain compromise.

### Human governance

Humans own Mission intent, material Plan approval, risk exceptions, authority promotion, consequential deployment, and policy/learning promotion. Operators should see evidence and surprises, not supervise every token.

### Preserve agent parity without equal authority

Any supported operator outcome should be achievable through an authorized tool/API path so agents are not second-class automators. That does not mean agents receive every human permission. Parity concerns reachable outcomes and composable primitives; governance determines who may invoke which primitive, for which subject, under which conditions.

### Use one orchestrator and event-driven contracts

A unified orchestration authority coordinates lifecycle state while workers remain replaceable. Commands request work; events report facts; domain mutations decide authoritative transitions. Idempotency keys, leases, compare-and-set transitions, outbox/inbox patterns, and reconciliation protect at-least-once delivery.

### Prefer atomic tools and explicit completion

Expose narrow primitives—read file, run test, create branch, publish PR—not opaque mega-tools that plan, mutate, approve, and report success. The orchestrator composes them under a manifest. Completion requires a structured report containing exact outputs, lineage, evidence references, and unresolved findings.

## 3.1 Synchronized lifecycle view

```mermaid
flowchart LR
  I["Intent"] --> P["Plan"] --> S["Select capabilities"] --> X["Execute"]
  X --> C["Compile context"] --> G["Generate change"] --> V["Verify"]
  V --> E["Assemble evidence"] --> R["Review and decide"] --> D["Deliver"]
  D --> O["Observe outcomes"] --> L["Propose learning"]
  L -. "evaluated and approved" .-> S
```

| Stage | Authoritative input | Owned output | Stop or escalation | Evidence |
|---|---|---|---|---|
| Intent | Business need, owner, constraints | Accepted outcome and non-purpose | Ambiguous value or missing owner | Intent decision record |
| Plan | Approved intent, repository facts | Versioned plan and acceptance criteria | Unresolved dependency, policy, or testability gap | Plan assurance result |
| Select | Plan, risk, registry, budgets | Frozen capability resolution | Revoked, incompatible, uncertified, or over-budget dependency | Resolution manifest |
| Execute | Work order and scoped grant | Attempts, actions, artifacts, completion report | Policy denial, budget, timeout, cancellation, repeated failure | Attempt and tool-call lineage |
| Context | Task, identity, policy, source versions | Immutable context package | Missing, stale, contradictory, unauthorized, or poisoned context | Selection rationale and citations |
| Generate | Frozen manifest and workspace | Candidate change and build artifacts | Scope expansion or untracked side effect | Content digest and provenance |
| Verify | Candidate, quality contract, clean environment | Evaluator results and counterevidence | Failed invariant, correlated validator, stale evidence | Signed evaluator outputs |
| Evidence | Exact subject and eligible results | Proof package and readiness recommendation | Missing lineage, contradiction, expiry, tamper | Evidence manifest |
| Review | Decision request and proof package | Approve, reject, revise, restrict, or escalate | Missing authority or unresolved critical finding | Named decision and reason |
| Deliver | Approved exact artifact and rollout policy | Release state and rollback handle | Drift, migration risk, canary failure | Deployment and production verification |
| Observe | Release, service objectives, outcome contract | Signals, incidents, and outcome assessment | Regression, policy violation, cost or reliability breach | Correlated production observations |
| Learn | Outcome evidence and failure clusters | Evaluated improvement proposal | No representative evaluation or human approval | Baseline/candidate comparison and promotion decision |

This table is the accessible equivalent of the lifecycle diagram. A transition
cannot be inferred from a log line: the owning plane commits it against an
expected version and emits a fact event.

## 3.2 Logical component view

| Responsibility | Owns | Does not own |
|---|---|---|
| Experience | Operator intent, previews, decisions, status, recovery interactions | Hidden authority or direct worker control |
| Control | Domain state, admission, policy decisions, approvals, dispatch eligibility, reconciliation | Arbitrary code or infrastructure mutation |
| Execution | Leases, sandboxes, model and tool calls, artifacts, completion reports | Acceptance, policy administration, self-expanded scope |
| Knowledge | Source registration, ingestion, retrieval, context packages, revocation | Business intent or authorization changes from retrieved text |
| Capability | Agent, model profile, prompt, skill, tool, evaluator lifecycle | Runtime acceptance of its own output |
| Quality | Quality contracts, validators, evidence eligibility and contradiction | Product intent or release authority |
| Delivery | Artifact publication, migration, rollout, rollback mechanics | Acceptance without the required decision and evidence |
| Security | Identity, grants, isolation, secrets, provenance, policy enforcement | Business ownership or final value judgment |
| Data | Authoritative records, audit, evidence, artifacts, telemetry with retention | Reconstructing authoritative state from telemetry |
| Observability | Traces, logs, metrics, costs, alerts, forensic export | Converting producer claims into independent proof |
| Outcomes | Production health, customer value, incidents, feedback | Silent configuration or policy promotion |

Cross-cutting governance assigns human decision rights; platform operations
provide queues, capacity, environments, continuity, and incident response.

## 3.3 Deployment and trust-boundary view

```mermaid
flowchart TB
  subgraph U["Operator trust domain"]
    Channels["Web, CLI, chat, API"]
  end
  subgraph C["Control trust domain"]
    API["Authenticated control API"]
    Orchestrator["Durable orchestrator"]
    Policy["Policy and grant service"]
    Records["Authoritative state"]
  end
  subgraph E["Execution trust domain"]
    Queue["Scheduler and queue"]
    Worker["Ephemeral worker"]
    Sandbox["Isolated workspace"]
    Gateway["Model and tool gateways"]
  end
  subgraph A["Assurance trust domain"]
    Validator["Independent validators"]
    Evidence["Evidence store"]
  end
  subgraph X["External and enterprise systems"]
    Knowledge["Knowledge sources"]
    SCM["Source, CI/CD, registry"]
    Production["Production services"]
    Providers["External providers"]
  end
  Channels --> API --> Orchestrator --> Queue --> Worker --> Sandbox
  Policy --> Orchestrator
  Orchestrator --> Records
  Sandbox --> Gateway --> Providers
  Knowledge --> Gateway
  Sandbox --> Validator --> Evidence
  Evidence --> Orchestrator --> SCM --> Production
```

The diagram is a scale-out option, not a service mandate. A V1 may combine API,
orchestrator, policy, and records in a modular deployment. It must still use
authenticated interfaces, separate worker and validator contexts, scoped
credentials, explicit egress, immutable subject versions, and durable state.

Trust changes at channel-to-API, control-to-worker, sandbox-to-gateway,
retrieval-to-context, producer-to-validator, evidence-to-decision, and
delivery-to-production boundaries. Each crossing authenticates both sides,
authorizes the exact action, validates schema and classification, limits
tenancy and destination, and records a correlation key.

## 3.4 Authority and evidence view

| Record | Produced by | Authorizes or proves | Must bind |
|---|---|---|---|
| Intent decision | Named business authority | Why work may begin | Purpose, outcome, constraints, owner |
| Policy decision | Policy service under delegated governance | Whether a requested action is eligible | Actor, subject, action, resource, context, policy version |
| Grant | Credential or grant service | Narrow runtime authority | Recipient identity, scope, purpose, expiry, revocation |
| Work order and manifest | Control plane | Frozen execution request | Plan, capabilities, context policy, budgets, quality contract |
| Attempt | Orchestrator and worker | What execution occurred | Manifest, worker, environment, lease, tool calls, artifacts |
| Evaluator result | Independent quality context | One measured claim | Subject digest, evaluator version, dataset, result, uncertainty |
| Proof package | Evidence service | Eligibility for a named decision | All required evidence, contradictions, expiry, lineage |
| Human decision | Named decision owner | Approval, rejection, restriction, exception, or acceptance | Exact subject, evidence, reason, conditions, expiry |
| Release record | Delivery system | What entered an environment | Artifact, configuration, migration, target, rollout, rollback |
| Outcome assessment | Operations and business owner | Whether value and safety held in reality | Release, observation window, SLOs, business outcome, incidents |
| Learning decision | Change owner | Whether a configuration change may be promoted | Baseline, candidate, evaluation, risk, approval, rollback |

Decision lineage is a graph of observable records. It intentionally excludes
private chain-of-thought. Reproducibility comes from exact inputs, versions,
actions, outputs, policy decisions, and evidence.

## 3.5 Boundary contract

Every material arrow in any view must define:

| Field | Requirement |
|---|---|
| Direction | Command requests a state change; event reports an accepted fact |
| Identity | Authenticated caller, workload, recipient, and delegated authority |
| Schema | Versioned payload with classification and tenant |
| Authority | Owning policy decision and permitted subject/action/resource |
| State | Expected version, preconditions, valid next states, authoritative store |
| Delivery | Idempotency key, deduplication, acknowledgement, deadline |
| Failure | Timeout, retry class, backoff, circuit break, compensation, escalation |
| Evidence | Correlation, input/output digest, audit event, proof eligibility |
| Human decision | Named gate, options, required evidence, expiry and exception path |
| Compatibility | Producer/consumer support window, deprecation, revocation |

Retries are safe only when the operation is idempotent or a reconciliation
protocol can determine the external result. A timeout creates uncertainty; it
does not prove failure. Critical boundaries fail closed when authority cannot
be established and degrade explicitly when a safe read-only path exists.

## 3.6 Failure trace

For a compromised capability: registry revocation blocks new resolutions; the
control plane identifies affected manifests and pauses work; grant and tool
gateways revoke authority; workers checkpoint and stop; evidence derived from
the version becomes ineligible; delivery blocks affected artifacts; incident
response preserves state; recovered work resolves a qualified replacement,
re-executes required checks, and requires a new decision. No single log or
dashboard substitutes for this state reconciliation.

## 4. Tradeoffs

Plane separation improves reasoning and security but adds contracts and operational overhead. A modular monolith is often the right V1: one deployment, explicit modules, separate identities for external execution, and stable events. Microservices should follow demonstrated scale or isolation needs, not the diagram.

Multi-agent orchestration is a capability, not a mandatory topology. A single executor is preferable when specialization adds coordination cost without independent assurance.

## 5. Current Mission Control Implementation

Mission Control’s React UI and Convex functions form much of the control/data plane. The Hono orchestration server, executor adapters, worktrees, GitHub App integration, leases, run events, and artifacts form an emerging execution plane. QC runs, verification receipts, approval decisions, GitHub checks, and release-gate automation form an incomplete quality/delivery plane. Identity, permissions, governance policy, and sandbox controls supply parts of the security plane.

The boundaries are not equally mature. `convex/qcRuns.ts` still invokes mock adapters and contains a policy TODO; `convex/governance/releaseGateAutomation.ts` operates in `SHADOW`; PR publication and remote sandbox controls live on study branches rather than the cited main baseline; and the browser-operated Mission-to-validated-PR path remains the decisive proof gap.

## 6. Future Vision

Do not add more planes or top-level products. Complete one vertical slice: governed Mission, approved Plan, bounded WorkOrder, isolated Attempt, signed lineage, independent evidence, policy decision, review-ready PR, and human acceptance. Then extend the same contracts to deployment and production feedback.

## 7. Versioned references

- Mission Control main baseline: `b31e27564deb1c03c167e61b5ee094567c2ba7b1`
- Local source HEAD: `a49064875d0711253d74029e3066cc74c7c1c2a5`; staged-only runtime work is not a product claim
- Product sources: `convex/missions.ts`, `convex/factory/attempts.ts`, `convex/qcRuns.ts`, `convex/governance/releaseGateAutomation.ts`, `apps/orchestration-server/src/index.ts`, `apps/mission-control-ui/src/eos/`
- Related mastery chapters: control/execution planes, runtime state machines, security, quality, and specification engineering

## 8. Personal notes and lessons learned

- The model is a replaceable execution dependency; authority and evidence are the architecture.
- A plane is useful only if I can name the decision it owns and the records it may mutate.
- Agent-native parity should improve composability without erasing human accountability.
- V1 should be a vertical proof, not a catalog of horizontal platforms.

## 9. Interview questions

1. Why separate control and execution planes?
2. Is the quality plane a service, a team, or a responsibility boundary?
3. How do you support agent parity while preserving separation of duties?
4. When would you split the modular monolith?
5. How does at-least-once messaging affect Attempt and evidence design?

## 10. Whiteboard exercise

Draw all planes and the golden path in ten minutes. For every arrow state the command/event, identity, authoritative record, failure mode, idempotency strategy, and human decision. Then redraw it as a three-deployment V1 and defend what you combined.

## 11. Hands-on lab

Trace one Mission Control golden path across UI, Convex, Hono, executor, worktree, GitHub, validator, and review UI. Produce a sequence diagram and plane ownership table. Identify one direct coupling that violates the architecture, one missing identity boundary, and one place telemetry is being mistaken for evidence.

Use the [Detailed Architecture Coverage Matrix](../00-overview/11-detailed-architecture-coverage-matrix.md)
to confirm every responsibility has one owner, then repeat the trace for a
policy denial and a compromised capability. A passing review must identify the
authoritative state, emergency action, retained evidence, and recovery proof.
