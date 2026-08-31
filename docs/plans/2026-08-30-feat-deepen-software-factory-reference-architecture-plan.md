---
title: "feat: Deepen the autonomous software factory reference architecture"
type: feat
status: completed
date: 2026-08-30
scope: curriculum-and-site
---

# Deepen the Autonomous Software Factory Reference Architecture

## Executive Summary

The curriculum covers most of the responsibilities visible in the supplied
reference images, but it does not yet cover all of them at the same depth.
Coverage is strongest at the level of principles, lifecycle boundaries,
authority, evidence, model and tool composition, verification, delivery, and
continual improvement. The main gap is a consolidated reference layer that
turns those ideas into component catalogs, interface contracts, control
matrices, state transitions, failure and recovery tables, operator runbooks,
and cross-cutting architecture views.

The next release should deepen the existing architecture rather than add a
second competing taxonomy. It should preserve Markdown as the curriculum's
source of truth, maintain the existing content exclusions, and extract only
portable concepts from the supplied images. The images are research inputs,
not authoritative specifications, and their vendor-specific names, branding,
and product claims should not be copied.

### Implementation outcome

Completed on 2026-08-30. The release adds 17 public curriculum documents,
deepens five accountable references, publishes a nine-view Architecture hub,
updates all discovery and review surfaces, and passes content generation,
links, lint, TypeScript, both production builds, server-rendered route tests,
glossary integrity, exclusion, and patch checks. Internal architect, builder,
security, and operations walkthroughs are recorded in the release-readiness
review under docs/reviews.

The independent external technical review below intentionally remains open.
This release is now ready to send to reviewers; review-ready documentation is
not self-certified as validated or operationally proven.

## Problem Statement

A reader can currently learn what the factory is responsible for and why its
boundaries matter. A reader cannot always answer the next level of questions
from one accountable place:

- Which runtime component owns this decision?
- What are its inputs, outputs, identities, policies, states, and invariants?
- Which events cross the boundary, and how are they correlated?
- What stops, pauses, retries, replans, quarantines, or escalates work?
- Which human can intervene, through which control, with what recorded reason?
- What evidence proves the control worked?
- How does the same flow behave under a security incident, stale context,
  provider outage, budget exhaustion, or partial completion?
- Which concepts are architecture, which are implementation choices, and which
  remain unproven?

The source material is therefore substantially covered, but the curriculum is
not yet complete at reference-specification depth.

## Repository Research Summary

### Existing Strengths

- The canonical planes and their responsibilities already exist in
  `guide/05-runtime-architecture/06-ai-software-factory-reference-architecture.md`.
- The end-to-end lifecycle and stage contracts already exist in
  `guide/00-overview/04-intent-to-delivery-lifecycle.md`.
- Authority, decision rights, risk-proportional control, exceptions, and
  learning governance are detailed in
  `guide/08-security-and-governance/01-governance-policy-and-risk-proportional-approval.md`.
- Identity, short-lived authority, secrets, privacy, licensing, and compliance
  evidence are introduced in
  `guide/08-security-and-governance/05-workload-identity-secrets-privacy-and-compliance.md`.
- Knowledge ingestion, retrieval, context compilation, semantics, and
  evaluation are covered in
  `guide/06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md`.
- Convergence, stop conditions, retry, fallback, replan, and escalation are
  covered in
  `guide/06-ai-engineering/05-agent-and-loop-engineering-patterns.md`.
- Operator decisions and safe controls are introduced in
  `guide/factory-platform-engineering/04-human-agent-control-surfaces-and-operator-experience.md`.
- Lifecycle telemetry, cost attribution, and forensic bundles are introduced
  in
  `guide/factory-platform-engineering/06-observability-semantics-cost-and-forensics.md`.
- Capability packaging, certification, delivery, recovery, and security labs
  already give the expansion a strong foundation.

### Explicit Evidence Boundaries Already Recorded

The current curriculum already states several important nonclaims:

- The knowledge chapter does not establish a complete source registry,
  connector lifecycle, permission-aware hybrid retrieval service, or
  independently benchmarked reranking pipeline.
- The workload-identity chapter does not provide a complete federation,
  delegated-authorization, deletion, residency, or compliance-mapping design.
- The observability chapter does not define a complete semantic schema,
  sampling policy, end-to-end trace contract, or forensic-bundle schema.
- The operator-experience chapter does not define one complete interaction
  model for preview, execution, intervention, notification, review, and
  recovery.

Those nonclaims are accurate and define the center of the next release.

### Institutional Learnings

No `docs/solutions/` knowledge base or critical-pattern file exists in this
repository, so there are no prior institutional solution notes to inherit.
The same-day reader-experience brainstorm is relevant and establishes these
constraints:

- Markdown remains authoritative.
- The site remains a presentation layer over the curriculum.
- Executive, Architect, Builder, and Deep Study paths remain the primary
  audience routes.
- Progressive disclosure is required so technical depth does not create an
  unusable wall of content.
