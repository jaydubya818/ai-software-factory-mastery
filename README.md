# AI Software Factory Mastery

This private repository is a graduate-level textbook and laboratory for
mastering AI Software Factories.

Its purpose is narrow. Every chapter, lab, exercise, research note, and case
study must help answer one question:

> Does this help me master AI Software Factories?

If the answer is no, the material does not belong here.

## Objective

The guide should develop the technical depth and leadership judgment required
to explain an AI Software Factory from first principles, design and build one,
operate and improve it, lead an engineering organization adopting it, and
defend its tradeoffs to technical and executive audiences.

Successful mastery means being able to:

- explain AI Software Factories with unusual precision;
- whiteboard the complete operating model from memory;
- distinguish enduring principles from current implementation choices;
- design the domain, control, execution, validation, and evidence architecture;
- build and debug the important paths;
- lead organizational adoption without overstating capability or safety;
- teach developers, CTOs, CEOs, founders, boards, and investors; and
- perform strongly in senior technical and engineering-leadership interviews.

## Working definition

An AI Software Factory is a governed engineering operating model where humans
define intent, constraints, priorities, and acceptable risk while autonomous
agents continuously plan, implement, validate, document, and improve software.
Humans retain accountability. Agents provide execution. The goal is to reduce
the time from business intent to validated customer value while improving
quality, governance, and engineering leverage.

This is a working definition to test and refine throughout the curriculum. The
first full treatment is [What Is an AI Software Factory?](./guide/01-vision/01-what-is-an-ai-software-factory.md).

## Governing positions

- The factory governs deployment decisions, policy, evidence, and approval. An
  authorized CI/CD system may perform the deployment.
- Multi-agent orchestration is a required capability, not a requirement for
  every workflow. Simple work should remain simple.
- Validation must be separate from the execution that produced the change. A
  worker cannot be the sole authority that declares its own success.
- The factory may collect learning candidates automatically. Humans must review
  and promote changes to prompts, policies, workflows, evaluations, or
  operational behavior.
- Factory success requires simultaneous improvement in lead time to validated
  customer value, change failure rate, and engineering leverage.
- Humans always own material risk acceptance. Agents execute only within the
  authority humans have granted.

## Foundational thesis

The factory does not depend on trusting a probabilistic model. It depends on a
trustworthy operating system around fallible agents. Governance, policy,
independent validation, evidence, human approval, auditability, progressive
autonomy, and continuous measurement make autonomous execution governable.

The goal is not to make AI infallible. The goal is to make failure detectable,
bounded, recoverable, and accountable.

Trust is earned through evidence, governed by policy, and continuously
calibrated by outcomes—not by model capability. See
[Operational Autonomy and Trust Calibration](./guide/02-first-principles/01-operational-autonomy-and-trust-calibration.md).

The system may compute trust numerically, but operators govern through clear
trust bands. Promotion requires sustained evidence and a human decision.
Trust-loss events reduce autonomy automatically until review.

## Repository boundary

This is not a life operating system, journal, general leadership book, or
self-improvement repository. Personal vision, health, relationships, financial
planning, general reading notes, and unrelated career material belong
elsewhere.

Engineering leadership belongs here only when it concerns designing, adopting,
operating, governing, or communicating AI Software Factories.

## Curriculum

The curriculum covers twelve connected areas:

1. vision;
2. first principles;
3. operating model;
4. domain model;
5. runtime architecture;
6. AI engineering;
7. quality engineering;
8. security and governance;
9. Mission Control case studies;
10. labs;
11. interview mastery; and
12. research journal.

See the [curriculum map](./guide/README.md) for the detailed scope.

## Writing standard

The guide should read like a serious engineering textbook and technical
leadership reference. It should develop arguments, explain causes, examine
tradeoffs, and connect theory to operable systems. It should not read like a
slide deck, marketing page, social-media post, or collection of unsupported
bullet points.

Every full chapter follows the [chapter writing standard](./guide/writing-standard.md).

The initial body of primary industry, research, systems, and operating-model
sources is maintained in the [research canon](./guide/12-research-journal/initial-canon.md).

## Mission Control as a living case study

Mission Control is studied, not copied. Product documentation remains in the
Mission Control repository.

A case study should identify the enduring principle, link the relevant ADR,
document, or implementation, record the exact commit studied, and explain the
lesson and tradeoff in original words. The guide asks, “What did I learn from
Mission Control?” rather than reproducing what its documentation says.

## Source material

The original AI Software Factory mission and interview study guide remain
[preserved as research](./source-material/README.md). They are inputs to future
synthesis, not current doctrine.

## Status

The repository structure is established. Full chapters and labs should be
added deliberately, with technical depth and verifiable references.
