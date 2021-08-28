const colors = require("tailwindcss/colors")
module.exports = {
  purge: false,
  darkMode: false, // or 'media' or 'class'
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
    variants: {
      extend: {},
    },
    plugins: [],
  },
}
