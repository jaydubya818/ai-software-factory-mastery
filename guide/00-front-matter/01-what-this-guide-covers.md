---
title: What this guide covers
part: front-matter
chapter: 0
summary: The coverage map of the guide — the four disciplines it keeps separate, the canonical stack boundaries, the thirteen vocabulary areas, the capability areas by priority, the gaps this edition closed, and where each of them lives.
absorbs: []
infographics: []
---

# What this guide covers

A guide this long needs a map that fits on a few pages. This one exists so a reader can answer two questions quickly: *does the guide cover this?* and *where?* It is organized by the things the guide has to keep apart, then by the vocabulary a working factory needs, then by capability area and priority, and finally as a checklist and a reading order. Every row points at the chapter or stage page that owns the material; the [glossary](../appendix/glossary.md) holds the canonical wording for every term named here.

## The four things this guide keeps separate

Most descriptions of "agent infrastructure" fold four different jobs into one layer. The guide refuses that, because once the four are collapsed you cannot say which one failed. The chain runs `Knowledge preparation → Context selection → Harness execution → Workflow governance`, and each link has its own owner, cadence, and way of going wrong.

**Knowledge preparation** is the work done before any task exists: deciding which sources are authoritative, ingesting and chunking them, indexing them, evaluating retrieval quality, and retiring what has gone stale. It changes slowly and every run shares it. When it is folded into the agent layer, a stale document selected on Tuesday gets blamed on the model, and the real fix, a corpus refresh policy, is never written. [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md) owns it.

**Context selection** is the per-attempt decision about which subset of the prepared knowledge, repository state, and instructions this particular run will see, in what order, at what budget. Collapsing it into knowledge preparation hides the difference between "the corpus lacked the answer" and "the answer was in the corpus and the context policy did not pick it." [Chapter 15](../03-build/15-agent-architecture.md) covers the loop's context and memory mechanics; [chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md) covers the selection discipline itself.

**Harness execution** is the bounded run: the inner loop that reasons and calls tools, the outer harness that provisions, supervises, budgets, and classifies completion, and the environment and compute underneath. It is the only one of the four that touches a shell. When execution is merged with governance, a harness ends up deciding whether its own work is acceptable, which is exactly the authority the factory must withhold from it. [Chapter 4](../02-design/04-the-human-agent-operating-model.md) sets the operating model, [chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md) the harness boundaries, and [chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md) the environments and compute.

**Workflow governance** is durable progress and authority: what the Mission is, which Plan was approved, which WorkOrder is running, what evidence has been recorded, and who may accept the result. Folding it into the harness layer produces a factory whose state lives in a chat transcript. [Chapter 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md) and [Stage 2 · Plan](../stages/02-plan.md) own it.

*The loop decides the next action; the workflow owns durable progress and authority.*

## Canonical stack boundaries

The guide uses eleven definitions to keep the stack legible. Readers arrive with their own meanings for "harness" and "agent"; the chapters assume these.

