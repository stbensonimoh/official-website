const config = {
  siteMetadata: {
    title: `Benson Imoh,ST`,
    author: {
      name: `Benson Imoh,ST`,
      summary: `Experience Designer(xD) & Software Engineer. Passionate about blending engineering and design, to creatively and efficiently solve problems. OSS Enthusiast.`,
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
    `gatsby-plugin-postcss`,
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Roboto`, `Bebas Neue`, `Dosis`, `Bad Script`],
        display: "swap",
      },
    },
  ],
}

export default config