- Architecture claims and implementation evidence remain visibly separate.

## Coverage Audit

| Capability family from the source material | Current depth | Assessment | Accountable existing content |
|---|---|---|---|
| Intent-to-outcome lifecycle | Strong | The lifecycle exists, but needs one detailed sequence with all stage records, stop conditions, owners, and evidence transitions. | Overview lifecycle, platform blueprint, reference architecture |
| Logical planes and platform principles | Strong | Plane responsibilities are clear; component, deployment, data-flow, and trust-boundary views are not consolidated. | Runtime reference architecture, control/execution planes |
| Orchestration components | Partial | State machines, routing, tools, memory, policy, reliability, and cost exist across chapters; there is no canonical component catalog or interface matrix. | Runtime orchestration, agent architecture, loop engineering |
| Knowledge and retrieval pipeline | Partial | The lifecycle is conceptually strong; connector, ingestion, indexing, retrieval, permission, freshness, revocation, and evaluation contracts need specification-level detail. | Data, knowledge, context, and semantic engineering |
| Tool, skill, and integration contracts | Partial | Behavioral contracts and capability packaging exist; a complete required-field reference and side-effect taxonomy are missing. | Agent architecture, capability packaging, capability certification |
| Governance and risk-based autonomy | Partial-to-strong | Authority and risk are strong. Tested emergency control, documented override, chained-decision monitoring, external-capability due diligence, incident-reportability, and periodic recertification need one control framework. | Governance, identity, threat model, operator controls |
| Security and identity | Partial-to-strong | Core principles are correct; workload federation, policy decision points, trust domains, credential exchange, network boundaries, and revocation sequences need detailed views. | Security and identity; workload identity; adversarial defense |
| Evaluation, evidence, and provenance | Strong | Quality and evidence are extensive; a single lifecycle-wide evidence and decision-lineage schema is still missing. | Quality engineering, evaluation engineering, supply-chain provenance |
| Observability and cost operations | Partial | Semantics and cost principles exist; metric definitions, span/event schemas, sampling, charge allocation, alerts, SLOs, and forensic export need concrete contracts. | Runtime telemetry, cost and forensics, scheduling and cost |
| Enterprise reliability and operations | Partial | Retry, recovery, capacity, resilience, and disaster recovery exist; a consolidated operating matrix and replay/resume semantics are missing. | Runtime state machines, tasks and attempts, factory SRE, disaster recovery |
| Multi-agent topologies and specialist roles | Partial | Multi-agent use is discussed, but topology selection, supervisor/peer/critic contracts, delegation, conflict resolution, and specialist role boundaries are not a full reference. | Agent architecture, loop engineering, human-agent operating model |
| Experience surfaces and action parity | Partial | The operator surfaces are named; channel architecture, API/UI parity, capability discovery, shared state, and complete unhappy paths need integration. | Operator experience, developer portal, agent-native reference architecture |
| General AI and model foundations | Deliberate boundary | The curriculum is not and should not become a general ML course. A short factory-oriented primer can cover only the concepts needed for routing, retrieval, evaluation, security, and deployment decisions. | AI engineering section |
| Business outcomes and adoption roadmap | Strong foundation | Outcome measures and maturity exist; the architecture map should link every major platform capability to an operational or delivery outcome. | Factory economics, maturity model, platform blueprint |
| Factory system inventory and classification | Partial | Registries and ownership appear in several domains, but there is no single governed record for each deployed factory system, its use case, models, capabilities, data, risk, autonomy ceiling, owner, evidence, incidents, and lifecycle status. | Domain model, capability registry, governance |
| Governance organization and accountability | Partial | Human decision rights are strong, but executive oversight, enablement and control functions, accountable system owners, independent assurance, and cross-functional partners are not mapped in one operating model. | Human-agent operating model, governance chapter |
| Monitoring, detection, and response | Partial | Traces, logs, metrics, cost, quality, alerts, and evidence freshness are covered. Behavior drift, policy drift, anomaly baselines, triage, intervention, reconfiguration, and verified closure need one response lifecycle. | Runtime telemetry, cost and forensics, factory SRE |
| Architecture-pattern selection | Partial | The curriculum says to use the least agentic mechanism, but does not provide one decision ladder from deterministic or prompt-only behavior through retrieval, single-agent loops, multi-agent collaboration, durable autonomous workflows, and enterprise integration. | Loop engineering, first principles, maturity model |

## Scope Boundary

### In Scope

- Portable autonomous-software-factory architecture.
- Detailed component responsibilities and contracts.
- Governance, identity, threat, incident, and emergency controls.
- Runtime, knowledge, capability, delivery, and operating semantics.
- Multi-agent collaboration where specialization or independent assurance has
  a measurable purpose.
- A bounded AI systems primer tied directly to factory decisions.
- Accessible visual maps, cross-references, exercises, and executable labs.
- Current primary standards and explicit maturity labels.

