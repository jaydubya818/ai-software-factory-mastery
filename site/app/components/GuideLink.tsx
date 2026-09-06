import Link from "next/link";
import type { ComponentProps } from "react";
import { guideNavigationHref } from "../../lib/paths";

/** Keep page-link compatibility separate from physical routes and SDK assets. */
export default function GuideLink(props: ComponentProps<typeof Link>) {
  const href = typeof props.href === "string" ? guideNavigationHref(props.href) : props.href;
  return <Link {...props} href={href} />;
}
