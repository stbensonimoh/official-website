# Benson Imoh's Personal Website

A modern, responsive personal website and blog built with Astro and Tailwind CSS.

![Website Preview](public/images/front-image.png)

## Features

- **SPA Navigation**: Client-side routing via `<ClientRouter />` for instant page transitions
- **Blog Platform**: MDX-powered blog with content collections and reading time estimation
- **SEO Optimized**: Built-in OG/Twitter cards, RSS feed, and sitemap generation
- **Theme System**: Light/Dark/System mode with FOUC prevention and localStorage persistence
- **Modern UI**: Clean, professional interface with Tailwind CSS v4
- **Zero React**: Pure Astro components + vanilla JS (no framework dependencies)
- **TypeScript**: Strict mode throughout
- **Testing**: Bun Test for utility functions

## Technologies

- **Framework**: [Astro 6](https://astro.build/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (strict)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Testing**: [Bun Test](https://bun.sh/docs/cli/test)
- **Content**: [MDX](https://mdxjs.com/) via `@astrojs/mdx`
- **Deployment**: [Cloudflare Workers](https://workers.cloudflare.com/) via `@astrojs/cloudflare`
- **Analytics**: Microsoft Clarity (script-based, no npm dependency)

## Prerequisites

- [Bun](https://bun.sh/) 1.0.0 or higher

## Installation

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
| `bun run dev` | Start Astro dev server with Cloudflare platform proxy |
| `bun run build` | Production build |
| `bun run lint` | Run ESLint |
| `bun run test` | Run Bun tests |
| `bun astro check` | Type check all files |
| `bun run preview` | Build + preview locally with Wrangler |
| `bun run deploy` | Build + deploy to Cloudflare Workers |

## Project Structure

```
├── .github/               # GitHub workflows, templates, docs
├── public/                # Static assets
│   ├── images/            # Image files
│   └── robots.txt         # robots.txt for crawlers
├── src/
│   ├── components/        # Astro components (Header, Logo, ThemeToggle, etc.)
│   ├── content/           # Content collections
│   │   └── blog/          # Blog posts in MDX format
│   ├── layouts/           # Page layouts (Layout.astro)
│   ├── lib/               # Utility functions (posts.ts, clarity.ts, theme.ts)
│   ├── pages/             # Routes (/ , /about, /blog, /contact, /404, /[slug])
│   ├── styles/            # Global CSS (Tailwind theme, custom utilities)
│   └── content.config.ts  # Content collection schema
├── astro.config.mjs       # Astro configuration
├── siteMetadata.ts        # Site metadata constants
├── tsconfig.json          # TypeScript configuration
└── wrangler.jsonc         # Cloudflare Workers configuration
```

## Testing

```bash
bun run test        # Run all tests
bun run test --watch # Watch mode
```

## Contributing

See [CONTRIBUTING.md](.github/CONTRIBUTING.md). Commits follow [Conventional Commits](https://www.conventionalcommits.org/).

## Security

A Cloudflare WAF rule blocks common attack paths at the edge. See [SECURITY.md](.github/SECURITY.md) for reporting vulnerabilities.

## Deployment

Deployed to Cloudflare Workers via GitHub Actions. Quality gates (lint, typecheck, test) must pass before deploy. See [DEPLOY.md](DEPLOY.md) for details.

## About the Author

Benson Imoh,ST is a Software Engineer, DevOps Enthusiast, and Open Source Software Advocate.

## License

MIT — see [LICENSE](LICENSE) for details.
