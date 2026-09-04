---
title: "Economics, metrics, and human attention"
part: design
chapter: 8
summary: "How to measure trusted customer value, factory performance, and human attention without mistaking activity for outcomes."
absorbs: [03-operating-model/02-factory-economics-and-operating-metrics.md, 03-operating-model/07-engineering-attention-altitude-and-control.md, 03-operating-model/05-compounding-engineering-and-human-attention.md]
infographics: [five-metric-dimensions, attention-altitude]
---

# 8. Economics, metrics, and human attention

A factory that produces more pull requests, tokens, and generated lines has proved nothing. This chapter defines the measurement system for trusted throughput and the attention model that keeps automation from becoming a review bottleneck. After reading it you should be able to connect customer outcomes to factory diagnostics, write an attention budget, and move between direct and governed control without losing accountability.

## The problem

Agent activity is easy to measure and easy to mistake for value. Tokens, sessions, tool calls, and PR volume can all rise while customer outcomes slow, defects climb, and engineers spend more of their week recovering or reviewing low-quality work. The lifecycle is fragmented by local optimization: coding tools report generation speed, CI reports test duration, finance sees model spend, product sees feature delivery, the incident system sees failure. Without shared lineage nobody can compute the economics of one governed Mission.

Automation also *shifts* work rather than removing it. Faster implementation creates slower review. More parallelism creates merge conflicts. Cheaper models increase validation and recovery cost. And the resource that actually limits throughput is not model intelligence. As Luke of Goose and Factory put it, the best engineer with a backlog of fifty features can drive only a few forward per day, because every task needs their attention and every commit needs their review. Today's models can attempt all fifty; there is not enough human bandwidth to supervise them. An autonomy system that consumes more senior attention than it returns has negative leverage — and an honest measurement system has to be able to say so.

## How it works

### Measure validated customer value, not activity

The primary clock starts when business intent becomes a governed Mission and stops when the change is deployed, independently validated in production or a production-equivalent environment, and the expected customer outcome is confirmed. Merge time is an intermediate reading, not the outcome. Three executive measures sit at the top:

1. **Lead Time to Validated Customer Value** — elapsed time from governed intent to confirmed outcome.
2. **Change Failure Rate** — the share of deployments that cause rollback, hotfix, emergency intervention, customer regression, a reliability or security incident, or an SLA/SLO violation within a default seven-day observation window.
3. **Engineering Leverage** — valuable outcomes per unit of scarce engineering capacity, without increasing cognitive load or coordination cost.

They form a constraint system. Speed without quality is rework. Quality without speed is delay. Throughput without human sustainability is hidden debt. Think of a factory floor: units per hour means nothing until you subtract scrap, returns, and overtime.

```mermaid
flowchart LR
    Intent["Governed business intent"] --> Delivery["Validated delivery"]
    Delivery --> Outcome["Confirmed customer value"]
    Intent -. "lead time" .-> Outcome
    Delivery --> Failure["7-day failure observation"]
    People["Human time and attention"] --> Delivery
    Compute["Model, tool, and infrastructure cost"] --> Delivery
```

### The five dimensions

Below the three executive measures, the mission defines five dimensions in which the factory must demonstrate improvement. Every one of these metrics is a legitimate line on a dashboard; the discipline is knowing which are outcomes and which are diagnostics.

<!-- infographic: five-metric-dimensions -->
> **Infographic — Five metric dimensions.**

```mermaid
flowchart TD
    NS["North Star: less time from idea to validated customer value,<br/>with better quality, traceability, reliability, and control"]
    NS --> S["Speed"]
    NS --> Q["Quality"]
    NS --> E["Economics"]
    NS --> H["Human outcomes"]
    NS --> F["Factory intelligence"]
    S --> S1["Idea-to-plan · plan-to-first-PR · PR cycle time<br/>lead time for change · deployment frequency<br/>MTTR · waiting time between stages"]
    Q --> Q1["Change failure rate · escaped defects · regression rate<br/>test coverage of changed behavior · rollback rate<br/>security findings · reliability incidents · rework %"]
    E --> E1["Cost per completed work item · agent-compute cost<br/>human hours per feature · human review time<br/>cost of rework · cost of incidents · output per engineering dollar"]
    H --> H1["Developer satisfaction · time on repetitive work<br/>time on creative and strategic work · trust in agent output<br/>cognitive load · after-hours burden · retention · skill growth"]
    F --> F1["Plan-approval rate · task-success rate · human intervention rate<br/>first-pass validation rate · reopened missions · agent-generated defects<br/>time to recover from agent failure · % of work at each autonomy level"]
```

