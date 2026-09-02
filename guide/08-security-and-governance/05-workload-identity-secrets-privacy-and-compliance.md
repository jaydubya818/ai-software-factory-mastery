---
title: Workload Identity, Secrets, Privacy, and Compliance
status: review-ready
audience: [security, architect, platform, legal, compliance, ai-engineer]
last_verified: 2026-08-30
lifecycle: [intent, execute, verify, deliver, learn]
risk: critical
topics: [workload-identity, delegated-authorization, secrets, privacy, compliance]
---

# Workload Identity, Secrets, Privacy, and Compliance

## Quick Read

- **Purpose:** Define who or what acts, which authority it receives, how credentials are delivered, and how information obligations persist across the factory.
- **Best for:** Security, platform, architecture, privacy, legal, and compliance owners.
- **Prerequisites:** [Security and Identity Architecture](02-security-and-identity-architecture.md).
- **Reading time:** 15 minutes.
- **You will learn:** Workload identity, delegated authorization, secret delivery, tenancy, retention, residency, provenance, licensing, and control evidence.
- **Keep three ideas:** identity is not authority; secrets should be short-lived and attempt-scoped; and compliance evidence follows data and artifacts end to end.

## 1. The problem

Agent work often inherits broad developer credentials or shared service tokens. Logs, prompts, context packages, model providers, artifacts, and evaluations may copy sensitive information into systems with different retention or residency. Generated code may incorporate untracked licensed material. An audit trail that identifies only “the agent” cannot establish accountability.

## 2. Why the problem exists

The factory composes human identity, service identity, workload identity, agent configuration, tool authorization, repository permissions, and provider credentials. Each system uses different tokens and semantics. Data moves through transient environments and durable evidence. Legal and compliance obligations depend on purpose, jurisdiction, customer agreement, and information class.

## 3. Enduring Principle

### Bind every action to an identity chain

Record accountable human or system owner, authorized WorkOrder, orchestration service, worker workload identity, agent and capability versions, tool credential, and external actor. The chain explains both delegation and the point of enforcement.

### Issue least-privilege, short-lived authority

Use workload identity to obtain attempt-scoped credentials for exact resources and operations. Separate read, modify, publish, merge, deploy, approve, and administer permissions. Tokens expire, cannot be reused across tenants, and are revoked on cancellation or quarantine.

### Separate secrets from context

Deliver secrets through controlled channels directly to tools or processes. Prevent them from entering prompts, memory, logs, diffs, artifacts, screenshots, or model output. Scan and redact, but rely first on architecture that avoids exposure.

### Govern information throughout its lifecycle

Classify source, prompts, context, telemetry, artifacts, evidence, memory, and backups. Define allowed purpose, provider, region, encryption, access, retention, deletion, legal hold, and incident handling. Deletion workflows must address derived indexes and backups while preserving required audit evidence lawfully.

### Preserve intellectual-property and license provenance

Track source and licenses for dependencies, training or reference material where applicable, generated artifacts, copied snippets, and capability packages. Policy determines acceptable licenses and attribution. Similarity or provenance concerns create review, not automatic acceptance.

### Map controls to evidence

Policy-as-code can enforce repeatable rules, but control ownership, rationale, exceptions, sampling, and audit artifacts remain explicit. Compliance frameworks are mappings over operating controls; they do not replace the threat model.

## 4. Tradeoffs and alternatives

Fine-grained credentials reduce blast radius and increase integration cost. Shared credentials simplify setup and undermine attribution and revocation. Long retention aids forensics and increases privacy exposure. Minimize by default and define exceptions. Self-hosting can improve control while shifting security and reliability obligations to the operator.

## 5. Current Mission Control Implementation

The current guide covers authentication, authorization, service identity, tenant boundaries, secret handling, audit, evidence retention, supply-chain provenance, policy, and approvals.

It does not yet provide a complete workload-identity federation design, just-in-time credential flow, delegated authorization chain, data inventory, deletion workflow, residency policy, intellectual-property and license controls, or formal compliance mapping. Those controls require organizational and platform implementation beyond chapter-level architecture.

## 6. Future Vision

Every Attempt should receive a cryptographically verifiable workload identity and exchange it for scoped, short-lived access. Policy should evaluate identity, tenant, purpose, data class, region, tool, and WorkOrder. Operators should trace where information moved, apply retention and deletion, and export control evidence without exposing unrelated content.

## 7. Versioned references

- [SPIFFE overview](https://spiffe.io/docs/latest/spiffe-about/overview/), accessed 2026-08-30
- [SPIFFE Workload API](https://spiffe.io/docs/latest/spiffe-specs/spiffe_workload_api/), accessed 2026-08-30
- [NIST Privacy Framework](https://www.nist.gov/privacy-framework), accessed 2026-08-30
- [NIST SSDF](https://csrc.nist.gov/projects/ssdf), accessed 2026-08-30

## 8. Notes and lessons learned

The useful question is not “which agent did this?” It is “which accountable chain delegated which exact authority to which workload, using which credential, for which subject and purpose?”

## 9. Design review questions

1. How does workload identity differ from an API token?
2. Why should a secret bypass the model context?
3. What must a deletion workflow include?
4. How do license controls enter a capability supply chain?
5. Why is policy-as-code insufficient by itself?

## 10. Whiteboard exercise

Trace one Attempt from a human-approved WorkOrder through workload identity to repository, model, artifact, and deployment tools. Add cross-region data, cancellation, secret leakage, and a deletion request. Mark every control and retained audit fact.

## 11. Hands-on lab

Using synthetic data, design or simulate short-lived credentials for one read tool and one publication tool. Prove tenant isolation, expiry, cancellation revocation, and redaction. Produce a data-flow and retention inventory plus an auditable identity chain.
