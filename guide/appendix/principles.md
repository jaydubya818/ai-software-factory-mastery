---
title: Principles to have cold
part: appendix
chapter: null
summary: The guide's one-line principles, grouped by concern, each with a plain-English gloss and a link to the chapter that earns it.
---

# Appendix F. Principles to have cold

Every chapter in this guide argues for a handful of sentences. This appendix collects them in one place so a reader can carry them without the argument. Each principle is followed by one or two sentences of plain English and a link to the chapter that develops it. If a line here surprises you, that is the chapter to reread.

The principles are grouped by the concern they protect. Several appear in more than one chapter; they are listed once, under the concern where they matter most.

## The system, not the model

**The model is a component. The factory is the system.** Models change every quarter; the harness, context, tools, skills, evaluation, security, and learning around them are the durable asset. → [2. The factory in one view](../01-understand/02-the-factory-in-one-view.md)

**The model is a component. The platform is the product.** What you sell to builders is the governed lifecycle, not access to a model. → [27. The factory as a platform](../05-operate/27-the-factory-as-a-platform.md)

**Trust the system, not the model.** A model can be wrong; the system around it must still be deterministic about what happened, what was authorized, and how to recover. → [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md)

**The model doesn't own the workflow. The platform does.** The lifecycle from intent to production is owned by the factory; models operate inside it. → [11. Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md)

**Intent before execution. Platform owns the workflow. Durable execution. Trust at scale. Risk-based autonomy. Continuous intelligence.** The six themes of the book, in the order a factory encounters them. → [2. The factory in one view](../01-understand/02-the-factory-in-one-view.md)

**Agent Factory creates. Runtime executes. Knowledge grounds. Software Factory delivers. Mission Control governs.** Five systems, five responsibilities; blur them and ownership blurs with them. → [2. The factory in one view](../01-understand/02-the-factory-in-one-view.md)

**Do for agentic engineering what CI/CD did for build and delivery: turn individual practices into shared engineering infrastructure.** Repeatability gives measurement; measurement gives improvement. → [1. Why software engineering is changing](../01-understand/01-why-software-engineering-is-changing.md)

**Improve once, benefit everyone.** One team's better skill, context strategy, or evaluator becomes a capability for every builder. → [27. The factory as a platform](../05-operate/27-the-factory-as-a-platform.md)

**Don't just scale agents. Scale the system that makes their work trustworthy.** Generation was never the bottleneck for long. → [31. Enterprise adoption and the infrastructure landscape](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md)

## Intent and planning

**Planning converts ambiguous human intent into an executable contract.** Objective, constraints, context, acceptance criteria, and risk become a versioned plan, not transient reasoning. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**The planner is replaceable. The Plan is governed.** Whatever produced the plan, a human approves one exact revision and changes create a new one. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**An agent can help clarify intent. It cannot silently redefine intent.** Ambiguity that affects implementation or risk goes back to the builder. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**Never let an agent efficiently solve the wrong problem.** Separating intent understanding from planning is how you avoid it. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**Intent and policy exist before intelligence is applied.** The project constitution and the mission spec are in place before any planner reasons. → [5. Authoritative records](../02-design/05-authoritative-records.md)

**Important system rules should not depend on model memory.** Rules that agents may not reinterpret live in durable records, not in prompts. → [5. Authoritative records](../02-design/05-authoritative-records.md)

**Intelligence can recommend. Authority is granted separately.** Plan approval releases governed work orders; it does not dispatch execution by itself. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**Quality isn't inferred after generation. It's part of the execution contract.** The quality contract freezes how success is judged before any code is written. → [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)

## Harness and execution

**The model reasons. The harness controls.** The harness decides which model runs, what context it sees, which tools it may call, what state persists, and when it must stop. → [13. Coding harnesses and agent protocols](../03-build/13-coding-harnesses-and-agent-protocols.md)

**The harness turns probabilistic intelligence into bounded execution.** It is an execution boundary, not a loop around an LLM. → [13. Coding harnesses and agent protocols](../03-build/13-coding-harnesses-and-agent-protocols.md)

