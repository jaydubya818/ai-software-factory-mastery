import { Markdown } from "./Markdown";

export function QuickRead({ content, sourcePath }: { content: string; sourcePath: string }) {
  return <section className="quick-read" aria-labelledby="quick-read-title"><header><div><span>At a glance</span><h2 id="quick-read-title">The essential model before the details.</h2></div></header><div className="quick-read-content markdown-body"><Markdown content={content} sourcePath={sourcePath} /></div></section>;
}
