# Technical Specification: Official Website for `stbensonimoh.com`

**Version:** 3.1.0 | **Date:** 2026-10-10 | **Framework:** Astro 7.2.4
**Decision record:** [ADR 0001: performance and caching decisions](docs/adr/0001-performance-and-caching.md)

---

## 1. System Overview

Personal website and blog of Benson Imoh, ST. The site deploys to Cloudflare Workers through the `@astrojs/cloudflare` adapter. Primary functions: professional identity, technical blog, SEO discoverability, and behavioral analytics.

The build prerenders every route. Cloudflare serves the pages as static assets. No page runs on demand.

---

## 2. Technology Stack

| Concern | Technology |
|---------|-----------|
| Framework | Astro 7.2.4 (`output: 'server'`, `build.format: 'file'`, all routes prerendered) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` |
| Fonts | Astro Fonts API, Google provider, self-hosted |
| Images | `astro:assets` at build time; Cloudinary delivery transforms for remote images |
| Content | MDX via `@astrojs/mdx` |
| Deployment | Cloudflare Workers via `@astrojs/cloudflare` 14.2.3 |
| Testing | Bun Test |
| Package Manager | Bun |

---

## 3. Repository Structure

```
├── .github/workflows/ci.yml
├── docs/                # Deployment runbook, ADRs, performance audits
├── lighthouserc.json    # Lighthouse CI budgets and assertions
├── public/              # Static assets served as-is
│   ├── images/
│   ├── _headers         # Cache policy for unhashed assets
│   ├── _redirects       # /feed.xml to /rss.xml, /sitemap.xml to /sitemap-index.xml
│   └── robots.txt       # Points crawlers at sitemap-index.xml
├── src/
│   ├── assets/images/   # Source images, optimized at build time
│   ├── components/      # Astro components
│   ├── content/blog/    # MDX blog posts
│   ├── layouts/         # Layout.astro
│   ├── lib/             # Utilities (posts.ts, cloudinary.ts, clarity.ts, theme.ts)
│   ├── pages/           # Routes
│   │   ├── index.astro          # /
│   │   ├── about.astro          # /about
│   │   ├── blog.astro           # /blog
│   │   ├── contact.astro        # /contact
│   │   ├── 404.astro            # /404
│   │   ├── [slug].astro         # /[slug]
│   │   └── rss.xml.ts           # /rss.xml
│   ├── styles/global.css        # Tailwind theme + custom CSS
│   └── content.config.ts        # Content collection schema
├── astro.config.mjs
├── siteMetadata.ts
├── tsconfig.json
└── wrangler.jsonc
```

---

## 4. Routing and Rendering

Every route sets `export const prerender = true`. The build writes one HTML file per route to `dist/client/`.

| Route | File | Output |
|-------|------|--------|
| `/` | `index.astro` | `index.html` |
| `/about` | `about.astro` | `about.html` |
| `/blog` | `blog.astro` | `blog.html` |
| `/contact` | `contact.astro` | `contact.html` |
| `/404` | `404.astro` | `404.html` |
| `/[slug]` | `[slug].astro` | one file per post |
| `/rss.xml` | `rss.xml.ts` | `rss.xml` |

The `@astrojs/sitemap` integration writes `sitemap-index.xml` and `sitemap-0.xml` at build time. There is no sitemap endpoint in `src/pages`; a request for `/sitemap.xml` returns 301 to `/sitemap-index.xml` from `public/_redirects`.

`build.format: 'file'` makes each route serve at its linked path. A request for `/about` returns `about.html` with status 200. No trailing-slash redirect occurs.

`public/_redirects` holds two edge redirects: `/feed.xml` to `/rss.xml` and `/sitemap.xml` to `/sitemap-index.xml`, both with status 301. A prerendered 3xx endpoint becomes a 200 page, so the redirects live at the edge instead.

`[slug].astro` exports `getStaticPaths()`. It maps `getCollection('blog')` to one path per post. The path uses `post.data.slug || post.id`. The page reads the entry with `getEntry('blog', slug)`. The entry id is the frontmatter slug when the frontmatter sets one.

---

## 5. Component Architecture

All components are `.astro` files with vanilla JS for interactivity. Zero React.

| Component | Type | Purpose |
|-----------|------|---------|
| `Layout.astro` | Layout | SEO meta, ClientRouter (prefetch pinned to hover), font tags, theme init, deferred Clarity loader, shared scripts, the only `<main>` landmark |
| `Header.astro` | Static + JS | Desktop nav + mobile hamburger menu |
| `Logo.astro` | Static | Theme-aware SVG via CSS custom properties |
| `SocialIcons.astro` | Static | Inline SVG icons with click tracking |
| `ThemeToggle.astro` | Static + JS | Light/Dark/System cycle |
| `Copyright.astro` | Static | Dynamic year footer |
| `Button.astro` | Static | Styled `<a>` wrapper |
| `AuthorBlob.astro` | Static | Avatar + author name + date + reading time |
| `BlogPostCard.astro` | Static | Card with hero image, excerpt, read more |

`Layout.astro` owns the single `<main>` element. Pages render into its slot and must not declare their own. `ClientRouter` handles soft navigation, and `astro.config.mjs` pins `prefetchAll: true` with the `hover` strategy, so a touch device on a fast connection does not prefetch. Two soft-navigation costs are tracked: the dark-mode reset after a swap (#209) and missing Clarity page views (#210).

---

## 6. Blog System

Content lives in `src/content/blog/`. The schema is in `src/content.config.ts`:

```typescript
z.object({
  title: z.string(),
  slug: z.string().optional(),
  description: z.string(),
  pubDate: z.coerce.date(),
  updatedDate: z.coerce.date().optional(),
  heroImage: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
})
```

Posts are fetched with `getCollection('blog')` and rendered with `render()` from `astro:content`. Reading time comes from `getReadingTime()` in `src/lib/posts.ts` (200 words per minute). Slugs come from the frontmatter `slug` field. The content entry id supplies the slug when the frontmatter omits it.

---

## 7. Theme System

Vanilla JS in `Layout.astro`. Three states: light, dark, system. State persists in `localStorage`, and the code applies it through the `data-theme` attribute on `<html>`. A blocking `<script is:inline>` in `<head>` prevents a flash of unstyled content.

---

## 8. Styling

Tailwind CSS v4 runs through the `@tailwindcss/vite` Vite plugin. Theme tokens live in the `@theme` block in `src/styles/global.css`. Dark mode uses `[data-theme="dark"]` overrides.

The brand pink `--color-bensonpink` (`#ec2c7c`) is decoration only: white on it measures 4.02:1, below the WCAG AA 4.5:1 threshold for normal text. Text uses `--primary-text` (`#d41c6b`, 5.03:1 with white). The full-bleed About panel uses `--color-bensonpink-deep` (`#d41c6b`) behind white body text. Dark mode maps `--primary-text` to its own accessible pink.

