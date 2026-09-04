import type { Metadata } from "next";
import { guideAssetPath } from "./paths";

const socialImage = { url: guideAssetPath("og-v2.png"), width: 1729, height: 910 };

/** Keep canonical and social discovery metadata on the same physical Guide route. */
export function guidePageMetadata({
  title,
  description,
  canonical,
  noIndex = false,
}: {
  title: string;
  description: string;
  canonical: string;
  noIndex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    ...(noIndex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title,
      description,
      siteName: "FDLC",
      url: canonical,
      images: [socialImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage.url],
    },
  };
}
