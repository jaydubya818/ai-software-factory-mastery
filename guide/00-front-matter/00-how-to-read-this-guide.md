---
title: How to read this guide
part: understand
chapter: 0
summary: What this guide is, who it is for, its eight-stage value stream and six-area architecture, the six-part journey, and the conventions used in every chapter.
absorbs: []
infographics: []
---

# How to read this guide

## What this is

Software is now written by two kinds of workers: people, and agents that can plan, write, test, and repair code faster than any team can read it. Most organizations have bolted the second kind onto a process built for the first. The result is familiar — more pull requests, less certainty, and nobody who can say with evidence why a given change was safe to ship.

An **AI Software Factory** is the engineering system that fixes this. Humans define intent and accept risk. Bounded agents plan, implement, validate, and recover inside a harness that owns their tools, state, budgets, and stop conditions. Independent evidence, not the agent's own report, decides what advances. Every step leaves a durable record that names who decided, what was proven, and against which exact version.

This guide is the complete working model of that system: every component, the records they produce, the contracts between them, the ways each one fails, and the reasons it exists at all. It is not a tool comparison, a vendor pitch, or a list of prompts. When you finish it you should be able to draw the whole factory on a whiteboard from memory, defend every box to a skeptic, and decide what to build first in your own organization and what to leave out.

It draws on two sources: the experience of building **Mission Control**, a control plane for human-directed, agent-executed software delivery, and the wider field — research, production case studies, and the protocols and harnesses that now define the practice. Where Mission Control has done something, the guide says so and pins it to a commit. Where it has not, the guide says that too.

It is written for three readers with the same problem. Engineers who will build a factory and need the mechanisms. Architects who must draw its boundaries and defend them. Executives who must decide whether to fund one and how to hold it accountable. Every idea is explained in plain English first, then given its precise name, so all three can read the same page and mean the same thing by it.

## The two orientation models

The whole book unfolds from one primary value stream:

> **Intent → Plan → Define Agent → Execute through Harness → Apply Skills → Evaluate → Improve → Deliver Software**

Read it as a value stream, not as eight boxes wired in series. *Intent* is what a builder wants and why. *Plan* is a versioned, approvable proposal for how to achieve and prove it. *Define Agent* means binding an approved, versioned agent configuration to the work, not inventing a new agent for every task. *Execute through Harness* is bounded execution inside a runtime that owns tools, state, permissions, budgets, and stop conditions. *Apply Skills* means the reusable methods selected and frozen before execution are used inside that loop. *Evaluate* is independent evidence about both the artifact and the path that produced it. *Improve* turns evaluation and production outcomes into governed candidates for future runs. *Deliver Software* covers the decision, the release, the production observation, and the measured outcome, not merely an opened pull request.

The supporting architecture has six areas: **Intent, Harness, Capability, Model, Trust, and Learning**, surrounded by adoption. Use the stages to ask, “What happens next?” Use the areas to ask, “Which subsystem and owner are responsible?” [Chapter 2](../01-understand/02-the-factory-in-one-view.md) teaches both and labels every other useful framework as a narrower lens or reference model.

## Three definitions to retain

Three terms carry the book. Keep them apart.

**Agent Factory** creates, versions, evaluates, publishes, and governs reusable capabilities such as agents, skills, tools, model profiles, and configurations.

**AI Software Factory** composes people, policy, capabilities, execution, verification, delivery, and feedback from intent through validated production value.

**Mission Control** is the living implementation and case study for the control-plane responsibilities required to govern execution, evidence, and human authority. It is not the definition of the complete factory.

The Agent Factory supplies parts. The AI Software Factory turns governed intent into validated value using those parts. Mission Control is one concrete control plane, studied with its gaps visible.

## The journey

The guide has six parts, and they are meant to be read in order because each answers a question the previous one raises.

**Part I, Understand**, explains why software engineering is changing, shows the whole factory in one view, and sets out the first principles of trust, evidence, and authority that every later chapter relies on.

**Part II, Design**, covers what must exist before any agent runs: the human–agent operating model, the authoritative records from company to release, intent and specification engineering, governance and risk-proportional approval, the economics of human attention, and multi-repository design.

**Part III, Build**, assembles the machine: the Agent Factory, the control plane and execution plane, durable execution, coding harnesses and protocols, environments and compute, the agent loop with its tools, context, and memory, data and knowledge engineering, model routing, loop engineering, the twelve-layer production stack, and autonomous workflows.

**Part IV, Prove**, is how you know the output is correct, safe, and releasable: quality and evidence architecture, testing strategy, evaluation engineering, proof packages and certificates, CI/CD and progressive delivery, and security.

**Part V, Operate**, runs the factory as a production platform: platform engineering, observability and forensics, resilience and incidents, control surfaces and storage, and enterprise adoption.

**Part VI, Improve**, closes the loop without letting the factory authorize itself: production feedback and the agentic merge queue, governed learning, Mission Control as a case study, mastering and explaining the factory, and where the field is heading.

## Conventions

Every chapter follows the same shape: the problem, how it works, how to build it, failure modes, a short and honest "In Mission Control" section, a "Retain this" summary, and "Go deeper" pointers. A few conventions run throughout.

A term appears in **bold** the first time it is defined, and the [glossary](../appendix/glossary.md) holds the canonical wording; entries marked 🔑 there are among the [fifty concepts to have cold](../appendix/principles.md#fifty-concepts-to-have-cold), a first on-ramp if the full glossary feels like too much on a first pass. Diagrams are drawn in Mermaid and show mechanism: boxes are components or records, arrows are contracts or state transitions. Source-derived infographics provide a readable overview while the Mermaid diagrams beneath them preserve the exact mechanism in versionable text.

The **"In Mission Control" rule** is an honesty rule. Everything the guide claims about what Mission Control actually does lives in that one section per chapter, pinned to a specific commit, and labelled implemented, partial, or future. A proposal, a demo, or an agent's own assertion that something works is never presented as proven capability. The same standard the factory applies to agents applies to the book's claims about the factory.

**"Retain this"** at the end of each chapter is the five to seven principles worth being able to recite. If you remember nothing else from a chapter, remember those.

## The appendices

The appendices are reference, not sequence. The glossary preserves the complete vocabulary; the consolidation work distinguishes the small core readers should retain from supporting reference terms. The Mission Control case studies hold the versioned, evidence-mapped assessments that the "In Mission Control" sections summarize. The research canon lists the primary sources and source transcripts the book draws on. Coverage, maturity, changelog, and reviewer guide track the state of the guide itself, and the architecture communication appendix collects ways to explain and defend the system.

Read the chapters in order. Reach for the appendices when a chapter sends you there or when you already know what you are looking for.

For a map of everything the guide covers and the chapter that owns each area, see [What this guide covers](./01-what-this-guide-covers.md).