---

## 9. Fonts

The Astro Fonts API downloads fonts at build time and serves them from this domain. `astro.config.mjs` registers four families with `fontProviders.google()`:

| Family | Weights | CSS variable |
|--------|---------|--------------|
| Roboto | 400, 500, 700 | `--astro-font-roboto` |
| Bebas Neue | 400 | `--astro-font-bebas` |
| Bad Script | 400 | `--astro-font-badscript` |
| Dosis | 400 | `--astro-font-dosis` |

`Layout.astro` renders one `<Font>` tag per family and preloads Roboto. `@theme inline` in `global.css` maps the `font-*` utilities to these variables. No third-party font request occurs at run time.

---

## 10. Images

Local images live in `src/assets/images/`. Pages render them with `<Picture>`: AVIF and WebP sources, responsive `widths`, a `sizes` value, and `fallbackFormat="webp"`. The adapter uses `imageService: { build: 'compile' }`, so the build transforms each image once and writes hashed files to `dist/client/_astro/`.

The homepage and blog heroes render `<picture>` elements in `index.astro` and `blog.astro`. Each `<source>` is gated with a `media` query that mirrors the Tailwind breakpoint (`48rem` and `64rem`), and the `<img>` fallback is a transparent pixel, so a hero that CSS hides at a breakpoint never fetches its image bytes. LCP images are eager with `fetchpriority="high"`; post heroes add a preload link.

Remote Cloudinary images pass through `cloudinaryUrl()` in `src/lib/cloudinary.ts`. The helper inserts delivery transforms into the URL. Card heroes use `w_800`, post heroes use `w_1600`, and the author avatar uses `w_96`. The og and Twitter images and the RSS enclosure use `q_auto,w_1200` without `f_auto`, so the declared content type stays correct.

