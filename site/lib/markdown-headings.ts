import type { Heading, Nodes, Root } from "mdast";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import { unified } from "unified";

const parser = unified().use(remarkParse).use(remarkGfm);

function headingText(node: Nodes): string {
  if (node.type === "text" || node.type === "inlineCode" || node.type === "html") return node.value;
  return "children" in node ? node.children.map(headingText).join("") : "";
}

function headingNodes(tree: Root) {
  const headings: Heading[] = [];
  function visit(node: Nodes) {
    if (node.type === "heading" && (node.depth === 2 || node.depth === 3)) headings.push(node);
    if ("children" in node) node.children.forEach(visit);
  }
  visit(tree);
  return headings;
}

function slugify(value: string) {
  return value.toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "section";
}

/** One allocation per document, shared by rendered headings, the TOC, and search. */
function assignHeadingIds(tree: Root) {
  const headings = headingNodes(tree);
  const bases = headings.map((heading) => slugify(headingText(heading)));
  // Keep the first existing anchor even when a duplicate's suffix would collide
  // with another real heading ("Added", "Added", "Added 1").
  const reserved = new Set(bases);
  const used = new Set<string>();
  return headings.map((heading, index) => {
    const base = bases[index];
    let id = base;
    if (used.has(id)) {
      let suffix = 1;
      do { id = `${base}-${suffix++}`; } while (used.has(id) || reserved.has(id));
    }
    used.add(id);
    heading.data = { ...heading.data, hProperties: { ...heading.data?.hProperties, id } };
    return { depth: heading.depth, text: headingText(heading), id, position: heading.position! };
  });
}

export function markdownHeadings(markdown: string) {
  return assignHeadingIds(parser.parse(markdown));
}

/** Runs on the complete Markdown AST, including headings after Mermaid blocks. */
export function remarkHeadingIds() {
  return (tree: Root) => { assignHeadingIds(tree); };
}
