import Link from "next/link";

const modes = [["read", "Read", "Full chapter"], ["architecture", "Architecture", "System boundaries"], ["study", "Study", "Key concepts"]];

export function ModeSwitcher({ slug, active }: { slug: string; active: string }) {
  return <nav className="mode-switcher" aria-label="Chapter mode">{modes.map(([id, label, description]) => <Link aria-current={active === id ? "page" : undefined} className={active === id ? "is-active" : undefined} href={id === "read" ? `/docs/${slug}` : `/docs/${slug}?mode=${id}`} key={id}><strong>{label}</strong><small>{description}</small></Link>)}</nav>;
}