| Term | Definition | Read |
|---|---|---|
| Agent Runtime | The execution substrate that starts, observes, controls, and terminates agent sessions or Attempts using an exact harness, environment, identity, and model route. Runtime capability does not establish business authority. | [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| AI Coding Agent | An agent specialized for repository investigation, planning, code or configuration changes, testing, review, and related software engineering work. Repository capability does not grant publication, merge, release, or acceptance authority. | [Ch. 2](../01-understand/02-the-factory-in-one-view.md), [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| Coding Harness | An agent harness specialized for repository work such as code search, file edits, commands, tests, Git operations, and development feedback. Product integrations must still identify which inner- and outer-harness responsibilities they implement. | [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| Inner Harness | The coding or agent loop that prepares model input, manages context, exposes and executes tools, streams observations, compacts or resumes a session, and determines when one session stops. It does not own durable cross-run workflow authority. | [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| Outer Harness | The adapter and supervisor around an inner harness that validates the execution contract, provisions the environment, translates lifecycle events, enforces runtime budgets, captures artifacts, classifies completion, and tears down resources. It cannot accept or publish its own work. | [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| Agent Factory | The governed capability supply chain that creates, packages, versions, evaluates, publishes, discovers, admits, deprecates, and revokes reusable agents, skills, tools, model profiles, and configurations. It supplies capabilities to an AI Software Factory but does not authorize or accept a particular delivery outcome. | [Ch. 2](../01-understand/02-the-factory-in-one-view.md), [Ch. 10](../03-build/10-the-agent-factory.md) |
| Development Environment | The versioned checkout layout, toolchains, dependencies, local and shared services, identities, test data, previews, and commands required to build and evaluate software. It may run on several compute backends and does not authorize its own use. | [Ch. 14](../03-build/14-development-environments-sandboxes-and-compute.md) |
| Compute Infrastructure | The machines, processes, containers, VMs, storage, network, and capacity pools that host development and execution environments. Compute allocation does not prove environment readiness, isolation, or WorkOrder authority. | [Ch. 14](../03-build/14-development-environments-sandboxes-and-compute.md) |
| Agentic Workflow | A durable, versioned workflow in which one or more agents perform bounded reasoning and tool-use steps under explicit contracts. It is larger than an agent loop and retains progress when no model process is running. | [Ch. 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md) |
| Agent Loop versus Workflow | The loop decides the next action; the workflow owns durable progress and authority. A loop can be restarted, replaced, or run in parallel without changing what the workflow has recorded. | [Ch. 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md), [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| Mission Control | One implementation of the factory control plane: the guide's living case study for governing Missions, execution admission, verification, evidence, and human authority. It is not the universal definition of a software factory or every component in the execution stack. | [Ch. 34](../06-improve/34-mission-control-as-a-living-case-study.md) |

One consequence deserves stating on its own. The word "harness" is used in the field as a broad umbrella for everything between the model and the repository. The guide decomposes that umbrella into five replaceable parts: the **inner harness**, the **outer harness**, the **orchestration and control plane**, the **development environment**, and the **compute** beneath it. Each of the five has a different vendor, replacement cadence, and failure signature, and the boundaries only stay visible if they are named. The [glossary](../appendix/glossary.md) carries the canonical text for all eleven.

## The thirteen vocabulary areas

A factory is run by people who have to agree on words. The guide organizes its working vocabulary into thirteen areas. Each subsection says what the area is for, where to read it, and lists its terms in one run.

### 1. Data Understanding

Data understanding is the discipline of deciding whether the data an agent or a decision depends on is complete, current, valid, consistent, attributable, permitted, and fit for the purpose at hand. A corpus built on unfit data is a well-indexed mistake. *Provenance tells you where data came from; data understanding tells you whether it is usable for this decision.*

Read: [Stage 4 · Execute through Harness](../stages/04-execute-through-harness.md) and [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md), with [Chapter 15](../03-build/15-agent-architecture.md) for how the loop consumes it.

Terms: data profiling, data contracts, completeness and missingness, data quality dimensions, freshness and staleness, source authority and system of record, data lineage and provenance, schema drift, duplication and inconsistency, sensitivity and classification, retention and deletion, data-quality gates, missing-data handling, data observability.

### 2. Knowledge Engineering

Knowledge engineering prepares the corpus an agent may draw on: which sources are authoritative, how they are ingested, chunked, embedded, indexed, refreshed, and retired, and how retrieval quality is measured. It is a shared, slowly changing asset, distinct from per-attempt selection. *Knowledge Engineering prepares the corpus → Context Engineering selects the subset for this attempt.*

Read: [Stage 4 · Execute through Harness](../stages/04-execute-through-harness.md) and [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md), with [Chapter 15](../03-build/15-agent-architecture.md) for memory types.

Terms: source authority, ingestion, chunking, embedding, indexing, hybrid retrieval, reranking, retrieval-augmented generation, knowledge freshness and refresh policy, knowledge retirement and revocation, knowledge poisoning, Precision@k, Recall@k, MRR, NDCG, groundedness and faithfulness, retrieval failure taxonomy, context package, context compaction, working, episodic, semantic, procedural, and temporal memory.

### 3. Semantic Engineering

Semantic engineering makes the organization's words mean one thing everywhere: it defines the controlled vocabulary, the ontology, the entity-resolution rules, and the semantic contracts that let a record in one system be recognized in another. It is distinct from cryptographic canonicalization, which normalizes bytes for hashing; semantic engineering normalizes meaning, so that "customer," "account," "workspace," and "release" refer to the same thing in the spec, the data, the code, and the evidence.

Read: [Stage 1 · Builder Intent](../stages/01-builder-intent.md) and [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md), with [Chapter 5](../02-design/05-authoritative-records.md) for the record hierarchy these words describe.

Terms: controlled vocabulary, ontology, entity resolution, semantic contract, canonical identifiers, term ownership and stewardship, definition drift, synonym and alias management, cross-system mapping, semantic versioning.

### 4. Evaluation operations, trace replay, and comparison

Evaluation operations turn "does this capability work" into a repeatable measurement with datasets, trials, graders, and statistics, and then keep those measurements honest as the models and the corpus change. Trace replay and run comparison are the forensic half: reproducing an execution from its recorded trace and comparing two runs to see what a change actually did.

Read: [Stage 6 · Evaluate](../stages/06-evaluate.md) and [Chapter 23](../04-prove/23-evaluation-engineering.md).

Terms: eval task/case, eval fixture, evaluation dataset, golden set, holdout set, dataset slice/cohort, trial, grader, deterministic grader, model grader/LLM-as-judge, human grader, grader calibration, inter-rater agreement, false-positive/false-negative analysis, offline, shadow, canary, and online evals, pass@k and consistency-oriented measures, regression threshold and quality floor, dataset contamination, eval drift, statistical confidence and uncertainty, eval lineage and reproducibility, trace capture, recorded-trace inspection, execution replay, mocked-tool replay, environment snapshot, trajectory diff, baseline-versus-candidate run comparison, counterfactual replay, trajectory evaluation, evaluator registry.

### 5. Development environments and compute

This area describes the machines and toolchains that agents run on, and the contracts that make an environment reproducible rather than a snowflake. It separates the environment (what a run needs) from the compute (what hosts it) so that either can be replaced without the other noticing.

Read: [Stage 4 · Execute through Harness](../stages/04-execute-through-harness.md) and [Chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md).

Terms: cloud development environment/CDE, worker pool and runner fleet, environment manifest, base image and golden image, toolchain pinning, environment bootstrap, dependency and build caching, warm pool and cold start, ephemeral versus persistent environments, pets versus cattle, remote development workstation, preview environment and shareable preview URL, shared development services/dev cloud, service virtualization, identity and credential provisioning, private connectivity and egress control, BYOC/bring-your-own-compute, self-hosted, VPC, and on-premises deployment, capacity scheduling, autoscaling, quotas and concurrency controls, resource teardown and orphan detection, compute cost allocation, development environment contract, sandbox profile, execution manifest, worker capability attestation, worktree, preflight.

### 6. Harness interoperability and composable infrastructure

This area covers how harnesses, tools, editors, and user interfaces talk to each other through versioned protocols, and what "composable" has to mean before it is more than a slide. The three protocols have distinct jobs: **MCP** (Model Context Protocol) connects a model to tools and resources; **ACP** (the Agent Client Protocol, a dated specification whose version must be pinned because the acronym is reused elsewhere) connects an editor or client to a coding-agent session; **AG-UI** connects an agent backend to a user-facing application through lifecycle, message, tool, state, and interaction events. Product-specific features of any one harness stay out of the enduring glossary; only the boundaries they implement are named.

Read: [Stage 4 · Execute through Harness](../stages/04-execute-through-harness.md) and [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md), with [Chapter 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md) for the vendor landscape.

Terms: harness adapter, harness capability manifest, harness lifecycle, lifecycle hooks, headless/non-interactive execution, structured event stream, JSONL session transcript, session resume, checkpoint and compaction, capability discovery and negotiation, adapter conformance test, harness portability, protocol version negotiation, ACP, AG-UI, agent-to-agent interoperability, MCP versus ACP versus AG-UI boundary, composable stack, vertically integrated stack, build versus buy, provider lock-in, exit strategy, managed versus self-hosted execution, inner harness, outer harness, model Context Protocol, MCP task, agent Client Protocol, agent–User Interaction Protocol, agent2Agent Protocol, protocol pinning.

### 7. Feedback-to-reproduction engineering

Production feedback arrives untrusted, duplicated, and often about a version that no longer exists. This area is the discipline of turning it into something an agent can act on: `Untrusted feedback → current-version check → deduplication → reproduction → issue promotion → classification → plan/fix → regression suite → user notification`. Every step is a place where a factory can be poisoned or waste attention.

Read: [Stage 7 · Improve](../stages/07-improve.md) and [Chapter 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md).

Terms: untrusted feedback intake, feedback normalization, latest-version verification, feedback deduplication and clustering, reproduction generation, canonical/minimal reproduction, reproduction confidence, issue promotion, issue triage, severity, priority, and difficulty classification, human shepherd, escalation packet, incident-derived eval case, every-PR regression execution, time-to-triage and time-to-reproduction, feedback signal, signal severity, regression asset, user notification.

### 8. Automated PR review and agentic merge operations

This area covers agents that review candidates and agents that keep candidates mergeable while the queue moves underneath them. Its governing invariant is short: *an agent may keep a human-approved candidate mergeable, but it must not silently expand scope or replace the human merge decision.*

Read: [Stage 8 · Deliver Software](../stages/08-deliver-software.md) and [Chapter 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md).

Terms: automated PR review agent, CodeRabbit as a versioned case study, review-comment ingestion, finding identity and thread state, false-positive handling, fix-review loop, maximum review iterations, reviewer independence, mergeability state machine, agentic merge queue, merge babysitting, update-branch/rebase loop, stale-base detection, CI retry classification, conflict detection and bounded resolution, merge train, dependency-aware merge order, human merge gate, stacked PRs, PR slicing, migration ordering across PRs, review package, integration candidate, scope drift detection, approval invalidation, publication permit.

### 9. Multi-repository development

Real systems live in many repositories, and a change that is correct in one can be wrong in the set. This area covers how a factory plans, executes, and verifies a coordinated change across repositories. Submodules, subtrees, and symlinks are taught by their failure modes rather than prescribed.

Read: [Stage 2 · Plan](../stages/02-plan.md) and [Chapter 9](../02-design/09-multi-repository-design.md).

Terms: monorepo versus polyrepo, multi-repository workspace, coordination repository, workspace/repository manifest, repository dependency graph, relevant-repository discovery, cross-repository context selection, multi-repository worktree, version skew, cross-repository invariant, coordinated PR, merge ordering, release train, cross-repository rollback, partial/sparse clone, git submodule, git subtree, symlink-based workspace, ownership and approval across repositories, coordinated change set, dependency coordination, version pinning.

### 10. Production reliability vocabulary

This area names the mechanisms that keep long-running, partially failed, and retried work from corrupting state or authority.

Read: [Stage 4 · Execute through Harness](../stages/04-execute-through-harness.md) and [Chapter 12](../03-build/12-durable-execution.md), with [Chapter 29](../05-operate/29-resilience-incidents-and-the-control-tower.md) for incidents and the control tower.

Terms: timeout budget, retry policy, exponential backoff and jitter, rate limiting, circuit breaker, bulkhead isolation, backpressure, load shedding, dead-letter queue, poison message, graceful degradation, dependency fallback, provider failover, health probe, recovery objective, queue age, capacity exhaustion, denial of wallet, failure-domain classification, lease and heartbeat, idempotency, reconciliation, admission control, immutable history, break-glass access, emergency control, control tower, verified closure.

### 11. Human operating modes and compounding engineering

This area describes how humans sit relative to the loop, in it, on it, or out of it, and how the corrections they make stop being repeated. Compounding engineering is the mechanism: a correction made twice becomes an evaluated repository instruction, a skill, a test, or a workflow rule, so the third occurrence never reaches a human.

Read: [Stage 7 · Improve](../stages/07-improve.md) and [Chapter 33](../06-improve/33-governed-learning-and-compounding-engineering.md), with [Chapter 8](../02-design/08-economics-metrics-and-human-attention.md) for attention economics and [Chapter 4](../02-design/04-the-human-agent-operating-model.md) for the operating model.

Terms: human-in-the-loop, human-on-the-loop, human-out-of-the-loop, meaningful human control, human override and abort, approval fatigue, attention budget, decision latency, human shepherd, model-workflow fit, model-switching cost, user workflow profile, prompt portability, correction harvesting, pattern mining, skill extraction/codification, anti-pattern catalog, feedback-to-skill loop, learning debt, compounding engineering, engineering attention altitude, correction record, learning signal, improvement candidate, recipe, factory memory, promotion and demotion, recursive improvement boundary.

### 12. Enterprise and open-source AI infrastructure

This area maps the landscape a buyer or builder faces: what enterprise platforms supply, what open-source components supply, and how to tell a composable stack from a branded one. It is deliberately dated; vendors change faster than boundaries.

Read: [Stage 3 · Define Agent](../stages/03-define-agent.md) and [Chapter 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md).

Terms: SSO, OIDC/SAML, SCIM, RBAC and ABAC, tenant isolation, data residency and sovereignty, private networking, DLP and egress controls, BYOK/key management, audit retention and legal hold, quotas, chargeback, and showback, managed, self-hosted, BYOC, VPC, and on-premises deployment, open source versus open-core versus source-available, license governance, maintainer and project-health risk, upgrade and compatibility policy, enterprise support/SLA, extensibility and vendor-exit criteria, AI infrastructure, composable AI infrastructure, model gateway, model catalog, developer portal, service catalog, golden path.

### 13. Prototype and extensible-software patterns

This is a lower-priority, adjacent area and not a requirement of this edition. It covers how a prototype can serve as an executable specification, and how software is designed to be extended by agents later without being rewritten.

Read: [Chapter 36](../06-improve/36-where-this-is-going.md), with [Stage 1 · Builder Intent](../stages/01-builder-intent.md) for prototype-as-specification.

Terms: prototype-as-spec, interaction mock, discovery prototype, tracer bullet/technical spike, prototype-to-production rewrite, visual regression evidence, agent-generated extensions, code mode, dynamic code generation, trusted core/untrusted extension boundary, sandboxed extension API, agentic shell around a deterministic core, extension point, plugin architecture, capability map.

## Capability areas by priority

Capability areas are what a factory has to be able to do; the table ranks them. P0 areas are the ones without which the factory is not a factory; P1 areas are what make it survivable and economical; P2 areas are what make it acceptable to a regulated enterprise. The Skills Framework and the eight factory workflows that the source material describes are now first-class: the framework lives in [Stage 5](../stages/05-apply-skills.md) and [Chapter 10](../03-build/10-the-agent-factory.md), and the workflow catalog in [Chapter 20](../03-build/20-autonomous-engineering-workflows.md).

| Priority | Area | What the guide covers | Where |
|---|---|---|---|
| P0 | Agent Factory capability supply chain | Creating, packaging, versioning, evaluating, publishing, admitting, deprecating, and revoking agents, skills, tools, and model profiles; the Skills Framework and skill maturity | [Ch. 10](../03-build/10-the-agent-factory.md), [Stage 5](../stages/05-apply-skills.md) |
| P0 | Capability registries | Agent, skill, tool, prompt, and evaluator registries; capability packages, certification, and revocation | [Ch. 10](../03-build/10-the-agent-factory.md) |
| P0 | Repository onboarding and intelligence | Repository readiness records, codebase intelligence, onboarding gates, and what a repository must expose before an agent may work in it | [Ch. 20](../03-build/20-autonomous-engineering-workflows.md) |
| P0 | Autonomous engineering workflow catalog | The governed inventory of supported workflows, including the eight factory workflows, their contracts, and their autonomy ceilings | [Ch. 20](../03-build/20-autonomous-engineering-workflows.md) |
| P0 | Software testing engineering | Test strategy for agentic change: unit through end-to-end, contract, mutation, property-based, fuzz, performance, accessibility, and visual regression; flaky-test handling and test-impact analysis | [Ch. 22](../04-prove/22-testing-strategy-for-agentic-change.md) |
| P0 | Complete delivery lifecycle | CI/CD, artifact registries, progressive delivery, production verification, rollback, and the measured outcome | [Ch. 25](../04-prove/25-cicd-progressive-delivery-and-production-verification.md), [Stage 8](../stages/08-deliver-software.md) |
| P1 | Factory scheduling and economics | Schedulers, admission control, capacity reservation, cost per accepted outcome, attention budgets, and leverage | [Ch. 27](../05-operate/27-the-factory-as-a-platform.md), [Ch. 8](../02-design/08-economics-metrics-and-human-attention.md) |
| P1 | Factory resilience | Durable execution, leases, reconciliation, incidents, disaster recovery, and the control tower | [Ch. 29](../05-operate/29-resilience-incidents-and-the-control-tower.md), [Ch. 12](../03-build/12-durable-execution.md) |
| P1 | Agentic security threat model | Indirect prompt injection, tool and memory poisoning, denial of wallet, workload identity, delegated authorization, supply chain, and SBOMs | [Ch. 26](../04-prove/26-security.md) |
| P1 | Evaluation science | Datasets, trials, graders, calibration, significance, trace replay, and run comparison | [Ch. 23](../04-prove/23-evaluation-engineering.md) |
| P1 | Human-agent experience | Builder surfaces, plan previews, review inboxes, decision packets, and the ergonomics of human authority | [Ch. 30](../05-operate/30-control-surfaces-event-contracts-and-storage.md), [Ch. 7](../02-design/07-governance-policy-and-risk-proportional-approval.md) |
| P1 | Platform product model | The factory as an internal product: golden paths, developer portals, service catalogs, adoption, and the infrastructure landscape | [Ch. 27](../05-operate/27-the-factory-as-a-platform.md), [Ch. 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md) |
| P2 | Data, privacy, legal, compliance | Retention, residency, license compliance, policy as code, and the evidence regulators ask for | [Ch. 26](../04-prove/26-security.md), [Ch. 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md) |
| P2 | Workflow and event contracts | Workflow contracts, event schemas, trace context, storage of immutable history, and control-surface APIs | [Ch. 30](../05-operate/30-control-surfaces-event-contracts-and-storage.md), [Ch. 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md) |

## Six sections the guide was asked to add

An earlier draft was strong on control-plane theory and thin on the surrounding engineering. Six sections were added, each in a specific place rather than as a bolt-on.

**Agent Factory and capability supply chain.** The factory that builds the parts: how a capability is authored, packaged, versioned, evaluated against a dataset, certified, published to a registry, discovered, admitted into a run, deprecated, and revoked, and how an external capability is taken in and recertified. It lives in [Chapter 10](../03-build/10-the-agent-factory.md) and [Stage 5](../stages/05-apply-skills.md), with the certification and intake mechanics in Chapter 10's "How to build it".

**Repository intelligence and onboarding.** What a repository must expose before agents may work in it: the readiness record, the build and test commands, the codebase intelligence that lets an agent find its way, and the onboarding gates that say when the repository is ready for which workflow. It lives in [Chapter 20](../03-build/20-autonomous-engineering-workflows.md), with [Chapter 9](../02-design/09-multi-repository-design.md) for the multi-repository case.

**Autonomous engineering workflow patterns.** The catalog of workflows a factory supports, from issue-to-validated-pull-request through dependency updates, migrations, incident remediation, and the autonomous backlog, each with its contract, its autonomy ceiling, and its escalation path. It lives in [Chapter 20](../03-build/20-autonomous-engineering-workflows.md), with the loop mechanics in [Chapter 18](../03-build/18-agent-and-loop-engineering.md) and the durable substrate in [Chapter 12](../03-build/12-durable-execution.md).

**Verification and delivery engineering.** The testing strategy for agent-produced change, the evaluation science that measures capabilities, the proof packages and certificates that carry evidence to a decision, and the CI/CD and progressive-delivery pipeline that turns an accepted candidate into an observed production outcome. It spans [Chapters 21](../04-prove/21-quality-and-evidence-architecture.md) through [25](../04-prove/25-cicd-progressive-delivery-and-production-verification.md) and [Stage 8](../stages/08-deliver-software.md).

**Factory platform engineering.** The factory run as a product: scheduling and economics, observability and forensics, resilience and incidents, control surfaces and storage, and enterprise adoption. It is Part V, [Chapters 27](../05-operate/27-the-factory-as-a-platform.md) through [31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md).

**Agentic security, privacy, and compliance.** The threat model specific to agents, identity and secrets, supply chain and attestation, retention and residency, license compliance, and policy as code. It lives in [Chapter 26](../04-prove/26-security.md), with the adoption and compliance material in [Chapter 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md).

## The nine gaps this edition closed

Beyond the six sections, nine specific gaps stood between what a working factory needs and what was written down. Each is now closed in a named chapter.

1. **Stack boundaries.** The runtime, agent, harness, factory, environment, compute, and workflow definitions above did not exist as a set; now they do, in [Chapter 2](../01-understand/02-the-factory-in-one-view.md), [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md), and the [glossary](../appendix/glossary.md).
2. **Data, knowledge, context, and semantic engineering.** Four disciplines that were one paragraph are now one chapter with their own contracts and failure modes, [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md).
3. **Evaluation datasets, graders, replay, and comparison.** Evaluation is now an operational discipline with datasets, trials, graders, calibration, and forensic replay, in [Chapter 23](../04-prove/23-evaluation-engineering.md).
4. **Development environments, compute fleets, and composable infrastructure.** The environment contract, the compute that hosts it, and the build-versus-buy decision are in [Chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md).
5. **Inner and outer harnesses, adapters, and protocols.** The harness split, the adapter and capability manifest, and MCP, ACP, AG-UI, and A2A are in [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md).
6. **Orchestration, routing, convergence, and escalation loops.** How work is routed, how loops converge or are stopped, and how escalation reaches a human are in [Chapter 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md), [Chapter 17](../03-build/17-models-routing-and-capability-selection.md), and [Chapter 18](../03-build/18-agent-and-loop-engineering.md).
7. **Production feedback, reproduction, review, and merge.** The feedback-to-reproduction flow, automated review, and the agentic merge queue are in [Chapter 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md).
8. **Multi-repository coordination.** Coordinated change sets, workspace manifests, and the submodule, subtree, and symlink failure modes are in [Chapter 9](../02-design/09-multi-repository-design.md).
9. **Compounding engineering and human-attention economics.** How corrections become durable assets and how attention is budgeted are in [Chapter 33](../06-improve/33-governed-learning-and-compounding-engineering.md) and [Chapter 8](../02-design/08-economics-metrics-and-human-attention.md).

## Two more layers of the map, added from the public record

Two public framings and one published operating account were folded in after the nine gaps, because each names something the chapters had only implied.

**Loop, graph, harness, meta-harness.** The four nested layers of an agent system, with the diagnosis rule that most agent failures are architecture failures at a specific layer, not prompting failures, are in [Chapter 15](../03-build/15-agent-architecture.md), with the loop's completion rule in [Chapter 18](../03-build/18-agent-and-loop-engineering.md) and the meta-harness — one governance layer across hosted coding agents, internal agents, and domain agents — in [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md). The six-layer view of a working agentic system (experience and trigger, orchestration and state, tools and deterministic logic, trusted context, trust and control, runtime and operations) is mapped row by row to this guide's chapters in Chapter 15.

**The economics of running a factory at scale.** Token economics — tokenomics: the cost equation (users × sessions × turns × requests × tokens × price), the lever for every term, budgets as execution controls, visibility instead of caps, and session analysis — is in [Chapter 8](../02-design/08-economics-metrics-and-human-attention.md); benchmark-driven, Pareto-optimal model selection and the primary/subagent default policy in [Chapter 17](../03-build/17-models-routing-and-capability-selection.md); the tool gateway, CLI tool resolution, tool search, and code-mode in Chapter 15; loop defaults that decide cost (compaction threshold, reasoning effort, prompt-cache TTL) in Chapter 18; the context graph in [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md); the move from interactive sessions to managed agents in [Chapter 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md); and skills that improve from their own traces, as governed candidates, in [Chapter 33](../06-improve/33-governed-learning-and-compounding-engineering.md). The public figures cited are one organization's published measurements and are labelled as such.

The protocol material is dated as of writing and grounded in the official specifications rather than in secondhand summaries: the [Agent Client Protocol](https://zed.dev/acp), the [AG-UI protocol](https://docs.ag-ui.com/), the [A2A specification](https://a2a-protocol.org/dev/specification/), the [Claude Code headless documentation](https://code.claude.com/docs/en/headless), and the [GitHub merge queue documentation](https://docs.github.com/en/enterprise-cloud@latest/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/managing-a-merge-queue). When those documents move, the chapters that cite them are the ones to revisit.

## Checklist: what the guide must cover

The twelve rows below are the coverage contract for this edition. A topic not on this list is either a supporting glossary term or deliberately out of scope.

| # | Must cover | Chapters |
|---|---|---|
| 1 | Factory architecture, operating models, economics, and adoption | [Ch. 2](../01-understand/02-the-factory-in-one-view.md), [Ch. 4](../02-design/04-the-human-agent-operating-model.md), [Ch. 8](../02-design/08-economics-metrics-and-human-attention.md), [Ch. 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md) |
| 2 | Business intent, executable specifications, and delivery records | [Ch. 5](../02-design/05-authoritative-records.md), [Ch. 6](../02-design/06-intent-and-specification-engineering.md), [Stage 1](../stages/01-builder-intent.md) |
| 3 | AI coding agents, agent orchestration, workflows, and loop engineering | [Ch. 11](../03-build/11-control-plane-orchestrator-and-execution-plane.md), [Ch. 15](../03-build/15-agent-architecture.md), [Ch. 18](../03-build/18-agent-and-loop-engineering.md), [Ch. 20](../03-build/20-autonomous-engineering-workflows.md) |
| 4 | Coding harnesses, adapters, lifecycle hooks, MCP, ACP, AG-UI, and A2A | [Ch. 13](../03-build/13-coding-harnesses-and-agent-protocols.md) |
| 5 | Data, knowledge, semantic, context, and model engineering | [Ch. 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md), [Ch. 17](../03-build/17-models-routing-and-capability-selection.md) |
| 6 | Development environments, compute fleets, sandboxes, and composable infrastructure | [Ch. 14](../03-build/14-development-environments-sandboxes-and-compute.md) |
| 7 | Evaluation datasets, trials, graders, trace replay, and run comparison | [Ch. 23](../04-prove/23-evaluation-engineering.md) |
| 8 | Independent verification, proof packages, provenance, and quality gates | [Ch. 21](../04-prove/21-quality-and-evidence-architecture.md), [Ch. 24](../04-prove/24-quality-contracts-proof-packages-and-certificates.md) |
| 9 | Production feedback, reproduction, automated review, and merge maintenance | [Ch. 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md) |
| 10 | Multi-repository delivery, dependency coordination, submodules, and subtrees | [Ch. 9](../02-design/09-multi-repository-design.md) |
| 11 | Security, identity, policy, progressive autonomy, and human decision rights | [Ch. 3](../01-understand/03-first-principles-trust-evidence-and-authority.md), [Ch. 7](../02-design/07-governance-policy-and-risk-proportional-approval.md), [Ch. 26](../04-prove/26-security.md) |
| 12 | Compounding engineering, controlled improvement, and human-attention economics | [Ch. 8](../02-design/08-economics-metrics-and-human-attention.md), [Ch. 33](../06-improve/33-governed-learning-and-compounding-engineering.md) |

## Recommended reading order for the deep material

Front to back remains the best route. A reader who already has the operating model and wants the deep engineering material can take this shorter path; each step assumes the vocabulary of the one before.

1. **Stack boundaries and the Agent Factory.** Start with the definitions, then the factory that supplies the parts: [Chapter 2](../01-understand/02-the-factory-in-one-view.md), [Chapter 10](../03-build/10-the-agent-factory.md), [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md).
2. **Data, knowledge, context, and semantic engineering.** What the agent knows and how it is chosen: [Chapter 16](../03-build/16-data-knowledge-semantic-and-context-engineering.md), with [Chapter 15](../03-build/15-agent-architecture.md) beside it.
3. **Evaluation, replay, and comparison.** How you know any of it works: [Chapter 23](../04-prove/23-evaluation-engineering.md) and [Stage 6](../stages/06-evaluate.md).
4. **Environments, compute, and build-versus-buy.** Where the work runs and what you should own: [Chapter 14](../03-build/14-development-environments-sandboxes-and-compute.md).
5. **Feedback, reproduction, review, and merge.** What happens after the first release: [Chapter 32](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md) and [Stage 7](../stages/07-improve.md).
6. **Multi-repository delivery and protocols.** The coordination problems that appear at scale: [Chapter 9](../02-design/09-multi-repository-design.md), then the protocol sections of [Chapter 13](../03-build/13-coding-harnesses-and-agent-protocols.md).
7. **The enterprise and open-source landscape.** What to buy, what to build, and what to keep replaceable: [Chapter 31](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md) and [Chapter 27](../05-operate/27-the-factory-as-a-platform.md).
8. **Prototype and extensible-software patterns.** The adjacent material for what comes next: [Chapter 36](../06-improve/36-where-this-is-going.md) and the prototype-as-specification passage in [Stage 1](../stages/01-builder-intent.md).

If a chapter sends you to the glossary, go; the glossary is where the words are pinned.
