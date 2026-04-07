# Technical Specification: `stbensonimoh.com` — Official Website

**Document Status:** Draft  
**Version:** 1.0  
**Author:** Benson Imoh, ST  
**Date:** 2026-03-03  
**Project Version at Time of Writing:** 1.4.0

---

## Table of Contents

1. [Terminology](#1-terminology)
2. [System Overview](#2-system-overview)
3. [Technology Stack](#3-technology-stack)
4. [Repository Structure](#4-repository-structure)
5. [Routing & Pages](#5-routing--pages)
6. [Component Architecture](#6-component-architecture)
7. [Blog System (File-Based CMS)](#7-blog-system-file-based-cms)
8. [Theme System](#8-theme-system)
9. [Styling Architecture](#9-styling-architecture)
10. [Analytics Integration](#10-analytics-integration)
11. [SEO & Metadata](#11-seo--metadata)
12. [Performance](#12-performance)
13. [Accessibility](#13-accessibility)
14. [Testing Strategy](#14-testing-strategy)
15. [CI/CD Pipeline](#15-cicd-pipeline)
16. [Environment & Configuration](#16-environment--configuration)
17. [Future Features (Open Issues)](#17-future-features-open-issues)

---

## 1. Terminology

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED", "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://www.ietf.org/rfc/rfc2119.txt).

---

## 2. System Overview

This is the personal website and blog of Benson Imoh, ST (Software Engineer, DevOps Enthusiast and OSS Advocate). It is a statically-generated marketing and content site deployed on Cloudflare Workers via OpenNext. Its primary functions are:

- Professional identity presentation (homepage, about, contact)
- Technical blog with MDX content
- SEO discoverability (sitemap, robots.txt, RSS feed)
- Behavioral analytics via Microsoft Clarity (with a planned migration to Google Tag Manager–managed tags; see §17.12)

The system MUST remain a statically-generated site (no server-side rendering at request time). All pages MUST be pre-rendered at build time via Next.js Static Site Generation (SSG).

---

## 3. Technology Stack

### 3.1 Core Runtime

| Concern | Technology | Version |
|---|---|---|
| Runtime | Bun | latest |
| Framework | Next.js (App Router) | 16.1.5 |
| Language | TypeScript | ^5 |
| UI | React | 19.2.1 |

- The project MUST use Bun as the package manager and script runner. npm and yarn MUST NOT be used.
- All Next.js scripts MUST use the `bun --bun` prefix (e.g., `bun --bun next build`).
- TypeScript strict mode MUST be enabled at all times.
- The `@/*` path alias MUST resolve to `src/*`.

### 3.2 Styling

| Concern | Technology | Version |
|---|---|---|
| CSS Framework | Tailwind CSS | ^4.1.7 |
| PostCSS Integration | @tailwindcss/postcss | ^4.1.7 |
| Typography Plugin | @tailwindcss/typography | ^0.5.15 |

- The project MUST use Tailwind CSS v4's CSS-first `@theme` block syntax.
- A `tailwind.config.ts` or `tailwind.config.js` file MUST NOT exist.
- All theme tokens (colors, font families) MUST be defined in `src/app/tailwind.css`.
- The root-level `tailwind.css` file MUST remain empty; it MUST NOT be edited.

### 3.3 Dependencies

| Package | Purpose |
|---|---|
| `gray-matter` | MDX frontmatter parsing |
| `react-markdown` + `rehype-raw` | Blog post HTML rendering |
| `markdown-it` | HTML generation for RSS feed |
| `reading-time` | Estimated reading time from post content |
| `slugify` | URL-safe slug generation from post titles |
| `next-seo` | OpenGraph and Twitter card defaults |
| `react-icons` | Icon set (social, UI) |
| `sweetalert2` | Modal dialogs |
| `@microsoft/clarity` | Behavioral analytics |

---

## 4. Repository Structure

```
/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml               # Lint + build on push/PR
│   │   └── release-please.yml   # Automated changelog & releases
│   ├── copilot-instructions.md  # AI agent architectural context
│   ├── CONTRIBUTING.md
│   └── SECURITY.md
├── blog/                        # MDX blog content (outside src/)
│   └── *.mdx
├── public/
│   ├── images/                  # Static image assets
│   ├── logo.svg
│   └── logo-white.svg
├── scripts/
│   └── generate-posts-data.ts    # Generates posts data at build time
├── src/
│   ├── app/
│   │   ├── [slug]/page.tsx      # Dynamic blog post route
│   │   ├── about/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── feed.xml/route.ts    # RSS 2.0 Route Handler
│   │   ├── components/          # All UI and tracker components
│   │   ├── context/
│   │   │   └── ThemeContext.tsx
│   │   ├── fonts.ts
│   │   ├── globals.css          # Empty (intentional)
│   │   ├── layout.tsx           # Root layout
│   │   ├── not-found.tsx        # 404 page
│   │   ├── page.tsx             # Homepage
│   │   ├── robots.ts            # robots.txt generator
│   │   ├── sitemap.ts           # sitemap.xml generator
│   │   └── tailwind.css         # Primary CSS & Tailwind theme
│   └── lib/
│       ├── clarity.ts           # Analytics utility wrapper
│       ├── posts.ts             # File-based CMS logic
│       └── posts.test.ts        # Bun unit tests
├── next.config.mjs
├── next-seo.config.ts
├── package.json
├── postcss.config.mjs
├── siteMetadata.ts              # Site-wide constants
└── tsconfig.json
```

---

## 5. Routing & Pages

The project uses the Next.js App Router. All pages MUST be pre-rendered at build time using SSG. Server-side rendering at request time MUST NOT be used.

### 5.1 Static Routes

| Route | File | Type |
|---|---|---|
| `/` | `src/app/page.tsx` | Client Component |
| `/about` | `src/app/about/page.tsx` | Server Component |
| `/blog` | `src/app/blog/page.tsx` | Server Component |
| `/contact` | `src/app/contact/page.tsx` | Server Component |
| `/feed.xml` | `src/app/feed.xml/route.ts` | Route Handler |
| `/robots.txt` | `src/app/robots.ts` | Metadata Route |
| `/sitemap.xml` | `src/app/sitemap.ts` | Metadata Route |

### 5.2 Dynamic Routes

| Route Pattern | File | Generation |
|---|---|---|
| `/[slug]` | `src/app/[slug]/page.tsx` | `generateStaticParams()` at build time |

- Blog post slugs MUST be generated from post titles using `slugify({ lower: true, strict: true })`.
- Changing a post's `title` frontmatter field MUST be understood to change its public URL.
- The `[slug]` dynamic route MUST export `generateStaticParams()` to pre-render all posts at build time.

### 5.3 Page Descriptions

**Homepage (`/`):** Hero section with author introduction, role tagline, and social icon row. Implemented as a Client Component.

**About (`/about`):** Three-section layout: personal introduction, professional background, and a projects/work section. Implemented as a Server Component.

**Blog (`/blog`):** Lists all blog posts. SHOULD display a "latest post" section and a "featured posts" grid. Posts are sorted by date (newest first). Implemented as a Server Component.

**Blog Post (`/[slug]`):** Full article view with featured image, author blob (avatar, date, reading time), and MDX-rendered body. Includes scroll-depth and engaged-reading analytics.

**Contact (`/contact`):** Email call-to-action and social icon links. MUST NOT include a server-side form submission handler.

**404 (`/not-found`):** Custom not-found page. MUST include analytics tracking via `NotFoundTracker`.

---

## 6. Component Architecture

### 6.1 Conventions

- Components that require browser APIs or React hooks MUST be Client Components, marked with `"use client"`.
- All other components SHOULD be Server Components by default.
- Components that only emit analytics events and render no visible UI MUST return `null`.
- The `@/*` import alias MUST be used for all internal imports.

### 6.2 Component Inventory

| Component | Type | Purpose |
|---|---|---|
| `Analytics` | Client | Initializes Microsoft Clarity on mount; renders `null` |
| `AuthorBlob` | Server | Displays author avatar, post date, and reading time |
| `BlogPostCard` | Client | Blog listing card; tracks click events |
| `BlogPostTracker` | Client | Scroll-depth (50%, 90%) and engaged-reading analytics; renders `null` |
| `Button` | Server | Polymorphic button: internal `Link`, external `<a>`, or `<button>` |
| `ContactPageTracker` | Client | Contact page analytics; renders `null` |
| `Copyright` | Server | Dynamic current-year copyright notice |
| `CTAButton` | Client | `Button` wrapper; fires Clarity CTA and session upgrade events |
| `Header` | Client | Responsive navigation; desktop links + mobile hamburger; active link detection |
| `Logo` | Client | Inline SVG logo; color adapts to current theme |
| `NotFoundTracker` | Client | 404 page analytics; renders `null` |
| `PageTracker` | Client | Sets Clarity page context tag; renders `null` |
| `SocialIcons` | Client | GitHub, LinkedIn, X, Instagram icon links with click tracking |
| `ThemeToggle` | Client | Floating button cycling Light → Dark → System → Light |

### 6.3 Root Layout

`src/app/layout.tsx` MUST:

- Wrap all pages with `ThemeProvider`
- Inject `Header` and `ThemeToggle` into every page
- Apply all Google Font CSS variable class names to `<body>`
- Inject the `Analytics` component

---

## 7. Blog System (File-Based CMS)

### 7.1 Content Location

Blog posts MUST be stored as `.mdx` files in the `/blog` directory at the repository root. This directory MUST NOT be moved inside `src/`.

### 7.2 Frontmatter Schema

Every blog post MUST include the following frontmatter fields:

```yaml
title: string        # REQUIRED. Auto-converted to URL slug.
date: YYYY-DD-MM     # REQUIRED. Non-standard: day precedes month.
excerpt: string      # REQUIRED. Shown on blog listing cards.
```

The following frontmatter fields are OPTIONAL:

```yaml
featured_image: url  # Cloudinary CDN URL. Shown as hero image on post page.
tags: string[]       # Used for categorization and filtering.
```

- The `date` field MUST follow the `YYYY-DD-MM` format (day-before-month). This is non-standard and deviates from ISO 8601. Contributors MUST NOT use `YYYY-MM-DD`.
- Images embedded in MDX body content MUST use absolute Cloudinary CDN URLs. Relative paths MUST NOT be used.

### 7.3 Data Access Layer (`src/lib/posts.ts`)

- `getAllPosts()` MUST read all `.mdx` files from `/blog`, parse frontmatter with `gray-matter`, calculate reading time with `reading-time`, and return an array of post objects. The returned array is **unsorted**; callers (e.g., the blog listing page, RSS feed route) are responsible for sorting by date.
- `getPostBySlug(slug: string)` MUST return the single post whose title-derived slug matches the argument.
- The slug generation algorithm MUST use `slugify(title, { lower: true, strict: true })`.

### 7.4 Rendering Pipeline

1. `getAllPosts()` is called in `[slug]/page.tsx`'s `generateStaticParams()` to produce all static routes.
2. `getPostBySlug(slug)` is called at render time to retrieve post content and frontmatter.
3. Post body MUST be rendered using `react-markdown` with the `rehype-raw` plugin to support raw HTML inside MDX.
4. The RSS feed (`/feed.xml`) MUST use `markdown-it` (separately from `react-markdown`) to convert post bodies to HTML for feed readers.

### 7.5 RSS Feed (`/feed.xml`)

- The RSS feed MUST conform to RSS 2.0 specification.
- The feed MUST include the `content:encoded` namespace for full HTML content.
- The feed MUST include an Atom self-link.
- Featured images MUST be prepended to the `content:encoded` HTML of each feed item when present.
- All image URLs in the feed MUST be absolute, using `siteMetadata.siteUrl` as the base.

---

## 8. Theme System

### 8.1 States

The theme system MUST support exactly three states: `"light"`, `"dark"`, and `"system"`.

- `"system"` MUST resolve the effective theme by reading the `(prefers-color-scheme: dark)` media query.
- The toggle cycle MUST follow: **Light → Dark → System → Light**.

### 8.2 Persistence

- The selected theme MUST be persisted in `localStorage` under a stable key.
- On initial load, the system MUST read from `localStorage` and apply the saved theme before first paint to prevent flash of incorrect theme.

### 8.3 DOM Application

- The effective theme MUST be applied by setting a `data-theme` attribute on the `<html>` element.
- The value `data-theme="dark"` MUST trigger dark-mode CSS variable overrides defined in `src/app/tailwind.css`.
- When `"system"` is the selected state and the OS prefers dark, `data-theme="dark"` MUST be set.

### 8.4 Implementation

- `ThemeContext` (`src/app/context/ThemeContext.tsx`) MUST be the single source of truth for theme state.
- The `useTheme()` hook MUST be the only way components access or mutate theme state.
- `ThemeProvider` MUST wrap the entire application in `src/app/layout.tsx`.
- The `Logo` component MUST respond to theme changes, using `#EC2C7C` in light mode and `#FF4D94` in dark mode.

---

## 9. Styling Architecture

### 9.1 Tailwind v4 CSS-First Configuration

- All design tokens MUST be defined inside the `@theme` block in `src/app/tailwind.css`.
- Brand colors MUST be defined as CSS custom properties: `--color-bensonpink`, `--color-bensonblack`, `--color-bensongrey`.
- Semantic color tokens (`--background`, `--foreground`, `--primary`, `--secondary`, `--surface`) MUST be defined in `:root` for light mode and overridden in `[data-theme="dark"]`.

### 9.2 Brand Colors

| Token | Light Mode | Dark Mode |
|---|---|---|
| `--primary` | `#ec2c7c` | `#ff4d94` |
| `--background` | `#ffffff` | `#0a0a0a` |
| `--foreground` | `#171717` | `#ededed` |
| `--secondary` | `#666666` | `#a3a3a3` |
| `--surface` | `#f8f8f8` | `#1a1a1a` |

### 9.3 Typography

Fonts MUST be loaded via `next/font/google` in `src/app/fonts.ts`. The following fonts are REQUIRED:

| Font | CSS Variable | Usage |
|---|---|---|
| Roboto (5 weights) | `--font-roboto` | Body text, UI |
| Bebas Neue | `--font-bebas` | Display headings |
| Bad Script | `--font-badscript` | Decorative/handwriting |
| Dosis | `--font-dosis` | Secondary headings |
| Roboto Slab | `--font-slab` | Article body text |

- Google Fonts MUST be fetched at build time. The build environment MUST have network access.
- Font utility classes (`.font-roboto`, `.font-bebas`, etc.) MUST use `!important` to override Next.js defaults.
- Article content (`<article>`) currently uses Roboto (`--font-roboto`) as its default font. A migration to Roboto Slab (`--font-slab`) for long-form body text MAY be considered in a future iteration.

### 9.4 Scrollbar

Custom scrollbar styling MUST be applied via `::-webkit-scrollbar` selectors. The scrollbar thumb MUST use `var(--primary)`.

### 9.5 Button Animation

The `.button` class MUST implement a fill-from-left hover animation using a CSS `background` linear gradient transition. The transition duration MUST be `0.7s ease-out`.

---

## 10. Analytics Integration

### 10.1 Provider

The project MUST use Microsoft Clarity (`@microsoft/clarity`) as its sole analytics provider.

### 10.2 Initialization

- The `Analytics` component MUST initialize Clarity only when `NEXT_PUBLIC_CLARITY_TRACKING_ID` is set to a non-empty value.
- The `Analytics` component MUST be a Client Component and MUST render `null`.
- Analytics MUST NOT be initialized in server-side code.

### 10.3 Utility Layer (`src/lib/clarity.ts`)

All Clarity API calls MUST be made through the wrapper functions in `src/lib/clarity.ts`. Direct calls to the `@microsoft/clarity` package from components MUST NOT be made. The utility MUST expose:

- `trackEvent(name: string)` — custom event tracking
- `setTag(key: string, value: string | string[])` — page context tags
- `upgradeSession(reason: string)` — session recording upgrades
- Higher-level convenience functions for common events

### 10.4 Tracker Components

Each tracker component MUST be a Client Component that renders `null`. Tracker components MUST behave as follows:

| Component | Trigger |
|---|---|
| `PageTracker` | Fires `setTag` with page context on mount |
| `BlogPostTracker` | Fires scroll-depth milestones (50% and 90% with session upgrade) and engaged-read events (30s threshold) |
| `ContactPageTracker` | Fires on contact page mount |
| `NotFoundTracker` | Fires on 404 page mount |

---

## 11. SEO & Metadata

### 11.1 Per-Page Metadata

Every page MUST provide metadata via one of the following patterns:

1. **Async `generateMetadata()` function** — used for dynamic routes (e.g., `[slug]/page.tsx`) where metadata depends on runtime parameters.
2. **Static `export const metadata`** — used for static pages (e.g., `/about`, `/blog`) where metadata is known at compile time.
3. **Layout inheritance** — pages that do not export metadata (e.g., `/`, `/contact`) inherit defaults from `layout.tsx`, which sources from `next-seo.config.ts`.

Regardless of pattern, metadata MUST include:

- `title` — formatted as `"[Page Title] - Benson Imoh,ST"`
- `description`
- `openGraph` — using defaults from `next-seo.config.ts`

### 11.2 Site Metadata

`siteMetadata.ts` MUST be the single source of truth for:

- `title`, `description`, `siteUrl`
- `author.name`, `author.summary`, `author.image`
- Social handles (`x`, `linkedin`, `github`, `instagram`, `facebook`, `youtube`)

### 11.3 sitemap.xml

`src/app/sitemap.ts` MUST generate a sitemap that includes all static routes and all dynamically generated blog post URLs using `siteMetadata.siteUrl` as the base.

### 11.4 robots.txt

`src/app/robots.ts` MUST generate a `robots.txt` that allows all crawlers and references the sitemap URL.

### 11.5 RSS Feed

See §7.5. The RSS feed SHOULD be made discoverable via a `<link rel="alternate" type="application/rss+xml">` element in the document `<head>`. This is not yet implemented; see §17.6 ([#94] SEO Discoverability Suite) for the planned work.

---

## 12. Performance

### 12.1 Current State

- The build MUST produce a fully static output via Next.js SSG for deployment on Cloudflare Workers via OpenNext.
- Google Fonts MUST be loaded via `next/font/google` to benefit from Next.js font optimization (self-hosting at build time).

### 12.2 Image Handling

- Blog featured images MUST be hosted on Cloudinary CDN.
- The `public/images/` directory MUST be used only for static assets that do not require CDN delivery.
- New page or component images SHOULD be delivered via the Next.js `<Image>` component to benefit from automatic optimization, lazy loading, and format negotiation.

---

## 13. Accessibility

### 13.1 Current Requirements

- All icon-only interactive elements MUST have either `aria-label` or `aria-hidden="true"` paired with adjacent visible text.
- All navigation MUST be reachable via keyboard (`Tab`, `Enter`, `Space`).
- The mobile navigation MUST NOT trap focus when closed.

---

## 14. Testing Strategy

### 14.1 Test Runner

The project MUST use Bun's native test runner exclusively. Jest, Vitest, and `@testing-library/react` MUST NOT be added as dependencies.

### 14.2 Running Tests

```bash
bun test             # Run all tests
bun test --watch     # Watch mode
bun test --coverage  # Generate coverage report
```

### 14.3 Current Coverage

- `src/lib/posts.test.ts` — 5 unit tests covering `getAllPosts()` and `getPostBySlug()`.
- No component tests currently exist.

### 14.4 Test Principles

- Tests MUST test actual behavior, not implementation details.
- Tests SHOULD minimize mocking; real behavior SHOULD be exercised where possible.
- New utility functions added to `src/lib/` MUST have corresponding test coverage.

---

## 15. CI/CD Pipeline

### 15.1 CI Workflow (`.github/workflows/ci.yml`)

Triggered on: push to `main`, pull requests targeting `main`.

#### Job: `lint-and-test`

Steps (in order):

1. Checkout repository
2. Setup Bun
3. `bun install --frozen-lockfile`
4. `bun run lint`
5. `bun run build`
6. `bun run test`

The CI workflow MUST NOT merge if linting or tests fail.

#### Job: `validate-deployment-path`

Validates the OpenNext/Cloudflare Workers build packaging path used by production deployments. Runs only on `push` to `main`, not on pull requests, to keep PR feedback cycles fast.

Steps (in order):

1. Checkout repository
2. Setup Bun
3. `bun install --frozen-lockfile`
4. `bun run generate-posts-data`
5. `opennextjs-cloudflare build`

Requires `CLOUDFLARE_API_TOKEN` as a GitHub Actions secret (wired as the `CLOUDFLARE_API_TOKEN` environment variable). The build step does not deploy; it only validates that the packaging stage succeeds.

### 15.2 Release Workflow (`.github/workflows/release-please.yml`)

- Releases MUST be automated using Google's `release-please` action.
- Version tags MUST follow the format `v*` (e.g., `v1.4.0`).
- `CHANGELOG.md` MUST be auto-generated and MUST NOT be manually edited.

### 15.3 Cloudflare Workers Deployment

- Production deployments use OpenNext's Cloudflare Workers adapter.
- The `bun run preview` script builds and previews the site locally using Cloudflare Workers.
- The `bun run deploy` script builds and deploys directly to Cloudflare Workers.
- Wrangler (`wrangler.jsonc`) manages Cloudflare Workers configuration.

---

## 16. Environment & Configuration

### 16.1 Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_CLARITY_TRACKING_ID` | REQUIRED in production | Microsoft Clarity tracking ID |

- All public environment variables MUST be prefixed with `NEXT_PUBLIC_`.
- The `.env` file MUST NOT be committed with production credentials. The `.gitignore` MUST exclude `.env.local` and `.env.production`.

### 16.2 Next.js Configuration (`next.config.mjs`)

- `typedRoutes: true` MUST be enabled for compile-time route type safety.
- `styledComponents: true` MAY remain for legacy compatibility but styled-components MUST NOT be used in new code.

### 16.3 ESLint Configuration

- `eslint.config.mjs` (ESLint v9 flat config) is the authoritative linting configuration.
- `.eslintrc.json` SHOULD be removed once migration is confirmed complete.
- `react/no-unescaped-entities` MUST remain disabled (apostrophes in JSX are intentional).
- `@next/next/no-page-custom-font` MUST remain disabled (Google Fonts usage is intentional).

### 16.4 TypeScript Configuration

- `strict: true` MUST remain enabled.
- `bun-types` MUST be included in `compilerOptions.types`.
- The `@/*` path alias MUST map to `./src/*`.

---

## 17. Future Features (Open Issues)

The following features are planned. Each references its GitHub issue number.

---

### 17.1 [#99] CSS-Variable-First Theme Architecture

**Priority:** Medium | **Scope:** DX

**Summary:** Migrate remaining theme configuration fully into CSS `@theme` blocks in `src/app/tailwind.css`, eliminating any residual JavaScript-based configuration.

**Requirements:**

- All color and spacing tokens MUST be driven by CSS custom properties in `@theme`.
- Dark mode SHOULD leverage `@media (prefers-color-scheme: dark)` for the system preference path, in addition to the `[data-theme="dark"]` attribute.
- No regressions in responsive design or the dark mode toggle MUST be introduced.
- Build MUST continue to produce a successful Tailwind v4 JIT compilation.

---

### 17.2 [#98] Shift-Left Quality Gates: Lighthouse CI & Accessibility Audits

**Priority:** High | **Scope:** DX

**Summary:** Integrate automated Lighthouse CI and visual regression testing into the CI/CD pipeline so that performance and accessibility regressions are caught at the PR stage.

**Requirements:**

- A `.lighthouserc.js` (or equivalent) configuration MUST be added to the repository.
- GitHub Actions MUST run Lighthouse against Cloudflare preview URLs on every PR.
- PRs MUST display a summary comment containing Lighthouse scores for Performance, Accessibility, Best Practices, and SEO.
- PRs MUST be blocked from merging if any tracked score falls below a defined threshold.
- Visual regression tests using Playwright SHOULD be implemented to catch unintentional CSS changes.

---

### 17.3 [#97] `/uses` Page — Tech Stack Manifest

**Priority:** Low | **Scope:** UX

**Summary:** A new `/uses` route displaying the author's hardware, software, and developer tooling.

**Requirements:**

- The route `/uses` MUST be accessible and statically generated.
- Data MUST be managed in a structured file (e.g., `data/uses.json`) with defined categories: Hardware, Software, Dev Tools.
- The layout MUST be responsive and visually consistent with the rest of the site.
- All external links MUST be rendered with `rel="noopener noreferrer"` and `target="_blank"`.
- A "Last Updated" timestamp SHOULD be visible on the page.

---

### 17.4 [#96] Dynamic OpenGraph Image Infrastructure

**Priority:** Medium | **Scope:** DX

**Summary:** Automatically generate branded social sharing cards for every page using a Satori-based Edge Route.

**Requirements:**

- An Edge Route at `app/api/og/route.tsx` MUST be implemented using Satori.
- The OG image template MUST include: site logo, dynamic page title, reading time (for blog posts), and tags.
- `generateMetadata()` on all pages MUST be updated to reference the OG route with appropriate query parameters.
- The route MUST return a valid `image/png` or `image/jpeg` response.
- The brand font MUST render correctly within the generated image.
- Social platforms (LinkedIn, X/Twitter) MUST correctly unfurl the dynamic images.
- Images MUST be generated at the Edge for minimal latency.

---

### 17.5 [#95] Blog Intelligence: Search, Filtering, & Scroll-Spy TOC

**Priority:** Medium | **Scope:** UX

**Summary:** Evolve the blog listing from a simple list into a searchable, filterable knowledge base with an in-article table of contents.

**Requirements:**

- A `search-index.json` file MUST be generated at build time, containing post titles, excerpts, and tags.
- Client-side fuzzy search MUST be implemented using Fuse.js against the build-time index.
- Search results MUST be returned in sub-10ms on a modern device.
- Tag filter chips MUST extract unique tags from all MDX frontmatter.
- Filter state MUST be reflected in the URL (query string) to allow shareable filtered views.
- A `TableOfContents` component MUST use `IntersectionObserver` to highlight the currently visible section.
- Heading IDs MUST be generated using `remark-slug` (or equivalent) during MDX parsing.
- All search and filtering MUST function offline once the page has been loaded.

---

### 17.6 [#94] SEO Discoverability Suite

**Priority:** High | **Scope:** UX/SEO

**Summary:** Advance technical SEO beyond basic meta tags to include structured data and full ecosystem coverage.

**Requirements:**

- JSON-LD structured data MUST be implemented for `Person` and `ProfessionalService` schemas.
- Structured data MUST pass Google Search Console's Rich Results validation.
- An `<link rel="alternate" type="application/rss+xml">` tag MUST be present in `<head>` on all pages (or at minimum on the blog listing and homepage).
- Dynamic OG images (per §17.4) MUST be applied to all routes as part of this suite.
- `robots.txt` MUST correctly reference the sitemap URL.

---

### 17.7 [#93] Enterprise Accessibility Hardening

**Priority:** High | **Scope:** UX/A11y

**Summary:** Bring the site to full WCAG 2.1 AA compliance.

**Requirements:**

- The Lighthouse Accessibility score MUST reach and be maintained at 100.
- All interactive elements MUST be navigable via `Tab` and activatable via `Enter` or `Space`.
- The mobile navigation menu MUST implement a focus trap while open; focus MUST be released when closed.
- All decorative icons MUST have `aria-hidden="true"`.
- All functional icons without visible text labels MUST have a descriptive `aria-label`.
- ARIA landmark roles (`main`, `nav`, `banner`, `contentinfo`) MUST be applied to all major page regions.
- Color contrast for all text MUST meet WCAG AA minimum ratios (4.5:1 for body text, 3:1 for large text).

---

### 17.8 [#92] Asset Pipeline Modernization

**Priority:** Medium | **Scope:** DX/Performance

**Summary:** Replace all `<img>` elements with Next.js `<Image>` and implement blur-up placeholders to eliminate Cumulative Layout Shift (CLS).

**Requirements:**

- All `<img>` elements in page and component code MUST be replaced with `next/image`'s `<Image>` component.
- Every image MUST specify `width`, `height`, or `fill` to prevent CLS.
- Every image MUST have a `blurDataURL` placeholder (via Plaiceholder or BlurHash) to provide a low-quality image placeholder (LQIP) during loading.
- CLS MUST be < 0.01 across all pages.
- Average image payload SHOULD be reduced by more than 50% compared to the pre-migration baseline.
- Above-the-fold images MUST use the `priority` prop to disable lazy loading.

---

### 17.9 [#91] `/resume` — Dynamic Resume/CV Generation

**Priority:** Medium | **Scope:** UX

**Summary:** A web-first resume page that is also print-perfect, sourced from a single structured data file.

**Requirements:**

- A `resume.ts` (or `data/resume.ts`) configuration file MUST be created as the single source of truth for all work history and skills.
- The `/resume` route MUST be statically generated.
- The page MUST render a complete, professional CV layout.
- Tailwind CSS `@media print` modifiers MUST be used to hide the navigation, footer, and non-essential UI elements when printing.
- Print output MUST produce a professional 1–2 page PDF with no layout shifts.
- A "Download PDF" / "Print" button MUST trigger `window.print()`.
- Page content MUST be automatically synchronized from `resume.ts`; no manual HTML editing MUST be required to update content.

---

### 17.10 [#90] `/projects` — Interactive Projects Showroom & STAR Case Studies

**Priority:** Medium | **Scope:** UX

**Summary:** A data-driven projects gallery with individual MDX-powered case studies following the STAR (Situation, Task, Action, Result) format.

**Requirements:**

- The `/projects` route MUST list all projects with filtering capability.
- Project data MUST be sourced from MDX files in a dedicated `projects/` directory (or equivalent).
- Individual project pages MUST be dynamically generated from MDX at build time.
- React components for `Situation`, `Task`, `Action`, and `Result` MUST be created and MUST be used in all case study MDX files.
- React 19's `useTransition` SHOULD be used for filtering animations.
- Tailwind CSS container queries SHOULD be used for responsive project cards.

---

### 17.11 [#36] `/press` — Speaker Press Kit & Brand Assets

**Priority:** Low | **Scope:** UX

**Summary:** A self-service page providing standardized media assets, bio copy, and brand guidelines for podcasts and speaking engagements.

**Requirements:**

- The `/press` route MUST be accessible and statically generated.
- Bio copy in multiple lengths (short ~100 words, professional ~250 words) MUST be available and easily copyable via a one-click copy action.
- High-resolution headshots MUST be available for download.
- Asset metadata MUST be managed in a structured configuration file (e.g., `data/press.ts`).
- High-resolution assets SHOULD be hosted on Cloudinary or an equivalent CDN and linked directly rather than committed to the repository.
- Brand colors and logo variants MUST be documented on the page for third-party use.
- The page MUST be responsive and visually consistent with the rest of the site.

---

### 17.12 Analytics Pipeline: GTM, Google Analytics, BigQuery & Metabase

**Priority:** Medium | **Scope:** DX/Analytics

**Summary:** Migrate from direct Clarity initialization to a Google Tag Manager (GTM)–managed tag architecture. Add Google Analytics 4 (GA4) as a second analytics provider, sync GA4 data to BigQuery, and visualize it via a self-hosted or cloud Metabase dashboard.

**Requirements:**

#### 17.12.1 Google Tag Manager Integration

- A GTM container snippet MUST be injected into the `<head>` (inline script) and `<body>` (`<noscript>` fallback) of `src/app/layout.tsx`.
- The GTM container ID MUST be sourced from a `NEXT_PUBLIC_GTM_ID` environment variable.
- GTM MUST NOT load if `NEXT_PUBLIC_GTM_ID` is unset or empty (matching the existing privacy pattern).
- The existing direct Microsoft Clarity initialization in `Analytics.tsx` MUST be replaced by a Clarity tag managed within GTM.
- The `src/lib/clarity.ts` wrapper layer MUST remain unchanged; it calls `window.clarity()` which will continue to exist once Clarity is loaded via GTM.
- A GTM `dataLayer` array MUST be initialized before the GTM snippet loads.
- All custom Clarity events currently fired via `trackEvent()` SHOULD also be pushed to the `dataLayer` so GTM can forward them to any configured tag.

#### 17.12.2 Google Analytics 4 (GA4)

- GA4 MUST be deployed exclusively through GTM; a standalone `gtag.js` snippet MUST NOT be added.
- The GA4 Measurement ID MUST be configured inside the GTM container, not hardcoded in application code.
- GA4 enhanced measurement (scroll, outbound clicks, site search) SHOULD be enabled via GTM.
- Page-view tracking MUST fire automatically on every route change. Because Next.js uses client-side navigation, a GTM trigger based on `history change` or a custom `dataLayer.push({ event: 'route_change' })` MUST be implemented.
- A `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable MAY be used for build-time reference (e.g., in `siteMetadata.ts`) but MUST NOT be used for direct script injection.

#### 17.12.3 BigQuery Export

- GA4's native BigQuery Linking feature MUST be configured in the GA4 property settings to export raw event data daily.
- The BigQuery dataset SHOULD reside in a GCP project owned by the site author.
- No custom application code is REQUIRED for syncing; the GA4 → BigQuery pipeline is a managed Google service.
- The BigQuery dataset SHOULD be configured with a data retention policy (RECOMMENDED: 14 months minimum to align with GA4's standard retention).

#### 17.12.4 Metabase Dashboard

- A Metabase instance MUST be provisioned (self-hosted or Metabase Cloud) and connected to the BigQuery dataset as a data source.
- At minimum, the following dashboard views SHOULD be created:
  - **Traffic overview:** sessions, page views, unique users over time.
  - **Content performance:** most-read blog posts, average reading depth, engaged readers.
  - **Acquisition:** top referrers, social channel breakdown.
  - **Geographic & device split:** country, device category, browser.
- Metabase MUST NOT be publicly accessible; it MUST be protected by authentication.
- Metabase configuration (questions, dashboards) SHOULD be version-controlled where the tooling supports it.

#### 17.12.5 Environment Variables (Additions)

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GTM_ID` | REQUIRED in production | Google Tag Manager container ID |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | OPTIONAL | GA4 Measurement ID (for reference only; tag fires via GTM) |

#### 17.12.6 Migration Path

1. Create GTM container; add Clarity and GA4 tags inside it.
2. Replace the direct Clarity `init()` call in `Analytics.tsx` with the GTM snippet.
3. Verify all existing Clarity events still fire by auditing live sessions.
4. Enable GA4 BigQuery Linking.
5. Deploy Metabase; connect to BigQuery; build initial dashboards.
6. Remove `@microsoft/clarity` direct initialization from `Analytics.tsx` (the npm package remains for the `src/lib/clarity.ts` wrapper API).

---

*End of Technical Specification*