**The model is just weights. The harness is the agent.** Model capability and agent capability differ exactly by what the harness exposes; a better prompt cannot compensate for a missing capability. → [15. Agent architecture](../03-build/15-agent-architecture.md)

**Loop makes the work verifiable. Graph makes the workflow structured. Harness makes the model operational. Meta-harness makes many agent environments governable.** Diagnose a failure at its layer before touching the prompt or the model. → [15. Agent architecture](../03-build/15-agent-architecture.md)

**The loop stops when evidence says stop.** A goal condition such as "tests pass", never a step count and never the model's own belief that the work looks right. → [18. Agent and loop engineering](../03-build/18-agent-and-loop-engineering.md)

**The control plane manages the work. Workers execute the work.** Separate the intelligence doing the reasoning from the orchestration controlling the workflow. → [11. Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md)

**Use the lightest orchestration model that satisfies the workflow.** Orchestration earns its complexity only once work involves repositories, services, dependencies, and parallel branches. → [11. Control plane, orchestrator, and execution plane](../03-build/11-control-plane-orchestrator-and-execution-plane.md)

**Model context is not durable workflow state.** A multi-hour workflow that lives only in a context window or process memory is one crash from being lost. → [12. Durable execution](../03-build/12-durable-execution.md)

**Model context is not a transaction log.** Persist task state, attempts, checkpoints, budgets, and evidence outside the model. → [12. Durable execution](../03-build/12-durable-execution.md)

**Retry the intent, not the side effect.** An idempotency key tied to the logical operation lets a retry find the existing result instead of repeating the action. → [12. Durable execution](../03-build/12-durable-execution.md)

**Attempt identity may change. Logical-operation identity should not.** The orchestrator owns the key because it belongs to the task, not the worker. → [12. Durable execution](../03-build/12-durable-execution.md)

**The platform should know.** Recovery inspects persisted state; it never depends on asking the model what it remembers. → [12. Durable execution](../03-build/12-durable-execution.md)

**Model intelligence does not remove the need for distributed-systems correctness.** Fenced leases, idempotent transitions, and replay protection apply to agents exactly as to any worker. → [12. Durable execution](../03-build/12-durable-execution.md)

**Probabilistic intelligence doesn't justify probabilistic infrastructure.** A poor answer is a model failure; the platform must remain deterministic about what happened. → [29. Resilience, incidents, and the control tower](../05-operate/29-resilience-incidents-and-the-control-tower.md)

**Reproducibility requires freezing the execution environment, not saving the prompt.** Repository revision, harness, tools, policy, budget, and verifier are frozen before execution. → [14. Development environments, sandboxes, and compute](../03-build/14-development-environments-sandboxes-and-compute.md)

**Autonomy should come with narrower execution boundaries, not broader ambient access.** Treat autonomous execution like running untrusted code. → [14. Development environments, sandboxes, and compute](../03-build/14-development-environments-sandboxes-and-compute.md)

**Fast prototyping and strong guardrails aren't opposites if the guardrails are built into the environment.** The safe path has to be fast enough that nobody routes around it. → [14. Development environments, sandboxes, and compute](../03-build/14-development-environments-sandboxes-and-compute.md)

**If I can't reconstruct what ran, I can't reliably explain what failed.** A factory version is a reproducible execution configuration, not a label. → [28. Observability, telemetry, and forensics](../05-operate/28-observability-telemetry-and-forensics.md)

## Capabilities: agents, skills, tools, models

**An enterprise agent needs a contract, not just a prompt.** An agent definition is a versioned capability contract; the model underneath may change while the contract stays stable. → [10. The Agent Factory](../03-build/10-the-agent-factory.md)

**A skill is a versioned capability, not just a prompt.** Purpose, allowed tools, inputs and outputs, evaluation suite, owner, and version travel together. → [10. The Agent Factory](../03-build/10-the-agent-factory.md)

**The model thinks. The tool acts. The skill packages reusable behavior. The harness controls execution.** Four roles that are easy to conflate and expensive to confuse. → [10. The Agent Factory](../03-build/10-the-agent-factory.md)

