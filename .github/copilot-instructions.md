# Benson Imoh's Personal Website — AI Agent Instructions

An Astro 6 personal website/blog built with TypeScript and Tailwind CSS v4. Pure Astro components + vanilla JS. Deployed on Cloudflare Workers.

**Quick Start:** `bun install` → `bun run dev` (http://localhost:4321)

## Architecture

### Astro Pages & Routing

- Pages in `src/pages/`: `index.astro` (/), `about.astro` (/about), `blog.astro` (/blog), `contact.astro` (/contact), `404.astro`, `[slug].astro` (dynamic blog posts)
- Blog posts at `/[slug]` (root-level, not `/blog/[slug]`)
- SEO endpoints: `rss.xml.ts` (/rss.xml), `feed.xml.ts` (301 → /rss.xml), `sitemap.xml.ts` (/sitemap.xml)
- Client-side SPA navigation via `<ClientRouter />` from `astro:transitions` in Layout.astro
- All pages use on-demand rendering (`output: 'server'`, `prerender = false`)

### Content Collections

- Blog posts in `src/content/blog/` as `.mdx` files
- Schema in `src/content.config.ts` using `glob()` loader + Zod
- Frontmatter: `title`, `slug` (optional, preserves old URLs), `description`, `pubDate`, `updatedDate?`, `heroImage?`, `tags[]`, `draft`
- Posts fetched via `getCollection('blog')` or `getEntry('blog', slug)`
- Rendered via `render(post)` from `astro:content` — returns `{ Content }` component

### Component Architecture

All components are `.astro` files (no React). JS interactivity via `is:inline` scripts.

- `Layout.astro` — Root layout: SEO meta, ClientRouter, theme init (FOUC prevention), Clarity script, mobile menu + theme toggle scripts
- `Header.astro` — Desktop nav + mobile hamburger. Logo at top center on mobile
- `Logo.astro` — Inline SVG using `var(--logo-primary)` and `var(--logo-fill)` (theme-aware)
- `SocialIcons.astro` — GitHub, LinkedIn, X, Instagram inline SVGs
- `ThemeToggle.astro` — Button with sun/moon/desktop icons. JS cycles `light → dark → system`
- `Copyright.astro` — Dynamic `© {year} Benson Imoh,ST`
- `AuthorBlob.astro` — Avatar (48px circle) + name + date + reading time
- `BlogPostCard.astro` — Card with hero image, title, AuthorBlob, excerpt, "Read More..." link

### Theme System (Vanilla JS)

- Three states: `light`, `dark`, `system`
- Persisted in `localStorage.theme`
- Applied via `data-theme` attribute on `<html>`
- FOUC prevented by blocking `is:inline` script in `<head>` (runs before first paint)
- Theme toggle + system preference listener in Layout body script
- Logo colors via CSS: `--logo-primary` and `--logo-fill` set in `:root` / `[data-theme="dark"]`

### Tailwind CSS v4

- Vite plugin: `@tailwindcss/vite` in `astro.config.mjs`
- Theme tokens in `@theme` block in `src/styles/global.css`
- Fonts: Google Fonts `@import` — Roboto (5 weights), Bebas Neue, Bad Script, Dosis, Roboto Slab
- Custom colors: `--color-bensonpink`, `--color-bensonblack`, `--color-bensongrey`
- Dark mode via `[data-theme="dark"]` CSS variable overrides
- Typography plugin: `@plugin "@tailwindcss/typography"`

### Analytics (Microsoft Clarity)

- Loaded via inline `<script>` in Layout.astro `head`
- Conditional: only renders when `import.meta.env.PUBLIC_CLARITY_TRACKING_ID` is set
- `src/lib/clarity.ts` — wrapper functions using `window.clarity()` API (no npm dependency)
- Event tracking in Layout body script: nav clicks, social clicks, theme changes, mobile menu

### SEO & Feeds

- Per-page meta via `Layout.astro` props: `title`, `description`, `ogImage`, `canonicalURL`
- OG and Twitter cards auto-generated from props + `siteMetadata.ts`
- RSS: `@astrojs/rss` at `/rss.xml` with `/feed.xml` 301 redirect
- Sitemap: custom endpoint at `/sitemap.xml` (4 static + N blog posts)
- `robots.txt` in `public/`
- `site: 'https://stbensonimoh.com'` in `astro.config.mjs`

## Build & Deploy

- **Build:** `bun run build` → outputs to `dist/` (server + client)
- **Deploy:** `wrangler deploy` (Workers, not Pages) via GitHub Actions
- **Adapter:** `@astrojs/cloudflare` with `output: 'server'`
- **Bindings:** SESSION (KV), IMAGES, ASSETS (auto-provisioned)
- **CI:** `.github/workflows/ci.yml` — quality (lint, check, test, build) → deploy (main only, gated by quality)

## Testing

Bun's native test runner (`bun:test`):
- `src/lib/posts.test.ts` — `getReadingTime()` and `createSlug()` (8 tests)
- `src/lib/theme.test.ts` — `themeStore` state machine (4 tests)

## Conventions

- **Commits:** Conventional Commits format (`feat:`, `fix:`, `ci:`, etc.)
- **Imports:** `siteMetadata` from `../../siteMetadata` (root-level file)
- **Components:** Import from `../components/ComponentName.astro`
- **Utilities:** Import from `../lib/moduleName`
- **Content:** Import from `astro:content` (getCollection, getEntry, render)
- **No React:** Zero framework components. All interactivity via vanilla JS in `astro:inline` scripts
- **Scripts:** Use `is:inline` for DOM manipulation scripts, `data-astro-rerun` for scripts that must re-execute on SPA navigation

## Common Pitfalls

1. Blog post URLs are at `/[slug]`, not `/blog/[slug]`
2. `PUBLIC_CLARITY_TRACKING_ID` must be set during build for Clarity to embed
3. `siteMetadata` is at repo root, import with relative path `../../siteMetadata`
4. Content collection uses `glob()` loader + `zod` schema in `src/content.config.ts`
5. Theme is vanilla JS — `data-theme` attribute on `<html>`, `localStorage.theme`
6. Scripts need `data-astro-rerun` to re-execute on SPA navigation
7. Tailwind v4 uses `@tailwindcss/vite` plugin, NOT `@astrojs/tailwind`
8. `wrangler deploy` deploys to Workers, NOT `wrangler pages deploy`

## Quick Commands

```bash
bun run dev         # http://localhost:4321
bun run build       # Production build
bun test            # Run tests
bun astro check     # TypeScript check
bun run deploy      # Build + deploy to Workers
```
