"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["/guide", "Guide", (p: string) => p === "/guide" || (p.startsWith("/docs/") && !p.startsWith("/docs/appendix"))],
  ["/visuals", "Atlas", (p: string) => p === "/visuals" || p === "/architecture"],
  ["/topics", "Reference", (p: string) => p === "/topics" || (p.startsWith("/docs/appendix") && p !== "/docs/appendix/glossary")],
  ["/docs/appendix/glossary", "Glossary", (p: string) => p === "/docs/appendix/glossary" || p === "/glossary"],
] as const;

export function PrimaryNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname() ?? "";
  return (
    <>
      {links.map(([href, label, isActive]) => (
        <Link key={href} href={href} aria-current={isActive(pathname) ? "page" : undefined}>{label}</Link>
      ))}
      {mobile && <Link href="/search" aria-current={pathname === "/search" ? "page" : undefined}>Search</Link>}
    </>
  );
}
