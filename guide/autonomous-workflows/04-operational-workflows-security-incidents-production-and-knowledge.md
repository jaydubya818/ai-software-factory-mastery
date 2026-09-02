---
title: Operational Workflows — Security, Incidents, Production, and Knowledge
status: review-ready
audience: [architect, senior-engineer, platform, security, quality, product]
last_verified: 2026-08-30
lifecycle: [execute, verify, deliver, learn]
risk: high
topics: [security-remediation, incident-response, production-validation, documentation]
---

# Operational Workflows — Security, Incidents, Production, and Knowledge

## Quick Read

- **Purpose:** Define factory workflows that begin from operational or knowledge signals rather than a planned feature.
- **Best for:** Security, reliability, platform, documentation, and engineering leaders.
- **Prerequisites:** The workflow catalog and [Release, Production Feedback, and Factory SRE](../07-quality-engineering/02-release-production-feedback-and-factory-sre.md).
- **Reading time:** 14 minutes.
- **You will learn:** How to preserve urgency, evidence, authority, and learning during security remediation, incidents, production validation, and documentation maintenance.
- **Keep three ideas:** contain before optimizing; hypotheses are not findings; and knowledge changes need verification and ownership.

## 1. The problem

Operational work arrives with incomplete information and time pressure. An alert may be noise, a vulnerability may be unreachable, a deployment may be technically healthy but wrong for customers, and documentation may contradict the system. Agents can accelerate evidence collection and proposed remediation, but premature action can destroy forensic evidence, widen impact, or publish confident misinformation.

## 2. Why the problem exists

These workflows cross production, security, source, deployment, support, analytics, and human communication systems. They require different authorities for observation, containment, repair, disclosure, rollback, and acceptance. The initial signal rarely contains enough context to select a safe action.

## 3. Enduring Principle

### Separate observation, diagnosis, containment, and correction

**Security remediation** validates affected versions, reachability, exploitability, asset criticality, and available fixes. Containment, upgrade, compensating control, exception, and disclosure have separate owners. Verification includes compatibility, residual exposure, provenance, and production confirmation.

**Incident triage and root-cause analysis** preserves a timeline and evidence before mutation. Agents may correlate telemetry, changes, dependencies, and known failures; they must label observations, hypotheses, confidence, and missing data. Containment authority is narrow and reversible. Root cause requires evidence connecting conditions to failure, not the most plausible narrative.

**Production validation** binds a deployment to expected technical and customer outcomes. It checks health, errors, latency, security, synthetic behavior, feature exposure, and product measures across a defined observation window. Failed validation chooses rollback, containment, corrective work, or human risk acceptance.

**Documentation and knowledge maintenance** begins from a system, policy, interface, or workflow change. Impact analysis identifies affected guidance. Verification checks commands, links, schemas, examples, ownership, discoverability, and alignment to the released behavior. Publication remains a governed external effect.

### Preserve an operational evidence bundle

The bundle includes signal source, timestamps, affected scope, identities, hypotheses, actions, approvals, artifacts, telemetry queries, changes, communication, outcome, and unresolved questions. Sensitive evidence follows retention and access policy.

### Produce learning without automatic mutation

Post-incident and production signals may propose tests, alerts, skills, tools, context, runbooks, policies, or architecture changes. Each proposal enters the governed improvement path and must not silently edit active factory behavior.

## 4. Tradeoffs and alternatives

Fast automated containment can reduce impact and worsen an incorrect diagnosis. Preauthorize only reversible, bounded actions with explicit stop conditions. Rich evidence retention improves forensics and increases privacy and storage obligations. Documentation verification can be partly automated; semantic correctness still needs accountable owners.

## 5. Current Mission Control Implementation

The current guide includes release records, production feedback, reproduction, alerts, evidence, corrective WorkOrders, review, governance, and continual learning. These are reusable primitives for operational workflows.

It does not yet demonstrate complete incident, security, production-validation, or knowledge-maintenance workflows with accepted evidence and recovery drills. Current claims should remain architectural until those paths are exercised.

## 6. Future Vision

Operational signals should enter a typed intake service, correlate to exact releases and Factory Versions, and create bounded investigation work. Review surfaces should show timeline, blast radius, hypotheses, confidence, evidence, recommended actions, and authority. Accepted outcomes should feed both product correction and factory improvement.

## 7. Versioned references

- [Governed Continuous Learning and Recursive Improvement](../03-operating-model/03-governed-continuous-learning-and-recursive-improvement.md)
- [Factory Observability and Agent Runtime Telemetry](../05-runtime-architecture/05-factory-observability-and-agent-runtime-telemetry.md)
- [NIST Cybersecurity Framework](https://www.nist.gov/cyberframework), accessed 2026-08-30

## 8. Notes and lessons learned

Operational autonomy is valuable when it shortens time to reliable understanding, not merely time to action. A fast, unsupported causal story is a new incident risk.

## 9. Design review questions

1. Which incident actions can be safely preauthorized?
2. How do you distinguish an observation from a root-cause claim?
3. What proves a security remediation reduced risk?
4. When has a deployment produced validated customer value?
5. How should documentation failures become factory learning?

## 10. Whiteboard exercise

Trace a failed deployment that triggers an alert, possible security concern, rollback, defect correction, and documentation update. Mark independent authority for investigation, containment, release, disclosure, and acceptance.

## 11. Hands-on lab

Use synthetic telemetry and a disposable service. Reconstruct a timeline, rank hypotheses, execute one reversible containment action, identify root cause, propose a fix, validate recovery, and draft a postmortem plus knowledge update. Retain queries, evidence, decisions, and unresolved uncertainty.
