---
title: Quality Contract and Certificate Technical Specification
status: draft-for-study
audience: [architect, senior-engineer, platform, quality, security]
last_verified: 2026-08-11
mission_control_local_head: a49064875d0711253d74029e3066cc74c7c1c2a5
---

# Quality Contract and Certificate Technical Specification

## 1. The problem

“Produce a quality proof package” is architecture doctrine, not yet an implementable contract. A real system needs stable subjects, schemas, lifecycle states, evidence sufficiency rules, deterministic decisions, signatures, invalidation, revocation, and APIs. Otherwise every verifier invents incompatible meanings and a certificate becomes decorative PDF output.

## 2. Why the problem exists

Quality facts have different producers, scopes, freshness periods, and failure semantics. A passing test may concern the wrong commit. A valid certificate may later lose a dependency attestation. A Plan revision may alter criteria after execution. A production incident may contradict earlier evidence without proving that the issuance process was fraudulent. The data model must preserve these distinctions.

## 3. Enduring Principle

### Define four core records

**Quality Contract** — versioned rules compiled from approved intent, policy, risk, and Factory Configuration.

**Evidence Envelope** — normalized, immutable reference to a claim and exact subject, preserving native evidence.

**Gate Decision** — deterministic evaluation of one contract version against a bounded evidence set at a point in time.

**Quality Certificate** — signed, portable statement that a particular subject was eligible under a particular contract and policy decision. It is not a defect-free warranty.

### Quality Contract schema

```yaml
quality_contract:
  schema_version: "1.0"
  contract_id: "qc_01..."
  revision: 3
  status: APPROVED
  subject_scope:
    mission_id: "mission_..."
    plan_revision_id: "plan_..."
    work_order_revision_id: "wo_rev_..."
    repository_id: "repo_..."
    base_sha: "40-hex"
    target_environment: "review"
  source:
    factory_configuration_revision: "fc_rev_..."
    governance_policy_revision: "gp_rev_..."
    risk_assessment_id: "risk_..."
  requirements:
    - requirement_id: "REQ-101"
      assertion_ids: ["ASSERT-101-A"]
      criticality: BLOCKING
  assertions:
    - assertion_id: "ASSERT-101-A"
      claim: "Business justification rejects blank values."
      method: BROWSER_TEST
      evidence_types: ["test-result"]
      independence: SEPARATE_EXECUTION_CONTEXT
      pass_rule: "status == PASS"
      freshness_seconds: 86400
  hard_gates:
    - rule_id: "no-critical-security"
      expression: "count(finding.severity == CRITICAL && finding.open) == 0"
  approvals:
    - decision: WORK_ORDER_ACCEPTANCE
      role: ENGINEERING_LEAD
      required_when: "risk >= HIGH"
  lifecycle:
    effective_at: "RFC3339"
    expires_at: null
  canonical_digest: "sha256:..."
```

The expression language must be constrained, deterministic, side-effect free, versioned, and validated before approval. Unknown or unavailable data must not coerce to pass.

### Evidence Envelope schema

```yaml
evidence_envelope:
  schema_version: "1.0"
  evidence_id: "ev_01..."
  evidence_type: "test-result"
  subject:
    kind: "git-commit"
    uri: "git+https://github.com/acme/service"
    digest: {sha1: "..."}
  claim:
    assertion_ids: ["ASSERT-101-A"]
    status: PASS
    measurements: {tests_passed: 1, tests_failed: 0}
  producer:
    identity: "validator://browser-v3"
    execution_id: "attempt_..."
    method_version: "playwright-1.52/policy-4"
  lineage:
    contract_digest: "sha256:..."
    work_order_revision_id: "wo_rev_..."
    execution_manifest_digest: "sha256:..."
  time:
    observed_at: "RFC3339"
    valid_until: "RFC3339"
  native_artifact:
    media_type: "application/json"
    digest: "sha256:..."
    storage_ref: "artifact://..."
  classification: INTERNAL
  signature_ref: "attestation://..."
```

Evidence is append-only. Corrections create superseding evidence; they do not mutate the original. A failed result remains visible even after a later pass.

### Decision model and states

