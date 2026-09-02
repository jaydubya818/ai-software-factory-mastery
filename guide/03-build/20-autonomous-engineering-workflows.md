---
title: Autonomous engineering workflows
part: build
chapter: 20
summary: How to admit a repository the factory is allowed to change, define the first workflow (governed issue-to-pull-request delivery) and the eight workflow products that follow it, and give each workflow its own trigger, proof shape, authority, and autonomy.
absorbs: [autonomous-workflows/01-repository-onboarding-and-codebase-intelligence.md, autonomous-workflows/02-autonomous-engineering-workflow-catalog.md, autonomous-workflows/03-change-workflows-features-defects-tests-and-modernization.md, autonomous-workflows/04-operational-workflows-security-incidents-production-and-knowledge.md]
infographics: [repository-onboarding, issue-to-pr-wedge, workflow-catalog]
---

# 20. Autonomous engineering workflows

Everything in Part III so far has been about capability: agents, harnesses, environments, models, loops. This chapter is about the products those capabilities are assembled into. A **workflow** is a governed, repeatable path from a specific trigger to a specific accepted outcome, with its own evidence, its own human decisions, and its own earned autonomy. It is the unit at which a factory is actually operated, measured, and trusted. After reading this chapter you should be able to admit a repository safely, describe the first workflow worth building and why, name the eight workflows that follow, and say what proof each one owes before its output counts.

## The problem

"Autonomous software engineering" is too broad to operate. A dependency upgrade, a production incident, a feature, a test repair, and a documentation change have different inputs, failure costs, evidence, urgency, and rollback. Treating them as one generic issue-to-code loop produces vague metrics and unsafe authority. Coding agents make the implementation steps look alike (inspect files, edit, test, report), but the business workflows around those steps begin from different signals and end with different accepted outcomes. Teams automate the visible coding portion before defining who may select work or what value the workflow must prove.

Underneath that is a quieter problem: an agent can clone a repository and still know nothing it needs to change it safely. It may not know the authoritative build command, code owners, generated files, service dependencies, migration rules, test-data boundaries, deployment path, or which local instructions win when they conflict. Discovery repeated on every run is slow and inconsistent; stale discovery is worse, because it manufactures confidence from facts that no longer match the target commit. Repository knowledge is scattered across source, configuration, documentation, CI, deployment systems, package registries, ownership systems, and human memory. Monorepos contain several products with different rules. Multi-repository systems hide contracts and release order outside any single checkout. Some facts are safe to infer; others require an accountable owner.

And the reason to solve both problems is the one Luke stated in Chapter 18 and Dru Knox of Tessl restates from the other side: the constraint is human attention, and the payoff of a factory is not speed with slop. Every team carries a backlog of fixes, refactors, and explorations it never gets to. With a working factory, the idea of a backlog goes away, and capacity moves to test quality, architecture, and product exploration. That only happens if workflows are legible enough to improve.

## How it works

### The front door: repository onboarding

Onboarding is not administrative setup. It is the first assurance case: evidence that the factory understands enough of the target to grant a particular kind of execution authority. Instead of a permanent "connected" flag, onboarding produces a versioned **Repository Readiness Record** covering eight dimensions.

| Dimension | Required understanding |
| --- | --- |
| Identity and ownership | Canonical repository, default branch, accountable owner, code owners, support contacts |
| Instructions | Governing repository instructions, precedence, exceptions, generated-code rules |
| Architecture | Components, boundaries, entry points, data flows, external services, critical invariants |
| Dependencies | Packages, services, schemas, repositories, runtime and release order |
| Build and test | Toolchains, setup, commands, test topology, fixtures, flaky suites, expected duration |
| Delivery | CI, artifacts, environments, deployment, feature flags, migrations, rollback |
| Security and data | Classification, secrets, network needs, licenses, sensitive paths, threat boundaries |
| Factory fit | Eligible workflows, tools, sandboxes, agents, budgets, verification, approval levels |

Four of those dimensions are produced by named discovery steps. **Instruction resolution** reads every instruction file the repository carries (root and nested `AGENTS.md` or `CLAUDE.md` files, contributor guides, generated-code markers) and resolves them into one declared precedence order, so that when two files disagree the winner is recorded rather than chosen silently at run time. **Architecture mapping** produces the component, boundary, entry-point, and data-flow view, combining human-authored architecture documents with generated maps and surfacing where they conflict. **Build/test topology** discovery establishes which build targets exist, which test suites cover which targets, how long each takes, and which are known to be flaky, so a planner can pick the cheapest sufficient verification. **Codebase indexing** is the pipeline below that turns all of this, plus the source itself, into queryable indexes with commit lineage.

