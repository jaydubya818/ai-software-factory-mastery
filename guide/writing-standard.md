# Chapter Writing Standard

## Purpose

This guide should read like a graduate-level engineering textbook or a serious
technical leadership book. Its chapters should build durable mental models,
show why systems take their current shape, and develop the reader's ability to
reason under uncertainty.

Concise writing is welcome. Thin writing is not. A chapter should use prose,
diagrams, examples, and evidence to develop an argument. Lists should clarify
structure rather than replace explanation.

## Required chapter structure

Every chapter must visibly distinguish three kinds of knowledge:

1. **Enduring Principle** explains what should remain useful across products,
   vendors, models, and implementation stacks.
2. **Current Mission Control Implementation** states only what can be traced to
   versioned product documents, source code, tests, and observed behavior.
3. **Future Vision** describes desired or plausible capabilities that have not
   yet met the current-capability evidence bar.

The labels are epistemic boundaries. They prevent an attractive target
architecture from being mistaken for working software.

### 1. The problem

Describe the engineering or organizational problem before introducing a
solution. Make the consequences concrete. Explain who experiences the problem
and what fails when it remains unresolved.

### 2. Why the problem exists

Trace the incentives, constraints, historical choices, system boundaries, and
failure modes that produce the problem. Avoid treating symptoms as causes.

### 3. The enduring principle

Introduce the principle that remains useful across vendors and technology
cycles. State its scope and the conditions under which it may not apply.

### 4. Tradeoffs and alternatives

Explain what the principle costs, which alternatives exist, and why a different
system might choose differently. Do not turn current design choices into
universal laws.

### 5. Mission Control implementation

Show how Mission Control currently realizes the principle. Identify what is
implemented, partial, proposed, experimental, or absent. Separate current fact
from target architecture.

### 6. Future vision

Describe the desired capability only after current implementation has been
bounded. State what evidence would be required to promote the vision into a
current-capability claim.

### 7. Versioned references

Link the relevant Mission Control ADRs, product documents, code paths, tests,
and evidence. Record the exact commit or version studied and the date accessed.
References support the explanation; they do not replace it.

An implementation claim must cite the strongest available evidence: an ADR or
accepted decision, the implementing source path, focused tests, browser or
runtime behavior, and the exact commit or version. Missing evidence must be
named. A claim without sufficient evidence belongs under Future Vision.

### 8. Notes and lessons learned

Capture the learner's own interpretation. Explain what was surprising, which
assumption changed, what remains unclear, and what might be designed
differently.

### 9. Interview and discussion questions

Include questions that test causal understanding, architecture judgment,
operating-model reasoning, and the ability to distinguish vision from current
implementation.

### 10. Whiteboard exercise

Require the learner to reconstruct the relevant boundaries, entities, flows,
decisions, and failure paths without copying an existing diagram.

### 11. Hands-on lab

Connect the chapter to observable behavior. A lab should require code tracing,
operation, implementation, debugging, validation, or recovery. It must state
its prerequisites, starting version, expected evidence, and cleanup path.

## Mission Control case-study rule

Mission Control is a living implementation, not the definition of an AI
Software Factory. Every reference should answer:

- What principle is being studied?
- Which Mission Control decision or implementation illustrates it?
- Which commit or version was inspected?
- What tradeoff does the implementation make?
- What lesson should be retained if Mission Control later changes?

Do not copy product documentation into the guide. Link it, study it, and write
the resulting understanding in original words.

## Research standard

Prefer primary sources, specifications, research papers, official engineering
documentation, and direct implementation evidence. Record publication and
access dates. Separate vendor claims from independently established facts.

Explain conflicts between sources instead of hiding them. Mark open questions
and uncertain conclusions explicitly.

## Writing to avoid

Do not publish chapters that rely on slogans, unexplained jargon, repetitive
bullets, unsupported forecasts, or generic AI enthusiasm. Do not present a
demo, proposal, or agent assertion as proven capability.

The standard is not that every chapter must be long. The standard is that every
chapter must make the reader more capable of designing, building, operating,
leading, teaching, or defending an AI Software Factory.
