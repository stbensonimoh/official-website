# Benson Imoh's Personal Website: AI Agent Instructions

An Astro 7.2.4 personal website and blog. The stack is TypeScript, Tailwind CSS v4, and pure Astro components with vanilla JS. The site deploys to Cloudflare Workers.

**Quick start:** `bun install` then `bun run dev` (http://localhost:4321).

## Architecture

### Astro Pages and Routing

- Pages live in `src/pages/`: `index.astro` (/), `about.astro` (/about), `blog.astro` (/blog), `contact.astro` (/contact), `404.astro`, `[slug].astro` (blog posts).
- Blog posts serve at `/[slug]`, not `/blog/[slug]`.
- Endpoint: `rss.xml.ts` (/rss.xml). The `@astrojs/sitemap` integration generates `sitemap-index.xml` and `sitemap-0.xml` at build time; there is no sitemap endpoint in `src/pages`.
- `public/_redirects` holds two 301s: `/feed.xml` to `/rss.xml` and `/sitemap.xml` to `/sitemap-index.xml`.
- SPA navigation uses `<ClientRouter />` from `astro:transitions` in `Layout.astro`. `astro.config.mjs` pins prefetch to all links with the `hover` strategy.
- Every route sets `export const prerender = true`. The build writes one HTML file per route.
- `build.format: 'file'` makes each route serve at its linked path. `/about` returns `about.html` with status 200.
- `[slug].astro` exports `getStaticPaths()` over `getCollection('blog')`. The path uses `post.data.slug || post.id`.

### Content Collections

- Blog posts live in `src/content/blog/` as `.mdx` files.
- The schema is in `src/content.config.ts` and uses the `glob()` loader with Zod.
- Frontmatter: `title`, `slug` (optional, preserves old URLs), `description`, `pubDate`, `updatedDate?`, `heroImage?`, `tags[]`, `draft`.
- Posts come from `getCollection('blog')` or `getEntry('blog', slug)`.
- Posts render through `render(post)` from `astro:content`, which returns the `Content` component.

### Component Architecture

All components are `.astro` files. There is no React. Interactivity uses `is:inline` scripts.

- `Layout.astro`: Root layout: SEO meta, ClientRouter, font tags, theme init (FOUC prevention), deferred Clarity loader, mobile menu and theme toggle scripts, and the only `<main>` landmark. Pages render into its slot and must not add another `<main>`.
- `Header.astro`: Desktop nav and mobile hamburger. The logo sits at top center on mobile.
- `Logo.astro`: Inline SVG that uses `var(--logo-primary)` and `var(--logo-fill)`.
- `SocialIcons.astro`: GitHub, LinkedIn, X, and Instagram inline SVGs.
- `ThemeToggle.astro`: Button with sun, moon, and desktop icons. The script cycles `light → dark → system`.
- `Copyright.astro`: Dynamic `© {year} Benson Imoh,ST`.
- `AuthorBlob.astro`: Avatar (48px circle), name, date, and reading time.
- `BlogPostCard.astro`: Card with hero image, title, AuthorBlob, excerpt, and "Read More..." link.

### Theme System (Vanilla JS)

- Three states: `light`, `dark`, `system`.
- State persists in `localStorage.theme`.
- The code applies the theme through the `data-theme` attribute on `<html>`.
- A blocking `is:inline` script in `<head>` prevents a flash of unstyled content.
- The body script in Layout holds the theme toggle and the system preference listener.
- Logo colors come from `--logo-primary` and `--logo-fill` in `:root` and `[data-theme="dark"]`.

### Fonts

- The Astro Fonts API serves four families from this domain: Roboto (400, 500, 700), Bebas Neue, Bad Script, and Dosis.
- `astro.config.mjs` registers each family with `fontProviders.google()` and a CSS variable. The variables use the `--astro-font-` prefix.
- `Layout.astro` renders one `<Font>` tag per family and preloads Roboto.
- `@theme inline` in `src/styles/global.css` maps the `font-*` utilities to the Astro variables.
- No Google Fonts request occurs at run time.

### Images

- Local source images live in `src/assets/images/`. Pages render them with `<Picture>` and the AVIF and WebP formats.
- `index.astro` and `blog.astro` gate hero `<source>` elements to the Tailwind breakpoints with `media` queries and use a transparent-pixel fallback, so a CSS-hidden hero copy never downloads.
- The adapter uses `imageService: { build: 'compile' }`. The build transforms each image once and writes hashed files to `dist/client/_astro/`.
- Remote Cloudinary URLs pass through `cloudinaryUrl()` in `src/lib/cloudinary.ts`.
- The helper requires the exact host `res.cloudinary.com`. It inserts the transforms into the path.

### Tailwind CSS v4

- Vite plugin: `@tailwindcss/vite` in `astro.config.mjs`.
- Theme tokens live in the `@theme` block in `src/styles/global.css`.
- Custom colors: `--color-bensonpink`, `--color-bensonblack`, `--color-bensongrey`.
- Text uses `--primary-text` (`#d41c6b`, 5.03:1 with white); `--color-bensonpink` is decoration only. `--color-bensonpink-deep` (`#d41c6b`) backs the About panel's white body text.
- Dark mode uses `[data-theme="dark"]` CSS variable overrides.
- Typography plugin: `@plugin "@tailwindcss/typography"`.

### Analytics (Microsoft Clarity)

- `Layout.astro` installs Clarity's queue function inline in the head, and the script renders only when `import.meta.env.PUBLIC_CLARITY_TRACKING_ID` is set.
- The tag script itself loads on the first interaction, or after window load plus a 3 s settle and an idle callback. A window guard keeps it to one download across soft navigations.
- `src/lib/clarity.ts` wraps the `window.clarity()` API. It adds no npm dependency.
- The Layout body script tracks nav clicks, social clicks, theme changes, and mobile menu events.
- The Cloudflare Web Analytics beacon is injected by the Cloudflare edge, not by this repository. It is kept for real-user Core Web Vitals data; removing it means turning Web Analytics off in the Cloudflare dashboard.

### SEO and Feeds

- Per-page meta comes from `Layout.astro` props: `title`, `description`, `ogImage`, `canonicalURL`.
- The OG and Twitter cards come from the props and `siteMetadata.ts`.
- Canonical and og URLs strip the `.html` suffix and normalize `/index` to `/`.
- RSS uses `@astrojs/rss` at `/rss.xml`. `public/_redirects` sends `/feed.xml` to `/rss.xml`.
- The `@astrojs/sitemap` integration is the only sitemap source. It writes `sitemap-index.xml` and `sitemap-0.xml`; `public/_redirects` sends `/sitemap.xml` to `/sitemap-index.xml` with a 301.
- `robots.txt` lives in `public/`.
- `site: 'https://stbensonimoh.com'` is set in `astro.config.mjs`.

## Build and Deploy

- **Build:** `bun run build` writes to `dist/` (client and server).
- **Deploy:** `wrangler deploy` (Workers, not Pages) through GitHub Actions.
- **Adapter:** `@astrojs/cloudflare` 14.2.3 with `output: 'server'`, `imageService: { build: 'compile' }`, and `session: false`.
- **Bindings:** `ASSETS` only. The build does not provision `SESSION` or `IMAGES`.
- **CI:** `.github/workflows/ci.yml` runs `quality` (lint, check, test, build, Lighthouse CI, render-blocking third-party check) and then `deploy` (main only, gated by quality). The deploy step uses `wrangler-action@v4`.

## Testing

Bun's native test runner (`bun:test`):

- `src/lib/posts.test.ts`: `getReadingTime()` and `createSlug()` (8 tests)
- `src/lib/theme.test.ts`: `themeStore` state machine (4 tests)
- `src/lib/cloudinary.test.ts`: URL transforms and passthrough rules (7 tests)

## Conventions

- **Commits:** Conventional Commits format (`feat:`, `fix:`, `ci:`, and so on).
- **Imports:** `siteMetadata` from `../../siteMetadata` (root-level file).
- **Components:** Import from `../components/ComponentName.astro`.
- **Utilities:** Import from `../lib/moduleName`.
- **Content:** Import from `astro:content` (`getCollection`, `getEntry`, `render`).
- **No React:** Zero framework components. All interactivity uses vanilla JS in `is:inline` scripts.
- **Scripts:** Use `is:inline` for DOM manipulation scripts. Use `data-astro-rerun` for scripts that must re-execute on SPA navigation.

## Common Pitfalls

1. Blog post URLs are at `/[slug]`, not `/blog/[slug]`.
2. Every route needs `export const prerender = true`. A missing flag makes that route run on demand.
3. `PUBLIC_CLARITY_TRACKING_ID` must be set during the build for Clarity to embed. The local `.env` file must use the `PUBLIC_` prefix.
4. `siteMetadata` is at the repo root. Import it with the relative path `../../siteMetadata`.
5. The content collection uses the `glob()` loader and a Zod schema in `src/content.config.ts`.
6. The theme is vanilla JS. It uses the `data-theme` attribute on `<html>` and `localStorage.theme`.
7. Scripts need `data-astro-rerun` to re-execute on SPA navigation.
8. Tailwind v4 uses the `@tailwindcss/vite` plugin, not `@astrojs/tailwind`.
9. `wrangler deploy` deploys to Workers, not `wrangler pages deploy`.
10. Do not add a catch-all `/*` Cache-Control rule to `public/_headers`. It removes the immutable rule for `/_astro/*`.
11. The `bun run preview` command uses `astro preview`. It runs in the foreground unless you add `--background` or Astro detects an agent. Stop a detached server with `bunx astro preview stop`.

## Documentation

- `TECHNICAL_SPEC.md`: the current architecture and behavior.
- `docs/adr/0001-performance-and-caching.md`: why the rendering, image, font, cache, sitemap, landmark, contrast, analytics, and router decisions are what they are, with their costs.
- `docs/audits/2026-09-25-performance.md`: the measured baseline that drove the performance batch.

## Quick Commands

```bash
bun run dev         # http://localhost:4321
bun run build       # Production build
bun test            # Run tests
bun astro check     # TypeScript check
bun run preview     # Build and serve through the Workers runtime
bun run deploy      # Build and deploy to Workers
```