**Reason where reasoning creates value. Automate where behavior becomes deterministic.** The best factory does not maximize AI; it progressively removes unnecessary uncertainty. → [18. Agent and loop engineering](../03-build/18-agent-and-loop-engineering.md)

**Agent count is an architectural cost, not a feature.** Every extra agent adds coordination, latency, shared-state problems, and debugging difficulty. → [18. Agent and loop engineering](../03-build/18-agent-and-loop-engineering.md)

**Multi-agent is a means, not the product.** Add an agent at a real boundary of permission, context, capability, parallelism, or independence, not to build a virtual org chart. → [18. Agent and loop engineering](../03-build/18-agent-and-loop-engineering.md)

**MCP standardizes connectivity. It doesn't outsource governance.** Identity, authorization, scope, validation, and audit remain the factory's job behind any tool interface. → [15. Agent architecture](../03-build/15-agent-architecture.md)

**MCP is an interoperability decision, not a religion.** Decide on reuse, discovery, governance, latency, and operating cost; stable high-throughput services may keep direct APIs. → [15. Agent architecture](../03-build/15-agent-architecture.md)

**The moment a model gets a tool, intelligence becomes authority.** That is why tool access is scoped to the task and enforced outside the model. → [15. Agent architecture](../03-build/15-agent-architecture.md)

**Models are capabilities, not architecture.** Workflows request reasoning, context size, tool use, latency, eligibility, and cost, never a vendor name. → [17. Models: routing, profiles, and capability selection](../03-build/17-models-routing-and-capability-selection.md)

**Without evaluation, model independence is architecture theater.** Switching models requires re-evaluation and tuning; adapters alone prove nothing. → [17. Models: routing, profiles, and capability selection](../03-build/17-models-routing-and-capability-selection.md)

**The best model for some tasks is no model at all.** Routing may legitimately choose a deterministic service or skill. → [17. Models: routing, profiles, and capability selection](../03-build/17-models-routing-and-capability-selection.md)

**Language choice is per subsystem, not ideological.** Pick the runtime that fits the layer's job. → [19. The 12-layer production AI agent stack](../03-build/19-the-12-layer-production-ai-agent-stack.md)

## Context

**Context is a governed input, not everything we can fit into the window.** The goal is the minimum high-quality, relevant, permission-aware, attributable context for this step. → [16. Data, knowledge, semantic, and context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md)

**Enterprise context is relevant, authoritative, fresh, permission-aware, and attributable.** A grounded answer on obsolete documents is still wrong; a relevant answer on unauthorized data is worse. → [16. Data, knowledge, semantic, and context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md)

**Retrieval is a permissions, provenance, freshness, and evaluation problem as much as search.** Vector search is the easy part. → [16. Data, knowledge, semantic, and context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md)

**Context should inform execution, not rewrite the contract.** Retrieved material cannot change the approved mission or plan. → [16. Data, knowledge, semantic, and context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md)

**Durable memory is promoted deliberately.** Never let every previous model output silently become permanent truth. → [15. Agent architecture](../03-build/15-agent-architecture.md)

## Evaluation and evidence

**Generation is cheap. Evidence is what creates trust.** The producing agent is never the only evaluator of its own work. → [21. Quality and evidence architecture](../04-prove/21-quality-and-evidence-architecture.md)

**Independence is part of the trust model.** Verification runs as a separate attempt against the artifact. → [21. Quality and evidence architecture](../04-prove/21-quality-and-evidence-architecture.md)

**"I'm done" is an event, not evidence.** Harness completion is a signal that verification can begin. → [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)

**A Candidate is an output, not a success declaration.** It is exactly what execution produced: not correct, not verified, not accepted. → [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)

**Verification belongs to the artifact, not the agent's confidence.** Evidence maps to the original acceptance criteria and to one exact candidate. → [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)

**Evidence should come from the system performing the check, not from the system being checked.** "Tests passed" is a claim; the recorded result tied to the candidate is evidence. → [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)

**Passing verification on commit A doesn't authorize merge of commit B.** Verified once does not mean verified forever; currentness binds evidence to the pull request head. → [24. Quality contracts, proof packages, and certificates](../04-prove/24-quality-contracts-proof-packages-and-certificates.md)