### Out of Scope

- Copying proprietary diagrams, terminology, or branded product structures.
- A general survey of every AI model architecture, database, framework, or
  engineering tool.
- Recommending a specific vendor stack as the canonical architecture.
- Treating a diagram, chapter, or lab specification as operational proof.
- Adding accounts, reader progress persistence, or a second content database.
- Replacing explicit policy and hard safety boundaries with model judgment.

## Depth Standard for Every New Reference Module

A chapter is not complete merely because it mentions the right concepts. Every
new or deepened reference module must include:

1. responsibility and explicit non-responsibilities;
2. accountable owner and participating roles;
3. authoritative inputs and outputs;
4. state model and valid transitions;
5. commands, events, APIs, and schema contracts;
6. identity, authorization, tenancy, and data classification;
7. policy decision and human intervention points;
8. invariants and stop conditions;
9. failure modes, detection, containment, retry, recovery, and rollback;
10. observability, cost, evidence, and audit requirements;
11. performance, capacity, and availability expectations;
12. versioning, compatibility, deprecation, and revocation behavior;
13. implementation alternatives and tradeoffs;
14. explicit nonclaims and maturity status;
15. a review exercise or executable lab.

This rubric is a stronger measure of depth than word count.

## Proposed Solution

### 1. Create the Detailed Architecture Coverage Matrix

Add:

- `guide/00-overview/11-detailed-architecture-coverage-matrix.md`

The matrix will normalize every relevant concept from the reference images
into the curriculum's vocabulary and record:

- canonical capability name;
- owning chapter;
- lifecycle phase;
- logical plane;
- accountable role;
- risk class;
- current documentation maturity;
- implementation evidence boundary;
- planned deliverable;
- validation method.

This becomes the anti-duplication mechanism. New chapters must extend the
matrix rather than create competing labels.

### 2. Deepen the Canonical Reference Architecture

Expand:

- `guide/05-runtime-architecture/06-ai-software-factory-reference-architecture.md`

Add four synchronized views:

1. **Lifecycle view:** intent, planning, capability selection, execution,
   context assembly, change generation, verification, evidence, review,
   delivery, observation, and learning.
2. **Logical component view:** experience, control, execution, knowledge,
   capability, quality, delivery, security, data, observability, and outcome
   responsibilities.
3. **Deployment and trust-boundary view:** operator channels, APIs, control
   services, workers, sandboxes, model gateways, knowledge stores, enterprise
   systems, CI/CD, production, and external providers.
4. **Authority and evidence view:** identity chain, policy decisions, grants,
   attempts, tool calls, artifacts, evaluator results, approvals, releases,
   incidents, and learning promotions.

For every boundary, specify command/event direction, identity, authoritative
record, idempotency, timeout, retry, evidence, and human decision.

### 3. Add the Orchestration Component and Runtime Contract Reference

Add:

- `guide/05-runtime-architecture/09-orchestration-component-model-and-runtime-contracts.md`

Define the responsibilities and contracts for:

- intent and capability routing;
- workflow and agent control;
- prompt and context compilation;
- model gateway and routing;
- retrieval coordination;
- tool execution and side-effect control;
- session, working state, and durable memory;
- policy and authorization enforcement;
- input, output, and action validation;
- reliability, retry, backoff, circuit breaking, and reconciliation;
- observability, audit, evidence conversion, and forensics;
- budget, rate, capacity, and concurrency control.

Include an explicit stop-condition table covering acceptance satisfied,
maximum attempts, maximum tool calls, elapsed-time budget, token and cost
budgets, no measurable improvement, repeated failure, human escalation,
policy denial, cancellation, dependency unavailability, and irrecoverable
system failure.

### 4. Add the Agentic Governance Control Framework

Add:

- `guide/08-security-and-governance/06-agentic-governance-control-framework.md`
- `guide/08-security-and-governance/07-authority-autonomy-and-emergency-control.md`

The framework will provide a control catalog with owner, intent, enforcement
point, evidence, test, exception, and review cadence for:

1. authority-chain mapping;
2. unique human, service, workload, agent, and capability identity;
3. risk and autonomy tiers;
4. emergency pause, cancellation, containment, quarantine, and revocation;
5. indirect instruction, tool, context, memory, and supply-chain attacks;
6. named human override and dual-control decisions;
7. chained-decision and delegation lineage without retaining hidden model
   reasoning;
8. external capability and supplier due diligence;
9. incident classification, notification, reportability, and postmortem;
10. periodic policy, capability, model, evaluator, and autonomy recertification.

The emergency-control chapter must distinguish pause, cancel, revoke,
quarantine, rollback, failover, and shutdown. Each control needs a test cadence
and recovery procedure; the presence of a button is not proof of control.

### 5. Specify the Knowledge, Context, and Retrieval Pipeline

Expand:

- `guide/06-ai-engineering/03-data-knowledge-context-and-semantic-engineering.md`

Add:

