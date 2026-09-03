"use client";

import { useEffect } from "react";
import { legacyAnchorRedirects } from "../../lib/legacy-routes";

export function LegacyAnchorRedirect({ currentSlug }: { currentSlug: string }) {
  useEffect(() => {
    let anchor = window.location.hash.slice(1);
    try {
      anchor = decodeURIComponent(anchor);
    } catch {
      return;
    }
    if (!anchor) return;

    const target = legacyAnchorRedirects[currentSlug]?.[anchor];
    if (target) window.location.replace(target);
  }, [currentSlug]);

  return null;
}
