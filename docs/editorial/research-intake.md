---
title: Editorial Research Intake
status: active
date: 2026-09-04
---

# Editorial Research Intake

The public guide is under an editorial content freeze while the consolidation
plan is active. New research belongs here until the consolidated release passes
its Phase 5 review.

Do not add an intake item directly to `guide/`. An item must first identify its
source, the reader problem it solves, the existing canonical owner, and whether
it replaces or merely repeats current material.

## Intake template

```markdown
### Candidate title

- Source:
- Source type:
- Publication date:
- Access date:
- Proposed canonical owner:
- Reader problem solved:
- Current material replaced or corrected:
- Evidence strength and limitations:
- Decision: pending | accept | reject | defer
```

## Reviewed additions

### Architecture and system-design study graphics

- Source: user-supplied `codex-clipboard-225a7629-b9ad-4b63-bacf-48e7f13fdb48.png`
  and `codex-clipboard-332ab36a-6cc2-44fb-8c5e-ff63cd231bf4.png`.
- Source type: internal synthesis; original author, title, publication date, and
  URL are unavailable.
- Publication date: unknown.
- Access date: 2026-09-03.
- Proposed canonical owner: Appendix E, with detailed mechanisms retained in
  their existing chapters.
- Reader problem solved: practice system design, estate-scale review, bounded
  agent implementation, and operational judgment without creating a new
  canonical model.
- Current material replaced or corrected: the graphics' layer stacks are
  translated into the eight-stage value stream and six-area architecture;
  organization-specific scale figures are labeled as scenario assumptions.
- Evidence strength and limitations: suitable as prompts only; not evidence
  for organization size, implementation status, or industry claims.
- Decision: accept the missing study prompts; reject the graphics as factual
  sources or public architecture diagrams.

The authoritative foundations used to verify the accepted guidance are listed
with authors, titles, dates, URLs, source type, and derived claims in Appendix
E's “External foundations” table.

### Estate-scale code-review study artifacts

- Source: user-supplied `codex-clipboard-85e906b6-5d2a-4413-96f7-0df4f6f7d457.png`
  and attachment `076aabef-30cc-4157-9219-22be6b746d8d/pasted-text.txt`.
- Source type: internal synthesis; original author, publication date, and URL
  are unavailable.
- Publication date: unknown.
- Access date: 2026-09-03.
- Proposed canonical owner: Chapter 39, supported by Chapters 16, 17, 20–23,
  26–29, and 33.
- Reader problem solved: selecting and operating review capabilities across a
  heterogeneous repository estate without surrendering policy, evidence,
  security, or learning to a reviewer implementation.
- Current material replaced or corrected: the supplied sequence placed learning
  before evidence and human disposition; the canonical pipeline keeps Outcome
  before Learn. Employer-specific language and unverified scale claims were not
  imported.
- Evidence strength and limitations: suitable as architecture prompts only;
  vendor examples, organization scale, and claimed internal practices require
  independent source records before publication.
- Decision: accept missing build/adopt benchmarking, capability routing and
  fallback, untrusted-repository controls, and scorecard material; reject a new
  lifecycle, product-specific terminology, and the supplied graphic as public
  evidence.

### Agentic implementation study artifacts

- Source: user-supplied `codex-clipboard-1c4aa057-a962-4a4f-bfa2-39943c4c45d9.png`
  and attachments `0a091675-c62d-4906-affa-2cfed694db50/pasted-text.txt`,
  `24b1a15d-3d12-489b-a12e-6135ff73303a/pasted-text.txt`, and
  `f78edaa3-d4df-4894-a425-a3c1ad218835/pasted-text.txt`.
- Source type: internal synthesis; original author, publication date, and URL
  are unavailable.
- Publication date: unknown.
- Access date: 2026-09-03.
- Proposed canonical owner: Appendix E, with Chapters 12, 15, 17, 18, 23, and
  32 retaining the detailed mechanisms.
- Reader problem solved: translating factory architecture into small,
  testable implementation slices without confusing a working example with a
  production-ready subsystem.
- Current material replaced or corrected: three substantially overlapping
  scripts and one generated graphic were reduced to one implementation
  contract, eight component slices, and a boundary-test matrix. Small-first was
  clarified to preserve mandatory safety boundaries from the initial slice.
- Evidence strength and limitations: suitable as exercise prompts only. The
  generated code snippets were not treated as verified reference
  implementations, and organization-specific statements were not imported.
- Decision: accept the implementation and edge-case gaps; reject duplicated
  scripts, hiring-process framing, product-specific language, scale claims, and
  the supplied graphic as public evidence.

### Technical-vision and architecture-bet artifact

- Source: user-supplied
  `codex-clipboard-c1c1573a-de97-4ff0-8cdc-69b5043f86e5.png` and attachment
  `d8a17f70-961a-4747-9d4c-b6121d43929f/pasted-text.txt`.
- Source type: primary-author internal synthesis; no public URL.
- Publication date: unpublished working paper; reviewed 2026-09-03.
- Access date: 2026-09-03.
- Proposed canonical owner: Chapters 1, 27, and 44.
- Reader problem solved: distinguish abundant code generation from trusted
  delivery, define the execution trajectory's place in the evidence package,
  and state what evidence would change the architecture.
