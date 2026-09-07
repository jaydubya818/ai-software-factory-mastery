"use client";

import { useRef, useState, type ReactNode } from "react";

export function CopyableCodeBlock({ children, label }: { children: ReactNode; label: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const codeRef = useRef<HTMLPreElement>(null);

  async function copy() {
    try {
      await navigator.clipboard.writeText(codeRef.current?.innerText ?? "");
      setStatus("copied");
    } catch {
      setStatus("failed");
      codeRef.current?.focus();
    }
  }

  return <div className="code-block">
    <div className="code-block-toolbar"><span>{label}</span><button type="button" onClick={copy}>{status === "copied" ? "Copied" : "Copy code"}</button></div>
    <pre ref={codeRef} role="region" aria-label={label} tabIndex={0}>{children}</pre>
    {status === "failed" && <p className="code-copy-error" role="status">Copy was blocked. The code is focused so you can select it manually.</p>}
  </div>;
}