- `guide/06-ai-engineering/08-knowledge-context-and-retrieval-pipeline-specification.md`

Define:

- source registration, ownership, authority, and connector identity;
- discover, extract, parse, sanitize, normalize, enrich, segment, embed, index,
  refresh, correct, delete, and retire stages;
- checkpointing, schema evolution, change detection, and reprocessing;
- lexical, vector, graph, metadata, and hybrid candidate generation;
- permission filtering before ranking;
- query understanding, expansion, reranking, diversity, and contradiction
  handling;
- source version, citation, lineage, freshness, and selection rationale;
- context allocation, compaction, cache keys, and immutable context packages;
- poisoning detection, revocation propagation, deletion, and incident response;
- offline retrieval evaluation and runtime outcome evaluation.

Include reference schemas for `SourceRegistration`, `KnowledgeArtifact`,
`RetrievalRequest`, `RetrievalCandidate`, `ContextSelection`, and
`ContextPackage`.

### 6. Add the Tool, Skill, and Integration Contract Reference

Add:

- `guide/agent-factory/04-tool-skill-and-integration-contract-reference.md`

Every callable capability must define:

- identity, owner, version, lifecycle, and discovery metadata;
- purpose and explicit non-purpose;
- input, output, and error schemas;
- authentication and authorization requirements;
- resource and tenant scope;
- data classifications and allowed destinations;
- side-effect and reversibility class;
- idempotency and deduplication behavior;
- timeouts, retries, backoff, rate limits, and concurrency;
- observability, audit, evidence, and redaction behavior;
- dependency, availability, performance, and cost profile;
- test cases, certification, compatibility, deprecation, and revocation.

Add a side-effect taxonomy covering read-only, reversible mutation,
publication, deployment, destructive mutation, privileged administration, and
external communication.

### 7. Add the Multi-Agent Topology and Collaboration Reference

Add:

- `guide/06-ai-engineering/09-multi-agent-topologies-and-collaboration-contracts.md`

Cover single-agent, router, supervisor, planner-executor, peer collaboration,
specialist review, independent critic, debate, map-reduce, and recovery-agent
patterns. For each topology, define:

- selection criteria and measurable reason for multiple agents;
- delegation and authority boundaries;
- shared and private context rules;
- handoff and completion contracts;
- conflict and disagreement resolution;
- prevention of correlated verification;
- concurrency and budget behavior;
- failure containment and partial-result handling;
- decision and evidence lineage;
- when a deterministic workflow is the better choice.

Specialist roles should be examples of bounded capability profiles, not a
fixed organizational chart.

### 8. Consolidate Enterprise Operations, Reliability, and Cost Controls

Add:

- `guide/factory-platform-engineering/07-enterprise-operations-reliability-and-finops-reference.md`

Deepen:

- `guide/factory-platform-engineering/02-scheduling-capacity-cost-and-fairness.md`
- `guide/factory-platform-engineering/03-resilience-disaster-recovery-and-factory-sre.md`
- `guide/factory-platform-engineering/06-observability-semantics-cost-and-forensics.md`

The reference must include:

- scheduler and admission decisions;
- queues, priorities, reservations, fairness, and concurrency;
- quotas, rate limits, token and monetary budgets;
- model, tool, environment, storage, verification, and human-attention cost;
- cost attribution from attempt to accepted outcome;
- SLI, SLO, error-budget, alert, and on-call ownership;
- provider outage, regional failure, dependency degradation, and capacity
  exhaustion behavior;
- retry-without-idempotency versus retry-with-idempotency semantics;
- replay, resume, reconciliation, recovery-point, and recovery-time contracts;
- maintenance, model/version rollout, lifecycle management, and deprecation;
- incident command, forensic preservation, notification, and learning review.

### 9. Add a Bounded AI Systems Primer

Add:

- `guide/06-ai-engineering/00-ai-systems-foundations-for-software-factory-architects.md`

The primer should explain only the concepts required to make factory
architecture decisions:

- tokens, embeddings, context windows, structured output, and tool use;
- inference, latency, throughput, caching, and cost;
- model classes and multimodal inputs at a decision-relevant level;
- training, adaptation, retrieval, and prompting as distinct mechanisms;
- model evaluation, routing, registry, versioning, and rollout;
- bias, privacy, safety, security, and data-governance implications;
- why general model architecture is replaceable infrastructure rather than the
  organizing center of the software factory.

Deep mathematical treatment and broad model-history coverage remain out of
scope.

### 10. Add Executable Architecture and Governance Labs

Add:

- `guide/10-labs/10-authority-containment-and-decision-replay-lab.md`
- `guide/10-labs/11-orchestration-failure-recovery-and-cost-lab.md`
- `guide/10-labs/12-knowledge-poisoning-revocation-and-retrieval-lab.md`
- `guide/10-labs/13-external-capability-intake-and-recertification-lab.md`