**Speed** covers idea-to-plan time, plan-to-first-PR time, PR cycle time, lead time for change, deployment frequency, mean time to resolution, and waiting time between lifecycle stages. **Quality** covers change failure rate, escaped-defect rate, regression rate, test coverage of changed behavior, production rollback rate, security findings, reliability incidents, and rework percentage. **Economics** covers cost per completed work item, agent-compute cost, human hours per feature, human review time, cost of rework, cost of incidents, and output per engineering dollar. **Human outcomes** covers developer satisfaction, time spent on repetitive work, time spent on creative and strategic work, trust in agent output, cognitive load, after-hours burden, employee retention, and skill growth. **Factory intelligence** covers plan-approval rate, agent task-success rate, human intervention rate, first-pass validation rate, reopened-mission rate, agent-generated defect rate, time to recover from agent failure, and the percentage of work completed at each autonomy level. The study guide adds retry rate, review burden, agent cost per mission, cost per validated change, and infrastructure and model cost to the same families.

For a factory offered as an internal platform, adoption has its own metrics: time to first successful workflow, task success, PR acceptance rate, human correction rate, model-routing quality, token cost per accepted outcome, reliability, repeat usage, time to onboard a new team, number of bespoke capabilities retired, builder satisfaction, and adoption across product organizations. Those are developed with the platform operating model in [Chapter 34](../05-operate/34-the-factory-as-a-platform.md) and [Chapter 38](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md).

### Platform metrics in four families

The same platform metrics are easier to defend when grouped by the question each family answers, and by what they deliberately exclude. Lines of code, prompts sent, agent count, PR count, and tokens consumed are all activity: they can rise while the platform gets worse. *Generation volume is an activity metric; trusted outcomes are the product metric.*

| Family | Question | Metrics |
| --- | --- | --- |
| Builder | Does the factory get a builder from intent to a trusted result, and do they come back? | Intent → prototype time; intent → accepted PR time; intent → trusted production time; self-service onboarding; repeat usage |
| Trust | Can the organisation rely on what the factory produces? | Accepted-task success; human edit rate; defect escape; rollback rate; false-positive review rate; policy violations |
| Economics | What does a trusted outcome cost, all in? | Cost per trusted outcome; model cost; CI cost; human review cost; rework |
| Platform | Is the machinery itself reliable? | Completion rate; reliability; latency; retry rate; tool failure rate; recovery time |

A dashboard that reports one family alone is misleading in a predictable direction: builder metrics alone reward speed at the expense of trust, trust metrics alone reward caution at the expense of adoption, economics alone rewards the cheapest run rather than the cheapest outcome, and platform metrics alone describe a healthy machine that may be producing nothing anyone accepts. Read them together, and segment every one by team, workflow, risk tier, model route, and version.

### The four factory dimensions

The four families above are grouped by who asks the question. A second grouping, by what the factory is trying to *be*, is the one to use when setting targets, because it exposes a confusion that hides inside almost every "autonomy" goal. The **four factory dimensions** are Autonomy × Automation × Quality × Economics, and the first two are not the same thing.

**Autonomy** is how independently an agent can complete a task correctly. Its measures all trend down as autonomy rises: corrections per task, human turns per task, pull-request comments that need changes, takeovers, replans, failed attempts. **Automation** is how much of the workflow runs without a human initiating, supervising, or approving it. The two can move separately, and the case that proves it is worth holding in mind. A factory with high autonomy and low automation produces a hundred correct pull requests, every one of which a human then opens, reads, and approves. The agents needed no help; the humans still did all the reviewing; the bottleneck has moved from writing to inspecting and the leverage is small. The reverse — high automation, low autonomy — merges work nobody checked and the agent could not do. The target is neither maximum. It is *the economically optimal level of autonomy and automation that satisfies the quality and risk threshold*, which is why Quality and Economics are the other two axes and why all four sit on one dashboard:

| Dimension | Metrics |
| --- | --- |
| Autonomy | Corrections per task · manual takeover rate · first-pass success |
| Automation | Agent-initiated share of work · human touchpoints per accepted outcome · auto-merge share |
| Quality | Escaped defects · regression rate · acceptance rate |
| Economics | Cost per accepted outcome · tokens per outcome · human minutes per outcome |

Three of the twelve deserve definitions because they are the ones teams most often approximate badly. A **human touchpoint** is any event at which a human must intervene for progress: a clarification, a replan, a correction, a pull-request comment, a manual test, a credential provisioned, an approval, a merge, a deployment, a recovery. **Human touchpoints per accepted outcome** counts them all, per outcome that was accepted, and it is the automation metric because every touchpoint is a place where the workflow waited for a person. **Manual takeover rate** is the share of tasks a human had to finish by hand after the agent gave up or was stopped; it is the autonomy metric that survives optimistic reporting, because a takeover is hard to hide. And the ratio the whole dashboard exists to raise is the **human leverage ratio**: accepted, verified outcomes per unit of human attention — verified outcomes per human hour, or accepted change volume per touchpoint. It is engineering leverage from the executive measures above, computed at the level of a single workflow.