**Evaluation starts before promotion and continues after deployment.** Offline in CI, inline against deployed behavior, and operationally for drift, safety, and cost. → [23. Evaluation engineering](../04-prove/23-evaluation-engineering.md)

**Trust isn't certified once; it's continuously measured.** An agent that passed every pre-release test degrades when models, context, tools, or users change. → [23. Evaluation engineering](../04-prove/23-evaluation-engineering.md)

**Never optimize against a judge you haven't validated.** Calibrate model graders against human labels and segment results by task class, risk, and release. → [23. Evaluation engineering](../04-prove/23-evaluation-engineering.md)

**Without a stable baseline, improvement becomes anecdotal.** The golden evaluation set is the first thing to build. → [23. Evaluation engineering](../04-prove/23-evaluation-engineering.md)

**Without observability, evaluation isn't debuggable. Without evaluation, observability is just telemetry.** Observability says what happened; evaluation says whether it was good enough. → [28. Observability, telemetry, and forensics](../05-operate/28-observability-telemetry-and-forensics.md)

**Continuous evaluation is only useful if you can attribute what changed.** Lineage across agent definition, model, skill, context, and tool versions is how you find the component that drifted. → [28. Observability, telemetry, and forensics](../05-operate/28-observability-telemetry-and-forensics.md)

**Metrics can inform authority. They should not quietly become authority.** A dashboard score never accepts a work order. → [28. Observability, telemetry, and forensics](../05-operate/28-observability-telemetry-and-forensics.md)

**Tests answer deterministic questions; evals cover probabilistic behavior.** They are additive, not alternatives. → [22. Testing strategy for agentic change](../04-prove/22-testing-strategy-for-agentic-change.md)

## Authority, risk, and human attention

**Scale trust, not human review.** Human review cannot grow linearly with generated code; risk-tiered autonomy is the alternative. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**Review depth should be proportional to risk, not to the fact that AI generated the change.** Classify by blast radius, reversibility, sensitivity, novelty, and verification strength. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**Autonomy should scale with reversibility, not confidence.** The question is "what happens if this is wrong, and how easily can we reverse it?" → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**The model proposes. Policy authorizes.** The model proposes the action; the platform decides whether it is allowed. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**A model can reason about authority. It should never grant itself authority.** Authorization is server-side, deterministic, and fail-closed. → [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md)

**Correctness and authority are separate concerns.** Verification asks whether the artifact meets the contract; acceptance asks whether we authorize progression. → [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md)

**Agents propose and execute. Deterministic systems validate and govern. Humans retain decisions whose consequences require judgment or authority.** The responsibility model in one line. → [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md)

**The human shouldn't compensate for missing automation.** Give reviewers the plan, diff, risk class, evidence, and policy decisions, not an approve button. → [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md)

**Execution completed ≠ verification passed ≠ acceptance ≠ merge ≠ production verified.** Each transition needs its own evidence and its own authority. → [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md)

**Code complete is not factory complete.** Merge, deployment, activation, and production verification are distinct stages. → [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md)

**A truthful blocked state is better than a false success.** When resumption is unsafe, stop, preserve evidence, and escalate. → [29. Resilience, incidents, and the control tower](../05-operate/29-resilience-incidents-and-the-control-tower.md)

**Governance can't become a relationship business.** Exceptions are time-boxed, auditable waivers; the same waiver recurring means a bad policy or a missing capability. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**The scarce resource isn't agents. It's human attention.** Surfaces are exception-first: what is blocked, stale, over budget, or ready for a decision. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Maximum decision quality per unit of human attention, not maximum signal volume.** A hundred and fifty warnings per pull request means all of them are ignored. → [32. Production feedback, automated review, and the agentic merge queue](../06-improve/32-production-feedback-review-and-the-agentic-merge-queue.md)

## Security

**Probabilistic reasoning should never imply probabilistic authorization.** Identity, permissions, scope, and credentials are enforced outside the model. → [26. Security](../04-prove/26-security.md)

