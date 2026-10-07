# Benson Imoh's Personal Website: AI Agent Instructions

An Astro 7.2.4 personal website and blog. The stack is TypeScript, Tailwind CSS v4, and pure Astro components with vanilla JS. The site deploys to Cloudflare Workers.

**Quick start:** `bun install` then `bun run dev` (http://localhost:4321).

## Architecture

### Astro Pages and Routing

- Pages live in `src/pages/`: `index.astro` (/), `about.astro` (/about), `blog.astro` (/blog), `contact.astro` (/contact), `404.astro`, `[slug].astro` (blog posts).
- Blog posts serve at `/[slug]`, not `/blog/[slug]`.
- Endpoints: `rss.xml.ts` (/rss.xml) and `sitemap.xml.ts` (/sitemap.xml).
- The `/feed.xml` redirect lives in `public/_redirects`. It returns 301 to `/rss.xml`.
- SPA navigation uses `<ClientRouter />` from `astro:transitions` in `Layout.astro`.
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

- `Layout.astro`: Root layout: SEO meta, ClientRouter, font tags, theme init (FOUC prevention), Clarity script, mobile menu and theme toggle scripts.
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
- The adapter uses `imageService: { build: 'compile' }`. The build transforms each image once and writes hashed files to `dist/client/_astro/`.
- Remote Cloudinary URLs pass through `cloudinaryUrl()` in `src/lib/cloudinary.ts`.
- The helper requires the exact host `res.cloudinary.com`. It inserts the transforms into the path.

### Tailwind CSS v4

- Vite plugin: `@tailwindcss/vite` in `astro.config.mjs`.
- Theme tokens live in the `@theme` block in `src/styles/global.css`.
- Custom colors: `--color-bensonpink`, `--color-bensonblack`, `--color-bensongrey`.
- Dark mode uses `[data-theme="dark"]` CSS variable overrides.
- Typography plugin: `@plugin "@tailwindcss/typography"`.

### Analytics (Microsoft Clarity)

- Loads through an inline `<script>` in the `Layout.astro` head.
- The script renders only when `import.meta.env.PUBLIC_CLARITY_TRACKING_ID` is set.
- `src/lib/clarity.ts` wraps the `window.clarity()` API. It adds no npm dependency.
- The Layout body script tracks nav clicks, social clicks, theme changes, and mobile menu events.

### SEO and Feeds

- Per-page meta comes from `Layout.astro` props: `title`, `description`, `ogImage`, `canonicalURL`.
- The OG and Twitter cards come from the props and `siteMetadata.ts`.
- Canonical and og URLs strip the `.html` suffix and normalize `/index` to `/`.
- RSS uses `@astrojs/rss` at `/rss.xml`. `public/_redirects` sends `/feed.xml` to `/rss.xml`.
- The sitemap endpoint writes `/sitemap.xml`. The `@astrojs/sitemap` integration writes `sitemap-index.xml`.
- `robots.txt` lives in `public/`.
- `site: 'https://stbensonimoh.com'` is set in `astro.config.mjs`.

## Build and Deploy

- **Build:** `bun run build` writes to `dist/` (client and server).
- **Deploy:** `wrangler deploy` (Workers, not Pages) through GitHub Actions.
- **Adapter:** `@astrojs/cloudflare` 14.2.3 with `output: 'server'`, `imageService: { build: 'compile' }`, and `session: false`.
- **Bindings:** `ASSETS` only. The build does not provision `SESSION` or `IMAGES`.
- **CI:** `.github/workflows/ci.yml` runs `quality` (lint, check, test, build) and then `deploy` (main only, gated by quality). The deploy step uses `wrangler-action@v4`.

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

## Quick Commands

```bash
bun run dev         # http://localhost:4321
bun run build       # Production build
bun test            # Run tests
bun astro check     # TypeScript check
bun run preview     # Build and serve through the Workers runtime
bun run deploy      # Build and deploy to Workers
```
