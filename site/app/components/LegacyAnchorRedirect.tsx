"use client";

import { useEffect } from "react";
import { legacyAnchorDestination } from "../../lib/legacy-routes";
import { guideNavigationHref } from "../../lib/paths";

export function LegacyAnchorRedirect({ currentSlug }: { currentSlug: string }) {
  useEffect(() => {
    const destination = legacyAnchorDestination(currentSlug, window.location.hash, window.location.search);
    if (destination) window.location.replace(guideNavigationHref(destination));
  }, [currentSlug]);

  return null;
}