The record separates two kinds of fact. **Authoritative declarations** (owner, data classification, permitted workflows, release authority) require declared sources and an accountable person. **Derived intelligence** (symbols, call graphs, ownership suggestions, test impact, architecture summaries) may be generated, and every derived view records its source commit, method, coverage, confidence, and expiry. The analogy is a building inspection: the surveyor can measure the rooms, but only the registered owner can say who is allowed to knock down a wall.

<!-- infographic: repository-onboarding -->
> **Infographic — Repository onboarding and codebase intelligence.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart LR
    Register["Register repository"] --> Discover["Discover instructions and topology"]
    Discover --> Validate["Owner validates critical facts"]
    Validate --> Index["Build code, dependency, test, and knowledge indexes"]
    Index --> Assess["Readiness and risk assessment"]
    Assess --> Admit["Admit bounded workflow classes"]
    Admit --> Monitor["Detect drift and refresh"]
    Monitor --> Discover
    Assess -->|"missing owner, no repro build, unclassified data"| ReadOnly["Read-only analysis only"]
```

The **codebase intelligence pipeline** builds the indexes an agent needs at planning time: lexical and symbol search, dependency and ownership graphs, build targets, test-to-code mapping, API and schema inventories, historical change hotspots, incidents, architecture decisions, and documentation, all with source and commit lineage preserved. Uncertainty reduces scope rather than blocking everything: missing owners, nonreproducible builds, unknown deployment paths, unclassified data, or absent tests block high-risk autonomous change, while the repository may still be eligible for read-only analysis or documentation proposals. Readiness is granular by workflow and risk class, and it expires. Before each WorkOrder, preflight verifies that the required readiness evidence is still fresh for the affected scope.

There are trade-offs. Deep onboarding costs time and goes stale; incremental discovery tied to changed areas is cheaper but must not skip global controls. Human-authored architecture is more intentional; generated maps are more current; keep both and surface conflicts. Embedding every repository can improve semantic search and create privacy, cost, and freshness problems, so use hybrid retrieval only where evaluations show it improves the target tasks (Chapter 16).

### The first workflow: governed issue-to-pull-request delivery

Do not build the whole factory for every organization first. Choose one painful, repeatable, measurable workflow and prove it. Jay's mission names the wedge: **governed issue-to-pull-request delivery**. In its full form the workflow has thirteen steps; the ten-step version in the mission document is the same path with clarification, post-deployment observation, and closure folded in.

<!-- infographic: issue-to-pr-wedge -->
> **Infographic — The governed issue-to-pull-request wedge.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart TD
    I1["1 Human submits issue"] --> I2["2 Clarify objective and acceptance criteria"]
    I2 --> I3["3 Investigation agent analyzes code and architecture"]
    I3 --> I4["4 Planning agent produces implementation and test plan"]
    I4 --> I5{"5 Human approves plan by risk"}
    I5 --> I6["6 Implementation agent modifies code"]
    I6 --> I7["7 Testing agent creates and runs tests"]
    I7 --> I8["8 Review agent checks quality, security, policy"]
    I8 --> I9["9 Mission Control prepares PR with evidence"]
    I9 --> I10{"10 Human reviews and approves merge"}
    I10 --> I11["11 System validates deployment"]
    I11 --> I12["12 Production telemetry confirms or challenges outcome"]
    I12 --> I13["13 Mission closed; lessons captured"]
    I7 -->|"failures only"| I6
    I8 -->|"findings"| I6
```

Why this wedge works: it is easy to understand and familiar to engineering leaders; close to measurable business value; relevant to every engineering organization and valuable across industries; suitable for progressive autonomy; demonstrable through a real user interface; expandable into testing, incidents, security, and operations; and closely aligned with a quality-engineering background, because the hard part is not generating code but controlling transitions, evidence, and accountability. It matches the daily model the factory is meant to produce: developers spend their time reviewing plans, evaluating decisions, and approving high-value changes while agents perform the implementation and validation.

What not to claim: do not say the system will autonomously build any feature in any repository. Say that you would begin with clearly scoped, lower-risk work in a well-understood repository and expand autonomy only after measuring reliability. That is the sentence of an experienced operator, not an evangelist.

