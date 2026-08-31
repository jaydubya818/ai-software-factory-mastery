"use client";

import { useEffect, useState } from "react";
import { useProgress } from "./ProgressProvider";

export function ChapterProgress({ slug, title }: { slug: string; title: string }) {
  const { completedSlugs, readPositions, setChapterCompleted, saveReadPosition, visitChapter } = useProgress();
  const [position, setPosition] = useState(readPositions[slug] ?? 0);
  const complete = completedSlugs.includes(slug);
  useEffect(() => { visitChapter({ slug, title, href: `/docs/${slug}` }); }, [slug, title, visitChapter]);
  useEffect(() => {
    let frame = 0;
    function update() { window.cancelAnimationFrame(frame); frame = window.requestAnimationFrame(() => { const article = document.querySelector<HTMLElement>(".document-article"); if (!article) return; const available = Math.max(1, article.offsetHeight - window.innerHeight); setPosition(Math.max(0, Math.min(100, ((window.scrollY - article.offsetTop) / available) * 100))); }); }
    update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener("scroll", update); window.removeEventListener("resize", update); };
  }, []);
  useEffect(() => { const timer = window.setTimeout(() => saveReadPosition(slug, position), 350); return () => window.clearTimeout(timer); }, [position, saveReadPosition, slug]);
  return <><div className="reading-progress" aria-hidden="true"><i style={{ width: `${position}%` }} /></div><div className="chapter-progress-control"><span><strong>{Math.round(position)}%</strong> read on this device</span><button className={complete ? "is-complete" : undefined} type="button" onClick={() => setChapterCompleted(slug, !complete)}>{complete ? "✓ Completed" : "Mark chapter complete"}</button></div></>;
}