Each lab must inject a failure and require independent proof. Required
evidence should include manifests, identities, policy decisions, events,
tool calls, costs, artifacts, evaluator results, human decisions, recovery,
and retained gaps.

### 11. Add an Architecture Hub to the Site

Add:

- `site/app/architecture/page.tsx`
- `site/app/components/ArchitectureExplorer.tsx`

Update:

- `site/app/components/SiteHeader.tsx`
- `site/app/components/SiteFooter.tsx`
- `site/app/page.tsx`
- `site/app/coverage/page.tsx`
- `site/app/learn/page.tsx`
- `site/app/topics/page.tsx`
- `site/scripts/generate-content.mjs`
- `site/tests/rendered-html.test.mjs`

The architecture hub should let readers switch among lifecycle, planes,
components, governance, inventory, architecture pattern, monitoring response,
data flow, and evidence views. Each visual item links to its canonical Markdown
section. The site may maintain navigation labels, but substantive definitions
remain in Markdown and generated metadata.

Required reader behaviors:

- scan the complete system in under two minutes;
- select a component and see responsibility, contracts, risks, and evidence;
- follow one record from intent to production outcome;
- follow one identity and delegation chain;
- follow one failure through containment and recovery;
- filter by role, lifecycle, plane, risk, control family, and maturity;
- use the map on desktop, tablet, mobile, keyboard, and screen reader;
- reach a text/table equivalent for every diagram.

### 12. Add the Factory System Inventory and Classification Reference

Add:

- `guide/04-domain-model/05-factory-system-inventory-classification-and-lifecycle.md`

Define one governed `FactorySystemRecord` for each material autonomous software
delivery system or deployment. It must identify:

- system and use-case purpose, accepted outcomes, and explicit non-purpose;
- accountable business, engineering, security, operations, and assurance roles;
- repositories, workflows, environments, deployment targets, and tenants;
- agent profiles, models, prompts, tools, skills, evaluators, and versions;
- data sources, classifications, residency, retention, and external providers;
- integrations, credentials, trust boundaries, and downstream actions;
- criticality, risk tier, autonomy ceiling, approval policy, and prohibited
  actions;
- evidence status, exceptions, incidents, drift, cost, performance, and last
  review;
- lifecycle state from proposed through approved, active, restricted,
  quarantined, deprecated, retired, and deleted.

The inventory must reference authoritative registries rather than copy their
contents. It is the accountability and classification spine, not a replacement
for the service catalog, capability registry, model registry, or evidence
store.

### 13. Add the Enterprise Governance Operating Model

Add:

- `guide/03-operating-model/06-enterprise-governance-operating-model-and-decision-rights.md`

Define three organizational responsibility levels without prescribing a
specific org chart:

1. **Executive governance:** strategy, values, risk appetite, prohibited uses,
   enterprise standards, material exceptions, investment, and accountability.
2. **Enablement and control function:** inventory, policy, architecture
   standards, assessments, training, lifecycle reviews, control testing,
   measurement, and reporting.
3. **Accountable system and business owners:** use-case value, implementation,
   local controls, monitoring, incident response, evidence, and retirement.

Add independent assurance and cross-functional participation for data,
architecture, security, privacy, legal, compliance, finance, people, and
operations. Include:

- a decision-rights and RACI-style matrix;
- escalation and disagreement paths;
- separation between operating, approving, and independently assuring;
- startup and small-team role-combination guidance that preserves critical
  technical separation;
- meeting and review cadences driven by risk and events rather than ceremony;
- required inputs and outputs for portfolio, system, release, incident, and
  autonomy-promotion decisions.

### 14. Add the Architecture-Pattern and Autonomy-Selection Ladder

Add:

- `guide/06-ai-engineering/10-agentic-architecture-patterns-and-autonomy-selection.md`

Define a decision ladder that selects the minimum sufficient autonomy:

0. deterministic software or fixed automation;
1. prompt-and-response assistance;
2. retrieval-grounded assistance;
3. a bounded single-agent tool loop;
4. coordinated multi-agent specialization;
5. a durable autonomous workflow with triggers, queues, verification, and
   human gates;
6. an enterprise-integrated factory system with governed identity, policy,
   data, operations, and continual improvement.

For every pattern, specify suitable problems, required components, state and
memory needs, tool authority, evaluation, evidence, human oversight, cost,
latency, failure modes, promotion criteria, and fallback to a simpler pattern.
This is an architecture-selection guide, not a maturity score: a lower level
can be the correct production design.

### 15. Add the Factory Operations Control Tower and Response Lifecycle

Add:

- `guide/factory-platform-engineering/08-control-tower-monitoring-detection-and-response.md`

Define the operating loop:

`Observe -> Evaluate -> Detect -> Triage -> Respond -> Verify -> Improve`

The control-tower view must connect:

