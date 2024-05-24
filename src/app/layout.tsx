import type { Metadata } from "next";
import "./globals.css";
import { bebas, roboto, dosis, badscript, slab } from "./fonts";

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
        {children}
      </body>
    </html>
  );
}
