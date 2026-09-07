"use client";

import { useEffect, useId, useRef, useState } from "react";

export function Mermaid({ chart, label = "Architecture diagram" }: { chart: string; label?: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);

  const textView = chart.split("\n").map((line) => line.trim()).filter((line) => /-->|==>|---/.test(line)).map((line) => line
    .replace(/([A-Za-z0-9_]+)\["?([^\]]+)"?\]/g, "$2")
    .replace(/([A-Za-z0-9_]+)\("?([^)]+)"?\)/g, "$2")
    .replace(/-->|==>|---/g, " → ")
    .replace(/<br\s*\/?\s*>/gi, "; ")
    .replace(/\s+/g, " "));

  useEffect(() => {
    if (!expanded) return;
    closeRef.current?.focus();
    function keydown(event: KeyboardEvent) {
      if (event.key === "Escape") { setExpanded(false); window.setTimeout(() => openRef.current?.focus(), 0); }
    }
    window.addEventListener("keydown", keydown);
    return () => window.removeEventListener("keydown", keydown);
  }, [expanded]);

  useEffect(() => {
    let active = true;

    async function render() {
      try {
        const { default: mermaid } = await import("mermaid");
        mermaid.initialize({
          startOnLoad: false,
          securityLevel: "strict",
          theme: "base",
          themeVariables: {
            primaryColor: "#eef3ec",
            primaryTextColor: "#12201b",
            primaryBorderColor: "#89a094",
            lineColor: "#547063",
            secondaryColor: "#fff7e8",
            tertiaryColor: "#f7f5ef",
            fontFamily: "Georgia, serif",
          },
          flowchart: { curve: "basis", htmlLabels: true },
        });
        const id = `mermaid-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
        const result = await mermaid.render(id, chart);
        if (active) setSvg(result.svg);
      } catch (error) {
        console.error("Mermaid render failed", error);
        if (active) setFailed(true);
      }
    }

    render();
    return () => { active = false; };
  }, [chart, reactId]);

  if (failed) {
    return <div className="diagram-failure"><p role="status">This diagram could not be displayed.</p><details><summary>Read the diagram source</summary><pre className="mermaid-fallback" tabIndex={0} role="region" aria-label={`${label} source`}><code>{chart}</code></pre></details></div>;
  }

  return <figure className="mermaid-figure">
    <div className={`mermaid-diagram${svg ? "" : " is-loading"}`} role="region" aria-label={label} aria-busy={!svg} tabIndex={0} dangerouslySetInnerHTML={{ __html: svg }} />
    <figcaption><span>{label}</span><button ref={openRef} type="button" disabled={!svg} onClick={() => setExpanded(true)}>View full-size</button></figcaption>
    <details className="diagram-text"><summary>Read diagram as text</summary>{textView.length ? <ol>{textView.map((line, index) => <li key={`${index}-${line}`}>{line}</li>)}</ol> : <pre><code>{chart}</code></pre>}</details>
    {expanded && <div className="diagram-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) { setExpanded(false); openRef.current?.focus(); } }}>
      <section className="diagram-dialog" role="dialog" aria-modal="true" aria-label={`${label}, full-size`}>
        <header><strong>{label}</strong><button ref={closeRef} type="button" onClick={() => { setExpanded(false); openRef.current?.focus(); }}>Close</button></header>
        <div className="diagram-dialog-canvas" dangerouslySetInnerHTML={{ __html: svg }} />
      </section>
    </div>}
  </figure>;
}