**Content cannot grant authority.** A hostile document can change what the model wants to do, never what it is permitted to do. → [26. Security](../04-prove/26-security.md)

**The agent's permissions should never expand because of something it reads.** A successful injection becomes a wasted run, not a security incident. → [26. Security](../04-prove/26-security.md)

**Security can't be an approval meeting at the end; it's part of the execution contract.** Workload identity, least privilege, isolation, short-lived credentials, and egress control ship with every run. → [26. Security](../04-prove/26-security.md)

## Learning

**Learning can be autonomous. Promotion should be governed.** Discovery may propose freely; promotion passes baseline comparison, regression evaluation, policy checks, and controlled rollout. → [33. Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md)

**Autonomous discovery, not autonomous authority.** Improvements return through a new mission and a governed plan. → [33. Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md)

**Sophisticated optimization against noisy or poorly attributed feedback learns the wrong thing faster.** The upstream problem is trustworthy learning signals from real workflows. → [33. Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md)

**You can't operate a learning system safely if you can't reconstruct which version learned what.** Explicit versions everywhere; never silent mutation. → [33. Governed learning and compounding engineering](../06-improve/33-governed-learning-and-compounding-engineering.md)

**A production failure should make the platform harder to fail the same way twice.** Every meaningful failure becomes a regression scenario, a stronger evaluator, or a tighter policy. → [29. Resilience, incidents, and the control tower](../05-operate/29-resilience-incidents-and-the-control-tower.md)

## Delivery and scale

**Cost per outcome, never cost per token.** Tokenomics is an architecture discipline: spend is users × sessions × turns × requests × tokens × price; grow the first two, shrink the middle three, choose the last. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**An ungrounded agent fails slowly rather than cheaply.** Richer context up front is the strongest lever on turns and requests; ground first, then reason. → [16. Data, knowledge, semantic, and context engineering](../03-build/16-data-knowledge-semantic-and-context-engineering.md)

**Benchmark the agent's own work, then move to the Pareto-optimal model and keep moving.** The frontier shifts every few weeks; hold the model constant to measure your own gains. → [17. Models: routing, profiles, and capability selection](../03-build/17-models-routing-and-capability-selection.md)

**The prototype shouldn't need to be rewritten to become trustworthy.** Productionizing raises the evidence and operational bar; it does not rebuild. → [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md)

**If a product manager can prototype in fifteen minutes but engineers need two weeks to reconstruct everything, we've only moved the bottleneck.** Prototype-to-production continuity is a platform property. → [27. The factory as a platform](../05-operate/27-the-factory-as-a-platform.md)

**The safest paved road also needs to be the fastest paved road.** Adoption cannot be mandated; the paved road must beat the workaround. → [27. The factory as a platform](../05-operate/27-the-factory-as-a-platform.md)

**The factory shouldn't replace CI/CD. It should make CI/CD agent-aware and outcome-aware.** Generated change flows through the existing supply chain; the factory adds evidence, risk, and learning. → [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md)

**The next generation of CI/CD is continuous evidence.** Pipelines stop being a gate and become a source of proof. → [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md)

**Speed comes from making changes observable and reversible, not from eliminating controls.** Qualify, release narrowly, evaluate inline, expand or roll back. → [25. CI/CD, progressive delivery, and production verification](../04-prove/25-cicd-progressive-delivery-and-production-verification.md)

**Cost per trusted outcome, not cost per token.** A cheaper model that needs three attempts and an hour of senior rework is the expensive option. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Economics should influence architecture continuously, not arrive as a surprise on the monthly bill.** Budgets and stopping conditions are execution controls and routing feedback. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Generation volume is an activity metric. Trusted outcomes are the product metric.** Measure accepted outcomes, rework, escaped defects, and policy violations, not lines or prompts. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Centralize undifferentiated complexity. Federate differentiated expertise.** Domain teams own their workflows; the platform owns what every team would otherwise rebuild. → [27. The factory as a platform](../05-operate/27-the-factory-as-a-platform.md)

**Common platform, differentiated product behavior.** Multi-tenancy scopes identity, data, resources, and memory without forking the platform. → [27. The factory as a platform](../05-operate/27-the-factory-as-a-platform.md)