- governed system inventory and lifecycle status;
- risk, autonomy, authority, policy decisions, denials, and exceptions;
- health, traces, logs, metrics, queues, dependencies, and evidence freshness;
- model, context, tool, evaluator, policy, and outcome drift;
- security, privacy, quality, cost, latency, reliability, and incident signals;
- accountable owner, current response, deadline, and escalation;
- containment, pause, retry, fallback, reconfiguration, rollback, quarantine,
  and retirement actions;
- verified recovery, postmortem, and evaluated improvement proposals.

Define baselines, thresholds, false-positive handling, deduplication,
suppression, severity, sampling, retention, privacy, and alert ownership. An
anomaly may trigger investigation or containment; it must not silently rewrite
prompts, policies, models, evaluators, or capabilities. Material reconfiguration
follows change control and risk-proportional approval.

## Reader and Operator Flows

### Flow 1: Orient to the System

`Homepage -> Architecture hub -> Select view -> Open accountable chapter`

Success means the reader can distinguish lifecycle stages, logical planes,
component responsibilities, and implementation maturity.

### Flow 2: Trace an Authorized Change

`Intent -> Plan -> Capability selection -> Attempt -> Context -> Tool actions ->
Verification -> Evidence -> Review -> Delivery -> Outcome -> Learning`

At each transition the reader can identify the authoritative record, actor,
identity, policy, evidence, failure behavior, and next human decision.

### Flow 3: Investigate a Failure or Incident

`Alert -> Scope -> Pause or contain -> Preserve state -> Diagnose -> Decide ->
Recover or roll back -> Verify -> Notify -> Review -> Improvement proposal`

The flow must cover partial completion, stale context, missing evidence,
provider failure, compromised capability, and policy denial.

### Flow 4: Review a High-Risk Action

`Review inbox -> Decision summary -> Authority -> Side effects -> Evidence ->
Counterevidence -> Alternatives -> Approve, reject, request revision, or
escalate`

Approval must remain distinct from technical permission and final outcome
acceptance.

### Flow 5: Qualify a Capability

`Define -> Package -> Evaluate -> Threat review -> Certify -> Publish -> Select ->
Observe -> Reevaluate -> Promote, deprecate, revoke, or retire`

External capabilities follow the same lifecycle with added ownership,
provenance, contractual, data-use, incident, and exit controls.

### Flow 6: Select the Minimum Sufficient Architecture

`Problem and risk -> Required capability -> Simplest eligible pattern ->
Evaluation and control prerequisites -> Approve pattern -> Operate -> Reassess`

The reader must be able to reject unnecessary multi-agent or autonomous design
when a deterministic, retrieval, or bounded single-agent solution meets the
outcome with less risk and cost.

### Flow 7: Monitor, Detect, and Respond

`Inventory subject -> Observe -> Evaluate against baseline and policy -> Detect
change -> Triage severity -> Contain or continue -> Investigate -> Correct or
reconfigure -> Independently verify -> Close incident -> Propose improvement`

The flow must distinguish normal variation, quality regression, system anomaly,
security incident, policy violation, evidence expiration, and business-outcome
failure.

## Flow Permutations and Edge Cases

| Dimension | Required variants |
|---|---|
| Persona | Executive, architect, builder, security, platform operations, quality, reviewer |
| Risk | Low-impact read, reversible change, publication, deployment, destructive or privileged action |
| Authority | Preauthorized, approval required, exception required, denied, expired, revoked |
| Run state | Queued, running, paused, awaiting input, verifying, blocked, failed, cancelled, quarantined, recovered |
| Evidence | Complete, stale, conflicting, missing, producer-correlated, tampered, revoked |
| Dependency | Healthy, slow, rate-limited, unavailable, inconsistent, compromised |
| Context | Complete, missing, stale, contradictory, unauthorized, poisoned, over budget |
| Device | Desktop, tablet, mobile, keyboard-only, screen-reader text equivalent |
| Continuity | Fresh run, retry, replay, resume after interruption, failover, disaster recovery |
| Architecture pattern | Deterministic, prompt-only, retrieval-grounded, single-agent, multi-agent, durable autonomous workflow, enterprise-integrated |
| Governance scope | Portfolio, system, capability, workflow, attempt, release, incident, learning change |
| Monitoring state | Normal, uncertain, degraded, anomalous, policy-violating, incident, contained, recovering, verified, closed |

## Implementation Phases

### Phase 0 — Normalize the Source Material

Complexity: Small

- [x] Create the detailed architecture coverage matrix.
- [x] Define the governed factory-system inventory record and relationships to
  authoritative registries.
- [x] Map every relevant source concept to one canonical term and owner.
- [x] Mark generic AI background, vendor examples, and excluded material as
  non-canonical.
- [x] Add missing canonical glossary terms before drafting chapters.
- [x] Record current OTel, OWASP, NIST, SPIFFE, SLSA, and SSDF versions or
  stability states.

Exit criteria:

- Every relevant concept has exactly one accountable curriculum location.
- No source-image terminology becomes a competing system model.

### Phase 1 — Build the Canonical Architecture Spine

Complexity: Large

