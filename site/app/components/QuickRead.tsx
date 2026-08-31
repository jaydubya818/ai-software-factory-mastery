import { Markdown } from "./Markdown";

export function QuickRead({ content, sourcePath, readingMinutes }: { content: string; sourcePath: string; readingMinutes: number }) {
  return <section className="quick-read" aria-labelledby="quick-read-title"><header><div><span>Quick Read</span><h2 id="quick-read-title">The chapter in one pass.</h2></div><small>~{Math.max(2, Math.min(5, Math.ceil(readingMinutes / 5)))} min</small></header><div className="quick-read-content markdown-body"><Markdown content={content} sourcePath={sourcePath} /></div></section>;
}
