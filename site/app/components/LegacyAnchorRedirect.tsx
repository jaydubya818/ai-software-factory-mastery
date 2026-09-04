"use client";

import { useEffect } from "react";
import { legacyAnchorDestination } from "../../lib/legacy-routes";

export function LegacyAnchorRedirect({ currentSlug }: { currentSlug: string }) {
  useEffect(() => {
    const destination = legacyAnchorDestination(currentSlug, window.location.hash, window.location.search);
    if (destination) window.location.replace(destination);
  }, [currentSlug]);

  return null;
}