Two practitioners describe what this wedge looks like when it is actually running. Dru Knox's team at Tessl set two ground rules for themselves: no more human-written code and no more interactive coding-agent sessions. Every piece of work starts as an issue in the tracker, is picked up by a headless agent in a sandbox, and comes back as a pull request that engineers review with comments. It sounds extreme and turns out to be how many teams already worked: ask the agent, switch tabs, come back, review. What changes is legibility. The issue holds the initial prompt, the pull request holds all feedback, and both live in durable places open tools can read, which is the groundwork every later improvement loop depends on. Their first orchestrator ran under one engineer's personal GitHub credentials, which briefly made her the top contributor in the company; the lesson is that identity, webhooks, comment reactions, long-running execution beyond what CI runners tolerate, and token renewal are problems every team hits in the same order. They also outlawed local configuration: everything an agent needs is checked into the repository, so one person's improvement improves the factory for everyone.

IndyDevDan's "super simple software factory" shows the same wedge from inside the code. An **AI developer workflow** is a script with named phases (request, plan, commit plan, build, test, fix, review, revise, document, commit docs), each either an agent call or deterministic code, with the two clearly delineated. Every agent has its "core four" (context, model, prompt, tools) in a configuration file. Every phase ends with a deterministic gate that validates typed JSON output before the next phase begins; the plan is handed to the builder as an envelope with a note for the next agent. Tests run in code, and only failures go back to the agent. The design principles are observable (every phase, prompt, tool call, and cost is visible in a swim-lane view), customizable (any model, harness, or tool in any seat), and reusable (installed into a new repository as a skill with a cookbook). His summary is worth carrying into every workflow in this chapter: agents propose, code disposes; and the test of a workflow is the thousandth run, not the first.

### What to build first, and what to leave alone

The wedge tells you which workflow to prove. It does not tell you how much factory that proof needs, and the temptation is to build all of it. Resist that. Pick a few high-value workflows with design partners who will use them, and build only the architecture that one end-to-end path requires. That minimum is still substantial, because each piece exists to stop a specific way the path would otherwise be untrustworthy.

| Build first | What it is for |
|---|---|
| Builder intent and a versioned Plan | So the system solves the stated problem, and a human approved the approach |
| A versioned agent definition | So "the agent" is a contract that can be changed, evaluated, and rolled back |
| A harness with an execution loop | So the model reasons inside bounded, recoverable execution |
| Governed tool access | So intelligence does not become authority the moment a tool is attached |
| Basic context management | So each step gets what it needs and nothing it should not see |
| An evaluation baseline | So "better" means something before anything is changed |
| Traceability and observability | So a failure can be explained by lineage instead of memory |
| A safe path into existing CI/CD | So the output lands in the delivery system the organization already trusts |

Build those, and build them behind the seams that will matter later even if their first implementation is thin: identity, interfaces, policy, evidence, evaluation, versioning. A thin identity layer that every call passes through can be deepened; a missing one has to be retrofitted into every call.

> *Build for the next proof point without painting yourself into the next architecture.*

What not to build first is just as specific: sophisticated autonomous learning, highly dynamic multi-agent swarms, ML-based model routing, a large universal memory layer, hundreds of generic skills, and elaborate agent organizational structures. Every one of those is a hypothesis about what the factory will need, and none of them can be designed well until production evidence says which parts of the simple version broke. Adaptive routing before evaluation data amplifies noise; a universal memory layer before a promotion policy is a stale-context generator; a skills library before the workflows that would use it is inventory.

> *Don't generalize before you've earned the abstraction.*

```mermaid
flowchart LR
    Intent["Builder intent + Plan"] --> Def["Versioned agent definition"]
    Def --> Harness["Harness + execution loop"]
    Harness --> Tools["Governed tool access"]
    Harness --> Ctx["Basic context management"]
    Harness --> CI["Existing CI/CD"]
    Eval["Evaluation baseline"] -.-> Harness
    Obs["Traceability + observability"] -.-> Harness
    CI --> Proof["One complete workflow"]
    Proof -->|"real weaknesses found"| Next["Next proof point"]
    Seams["Seams protected: identity, interfaces, policy, evidence, evaluation, versioning"] -.- Harness
```

The output of this phase is one workflow that runs end to end and shows you where it is weak. That is more valuable than breadth, because a weakness in a complete path is a fact about the architecture, while a demo that stops at the pull request is a fact about the demo.