Warp's public account of a closed-loop cloud factory reports the same shape from the inner loop, with metrics more granular than DORA: pull-request throughput, average cost per pull request, automation percent (the average number of human touchpoints per pull request), savings over the equivalent human work, and — hardest to measure and most worth trying — the acceleration of shipped product. Their automation percent is this section's touchpoints-per-outcome; their cost per pull request is cost per accepted outcome restricted to one artifact type. The lesson from both is the same: a factory that reports pull requests without touchpoints is reporting automation it may not have.

### The metric hierarchy

Metrics stack in four tiers, and confusing the tiers is the commonest measurement error. **Business outcomes** — adoption, revenue, retention, risk reduction, a customer problem solved. **Delivery outcomes** — lead time, deployment frequency, change failure, recovery time, accepted WorkOrders, outcome confirmation. **Factory effectiveness** — autonomous completion, first-pass validation, recovery success, evidence completeness, approval latency, review time, cost per accepted outcome. **Operational diagnostics** — tokens, tool calls, model latency, queue depth, lease expiry, retries, provider errors, context size. Diagnostics explain outcomes; they are not outcomes.

Engineering leverage in particular cannot be proved by a single number. Use a balanced evidence set: reduced lead time with stable or improved change failure rate; more accepted, validated work; fewer human implementation hours per item; less waiting and coordination time; more time on architecture, product, and customer problems; stable or lower review and recovery burden; and better developer satisfaction and perceived control. The objective is more customer value per engineer, not more commits per engineer.

### Measure flow and attention together

Break lead time into its stages — queue, planning, approval, execution, validation, review, deployment, outcome observation — so you can see whether the factory accelerated work or just moved the bottleneck from implementation to review. Luke's production data on a multi-day mission is instructive: most wall-clock time was spent not generating tokens but waiting for real-world validation to run, and validation almost never succeeded on the first pass. That is where the clock goes; that is what to optimize.

Alongside flow, track attention: number of interventions, decision latency, time per approval, evidence inspection time, false alarms, and repeated requests. Use cohorts and baselines: compare similar repositories, risk bands, change types, and autonomy levels; establish a stable pre-factory baseline; report medians and percentiles, not just averages; and refuse causal claims when organization, tooling, and product changed at the same time without an experimental design.

### What breaks first at scale

Once the factory works for a few teams, the bottleneck moves, and it moves predictably. Four things break first. **Cost**: experimentation outpaces attribution, so spend rises before anyone can say which workflow, team, or model caused it. **Context**: huge repositories, many knowledge sources, permission boundaries, and stale documentation overwhelm retrieval, and grounded answers on obsolete facts are still wrong. **Supply-chain capacity**: pull requests, CI runs, security scans, artifact storage, and review demand grow faster than any of those systems were sized for, and the delivery pipeline becomes the queue. **Trust**: one visible autonomous mistake undoes months of adoption. None of these is a generation problem, which is why a factory optimised for generation speed hits them hardest. The bottleneck will keep moving; design the factory so that you can see where it moves next, which is what the four metric families and the stage-level lead-time breakdown are for.

Where it moves next is predictable enough to name. **Bottleneck migration** is the sequence: implementation is scarce, so the factory automates it; then review is scarce, so the factory compresses it ([Chapter 39](../06-improve/39-production-feedback-review-and-the-agentic-merge-queue.md)); then verification, context quality, intent definition, and governance are scarce, because those are what review was silently doing; and finally factory engineering itself is scarce, because someone has to build and maintain the loops that do all of the above. Automation pushes the bottleneck upstream, toward defining what correct means, and downstream, toward proving that it was met. A factory that measures only the stage it just automated will always be surprised by the next one, and the stage-level lead-time breakdown is how to see it coming.

### Latent quality capacity and role fungibility

Two returns in the factory-economics table are easy to miss because they do not show up as faster delivery of the existing backlog. The first is **latent quality capacity**: cheap capacity for work that never competed for engineering time — UI consistency, accessibility, copy, dependency hygiene, refactoring, test coverage, documentation, the small debts every codebase carries. That work was not being deprioritised because it did not matter; it was being deprioritised because it never won a sprint against a feature. Maintenance loops ([Chapter 26](../03-build/26-autonomous-engineering-workflows.md)) do it continuously at near-zero marginal cost, and the codebase gets better without anyone scheduling it. Factories raise quality, not only velocity, and a measurement system that counts only feature throughput will report that the factory did less than it did.

The second is **role fungibility**, the "broader participation" return: people executing useful work across functional boundaries by delegating the specialised implementation to governed agents. A designer takes a change to a production pull request. A go-to-market lead ships a website change. An engineer writes a product specification. None of them has become the other; the factory's context, verifiers, and governance are what make the delegation safe, and the risk tier applies to the change regardless of who asked for it. Measure it as accepted outcomes from people outside the role that would previously have owned them, and watch the human-leverage ratio, because fungibility that raises review load on the engineers it was meant to free has not helped.

### Proof, and how to say it

