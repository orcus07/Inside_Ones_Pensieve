import type { Metadata } from "next";
import Link from "next/link";

import { site } from "@/site.config";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.title}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.title,
    locale: site.locale,
  },
  alternates: {
    types: { "application/rss+xml": `${site.url}/feed.xml` },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang}>
      <body>
        <header className="site-header">
          <div className="shell">
            <nav>
              <a href="/feed.xml" className="nav-rss">RSS</a>
              {site.links.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <div className="shell">
            <span>
              © {new Date().getFullYear()} {site.author}
            </span>
            <a href="/feed.xml">RSS</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