Evaluate every assertion as `SATISFIED`, `UNSATISFIED`, `UNKNOWN`, `STALE`, `CONFLICTED`, `WAIVED`, or `NOT_APPLICABLE`. Aggregate to a gate state:

- `ELIGIBLE`: every blocking assertion and hard gate is satisfied; approvals are present.
- `INELIGIBLE`: a blocking assertion or gate fails.
- `UNKNOWN`: required proof has not arrived or cannot be evaluated.
- `STALE`: required proof expired or no longer matches the subject.
- `WAIVER_REQUIRED`: policy permits an exception but it has not been granted.
- `AWAITING_HUMAN`: machine requirements pass but a human decision remains.

Fail closed at governed advancement boundaries. Observe-only modes may report what enforcement *would* have done, but must be visibly labeled and cannot issue an enforced certificate.

### Lifecycle state machines

```text
Contract: DRAFT -> IN_REVIEW -> APPROVED -> ACTIVE -> SUPERSEDED | WITHDRAWN | EXPIRED
Evidence: RECEIVED -> VERIFIED -> USABLE -> STALE | SUPERSEDED | REVOKED | REJECTED
Decision: PENDING -> EVALUATED -> REEVALUATION_REQUIRED -> SUPERSEDED
Certificate: DRAFT -> ISSUED -> SUSPENDED -> REVOKED | EXPIRED | SUPERSEDED
```

Only authorized transitions are allowed. Every transition records actor, reason, prior state, policy version, time, and idempotency key.

### Invalidation graph

Invalidation is dependency-aware. Re-evaluate when any of these changes:

- Plan, WorkOrder, criterion, assertion, policy, risk, or Factory Configuration revision;
- base/head SHA, build digest, dependency graph, deployment artifact, or target environment;
- validator method, tool version, trust status, or independence relationship;
- evidence expiry, revocation, supersession, contradiction, or discovered tampering; or
- production incident linked to a certified assertion.

Re-evaluation may leave unaffected evidence usable. The system should explain the invalidation path rather than delete the proof package.

### Signing and canonicalization

Compute digests over an explicitly versioned canonical representation. RFC 8785 JCS is suitable for constrained JSON; alternatively wrap exact payload bytes in DSSE and avoid application-level canonicalization ambiguity. Use in-toto Statement subjects for portable attestations and Sigstore or enterprise PKI for signing. Verification policy must check certificate/workload identity, issuer, time, transparency or timestamp proof, subject digest, and predicate type.

Do not invent cryptography. Key rotation, trust roots, offline verification, compromise response, and signer authorization are part of the design.

### Certificate schema

```yaml
quality_certificate:
  schema_version: "1.0"
  certificate_id: "qcert_01..."
  subject: {kind: "git-commit", digest: {sha1: "..."}}
  scope: {environment: "review", decision: "WORK_ORDER_ACCEPTANCE"}
  contract: {id: "qc_...", revision: 3, digest: "sha256:..."}
  gate_decision: {id: "gate_...", result: ELIGIBLE, digest: "sha256:..."}
  evidence_set_digest: "sha256:..."
  risk: {class: MODERATE, assessment_id: "risk_..."}
  approvals: [{role: ENGINEERING_LEAD, decision_id: "approval_..."}]
  issued_at: "RFC3339"
  valid_until: "RFC3339"
  issuer: "quality-authority://mission-control/prod"
  status_endpoint: "https://.../quality-certificates/qcert_01.../status"
```

The human-readable certificate is a projection. The signed machine-readable statement is canonical.

### Revocation and suspension

Suspend when investigation is active and continued reliance may be unsafe. Revoke for compromised signer, tampering, material false claim, invalid subject binding, or critical contradictory evidence. Supersede when a new valid artifact or contract replaces the old one. Expire when the validity window ends.

Publish a signed status record or verifiable revocation list. Consumers must check status at the decision boundary; possession of an old certificate is insufficient. Revocation does not erase history and should identify affected releases and required remediation.

### APIs

Minimum logical API surface:

