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

**The model is a component. The platform is the product.** What you sell to builders is the governed lifecycle, not access to a model. → [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md)

**Trust the system, not the model.** A model can be wrong; the system around it must still be deterministic about what happened, what was authorized, and how to recover. → [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md)

**The model doesn't own the workflow. The platform does.** The lifecycle from intent to production is owned by the factory; models operate inside it. → [13. Control plane, orchestrator, and execution plane](../03-build/13-control-plane-orchestrator-and-execution-plane.md)

**Intent before execution. Platform owns the workflow. Durable execution. Trust at scale. Risk-based autonomy. Continuous intelligence.** The six themes of the book, in the order a factory encounters them. → [2. The factory in one view](../01-understand/02-the-factory-in-one-view.md)

**Agent Factory creates. Runtime executes. Knowledge grounds. Software Factory delivers. Mission Control governs.** Five systems, five responsibilities; blur them and ownership blurs with them. → [2. The factory in one view](../01-understand/02-the-factory-in-one-view.md)

**Do for agentic engineering what CI/CD did for build and delivery: turn individual practices into shared engineering infrastructure.** Repeatability gives measurement; measurement gives improvement. → [1. Why software engineering is changing](../01-understand/01-why-software-engineering-is-changing.md)

**Improve once, benefit everyone.** One team's better skill, context strategy, or evaluator becomes a capability for every builder. → [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md)

**Don't just scale agents. Scale the system that makes their work trustworthy.** Generation was never the bottleneck for long. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

## Intent and planning

**Planning converts ambiguous human intent into an executable contract.** Objective, constraints, context, acceptance criteria, and risk become a versioned plan, not transient reasoning. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**The planner is replaceable. The Plan is governed.** Whatever produced the plan, a human approves one exact revision and changes create a new one. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**An agent can help clarify intent. It cannot silently redefine intent.** Ambiguity that affects implementation or risk goes back to the builder. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**Never let an agent efficiently solve the wrong problem.** Separating intent understanding from planning is how you avoid it. → [6. Intent and specification engineering](../02-design/06-intent-and-specification-engineering.md)

**Intent and policy exist before intelligence is applied.** The project constitution and the mission spec are in place before any planner reasons. → [5. Authoritative records](../02-design/05-authoritative-records.md)

**Important system rules should not depend on model memory.** Rules that agents may not reinterpret live in durable records, not in prompts. → [5. Authoritative records](../02-design/05-authoritative-records.md)

