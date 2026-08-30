---
title: Human-Agent Control Surfaces and Operator Experience
status: review-ready
audience: [product, architect, executive, platform, ai-engineer, design]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: high
topics: [human-agent-interaction, plan-preview, approvals, intervention, accessibility]
---

# Human-Agent Control Surfaces and Operator Experience

## Quick Read

- **Purpose:** Design interfaces that let people understand, direct, interrupt, and judge autonomous work without reading raw logs.
- **Best for:** Product, design, platform, governance, and engineering leaders.
- **Prerequisites:** [Human-Agent Operating Model](../03-operating-model/01-human-agent-operating-model.md) and [Compounding Engineering and Human Attention](../03-operating-model/05-compounding-engineering-and-human-attention.md).
- **Reading time:** 15 minutes.
- **You will learn:** The required states and interactions for intent, plan preview, progress, intervention, approval, evidence review, and recovery.
- **Keep three ideas:** interfaces display authority rather than create it; progress must be decision-oriented; and every autonomous action needs a safe interruption path.

## 1. The problem

Many agent interfaces optimize for conversation and token streaming. Software-factory operators need to know what outcome is being pursued, which plan and authority are active, what changed, why work is waiting, what failed, which evidence is missing, and what decision is required. Raw traces overwhelm; vague progress destroys trust.

## 2. Why the problem exists

Agent execution is nonlinear and uncertain, while delivery records are durable and structured. Several workflows may run concurrently. Human decisions differ: clarify intent, approve a plan, grant an exception, stop work, accept evidence, merge, release, or promote autonomy. Compressing them into “approve” hides meaning and risk.

## 3. Enduring Principle

### Design around decisions and state

The primary surfaces are:

- **Intent composer:** outcome, reason, constraints, criteria, owner, risk, non-goals.
- **Plan preview:** steps, assumptions, affected systems, capabilities, tests, rollout, rollback, cost, uncertainty.
- **Execution view:** current state, completed and pending work, active Attempt, budgets, changes, blockers, safe controls.
- **Intervention:** pause, cancel, answer, redirect within scope, request revision, or escalate. Material replanning creates a new plan or authority version.
- **Review inbox:** ordered decisions with deadline, risk, recommendation, evidence, alternatives, and consequence of inaction.
- **Evidence review:** criteria mapped to fresh proof, counterevidence, waivers, lineage, limitations, and raw drill-down.
- **Recovery view:** failure class, retained state, retry eligibility, changed hypothesis, cleanup, and owner.

### Make status precise

Use authoritative states such as awaiting plan approval, queued for capacity, executing, awaiting input, independently verifying, blocked by stale evidence, eligible for release, observing outcome, or quarantined. “Thinking” is not operational status.

### Stream useful progress

Progress events summarize completed decisions, material discoveries, scope changes, evidence, budget, and next expected transition. Token or tool-call streams remain optional diagnostics. Notifications should be deduplicated, severity-aware, accessible, and routed to the accountable person.

### Preserve safe human control

Pause and cancellation have defined semantics. Reject and request-revision are distinct. The UI previews side effects before approval and confirms accepted actions. Keyboard, screen-reader, contrast, reduced-motion, timezone, and localization needs apply to operational interfaces.

### Measure attention

Track time to decision, unnecessary interrupts, approval rework, false urgency, evidence-review time, escalation quality, abandonment, and operator confidence. Faster clicks do not prove better judgment.

## 4. Tradeoffs and alternatives

More detail increases transparency and cognitive load. Use progressive disclosure: decision summary first, trace and artifacts on demand. Chat is flexible and poor at showing parallel state and evidence lineage. Structured interfaces are clear and can feel rigid; allow conversational clarification without bypassing records.

## 5. Current Mission Control Implementation

The current material specifies operator screens for Missions, plans, attempts, evidence, approval, review, release, health, and learning. It also distinguishes human workflow preferences from authority.

The curriculum does not yet provide one complete interaction model covering plan preview, live progress, pause/resume, intervention, notification, review inbox, accessibility, and user-research measures. Current pages should be evaluated against this system rather than treated as sufficient because they expose records.

## 6. Future Vision

Every operator should receive a calm, decision-ready view tailored to role and risk while preserving a shared authoritative state. Agents should be able to explain their current contract and uncertainty, but the interface should calculate authority, evidence freshness, and safe actions independently.

## 7. Versioned references

- [Agent–User Interaction Protocol entry](../00-overview/02-canonical-glossary.md)
- [OpenAI Agents SDK human-in-the-loop guide](https://openai.github.io/openai-agents-python/human_in_the_loop/), accessed 2026-08-30
- [Web Content Accessibility Guidelines](https://www.w3.org/TR/WCAG22/), accessed 2026-08-30

## 8. Notes and lessons learned

Trustworthy autonomy should feel calm. The interface does not need to dramatize reasoning; it needs to make state, uncertainty, authority, evidence, and recovery legible.

## 9. Interview and discussion questions

1. What belongs in a progress event?
2. Why are pause and cancel different?
3. How should the UI display counterevidence?
4. When should a chat interaction create a new Plan revision?
5. Which metrics reveal operator overload?

## 10. Whiteboard exercise

Design one screen for a high-risk WorkOrder awaiting release. Include intent, plan deviation, current artifact, failed evidence, pending approval, rollback, safe actions, and raw trace drill-down. Explain the information hierarchy.

## 11. Hands-on lab

Prototype the plan, execution, and review states for a bounded workflow. Test keyboard navigation, loading, empty, error, success, paused, cancelled, stale-evidence, and escalation states. Run a five-person review exercise and record which facts or controls users missed.