---

## 11. Analytics

Microsoft Clarity loads from `Layout.astro` only when `PUBLIC_CLARITY_TRACKING_ID` is set at build time. The head installs the official queue function, then the tag script loads on the first interaction (`pointerdown`, `touchstart`, `keydown`), or after window load plus a 3 s settle and an idle callback. A window guard keeps the script to one download across ClientRouter soft navigations. Event tracking (nav, social, theme, mobile menu) runs in the Layout script and queues through `window.clarity`. `src/lib/clarity.ts` calls the `window.clarity()` API directly. The Cloudflare Web Analytics beacon is injected by the Cloudflare edge, not by this repository. It stays on for its real-user Core Web Vitals data and is removed in the Cloudflare dashboard, not in code.

---

## 12. SEO

Per-page metadata comes from `Layout.astro` props (`title`, `description`, `ogImage`, `canonicalURL`). Canonical and og URLs strip the `.html` suffix and normalize `/index` to `/`. RSS uses `@astrojs/rss` at `/rss.xml`, with `/feed.xml` redirected at the edge. The `@astrojs/sitemap` integration is the single sitemap source: the build writes `sitemap-index.xml` and `sitemap-0.xml`, and `/sitemap.xml` returns 301 to the index from `public/_redirects`. `robots.txt` lives in `public/` and advertises `https://stbensonimoh.com/sitemap-index.xml`.

---

## 13. Caching

`public/_headers` holds the policy for unhashed assets. `@astrojs/cloudflare` prepends a rule for hashed output.

| Path | Cache-Control |
|------|---------------|
| `/_astro/*` | `public, max-age=31536000, immutable` |
| `/images/*`, `/favicon.svg`, `/favicon.ico`, `/favicon-32.png`, `/apple-touch-icon.png` | `public, max-age=604800, stale-while-revalidate=86400` |
| `/robots.txt` | `public, max-age=86400` |
| HTML, `/rss.xml`, `/sitemap-index.xml`, `/sitemap-0.xml` | `public, max-age=0, must-revalidate` |

Do not add a catch-all `/*` Cache-Control rule. The adapter skips its `/_astro/*` rule when an existing rule matches that path, and matching rules merge headers.

---

## 14. CI/CD

Single workflow (`.github/workflows/ci.yml`):

- `quality` job: lint, type check, test, build, Lighthouse CI, the render-blocking third-party check, and the single-main check (all pushes and PRs)
- `deploy` job: build + `wrangler deploy` (push to main, gated behind quality)

Lighthouse CI runs `bunx lhci autorun` with `ASTRO_PREVIEW_BACKGROUND=1`, a median of 3 runs per page over five pages. It asserts performance (`minScore 0.9`), per-page byte budgets, `unsized-images`, and `color-contrast`; LCP stays a warning. `scripts/check-render-blocking-third-parties.mjs` then fails the job when a render-blocking request comes from a third-party host. `scripts/check-single-main.mjs` scans the built HTML under `dist/client` and fails when a page does not contain exactly one `<main>`. The `landmark-one-main` assertion was removed because Lighthouse 12.6.1 reports the audit as `notApplicable` with a null score when a main is present and as `informative` with a normalised score of 1 when it is missing, and LHCI 0.15.1 reads the numeric score before the display mode, so `minScore: 1` passes either way.

The deploy step uses `cloudflare/wrangler-action@v4`.

---

## 15. Testing

Bun's native test runner. Tests live in `src/lib/`:

- `posts.test.ts`: reading time and slug generation (8 tests)
- `theme.test.ts`: theme store state machine (4 tests)
- `cloudinary.test.ts`: URL transforms and passthrough rules (7 tests)

Run: `bun test`, `bun test --watch`, `bun test --coverage`.

---

## 16. Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `PUBLIC_CLARITY_TRACKING_ID` | Production | Microsoft Clarity tracking ID (build time only) |
| `CLOUDFLARE_API_TOKEN` | Deploy only | Workers edit permission |
| `CLOUDFLARE_ACCOUNT_ID` | Deploy only | Cloudflare account ID |

Set `PUBLIC_CLARITY_TRACKING_ID` in `.env` for local builds. `.env.example` lists all three names.
