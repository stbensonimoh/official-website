import path from "node:path"
import { fileURLToPath } from "node:url"
import slugify from "@sindresorhus/slugify"
import readingTime from "reading-time"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const postTemplate = `${__dirname}/src/templates/post.jsx`

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
  const { createNodeField } = actions

  // Check if the node is of type `Mdx`
  if (node.internal.type === `Mdx`) {
    // Generate the `slug` value from the `title` field using the `slugify` function
    const slug = `/${slugify(node.frontmatter.title)}`

    // Create the `slug` field for the node
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })

    // Create the `readingTime` field for the node
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body),
    })
  }
}

/**
 * Creates pages based on MDX data.
 *
 * @param {Object} options - The options object.
 * @param {Object} options.graphql - The graphql function.
 * @param {Object} options.actions - The actions object.
 */
export const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // Query MDX data
  const result = await graphql(`
    query {
      allMdx {
        nodes {
          id
          fields {
            slug
          }
          internal {
            contentFilePath
          }
        }
      }
    }
  `)

  // Check for errors in the query result
  if (result.errors) {
    reporter.panicOnBuild("Error loading MDX result", result.errors)
  }

  const posts = result.data.allMdx.nodes

  // Create pages for each MDX node
  posts.forEach(node => {
    createPage({
      path: node.fields.slug, // Set the page path to the slug
      component: `${postTemplate}?__contentFilePath=${node.internal.contentFilePath}`, // Specify the component for the page
      context: { id: node.id }, // Pass additional data to the page
    })
  })
}

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
      image: String
    }

    type Social {
      twitter: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type MdxFrontmatter {
      title: String
      date: Date @dateformat
      author: String
      featured_image: String
      author_image: String
      tags: [String]
    }

    type Frontmatter {
      title: String
      date: Date @dateformat
      author: String
      featured_image: String
      author_image: String
      tags: [String]
    }

    type Fields {
      slug: String
    }
  `)
}
