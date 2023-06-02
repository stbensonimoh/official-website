import { dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

const config = {
  siteMetadata: {
    title: `Benson Imoh,ST`,
    author: {
      name: `Benson Imoh,ST`,
      summary: `Experience Designer(xD) & Software Engineer. Passionate about blending engineering and design, to creatively and efficiently solve problems.`,
    },
    description: `Experience Designer(xD) & Software Engineer.`,
    siteUrl: `https://stbensonimoh.com/`,
    social: {
      twitter: `stbensonimoh`,
      linkedin: `https://linkedin.com/in/stbensonimoh`,
      github: `stbensonimoh`,
      instagram: `stbensonimoh`,
      facebook: `stbensonimoh`,
      youtube: `stbensonimoh`,
    },
  },
  trailingSlash: `never`,
  plugins: [
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Roboto`, `Bebas Neue`, `Dosis`, `Bad Script`],
        display: "swap",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
  ],
}

export default config
