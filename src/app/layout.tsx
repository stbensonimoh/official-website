import type { Metadata, Viewport } from "next";
import defaultSEOConfig from "../../next-seo.config";
import "./tailwind.css";
import { bebas, roboto, dosis, badscript, slab } from "./fonts";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ThemeToggle from "@/app/components/ThemeToggle";
import Analytics from "@/app/components/Analytics";

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export function generateMetadata(): Metadata {
  return {
    title: defaultSEOConfig.title,
    description: defaultSEOConfig.description,
    openGraph: defaultSEOConfig.openGraph,
    twitter: defaultSEOConfig.twitter,
    robots: 'index, follow',
    alternates: {
      canonical: 'https://stbensonimoh.com',
    },
    authors: [{ name: 'Benson Imoh' }],
    keywords: 'Software Engineer, DevOps, Open Source, TypeScript, React, Next.js',
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${bebas.variable} ${roboto.variable} ${badscript.variable} ${dosis.variable} ${slab.variable}`}
      >
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <ThemeProvider>
          <Header />
          <main id="main-content">
            {children}
          </main>
          <ThemeToggle />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