The mission names five proofs the factory must produce. **Proof 1, speed:** a workflow that took five days reaches a validated pull request in one. **Proof 2, quality:** faster execution does not increase escaped defects, and ideally reduces them. **Proof 3, human leverage:** developers spend less time on repetitive execution and more on high-value decisions. **Proof 4, governance:** a complete chain of intent, planning, actions, approvals, evidence, and production outcomes. **Proof 5, financial value:** lower cost per validated change, or more throughput without proportional headcount. Together they are the business case, the executive narrative, and the sales foundation.

The framing matters as much as the number. Do not say "we generated 50 percent more code." Say "we reduced plan-to-validated-PR time by 60 percent, lowered human implementation effort by 40 percent, held or improved change failure rate, and preserved full traceability." The first is activity; the second is an executive outcome, and every clause in it maps to a dimension above.

### Human attention is the scarce resource

The scarce input is not tokens. It is **qualified human attention**: understanding intent, resolving ambiguity, weighing tradeoffs, reviewing consequential changes, and accepting risk. The factory should reduce repetitive attention without hiding the decisions that still need people. Three control modes describe how often a person is needed, not whether they are accountable:

- **Human-in-the-loop** — a person performs a required decision or correction inside the workflow.
- **Human-on-the-loop** — the workflow runs within policy while a person supervises outcomes and handles exceptions.
- **Human-out-of-the-loop** — no human decision is required for that bounded instance; prior human policy and accountability still apply.

A workflow can be out-of-the-loop for execution and still require human policy ownership, promotion, incident response, and risk review. Luke's model is the same shape: a human decides *what* to build and approves the plan; orchestrator, workers, and validators figure out *how*, with a validation contract written before any code and structured handoffs so context survives days of execution; the human returns as a project manager reading handoff summaries and a budget-burn view rather than a chat log. His economics: five engineers who could hold ten work streams now hold thirty, and the codebase ends cleaner because tests and skills accumulate.

An **Attention Budget** states the expected human effort for a workflow and which decisions justify interruption. Its metrics are time to first required human decision; decision and approval latency; correction and override rate; review minutes per accepted outcome; avoidable notification and false-escalation rate; exception age and ownership; time spent reconstructing missing context; repeated correction clusters; and self-reported cognitive load. Attention is saved when the system presents a *decision*, not when it sends more activity notifications. An escalation therefore arrives as a decision packet — affected outcome, risk, evidence, uncertainty, options, recommendation, deadline, and resume behavior — the same object defined in [Chapter 7](./07-governance-policy-and-risk-proportional-approval.md).

### Signal aggregation is attention economics

The factory produces far more quality signals than a person can read: tests, static analysis, security scanners, dependency checks, evaluators, policy engines, and review agents all report, and a pull request with a hundred and fifty warnings attached is a pull request whose warnings are all ignored. More signals do not make better decisions. Signal quality is a product problem, and the product is the reviewer's attention.

The pipeline that treats it as one deduplicates the same finding reported by three tools, aggregates and correlates findings that share a cause, assigns severity and confidence, attaches ownership context (who owns this file, who owns this dependency), attaches the risk classification of the change, and explains why each surviving finding matters for this change. The output is the smallest set of findings that could change the reviewer's decision, with everything else one click away rather than in the way. Then it closes the loop: the reviewer's reaction to each finding (useful, wrong, correct but irrelevant) is captured and fed to the learning system, so that the aggregation improves and a noisy check loses its place at the top. The objective is *maximum decision quality per unit of human attention, not maximum signal volume*. That is the same objective as the attention budget, applied to the evidence instead of the interruptions.

Reducing human time is not always the objective. High-consequence decisions deserve deliberate attention. Optimize away polling, repetitive repair, and context reconstruction — not accountability. Interaction granularity is also a design choice: for writing, design, architecture, or ambiguous product work, small iterative increments calibrate better than one large generated artifact, with the human teaching through edits and repeated patterns extracted into a style guide, anti-pattern catalog, or skill; for mechanical work with strong specifications and tests, large autonomous increments are appropriate. A **Human Workflow Profile** may capture personal fit — planning depth, increment size, review cadence, explanation style, surface, notification channel, accessibility needs — but it must never grant tools, change policy, lower quality gates, or alter business authority. Switching models or harnesses has a human cost too: intuition and habits must be rebuilt, so migration should include training, paired use, opt-in canaries, and measurement of correction and attention, not just a new default announced by benchmark.

The other half of that v1 material — turning recurring corrections into evaluated, reusable capability, the correction record, and promotion to the narrowest durable mechanism — is **compounding engineering**, covered in [Chapter 40](../06-improve/40-governed-learning.md). Its relevance here is one sentence: compounding increases leverage only when the reusable capability is versioned, owned, tested, observable, and revocable, and its goal is to spend attention on the highest-value decisions, not to remove it.

### Attention altitude

