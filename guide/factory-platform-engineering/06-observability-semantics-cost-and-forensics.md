---
title: Observability Semantics, Cost Attribution, and Forensics
status: review-ready
audience: [architect, platform, sre, security, ai-engineer, quality]
last_verified: 2026-08-30
lifecycle: [execute, verify, deliver, learn]
risk: high
topics: [opentelemetry, traces, token-cost, cardinality, forensics]
---

# Observability Semantics, Cost Attribution, and Forensics

## Quick Read

- **Purpose:** Make runs comparable and incidents reconstructable across agents, tools, services, queues, environments, CI, deployment, and outcomes.
- **Best for:** Platform, reliability, security, AI infrastructure, and quality engineers.
- **Prerequisites:** [Factory Observability and Agent Runtime Telemetry](../05-runtime-architecture/05-factory-observability-and-agent-runtime-telemetry.md).
- **Reading time:** 14 minutes.
- **You will learn:** Semantic conventions, trace correlation, privacy and cardinality control, token and cost attribution, and forensic evidence bundles.
- **Keep three ideas:** shared semantics make traces comparable; high cardinality is a design decision; and telemetry becomes evidence only through a governed claim.

## 1. The problem

Logs and traces can show activity without answering which Mission, WorkOrder, Attempt, capability graph, artifact, release, or customer outcome was affected. Provider-specific fields make model and tool behavior difficult to compare. Unbounded prompts, tool arguments, repository paths, and user identifiers create privacy and observability-cost risk.

## 2. Why the problem exists

The factory crosses synchronous and asynchronous boundaries. Trace context may be lost through queues, external providers, or human pauses. AI systems add prompt, completion, cached, and reasoning usage; model, tool, handoff, guardrail, and context events; and large sensitive payloads. Operational telemetry and acceptance evidence have different retention and integrity requirements.

## 3. Enduring Principle

### Adopt shared semantic conventions

Define stable names and attributes for Mission, Plan, WorkOrder, Task, Attempt, Factory Version, capability versions, model route, tool call, sandbox, worker, repository, commit, candidate, evaluator, evidence, pull request, artifact, deployment, and outcome. Record status and failure class consistently across providers.

### Correlate the complete lifecycle

Propagate trace and causation identity through API calls, queues, workers, tools, CI, artifact publication, deployment, and production observation. Human approvals and long pauses create linked spans or events rather than one misleading continuous span.

### Control payload, privacy, and cardinality

Classify attributes before collection. Avoid secrets and unnecessary prompt or source content. Hash or tokenize identifiers where appropriate. Use bounded dimensions for metrics and retain high-cardinality detail in controlled traces or logs. Sampling must preserve errors, policy denials, security events, and representative successful runs.

### Attribute usage and cost

Record input, output, cached, and provider-specific reasoning usage where available; model route; retries; tool and environment cost; verification; storage; and human attention. Roll these costs from Attempt to WorkOrder, workflow, tenant, and accepted outcome without double counting.

### Create forensic bundles

For material incidents, freeze relevant manifests, identities, policy decisions, prompts or redacted hashes, context provenance, tool events, files, commands, network records, artifacts, evidence, approvals, and provider responses. Preserve integrity, access control, chain of custody, retention, and legal obligations.

### Keep telemetry and evidence distinct

Telemetry supports diagnosis. A verifier converts selected observations into an evidence envelope tied to an exact subject, method, criterion, and producer. Raw trace presence does not satisfy acceptance automatically.

## 4. Tradeoffs and alternatives

Full-fidelity tracing improves reconstruction and increases cost and sensitive-data exposure. Tail sampling and risk-based retention preserve high-value traces. Standard conventions improve comparability and may lag new provider features; retain vendor details under namespaced attributes without breaking the common core.

## 5. Current Mission Control Implementation

The existing observability chapter covers correlation, events, metrics, logs, token usage, cost, runtime health, and evidence boundaries. The curriculum does not yet define a complete semantic schema, cardinality and sampling policy, lifecycle-wide trace linkage, cached and reasoning token attribution, or forensic-bundle contract.

## 6. Future Vision

Operators should move from a customer outcome back through release, artifact, evidence, Attempt, capability graph, WorkOrder, Plan, and intent. Cross-version dashboards should compare reliability, quality, cost, attention, and security using stable semantics. Forensic export should be scoped, integrity-protected, and privacy-aware.

## 7. Versioned references

- [OpenTelemetry Semantic Conventions](https://opentelemetry.io/docs/specs/semconv/), accessed 2026-08-30
- [OpenTelemetry Generative AI attributes](https://opentelemetry.io/docs/specs/semconv/registry/attributes/gen-ai/), accessed 2026-08-30
- [Factory Observability](../05-runtime-architecture/05-factory-observability-and-agent-runtime-telemetry.md)

## 8. Notes and lessons learned

Observability becomes architecture when semantic choices determine whether runs, providers, workflows, and outcomes can be compared. Instrumentation without a shared subject model produces expensive anecdotes.

## 9. Interview and discussion questions

1. Which identifiers should propagate through every boundary?
2. How do you control high-cardinality dimensions?
3. What AI usage should be attributed to one accepted outcome?
4. When should a trace become evidence?
5. What belongs in a forensic bundle but not a routine log?

## 10. Whiteboard exercise

Trace one WorkOrder through queue, worker, model, three tools, CI, artifact registry, deployment, and product metric. Add a human pause, provider retry, secret-bearing tool response, and delayed incident. Design attributes, sampling, retention, and evidence conversion.

## 11. Hands-on lab

Instrument or simulate one multi-step Attempt using a shared semantic schema. Propagate causation across an asynchronous boundary, attribute model and environment cost, apply privacy and cardinality rules, and export a redacted forensic bundle for one injected failure.
