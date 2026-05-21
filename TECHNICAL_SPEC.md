# Technical Specification: `stbensonimoh.com` — Official Website

**Version:** 2.0.0 | **Date:** 2026-05-21 | **Framework:** Astro 6

---

## 1. System Overview

Personal website and blog of Benson Imoh, ST. Deployed on Cloudflare Workers via `@astrojs/cloudflare` adapter. Primary functions: professional identity, technical blog, SEO discoverability, behavioral analytics.

---

## 2. Technology Stack

| Concern | Technology |
|---------|-----------|
| Framework | Astro 6 (`output: 'server'`) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + `@tailwindcss/vite` |
| Content | MDX via `@astrojs/mdx` |
| Deployment | Cloudflare Workers via `@astrojs/cloudflare` |
| Testing | Bun Test |
| Package Manager | Bun |

---

## 3. Repository Structure

```
├── .github/workflows/ci.yml
├── public/              # Static assets
│   ├── images/
│   └── robots.txt
├── src/
│   ├── components/      # Astro components
│   ├── content/blog/    # MDX blog posts
│   ├── layouts/         # Layout.astro
│   ├── lib/             # Utilities (posts.ts, clarity.ts, theme.ts)
│   ├── pages/           # Routes
│   │   ├── index.astro          # /
│   │   ├── about.astro          # /about
│   │   ├── blog.astro           # /blog
│   │   ├── contact.astro        # /contact
│   │   ├── 404.astro            # /404
│   │   ├── [slug].astro         # /[slug]
│   │   ├── rss.xml.ts           # /rss.xml
│   │   ├── feed.xml.ts          # /feed.xml → 301 /rss.xml
│   │   └── sitemap.xml.ts       # /sitemap.xml
│   ├── styles/global.css        # Tailwind theme + custom CSS
│   └── content.config.ts        # Content collection schema
├── astro.config.mjs
├── siteMetadata.ts
├── tsconfig.json
└── wrangler.jsonc
```

---

## 4. Routing & Pages

| Route | File | Rendering |
|-------|------|-----------|
| `/` | `index.astro` | Server (on-demand) |
| `/about` | `about.astro` | Server |
| `/blog` | `blog.astro` | Server |
| `/contact` | `contact.astro` | Server |
| `/404` | `404.astro` | Server |
| `/[slug]` | `[slug].astro` | Server (on-demand) |
| `/rss.xml` | `rss.xml.ts` | Endpoint |
| `/feed.xml` | `feed.xml.ts` | 301 Redirect |
| `/sitemap.xml` | `sitemap.xml.ts` | Endpoint |

Blog posts use `getEntry('blog', slug)` for on-demand rendering. URLs preserved via frontmatter `slug` field.

---

## 5. Component Architecture

All components are `.astro` files with vanilla JS for interactivity. Zero React.

| Component | Type | Purpose |
|-----------|------|---------|
| `Layout.astro` | Layout | SEO meta, ClientRouter, theme init, Clarity, shared scripts |
| `Header.astro` | Static + JS | Desktop nav + mobile hamburger menu |
| `Logo.astro` | Static | Theme-aware SVG via CSS custom properties |
| `SocialIcons.astro` | Static | Inline SVG icons with click tracking |
| `ThemeToggle.astro` | Static + JS | Light/Dark/System cycle |
| `Copyright.astro` | Static | Dynamic year footer |
| `Button.astro` | Static | Styled `<a>` wrapper |
| `AuthorBlob.astro` | Static | Avatar + author name + date + reading time |
| `BlogPostCard.astro` | Static | Card with hero image, excerpt, read more |

---

## 6. Blog System

Content in `src/content/blog/`. Schema in `src/content.config.ts`:

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

Posts fetched via `getCollection('blog')` and rendered with `render()` from `astro:content`. Reading time via `getReadingTime()` in `src/lib/posts.ts` (200 WPM). Slugs via `createSlug()` or frontmatter override.

---

## 7. Theme System

Vanilla JS in Layout.astro. Three states: light, dark, system. Persisted via `localStorage`, applied via `data-theme` attribute on `<html>`. FOUC prevented by blocking `<script is:inline>` in `<head>`.

---

## 8. Styling

Tailwind CSS v4 via `@tailwindcss/vite` Vite plugin. Theme tokens in `@theme` block. Dark mode via `[data-theme="dark"]` CSS overrides.

---

## 9. Analytics

Microsoft Clarity loaded via inline `<script>` in Layout.astro. Conditional on `PUBLIC_CLARITY_TRACKING_ID`. Event tracking (nav, social, theme, mobile menu) via Layout script. `src/lib/clarity.ts` uses `window.clarity()` API directly.

---

## 10. SEO

Per-page metadata via `Layout.astro` props (`title`, `description`, `ogImage`, `canonicalURL`). RSS via `@astrojs/rss` at `/rss.xml` with `/feed.xml` redirect. Sitemap via custom endpoint at `/sitemap.xml`. `robots.txt` in `public/`.

---

## 11. CI/CD

Single workflow (`.github/workflows/ci.yml`):
- `quality` job: lint, typecheck, test, build (all pushes and PRs)
- `deploy` job: build + `wrangler deploy` (push to main, gated behind quality)

---

## 12. Testing

Bun's native test runner. Tests in `src/lib/`:
- `posts.test.ts` — reading time and slug generation (8 tests)
- `theme.test.ts` — theme store state machine (4 tests)

Run: `bun test`, `bun test --watch`, `bun test --coverage`

---

## 13. Environment Variables

| Variable | Required | Purpose |
|----------|----------|---------|
| `PUBLIC_CLARITY_TRACKING_ID` | Production | Microsoft Clarity tracking ID |
