---
title: Detailed Architecture Coverage Matrix
status: review-ready
audience: [executive, architect, builder, platform, security, quality, operations]
last_verified: 2026-08-30
lifecycle: [intent, plan, execute, verify, deliver, learn]
risk: variable
topics: [architecture, coverage, ownership, evidence, maturity]
---

# Detailed Architecture Coverage Matrix

## Quick Read

- **Purpose:** Give every material factory responsibility one canonical name,
  owner, chapter, control boundary, and validation path.
- **Use it when:** Reviewing scope, assigning an architecture question, or
  checking whether a diagram creates a competing taxonomy.
- **Core rule:** One responsibility may have many implementations, but it has
  one accountable curriculum location.
- **Evidence boundary:** Coverage records documentation ownership. It does not
  prove that an implementation operates as described.

## 1. The problem

Broad architecture maps are good orientation aids and poor accountability
systems. The same idea is often labeled differently in lifecycle, runtime,
security, and operations diagrams. Gaps hide behind overlapping labels while
attractive visuals make partial coverage look complete.

This matrix is the normalization layer. Detailed chapters own specifications;
the matrix owns traceability among capability, lifecycle, plane, role, risk,
maturity, evidence boundary, and validation.

## 2. Canonical coverage matrix

| Capability | Lifecycle | Owning plane | Accountable role | Risk | Canonical specification | Documentation maturity | Implementation evidence boundary | Validation |
|---|---|---|---|---|---|---|---|---|
| Business intent and accepted outcome | Intent, learn | Human governance | Business owner | Variable | [Intent-to-delivery lifecycle](04-intent-to-delivery-lifecycle.md) | Review ready | No complete production outcome chain is claimed | Intent and outcome trace review |
| Plan and executable specification | Plan | Control | Engineering owner | High | [Specification engineering](../04-domain-model/03-specification-engineering-executable-requirements-and-plan-assurance.md) | Review ready | Representative plan-assurance evidence is incomplete | Ambiguity and acceptance test |
| Factory system inventory | Intent, operate, retire | Control/data | System owner | High | [Inventory and classification](../04-domain-model/05-factory-system-inventory-classification-and-lifecycle.md) | Review ready | No production-wide inventory completeness claim | Required-field and lifecycle audit |
| Capability registry and lifecycle | Define, learn | Capability | Capability owner | High | [Capability supply chain](../agent-factory/01-capability-supply-chain-and-registries.md) | Review ready | Unified production registry is unproven | Certification and revocation lab |
| Tool, skill, and integration contracts | Define, execute | Capability/execution | Capability owner | High | [Capability contract reference](../agent-factory/04-tool-skill-and-integration-contract-reference.md) | Review ready | Existing tools are not asserted to meet every field | Contract conformance suite |
| Architecture and autonomy selection | Plan | Control | Architect | High | [Pattern selection ladder](../06-ai-engineering/10-agentic-architecture-patterns-and-autonomy-selection.md) | Review ready | Architecture decisions require local evidence | Simpler-alternative review |
| Orchestration and durable workflow | Plan, execute | Control/execution | Runtime owner | Critical | [Orchestration contracts](../05-runtime-architecture/09-orchestration-component-model-and-runtime-contracts.md) | Review ready | Full component conformance is unproven | State, stop, recovery, and replay tests |
| Agent, model, prompt, and tool composition | Execute | Execution | AI engineering owner | High | [Agent architecture](../06-ai-engineering/01-agent-architecture-mcp-tools-context-and-memory.md) | Review ready | Versioned case evidence has bounded gaps | Frozen-configuration replay |
| Knowledge ingestion and retrieval | Plan, execute | Knowledge | Knowledge owner | High | [Knowledge pipeline specification](../06-ai-engineering/08-knowledge-context-and-retrieval-pipeline-specification.md) | Review ready | Production source registry and benchmark are unproven | Permission, freshness, deletion, and retrieval tests |
| Multi-agent collaboration | Plan, execute, verify | Execution/quality | Workflow owner | High | [Multi-agent topologies](../06-ai-engineering/09-multi-agent-topologies-and-collaboration-contracts.md) | Review ready | Independence and benefit must be proven per workflow | Delegation, disagreement, and correlation tests |
| Sandbox and compute isolation | Execute | Execution/security | Platform owner | Critical | [Sandboxed execution](../05-runtime-architecture/04-sandboxed-execution-isolation-and-publication.md) | Draft for study | Production escape resistance is unproven | Escape, teardown, and residue tests |
| Verification and evidence | Verify | Quality | Quality owner | Critical | [Quality and evidence architecture](../07-quality-engineering/01-quality-and-evidence-architecture.md) | Review ready | Complete independent proof path is unproven | Fault-sensitivity and provenance tests |
| Human review and authority | Intent, verify, deliver | Governance | Named decision owner | Critical | [Authority and emergency control](../08-security-and-governance/07-authority-autonomy-and-emergency-control.md) | Review ready | Tested response time is not claimed | Override, dual-control, and containment lab |
| Governance control framework | All | Security/governance | Control owner | Critical | [Agentic governance controls](../08-security-and-governance/06-agentic-governance-control-framework.md) | Review ready | Control design is not operating effectiveness | Control evidence inspection |
| Organizational decision rights | All | Human governance | Executive sponsor | Critical | [Governance operating model](../03-operating-model/06-enterprise-governance-operating-model-and-decision-rights.md) | Review ready | Local assignments remain organization-specific | Decision simulation and RACI review |
| Delivery and rollback | Deliver | Delivery | Release owner | Critical | [Progressive delivery](../verification-delivery-engineering/03-progressive-delivery-production-verification-and-rollback.md) | Review ready | Complete production delivery path is unproven | Canary and rollback lab |
| Scheduling, capacity, and cost | Execute | Platform | Platform operations | High | [Operations and FinOps reference](../factory-platform-engineering/07-enterprise-operations-reliability-and-finops-reference.md) | Review ready | Fleet-scale behavior is unproven | Load, fairness, budget, and attribution tests |
| Observability and forensics | Execute, learn | Observability/data | Reliability owner | High | [Observability semantics](../factory-platform-engineering/06-observability-semantics-cost-and-forensics.md) | Review ready | Complete production semantic conformance is unproven | Trace completeness and forensic reconstruction |
| Monitoring, detection, and response | Operate, learn | Operations | Incident owner | Critical | [Control tower response](../factory-platform-engineering/08-control-tower-monitoring-detection-and-response.md) | Review ready | Response effectiveness needs exercised incidents | Detection-to-closure simulation |
| Continual improvement | Learn | Control/quality | Change owner | High | [Governed continual learning](../03-operating-model/03-governed-continuous-learning-and-recursive-improvement.md) | Review ready | Automated promotion is neither required nor claimed | Baseline, candidate, approval, rollback test |
| AI systems foundations | Supporting | Cross-cutting | Architect | Variable | [AI systems primer](../06-ai-engineering/00-ai-systems-foundations-for-software-factory-architects.md) | Review ready | Educational background only | Decision-focused teach-back |

