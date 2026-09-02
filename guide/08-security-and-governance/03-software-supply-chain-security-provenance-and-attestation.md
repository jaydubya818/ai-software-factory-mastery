---
title: Software Supply Chain Security, Provenance, and Attestation
status: draft-for-study
audience: [architect, senior-engineer, platform, security, executive]
last_verified: 2026-08-11
mission_control_local_head: a49064875d0711253d74029e3066cc74c7c1c2a5
---

# Software Supply Chain Security, Provenance, and Attestation

## 1. The problem

Passing tests does not establish what was built, from which source, by which identity, with which dependencies, or whether the artifact later changed. An autonomous factory expands the supply chain: models, prompts, tools, MCP servers, runners, base images, package registries, CI systems, and publication credentials all become potential substitution or tampering points.

## 2. Why the problem exists

Names and mutable tags are convenient but weak identities. Logs are easy to lose or rewrite. A signature proves that a key signed bytes; it does not by itself prove that the signer was authorized, the build was isolated, the source was reviewed, or the artifact is safe. An SBOM inventories components; it does not prove that the listed components produced the shipped binary.

## 3. Enduring Principle

### Bind every claim to immutable subjects

Evidence should identify source and artifacts by cryptographic digest. The minimum lineage is:

`approved Plan digest -> WorkOrder revision -> execution manifest digest -> source/base SHA -> Attempt -> commit SHA -> build artifact digest -> deployment digest`

Artifact identity must survive copying and renaming. Human-friendly names may locate an object; digests establish which bytes a claim concerns.

### Distinguish provenance, attestation, signature, and transparency

- **Provenance** describes how an artifact was produced: builder, inputs, invocation, environment, and outputs.
- **Attestation** is a typed claim by an identified producer about one or more digest-bound subjects.
- **Signature** provides integrity and signer authentication for the attestation envelope.
- **Transparency** makes equivocation or deletion more detectable by recording verifiable entries.

None is a quality verdict. A perfectly signed vulnerable build remains vulnerable.

### Adopt interoperable envelopes

SLSA 1.2 defines build provenance and graduated build/source assurance. Its build track progresses from available provenance to signed hosted builds and hardened, isolated builds. The in-toto Statement v1 supplies a common `subject` plus `predicateType` envelope. DSSE safely signs typed payloads without requiring JSON canonicalization.

The factory should store a normalized evidence envelope while preserving the original attestation bytes and media type. This avoids coupling policy to one vendor or future schema version.

```yaml
evidence_envelope:
  subject:
    name: ghcr.io/example/service
    digest: {sha256: "..."}
  predicate_type: https://slsa.dev/provenance/v1
  producer:
    identity: github-actions://example/service/.github/workflows/build.yml@refs/heads/main
  source_digest: "..."
  work_order_revision: WO-42-R2
  issued_at: "..."
  storage_ref: "..."
  verification:
    signature_status: VERIFIED
    identity_policy: SATISFIED
    transparency_status: VERIFIED
```

### Generate and govern SBOMs

Generate an SBOM for each releasable artifact, not once per repository. Include direct and transitive components, versions, package URLs, hashes, dependency relationships, licenses, and creation metadata. SPDX 3.0 and CycloneDX 1.7 are current interoperable choices as of this chapter; select a canonical organizational format but ingest both.

An SBOM becomes operational when policy correlates it with vulnerability intelligence, approved licenses, package-source policy, end-of-life data, and exceptions. A changed dependency graph should affect risk and may invalidate prior security evidence.

### Harden the builder and publication boundary

Prefer ephemeral, isolated builders with minimal permissions; pinned actions and dependencies; short-lived workload identities; protected source; hermetic or controlled inputs; secret redaction; and separate build and release authority. Sign by digest, verify before promotion, and record the expected signer identity and workflow—not merely “any valid signature.”

SLSA’s central lesson is that provenance strength depends on the build platform’s resistance to producer-controlled falsification. Asking the same mutable worker to generate and vouch for its own history is weak assurance.

### Make verification a policy gate

Before release, verify:

