import type { Metadata } from "next";
import { SITE_URL } from "../lib/content";
import "./globals.css";

const title = "The AI Software Factory Guide";
const description = "How to design, build, prove, operate, and improve an AI Software Factory.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, images: [{ url: "/og-v2.png", width: 1729, height: 910 }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og-v2.png"] },
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
