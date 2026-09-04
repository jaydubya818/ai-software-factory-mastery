"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fdlcUrl, GUIDE_ROUTES } from "../../lib/paths";

const links = [
  [GUIDE_ROUTES.home, "Guide", (p: string) => p === GUIDE_ROUTES.home || /^\/guide\/(?:00-front-matter|stages|0[1-6]-(?:understand|design|build|prove|operate|improve))\//.test(p)],
  [GUIDE_ROUTES.atlas, "Atlas", (p: string) => p === GUIDE_ROUTES.atlas || p === GUIDE_ROUTES.architecture],
  [GUIDE_ROUTES.topics, "Reference", (p: string) => p === GUIDE_ROUTES.topics || p === GUIDE_ROUTES.coverage || p.startsWith(`${GUIDE_ROUTES.home}/appendix/`)],
  [GUIDE_ROUTES.glossary, "Glossary", (p: string) => p === GUIDE_ROUTES.glossary],
  [GUIDE_ROUTES.search, "Search", (p: string) => p === GUIDE_ROUTES.search],
] as const;

export function PrimaryNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname() ?? "";
  return (
    <>
      {links.map(([href, label, isActive]) => (
        <Link key={href} href={href} aria-current={isActive(pathname) ? "page" : undefined}>{label}</Link>
      ))}
      {mobile && <a href={fdlcUrl("/framework")}>FDLC framework</a>}
    </>
  );
}
