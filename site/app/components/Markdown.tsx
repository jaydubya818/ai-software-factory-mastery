import { isValidElement, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { resolveDocumentHref } from "../../lib/content";
import { Mermaid } from "./Mermaid";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (isValidElement<{ children?: ReactNode }>(node)) return textFromNode(node.props.children);
  return "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
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
  const segments = content
    .replace(/<!--\s*infographic:[^>]*-->\s*\n/g, "")
    .split(/```mermaid\s*\n([\s\S]*?)```/g);

  return (
    <>
      {segments.map((segment, index) => index % 2 === 1 ? (
        <Mermaid chart={segment.trim()} key={`diagram-${index}`} />
      ) : (
        <ReactMarkdown
          key={`markdown-${index}`}
          remarkPlugins={[remarkGfm]}
          components={{
            h2: ({ children }) => {
              const id = slugify(textFromNode(children));
              return <h2 id={id}><a className="heading-anchor" href={`#${id}`}>{children}</a></h2>;
            },
            h3: ({ children }) => {
              const id = slugify(textFromNode(children));
              return <h3 id={id}><a className="heading-anchor" href={`#${id}`}>{children}</a></h3>;
            },
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
                    <figcaption>{title}</figcaption>
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
            table: ({ children }) => (
              <div className="table-scroll" role="region" aria-label="Scrollable table" tabIndex={0}>
                <table>{children}</table>
              </div>
            ),
          }}
        >
          {segment}
        </ReactMarkdown>
      ))}
    </>
  );
}
