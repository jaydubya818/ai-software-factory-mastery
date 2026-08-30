import { sections } from "../../lib/content";

export function DocumentNav({ currentSlug }: { currentSlug: string }) {
  const content = (
    <div className="document-nav-groups">
      {sections.map((section) => (
        <section key={section.key}>
          <h2>{section.label}</h2>
          <ul>
            {section.documents.map((document) => (
              <li key={document.slug}>
                <a aria-current={document.slug === currentSlug ? "page" : undefined} href={`/docs/${document.slug}`}>
                  {document.title}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );

  return (
    <>
      <aside className="document-sidebar" aria-label="Curriculum navigation">{content}</aside>
      <details className="document-nav-mobile">
        <summary>Browse the curriculum</summary>
        {content}
      </details>
    </>
  );
}
