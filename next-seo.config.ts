import siteMetadata from './siteMetadata';

const defaultSEOConfig = {
  title: "Benson Imoh,ST",
  description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
  openGraph: {
    title: "Benson Imoh,ST",
    description: "Software Engineer. DevOps Enthusiast. OSS Advocate.",
    type: "website",
    locale: "en_US",
    url: "https://stbensonimoh.com/",
    siteName: "Benson Imoh,ST",
    images: [
      {
        url: "https://res.cloudinary.com/stbensonimoh/image/upload/v1735318948/stbensonimoh_logo.png",
        width: 1500,
        height: 1500,
        alt: "Benson Imoh,ST's logo",
      },
    ],
  },
  // Note: The property name remains 'twitter' to align with the 
  // Twitter Card meta tag namespace (twitter:card, twitter:site, etc.)
  // but references the updated branding in siteMetadata.
  twitter: {
    handle: \`@\${siteMetadata.social.x}\`,
    site: \`@\${siteMetadata.social.x}\`,
    cardType: "summary_large_image",
  },
};

export default defaultSEOConfig;
