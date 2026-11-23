"use client";

import { useEffect, useRef, useState } from "react";

type Heading = { id: string; text: string; depth: number };

export function ChapterTOC({ headings, variant = "aside" }: { headings: Heading[]; variant?: "aside" | "mobile" }) {
  const menu = useRef<HTMLDetailsElement>(null);
  function followHeading(id: string) {
    if (!menu.current) return;
    menu.current.open = false;
    const target = document.getElementById(id);
    if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); }
  }
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    const elements = headings.map((heading) => document.getElementById(heading.id)).filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]; if (visible?.target.id) setActive(visible.target.id); }, { rootMargin: "-18% 0px -68%", threshold: [0, 1] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);
  const list = <ol>{headings.map((heading) => <li className={`${active === heading.id ? "is-active " : ""}toc-depth-${heading.depth}`} key={heading.id}><a aria-current={active === heading.id ? "location" : undefined} onClick={() => followHeading(heading.id)} href={`#${heading.id}`}>{heading.text}</a></li>)}</ol>;
  if (variant === "mobile") {
    return (
      <details className="toc-mobile" ref={menu}>
        <summary>On this page<small>{headings.length} sections</small></summary>
        {list}
      </details>
    );
  }
  return <aside className="table-of-contents" aria-label="On this page"><span>On this page</span>{list}</aside>;
}
