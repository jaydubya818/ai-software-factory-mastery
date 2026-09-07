import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveDocumentHref } from "../../lib/content";
import { remarkHeadingIds } from "../../lib/markdown-headings";
import { Mermaid } from "./Mermaid";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children);
  return "";
}

function containsAnchor(node: unknown): boolean {
  if (!node || typeof node !== "object") return false;
  if ("tagName" in node && node.tagName === "a") return true;
  if (!("children" in node) || !Array.isArray(node.children)) return false;
  return node.children.some(containsAnchor);
}

const infographicPrefix = /^\s*Infographic\s+[—–-]\s*/;

/** Map each "Infographic — Title." blockquote to the slot named in the preceding HTML comment. */
function infographicSlots(content: string) {
  const slots = new Map<string, string>();
  for (const match of content.matchAll(/<!--\s*infographic:\s*([^\s>]+)\s*-->\s*\n>\s*\*\*Infographic\s+[—–-]\s*([^*]+?)\*\*/g)) {
    slots.set(match[2].trim().replace(/\.$/, ""), match[1]);
  }
  return slots;
}

export function Markdown({ content, sourcePath, infographicAssets = {} }: { content: string; sourcePath: string; infographicAssets?: Record<string, string> }) {
  const slots = infographicSlots(content);
  function regionLabel(kind: string, offset = 0) {
    const before = content.slice(0, offset);
    const heading = [...before.matchAll(/^#{1,3}\s+(.+)$/gm)].at(-1)?.[1] ?? "Introduction";
    const pattern = kind === "Table" ? /^\s*\|?\s*:?-+:?\s*\|.*$/gm : /^```/gm;
    const count = [...before.matchAll(pattern)].length;
    const number = kind === "Table" ? count + 1 : Math.floor(count / 2) + 1;
    return `${kind} ${number}: ${heading}`;
  }
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkHeadingIds]}
      components={{
        h2: ({ children, node, id }) => (
          <h2 id={id}>{containsAnchor(node) ? children : <a className="heading-anchor" href={`#${id}`}>{children}</a>}</h2>
        ),
        h3: ({ children, node, id }) => (
          <h3 id={id}>{containsAnchor(node) ? children : <a className="heading-anchor" href={`#${id}`}>{children}</a>}</h3>
        ),
        a: ({ href, children }) => {
          const resolved = resolveDocumentHref(sourcePath, href);
          const external = Boolean(resolved?.startsWith("http"));
          return <a href={resolved} rel={external ? "noreferrer" : undefined} target={external ? "_blank" : undefined}>{children}</a>;
        },
        blockquote: ({ children }) => {
          const text = textFromNode(children).trim();
          if (!infographicPrefix.test(text)) return <blockquote>{children}</blockquote>;
          const title = text.replace(infographicPrefix, "").split(".")[0].trim();
          const slot = slots.get(title);
          const asset = slot ? infographicAssets[slot] : undefined;
          if (asset) {
            return (
              <figure className="infographic" data-slot={slot}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={asset} alt={title} loading="lazy" />
                <figcaption>{title} · <a href={asset} target="_blank" rel="noreferrer" aria-label={`Open ${title} at full resolution in a new tab`}>Open full-size diagram ↗</a></figcaption>
              </figure>
            );
          }
          return (
            <aside className="infographic-placeholder" aria-label="Infographic placeholder" data-slot={slot}>
              <span className="infographic-placeholder-label">Infographic placeholder{slot ? <code>{slot}</code> : null}</span>
              <div>{children}</div>
            </aside>
          );
        },
        table: ({ children, node }) => (
          <div className="table-block">
          <p className="table-hint">Scroll horizontally to read every column.</p>
          <div className="table-scroll" role="region" aria-label={regionLabel("Table", node?.position?.start.offset)} tabIndex={0}>
            <table>{children}</table>
          </div>
          </div>
        ),
        pre: ({ children, node }) => {
          const code = node?.children[0];
          if (code?.type === "element" && code.tagName === "code"
            && Array.isArray(code.properties.className) && code.properties.className.includes("language-mermaid")) {
            return <Mermaid chart={textFromNode(children).trim()} label={regionLabel("Diagram", node?.position?.start.offset)} />;
          }
          return <pre role="region" aria-label={regionLabel("Code example", node?.position?.start.offset)} tabIndex={0}>{children}</pre>;
        },
      }}
    >
      {content.replace(/<!--\s*infographic:[^>]*-->\s*\n/g, "")}
    </ReactMarkdown>
  );
}
