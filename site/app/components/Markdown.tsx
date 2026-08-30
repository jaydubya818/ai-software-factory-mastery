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

export function Markdown({ content, sourcePath }: { content: string; sourcePath: string }) {
  const segments = content.split(/```mermaid\s*\n([\s\S]*?)```/g);

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
