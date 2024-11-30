import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bensonpink: {
          DEFAULT: "#ec2c7c",
        },
        bensonblack: {
          DEFAULT: "#000000",
        },
        bensongrey: {
          DEFAULT: "#666666",
        },
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
        bebas: ["var(--font-bebas)"],
        badscript: ["var(--font-badscript)"],
        dosis: ["var(--font-dosis)"],
        slab: ["var(--font-slab)"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
export default config;