**Multiple experiences should converge on one execution contract.** CLI, IDE, API, or agent-to-agent, the durable concepts are the same. → [30. Control surfaces, event contracts, and storage](../05-operate/30-control-surfaces-event-contracts-and-storage.md)

**A gravity well, not a migration mandate.** Existing agents adopt the gateway, then evaluation, then observability, then governed tools, as each proves its value. → [31. Enterprise adoption and the infrastructure landscape](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md)

**Forward deployment accelerates the path to self-service, not replaces it.** The same integration solved three times is a missing platform capability. → [31. Enterprise adoption and the infrastructure landscape](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md)

**Build where you need durable leverage; adopt where abstraction preserves optionality.** Own the control plane and the differentiating intelligence; adopt commodity infrastructure. → [31. Enterprise adoption and the infrastructure landscape](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md)

**The bottleneck will keep moving; design the factory to see where it moves next.** Cost, context, supply-chain capacity, and trust break first at scale. → [31. Enterprise adoption and the infrastructure landscape](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md)

**The technical system may recover from a failure faster than developer trust does.** One destructive change or one noisy reviewer undoes months. → [31. Enterprise adoption and the infrastructure landscape](../05-operate/31-enterprise-adoption-and-the-infrastructure-landscape.md)

**The platform should increase engineering capability, not merely coding throughput.** Findings explain the boundary, the risk, and the evidence, so tools teach while they execute. → [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md)

**Don't generalize before you've earned the abstraction.** Swarms, adaptive routing, universal memory, and hundreds of skills are hypotheses until production evidence exists. → [35. Mastering the factory](../06-improve/35-mastering-the-factory.md)

**Build for the next proof point without painting yourself into the next architecture.** Protect the seams that matter later: identity, interfaces, policy, evidence, evaluation, versioning. → [35. Mastering the factory](../06-improve/35-mastering-the-factory.md)

**One complete workflow exposing real weaknesses beats ten disconnected demos.** Prove one end-to-end path with design partners first. → [35. Mastering the factory](../06-improve/35-mastering-the-factory.md)

**The patterns transfer. The implementation has to be yours.** Understand what exists before reorganizing it. → [35. Mastering the factory](../06-improve/35-mastering-the-factory.md)

**Own the coherence of the system, not every line of implementation.** The leader's job is principles, boundaries, contracts, and adoption. → [35. Mastering the factory](../06-improve/35-mastering-the-factory.md)

**The next generation will be judged by how much trustworthy change a platform can move from human intent to production without scaling human effort linearly with it.** The closing measure of the whole book. → [36. Where this is going](../06-improve/36-where-this-is-going.md)

## Mission Control

**The goal isn't autonomous coding; it's governed autonomous software delivery.** Mission Control exists to make increased autonomy operationally trustworthy, not maximal. → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**More agents without a control plane create more coordination, not necessarily more throughput.** Without one, the human becomes the scheduler. → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**A chat interface scales conversations. A software factory scales governed work.** → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**The harness executes. Mission Control governs.** Coding harnesses remain replaceable execution backends beneath a durable authority and evidence layer. → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**The coding agent is replaceable. The governed delivery contract isn't.** → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**The harness performs the work. The factory produces trusted change. Mission Control governs authority and attention.** Three layers, three jobs. → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**The Agent Factory creates reusable intelligence. Mission Control governs how that intelligence becomes production work.** → [10. The Agent Factory](../03-build/10-the-agent-factory.md)

**When autonomy increases, the surrounding system has to become more explicit about authority and evidence, not less.** What was authorized, what ran, what changed, what proved it, is the proof current, and who may move it forward. → [34. Mission Control as a living case study](../06-improve/34-mission-control-as-a-living-case-study.md)

**Mission Control isn't trying to make agents maximally autonomous. It's trying to make increased autonomy operationally trustworthy.** → [Appendix C. Mission Control case studies](./mission-control/01-implementation-maturity-and-evidence-map.md)

For the terms these principles rely on, see the [glossary](./glossary.md).
