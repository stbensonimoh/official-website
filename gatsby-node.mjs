import slugify from "@sindresorhus/slugify"
import readingTime from "reading-time";

/**
 * Adds a `slug` field to the `Mdx` nodes.
 * The `slug` field is generated from the `title` field of the node.
 * The `slug` field is used to generate a URL for the node.
 *
 * @param {Object} params - The parameters object.
 * @param {Object} params.node - The node being created.
 * @param {Object} params.actions - The actions object from Gatsby Node API.
 */
export function onCreateNode({ node, actions }) {
  const { createNodeField } = actions;

  // Check if the node is of type `Mdx`
  if (node.internal.type === `Mdx`) {
    // Generate the `slug` value from the `title` field using the `slugify` function
    const slug = `/${slugify(node.frontmatter.title)}`;

    // Create the `slug` field for the node
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });

    // Create the `readingTime` field for the node
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    })
  }
};

export function createSchemaCustomization({ actions }) {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