- [x] Deepen the reference architecture into the four synchronized views.
- [x] Add the orchestration component catalog and runtime contracts.
- [x] Add lifecycle sequence, state, stop-condition, and boundary tables.
- [x] Add text equivalents for all diagrams.
- [x] Add Quick Reads to any newly promoted priority chapters.

Exit criteria:

- An architect can trace one authorized change and one failure across every
  plane without switching vocabularies.

### Phase 2 — Complete Governance, Identity, and Emergency Control

Complexity: Large

- [x] Publish the governance control catalog.
- [x] Publish the enterprise governance operating model and decision-rights
  matrix.
- [x] Publish autonomy and authority tiers with explicit permitted and
  prohibited actions.
- [x] Specify identity, delegated authorization, credential exchange, and
  revocation sequences.
- [x] Specify human override, dual control, emergency intervention, incident,
  external-capability, and periodic-review controls.
- [x] Crosswalk the threat model and control evidence to current authoritative
  standards.

Exit criteria:

- Every high-risk control has an owner, enforcement point, evidence artifact,
  failure mode, test, exception path, and review cadence.

### Phase 3 — Specify Knowledge and Capability Contracts

Complexity: Large

- [x] Publish the ingestion, retrieval, context, and revocation specification.
- [x] Publish tool, skill, and integration contract schemas.
- [x] Publish the side-effect and reversibility taxonomy.
- [x] Add poisoning, permission, deletion, versioning, and compatibility tests.

Exit criteria:

- A builder can implement a connector, retrieval path, or tool without
  inventing missing identity, error, audit, retry, cost, or lifecycle behavior.

### Phase 4 — Complete Operations and Multi-Agent Architecture

Complexity: Medium-to-large

- [x] Publish the enterprise operations, reliability, and cost reference.
- [x] Publish the architecture-pattern and autonomy-selection ladder.
- [x] Publish the multi-agent topology and collaboration reference.
- [x] Define stable telemetry, cost, evidence, and forensic schemas.
- [x] Publish the monitoring, detection, triage, response, and verified-closure
  lifecycle.
- [x] Distinguish stable conventions from experimental standards.
- [x] Add failure, replay, resume, failover, and outcome-attribution examples.

Exit criteria:

- Platform and operations reviewers can define SLOs, capacity, budgets,
  incident response, replay safety, and cost per accepted outcome.

### Phase 5 — Add the Supporting Primer and Executable Labs

Complexity: Medium

- [x] Publish the bounded AI systems primer.
- [x] Add four failure-injection labs.
- [x] Add expected evidence bundles and scoring rubrics.
- [x] Add reviewer teach-backs and architecture exercises.

Exit criteria:

- Readers can connect model, retrieval, security, and operations decisions to
  the factory without confusing general AI education with factory architecture.

### Phase 6 — Ship the Reader Experience

Complexity: Medium

- [x] Add the architecture hub and generated metadata.
- [x] Integrate it with paths, topics, coverage, search, header, and footer.
- [x] Add responsive and accessible layered diagrams.
- [x] Add route, content, metadata, exclusion, link, and accessibility tests.
- [x] Run role-based usability walkthroughs.
- [x] Update the reviewer guide, coverage page, changelog, and maturity labels.

Exit criteria:

- Each persona can answer its critical architecture questions without knowing
  the repository structure.

## Acceptance Criteria

### Functional Requirements

- [x] One canonical lifecycle connects intent to accepted outcome and learning.
- [x] Every material factory system has an accountable inventory and
  classification record linked to authoritative registries.
- [x] One reference architecture provides lifecycle, logical, deployment/trust,
  and authority/evidence views.
- [x] Every relevant concept from the supplied images is marked Covered, Partial,
  Supporting Primer, or Out of Scope.
- [x] The orchestration reference defines all twelve core component families
  and their contracts.
- [x] The governance framework defines all ten control families and their test
  evidence.
- [x] The governance operating model assigns executive, enablement/control,
  accountable-owner, independent-assurance, and cross-functional decision
  rights.
- [x] Tool and integration contracts include identity, schemas, side effects,
  data class, retries, idempotency, audit, cost, versioning, and revocation.
- [x] The knowledge pipeline defines ingestion through deletion, poisoning
  containment, permission filtering, context compilation, and evaluation.
- [x] Multi-agent patterns include authority, handoff, disagreement,
  independence, partial-result, and failure behavior.
- [x] The architecture-selection ladder proves why the chosen pattern is the
  minimum sufficient autonomy for the problem and risk.
- [x] Operations content includes SLOs, capacity, budgets, replay/resume,
  failover, incident, forensics, and accepted-outcome cost.
- [x] Monitoring connects traces, logs, metrics, quality, safety, drift, cost,
  latency, policy, incidents, response, verified recovery, and controlled
  improvement.
- [x] Architecture visuals have complete text/table equivalents.
- [x] The existing content exclusions remain absent from public routes.

### Quality Gates