Where should that attention go? IndyDevDan's framework of the **agentic operating level** asks a single question: where are you and your agent applying attention right now, from a line of code up to the software factory? His ladder has five bands. **Code primitives** — line, block, function, type, class — give the most direct control. **Code structure** — file, module, directory — trades a little control for leverage. **Data and execution** — database tables and databases (the contracts the rest of the system is built on), then scripts and CLIs (reusable pathways for you and your agents). **Delivery and intent** — application, repository, plan, documentation; the application level is where pure vibe coding lives, able to inspect only the finished product. **Agentic systems** — the agent, the AI developer workflow, and the software factory, where a single plan-build-test-deliver loop is one workflow and a factory is many composed together.

His rules are worth keeping exactly. Moving up buys leverage and speed and costs understanding and direct control; moving down is the inverse. Higher is not better — what you want is a *range* you can move through, because "you cannot scale something you do not understand." Move up when you understand the domain and can tell right from wrong, when the work is familiar and repeated ("three makes a pattern" — the signal to build a skill, then a reusable agent, then a workflow), when the output has many artifacts and steps, when the evidence supports automation, and when you have the agentic engineering skill to operate there. Move down when you have little domain understanding, when the system is unfamiliar (a new codebase, a new company), when the domain is high-risk and high-impact, when debugging evidence is weak and a trace does not look like proof, when performance or details matter, and when the task is **out of distribution** — something the model does not know, cannot do, or was trained to avoid, so that your expertise must extend what it can do. Expertise itself is built from the atoms up; there is no shortcut past the low levels. And beyond the factory he sees further levels — the dark factory and recursive self-improvement — that nobody reaches by skipping the ones below.

The factory version of this ladder is organized by what a reviewer inspects rather than what a coder edits, and it maps cleanly onto Dan's:

<!-- infographic: attention-altitude -->
> **Infographic — Attention altitude.**

```mermaid
flowchart TB
    L5["5 · Outcome<br/>customer value, risk, economics, confidence"]
    L4["4 · System<br/>policies, portfolios, SLOs, exceptions, trends"]
    L3["3 · Workflow<br/>intent, tasks, attempts, evidence, approval, recovery"]
    L2["2 · Component<br/>interfaces, modules, dependencies, failure paths"]
    L1["1 · Implementation<br/>lines, commands, schemas, tests, tool arguments"]
    L5 --- L4 --- L3 --- L2 --- L1
    Up["▲ move up: familiar, bounded, evaluated,<br/>reliable validators, exercised recovery"] -.-> L5
    Down["▼ move down: novel, irreversible, sensitive,<br/>weak evidence, conflict, out of distribution"] -.-> L1
```

| Level | Human attention | Typical objects | Direct inspection | Appropriate when |
| --- | --- | --- | --- | --- |
| 1. Implementation | Lines, commands, schemas, tests, tool arguments | Code diff, migration, query, shell command, credential scope | Highest | Novel or high-impact change; weak evidence; exact mechanics matter |
| 2. Component | Interfaces, modules, dependencies, failure paths | Service contract, package, API, repository subsystem | High | Local architecture and compatibility are the main risk |
| 3. Workflow | Intent, tasks, attempts, evidence, approval, recovery | Feature workflow, defect repair, dependency update, incident path | Moderate | The workflow is bounded and its validators are trusted |
| 4. System | Policies, portfolios, SLOs, exceptions, trends, incidents | Factory control plane, repository fleet, capability catalog | Low | Repeated workflows are stable and exceptions are visible |
| 5. Outcome | Customer value, risk, economics, confidence | Business outcome, adoption, quality, cost, strategic tradeoff | Lowest | Lower layers have proven controls and the decision is truly outcome-level |

This is not a career ladder and not a one-way progression. A staff engineer operates at outcome level for a mature workflow and drops to a tool argument the moment a new failure appears. Dropping altitude is not a failure of autonomy; it is the normal control response to uncertainty. Move up only when most of these hold: the domain, repository, and workflow are understood; the work is familiar, bounded, and repetitive; inputs and acceptance criteria are explicit; representative evaluations cover normal and critical slices; independent validators are reliable and hard for the executor to game; failures are detected early and classified correctly; rollback, cancellation, and recovery have been exercised; permissions, side effects, time, and cost are bounded; observed outcomes show sustained benefit; and exceptions route to a named human with enough evidence to decide. Recurrence is a signal to *evaluate* automation, not proof it is safe — a frequent task with rare, severe, hard-to-observe failures still does not qualify.

Move down when any of these appears: an unfamiliar domain, repository, dependency, or failure; a hard-to-reverse action or large blast radius; rising data, identity, privacy, financial, legal, or security consequences; evaluation coverage that is weak, stale, or contradicted by production; work where system design, algorithmic complexity, performance, or exact semantics matter; a change to a boundary, migration, policy, permission, or public contract; conflicting tool results, incomplete provenance, or material missing data; retries repeating without improvement; cost, latency, failure rate, or user impact leaving its approved envelope; or a task outside the distribution represented by the qualified models, contexts, tools, skills, and evaluation cases.

