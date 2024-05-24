import {
  Roboto,
  Bebas_Neue,
  Bad_Script,
  Dosis,
  Roboto_Slab,
} from "next/font/google";

export const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
});

export const bebas = Bebas_Neue({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bebas",
});

export const badscript = Bad_Script({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-badscript",
});

export const dosis = Dosis({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dosis",
});

export const slab = Roboto_Slab({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-slab",
});
