import type { Metadata } from "next";
import { SITE_URL } from "../lib/content";
import { GUIDE_ROUTES, guideAssetPath } from "../lib/paths";
import "./globals.css";

const title = "The AI Software Factory Guide · FDLC";
const description = "The practical guide to the Factory Development Lifecycle.";
const socialImage = guideAssetPath("og-v2.png");

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s · FDLC" },
  description,
  alternates: { canonical: GUIDE_ROUTES.home },
  icons: { icon: guideAssetPath("icon.svg") },
  robots: process.env.VERCEL_ENV === "preview" ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: {
    title,
    description,
    siteName: "FDLC",
    url: GUIDE_ROUTES.home,
    images: [{ url: socialImage, width: 1729, height: 910 }],
  },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
