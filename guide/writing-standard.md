# Guide Writing Standard

## Purpose

AI Software Factory Mastery is a technical field guide. It should help a reader
understand, design, build, verify, operate, and improve a factory—not simulate a
course interface or reward completion mechanics.

Every chapter should leave the reader able to make a better system decision.
Concise writing is welcome. Thin writing is not. Use prose, diagrams, tables,
examples, and evidence to develop an argument. Lists should clarify structure,
not replace explanation.

## Epistemic boundaries

Every material claim belongs to one of these categories:

1. **Enduring principle** — a responsibility or constraint expected to survive
   changes in products, vendors, models, and implementation stacks.
2. **Current implementation** — behavior traceable to an exact version of a
   real system through decisions, source code, tests, runtime behavior, and
   evidence.
3. **Planned capability** — a desired or plausible capability that has not met
   the current-implementation evidence bar.

Use a current-implementation section only when the chapter studies a real
implementation. Use a planned-capability section only when something is
actually unimplemented. Never place a working capability under “Future Vision”
because a template requires that heading.

Mission Control is one living control-plane implementation and case study. It
is not the definition of an AI Software Factory. Current Mission Control claims
must cite the exact commit or deployment inspected and state missing evidence.

## Recommended chapter structure

Full chapters normally use this sequence, adapting it to the subject:

### At a glance

State the purpose, essential mental model, and the few ideas worth retaining.
Do not use a reading-time estimate, progress mechanic, or alternate content
mode. The summary orients the reader; it does not replace the full chapter.

### 1. The problem

Describe the engineering or organizational problem before introducing a
solution. Make consequences concrete. Name who experiences the problem and
what fails when it remains unresolved.

### 2. System model or enduring principle

Explain the responsibilities, boundaries, records, flows, decisions, and
invariants. State the conditions under which the model may not apply.

### 3. Design and implementation

Show how to design or build the relevant capability. Include contracts,
states, interfaces, sequences, examples, and operational considerations.

### 4. Tradeoffs and alternatives

Explain what the design costs, which simpler or different approaches exist,
and when another system should choose differently. Do not turn a current tool
choice into a universal law.

### 5. Failure and recovery

Describe detectable failure classes, containment, retry eligibility,
escalation, rollback, reconciliation, and verified recovery. A happy path is
not an architecture.

### 6. Verification and evidence

Define what another party must observe to validate the claim. Distinguish
telemetry, evaluation, evidence, approval, and accepted outcome.

### 7. Operating checklist

Give the reader a compact review or implementation checklist that can be used
in a real design meeting.

### 8. References and related chapters

Prefer primary sources, specifications, research papers, official engineering
documentation, accepted decisions, code, tests, and runtime evidence. Record
versions and access dates for time-sensitive claims.

## Visual standard

Use first-party, responsive visuals when a relationship is easier to retain as
a map, flow, ladder, stack, timeline, or matrix. Every visual must:

- use semantic HTML, CSS, SVG, or a maintained diagram source;
- remain readable on desktop and mobile without tiny embedded text;
- include a prose explanation and meaningful labels;
- show ownership, direction, authority, or evidence where relevant;
- avoid vendor logos when the concept is vendor-independent;
- distinguish current fact, target design, and missing evidence; and
- link to the full chapter that explains the visual.

Third-party infographics may inform the coverage audit. Do not republish them as
the guide's canonical explanation.

## Practice material

Exercises belong in dedicated labs, case studies, or architecture-communication
chapters. Do not force design review questions, whiteboard exercises, or labs into
every chapter. Practice material must state prerequisites, starting state,
expected evidence, failure conditions, and cleanup or recovery.

## Research and evidence standard

Separate vendor claims from independently established facts. Explain conflicts
between sources. Mark uncertainty and missing evidence explicitly.

An implementation claim should cite the strongest available combination of:

- an accepted decision or architecture record;
- the implementing source path;
- focused automated tests;
- observed browser or runtime behavior;
- a durable run, evidence, or deployment record; and
- the exact commit, release, or deployment inspected.

Documentation volume is not implementation proof. Evaluation is not production
authority. Observability is not independent verification. A model or executor
cannot certify its own material work.

## Writing to avoid

Do not publish slogans, unexplained jargon, repetitive bullets, unsupported
forecasts, generic AI enthusiasm, hidden product marketing, or invented
certainty. Avoid framing every section as a lesson, course, or interview prompt.

The standard is not that every chapter must be long. The standard is that every
chapter makes the reader more capable of designing, building, operating,
leading, reviewing, or explaining an AI Software Factory.