- Current material replaced or corrected: the supplied fifteen-panel model was
  not added as another canonical framework. Three missing ideas were integrated
  into existing owners; organization-specific framing, hiring guidance,
  unverified scale claims, and vendor examples were not imported.
- Evidence strength and limitations: useful as a primary-author design thesis,
  not proof of future economics or capability. The future-facing claims are
  explicitly labeled as hypotheses with falsifiers and design responses.
- Decision: accept the opening thesis, trajectory boundary, and falsifier
  ledger; reject the duplicate framework and organization-specific material.

### LinkedIn agent-engineering source set

- Source: seven user-supplied `lnkd.in` redirect links and Andrew Ng's
  *AI Engineering Skills Map: Using coding agents* article. The redirects were
  resolved to their canonical LinkedIn posts on 2026-09-04.
- Source type: public named-author practitioner material. These sources provide
  design prompts and corroboration, not independent production evidence.
- Publication date: Andrew Ng's article is dated 2026-09-04. The accessible
  pages for the seven posts expose only relative ages; exact publication dates
  are unavailable.
- Access date: 2026-09-04.
- Proposed canonical owners: Chapters 6, 15–16, 23–24, 29–30, 33, and 43.
- Reader problem solved: distinguish skill from tool familiarity, stop goal
  drift before real-world effects, and keep semantic safety separate from
  transactional correctness without importing more stack diagrams.
- Evidence strength and limitations: LinkedIn posts compress and sometimes
  overstate architecture. Product lists, performance targets, capability
  claims, and comments are hypotheses or practitioner opinion unless supported
  by the guide's primary canon. The original recording behind the embedded
  Maria Vechtomova transcript was not independently identified.

| Source | Editorial decision |
| --- | --- |
| [Andrew Ng, *AI Engineering Skills Map: Using coding agents*](https://www.linkedin.com/pulse/ai-engineering-skills-map-using-coding-agents-andrew-ng-h8yxc/) | Accept the five observable operating skills into Chapter 43's existing scorecard; do not add a new lifecycle. |
| [Arunkumar Palanisamy, ten agent-system building blocks](https://www.linkedin.com/posts/arunrps_aiagents-agenticai-aiengineering-share-7501525631336103936-9Hhk/) | Accept the narrow pre-effect intent-consistency check into Chapter 6; the ten-block taxonomy otherwise repeats existing owners. |
| [Kapil Y., *The 4 Layers of an Agent System Explained*](https://www.linkedin.com/posts/kapily_%F0%9D%97%A7%F0%9D%97%B5%F0%9D%97%B2-%F0%9D%9F%B0-%F0%9D%97%9F%F0%9D%97%AE%F0%9D%98%86%F0%9D%97%B2%F0%9D%97%BF%F0%9D%98%80-%F0%9D%97%BC%F0%9D%97%B3-%F0%9D%97%AE%F0%9D%97%BB-%F0%9D%97%94%F0%9D%97%B4%F0%9D%97%B2%F0%9D%97%BB-share-7500142379526414336-sW7D/) | Corroborates Chapters 15–16 and 23–24. Update the existing provenance row with the exact author and URL; add no fifth top-level model. |
| [Ali Azzam, production-agent evaluation post with embedded Maria Vechtomova transcript](https://www.linkedin.com/posts/syedaliazzam_if-youre-building-ai-agents-this-is-a-must-watch-ugcPost-7500226264142680065-fRGW/) | Corroborates configuration lineage, eval drift, offline/inline/production evaluation, and governed promotion already owned by Chapters 29–30. No duplicate pipeline added. |
| [Sivasankar Natarajan, *Agentic AI Architecture Explained*, and discussion](https://www.linkedin.com/posts/sivasankar-natarajan_agenticai-aiarchitecture-enterpriseai-share-7500172453978173440-rTKP/) | Accept the narrow distinction among content safety, schema validity, authorization, and transactional correctness into Chapter 33; do not import the product map. |
| [Siddharth Kharche, customer-support agent architecture](https://www.linkedin.com/posts/sid-k09_ai-generativeai-conversationalai-share-7500084489478668288-k0yf/) | Reject as new guide material. The architecture repeats existing layers, confidence is not an authority model, and the performance claims have no supporting evidence. |
| [Quantumatix Technologies, agent-type taxonomy](https://www.linkedin.com/posts/aiagents-generativeai-agenticai-share-7493997941880401921-y5il/) | Reject as a new taxonomy. Reactive, deliberative, tool-using, retrieval-grounded, and multi-agent behavior already fit the guide's workflow and topology owners. |
| [Claude Central, modern AI stack map](https://www.linkedin.com/posts/ai-artificialintelligence-aiagents-share-7500125010901221376-4VCk/) | Reject as architecture. It is a useful capability and vendor inventory, but it mixes patterns, techniques, infrastructure, and cross-cutting controls; Chapter 25 already supplies the labeled reference view. |

- Decision: accept three narrow additions and one provenance correction;
  retain one source as corroboration; reject the remaining taxonomies,
  unverified claims, and duplicate layer models.

## Pending

No pending items.
