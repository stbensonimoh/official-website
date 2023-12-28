import path from "node:path"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const config = {
  siteMetadata: {
    title: `Benson Imoh,ST`,
    author: {
      name: `Benson Imoh,ST`,
      summary: `Experience Designer(xD) & Software Engineer. Passionate about blending engineering and design, to creatively and efficiently solve problems. OSS Enthusiast.`,
      image: `https://res.cloudinary.com/stbensonimoh/image/upload/v1692398633/sq_xmnmhb.jpg`,
    },
    description: `Experience Designer(xD) & Software Engineer. OSS Enthusiast`,
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
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `static/logo.svg`,
      },
    },
    `gatsby-plugin-head-seo`,
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Roboto`, `Bebas Neue`, `Dosis`, `Bad Script`],
        display: "swap",
      },
    },
    `gatsby-plugin-mdx`,
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        // You can add multiple tracking ids and a pageview event will be fired for all of them.
        trackingIds: [`G-4C79DP5RD8`],
        // This object is used for configuration specific to this plugin
        pluginConfig: {
          // Puts tracking script in the head instead of the body
          head: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-hotjar`,
      options: {
        includeInDevelopment: true, // optional parameter to include script in development
        id: 3797229,
        sv: 6,
      },
    },
  ],
}

export default config
