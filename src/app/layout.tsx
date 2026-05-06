import type { Metadata } from "next";
import defaultSEOConfig from "../../next-seo.config";
import "./tailwind.css";
import { bebas, roboto, dosis, badscript, slab } from "./fonts";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ThemeToggle from "@/app/components/ThemeToggle";
import Analytics from "@/app/components/Analytics";

export function generateMetadata(): Metadata {
  return {
    title: defaultSEOConfig.title,
    description: defaultSEOConfig.description,
    openGraph: defaultSEOConfig.openGraph,
    twitter: defaultSEOConfig.twitter,
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
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-white focus:text-black focus:rounded focus:shadow-lg"
          >
            Skip to main content
          </a>
          <Header />
          <main id="main-content" className="font-roboto">
            {children}
          </main>
          <ThemeToggle />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