### Direct control and governed control

Altitude changes what kind of control you have. **Direct control** means the human performs or inspects the consequential details: strong local understanding, scarce attention, no scaling, and it still misses defects when the reviewer lacks context or is overloaded. **Governed control** means the human defines intent, constraints, acceptance, authority, and escalation, then relies on bounded execution and independent evidence: it scales further, but only if the contracts and validators are credible. Neither is universally better.

| Question | Direct control answers with | Governed control answers with |
| --- | --- | --- |
| What was allowed? | Human instruction and review | Versioned policy and execution grant |
| What ran? | Observed commands or diff | Immutable attempt manifest and event trace |
| Was it correct? | Expert inspection | Independent tests, checks, evidence, accountable decision |
| What failed? | Manual diagnosis | Failure classification, correlated telemetry, replay |
| Can it be stopped? | Human intervention | Scoped cancel, revoke, quarantine, kill controls |
| Can it recover? | Manual repair | Rollback, retry, reconciliation, verified restoration |

Governed control is not hands-off. It moves human effort from performing every step to designing the system, calibrating validators, reviewing exceptions, and owning consequential decisions.

### Evaluated coverage

An agent workflow is **inside evaluated coverage** when its material inputs, state, tools, side effects, failure modes, and expected outcomes are represented by current qualification evidence, and **outside evaluated coverage** when any of those differs materially from what was tested. Typical cases: a familiar change in a new language or framework; a normal migration against an unfamiliar data volume or tenancy model; an approved tool used with a new side effect or permission scope; a known repository after a major architecture or dependency change; a common incident with a novel cause or conflicting telemetry; a task whose acceptance depends on domain knowledge absent from the context and evaluation set. Out-of-distribution detection is not one model score; it combines repository and dependency fingerprints, schema compatibility, task classification, source freshness, tool eligibility, evaluation coverage, uncertainty, novelty, conflict, and production drift. When coverage is unclear, reduce autonomy and ask for closer inspection.

## How to build it

**Metric dictionary.** For each metric record: tier (business, delivery, factory, diagnostic); dimension (speed, quality, economics, human outcomes, factory intelligence); exact start and stop events; the authoritative record it is computed from; whether the value is measured, a proxy, or missing; segmentation keys (risk band, repository, workflow, autonomy level, change type, time window); sample size and confidence.

**Coupled leverage scorecard.** Never report one of these without the others: flow (governed intent to accepted production outcome); quality (escaped defects, rework, rollback, incidents, acceptance stability); leverage (accepted outcome per unit of human attention); cost (model, tool, compute, platform, human review); confidence (evidence freshness, coverage, independence, uncertainty). A faster workflow that raises rework or hides review time has not demonstrated leverage.

**Attention policy per workflow:**

1. **Default altitude** — the normal human review level.
2. **Mandatory inspection points** — migrations, public interfaces, security boundaries, high-impact changes, and other locally material objects, defined by consequence, not habit.
3. **Escalation triggers** — novelty, risk, conflict, missing evidence, budget, drift, repeated failure, authority exceptions.
4. **Evidence package** — the minimum facts needed to decide without recreating the run.
5. **Drill-down path** — direct links from outcome to workflow, task, attempt, tool call, artifact, and source evidence. The interface must never trap a reviewer at a summary; every aggregate claim traces to underlying records without changing their meaning.
6. **Return condition** — what proof lets attention move back up after an incident or regression.

**Attention budget per workflow:** expected human minutes per accepted outcome; which decisions justify interruption; escalation deadline; and the packet format for each decision type.

**Cost attribution model:** per WorkOrder, sum model and token spend, tools, infrastructure, CI, storage, human implementation, review, recovery, rework, incident share, and allocated platform cost; publish the range, not a point.

**Operating checklist:**

- Is the current attention level explicit for each risk tier and workflow?
- Can a reviewer drill from outcome to exact attempt, evidence, and artifact?
- Are mandatory inspection objects defined by consequence rather than habit?
- Does promotion require measured flow, quality, leverage, cost, and confidence?
- Are facts, proxies, uncertainty, and missing data visually distinct?
- Does material novelty reduce autonomy automatically or require re-admission?
- Can humans cancel, restrict, quarantine, reject, and request revision?
- Are human interventions, review time, rework, and exceptions measured?
- After an incident, is the return-to-service evidence explicit?
- Does the system preserve the meaning of underlying records when metrics roll up?

## Failure modes

