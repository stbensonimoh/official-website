# Benson Imoh's Personal Website

A modern, responsive personal website and blog built with Astro and Tailwind CSS.

![Website Preview](src/assets/images/front-image.png)

## Features

- **Prerendered Pages**: Every route is static at build time and served from Cloudflare's edge
- **Optimized Images**: Local images become AVIF and WebP at build time; remote Cloudinary images use delivery transforms
- **Self-Hosted Fonts**: The Astro Fonts API serves fonts from this site, with one preloaded family and metric-matched fallbacks
- **SPA Navigation**: Client-side routing via `<ClientRouter />` with prefetch pinned to hover for instant page transitions
- **Blog Platform**: MDX-powered blog with content collections and reading time estimation
- **SEO Optimized**: Built-in OG/Twitter cards, RSS feed, and sitemap generation
- **Theme System**: Light/Dark/System mode with FOUC prevention and localStorage persistence
- **Modern UI**: Clean, professional interface with Tailwind CSS v4
- **Zero React**: Pure Astro components + vanilla JS (no framework dependencies)
- **TypeScript**: Strict mode throughout
- **Testing**: Bun Test for utility functions

## Technologies

- **Framework**: [Astro 7](https://astro.build/) with `output: 'server'` and `prerender = true` on every route
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Fonts**: [Astro Fonts API](https://docs.astro.build/en/guides/fonts/) (Google provider, self-hosted)
- **Images**: [`astro:assets`](https://docs.astro.build/en/guides/images/) with build-time optimization
- **Testing**: [Bun Test](https://bun.sh/docs/cli/test)
- **Content**: [MDX](https://mdxjs.com/) via `@astrojs/mdx`
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via `@astrojs/cloudflare`
- **Analytics**: Microsoft Clarity (script-based, no npm dependency)

## Prerequisites

- [Bun](https://bun.sh/) 1.0.0 or higher

## Installation

Run these commands to set up the project:

```bash
git clone https://github.com/stbensonimoh/official-website.git
cd official-website
bun install
bun run dev
```

Open [http://localhost:4321](http://localhost:4321) in your browser.

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Start the Astro dev server with the Cloudflare platform proxy |
| `bun run build` | Build the production site |
| `bun run lint` | Run ESLint |
| `bun run test` | Run the Bun test suite |
| `bun astro check` | Type-check all files |
| `bun run preview` | Build, then serve the Worker locally with `astro preview` |
| `bun run lighthouse` | Build, then run the Lighthouse CI gate against a preview server |
| `bun run deploy` | Build, then deploy to Cloudflare Workers |
| `bun run cf-typegen` | Regenerate Cloudflare binding types |

## Project Structure

```
├── .github/               # GitHub workflows, templates, agent instructions
├── docs/                  # Deployment runbook, ADRs, performance audits
│   ├── adr/               # Architecture decision records
│   └── audits/            # Committed performance audits
├── public/                # Static assets served as-is
│   ├── images/            # Images that astro:assets does not process
│   ├── _headers           # Cache policy for unhashed assets
│   ├── _redirects         # /feed.xml to /rss.xml and /sitemap.xml to /sitemap-index.xml
│   ├── favicon.svg        # Favicon set (SVG, ICO, PNG, and apple-touch)
│   └── robots.txt         # robots.txt for crawlers, points at the sitemap index
├── src/
│   ├── assets/images/     # Source images, optimized at build time
│   ├── components/        # Astro components (Header, Logo, ThemeToggle, etc.)
│   ├── content/           # Content collections
│   │   └── blog/          # Blog posts in MDX format
│   ├── layouts/           # Page layouts (Layout.astro)
│   ├── lib/               # Utilities (posts.ts, cloudinary.ts, clarity.ts, theme.ts)
│   ├── pages/             # Routes and endpoints (/ , /about, /blog, /contact, /404, /[slug], /rss.xml)
│   ├── styles/            # Global CSS (Tailwind theme, custom utilities)
│   └── content.config.ts  # Content collection schema
├── astro.config.mjs       # Astro configuration
├── siteMetadata.ts        # Site metadata constants
├── tsconfig.json          # TypeScript configuration
└── wrangler.jsonc         # Cloudflare Workers configuration
```

`@astrojs/sitemap` writes `sitemap-index.xml` and `sitemap-0.xml` at build time. `/sitemap.xml` is not a route; `public/_redirects` sends it to the index with a 301.

## Testing

```bash
bun run test         # Run all tests
bun run test --watch # Watch mode
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md). Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

## Security

A Cloudflare WAF rule blocks common attack paths at the edge. See [SECURITY.md](.github/SECURITY.md) for reporting vulnerabilities.

## Deployment

The site deploys to Cloudflare Workers through GitHub Actions. The quality gates (lint, type check, test, build, Lighthouse CI budgets, the render-blocking third-party check, and the single-main landmark check) must pass before the deploy job runs. See [DEPLOY.md](DEPLOY.md) and [docs/deployment.md](docs/deployment.md) for details.

## About the Author

Benson Imoh,ST is a Software Engineer, DevOps Enthusiast, and Open Source Software Advocate.

## License

MIT. See [LICENSE](LICENSE) for details.
