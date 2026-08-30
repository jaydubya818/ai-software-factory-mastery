"use client";

import { useEffect, useId, useState } from "react";

export function Mermaid({ chart }: { chart: string }) {
  const reactId = useId();
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

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
    return <pre className="mermaid-fallback"><code>{chart}</code></pre>;
  }

  return (
    <div
      className="mermaid-diagram"
      role="region"
      aria-label="Scrollable architecture diagram"
      tabIndex={0}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