| Failure | What it looks like | Correction |
| --- | --- | --- |
| Activity mistaken for value | Tokens, PRs, and lines rise while lead time to validated value and change failure worsen | Report only the coupled scorecard; ban volume metrics as targets |
| Bottleneck relocated | Implementation time falls, review queue grows, lead time unchanged | Stage-level lead-time breakdown; budget review attention |
| Proxy optimization | "PR merged" quietly stands in for customer value | Label proxies; keep the outcome clock separate |
| Automation bias | Reviewers accept polished summaries without inspecting evidence | Show counterevidence, uncertainty, and required drill-downs |
| Review theater | Human approval exists but the packet cannot support a decision | Define minimum independent evidence and decision options |
| Detail addiction | Every change receives the same line-by-line review | Risk-tier review; promote only proven workflow slices |
| Altitude lock-in | Leaders cannot reach records; engineers never see outcomes | Bidirectional traceability from metric to event and back |
| Stale trust | Autonomy stays high after model, context, repository, or provider change | Expiring qualification; event-driven recertification |
| Hidden human work | Manual cleanup excluded from automation metrics | Capture total attention, intervention, rework, and exception cost |
| Approval fatigue | Click-through speed rises, rejection rate falls, false escalations climb | Decision packets, sampling of Green work, tighter policy |
| Surveillance drift | Per-developer productivity dashboards appear | Measure workflows and systems only |
| False causality | Factory credited for gains that coincided with reorg or new tooling | Baselines, cohorts, medians and percentiles, experimental design |
| Wrong marginal call | Cheapest model chosen; retries and review erase the saving | Compare marginal cost with marginal value per validated change |
| Signal flood | Dozens of findings per PR; reviewers ignore all of them | Deduplicate, correlate, rank by severity and risk, surface the smallest decision-changing set; capture reviewer feedback |
| Budget as a bill | Cost known only from the monthly invoice; no run ever stopped | Enforce token, spend, tool-call, time, retry, and compute budgets in the harness; attribute by team, workflow, model, outcome |
| Reasoning where automation would do | Strong models on deterministic transformations | Route to scripts and mature skills; the best model for some tasks is none |
| Bottleneck unobserved | Cost, context, CI capacity, or trust degrades before anyone measures it | Four metric families, stage-level lead time, attribution before scale |
| Unit price optimised, waste untouched | Contract renegotiated or models downgraded while turns, requests, and tokens per session keep climbing | Decompose spend with the cost equation; eliminate zero-value tokens in the middle terms before touching price per token |
| Per-tool budgets | Separate caps for each tool or harness; engineers game the split or stall on one while another sits idle | One shared spend tier across a person's interactive harnesses; separate tiers only for managed agents |
| Caps that stop work | A hard spending cap halts a session mid-task; the governed path becomes the one that shuts off | Live cost counter, nudges at 50/80/100 percent, easy manager approval for a tier upgrade; caps only on Attempts, never on people |
| Throughput counted before verification | PRs opened or tasks completed reported as output; reverts and rework arrive later and are never subtracted | Report trusted throughput: accepted, verified outcomes per unit time and cost, counted after the observation window |
| Cost per task mistaken for cost per outcome | Spend per attempt falls while attempts per accepted outcome rise | Divide by accepted, verified outcomes only; a failed attempt inflates cost per task and never lowers cost per accepted outcome |
| Context paid for and unused | Large packages re-billed every turn while only a fraction influenced the result | Measure context efficiency; retrieve the minimum relevant context from the change upward |
| Autonomy reported as automation | A hundred correct agent PRs, each opened and approved by a human, reported as an automated workflow | Report the four dimensions together; count human touchpoints per accepted outcome and manual takeover rate |
| Budget in one kind at one level | Tokens are capped per task; a mission of two hundred tasks runs the team's monthly spend on the frontier tier | Seven kinds including model tier; five nested levels; stop, escalate, or request authorisation by policy |
| ROI without the improvement cost | The factory's return is computed against inference alone; the engineers who run the meta-loops and the opportunity cost are omitted | Ten cost lines including human review, failure remediation, and opportunity cost; ROI against the full cost of operating and improving |
| Quality capacity uncounted | Maintenance loops close hundreds of debt items and the dashboard shows no change because it counts features | Count latent quality capacity as a return; measure debt eliminated and accessibility, coverage, and hygiene trends |
| Next bottleneck unwatched | Implementation is automated and review is compressed; verification, context quality, and intent definition quietly become the queue | Bottleneck migration is expected; watch the stage-level breakdown for the stage after the one just automated |

## In Mission Control