1. subject digest equals the candidate artifact;
2. attestation and predicate types are allowed and version-supported;
3. signature chain, timestamp, and transparency proof are valid;
4. signer/workload identity matches policy;
5. builder and source repository are authorized;
6. source, Plan, WorkOrder, and execution-manifest lineage match;
7. required SBOM and scan results concern the same digest; and
8. attestations are current, not revoked, and free of conflicting claims.

GitHub correctly warns that artifact attestations establish provenance and integrity, not a guarantee of security. Verification is mandatory at the consumption boundary.

### Treat prompts, tools, and models as dependencies

For agent-produced work, provenance should also record the executor configuration, model/provider identifier, tool and MCP server versions, policy bundle, context sources, and prompt/instruction digest where retention policy permits. Do not store secrets or unrestricted prompt content in public attestations. The goal is reproducibility and accountability, not disclosure of sensitive reasoning.

## 4. Tradeoffs

Hermetic builds and high SLSA levels cost engineering time and may not fit every ecosystem. Transparency can conflict with confidentiality. Keyless identity reduces key management but creates dependence on identity providers and trust roots. SBOMs can expose sensitive component data. Apply stronger controls to consequential artifacts while keeping hard identity and digest binding universal.

## 5. Current Mission Control Implementation

Mission Control models repository/base/head SHA lineage, run artifacts, verification receipts, GitHub CI ingestion, and release/deployment records. The current staged working tree contains additional Attempt, execution-manifest, isolated-worktree, path-scope, and GitHub App publication work. Because `convex/factory/attempts.ts` and `apps/orchestration-server/src/githubAppRuntime.ts` are staged but absent from local HEAD, this chapter treats them as implementation candidates rather than current capability.

It does not yet demonstrate a canonical SLSA provenance pipeline, SBOM generation and policy, Sigstore/in-toto verification, signed Quality Proof Packages, or a transparency-backed evidence ledger. These are future controls, not current product claims.

## 6. Future Vision

Add a supply-chain verifier that ingests native attestations, normalizes subject and producer identity, evaluates organizational policy, and attaches the decision to the exact WorkOrder and release candidate. Start with source/commit/build digest lineage and one signed build attestation; then add SBOM and dependency governance; only then make provenance a release-blocking gate.

## 7. Versioned references

- Mission Control local HEAD: `a49064875d0711253d74029e3066cc74c7c1c2a5`; staged-only files are labeled separately
- Product sources: `convex/factory/attempts.ts`, `convex/factory/githubCi.ts`, `apps/orchestration-server/src/githubAppRuntime.ts`, `convex/schema.ts`
- SLSA specification 1.2 and provenance v1
- in-toto Attestation Framework, Statement v1, and DSSE
- SPDX 3.0; CycloneDX 1.7
- Sigstore Cosign verification guidance
- NIST SP 800-218 SSDF 1.1, especially provenance practice PS.3.2

## 8. Personal notes and lessons learned

- Provenance answers “how did these bytes come to exist?” Quality evidence answers “why are these bytes acceptable?” Both are required.
- A signature without an identity policy is only a cryptographic fact.
- Tags locate; digests identify.
- The factory itself is part of the software supply chain and must be governed accordingly.

## 9. Design review questions

1. What does SLSA provenance prove, and what does it not prove?
2. How are SBOM, attestation, signature, and transparency log different?
3. Why is builder isolation important when agents generate software?
4. How would you revoke trust in an already-issued quality certificate?
5. What agent-runtime inputs belong in provenance without exposing secrets?

## 10. Whiteboard exercise

Draw the chain from approved Plan to deployed digest. Mark every identity, trust boundary, signing event, verification event, mutable reference, and revocation check. Then show how a compromised dependency registry and a compromised CI worker are detected by different controls.

## 11. Hands-on lab

Build the lab repository in GitHub Actions, generate SPDX or CycloneDX SBOM output, and create a GitHub artifact attestation. Verify it by digest and expected workflow identity. Replace the artifact while retaining its filename and demonstrate failed verification. Retain the commands, subject digest, signer identity, SBOM hash, policy result, and explanation of what remains unproven.
