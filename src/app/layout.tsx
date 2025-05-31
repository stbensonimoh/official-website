import type { Metadata } from "next";
import defaultSEOConfig from "../../next-seo.config";
import "./tailwind.css";
import { bebas, roboto, dosis, badscript, slab } from "./fonts";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/app/context/ThemeContext";
import ThemeToggle from "@/app/components/ThemeToggle";

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
          <Header />
          {children}
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
