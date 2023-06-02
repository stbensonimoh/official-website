/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors"
export default {
  purge: false,
  content: ["./src/pages/**/*.{html,js}", "./src/components/**/*.{html,js}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
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
        roboto: ["Roboto"],
        bebas: ["Bebas Neue"],
        badscript: ["Bad Script"],
        dosis: ["Dosis"],
        slab: ["Roboto Slab"],
      },
    },
  },
  plugins: [],
}
