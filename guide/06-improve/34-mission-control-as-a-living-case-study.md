---
title: Mission Control as a living case study
part: improve
chapter: 34
summary: What Mission Control is, how a Mission moves through it, what the retained evidence proves at the pinned commits, why its architecture was decided the way it was, and where its honest limits sit today.
absorbs: [09-mission-control-case-studies/01-implementation-maturity-and-evidence-map.md, 09-mission-control-case-studies/02-verification-first-software-factory.md, 09-mission-control-case-studies/03-capability-workflow-and-admission-map.md]
infographics: [mission-control-architecture, mission-flow]
---

# 34. Mission Control as a living case study

The previous thirty-three chapters describe an AI Software Factory in the
abstract, with Mission Control appearing at the end of each as a short honesty
check. This chapter turns that around. It tells the story of one real control
plane: what it is made of, how a Mission travels through it, what its retained
evidence proves and refuses to prove, and why each of its architectural
decisions was made. After reading it you should be able to explain Mission
Control to a skeptical engineer in ten minutes, name the exact commit behind
every claim you make, and say without embarrassment which parts are proven,
which are partial, and which are still design.

The three appendix case studies remain the full reference: the
[implementation maturity and evidence map](../appendix/mission-control/01-implementation-maturity-and-evidence-map.md)
(assessed 2026-08-11 at `b31e275`), the
[verification-first case study](../appendix/mission-control/02-verification-first-software-factory.md)
(at `ff0524e`), and the
[capability, workflow, and admission map](../appendix/mission-control/03-capability-workflow-and-admission-map.md)
(at `d902fae`). This chapter condenses them into one narrative and adds the
Production Factory Pilot V3 evidence published at `b3dfcee`.

## The problem

Mission Control exists because an agent can generate code, run a test, and
confidently report success while still misunderstanding the request,
exceeding its authority, weakening the test system, or validating a different
artifact from the one it placed in a pull request. The problem is not only
model accuracy. Ordinary agentic coding collapses specification, execution,
verification, and acceptance into one actor and one conversation, and that
collapse makes four questions hard to answer from anything but the agent's own
narrative:

1. What exact outcome and constraints were authorized before implementation?
2. What exact source artifact was evaluated?
3. Which independent observations support each acceptance claim?
4. Which policy and which accountable human allowed the next material action?

The [North Star](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/product/mission-control-north-star.md)
states the intended answer as an operating model. Mission Control is to be the
operating system for **human-directed, agent-executed software development**:
during business hours developers define problems, outcomes, and acceptance
criteria, review and refine plans, weigh tradeoffs, review changes and test
results, approve merges, resolve ambiguity and escalations, and improve the
tools and guardrails; agents research the codebase, produce plans, write and
modify code and tests, run builds and scans, investigate failures, prepare
pull requests with evidence, respond to review, and keep working through the
day and overnight. A developer approves a plan before leaving; the next morning
there is a concise, evidence-based review package rather than a pile of logs.
The North Star's core principle is the sentence the whole product is built to
enforce: humans own intent, judgment, governance, and approval; agents own
execution, iteration, validation, and evidence collection. Mission Control must
never be a task launcher or a chat interface.

Everything below is the attempt to make that sentence true in code, and the
evidence of how far the attempt has gotten.

## How it works

### What Mission Control is made of

At the studied commits Mission Control is a TypeScript and pnpm monorepo with
three runtime pieces and two external boundaries. A **React** operator
application (Vite, Tailwind, shadcn/ui) provides the surfaces a human uses.
**Convex** owns authoritative durable state and every server-side transition;
there is no separate REST backend, and product data moves only through Convex
queries, mutations, actions, internal functions, and HTTP actions. A **Hono**
orchestration service hosts the execution side: the canonical worker runtime,
harness adapters, the sandbox runtime, the independent verifier, and the
GitHub App publisher. Below Hono sit the **executors** (the production-admitted
`codex/v1` adapter, an experimental DeepSeek harness, and a future Loom
admission), each running in an Attempt-scoped git **worktree** or a remote
sandbox. **GitHub** is the V1 git provider, reached only through a
least-privilege GitHub App with signed, deduplicated webhooks.