## 3. Canonical relationships

The lifecycle is `Intent -> Plan -> Select -> Execute -> Verify -> Evidence ->
Decide -> Deliver -> Observe -> Learn`. Logical planes are responsibility
boundaries, not mandated services. The governed inventory points to—but never
duplicates—the service, capability, model, policy, and evidence registries.
Architecture patterns select the minimum sufficient autonomy; maturity labels
describe documentation or scoped evidence, not how impressive a pattern is.

## 4. Classification rules

1. A new label must map to an existing capability or justify a new owner.
2. Product and vendor names are examples, never canonical components.
3. General AI background is supporting material unless it changes a factory
   architecture decision.
4. A diagram without a text or table equivalent is incomplete.
5. Review-ready documentation never advances a capability to operationally
   proven status.
6. A shared concern may cross planes, but one role owns the decision and one
   record is authoritative.

## 5. Standards baseline

| Reference | State used here | Use |
|---|---|---|
| NIST AI RMF 1.0 and Generative AI Profile | Published | Risk, governance, measurement, and management framing |
| NIST SSDF publications | Published baseline with later revision work tracked separately | Secure software lifecycle controls |
| OWASP Agentic AI threats and mitigations | Current community guidance | Agent, tool, context, memory, identity, and autonomy threats |
| SPIFFE Workload API | Published specification | Workload identity and credential delivery boundary |
| SLSA 1.2 | Published | Build provenance and supply-chain integrity |
| OpenTelemetry generative-AI semantic conventions | Developing | Telemetry vocabulary; pin exact versions |
| WCAG 2.2 | W3C Recommendation | Accessible interaction and diagram equivalents |

## 6. Review exercise

Choose one production change and one failure. Trace both across the matrix.
For each transition name the actor, identity, authoritative record, policy,
evidence, stop condition, recovery action, and human decision. Record any
responsibility with two owners or no owner as a taxonomy defect.

## 7. Explicit nonclaims

This matrix does not certify implementations, prescribe an organization chart,
or require separate deployments for each plane. It is a review-ready ownership
map awaiting external architecture, security, operations, and usability
review.
