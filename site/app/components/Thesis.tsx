"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Actor = {
  id: string;
  name: string;
  role: string;
  owns: string[];
  never: string[];
  records: string[];
  without: string;
  href: string;
  chapter: string;
};

const actors: Actor[] = [
  {
    id: "humans",
    name: "Humans",
    role: "Own intent, judgment, policy, and material risk",
    owns: ["State the outcome and why it matters", "Approve one exact Plan revision", "Set policy and risk tiers", "Accept material risk before release"],
    never: ["Execute inside the agent's loop", "Re-read every diff to feel safe", "Approve what the evidence has not proven"],
    records: ["Mission Spec", "Plan approval", "Decision packet acceptance"],
    without: "The factory authorizes itself. Autonomy with no one accountable for the outcome.",
    href: "/docs/02-design/04-the-human-agent-operating-model",
    chapter: "Chapter 4 · The human–agent operating model",
  },
  {
    id: "agents",
    name: "Agents",
    role: "Reason and execute inside bounded authority",
    owns: ["Plan the work from the Mission Spec", "Implement, test, and repair", "Recover from their own failures", "Propose improvements from what they observe"],
    never: ["Widen their own authority", "Grade their own work", "Promote their own improvements to production"],
    records: ["Attempts", "Artifacts", "Self-reports — which are never evidence"],
    without: "Nothing scales. Every line is written and checked by a person, and the factory is a process document.",
    href: "/docs/03-build/18-agent-architecture",
    chapter: "Chapter 15 · Agent architecture",
  },
  {
    id: "software",
    name: "Software",
    role: "Owns durable state, policy, recovery, and control",
    owns: ["Hold state outside the model: leases, checkpoints, budgets", "Enforce policy at every tool call", "Stop, retry, or escalate on defined conditions", "Freeze the execution manifest before a run"],
    never: ["Decide what the intent is", "Accept risk on a human's behalf", "Trust a model's report as a fact"],
    records: ["WorkOrders", "Leases and checkpoints", "Execution manifest", "Traces"],
    without: "A model with no boundary: a chat box that can touch production and remembers nothing when it crashes.",
    href: "/docs/03-build/13-control-plane-orchestrator-and-execution-plane",
    chapter: "Chapter 11 · Control plane, orchestrator, and execution plane",
  },
  {
    id: "evidence",
    name: "Evidence",
    role: "Proves whether exact work is ready to progress",
    owns: ["Verify independently, at the exact SHA and manifest digest", "Bind results to the artifact they describe", "Expire when the subject changes", "Decide readiness — not activity, not confidence"],
    never: ["Be replaced by the agent's report", "Be replaced by telemetry", "Outlive the version it proved"],
    records: ["Verification run", "Evidence bundle", "Certificate"],
    without: "Confident failure. \"Tests pass,\" said by the thing being tested.",
    href: "/docs/04-prove/27-quality-and-evidence-architecture",
    chapter: "Chapter 27 · Quality and evidence architecture",
  },
];

export function Thesis() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touched = useRef(false);

  useEffect(() => {
    if (paused || touched.current) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % actors.length), 5200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const select = (index: number) => {
    touched.current = true;
    setActive(index);
  };

  const actor = actors[active];

  return (
    <section className="thesis" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="thesis-statement">
        <span className="section-kicker">The durable thesis</span>
        <blockquote>Reliable autonomy comes from a trustworthy system around fallible agents.</blockquote>
        <p className="thesis-hint">Four things share the work. Pick one to see what it owns, what it must never own, and what breaks without it.</p>
        <div className="thesis-actors" role="tablist" aria-label="The four parties of the thesis">
          {actors.map((item, index) => (
            <button
              key={item.id}
              role="tab"
              id={`thesis-tab-${item.id}`}
              aria-selected={index === active}
              aria-controls="thesis-panel"
              className={index === active ? "is-active" : undefined}
              onClick={() => select(index)}
              onFocus={() => select(index)}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); select((index + 1) % actors.length); }
                if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); select((index + actors.length - 1) % actors.length); }
              }}
            >
              <strong>{item.name}</strong>
              <span>{item.role}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="thesis-panel" id="thesis-panel" role="tabpanel" aria-labelledby={`thesis-tab-${actor.id}`} key={actor.id}>
        <div className="thesis-panel-head">
          <span className="thesis-index">{String(active + 1).padStart(2, "0")} / 04</span>
          <h3>{actor.name}</h3>
          <p>{actor.role}.</p>
        </div>
        <div className="thesis-columns">
          <div>
            <small>Owns</small>
            <ul>{actor.owns.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
          <div>
            <small>Never</small>
            <ul className="thesis-never">{actor.never.map((line) => <li key={line}>{line}</li>)}</ul>
          </div>
        </div>
        <div className="thesis-records">
          <small>Leaves behind</small>
          <div>{actor.records.map((record) => <span key={record}>{record}</span>)}</div>
        </div>
        <div className="thesis-without">
          <small>Without it</small>
          <p>{actor.without}</p>
        </div>
        <Link className="thesis-link" href={actor.href}>{actor.chapter} →</Link>
      </div>
    </section>
  );
}