**Intelligence can recommend. Authority is granted separately.** Plan approval releases governed work orders; it does not dispatch execution by itself. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**Quality isn't inferred after generation. It's part of the execution contract.** The quality contract freezes how success is judged before any code is written. → [31. Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

## Harness and execution

**The model reasons. The harness controls.** The harness decides which model runs, what context it sees, which tools it may call, what state persists, and when it must stop. → [15. Coding harnesses and agent protocols](../03-build/15-coding-harnesses-and-agent-protocols.md)

**The harness turns probabilistic intelligence into bounded execution.** It is an execution boundary, not a loop around an LLM. → [15. Coding harnesses and agent protocols](../03-build/15-coding-harnesses-and-agent-protocols.md)

**Frameworks change. The harness, the graph, and the feedback loops remain.** Every production agent is one diagram: a harness around a six-node execution graph, a bounded loop, memory, a tool gateway, a trust rail, and an observability floor. → [15. Coding harnesses and agent protocols](../03-build/15-coding-harnesses-and-agent-protocols.md)

**The model is just weights. The harness is the agent.** Model capability and agent capability differ exactly by what the harness exposes; a better prompt cannot compensate for a missing capability. → [18. Agent architecture](../03-build/18-agent-architecture.md)

**Loop makes the work verifiable. Graph makes the workflow structured. Harness makes the model operational. Meta-harness makes many agent environments governable.** Diagnose a failure at its layer before touching the prompt or the model. → [18. Agent architecture](../03-build/18-agent-architecture.md)

**The loop stops when evidence says stop.** A goal condition such as "tests pass", never a step count and never the model's own belief that the work looks right. → [23. Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md)

**The control plane manages the work. Workers execute the work.** Separate the intelligence doing the reasoning from the orchestration controlling the workflow. → [13. Control plane, orchestrator, and execution plane](../03-build/13-control-plane-orchestrator-and-execution-plane.md)

**Use the lightest orchestration model that satisfies the workflow.** Orchestration earns its complexity only once work involves repositories, services, dependencies, and parallel branches. → [13. Control plane, orchestrator, and execution plane](../03-build/13-control-plane-orchestrator-and-execution-plane.md)

**Model context is not durable workflow state.** A multi-hour workflow that lives only in a context window or process memory is one crash from being lost. → [14. Durable execution](../03-build/14-durable-execution.md)

**Model context is not a transaction log.** Persist task state, attempts, checkpoints, budgets, and evidence outside the model. → [14. Durable execution](../03-build/14-durable-execution.md)

**Retry the intent, not the side effect.** An idempotency key tied to the logical operation lets a retry find the existing result instead of repeating the action. → [14. Durable execution](../03-build/14-durable-execution.md)

**Attempt identity may change. Logical-operation identity should not.** The orchestrator owns the key because it belongs to the task, not the worker. → [14. Durable execution](../03-build/14-durable-execution.md)

**The platform should know.** Recovery inspects persisted state; it never depends on asking the model what it remembers. → [14. Durable execution](../03-build/14-durable-execution.md)

**Model intelligence does not remove the need for distributed-systems correctness.** Fenced leases, idempotent transitions, and replay protection apply to agents exactly as to any worker. → [14. Durable execution](../03-build/14-durable-execution.md)

**Probabilistic intelligence doesn't justify probabilistic infrastructure.** A poor answer is a model failure; the platform must remain deterministic about what happened. → [36. Resilience, incidents, and the control tower](../05-operate/36-resilience-incidents-and-the-control-tower.md)

**Reproducibility requires freezing the execution environment, not saving the prompt.** Repository revision, harness, tools, policy, budget, and verifier are frozen before execution. → [17. Development environments, sandboxes, and compute](../03-build/17-development-environments-sandboxes-and-compute.md)

**Autonomy should come with narrower execution boundaries, not broader ambient access.** Treat autonomous execution like running untrusted code. → [17. Development environments, sandboxes, and compute](../03-build/17-development-environments-sandboxes-and-compute.md)

**Fast prototyping and strong guardrails aren't opposites if the guardrails are built into the environment.** The safe path has to be fast enough that nobody routes around it. → [17. Development environments, sandboxes, and compute](../03-build/17-development-environments-sandboxes-and-compute.md)

**If I can't reconstruct what ran, I can't reliably explain what failed.** A factory version is a reproducible execution configuration, not a label. → [35. Observability, telemetry, and forensics](../05-operate/35-observability-telemetry-and-forensics.md)

## Capabilities: agents, skills, tools, models

**An enterprise agent needs a contract, not just a prompt.** An agent definition is a versioned capability contract; the model underneath may change while the contract stays stable. → [11. The Agent Factory](../03-build/11-the-agent-factory.md)

**A skill is a versioned capability, not just a prompt.** Purpose, allowed tools, inputs and outputs, evaluation suite, owner, and version travel together. → [11. The Agent Factory](../03-build/11-the-agent-factory.md)

**The model thinks. The tool acts. The skill packages reusable behavior. The harness controls execution.** Four roles that are easy to conflate and expensive to confuse. → [11. The Agent Factory](../03-build/11-the-agent-factory.md)

**Reason where reasoning creates value. Automate where behavior becomes deterministic.** The best factory does not maximize AI; it progressively removes unnecessary uncertainty. → [23. Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md)

**Agent count is an architectural cost, not a feature.** Every extra agent adds coordination, latency, shared-state problems, and debugging difficulty. → [23. Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md)

**Multi-agent is a means, not the product.** Add an agent at a real boundary of permission, context, capability, parallelism, or independence, not to build a virtual org chart. → [23. Agent and loop engineering](../03-build/23-agent-and-loop-engineering.md)

**MCP standardizes connectivity. It doesn't outsource governance.** Identity, authorization, scope, validation, and audit remain the factory's job behind any tool interface. → [18. Agent architecture](../03-build/18-agent-architecture.md)

**MCP is an interoperability decision, not a religion.** Decide on reuse, discovery, governance, latency, and operating cost; stable high-throughput services may keep direct APIs. → [18. Agent architecture](../03-build/18-agent-architecture.md)

**The moment a model gets a tool, intelligence becomes authority.** That is why tool access is scoped to the task and enforced outside the model. → [18. Agent architecture](../03-build/18-agent-architecture.md)

**Models are capabilities, not architecture.** Workflows request reasoning, context size, tool use, latency, eligibility, and cost, never a vendor name. → [21. Models: routing, profiles, and capability selection](../03-build/21-models-and-capability-selection.md)

**Without evaluation, model independence is architecture theater.** Switching models requires re-evaluation and tuning; adapters alone prove nothing. → [21. Models: routing, profiles, and capability selection](../03-build/21-models-and-capability-selection.md)

**The best model for some tasks is no model at all.** Routing may legitimately choose a deterministic service or skill. → [21. Models: routing, profiles, and capability selection](../03-build/21-models-and-capability-selection.md)

**Language choice is per subsystem, not ideological.** Pick the runtime that fits the layer's job. → [25. The 12-layer production AI agent stack](../03-build/25-the-12-layer-production-ai-agent-stack.md)

## Context

**Context is a governed input, not everything we can fit into the window.** The goal is the minimum high-quality, relevant, permission-aware, attributable context for this step. → [20. Context engineering](../03-build/20-context-engineering.md)

**Enterprise context is relevant, authoritative, fresh, permission-aware, and attributable.** A grounded answer on obsolete documents is still wrong; a relevant answer on unauthorized data is worse. → [20. Context engineering](../03-build/20-context-engineering.md)

**Retrieval is a permissions, provenance, freshness, and evaluation problem as much as search.** Vector search is the easy part. → [20. Context engineering](../03-build/20-context-engineering.md)

**Context should inform execution, not rewrite the contract.** Retrieved material cannot change the approved mission or plan. → [20. Context engineering](../03-build/20-context-engineering.md)

**Durable memory is promoted deliberately.** Never let every previous model output silently become permanent truth. → [18. Agent architecture](../03-build/18-agent-architecture.md)

## Evaluation and evidence

**Generation is cheap. Evidence is what creates trust.** The producing agent is never the only evaluator of its own work. → [27. Quality and evidence architecture](../04-prove/27-quality-and-evidence-architecture.md)

**Independence is part of the trust model.** Verification runs as a separate attempt against the artifact. → [27. Quality and evidence architecture](../04-prove/27-quality-and-evidence-architecture.md)

**"I'm done" is an event, not evidence.** Harness completion is a signal that verification can begin. → [31. Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

**A Candidate is an output, not a success declaration.** It is exactly what execution produced: not correct, not verified, not accepted. → [31. Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

**Verification belongs to the artifact, not the agent's confidence.** Evidence maps to the original acceptance criteria and to one exact candidate. → [31. Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

**Evidence should come from the system performing the check, not from the system being checked.** "Tests passed" is a claim; the recorded result tied to the candidate is evidence. → [31. Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

**Passing verification on commit A doesn't authorize merge of commit B.** Verified once does not mean verified forever; currentness binds evidence to the pull request head. → [31. Quality contracts, proof packages, and certificates](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

**Evaluation starts before promotion and continues after deployment.** Offline in CI, inline against deployed behavior, and operationally for drift, safety, and cost. → [30. Evals as factory assets](../04-prove/30-evals-as-factory-assets.md)

**Trust isn't certified once; it's continuously measured.** An agent that passed every pre-release test degrades when models, context, tools, or users change. → [30. Evals as factory assets](../04-prove/30-evals-as-factory-assets.md)

**Never optimize against a judge you haven't validated.** Calibrate model graders against human labels and segment results by task class, risk, and release. → [29. Evaluation engineering](../04-prove/29-evaluation-engineering.md)

**Without a stable baseline, improvement becomes anecdotal.** The golden evaluation set is the first thing to build. → [29. Evaluation engineering](../04-prove/29-evaluation-engineering.md)

**Without observability, evaluation isn't debuggable. Without evaluation, observability is just telemetry.** Observability says what happened; evaluation says whether it was good enough. → [35. Observability, telemetry, and forensics](../05-operate/35-observability-telemetry-and-forensics.md)

**Continuous evaluation is only useful if you can attribute what changed.** Lineage across agent definition, model, skill, context, and tool versions is how you find the component that drifted. → [35. Observability, telemetry, and forensics](../05-operate/35-observability-telemetry-and-forensics.md)

**Metrics can inform authority. They should not quietly become authority.** A dashboard score never accepts a work order. → [35. Observability, telemetry, and forensics](../05-operate/35-observability-telemetry-and-forensics.md)

**Tests answer deterministic questions; evals cover probabilistic behavior.** They are additive, not alternatives. → [28. Testing strategy for agentic change](../04-prove/28-testing-strategy-for-agentic-change.md)

**Producer ≠ verifier.** The configuration under test never owns, tunes, or sees the instrument that scores it, and production outcome is the final grader that re-anchors every proxy. → [29. Evaluation engineering](../04-prove/29-evaluation-engineering.md)

**A mature factory never returns just "done".** It returns what changed → why → by whom or what → using which context, tools, and models → what was verified → what evidence supports acceptance. → [35. Observability, telemetry, and forensics](../05-operate/35-observability-telemetry-and-forensics.md)

## Authority, risk, and human attention

**Scale trust, not human review.** Human review cannot grow linearly with generated code; risk-tiered autonomy is the alternative. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**Review depth should be proportional to risk, not to the fact that AI generated the change.** Classify by blast radius, reversibility, sensitivity, novelty, and verification strength. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**Autonomy should scale with reversibility, not confidence.** The question is "what happens if this is wrong, and how easily can we reverse it?" → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**The model proposes. Policy authorizes.** The model proposes the action; the platform decides whether it is allowed. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**A model can reason about authority. It should never grant itself authority.** Authorization is server-side, deterministic, and fail-closed. → [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md)

**Correctness and authority are separate concerns.** Verification asks whether the artifact meets the contract; acceptance asks whether we authorize progression. → [3. First principles](../01-understand/03-first-principles-trust-evidence-and-authority.md)

**Agents propose and execute. Deterministic systems validate and govern. Humans retain decisions whose consequences require judgment or authority.** The responsibility model in one line. → [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md)

**The human shouldn't compensate for missing automation.** Give reviewers the plan, diff, risk class, evidence, and policy decisions, not an approve button. → [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md)

**Execution completed ≠ verification passed ≠ acceptance ≠ merge ≠ production verified.** Each transition needs its own evidence and its own authority. → [32. CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)

**Code complete is not factory complete.** Merge, deployment, activation, and production verification are distinct stages. → [32. CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)

**A truthful blocked state is better than a false success.** When resumption is unsafe, stop, preserve evidence, and escalate. → [36. Resilience, incidents, and the control tower](../05-operate/36-resilience-incidents-and-the-control-tower.md)

**Governance can't become a relationship business.** Exceptions are time-boxed, auditable waivers; the same waiver recurring means a bad policy or a missing capability. → [7. Governance, policy, and risk-proportional approval](../02-design/07-governance-policy-and-risk-proportional-approval.md)

**The scarce resource isn't agents. It's human attention.** Surfaces are exception-first: what is blocked, stale, over budget, or ready for a decision. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Maximum decision quality per unit of human attention, not maximum signal volume.** A hundred and fifty warnings per pull request means all of them are ignored. → [39. Production feedback, automated review, and the agentic merge queue](../06-improve/39-production-feedback-review-and-the-agentic-merge-queue.md)

## Security

**Probabilistic reasoning should never imply probabilistic authorization.** Identity, permissions, scope, and credentials are enforced outside the model. → [33. Security](../04-prove/33-security.md)

**Content cannot grant authority.** A hostile document can change what the model wants to do, never what it is permitted to do. → [33. Security](../04-prove/33-security.md)

**The agent's permissions should never expand because of something it reads.** A successful injection becomes a wasted run, not a security incident. → [33. Security](../04-prove/33-security.md)

**Security can't be an approval meeting at the end; it's part of the execution contract.** Workload identity, least privilege, isolation, short-lived credentials, and egress control ship with every run. → [33. Security](../04-prove/33-security.md)

**An agent can be intelligent without being trusted; the sandbox defines what intelligence is allowed to affect.** The isolation model is a written table of default-deny policy dimensions, and competence never widens it. → [17. Development environments, sandboxes, and compute](../03-build/17-development-environments-sandboxes-and-compute.md)

## Learning

**Learning can be autonomous. Promotion should be governed.** Discovery may propose freely; promotion passes baseline comparison, regression evaluation, policy checks, and controlled rollout. → [40. Governed learning and compounding engineering](../06-improve/40-governed-learning.md)

**Autonomous discovery, not autonomous authority.** Improvements return through a new mission and a governed plan. → [40. Governed learning and compounding engineering](../06-improve/40-governed-learning.md)

**Sophisticated optimization against noisy or poorly attributed feedback learns the wrong thing faster.** The upstream problem is trustworthy learning signals from real workflows. → [40. Governed learning and compounding engineering](../06-improve/40-governed-learning.md)

**You can't operate a learning system safely if you can't reconstruct which version learned what.** Explicit versions everywhere; never silent mutation. → [40. Governed learning and compounding engineering](../06-improve/40-governed-learning.md)

**A production failure should make the platform harder to fail the same way twice.** Every meaningful failure becomes a regression scenario, a stronger evaluator, or a tighter policy. → [36. Resilience, incidents, and the control tower](../05-operate/36-resilience-incidents-and-the-control-tower.md)

**Execute → Observe → Evaluate → Learn → Propose → Verify → Promote, never Execute → rewrite production.** A candidate improvement earns nothing until regression, shadow, A/B, and canary make it a controlled one. → [41. Meta-loops and the closed-loop factory](../06-improve/41-meta-loops-and-the-closed-loop-factory.md)

**Never jump straight to training.** Climb the adaptation ladder (rules → retrieval → prompt → skill → routing → fine-tuning → preference optimisation) one rung at a time, with evidence that the rung below was not enough. → [41. Meta-loops and the closed-loop factory](../06-improve/41-meta-loops-and-the-closed-loop-factory.md)

## Delivery and scale

**Cost per outcome, never cost per token.** Tokenomics is an architecture discipline: spend is users × sessions × turns × requests × tokens × price; grow the first two, shrink the middle three, choose the last. → [9. Tokenomics and factory economics](../02-design/09-tokenomics-and-factory-economics.md)

**An ungrounded agent fails slowly rather than cheaply.** Richer context up front is the strongest lever on turns and requests; ground first, then reason. → [20. Context engineering](../03-build/20-context-engineering.md)

**Benchmark the agent's own work, then move to the Pareto-optimal model and keep moving.** The frontier shifts every few weeks; hold the model constant to measure your own gains. → [21. Models: routing, profiles, and capability selection](../03-build/21-models-and-capability-selection.md)

**The prototype shouldn't need to be rewritten to become trustworthy.** Productionizing raises the evidence and operational bar; it does not rebuild. → [32. CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)

**If a product manager can prototype in fifteen minutes but engineers need two weeks to reconstruct everything, we've only moved the bottleneck.** Prototype-to-production continuity is a platform property. → [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md)

**The safest paved road also needs to be the fastest paved road.** Adoption cannot be mandated; the paved road must beat the workaround. → [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md)

**The factory shouldn't replace CI/CD. It should make CI/CD agent-aware and outcome-aware.** Generated change flows through the existing supply chain; the factory adds evidence, risk, and learning. → [32. CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)

**The next generation of CI/CD is continuous evidence.** Pipelines stop being a gate and become a source of proof. → [32. CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)

**Speed comes from making changes observable and reversible, not from eliminating controls.** Qualify, release narrowly, evaluate inline, expand or roll back. → [32. CI/CD, progressive delivery, and production verification](../04-prove/32-cicd-progressive-delivery-and-production-verification.md)

**Cost per trusted outcome, not cost per token.** A cheaper model that needs three attempts and an hour of senior rework is the expensive option. → [9. Tokenomics and factory economics](../02-design/09-tokenomics-and-factory-economics.md)

**Economics should influence architecture continuously, not arrive as a surprise on the monthly bill.** Budgets and stopping conditions are execution controls and routing feedback. → [9. Tokenomics and factory economics](../02-design/09-tokenomics-and-factory-economics.md)

**Generation volume is an activity metric. Trusted outcomes are the product metric.** Measure accepted outcomes, rework, escaped defects, and policy violations, not lines or prompts. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Centralize undifferentiated complexity. Federate differentiated expertise.** Domain teams own their workflows; the platform owns what every team would otherwise rebuild. → [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md)

**Common platform, differentiated product behavior.** Multi-tenancy scopes identity, data, resources, and memory without forking the platform. → [34. The factory as a platform](../05-operate/34-the-factory-as-a-platform.md)

**Multiple experiences should converge on one execution contract.** CLI, IDE, API, or agent-to-agent, the durable concepts are the same. → [37. Control surfaces, event contracts, and storage](../05-operate/37-control-surfaces-event-contracts-and-storage.md)

**A gravity well, not a migration mandate.** Existing agents adopt the gateway, then evaluation, then observability, then governed tools, as each proves its value. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**Forward deployment accelerates the path to self-service, not replaces it.** The same integration solved three times is a missing platform capability. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**Build where you need durable leverage; adopt where abstraction preserves optionality.** Own the control plane and the differentiating intelligence; adopt commodity infrastructure. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**Adopt commodity execution mechanics; build the differentiated control plane and Builder Experience.** Score what you adopt on licensing, community health, operational burden, exit cost, and vendor independence, and keep the platform boundary movable. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**Merge authority and release authority are distinct grants.** Different approvers, different hooks, controlled rollout between them; a merged pull request is not a deployment decision. → [13. Control plane, orchestrator, and execution plane](../03-build/13-control-plane-orchestrator-and-execution-plane.md)

**The bottleneck will keep moving; design the factory to see where it moves next.** Cost, context, supply-chain capacity, and trust break first at scale. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**The technical system may recover from a failure faster than developer trust does.** One destructive change or one noisy reviewer undoes months. → [38. Enterprise adoption and the infrastructure landscape](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**The platform should increase engineering capability, not merely coding throughput.** Findings explain the boundary, the risk, and the evidence, so tools teach while they execute. → [4. The human–agent operating model](../02-design/04-the-human-agent-operating-model.md)

**Don't generalize before you've earned the abstraction.** Swarms, adaptive routing, universal memory, and hundreds of skills are hypotheses until production evidence exists. → [43. Mastering the factory](../06-improve/43-mastering-the-factory.md)

**Build for the next proof point without painting yourself into the next architecture.** Protect the seams that matter later: identity, interfaces, policy, evidence, evaluation, versioning. → [43. Mastering the factory](../06-improve/43-mastering-the-factory.md)

**One complete workflow exposing real weaknesses beats ten disconnected demos.** Prove one end-to-end path with design partners first. → [43. Mastering the factory](../06-improve/43-mastering-the-factory.md)

**The patterns transfer. The implementation has to be yours.** Understand what exists before reorganizing it. → [43. Mastering the factory](../06-improve/43-mastering-the-factory.md)

**Own the coherence of the system, not every line of implementation.** The leader's job is principles, boundaries, contracts, and adoption. → [43. Mastering the factory](../06-improve/43-mastering-the-factory.md)

**The next generation will be judged by how much trustworthy change a platform can move from human intent to production without scaling human effort linearly with it.** The closing measure of the whole book. → [44. Where this is going](../06-improve/44-where-this-is-going.md)

## Loops, correctness, and the factory around the agent

**You cannot reliably automate what you have not adequately defined.** Context engineering precedes automation; the Definition of Correct comes before the loop that enforces it. → [19. Data, knowledge, semantic, and context engineering](../03-build/19-data-knowledge-and-semantic-engineering.md)

**The agent is not the factory.** The factory is the system around the agent: context, harness, skills and tools, inner loop, outer loop, control plane, meta loop. → [2. The factory in one view](../01-understand/02-the-factory-in-one-view.md)

**Autonomy is not automation.** Autonomy is how little correction the agent needed; automation is how much of the workflow ran without a person. A hundred correct pull requests each approved by hand is high autonomy and no automation. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Inner loop for autonomy, outer loop for trust, meta loop for improvement.** Three loops at three speeds; keep them apart and each has one objective. → [16. Harness engineering](../03-build/16-harness-engineering.md)

**The more completely an outcome can be specified and independently verified, the more safely it can be delegated.** Verification completeness sets the autonomy ceiling, not model capability. → [27. Quality and evidence architecture](../04-prove/27-quality-and-evidence-architecture.md)

**Add no agentic complexity unless evals show improvement.** More agents, context, models, or verification is not better by default; every component earns its place with a with-and-without measurement. → [29. Evaluation engineering](../04-prove/29-evaluation-engineering.md)

**Automation moves bottlenecks upstream to intent and downstream to verification.** Implementation, then review, then verification and context and intent and governance, then factory engineering. Watch the stage after the one you just automated. → [8. Economics, metrics, and human attention](../02-design/08-economics-metrics-and-human-attention.md)

**Owning your factory means owning what correct means.** Own intent, standards, context, skills, policies, evals, and outcomes; adopt models, runtimes, sandboxes, infrastructure, and commodity tooling. → [13. Control plane, orchestrator, and execution plane](../03-build/13-control-plane-orchestrator-and-execution-plane.md)

**Spend intelligence where intelligence creates value.** Route by complexity, risk, and value; a rename gets a cheap model, a cross-system migration gets the frontier and several validators. → [9. Tokenomics and factory economics](../02-design/09-tokenomics-and-factory-economics.md)

**Validate the validator.** A bad verifier with a good agent is a false failure; a bad verifier with a bad agent is a false success. The mechanisms that judge agent work are themselves evaluated. → [27. Quality and evidence architecture](../04-prove/27-quality-and-evidence-architecture.md)

**More context is not better context.** Every context source is measured by its utility with and without; stale, redundant, and misleading knowledge is pruned. → [20. Context engineering](../03-build/20-context-engineering.md)

## Mission Control

**The goal isn't autonomous coding; it's governed autonomous software delivery.** Mission Control exists to make increased autonomy operationally trustworthy, not maximal. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**More agents without a control plane create more coordination, not necessarily more throughput.** Without one, the human becomes the scheduler. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**A chat interface scales conversations. A software factory scales governed work.** → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**The harness executes. Mission Control governs.** Coding harnesses remain replaceable execution backends beneath a durable authority and evidence layer. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**The coding agent is replaceable. The governed delivery contract isn't.** → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**The harness performs the work. The factory produces trusted change. Mission Control governs authority and attention.** Three layers, three jobs. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**The Agent Factory creates reusable intelligence. Mission Control governs how that intelligence becomes production work.** → [11. The Agent Factory](../03-build/11-the-agent-factory.md)

**When autonomy increases, the surrounding system has to become more explicit about authority and evidence, not less.** What was authorized, what ran, what changed, what proved it, is the proof current, and who may move it forward. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Mission Control isn't trying to make agents maximally autonomous. It's trying to make increased autonomy operationally trustworthy.** → [Appendix C. Mission Control case studies](./mission-control/01-implementation-maturity-and-evidence-map.md)

**A chat interface scales conversations; a control plane scales governed work.** The coordination problem, not the generation problem, is what stops one-to-one agent use from scaling. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Each arrow is a gate, not an optimistic handoff.** Whether you draw the chain as the Builder loop or as the governed delivery lifecycle, no stage completes the next one. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Intent over activity.** The primary object is the desired outcome, not an agent session, a message, a token count, or a generated task list. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Exceptions over feeds.** Decisions, blockers, failed or stale evidence, unsafe conditions, and aging work come first; routine activity stays inspectable without competing for attention. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Evidence over assertions.** A worker report or a `COMPLETED` status is not proof; completion needs source-linked artifacts and independently produced evidence against the approved criteria. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Durable state over conversation.** Intent, plans, decisions, execution state, events, artifacts, receipts, and approvals survive context limits, restarts, retries, model changes, and handoffs. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Policy before autonomy.** Scope, identity, tools, secrets, capabilities, risk, budgets, and recovery limits are resolved before execution begins; unknown or stale authority fails closed. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**Independent validation.** The actor that produced a material change cannot be the sole authority that certifies it. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

**One authoritative lifecycle.** Mission, Plan, WorkOrder, Task, Attempt, evidence, pull request, acceptance, merge, deployment, and production verification stay separate; no lower state silently completes its parent. → [42. Mission Control as a living case study](../06-improve/42-mission-control-as-a-living-case-study.md)

## Fifty concepts to have cold

The principles above are sentences. Underneath them are fifty concepts a reader should be able to define, place in the mental model of [Chapter 2](../01-understand/02-the-factory-in-one-view.md) (Intent → Harness → Capability → Model → Trust → Learning, surrounded by adoption, optimised for trusted throughput), and point at the chapter that owns. Forty populate the six areas directly; a further ten run across them, from the loop-and-context vocabulary the factory-native lifecycle relies on. Each line is the concept, one sentence, and the chapter.

**Intent**

1. **Builder Intent** — The outcome, constraints, acceptance criteria, and risk a builder needs, captured before any agent reasons and amplified by everything after. → [6](../02-design/06-intent-and-specification-engineering.md)

**Harness**

2. **Agent Harness** — The execution boundary around the model that decides which model runs, what context it sees, which tools it may call, what persists, and when it stops. → [15](../03-build/15-coding-harnesses-and-agent-protocols.md)
3. **Agent Runtime** — The execution platform that hosts harnesses: worker fleet, sandboxes, scheduling, leases, durable state, and recovery. → [13](../03-build/13-control-plane-orchestrator-and-execution-plane.md)
4. **Control Plane** — The durable authority layer owning intent, policy, state, approvals, and evidence rules; it decides, and never performs, the work. → [13](../03-build/13-control-plane-orchestrator-and-execution-plane.md)
5. **Durable Execution** — Tasks, Attempts, leases, checkpoints, idempotency, and reconciliation that let work outlive any process, conversation, or crash. → [14](../03-build/14-durable-execution.md)

**Capability**

6. **Skills** — Versioned, evaluated, reusable methods for a class of task; a capability contract, not a prompt. → [12](../03-build/12-skills-as-packages.md)
7. **Tools** — Narrow, schema-validated primitives through which a model acts, authorised outside the model. → [18](../03-build/18-agent-architecture.md)
8. **MCP** — The interoperability protocol for exposing tools and context to agents; standardises connectivity, never governance. → [18](../03-build/18-agent-architecture.md)
9. **Capability Registry** — The authoritative record of identity, version, provenance, evaluation, and lifecycle for every reusable capability. → [11](../03-build/11-the-agent-factory.md)
10. **Enterprise Context** — Relevant, authoritative, fresh, permission-aware, attributable knowledge the run is grounded in. → [20](../03-build/20-context-engineering.md)
11. **RAG / Retrieval** — Selecting the minimum relevant context per step; a permissions, provenance, and evaluation problem before it is a search problem. → [20](../03-build/20-context-engineering.md)
12. **Hierarchical Context** — Organisation → product or domain → repository → change, the specific layer overriding the general, every layer versioned. → [20](../03-build/20-context-engineering.md)
13. **Repository Intelligence** — Indexed symbols, dependencies, ownership, boundaries, build and test systems, and history, kept current per commit. → [19](../03-build/19-data-knowledge-and-semantic-engineering.md)
14. **Repository Profiles** — One shared platform, many per-repository profiles of conventions, risk, admitted workflows, and learned lessons. → [26](../03-build/26-autonomous-engineering-workflows.md)
15. **Deterministic Automation** — Static analysis, tests, rules engines, and preprocessing for what software can decide reliably; inference is spent only where reasoning creates value. → [23](../03-build/23-agent-and-loop-engineering.md)

**Model**

16. **Model Abstraction** — The model as a replaceable capability behind a governed gateway; a vendor name is never the architecture. → [21](../03-build/21-models-and-capability-selection.md)
17. **Model Routing** — Choosing the cheapest capability that reliably meets a task's quality, security, latency, and risk requirements, which may be no model at all. → [22](../03-build/22-routing-and-the-escalation-ladder.md)
18. **Model Specialisation** — Code-specialised, reasoning, frontier, lower-cost, and hosted models matched to task classes rather than one model for everything. → [21](../03-build/21-models-and-capability-selection.md)
19. **Workload Taxonomy** — The classification of tasks by complexity, risk, latency, and security needs that routing policy is written against. → [22](../03-build/22-routing-and-the-escalation-ladder.md)
20. **Tokenomics** — Spend as users × sessions × turns × requests × tokens × price, managed as an architecture discipline. → [9](../02-design/09-tokenomics-and-factory-economics.md)
21. **Cost per Accepted Outcome** — The economic measure that replaces cost per token; a cheaper model that needs rework is the expensive one. → [9](../02-design/09-tokenomics-and-factory-economics.md)

**Trust**

22. **Secure Sandboxing** — Contained execution for untrusted generated actions, with the isolation model written as policy dimensions. → [17](../03-build/17-development-environments-sandboxes-and-compute.md)
23. **Isolation** — Layered boundaries (worktree, process, filesystem, network, credentials, budgets, lease) none of which proves the others. → [17](../03-build/17-development-environments-sandboxes-and-compute.md)
24. **Scoped Credentials** — Short-lived, minimum, per-run secrets minted at provisioning and revoked at teardown; never a publication credential inside the sandbox. → [33](../04-prove/33-security.md)
25. **Governance** — The operating rules for what may run, who may approve, and what evidence is required, enforced by the control plane. → [7](../02-design/07-governance-policy-and-risk-proportional-approval.md)
26. **Policy** — Governance as code, layered organisation → product → repository, evaluated at named hooks with recorded decisions. → [7](../02-design/07-governance-policy-and-risk-proportional-approval.md)
27. **Human Authority / HITL** — People retain decisions whose consequences require judgment or authority, involved by risk rather than by habit. → [4](../02-design/04-the-human-agent-operating-model.md)
28. **Evaluation / Evals** — Measuring a configuration across a population: offline, online, and regression; global and repository-specific; graders calibrated, producer ≠ verifier. → [30](../04-prove/30-evals-as-factory-assets.md)
29. **Independent Verification** — A separate verifier, identity, and environment prove each candidate against frozen criteria; the producer never certifies its own work. → [27](../04-prove/27-quality-and-evidence-architecture.md)
30. **Observability** — Correlated traces, metrics, and logs that describe behaviour from intent to outcome without becoming authority. → [35](../05-operate/35-observability-telemetry-and-forensics.md)
31. **Tracing** — The execution trajectory and routing trace of one run, captured completely enough to replay, diff, and attribute drift. → [35](../05-operate/35-observability-telemetry-and-forensics.md)
32. **Evidence / Provenance** — Receipts bound to an exact subject digest, verifier, method, and time, with the lineage that says where every input came from. → [31](../04-prove/31-quality-contracts-proof-packages-and-certificates.md)

**Learning**

33. **Feedback Loops** — Explicit and implicit signals joined to records and outcomes, sorted by a failure taxonomy, and fed back as candidates. → [40](../06-improve/40-governed-learning.md)
34. **System-Level Learning** — Improvement aimed at the factory's own prompts, skills, routes, tools, tests, and policies, not at one conversation. → [40](../06-improve/40-governed-learning.md)
35. **Governed Promotion** — A candidate becomes the default only after baseline comparison, regression gates, shadow, canary, and a human decision, with rollback retained. → [41](../06-improve/41-meta-loops-and-the-closed-loop-factory.md)
36. **Fine-Tuning** — Updating weights (or adapters) for stable, well-specified behaviour, reached only after the lower rungs of the adaptation ladder are exhausted. → [41](../06-improve/41-meta-loops-and-the-closed-loop-factory.md)
37. **RLHF** — Preference optimisation from human preference data through a reward model; consumes the factory's acceptance and correction signals, so those must be trustworthy first. → [41](../06-improve/41-meta-loops-and-the-closed-loop-factory.md)

**Adoption and transformation**

38. **Build vs Adopt** — Adopt commodity execution mechanics behind standard contracts; build the differentiated control plane and Builder Experience. → [38](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)
39. **Forward-Deployed Engineering** — Embed → Observe → Co-build → Productise → Contribute → Reuse → Scale; the measure is how quickly teams stop needing it. → [38](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)
40. **Migration and Adoption** — A gravity well rather than a mandate: gateway, then evaluation, then observability, then governed tools, then runtime, one proven corridor at a time. → [38](../05-operate/38-enterprise-adoption-and-the-infrastructure-landscape.md)

**Running across all six areas**

The ten concepts below are the loop-and-context vocabulary the factory-native lifecycle of [Chapter 2](../01-understand/02-the-factory-in-one-view.md#the-lifecycle-above-the-six-areas) relies on.

41. **Definition of Correct** — The machine-consumable description of acceptable work for a task, component, repository, or domain: requirements, standards, policies, architecture, constraints, acceptance criteria, verification rules. → [6](../02-design/06-intent-and-specification-engineering.md), [19](../03-build/19-data-knowledge-and-semantic-engineering.md)
42. **Verification Contract** — The structured list of claims that must be demonstrated before completion and how each is validated; the second half of a complete specification. → [27](../04-prove/27-quality-and-evidence-architecture.md)
43. **Inner, Outer, and Meta Loop** — Fast deterministic feedback during execution (autonomy), independent verification around it (trust), and improvement across executions (learning). → [16](../03-build/16-harness-engineering.md)
44. **Harness Engineering** — Designing the execution environment, feedback mechanisms, checks, tools, context, and improvement loops in which agents engineer the software. → [16](../03-build/16-harness-engineering.md)
45. **Agent Readiness** — A scored assessment of whether a codebase and environment let agents safely understand, modify, execute, and verify: testability, CLI accessibility, reproducibility, documentation, context, sandboxability, observability. → [18](../03-build/18-agent-architecture.md), [26](../03-build/26-autonomous-engineering-workflows.md)
46. **Context as Code** — Context that is versioned, reviewed, tested, evaluated, owned, distributed, deprecated, drift-detected, measured, and rolled back. → [20](../03-build/20-context-engineering.md)
47. **Human Touchpoints per Accepted Outcome** — Every event at which a person had to intervene for progress, counted per outcome accepted; the automation metric. → [8](../02-design/08-economics-metrics-and-human-attention.md)
48. **Risk-Based Autonomy** — Change risk classification (files, dependencies, criticality, sensitivity, blast radius, size, coverage, confidence, history) sets verification depth, reviewer, approval, deployment policy, and model spend. → [7](../02-design/07-governance-policy-and-risk-proportional-approval.md)
49. **Factory Data Model** — Signal → Intent → Plan → Task → Attempt → Artifact → Evidence → Verification → Decision → Deployment → Outcome; agents and models change, the durable artifacts remain. → [5](../02-design/05-authoritative-records.md)
50. **Signal-to-Outcome** — The factory's real boundary: it begins at an observable need for change and ends at an observed production outcome that becomes the next signal, not at ticket-to-code. → [2](../01-understand/02-the-factory-in-one-view.md), [5](../02-design/05-authoritative-records.md)

For the terms these principles rely on, see the [glossary](./glossary.md).