<!-- infographic: mission-control-architecture -->
> **Infographic — Mission Control architecture.** *(Jay's graphic goes here.)* Until then, the diagram below
> carries the same concept.

```mermaid
flowchart TB
    UI["React operator UI"] -->|typed queries and mutations| CX["Convex control plane"]
    CLI["mc CLI"] --> CX
    GH["GitHub App + webhooks"] -->|signed ingress| HTTP["Convex HTTP actions"]
    HTTP --> CX
    ORCH["Hono orchestration service"] -->|signed service commands| SC["Service-command boundary"]
    SC --> CX
    ORCH --> WORKER["Canonical worker runtime"]
    WORKER --> REG["Generic Harness registry"]
    REG --> CODEX["codex/v1"]
    REG --> DEEP["DeepSeek (experimental)"]
    WORKER --> SBX["Worktree or Remote Sandbox"]
    WORKER --> VER["Independent verifier Attempt"]
    WORKER --> PUB["Permit-gated GitHub publisher"]
    PUB --> GH
    CX --> DB[("Convex durable state")]
    DB --> UI
    subgraph "Authoritative records"
      M["Constitutions, Specs, Missions, Plans"]
      Q["Quality Contracts, WorkOrders, Tasks"]
      R["Attempts, leases, candidates"]
      V["Verification, evidence, Quality Gates"]
      F["Factory Versions, readiness, permits"]
    end
    CX --- M
    CX --- Q
    CX --- R
    CX --- V
    CX --- F
    subgraph "Advisory projections"
      MEM["Factory Memory"]
      OBS["Observability / Evals"]
      LEARN["Factory Learning"]
    end
    CX -.-> MEM
    CX -.-> OBS
    CX -.-> LEARN
```

The picture has a shape worth memorizing. Convex is the courthouse: the only
place a record becomes true. Hono is the workshop next door, where tools run
and things get built, but which cannot file a judgment. The three advisory
projections (memory, observability, learning) are the library: consulted
constantly, never allowed to sign anything. Everything that reaches the
courthouse from outside — a browser, a CLI, a webhook, the workshop — arrives
through a door that checks identity.

The repository's own documentation carries an explicit authority order:
product doctrine, then accepted decisions, then normative contracts, then
current implementation guides, then plans, then validation evidence, then
historical material. This chapter follows that order and uses code and
retained evidence to bound every present-tense claim.

### Five planes and a contract spine

Mission Control's documentation describes the factory as five cooperating
planes, each owning something and each forbidden from claiming something:

| Plane | Owns | Must not claim |
| --- | --- | --- |
| Builder experience | Intent capture, plan review, exception triage, evidence review, consequential decisions | Runtime or policy authority hidden in a client |
| Control plane | Identity, versions, policy, admission, lifecycle state, approvals, audit | That execution succeeded merely because it was dispatched |
| Execution plane | Harness, model calls, tools, sandbox, repository mutation, checkpoints, completion reports | Verification, publication, acceptance, or merge authority |
| Assurance and delivery | Independent evaluation, currentness, evidence, gates, publication, release, production verification | That telemetry or a worker assertion is proof |
| Learning plane | Outcome signals, failure clusters, datasets, experiments, improvement proposals | Silent mutation or promotion of active configuration |

Beneath the planes runs one **contract spine**, the chain of records that
makes intent, authority, execution, evidence, decision, delivery, outcome, and
learning independently attributable:

```text
Builder intent
  → Mission Spec revision
  → approved Plan version + Quality Contract projection
  → WorkOrder revision → Task
  → Factory Version + agent and skill bindings
  → frozen Execution Manifest
  → Attempt + Completion Report
  → immutable Candidate
  → independent Verification Run + Evidence
  → Quality Gate Decision
  → Publication Permit + Pull Request
  → Human acceptance
  → Release + Production Outcome
  → Learning Signal + governed Improvement Candidate
```

Names vary between products. The principle does not: no link in that chain is
allowed to write the next link's conclusion.

### How a Mission flows through it

<!-- infographic: mission-flow -->
> **Infographic — How a Mission flows through Mission Control.** *(Jay's graphic goes here.)* Until then, the diagram below
> carries the same concept.

```mermaid
flowchart LR
    I["Mission + Spec revision"] --> P["Versioned Plan"]
    P --> HA{"Human plan approval"}
    HA --> W["WorkOrder + Quality Contract"]
    W --> T["Task"]
    T --> M["Frozen Execution Manifest"]
    M --> A["Leased Attempt in worktree"]
    A --> C["Immutable Candidate"]
    C --> V["Independent verifier Attempt"]
    V --> E["Evidence + receipt"]
    E --> G{"Quality Gate Decision"}
    G --> PP["Publication Permit"]
    PP --> PR["GitHub App pull request"]
    PR --> AC{"Human WorkOrder acceptance"}
    AC --> R["Merge, release, production: separate states"]
```

A **Mission** captures the desired outcome and governed scope inside a
Project Constitution (immutable planning principles). With the default-off
spec intake flag enabled, an immutable **Mission Spec** revision adds stable
requirement identities, measurable outcomes, structured clarifications, and
non-goals, checked by a deterministic quality evaluator; `FINALIZED` means
planning-ready, nothing more. Agents or people then propose a versioned
**Plan** that binds exact Spec and Constitution digests and maps requirements
to assertions and WorkOrder blueprints. A separate human decision approves one
exact Plan revision and releases **WorkOrders**. It does not dispatch anything.

The **Quality Contract** is the machine-readable projection of that approved
Plan: requirements, negative constraints, a three-boundary Change Budget
(files, change size, protected paths and permitted change types), and a
verification contract. Each WorkOrder decomposes into **Tasks**. Before a
Task runs, the control plane freezes an **Execution Manifest** binding the
active Factory Version and its digest, repository, code scopes, host, harness
manifest, executor, governance policy, environment and backend, branch,
allowed tools, WorkOrder revision, Quality Contract, optional Context Package,
model route, and base SHA.

Server-authoritative worker admission then checks identity, session,
generation, capabilities, capacity, Factory Version, and backend before
issuing a fenced lease. The **Attempt** is one immutable execution try against
that exact tuple; the harness runs in an Attempt-owned worktree or a remote
sandbox and returns a **candidate** plus a normalized, untrusted result.
Harness completion is not verification. Mission Control binds the candidate
into a Verification Subject, freezes a Verification Plan, and runs a
logically **independent verifier Attempt**, which records typed evidence
envelopes and criterion receipts against that exact SHA. A **Quality Gate
Decision** applies the versioned policy to the whole evidence set. A
candidate-bound, expiring **Publication Permit** then gates the GitHub App
push and pull request. The PR head, checks, candidate, subject, and evidence
must remain **exact-current**; a moved head preserves the old evidence as
history and blocks progress until a new lineage passes. Finally
`workOrders.accept`, the single canonical acceptance mutation, is executed by
an authorized human. Merge, deployment, activation, and production
verification are separate states that follow and none of them is implied by
the one before.

The property that matters is **negative authority**: Plan approval does not
dispatch; the harness does not verify; verification does not publish;
publication does not merge; merge does not prove the production outcome. The
North Star states the same ladder as work attempted, completed, validated,
approved, merged, deployed, and verified in production — different states,
never interchangeable.

### The assurance records and what each does not prove

The verification-first design adds assurance records without replacing the
delivery hierarchy. The discipline is to know, for each record, what it does
not prove.

| Record | Responsibility | What it does not prove |
| --- | --- | --- |
| Quality Contract | Requirements, constraints, verification methods, gates, approvals, fixed before execution | That implementation succeeded |
| Change Budget | Bounds on files, change size, protected paths, permitted change types | That an in-budget change is correct |
| Attempt | One immutable execution try and its authority | That the result is acceptable |
| Candidate | The exact committed source subject | That checks passed |
| Verification Run | Execution of defined checks against an exact subject | That the WorkOrder may advance |
| Evidence Envelope | A typed claim bound to producer, method, time, artifact, and subject | That the claim is sufficient or authoritative |
| Quality Gate Decision | Versioned policy applied to contract plus evidence set | Permission for any future side effect |
| Publication Permit | One scoped, expiring external action | Merge, deployment, or Mission acceptance |
| Proof Package | Projection of the trace for human review and audit | A second source of truth |

The durable insight is the separation of observation from decision. A test
result, scan, or reviewer finding is evidence. Policy evaluates the complete
evidence set against the active contract. Approval accepts a specific risk or
grants a specific action. None substitutes for the others, and missing
evidence is an explicit negative state rather than an empty field that reads
as success.

### Production execution admission

A second workflow, less visible than the Mission flow but just as important,
decides whether execution is allowed at all. **Admission is a chain, not a
boolean.** The operator sequence recorded in the production admission packet
runs: canonical GitHub App installation → current structured workflow
registration → exact model-route registration → human, evidence-based route
promotion → immutable hardened Sandbox Profile creation → human profile
promotion → code scopes, agents, policy, and verifiers → exact Factory Version
creation → exact worker and Factory Version attestation → readiness
assessment and activation → human-selected local then remote canary →
independent verification → controlled publication canary.

Registration never counts as qualification. Promotion grants execution-only
eligibility, not routing, verification, publication, acceptance, merge, or
deployment authority. Worker admission compares exact repository, Factory
Version, configuration digest, harness manifest, effective configuration,
model route, backend, and Sandbox Profile identity. Cost or historical quality
may rank eligible candidates; it can never compensate for a failed hard
constraint. An exact model route matters because a provider and model name
alone do not describe the executable, adapter configuration, sandbox, or
effective capabilities that produced an artifact.

### Failure, recovery, and learning

When something goes wrong the workflow is: detect → classify as policy,
capability, environment, provider, execution, or result failure → contain
authority and preserve events → retry only a permitted class within Attempt
and wall-clock budgets → create an attributable new Attempt, or reconcile an
ambiguous external effect → quarantine, drain, kill, or escalate when safe
continuation is unavailable → independently re-evaluate the new exact
candidate. The workflow contract rejects heuristic `STATUS: done` completion
and requires structured status for non-gate steps. Historical runs are
projected read-only as current, legacy-but-valid, malformed, incomplete,
stale-schema, or invalid; compatibility logic never rewrites history or
invents a terminal outcome. Unknown or expired execution ownership becomes
`LOST`, preserves the workspace, and requires a new Attempt; cleanup is
non-forced and fails closed to `PRESERVED` on any ambiguity.

Learning follows the same discipline described in
[Chapter 33](./33-governed-learning-and-compounding-engineering.md): Attempt,
verification, review, and production observations become deterministic
Learning Signals, then bounded clusters, then a human-reviewable Improvement
Candidate, a frozen baseline-versus-candidate experiment, a reviewed result, a
submitted Mission Plan, and a separate human Plan approval before the ordinary
WorkOrder lifecycle. Learning can be autonomous; promotion is governed. The
learning subsystem cannot accept, publish, merge, change an active Factory
Version, or grant itself authority.

### Authorized action parity

Mission Control also keeps slice-level maps between UI actions, Convex
capabilities, and shared state, and treats them as a reusable discipline:
inventory each meaningful builder action and the state it changes; map it to
an authenticated API or tool outcome, or mark it human-only; require UI and
agent paths to use the same authoritative transition; apply the same policy,
scope, idempotency, and audit rules; surface the result immediately to the
operator; and test the resulting state, not the tool call. Parity concerns
outcomes, not buttons, and it does not mean an agent inherits every human
permission. A shadow agent API that bypasses the UI's controls is not parity;
it is a second control plane. Identity bootstrap, approval of consequential
authority, risk acceptance, and merge remain human-only, and marking them so is
clearer than leaving an accidental gap.

## How to build it

### The key decisions and why

Mission Control's shape is the sum of a dozen decisions. Each has a reason, and
the reason is the part worth carrying to your own factory.

**Why Convex owns state.** A control plane needs transactional server
functions, reactive queries the UI can subscribe to, scheduling, and HTTP
ingress in one place, so that a lifecycle transition and the record it
changes are atomic and the browser sees the truth without polling. Putting
authority anywhere else invites a second source of truth. The cost is a
critical dependency and some latency; the mitigation is durable local
checkpoints and reconciliation in the execution plane, which let a worker
survive control-plane ambiguity without inventing authoritative state.

**Why Hono hosts orchestration.** Long-running processes, provider SDKs,
worktrees, and harness subprocesses do not belong inside short transactional
functions. Hono is a small, web-standard service that can hold that plumbing
and speak to Convex through a signed **service-command boundary**: a
replay-resistant HMAC envelope with service identity, named capability, scope,
command ID, issue and expiry time, and payload digest, with Convex retaining
accepted, denied, failed, succeeded, and replayed receipts. Hono does not own
a competing lifecycle.

**Why transitions are server-owned.** The browser never decides which
company, workspace, repository, or record a person may act on, and public
clients cannot claim `SYSTEM` or `AGENT` authority. Every consequential
transition, including `workOrders.accept`, is one server mutation that
re-checks scope, approvals, and (for policy-v2 work) exact-current
verification before writing. One acceptance authority, no duplicate control
planes.

**Why worktrees.** Each Attempt mutates an isolated, Attempt-owned checkout
with a protected ownership manifest recorded outside the agent-writable tree.
That gives file-scope enforcement, one active mutating Attempt per repository
across Missions, safe reconciliation after a process restart, and a clean tree
to materialize a sandbox patch into. Repository state is always recomputed
outside the harness.

**Why Attempts are immutable.** A retry is a new historical fact, not a
correction of the old story. New Attempt, new Verification Run, old evidence
preserved. This is what makes idempotent dispatch, duplicate-PR prevention, and
honest retry history possible; PR #62's cancellation, two failed retries, and
successful fourth Attempt exist as a readable record because nothing was
overwritten.

**Why verification is independent.** The worker that created a material
change cannot be its only validator. A separate verifier Attempt, a frozen
Verification Plan, and candidate identity as the join key connect
implementation, evidence, approval, and publication so that a green suite for
the wrong SHA proves nothing.

**Why policy rather than role checks.** A role says who someone is; a policy
says what this change, at this risk class, in this repository, with this
evidence, may do next. Risk classes, policy envelopes, approval records,
separation of duties, and publication permits let low-risk work use fewer
checks without ever publishing a different SHA from the one checked.

**Why event-driven.** Ordered Attempt and WorkOrder events, signed and
deduplicated webhook deliveries, and idempotent commands are what let the
system tolerate timeouts, retries, duplicate events, stale leases, and
ambiguous external results. Events are also what the run inspector and audit
surfaces replay from.

**Why lineage everywhere.** Every record carries the digests of what it was
derived from: Plan binds Spec and Constitution; manifest binds Factory Version;
candidate binds Attempt; evidence binds candidate; permit binds candidate,
Attempt, lease, and approval checkpoint. Lineage is what turns "who authorized
this and why did it ship" from archaeology into a query.

**Why the Quality Contract is a projection.** The verification-first ADRs
weighed a separate Quality Contract aggregate (clear ownership and reuse, but
parallel truth) against a versioned projection of the approved Plan
(preserves the hierarchy, needs disciplined versioning). At `b3dfcee` the
projection won: a Quality Contract has no independent mutable lifecycle, and
changing quality intent requires a new Plan revision, human approval, and a new
digest.

**Why advisory stays advisory.** Memory, traces, evals, and learning are
projections that explain and recommend. An eval score never becomes a
verification receipt; a retrieved context item never changes frozen intent;
unavailable telemetry stays `null` rather than becoming zero.

### The tradeoffs you accept

Verification-first architecture adds latency, storage, policy design, and
operator complexity. Independent environments cost more than self-review;
immutable records need explicit supersession instead of edits; failing closed
delays work when a verifier is down; strong candidate binding makes
harmless-looking post-verification changes require another run; exact
digests make drift fail closed and add configuration work; atomic tools
compose better while domain tools reduce calls and variance. All of it should
be proportional to risk, and none of it is an excuse to remove identity,
authority, lineage, or evidence integrity.

### Reading any repository claim

Mission Control's reviews sort every claim into four evidence states before
repeating it: merged on main; committed and tested on an open branch; live or
browser evidence with a known limitation; uncommitted proposal. Use the same
sort for any factory, and refuse the usual substitutions: a screen is not a
capability, a unit test is not end-to-end proof, a registered model or sandbox
is not an admitted path, a completion message is not acceptance evidence,
telemetry is not proof, a learning proposal is not an approved change, and a
protocol task is not the governed Task record.

## Failure modes

The failures below are the ones Mission Control's own history exhibits or
guards against. Each is detectable from records.

**Control-plane path mistaken for a factory.** The
[Golden Path 01 run](../appendix/labs/evidence/2026-08-08-golden-path/README.md)
of 2026-08-08 proved, through the browser, Mission definition, repository
connection, versioned planning, a human plan decision, WorkOrder release, and
enforcement of a separate Validator WorkOrder (Mission Control refused to
submit a plan whose independent assertion was covered only by a Worker
WorkOrder). It proved no Task, Attempt, evidence, branch, commit, or PR,
because the GitHub App was unconfigured, no Governance Policy or Factory
Configuration was active, todo 024's durable worker was incomplete, and the
runtime was a dirty worktree at `8014d5a`. The lab result was `PARTIAL — does
not pass`, and the correct response was to say so. Detection: the acceptance
matrix has "Not run" rows. Remedy: configure the provider boundary, activate
policy and configuration, pin a clean commit, rerun from the same target tag
without changing the acceptance contract.

**Recovery by bypass.** After that run, PR #61 at `2fd0a5a` proved one real
App-authored, review-ready pull request with exact lineage and passing
checks. It did not retroactively pass the browser lab, because the recovery
used direct control-plane mutations when the browser Mission path could not
start the released Plan, preserve the implementation policy, or reconcile the
receipt. Detection: audit records show mutations without a corresponding
operator action. Remedy: the accepted lab still requires a clean,
browser-initiated run through the supported path.

**Qualified code presented as configured operation.** At `d902fae` the local
implementation qualification passed 17 composed gates, and the retained
production observation still found zero GitHub App installations, exact
routes, promoted Sandbox Profiles, current workflows, Factory Versions,
workers, and Attempts. The admission packet stayed
`BLOCKED_BY_OPERATOR_CONFIGURATION`, and no production mutation or canary was
fabricated. This is the most production-minded result in the repository: the
refusal to create plausible-looking evidence when prerequisites are absent.

**Candidate substitution, evidence replay, test weakening, cross-tenant
evidence.** The verification-plane threat model names these four. Prevention
is candidate binding, evidence-to-subject binding, negative constraints and
Change Budgets that protect test paths, and server-side scope resolution;
detection is exact-currentness recomputation at every gate; reconciliation is
a new subject and lineage.

**A moved PR head after approval.** Old evidence becomes history; eligibility
is blocked until a new exact lineage passes. Detection is automatic through
webhook ingestion (PR #63 proved a signature-valid `pull_request.edited`
delivery correlating to the right WorkOrder and Attempt without repair
commands).

**Duplicate or late completion events, stale leases, worker crash.** Fenced
leases bound to worker, session, generation, and a random fence ID; renewals
and hardened writes recheck the tuple; stale sessions cannot report evidence
or authorize publication; ownership becomes `LOST` and a new Attempt is
required.

**Incidental failures counted as the wrong evidence.** The golden-path run
also saw the operator shell time out on Convex query
`analytics:schematicOverview` and recover on reload, and saw some ref-based
automation clicks report success without changing UI state (the operator fell
back to DOM clicks and verified every durable outcome from later snapshots).
Both were retained as real observations; neither was allowed to stand in for
the lab's required independent-validation failure, and the click limitation
must be removed before a flow counts as deterministic browser evidence.

## In Mission Control

Because this whole chapter is about Mission Control, this section only pins
the evidence.

**Pinned commits.** `b31e275` (main, 2026-08-11), `ff0524e` (verification-first
P0, PR #75), `d902fae` (capability and admission map, 2026-08-28), and
`b3dfcee` (Production Factory Pilot V3 evidence; execution baseline
`db44819`, runtime contract v30).

**Retained evidence.** Golden Path 01 (partial, control plane only). PR #61,
#62, and #63: three App-authored PRs proving clean recovered Mission lineage,
immutable retry history with restart reconciliation and duplicate-PR
prevention, and browser-only evidence reconciliation with authenticated CI
ingestion; all nine checks passed, all closed unmerged after capture. System
Qualification V1 and V2 (deterministic, `FakeSandboxProvider`, fixture
lineage). Production Factory Pilot V3: 15 of 15 deterministic workloads (three
each of bug fix, feature, refactor, security or policy, and data or schema
migration) accepted through a valid terminal `factory-result/v1`, candidate
creation, independent exact-candidate verification, exact-current
eligibility, Review Package projection, and the canonical human acceptance
operation; 15 of 15 first-pass structured results and first-pass independent
verification; zero failed, replacement, retried, or cancelled Attempts; 51
required human governance actions and zero avoidable operator toil; a bounded
live remote cohort of 3 of 3 first-pass across bug fix, Security Configuration
D, and migration, sequential with maximum concurrency one, each with an
Attempt-scoped inference credential proved revoked and provider resources
proved absent; seventeen deliberate failure injections that failed closed and
recovered independently of the success workloads; `pnpm run qualify:factory`
passing all 17 gates; Factory Learning producing one `PROPOSED` candidate with
automatic promotion disabled; routing advisory with zero Guarded Auto
decisions. Acceptance authority stayed exactly `workOrders.accept` and no merge
was performed.

**Implemented and system-qualified.** Governed Missions and Plan approval;
Quality Contracts as Plan projections; Verification Factory and policy-v2
exact-subject fail-closed verification; the Generic Harness Contract with the
`codex/v1` production admission; worker identity, fenced leases, heartbeats,
retry budgets, and pause, drain, and kill controls; frozen execution
manifests; GitHub App publication with exact currentness; canonical human
acceptance; Factory Learning as an advisory proposal flow; observability and
evals as diagnostics; company, workspace, and repository boundaries with
server-side authorization; six versioned YAML workflows snapshotted onto
Attempts.

**Partial.** Spec-driven intake: merged, qualified, default off. Factory
Memory: implemented, default off by phase. Skills: discoverable and linted,
but no exact skill digest was observed in `factory-execution-manifest/v1`, so
not provably bound. MCP: the studied harness manifests declare it unsupported
and no governed gateway was verified. Routing: exact-route identity and
guarded-auto gates exist, Guarded Auto is disabled, and the remote tuple has
three verified samples against a frozen five-sample threshold. Release,
deployment, activation, rollback, and production-outcome records exist and
are less proven than the pre-merge path. Some legacy service callers of
`workOrders.accept` still need migration before production promotion. Cost
telemetry is `null` because no provider exposed priced telemetry.

**Blocked or future.** Remote Sandbox remains Preview with unrestricted
egress and ephemeral Codex installation; V3 qualifies bounded human-governed
use, not general certification, and its workloads were disposable fixtures
with no external repository published or merged. The production admission
packet at `d902fae` was blocked by operator configuration. Still future: a
repository-wide action-parity manifest with CI drift checks, exact skill
binding, a governed MCP gateway, a browser-originated Mission-to-reviewed-PR
run with no direct mutation, retained post-merge production-outcome evidence,
Trust Score and automatic autonomy calibration, first-class Risk Review,
DeepSeek beyond experimental, Loom admission, supply-chain attestations across
source, build, dependencies, and deployment, additional git providers,
fleet-scale load, and measured multi-team adoption.

**Next evidence, in order.** Establish a clean pinned baseline; repair the
browser Mission path and webhook evidence reconciliation; configure the
controlled `mission-control-factory-lab` repository with the exact GitHub App,
active Governance Policy, and passing Factory Version; rerun Golden Path 01
from its pinned tag without direct mutations; retain Task, Attempt, lease,
manifest, commit, PR, receipt, failure, recovery, and review-package evidence;
only then extend proof into deployment and production outcome.

## Retain this

- Mission Control is a control plane, not a coding agent: React for operators,
  Convex as the only source of truth and the only place transitions happen,
  Hono for orchestration and provider boundaries, executors in worktrees or
  sandboxes, GitHub behind a least-privilege App.
- A Mission flows Mission → approved Plan → WorkOrder → Task → frozen
  manifest → leased Attempt → immutable candidate → independent verification →
  Quality Gate → permit → PR → human acceptance, and each step has negative
  authority over the next.
- Candidate identity is the join key. A green result for the wrong SHA proves
  nothing; a moved head invalidates eligibility, not history.
- Retry is a new Attempt. Missing evidence is a negative state. Unavailable
  telemetry is `null`, not zero.
- Admission is a chain of exact identities and digests; registration is not
  qualification, promotion is execution-only eligibility.
- Advisory stays advisory: memory, evals, and learning explain and propose, and
  never accept, publish, merge, or reconfigure.
- The evidence at `b3dfcee` is a bounded, human-governed production pilot:
  15/15 accepted, 17 fail-closed drills, 3/3 live remote, `workOrders.accept`
  by a human, no merge. It authorizes nothing beyond that.
- The most valuable habit in the repository is refusing to fabricate evidence
  when prerequisites are absent.

## Go deeper

- [Chapter 5 — Authoritative records](../02-design/05-authoritative-records.md)
  and [Chapter 11 — Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md)
  for the general form of the hierarchy and planes.
- [Chapter 12 — Durable execution](../03-build/12-durable-execution.md) for
  leases, idempotency, and recovery in the abstract.
- [Chapter 13 — Coding harnesses and agent protocols](../03-build/13-coding-harnesses-and-agent-protocols.md)
  for the Generic Harness Contract's lineage.
- [Chapter 24 — Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)
  for the assurance records in full.
- [Chapter 33 — Governed learning and compounding engineering](./33-governed-learning-and-compounding-engineering.md)
  for the learning plane.
- Appendix C: [implementation maturity and evidence map](../appendix/mission-control/01-implementation-maturity-and-evidence-map.md),
  [verification-first case study](../appendix/mission-control/02-verification-first-software-factory.md),
  [capability, workflow, and admission map](../appendix/mission-control/03-capability-workflow-and-admission-map.md).
- Retained evidence: [Golden Path 01 assessment](../appendix/labs/evidence/2026-08-08-golden-path/README.md).
- Labs: [Governed issue to validated pull request](../appendix/labs/01-governed-issue-to-validated-pull-request.md),
  [Authority, containment, and decision replay](../appendix/labs/10-authority-containment-and-decision-replay-lab.md),
  [Orchestration failure, recovery, and cost](../appendix/labs/11-orchestration-failure-recovery-and-cost-lab.md).
- [Glossary](../appendix/glossary.md).
- Mission Control sources: [main baseline `b31e275`](https://github.com/jaydubya818/MissionControl/tree/b31e27564deb1c03c167e61b5ee094567c2ba7b1),
  [study commit `9d5f8e3` and draft PR #64](https://github.com/jaydubya818/MissionControl/pull/64),
  [PR #61](https://github.com/jaydubya818/MissionControl/pull/61),
  [verification-first P0 at `ff0524e` and PR #75](https://github.com/jaydubya818/MissionControl/pull/75)
  with the [verification-first architecture decisions](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/decisions/verification-first-architecture-decisions.md),
  [domain contracts](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/software-factory/verification-first-domain-contracts.md),
  [state machines](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/software-factory/verification-and-gate-state-machines.md),
  [threat model](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/security/verification-plane-threat-model.md),
  [failure, recovery, and reconciliation](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/software-factory/verification-failure-recovery-reconciliation.md),
  [V1 verification profile](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/software-factory/v1-verification-profile.md),
  [golden-path manifest](https://github.com/jaydubya818/MissionControl/blob/ff0524ea0dac4159535d463fcf8787dc6dca0b91/docs/validation/verification-first-golden-path-manifest.md),
  and code traces `packages/workflow-engine/src/verification.ts`,
  `apps/orchestration-server/src/factoryVerification.ts`,
  `apps/orchestration-server/src/factoryAttemptWorker.ts`,
  `convex/lib/verificationPersistence.ts`, `convex/factory/attempts.ts`,
  `convex/schema.ts`.
- At `d902fae`: [README](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/README.md),
  [North Star](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/product/mission-control-north-star.md),
  [V1 product strategy](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/product/mission-control-v1-product-strategy.md),
  [documentation authority map](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/software-factory/README.md),
  [Generic Harness Contract V1](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/architecture/generic-harness-contract-v1.md),
  [execution routing V1](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/architecture/execution-routing-v1.md),
  [Factory Memory](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/architecture/factory-memory-context-intelligence.md),
  [Factory Learning](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/architecture/factory-learning-continuous-improvement.md),
  [Graph Engineering capability map](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/software-factory/GRAPH_ENGINEERING.md),
  `convex/lib/executionManifest.ts`, `convex/lib/modelRouteAdmission.ts`,
  `convex/lib/sandboxProfileAdmission.ts`, `convex/lib/factoryWorkflowContract.ts`,
  and the [production admission packet](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/testing/evidence/production-execution-admission-foundation-v1/README.md)
  with its [operator sequence](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/testing/evidence/production-execution-admission-foundation-v1/operator-configuration-sequence.md)
  and [final validation](https://github.com/jaydubya818/MissionControl/blob/d902fae7032c0696b531c44ae88829c652516fc6/docs/testing/evidence/production-execution-admission-foundation-v1/final-validation.md).
- At `b3dfcee`: [Production Factory Pilot V3 final readiness gate](https://github.com/jaydubya818/MissionControl/blob/b3dfcee/docs/testing/evidence/production-factory-pilot-v3/README.md)
  and the [real Codex-to-GitHub browser proof](https://github.com/jaydubya818/MissionControl/blob/b3dfcee/docs/testing/evidence/real-codex-github-pr-golden-path/README.md).
- Standards referenced by the admission map (accessed 2026-08-28): Model
  Context Protocol 2026-07-28 release; OpenTelemetry GenAI semantic
  conventions; NIST SP 800-218A; SLSA Provenance 1.2; OWASP Top 10 for Agentic
  Applications 2026.
- Source: Jay West, "Mission Control North Star" — the business-hours and
  overnight operating model, plan-before-execution, evidence-based
  development, and the measures of success.
