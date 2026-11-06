---
title: "Build and run your first FDLC software factory"
summary: "A practical engineering journey: deterministic demo, optional Mission Control walkthrough, your own stack, portable contracts, qualification evidence and a six-phase playbook."
status: executable-example
audience: [builder, architect, operator]
last_verified: 2026-11-06
topics: [engineering, tutorial, qualification, evidence, portability]
---

# Build and run your first FDLC software factory

Learn the framework. Build your factory. Verify the outcome.

**FDLC defines the engineering discipline, not the technology stack.** It is an open, implementation-independent framework for designing, building, operating, verifying, governing and improving software factories. Choose your agents, harnesses, models, tools, orchestration, runtime and infrastructure. Mission Control is an optional open-source reference implementation of selected control-plane concepts. It is not required by FDLC or by the portable exercise below.

Framework requirements define contracts and invariants. Reference architecture assigns responsibilities. Illustrative examples explain them. Executable implementations run code. Verified capabilities require attributable evidence at an exact configuration and scope. Keep these five claims separate; a demo does not establish production qualification or universal interchangeability.

## The engineering journey

| Learning step | Do this | Leave with |
| --- | --- | --- |
| Learn | Inspect the [Framework and Factory Explorer](https://fdlc.ai/framework#explorer), [architecture](https://fdlc.ai/architecture) and [chapter 2](../01-understand/02-the-factory-in-one-view.md). | Shared vocabulary and boundaries. |
| Design | Use the existing [Factory Definition builder](https://fdlc.ai/start); record outcomes, workload, acceptance, context, verifier and human decision rights. | Factory Definition and a reviewable design contract. |
| Build | Follow Path B below; use your own stack behind the same contracts. | A working, bounded factory implementation. |
| Run | Submit the sample intent in the [existing browser Simulator](https://fdlc.ai/simulator), or execute the Reference Lab. | WorkOrder, Tasks, Attempts, artifacts and retained evidence. |
| Verify | Inspect exact-candidate checks, policy decisions and qualification gaps below. | Verified local outcome or controlled failure. |
| Improve | Preserve failure evidence, propose a correction and qualify a new Factory Version. | A governed improvement proposal and promotion decision. |

This is a **learning path**, not another governing lifecycle. Preserve **One Enterprise Platform → Composable Factories → Reusable Capabilities → Verified Outcomes** and the enterprise delivery view **Intent → Plan → Route → Execute → Verify → Release → Learn**. The Guide's eight-stage value stream and six architectural areas retain their existing meanings.

## Start with the browser demonstration

Open the [Simulator](https://fdlc.ai/simulator). No account, installation or live execution is involved. Submit the bounded intent **Fix a failing API test** and inspect every step:

1. Intent and protected acceptance criteria.
2. Approved Plan and WorkOrder, with separate implementation and verification Tasks.
3. Factory selection after workload eligibility, then Task routing.
4. Scripted producer Attempt and unpublished Candidate.
5. Independent verifier role, criterion results and evidence lineage.
6. Policy decision and final disposition.

Choose **Failed verification + recovery**. Run to the next boundary, inspect the failure, apply the correction and continue. The first failed record remains alongside the new Candidate's verification. Choose **Human approval required**: passing checks stop at a human decision. Approve or reject the sample request; neither action publishes, merges or deploys software. Additional fault controls cover scope, self-verification, stale and missing evidence.

All browser identities, qualification records and results are synthetic teaching data. The executable Lab below measures actual local behavior. Neither claims a real autonomous operating domain.

## Path B — build with your own stack

**Allow 30–60 minutes**, estimated for a developer with Git and Node 22.13+. This is a learning estimate, not measured onboarding performance. No npm install, account, API key, model or external service is needed. Use a new folder. The implementation branch below contains this expanded exercise; do not substitute an older release that lacks the API and report commands.

```sh
git clone --branch codex/engineering-experience --single-branch https://github.com/jaydubya818/FDLC.git
cd FDLC/reference-factory
node lab.mjs all
node lab.mjs failed
node lab.mjs recovery
node lab.mjs approval
node lab.mjs --report > qualification.json
```

### 1. Inspect the frozen contract — 5 minutes

Read [Factory Definition](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/factory-definition.json), [WorkOrder](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/work-order.json) and [protected API checks](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/sandbox/tests/api.test.mjs). AC-1 requires `GET /sum?a=2&b=3` to return 200 with sum 5; AC-2 preserves 400 on invalid input; AC-3 preserves 404 for unknown paths. The producer may write only `src/add.js`. The test uses native Request/Response objects without opening a server or contacting a host.

The Lab's small definition is a pedagogical contract, not a schema-valid canonical Factory Manifest. The [builder](https://fdlc.ai/start) and canonical specification remain separate representations; do not assume import compatibility.

### 2. Run and trace the implementation — 10 minutes

Read [lab.mjs](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/lab.mjs): `runAgent` proposes a known correction, `runVerifier` executes protected tests in a fresh Node process, and `gate` checks observed paths, identity separation, exact candidate digest and passing evidence. Follow `runScenario` from a temporary fixture copy to its retained result.

All eight scenarios must print `(ok)`. A blocked scenario exits 0 when the gate denies for the expected reason; this is a successful negative control, not a successful software outcome. `ALLOW` means local review eligibility. `WAIT` in the approval case means production authority is absent. No command publishes or releases.

### 3. Break, recover and inspect evidence — 10 minutes

Compare the failed API result with recovery. Inspect `history[0].evidence`, its blocked gate result and Candidate digest, then the corrected result's new digest and passing verifier output. Re-verification must not erase the failed record. Run scope, self-verify, stale and missing cases with `node lab.mjs scope`, `node lab.mjs self-verify`, `node lab.mjs stale` and `node lab.mjs missing`.

Temporary copies are removed after each case. `qualification.json` retains evidence output, candidate and output hashes, policy decisions and failed history. Preserve the report for review; local hashes detect currentness, not a hostile operator rewriting all records.

### 4. Replace one seam — 10–25 minutes

Keep the WorkOrder and protected acceptance criteria. Replace `runAgent(dir)` with your own executor, returning an attributable identity and changed-file list after it produces an unpublished Candidate. Your choice can be an agent, harness, deterministic tool or manually applied patch for the first exercise. Retain independent verification, evidence and authorization as separate responsibilities.

For real operation, protected tests, verifier identity, policy and release credentials must be outside producer control. Separate functions and identity strings in a trusted local process are illustrative separation, **not security isolation**. A temporary directory is not a sandbox. Add the isolation, authenticated identity, resource limits, evidence retention and recovery policy your workload requires. Qualify every changed agent/harness/model/runtime configuration before routing real work to it.

The [Factory Skills Starter Kit](https://fdlc.ai/factory-skills) is an optional, opinionated Codex pilot with pinned skills. It checks selected local evidence and preserves human review; it does not independently certify the result, sandbox code or establish compatibility with other harnesses. FDLC does not require it.

## Path A — experience Mission Control

Mission Control is optional. This walkthrough follows its [README at reviewed revision eb0598123b818fcf6f0a4e9b2851839550749c8d](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/README.md#quickstart) and [actual package scripts](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/package.json). Requires Git, Node 20+, pnpm 9+ and a Convex development deployment; Convex may require its own account. Model, GitHub and sandbox provider credentials are not required for its deterministic demo.

```sh
git clone https://github.com/jaydubya818/MissionControl.git
cd MissionControl
git checkout --detach eb0598123b818fcf6f0a4e9b2851839550749c8d
corepack enable
pnpm install
pnpm exec convex dev --once
```

Convex creates or links a development deployment. In `.env.local`, copy the generated `CONVEX_URL` value into `VITE_CONVEX_URL`. Do not paste production credentials. Then use two terminals in this checkout:

```sh
# Terminal 1
pnpm run dev:demo

# Terminal 2, after Convex functions are ready
pnpm run convex:seed:demo:force
```

Open `http://localhost:5199/v2/command-center` and select **Software Factory Demo** (`sf-demo`). Inspect Mission intent and approved Plan, WorkOrders and Tasks, Factory configuration/readiness, one Attempt, verification and evidence, and approval/audit history. The [source demo fixture](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/convex/seedMissionControlDemo.ts) and [official walkthrough](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/docs/site/get-started/run-the-demo.md) explain the existing views. Seeded outcomes are not proof of live agent delivery.

For controlled verification failures and recovery, use Path B or the browser Simulator. Do not assume an undocumented Mission Control demo button triggers those operations. Mission Control's actual local qualification includes negative controls in [factory verification tests](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/apps/orchestration-server/src/__tests__/factoryVerification.test.ts) and [system qualification tests](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/apps/orchestration-server/src/__tests__/systemFactoryQualification.test.ts). In a prepared local checkout, the existing qualification script uses these commands:

```sh
pnpm run ci:prepare
pnpm --filter @mission-control/orchestration-server exec vitest run src/__tests__/factoryVerification.test.ts src/__tests__/systemFactoryQualification.test.ts
```

The broader `pnpm run qualify:factory` script writes evidence and has additional prerequisites; read [its source](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/scripts/system-factory-e2e-qualification.mjs) before using it. Consult [retained qualification evidence](https://github.com/jaydubya818/MissionControl/blob/eb0598123b818fcf6f0a4e9b2851839550749c8d/docs/testing/evidence/system-factory-e2e-v2/README.md), the current [capability ledger](https://github.com/jaydubya818/MissionControl/blob/main/docs/product/software-factory-capability-maturity.md), and the [FDLC Mission Control page](https://fdlc.ai/mission-control#capabilities) for implemented, experimental and proposed boundaries. This tutorial source-checks commands; it does not claim a fresh Mission Control installation or qualification run.

## Concept → architecture → contract → implementation → test → evidence

| Concept and architectural owner | Contract | Working source | Verification and evidence / failure |
| --- | --- | --- | --- |
| Intent / owner and planner | Approved outcome, scope and protected acceptance | [WorkOrder](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/work-order.json) | [API tests](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/sandbox/tests/api.test.mjs) evaluate AC-1/2/3; failure blocks. |
| Bounded execution / harness | Producer write scope and attributable Candidate | [runAgent and observed changedFiles](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/reference-factory/lab.mjs) | Scope case and [negative controls](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/tests/unit/reference-factory.test.ts); hidden or protected-file changes deny. |
| Independent verification / Trust | Exact Candidate, separate role, protected criteria | Same Lab's runVerifier and gate; [chapter 27](../04-prove/27-quality-and-evidence-architecture.md) | Missing, self-signed, stale and failed evidence deny; JSON retains outputs and hashes. Security independence remains unqualified. |
| Recovery / runtime | Bounded new Attempt, immutable prior history | Same Lab's recovery scenario; [chapter 14](../03-build/14-durable-execution.md) | Failed record retained, corrected Candidate differs, verifier re-runs. No silent retry success. |
| Authorization / policy and human | Eligibility separate from acceptance and release | Approval scenario; [chapter 7](../02-design/07-governance-policy-and-risk-proportional-approval.md) | Passing evidence leaves production request awaiting-human; released=false. |
| Governed improvement / Learning | Proposal, independent evaluation, authorized Version promotion | [chapter 40](../06-improve/40-governed-learning.md); browser and Lab recovery are teaching examples | A local correction demonstrates re-verification; automatic production improvement is not implemented. |

Mission Control is one additional source-mapped implementation, not the exclusive reference. The Lab, Simulator, builder and Starter Kit serve different purposes with their boundaries visible.

## Portable contracts

The existing [FDLC Specification](https://fdlc.ai/specification) is a proposed standard. Its schemas already describe the requested independent contracts; this exercise does not replace them or add a second wire format.

| Engineering requirement | Existing canonical representation |
| --- | --- |
| Factory identity, supported outcomes/workloads, ownership | Factory Manifest: id, namespace, capabilities, specialization, inputs, outputs, owner. |
| Capability and execution constraints | Manifest: execution_profiles, model_routes, runtime, sandbox, network_policy, credential_policy. |
| Acceptance, verification and evidence | Manifest: verification.contract, independence, currentnessRule, evidence; WorkOrder acceptance and exact Candidate/Verification records. |
| Authority boundaries | Manifest: risk_class, autonomy_ceiling, approval_policy, release_policy. |
| Immutable composition | Factory Version: factoryManifestDigest, composition, compositionDigest, riskBoundary, qualification, activations. |
| Qualification scope and results | Qualification Record: subject, scope, dimensions, suites, evidenceIds, state and result. |

Inspect the actual [Factory Manifest schema](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/content/fdlc-corpus/corpus/specification/schemas/factory-manifest.schema.json), [Factory Version schema](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/content/fdlc-corpus/corpus/specification/schemas/factory-version.schema.json) and [Qualification Record schema](https://github.com/jaydubya818/FDLC/blob/codex/engineering-experience/content/fdlc-corpus/corpus/specification/schemas/qualification-record.schema.json). Schema validity alone does not qualify an implementation.

**Two illustrative bindings, one outcome contract:** Factory A could use a local single-agent harness and hosted model; Factory B could use containerized specialized agents and a self-hosted model. Both must preserve AC-1/2/3, protected tests, exact-candidate evidence, bounded recovery and explicit authority. Their agent, harness, model, runtime and context identities differ, so their Factory Versions and qualification evidence differ. These are architecture examples, not implemented integrations or qualified adapters. Portability requires documented interfaces and demonstrated compatibility; it does not promise plug-and-play substitution.

## Qualification

Run `node lab.mjs --report > qualification.json` from `reference-factory`. Inspect the generated report, not a copied green score:

- **Identity and scope:** exact Factory Version/composition digest, API-arithmetic workload, Node/platform/architecture, fixture and configuration.
- **Scenarios and criteria:** eight cases, expected and observed dispositions, protected AC-1/2/3, matched and mismatched counts. Expect matched=8 and mismatched=0.
- **Evidence:** Candidate SHA-256, verifier output/output digest, policy reasons, failed Attempt history and recovery result.
- **Measured boundaries:** functional checks, scope enforcement, missing/self-signed/stale evidence denial, controlled failure and recovery.
- **Unqualified dimensions:** security isolation, authenticated independent verifier authority, live model/harness compatibility, production context sufficiency, reliability, latency and total cost. No model calls does not mean zero operating cost.
- **Operating domain:** trusted deterministic local fixture only. `productionQualified` remains false; the report grants no production operating domain or activation.

This is an illustrative report with real local test results. It is not the canonical Qualification Record payload. A real assessment needs representative functional and failure cases, isolation and policy tests, recovery, context sufficiency, evidence completeness, exact model/harness/runtime compatibility, costs, reliability denominators/windows and operational limitations. UNKNOWN hard requirements cannot be silently treated as passing. See [chapter 29](../04-prove/29-evaluation-engineering.md), [chapter 30](../04-prove/30-evals-as-factory-assets.md) and [chapter 8's scorecard](../02-design/08-economics-metrics-and-human-attention.md#factory-performance-scorecard).

Maintainer checks from the FDLC repository root:

```sh
node --experimental-strip-types --test tests/unit/reference-factory.test.ts tests/unit/runtime-simulator.test.ts
```

These tests exercise real denial and recovery behavior, including a producer hiding a protected-test change. They do not qualify a model or certify the local machine's security boundary.

## Engineering playbook

Use the existing [system-design worksheet](./factory-system-design-playbook.md) for detailed review. These six phases make the practical deliverable and acceptance gate explicit.

### Define

**Objective / prerequisite:** one business outcome and an accountable owner. **Activities:** define workload, scope, protected acceptance criteria, authority and budget. **Deliverable:** Factory Definition. **Acceptance:** every criterion has an owner and observable result; consequential decisions have named authority. **Example:** API repair with AC-1/2/3. **Common failure:** a broad “fix everything” task or unowned acceptance. Read [intent engineering](../02-design/06-intent-and-specification-engineering.md).

### Architect

**Objective / prerequisite:** approved Definition. **Activities:** choose execution, agent/harness interfaces, context, tools, independent verifier, isolation, policy and evidence storage. **Deliverable:** Factory Architecture. **Acceptance:** identities and boundaries are explicit; failures have stop/recovery behavior. **Example:** producer writes src/add.js while protected tests remain outside its grant. **Common failure:** confusing different model prompts with independent authority. Read [control and execution planes](../03-build/13-control-plane-orchestrator-and-execution-plane.md) and [context engineering](../03-build/20-context-engineering.md).

### Implement

**Objective / prerequisite:** reviewed architecture and interfaces. **Activities:** wire WorkOrders, routing, execution, recovery, evidence and observability. **Deliverable:** Working Factory. **Acceptance:** bounded end-to-end outcome and controlled failure execute with attributable records. **Example:** run the eight Lab cases. **Common failure:** a completed Task silently accepts its parent WorkOrder. Read [durable execution](../03-build/14-durable-execution.md).

### Qualify

**Objective / prerequisite:** frozen Factory Version and representative workload suite. **Activities:** functional, independent verification, policy, isolation, recovery, compatibility, reliability and cost checks. **Deliverable:** scoped Qualification Record. **Acceptance:** evidence covers every hard requirement; unknowns and exclusions remain visible. **Example:** the Lab report explicitly leaves production qualification false. **Common failure:** one happy path standing in for reliability. Read [evaluation engineering](../04-prove/29-evaluation-engineering.md).

### Operate

**Objective / prerequisite:** authorized activation within a qualified domain. **Activities:** observe outcomes, retain evidence, manage incidents, costs, ownership and rollback. **Deliverable:** Operational Factory. **Acceptance:** accountable operators can detect, contain and recover failures with evidence. **Example:** define a pause threshold and restoration owner before a real pilot; this is a requirement, not a Lab capability. **Common failure:** merge mistaken for production verification. Read [production reliability](./production-reliability-operations-playbook.md).

### Improve

**Objective / prerequisite:** retained production or evaluation evidence. **Activities:** analyze failure, propose a context/workflow/capability correction, independently evaluate, qualify a new Version and seek promotion authority. **Deliverable:** Governed Factory Evolution. **Acceptance:** comparison uses the same workload; earlier evidence is preserved; promotion is explicit and reversible. **Example:** preserve failed API evidence before correction and re-verification. **Common failure:** a passing proposal changing its own policy or activation. Read [governed learning](../06-improve/40-governed-learning.md).

## Your next engineering step

Choose one next step: define a bounded workload in the [builder](https://fdlc.ai/start), inspect the [Simulator](https://fdlc.ai/simulator), or replace the Lab producer with your preferred stack. Preserve the original evidence and add representative negative controls before broadening authority. The new Version must earn its operating domain; the framework does not choose your technology or grant compatibility on your behalf.