```text
POST /quality-contracts/compile
POST /quality-contracts/{id}/submit
POST /quality-contracts/{id}/approve
POST /evidence-envelopes
POST /evidence-envelopes/{id}/verify
POST /quality-gates/evaluate
GET  /quality-gates/{id}/explanation
POST /quality-certificates/issue
GET  /quality-certificates/{id}
GET  /quality-certificates/{id}/status
POST /quality-certificates/{id}/suspend
POST /quality-certificates/{id}/revoke
POST /reconciliation/subject-changed
```

Writes require scoped identity, authorization, idempotency, audit, and optimistic concurrency. Verifier ingestion cannot directly mark a WorkOrder accepted; it submits evidence for policy evaluation.

## 4. Tradeoffs

A certificate creates a strong integration boundary but can encourage binary thinking. Preserve the underlying findings, uncertainty, waived claims, and scope. Short validity improves safety but increases re-evaluation load. A centralized issuer simplifies control but is a high-value trust root; independent verification and key protection are mandatory.

## 5. Current Mission Control Implementation

Mission Control already has ingredients: approved Plan revisions, WorkOrder acceptance criteria, verification receipts with validity, approval decisions, QC runs/evidence packs, GitHub check ingestion, deployment/release-gate records, run artifacts, and audit events. A staged, uncommitted continuous-quality plan proposes evidence envelopes, quality findings, gate decisions, reconciliation, and the principle that the approved Plan is the top-level contract. Its SHA-256 is `31e3f6fc44824b643ef5bfa3389ba3da1e0e6b1f6827f66fdb63efcbb4c9313b`.

Those proposed tables and APIs are not yet demonstrated product capability. Current `qcRuns.execute` uses mock adapters and the release gate is shadow-only. Mission Control should call the V1 user-facing artifact a **Quality Proof Package** until signing, verification, status, and revocation are implemented. “Quality Certificate” should be reserved for the portable technical contract defined here.

## 6. Future Vision

Implementation order:

1. freeze canonical IDs, subject identity, and lineage;
2. compile Plan/WorkOrder requirements in observe-only mode;
3. normalize existing receipts and CI results into evidence envelopes;
4. evaluate and explain one WorkOrder-acceptance gate;
5. enforce that gate and reconcile subject changes;
6. sign proof packages and add certificate status/revocation; and
7. extend certificates to build and production subjects only after deployment proof exists.

## 7. Versioned references

- Mission Control local HEAD: `a49064875d0711253d74029e3066cc74c7c1c2a5`
- Staged, uncommitted continuous-quality plan SHA-256: `31e3f6fc44824b643ef5bfa3389ba3da1e0e6b1f6827f66fdb63efcbb4c9313b`
- Product sources: `convex/schema.ts`, `convex/missions.ts`, `convex/qcRuns.ts`, `convex/governance/releaseGateAutomation.ts`, `convex/factory/githubCi.ts`
- SLSA provenance 1.2; in-toto Statement v1; DSSE; Sigstore
- RFC 8785 JSON Canonicalization Scheme
- OMG Structured Assurance Case Metamodel for claim/evidence reasoning

## 8. Personal notes and lessons learned

- The certificate is a signed decision about a scoped subject, not a summary of test counts.
- `UNKNOWN` and `STALE` are first-class states; coercing either to pass destroys governance.
- Revocation is part of issuance design, not an afterthought.
- A human-readable report can change presentation; the canonical signed payload cannot.

## 9. Interview questions

1. What exactly does a Quality Certificate guarantee?
2. How do evidence expiry and subject change differ?
3. Would you use JCS, DSSE, or both, and why?
4. How should a production incident affect a pre-release certificate?
5. Why can a verifier not directly accept a WorkOrder?

## 10. Whiteboard exercise

Draw the four records and their state machines. Issue a certificate, then change the Plan, discover a compromised validator, and observe a production regression. Explain invalidation, suspension, revocation, supersession, affected evidence, and consumer checks for each event.

## 11. Hands-on lab

Implement a small local reference: JSON schemas for contract, evidence, decision, and certificate; deterministic canonical digest; a gate evaluator with `UNKNOWN` and `STALE`; and signed issuance using an established library. Demonstrate successful verification, tampered payload rejection, evidence expiry, subject-digest mismatch, and revocation. Do not integrate it into Mission Control until the model has passed independent review.
