# Reader Experience V1 — Role Walkthroughs

Date: 2026-08-30  
Surface: local documentation site  
Method: browser-driven task walkthroughs at desktop and mobile widths

These walkthroughs test whether the implemented navigation supports the three
primary reader intents. They are implementation evidence, not a substitute for
observing independent readers. The external-reader script at the end should be
used before treating comprehension as validated.

## Outcome summary

| Reader | Starting intent | Success condition | Result |
|---|---|---|---|
| Executive | Understand the system without reading the curriculum | Reach a short orientation with purpose, audience, prerequisites, time, and three core ideas | Pass |
| Architect | Locate the canonical system boundary model | Reach the stack chapter with a rendered architecture diagram and usable table of contents | Pass |
| Builder | Find practical guidance for evaluation and replay | Search for `trace replay`, open the top matching chapter, and locate its hands-on lab | Pass |

## Walkthrough 1 — Executive orientation

1. Opened the home page at desktop width.
2. Selected **Choose your path**.
3. Selected **01 Factory and Mission Control** in the Executive path.
4. Confirmed the destination URL and one visible `Quick Read` section.

Observed result: the path moves from product orientation to a five-minute
chapter entry point without requiring the reader to understand the repository
structure first.

## Walkthrough 2 — Architecture discovery

1. Opened the home page at desktop width.
2. Selected **See the architecture**.
3. Confirmed the canonical stack-boundaries chapter opened.
4. Confirmed one rendered Mermaid SVG and twelve on-page navigation links.

Observed result: the architecture is reachable directly from the home page and
provides both a visual system map and scannable chapter navigation.

## Walkthrough 3 — Builder task discovery

1. Opened curriculum search.
2. Entered `trace replay`.
3. Confirmed eleven relevant results with **Evaluation Engineering, Trace
   Replay, and Run Comparison** first.
4. Opened the first result and confirmed the **11. Hands-on lab** section.

Observed result: a task-shaped query reaches an actionable exercise without
requiring the reader to know the curriculum taxonomy.

## Defects found and resolved

- Removed a duplicate chapter title caused by retaining the source Markdown H1.
- Restarted dependency optimization and verified Mermaid renders as SVG rather
  than its text fallback.
- Normalized displayed verification dates and declared reading times.
- Added semantic image roles to the architecture visualization and rendered
  diagrams.
- Replaced internal document anchors with framework navigation links.
- Added a mobile navigation menu and verified it exposes all four destinations.
- Removed automatic search focus so opening the page does not unexpectedly move
  keyboard focus.

## Accessibility evidence

Automated axe-core checks returned zero violations on:

- Home
- Learning paths
- Canonical architecture chapter

The checker marked contrast for manual review because the page background uses
a decorative gradient. Desktop and mobile screenshot inspection confirmed the
dark foreground text remains legible against the light reading surface.

## External-reader validation script

Recruit one person in each reader role who has not seen the curriculum. Do not
explain the navigation. Ask each participant to complete the matching task
above, then ask:

1. In one sentence, what is this resource for?
2. Where would you go next for your role?
3. Which term or boundary remained unclear?
4. What did you expect to click but could not find?

Record completion time, wrong turns, the participant's one-sentence model, and
their first requested clarification. Treat repeated confusion across two
participants as a content or navigation defect, not a training problem.