Assessed at commit [`af414acf`](https://github.com/jaydubya818/MissionControl/tree/af414acfaa7ea793cb43de8ab2617f343d922f23) for metrics and [`d902fae`](https://github.com/jaydubya818/MissionControl/tree/d902fae7032c0696b531c44ae88829c652516fc6) for attention doctrine.

**Implemented.** Convex retains canonical Task events plus Mission, Plan, WorkOrder, Attempt, candidate, evidence, quality-gate, pull-request, audit, run, workflow, and cost records, preserving the governed chain from Mission and approved Plan through WorkOrder, Task, Attempt, candidate, independent evidence, quality-gate decision, and pull-request lineage. The effectiveness projection reports verified completion, autonomous completion, and cost per verified outcome, labelling provenance as observed, projected, or insufficient. The operator product exposes portfolio, Factory Health, analytics, trace inspection, WorkOrder, and evidence views. Durable lineage, duration and cost observations, verification state, human interventions, policy denials, retries, blocked work, and pending decisions are inspectable today, and Factory Configuration versions bound maximum cost, runtime, and attempts. Human decision rights, risk-proportional approvals, exception-first operator doctrine, and decision packets exist as doctrine and partial surfaces.

**Partial.** Cost per verified outcome is projected; model, provider, compute, sandbox, and human-attention attribution is incomplete. Release and production feedback are partial, so end-to-end lead time to a confirmed customer outcome is not proven across sustained real work. Change-failure measurement still needs complete production incident, rollback, hotfix, and observation-window correlation. Engineering leverage needs a comparable team baseline and human-attention evidence rather than activity or token proxies. Cohort reporting by risk, repository, workflow, autonomy level, and time window must preserve sample size, coverage, and confidence. Deployment, activation, and production verification are separate lifecycle states, and rollups must keep referencing the immutable records rather than an optimistic summary.

**Future.** Scoped Human Workflow Profiles, end-to-end attention accounting, and consented correction and attention events as structured learning signals are not established by the studied evidence.

The honest product statement: the immutable lineage and metric surfaces exist now; complete outcome economics and sustained production proof remain incomplete.

## Retain this

- The clock starts at governed intent and stops at confirmed customer value; merge is a waypoint.
- Measure speed, quality, economics, human outcomes, and factory intelligence together so one gain cannot hide another loss.
- Qualified human attention is the bottleneck; spend it on explicit decisions backed by evidence, not on activity feeds.
- Altitude is a range: move up when work is familiar and evaluated, and move down when it is novel, irreversible, or weakly evidenced.
- Trusted throughput means accepted, verified outcomes per unit of time and cost; generation volume is activity.

## Go deeper

- [Chapter 3 — First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md) for autonomy levels and quality as the acceleration engine; [Chapter 4 — The human–agent operating model](../02-design/04-the-human-agent-operating-model.md); [Chapter 7 — Governance](../02-design/07-governance-policy-and-risk-proportional-approval.md) for decision packets and risk bands
- [Chapter 21 — Models: routing, profiles, and capability selection](../03-build/21-models-and-capability-selection.md) for the marginal-cost model decision; [Chapter 23 — Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md) for orchestrator, worker, and validator roles; [Chapter 29 — Evaluation engineering](../04-prove/29-evaluation-engineering.md) for evaluated coverage; [Chapter 35 — Observability](../05-operate/35-observability-telemetry-and-forensics.md); [Chapter 40 — Governed learning and compounding engineering](../06-improve/40-governed-learning.md); [Chapter 43 — Mastering the factory](../06-improve/43-mastering-the-factory.md) for the five audiences
- Sources: Jay West, *AI Software Factory Mission* (Success Metrics; The Proof You Need to Produce; North Star); *AI Software Factory Study Guide* (ch. 10, Success Metrics and the executive framing); IndyDevDan, *Engineering Time, Focus and Attention* (the agentic operating level); Luke (Goose / Factory), *Multi-agent systems and the bottleneck of human attention*; Jay's platform notes on adoption metrics ("Factory in one line"); Jay West, factory architecture notes (token economics levers, budgets and stopping conditions, four metric families, what breaks first at scale, signal aggregation, the cost-per-token / cost-per-task / cost-per-accepted-outcome ladder, token and context efficiency, and trusted throughput as the factory's throughput measure)
- Public sources: Uber Engineering, *Running a Software Factory Efficiently at Uber Scale* (2026) for the six-term cost equation, spend tiers and nudges in place of caps, the session-analysis anti-patterns, and the published usage and unit-cost figures quoted above; *Six layers of a working agentic system* (public post, 2026) for cost dashboards a CFO can read as part of the runtime and operations layer; Warp, *Closing the loop with self-improving cloud software factories* (2026) for the core factory metrics — pull-request throughput, cost per pull request, automation percent as human touchpoints per pull request, savings over human work, and acceleration of shipped product; public practitioner talks, 2026, for the four factory dimensions and their dashboard, human touchpoints and manual takeover rate, the human leverage ratio, the expanded tokenomics definition and its thirteen levers, cost per verified outcome, cost prediction, execution budgets by kind and level, factory economics and factory ROI, bottleneck migration, latent quality capacity, and role fungibility
- Mission Control code at `af414acf`: `convex/schema.ts`, `convex/eos/projections.ts`, `convex/analytics.ts`, `convex/workflowMetrics.ts`, `convex/costEvents.ts`; `docs/product/software-factory-capability-maturity.md`; `docs/testing/evidence/production-factory-pilot-v3/README.md`; [Appendix C capability and admission map](../appendix/mission-control/03-capability-workflow-and-admission-map.md) at `d902fae`
- Background: *Team Topologies*; *The DevOps Handbook*; the Toyota Production System
- [Glossary](../appendix/glossary.md)