- [x] All Markdown links pass.
- [x] Content generation succeeds with no orphaned architecture metadata.
- [x] Lint, TypeScript, application build, Vercel build, and automated tests
  pass.
- [x] Every new technical chapter satisfies the depth rubric.
- [x] Every primary standard is linked, dated, and labeled stable, draft, or
  experimental where applicable.
- [ ] Security and governance chapters receive independent technical review.
- [x] At least one architect, builder, security, and operations walkthrough is
  completed and findings are recorded.
- [x] No chapter advances to Validated without resolved feedback and defined
  evidence; no capability advances to Operationally proven from documentation
  alone.

### Success Metrics

- 100% of relevant source concepts have an accountable curriculum owner.
- 100% of critical controls define enforcement and evidence.
- 100% of material factory systems have an accountable owner, risk tier,
  autonomy ceiling, lifecycle state, and last-review evidence.
- Zero competing canonical names for the same component or lifecycle stage.
- Every autonomous pattern has documented justification against at least one
  simpler alternative.
- Zero architecture diagrams without an accessible text equivalent.
- Four role-based reviewers can trace the system and locate detailed contracts
  without author assistance.
- Labs can reproduce containment, recovery, revocation, and evidence outcomes
  using synthetic data.

## Risks and Mitigations

### Risk: Turning the Curriculum into a Generic AI Encyclopedia

Mitigation: Keep general AI material in one bounded primer. Require every topic
to explain which factory decision it informs.

### Risk: Duplicating the Same Architecture in Several Chapters

Mitigation: Use the coverage matrix and canonical reference architecture as
the ownership map. Other chapters deepen one responsibility and link back.

### Risk: Copying Unverified or Proprietary Claims

Mitigation: Treat the images as prompts for gap discovery. Rewrite concepts in
the canonical vocabulary and validate controls against primary sources.

### Risk: Creating Attractive but Unmaintainable Diagrams

Mitigation: Keep substantive architecture in Markdown, Mermaid, tables, and
generated metadata. Require text equivalents and small synchronized views.

### Risk: Overclaiming Maturity

Mitigation: Retain the current maturity ladder and implementation-evidence
boundary on every new module.

### Risk: Standards Drift

Mitigation: Record version and stability. In particular, treat current GenAI
agent telemetry conventions as developing rather than permanent.

### Risk: Governance Becomes Policy Theater

Mitigation: Every control needs a failure injection, evidence artifact, owner,
exception path, and review cadence.

## Alternatives Considered

### Add One Very Large Architecture Chapter

Rejected. It would be difficult to review, navigate, update, and assign
ownership. The better structure is one canonical spine plus focused reference
modules.

### Copy the Supplied Diagrams into the Site

Rejected. The images mix portable concepts, broad AI background, example
technologies, and product-specific structures. Direct reuse would create
licensing, accuracy, consistency, and maintenance problems.

### Add Every Named Technology to the Glossary

Rejected. Technologies change faster than responsibilities. The curriculum
should describe selection criteria and use a short, dated examples table only
where it teaches a durable decision.

### Keep the Current Content and Add Only a New Visual

Rejected. The missing depth is contractual and operational, not cosmetic. A
new diagram without component and control specifications would make the
coverage look more complete than it is.

## Documentation and Navigation Updates

Update after the new modules are drafted:

- `README.md`
- `guide/README.md`
- `guide/00-overview/02-canonical-glossary.md`
- `guide/00-overview/06-reading-paths.md`
- `guide/00-overview/07-topic-index.md`
- `guide/00-overview/08-capability-coverage-and-maturity.md`
- `guide/00-overview/09-reviewer-guide.md`
- `guide/00-overview/10-changelog.md`

Add cross-links from each architecture object to its control, evidence,
failure, lab, and maturity locations.

## Standards and Primary References

- [NIST AI Risk Management Framework 1.0](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf)
- [NIST Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [NIST Secure Software Development Framework](https://csrc.nist.gov/Projects/ssdf/publications)
- [OWASP Agentic AI Threats and Mitigations](https://genai.owasp.org/resource/agentic-ai-threats-and-mitigations/)
- [SPIFFE Workload API](https://spiffe.io/docs/latest/spiffe-specs/spiffe_workload_api/)
- [SLSA specification 1.2](https://slsa.dev/spec/v1.2/)
- [OpenTelemetry GenAI Semantic Conventions](https://github.com/open-telemetry/semantic-conventions-genai)
- [Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)

## Final Review Checklist

- [x] The plan adds depth, not a second architecture.
- [x] All source concepts are classified and traceable.
- [x] Vendor-specific examples remain examples, not architecture.
- [x] Every critical control is testable.
- [x] Every diagram is accessible and linked to canonical text.
- [x] Every maturity claim states its evidence boundary.
- [x] The architecture remains implementable as a simple V1 before describing
  scale-out options.
- [x] The plan preserves a calm, navigable experience for all four learning
  paths.