> *One complete workflow exposing real weaknesses beats ten disconnected demos.*

### The workflow catalog

Once the wedge is reliable, expand in order. The catalog turns "use agents for engineering" into a portfolio of explicit, governable **workflow products**, each of which declares:

- trigger and authoritative intake source;
- problem owner and intended outcome;
- supported repository and risk classes;
- planning, execution, and verification recipe;
- agents, skills, tools, environment, and budgets;
- human decisions and escalation;
- evidence, release, observation, and rollback requirements;
- success, failure, cost, attention, and trust measures; and
- current maturity and eligible autonomy.

<!-- infographic: workflow-catalog -->
> **Infographic — The eight initial workflows.** *(Jay's graphic goes here.)* Until then, the diagram below carries the same concept.

```mermaid
flowchart LR
    W0["Governed issue-to-PR wedge"] --> W1["1 Feature delivery"]
    W1 --> W2["2 Defect remediation"]
    W2 --> W3["3 Test generation and maintenance"]
    W3 --> W4["4 Dependency and security remediation"]
    W4 --> W5["5 Incident triage and RCA"]
    W5 --> W6["6 Production validation"]
    W6 --> W7["7 Technical-debt reduction"]
    W7 --> W8["8 Documentation and knowledge maintenance"]
    W6 -.->|"failed validation"| W2
    W5 -.->|"root cause"| W2
    W8 -.->|"verified guidance"| W0
```

| Workflow | Trigger | Path | Accepted outcome |
| --- | --- | --- | --- |
| 1. Feature delivery | Approved product intent | Issue → plan → implementation → tests → PR → deployment evidence | Customer behavior delivered and verified |
| 2. Defect remediation | Reproduced defect | Bug → reproduction → root cause → fix → regression test → PR | Root cause corrected with regression proof |
| 3. Test generation and maintenance | Coverage or change signal | Code change → impact analysis → missing tests → generated tests → validation | Useful, stable tests protecting specified behavior |
| 4. Dependency and security remediation | Vulnerability or lifecycle signal | Vulnerability → risk assessment → upgrade → compatibility tests → PR | Risk reduced without compatibility regression |
| 5. Incident triage and root-cause analysis | Operational alert | Alert → evidence collection → severity → hypotheses → root cause → recommendation → postmortem | Containment, evidence-backed cause, corrective plan |
| 6. Production validation | Deployment event | Deployment → telemetry analysis → synthetic validation → anomaly detection → rollback or escalation | Technical and intended outcomes confirmed or rolled back |
| 7. Technical-debt reduction | Maintainability signal | Code-health signal → prioritization → refactoring plan → change → validation | Measurable risk or cost reduced without behavior loss |
| 8. Documentation and knowledge maintenance | System or policy change | System change → documentation impact → updates → verification → publication | Correct, discoverable, verified guidance published |

Two rules govern the portfolio. First, **work selection is an authority decision**. An autonomous backlog selector may rank eligible work by value, urgency, risk, dependencies, readiness, capacity, and confidence. It may not invent product priority, widen scope, or consume unowned work. Work-in-progress limits and small batches keep recovery cheap and outcomes attributable, and automated intake needs admission, deduplication, ownership, priority policy, and capacity budgets before it may select anything, or it will flood the system with low-value work. Second, **autonomy is earned per workflow**. A repository may qualify Level 3 autonomy for test maintenance while production migrations stay at Level 1. Metrics and incidents attach to the exact workflow, risk class, environment, and capability graph. The unit of autonomy is not the agent or the repository; it is a defined workflow on a bounded scope under measurable conditions.

A broad generic workflow reduces configuration and hides important differences. Many narrow workflows improve control and cost maintenance. Start with a small catalog whose entries share common runtime contracts but keep distinct acceptance and risk policy.

### Change workflows and their proof shapes

Code changes look alike in a pull request while supporting different claims, and a single generic acceptance template lets activity substitute for proof. Repository tooling centers on diffs and checks, not causal claims; agents produce plausible edits and tests that agree with their own implementation; existing suites may be flaky or insensitive; modernization expands across boundaries faster than evidence follows. So each change workflow carries its own **proof shape**.

**Feature delivery** begins from an approved outcome, explicit non-goals, behavioral assertions, rollout, and a customer measure. Verification covers requirements coverage, regression, security, operability, and production outcome.

**Defect remediation** begins with a reproducible failure or an explicit statement that reproduction is unavailable. Preserve the failing fixture, identify the root cause, introduce a regression test that fails before the fix, implement the smallest sufficient change, and verify adjacent behavior. A disappearing symptom without causal evidence is not a root-cause fix. Requiring reproduction can delay urgent containment, so separate containment from permanent repair and preserve the unresolved cause.

**Test generation and maintenance** begins from risk, change impact, missing behavior coverage, or a broken test. Evaluate assertion quality, fault sensitivity, determinism, isolation, duration, and maintenance cost. Mutation testing or deliberate fault injection shows whether a test detects the failure it claims to guard; it is powerful and expensive, so target critical logic. Tests require fault sensitivity, not line count.

**Technical-debt reduction** begins with a measured constraint: change amplification, defect concentration, dependency risk, build duration, cognitive load, or unsupported technology. Preserve behavioral invariants and compare the named measure before and after. "Cleaner code" alone is not an accepted outcome.

**Dependency remediation** binds vulnerability, lifecycle, or compatibility evidence to the exact dependency graph. Verify transitive changes, licenses, build artifacts, runtime behavior, rollback, and known breaking changes.

**Modernization and migration** inventory consumers, schemas, data, compatibility windows, dual-read or dual-write behavior, backfill, verification, cutover, and rollback. Irreversible steps require human risk acceptance and restore evidence. Full dual-running improves confidence and increases operational complexity.

Across all of them, keep implementation and verification independent. For material changes, validators use requirements, fault models, static analysis, integration environments, or tests not authored solely by the implementer. The objective is to reduce correlated error, not to require a different model for every check. Specialization belongs in explicit contracts and verification, not in opaque agent personalities; that is what makes one runtime useful for many claims without pretending the claims are identical.

### Operational workflows

Operational work arrives with incomplete information and time pressure. An alert may be noise, a vulnerability may be unreachable, a deployment may be technically healthy but wrong for customers, and documentation may contradict the system. These workflows cross production, security, source, deployment, support, analytics, and human communication systems, and they need different authorities for observation, containment, repair, disclosure, rollback, and acceptance. The governing rule is to separate observation, diagnosis, containment, and correction, because premature action can destroy forensic evidence, widen impact, or publish confident misinformation.

**Security remediation** validates affected versions, reachability, exploitability, asset criticality, and available fixes. Containment, upgrade, compensating control, exception, and disclosure have separate owners. Verification covers compatibility, residual exposure, provenance, and production confirmation.

**Incident triage and root-cause analysis** preserves a timeline and evidence before any mutation. Agents may correlate telemetry, changes, dependencies, and known failures; they must label observations, hypotheses, confidence, and missing data. Containment authority is narrow and reversible. Root cause requires evidence connecting conditions to failure, not the most plausible narrative. Fast automated containment reduces impact and worsens a wrong diagnosis, so preauthorize only reversible, bounded actions with explicit stop conditions. Operational autonomy is valuable when it shortens time to reliable understanding, not merely time to action; a fast, unsupported causal story is a new incident risk.

**Production validation**, also called **post-deployment verification**, binds a deployment to expected technical and customer outcomes. It checks health, errors, latency, security, synthetic behavior, feature exposure, and product measures across a defined observation window. Failed validation chooses rollback, containment, corrective work, or human risk acceptance.

The **documentation maintenance workflow** (row 8 of the catalog, **documentation and knowledge maintenance**) begins from a system, policy, interface, or workflow change. Impact analysis identifies affected guidance. Verification checks commands, links, schemas, examples, ownership, discoverability, and alignment to released behavior. Publication remains a governed external effect. Verification can be partly automated; semantic correctness still needs an accountable owner.

Every operational workflow preserves an **operational evidence bundle**: signal source, timestamps, affected scope, identities, hypotheses, actions, approvals, artifacts, telemetry queries, changes, communication, outcome, and unresolved questions, with sensitive evidence under retention and access policy. Rich retention improves forensics and raises privacy and storage obligations. And every operational workflow produces learning without automatic mutation: post-incident and production signals may propose tests, alerts, skills, tools, context, runbooks, policies, or architecture changes, but each proposal enters the governed improvement path and never silently edits active factory behavior.

### Where the workflows converge: the three loops

Dru Knox's inner, outer, and meta loops (Chapter 18) are the frame that ties the catalog together. The inner loop is what the agent runs while working on a change: the fast checks, skills, and test suite that make it land correctly more often, which raises **autonomy**, how little a human has to correct. The outer loop runs at the pull-request boundary: agent QA that exercises the product, deeper review, mutation testing, and **verifiers**, which are small, fast, cheap model-powered lint rules that check one invariant each ("every front-end component has an accessibility attribute," "every log call uses the internal logger") across a glob of files, and which now succeed nearly every time because the question is so narrow. The outer loop raises **automation**, how much can be accepted without a human reading every line. The meta loop watches both and codifies every correction so that a mistake is made once. Progress toward a factory is visible in three numbers: manual takeovers falling, human pull-request comments falling, and pull requests initiated without human input rising, all while quality is held constant and then pushed up. The adoption pattern is the same everywhere: bottlenecks move outward. First the agent cannot put up a good PR; then the PR is fine but nobody trusts it without review; then the question becomes how large a task can run to completion, which only a meta loop answers. Do not attempt this as one monolithic lift. Find a workflow everyone can agree on, put a box around it, automate it, and add the next.

### What CI/CD did for delivery, the factory does for agentic engineering

There is a precedent for all of this, and it is the one every engineering leader already lived through. Developers have always built and tested on their own machines, and they still do. As organizations grew, the build, test, artifact, and deploy steps moved into shared infrastructure, and the payoff was not only speed. It was that one improvement to the pipeline (a faster test runner, a new security scan, a better rollback) benefited every team at once. The individual practice became shared engineering infrastructure.

Agentic engineering is following the same path. Interactive coding agents stay on the developer's machine, the way local builds did. But the repeatable, delegable work, the kind that starts as an issue and should end as a verified change, benefits from a common factory that manages workflow, models, skills, evaluation, security, and telemetry for everyone. A **software factory** is to agentic development what a CI/CD system is to build and delivery: the shared infrastructure that makes it repeatable, measurable, and scalable, in that order, because each property enables the next.

```mermaid
flowchart LR
    Rep["Repeatable: same workflow, same contracts, every run"] --> Meas["Measurable: outcomes, cost, rework, trust per workflow"]
    Meas --> Imp["Improvable: one fix to the pipeline, every team benefits"]
    Imp -->|"promoted change"| Rep
    CP["Control plane manages the work"] --- Rep
    W["Workers execute the work"] --- Rep
```

Repeatability is what makes measurement possible: you cannot compare run 400 to run 40 unless they went through the same path. Measurement is what makes improvement real rather than anecdotal. And improvement in shared infrastructure compounds: fix the verifier once and every workflow inherits it. The division of labor is the same one CI systems settled on years ago. *The control plane manages the work. Workers execute the work.* Neither should hold the other's state.

> *Do for agentic engineering what CI/CD did for build and delivery: turn individual practices into shared engineering infrastructure. Improve once, benefit everyone.*

## How to build it

1. **Onboard the repository.** Run a read-only discovery workflow that produces an explainable readiness packet across the eight dimensions. Owners approve material facts and choose eligible workflow classes. Record source commit, method, coverage, confidence, and expiry on every derived index. Wire drift detection so later commits trigger targeted refresh, and make preflight check readiness freshness for the affected scope before each WorkOrder.
2. **Build the wedge end to end before anything else.** Intake, clarification, investigation, planning, human plan approval, execution, automated validation, review, evidence-bearing pull request, human merge, deployment validation, production confirmation, closure. Make the whole path legible: issue, prompt, plan, attempts, findings, evidence, decisions, and cost in durable records that tools can read.
3. **Write the workflow's manifest** using the nine catalog fields. State its eligible autonomy level, and the promotion evidence that would raise it.
4. **Make coordination code.** Phases with deterministic gates; typed, validated handoff envelopes; tests run by code with only failures returned to the agent; the same runtime restartable by run identifier.
5. **Govern work selection.** Admission, deduplication, ownership, priority policy, capacity budgets, and WIP limits before any automatic selection is switched on.
6. **Add workflows in the mission's order**, each with its own proof shape, human gates, evidence, observation window, rollback, and metrics: feature delivery, defect remediation, test generation and maintenance, dependency and security remediation, incident triage and RCA, production validation, technical-debt reduction, documentation and knowledge maintenance.
7. **Keep verification independent** for material changes: validators use requirements, fault models, static analysis, integration environments, or tests not authored solely by the implementer.
8. **Give operational workflows a typed intake** that correlates signals to exact releases and Factory Versions, creates bounded investigation work, and shows timeline, blast radius, hypotheses, confidence, evidence, recommended actions, and authority on the review surface.
9. **Instrument the catalog.** Per workflow: owner, eligible scope, volume, service level, cost, attention demand, acceptance rate, change failure, maturity, and recent trust events. Canary and roll back new workflow versions like any other production change.
10. **Close the meta loop.** Every human correction, review comment, failed check, and escaped defect becomes a case for an evaluated change to a skill, instruction, verifier, or test, promoted through governance (Chapter 33).

## Failure modes

| Failure | How you notice | What to do |
| --- | --- | --- |
| Registration mistaken for readiness | Agent acts on a repository with no owner, classification, or reproducible build | Readiness record with expiry; uncertainty narrows authority to read-only |
| Stale discovery | Plan cites facts from an old commit | Derived views carry source commit and expiry; preflight checks freshness |
| Conflicting instructions | Two instruction files disagree; agent picks one silently | Declared precedence and exceptions in the readiness record |
| Generic acceptance template | Defect "fixed" with no failing-then-passing test; refactor "done" with no measure | Per-workflow proof shape enforced by the quality contract |
| Symptom suppression | Symptom disappears; no causal evidence | Reproduction and root cause required; unresolved cause preserved when containment must come first |
| Self-confirming tests | Tests written after the implementation agree with it | Fault sensitivity via mutation or injection; validation contract written before code |
| Scope creep in modernization | Change expands across boundaries faster than evidence | Inventory, compatibility windows, human risk acceptance for irreversible steps |
| Unsupported causal story in an incident | Fast, confident narrative; hypotheses unlabeled | Observation/hypothesis/confidence labels; evidence connecting conditions to failure |
| Premature containment | Automated action destroys forensics or widens impact | Only reversible, bounded, preauthorized actions with stop conditions |
| Healthy-but-wrong deployment | Health checks green; customer outcome absent | Production validation binds deployment to intended outcomes over an observation window |
| Confident misinformation published | Docs updated from the plan, not the released behavior | Verify commands, links, schemas, examples against release; accountable owner |
| Selector invents priority | Autonomous backlog consumes unowned or widened work | Selection authority limited to ranking eligible, owned work; WIP limits |
| Intake flood | Automated triggers create low-value work faster than capacity | Admission, dedup, ownership, priority policy, capacity budgets |
| Autonomy declared for the repository | Migration runs at the autonomy level earned by test maintenance | Autonomy attached to exact workflow, risk class, environment, capability graph |
| Illegible workflow | Corrections live in chat logs and local configs | Issue and PR as the ledger; no local configuration; everything in the repository |
| Learning by mutation | Postmortem edits factory behavior directly | Proposals enter the governed improvement path only |
| Building everything first | Months in, no workflow runs end to end; ten demos, no production evidence | Build the eight-item minimum behind protected seams; prove one complete path |
| Generalizing before the abstraction is earned | Swarms, learned routing, universal memory, or hundreds of skills built on no production data | Treat them as hypotheses; build each only when a proven workflow shows the need |
| Parallel delivery universe | Generated changes bypass the organization's SCM, CI, and deployment systems | Route every change through the existing supply chain; make it agent-aware rather than replacing it |

## In Mission Control

At study commit [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6), Mission Control deeply specifies the governed issue-to-pull-request path and provides the domain, orchestration, evidence, release, feedback, and learning primitives the other workflows reuse: Missions and versioned Plans, the WorkOrder → Task → Attempt hierarchy, independent validation with evidence, GitHub App publication, human WorkOrder acceptance, and separate release, deployment, and production-evidence records. The golden path has been exercised as a partial run with control-plane evidence, and the maturity map records that the current proof is stronger before merge than after production-outcome validation.

Repository registration, configuration, workspace manifests, multi-repository coordination, environments, preflight, policy, and context packages exist and establish real authority boundaries. What the studied evidence does not show: a complete repository onboarding pipeline with a readiness record, owner attestation, codebase-indexing lifecycle, drift detection, or workflow-specific admission based on discovered capabilities; published contracts, labs, maturity evidence, and operating metrics for the eight workflow classes; accepted runs for the change workflows other than the feature path, or complete deployment and outcome closure for that path; or complete incident, security, production-validation, or knowledge-maintenance workflows with accepted evidence and recovery drills. The golden path is the first workflow product, not proof of the portfolio, and the operational claims remain architectural until those paths are exercised.

## Retain this

- A workflow is the unit at which a factory is operated, measured, and trusted: a specific trigger to a specific accepted outcome with its own evidence, human decisions, and earned autonomy.
- Registration is not readiness. Onboarding produces an expiring readiness record; derived indexes carry commit, method, confidence, and expiry; uncertainty narrows authority rather than blocking analysis.
- The first workflow is governed issue-to-pull-request delivery, because it is understandable, measurable, universal, demonstrable, expandable, and suited to progressive autonomy. Do not claim it builds any feature in any repository.
- Expand in order: feature delivery, defect remediation, test generation and maintenance, dependency and security remediation, incident triage and RCA, production validation, technical-debt reduction, documentation and knowledge maintenance.
- Each workflow has a proof shape. Reproduction precedes repair; tests need fault sensitivity, not line count; refactors need a named measure; migrations need invariants and restore evidence.
- Operational workflows separate observation, diagnosis, containment, and correction. Hypotheses are not findings; contain before optimizing; learn without mutating.
- Work selection is an authority decision; autonomy is earned per workflow, not per agent or repository.
- Agents propose, code disposes. Make every touchpoint legible, outlaw local configuration, and judge the workflow by the thousandth run.
- Build first: intent and Plan, a versioned agent definition, harness and loop, governed tools, basic context, an evaluation baseline, traceability, and a safe path into existing CI/CD, behind protected seams. Do not build swarms, learned routing, universal memory, or hundreds of skills until production evidence asks for them. Build for the next proof point without painting yourself into the next architecture.
- One complete workflow exposing real weaknesses beats ten disconnected demos.
- The factory is to agentic engineering what CI/CD is to delivery: repeatability enables measurement, measurement enables improvement, and an improvement to shared infrastructure benefits everyone. The control plane manages the work; workers execute it.

## Go deeper

- [5. Authoritative records](../02-design/05-authoritative-records.md) for the Mission, Plan, WorkOrder, Task, and Attempt records the wedge runs on; [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md) for clarification and acceptance criteria.
- [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md) and [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md) for the autonomy levels workflows earn.
- [9. Multi-repository design](../02-design/09-multi-repository-design.md) for onboarding when one product spans several repositories.
- [16. Data, knowledge, semantic, and context engineering](./16-data-knowledge-semantic-and-context-engineering.md) for codebase indexes and hybrid retrieval.
- [18. Agent and loop engineering](./18-agent-and-loop-engineering.md) for the loops inside each workflow.
- [22. Testing strategy for agentic change](../04-prove/22-testing-strategy-for-agentic-change.md) and [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md) for proof shapes as enforceable contracts.
- [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md) for production validation; [29. Resilience, incidents, and the control tower](../05-operate/29-resilience-incidents-and-the-control-tower.md) for the incident framework.
- [32. Production feedback, automated review, and the agentic merge queue](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md) and [33. Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md) for the meta loop.
- Labs: [Governed issue to validated pull request](../appendix/labs/01-governed-issue-to-validated-pull-request.md); [Repository onboarding and readiness](../appendix/labs/04-repository-onboarding-and-readiness-lab.md); [Incident remediation and postmortem](../appendix/labs/07-incident-remediation-and-postmortem-lab.md); [Progressive delivery and rollback](../appendix/labs/06-progressive-delivery-and-rollback-lab.md).
- Appendix: [Mission Control capability, workflow, and admission map](../appendix/mission-control/03-capability-workflow-and-admission-map.md) and [implementation maturity and evidence map](../appendix/mission-control/01-implementation-maturity-and-evidence-map.md), assessed at `d902fae`; [Glossary](../appendix/glossary.md).
- Sources: Jay West, "AI Software Factory Mission" (the wedge, the eight workflows, the lifecycle), the AI Software Factory study guide, chapter 9 (the thirteen-step version and "what not to claim"), and the factory architecture notes (what to build first, what not to build first, the CI/CD analogy); Dru Knox (Tessl), AI Engineer SF conversation and talk on getting to a software factory, harness engineering, and why the backlog disappears; IndyDevDan, "Software factories give leverage on your prompt" (AI developer workflows, agents propose and code disposes).
- Primary references: Backstage Software Catalog; Development Containers specification; DORA capability catalog and user-centric focus; NIST Cybersecurity Framework (all accessed 2026-08-30).
