"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type MouseEventHandler, type ReactNode } from "react";
import { CommandPalette } from "./CommandPalette";
import Link from "./GuideLink";
import { ThemeToggle } from "./ThemeToggle";
import { canonicalGuidePagePath, FDLC_ORIGIN, fdlcUrl, GUIDE_ROUTES } from "../../lib/paths";

import { primary, guide as guideDestinations, afterGuide, secondary, type NavLink } from "../../lib/global-navigation.generated";

type GuideNavLink = readonly [label: string, href: string, isActive: (pathname: string) => boolean];

const guideActiveStates: Record<string, (pathname: string) => boolean> = {
  [GUIDE_ROUTES.home]: (p) => p === GUIDE_ROUTES.home || /^\/guide\/(?:00-front-matter|stages|0[1-6]-(?:understand|design|build|prove|operate|improve))\//.test(p),
  [GUIDE_ROUTES.atlas]: (p) => p === GUIDE_ROUTES.atlas || p === GUIDE_ROUTES.architecture,
  [GUIDE_ROUTES.topics]: (p) => p === GUIDE_ROUTES.topics || p === GUIDE_ROUTES.coverage || p.startsWith(`${GUIDE_ROUTES.home}/appendix/`),
};
const guide: readonly GuideNavLink[] = guideDestinations.map(([label, href]) => [
  label, href, guideActiveStates[href] ?? ((pathname) => pathname === href),
]);

function focusAt(container: HTMLElement | null, index: number) {
  const links = Array.from(container?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
  links.at((index + links.length) % links.length)?.focus();
}

function onMenuKeyDown(event: globalThis.KeyboardEvent, container: HTMLElement | null, close: () => void, returnFocus: () => void) {
  if (!container?.contains(document.activeElement)) return;
  const links = Array.from(container.querySelectorAll<HTMLAnchorElement>("a[href]"));
  const index = links.indexOf(document.activeElement as HTMLAnchorElement);
  if (event.key === "Escape") {
    event.preventDefault();
    close();
    returnFocus();
  } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
    event.preventDefault();
    const step = event.key === "ArrowDown" ? 1 : -1;
    const next = index < 0 ? (step > 0 ? 0 : links.length - 1) : (index + step + links.length) % links.length;
    links[next]?.focus();
  } else if (event.key === "Home" || event.key === "End") {
    event.preventDefault();
    links.at(event.key === "Home" ? 0 : -1)?.focus();
  } else if (event.key === "Tab" && links.length) {
    if (!event.shiftKey && document.activeElement === links.at(-1)) {
      event.preventDefault();
      links[0].focus();
    } else if (event.shiftKey && document.activeElement === links[0]) {
      event.preventDefault();
      links.at(-1)?.focus();
    }
  }
}

function GlobalLink({ children, href, onClick }: { children: ReactNode; href: string; onClick?: MouseEventHandler<HTMLAnchorElement> }) {
  return <a href={fdlcUrl(href)} onClick={onClick}>{children}</a>;
}

function NavDropdown({ active, id, label, links, local = false, pathname = "" }: { active: boolean; id: string; label: string; links: readonly (NavLink | GuideNavLink)[]; local?: boolean; pathname?: string }) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const navigate = (event: globalThis.KeyboardEvent) => onMenuKeyDown(event, panel.current, () => setOpen(false), () => trigger.current?.focus());
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", navigate);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", navigate);
    };
  }, [open]);

  function openAndFocus(index: number) {
    setOpen(true);
    requestAnimationFrame(() => focusAt(panel.current, index));
  }

  function handleTriggerKeyDown(event: ReactKeyboardEvent<HTMLButtonElement>) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openAndFocus(0);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      openAndFocus(-1);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
    }
  }

  return (
    <div className={`nav-dropdown${active ? " is-active" : ""}${open ? " is-open" : ""}`} ref={root}>
      <button aria-controls={id} aria-expanded={open} aria-current={active ? "page" : undefined} onClick={() => setOpen((value) => !value)} onKeyDown={handleTriggerKeyDown} ref={trigger} type="button">
        {label} <span aria-hidden="true">⌄</span>
      </button>
      <div className="nav-dropdown-panel" hidden={!open} id={id} ref={panel}>
        {links.map(([itemLabel, href, isActive]) => local
          ? <Link aria-current={isActive?.(pathname) ? "page" : undefined} href={href} key={href} onClick={() => setOpen(false)}>{itemLabel}</Link>
          : <GlobalLink href={href} key={href} onClick={() => setOpen(false)}>{itemLabel}</GlobalLink>)}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const pathname = canonicalGuidePagePath(usePathname() ?? "");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGuideOpen, setMobileGuideOpen] = useState(true);
  const mobileRoot = useRef<HTMLDivElement>(null);
  const mobileTrigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const dismiss = (event: PointerEvent) => {
      if (!mobileRoot.current?.contains(event.target as Node)) setMobileOpen(false);
    };
    const navigate = (event: globalThis.KeyboardEvent) => onMenuKeyDown(event, mobileRoot.current?.querySelector("nav") ?? null, () => setMobileOpen(false), () => mobileTrigger.current?.focus());
    document.addEventListener("pointerdown", dismiss);
    document.addEventListener("keydown", navigate);
    return () => {
      document.removeEventListener("pointerdown", dismiss);
      document.removeEventListener("keydown", navigate);
    };
  }, [mobileOpen]);

  return (
    <header className="app-header">
      <div className="site-header">
        <a className="global-wordmark" href={fdlcUrl()} aria-label="FDLC.ai home">
          {/* The logo remains owned by the FDLC default application across the MFE boundary. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img alt="FDLC.ai — Factory Development Lifecycle" src={`${FDLC_ORIGIN}/fdlc-logo-transparent.png`} width={2007} height={784} />
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {primary.map(([label, href]) => <GlobalLink href={href} key={href}>{label}</GlobalLink>)}
          <NavDropdown active id="guide-navigation" label="Guide" links={guide} local pathname={pathname} />
          {afterGuide.map(([label, href]) => <GlobalLink href={href} key={href}>{label}</GlobalLink>)}
          <NavDropdown active={false} id="more-navigation" label="More" links={secondary} />
        </nav>
        <div className="header-tools"><CommandPalette /><ThemeToggle /></div>
        <div className={`mobile-menu${mobileOpen ? " is-open" : ""}`} ref={mobileRoot}>
          <button aria-controls="mobile-navigation" aria-expanded={mobileOpen} aria-label="Open navigation" onClick={() => setMobileOpen((value) => !value)} ref={mobileTrigger} type="button">Menu</button>
          <nav aria-label="Mobile navigation" hidden={!mobileOpen} id="mobile-navigation">
            {primary.map(([label, href]) => <GlobalLink href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</GlobalLink>)}
            <button aria-controls="mobile-guide-navigation" aria-expanded={mobileGuideOpen} aria-current="page" className="is-active" onClick={() => setMobileGuideOpen((value) => !value)} type="button">Guide <span aria-hidden="true">⌄</span></button>
            <div className="mobile-guide-links" hidden={!mobileGuideOpen} id="mobile-guide-navigation">
              {guide.map(([label, href, isActive]) => <Link aria-current={isActive(pathname) ? "page" : undefined} href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</Link>)}
            </div>
            {afterGuide.map(([label, href]) => <GlobalLink href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</GlobalLink>)}
            <span>More</span>
            {secondary.map(([label, href]) => <GlobalLink href={href} key={href} onClick={() => setMobileOpen(false)}>{label}</GlobalLink>)}
          </nav>
        </div>
      </div>
    </header>
  );
}
