"use client";

import { useId, useRef, type ReactNode } from "react";

/** Native dialog supplies modal focus containment; the same semantic figure works without JS. */
export function FigureShell({ name, number, title, description, children }: {
  name: string; number: string; title: string; description: string; children: ReactNode;
}) {
  const id = useId();
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  return <figure className="fd-figure" data-diagram={name} aria-labelledby={`${id}-title`}>
    <figcaption className="fd-heading">
      <div><span className="fd-eyebrow">FDLC / Reference architecture · {number}</span><h3 id={`${id}-title`}>{title}</h3></div>
      <button ref={trigger} className="fd-expand" type="button" aria-haspopup="dialog" onClick={() => dialog.current?.showModal()}>View full-size <span aria-hidden="true">↗</span></button>
    </figcaption>
    <div className="fd-canvas">{children}</div>
    <details className="fd-description"><summary>Read diagram description</summary><p>{description}</p></details>
    <p className="fd-reference">Reference architecture · Availability and implementation require qualification.</p>
    <dialog ref={dialog} className="fd-dialog" aria-labelledby={`${id}-dialog-title`} onClose={() => trigger.current?.focus()} onKeyDown={(event) => {
      if (event.key !== "Tab") return;
      const focusable = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("button, summary, a[href], [tabindex='0']")).filter((element) => element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    }}>
      <header><strong id={`${id}-dialog-title`}>{title} — full-size</strong><button type="button" className="fd-expand" onClick={() => dialog.current?.close()}>Close <span aria-hidden="true">×</span></button></header>
      {/* Keyboard focus makes the scrollable region operable without a pointer. */}
      <div className="fd-dialog-body" tabIndex={0} role="region" aria-label={`${title}, scrollable diagram`}><div className="fd-canvas">{children}</div><p className="fd-dialog-description">{description}</p></div>
    </dialog>
  </figure>;
}
