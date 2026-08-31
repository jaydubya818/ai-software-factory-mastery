"use client";

import { useEffect, useState } from "react";

type Heading = { id: string; text: string };

export function ChapterTOC({ headings }: { headings: Heading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    const elements = headings.map((heading) => document.getElementById(heading.id)).filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;
    const observer = new IntersectionObserver((entries) => { const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]; if (visible?.target.id) setActive(visible.target.id); }, { rootMargin: "-18% 0px -68%", threshold: [0, 1] });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [headings]);
  return <aside className="table-of-contents" aria-label="In this chapter"><span>In this chapter</span><ol>{headings.map((heading) => <li className={active === heading.id ? "is-active" : undefined} key={heading.id}><a aria-current={active === heading.id ? "location" : undefined} href={`#${heading.id}`}>{heading.text}</a></li>)}</ol></aside>;
}
