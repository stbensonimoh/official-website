# Performance Audit: stbensonimoh.com

**Date:** 2026-09-25
**Site:** https://stbensonimoh.com
**Repository:** stbensonimoh/official-website
**Framework:** Astro 7.2.4 + `@astrojs/cloudflare` 14.2.3
**Auditor method:** production build served via `wrangler dev` (workerd), Lighthouse 13.5 CLI, live cross-check.

---

## 1. Executive summary

The site is slow on mobile for one dominant reason: **images**. The homepage hero is a 2.03 MB, 3000x3000 PNG rendered into a 412x412 box. It is 98% of the homepage payload. Every image on the site is served unoptimized from `public/`, several are 1.5 to 2 MB, and remote Cloudinary heroes are delivered at full size.

The second reason is **render-blocking Google Fonts**. A CSS `@import` forces a serial round trip to `fonts.googleapis.com`, delaying first paint by roughly 1.1 seconds, and the site loads a font family it never uses.

JavaScript is not a problem. Total blocking time is 0 ms on every page and layout shift is ~0. The work is payload reduction, the critical path, and caching, not code splitting.

### Measured baseline (local production build)

| View | Page | Perf | LCP | Bytes | Image savings flagged | Render-blocking |
|---|---|---|---|---|---|---|
| mobile | home | 66 | 12.5s | 2,071 KB | 2,002 KB | 2,490 ms |
| mobile | about | 62 | 10.4s | 1,564 KB | 1,464 KB | 3,760 ms |
| mobile | blog | 67 | 25.4s | 4,555 KB | 2,430 KB | 1,460 ms |
| mobile | contact | 83 | 3.5s | 89 KB | none | 2,740 ms |
| mobile | post | 80 | 5.1s | 526 KB | 141 KB | 1,110 ms |
| tablet | home / about / blog / contact / post | 73 / 74 / 74 / 98 / 80 | 1.9s to 11.7s | same as mobile | same | 1,100 ms |
| desktop | home / about / blog / contact / post | 87 / 92 / 88 / 99 / 91 | 0.8s to 2.2s | same as mobile | same | 580 to 740 ms |

### Live production cross-check

| View | Perf | LCP | Bytes | Third parties |
|---|---|---|---|---|
| mobile | 70 | 13.0s | 2,116 KB | Clarity 28 KB, Cloudflare beacon 10 KB, Google Fonts 20 KB |
| desktop | 79 | 3.2s | 2,185 KB | Google Fonts 91 KB, Clarity 28 KB, Cloudflare beacon 10 KB |

---

## 2. Test method and environment

- `node_modules` was out of sync with `bun.lock`: it had Astro 6.3.5 and adapter 13.5.2 while the lockfile pins Astro 7.2.4 and adapter 14.2.3. I ran `bun install` to sync before testing.
- Production build: `bun run build`.
- Served the real Worker locally: `bunx wrangler dev --port 8788` (workerd runtime).
- Lighthouse 13.5 CLI, categories: performance, accessibility, best-practices, SEO.
- Pages: `/`, `/about`, `/blog`, `/contact`, `/hello-world-i-finally-beat-procrastination`.
- Views:
  - mobile: Lighthouse default (412x823, Slow 4G, 4x CPU)
  - tablet: mobile form factor, 768x1024 @2x
  - desktop: `--preset=desktop`
- Local builds omit Microsoft Clarity because `.env` defines `NEXT_PUBLIC_CLARITY_TRACKING_ID` while `Layout.astro` reads `PUBLIC_CLARITY_TRACKING_ID`. CI sets the `PUBLIC_` name, so production loads Clarity. The live run captured its real cost.

---

## 3. Findings

### 3.1 Images (critical)

Evidence:
- `public/images/front-image.png`: 3000x3000, 2.03 MB, displayed at 412x412. 98% of homepage bytes.
- `public/images/blog-header-image.png`: 3000x3000, 2.03 MB, marked `hidden lg:block`, yet mobile downloads it anyway (confirmed on the wire in a single clean run).
- `public/images/about-page-picture.png`: 1500x1801, 1.49 MB.
- Cloudinary heroes untransformed: `good-bye.jpg` 2.05 MB, hello-world hero 311 KB.
- Avatar `sq_xmnmhb.jpg`: 146 KB rendered at 48 px.
- Images live in `public/`, so Astro never optimizes them.
- Missing `width`/`height`: `unsized-images` fails in 13 of 15 runs.
- LCP image is not discoverable or preloaded: `lcp-discovery-insight` = 0 in 11 of 15 runs.

Measured optimization potential (sharp, against the real files):

| Image | Current | 800w WebP / AVIF | 1600w WebP / AVIF |
|---|---|---|---|
| front-image.png | 2,030 KB | 41 / 18 KB | 113 / 44 KB |
| about-page-picture.png | 1,485 KB | 119 / 50 KB | 220 / 81 KB |
| blog-header-image.png | 2,028 KB | 38 / 16 KB | 108 / 42 KB |
| 404.png | 76 KB | 12 / 7 KB | n/a |

Cloudinary: adding `f_auto,q_auto,w_1600` takes `good-bye.jpg` from 2,049 KB to 291 KB (less again with modern format negotiation). The avatar drops to a few KB at `w_96`.

Projected result: home ~2,116 KB to ~130-180 KB; blog ~4,555 KB to ~300-500 KB; about and post to ~150 KB each.

### 3.2 Render-blocking Google Fonts (high)

Evidence:
- `src/styles/global.css` line 1 is `@import url('https://fonts.googleapis.com/css2?family=Bad+Script&family=Bebas+Neue&family=Dosis:wght@400&family=Roboto+Slab:wght@400&family=Roboto:wght@100;300;400;500;700&display=swap')`.
- This compiles into the 35 KB `Layout.css`, forcing a serial second request to `fonts.googleapis.com` before text can render.
- Lighthouse render-blocking insight attributes roughly 1,156 ms to the Google Fonts request alone.
- Five families, nine Latin faces, ~122 KB of woff2: badscript 34.7 KB, bebasneue 13.8 KB, dosis 16.6 KB, roboto 43.1 KB, robotoslab 14.0 KB.
- **Roboto Slab is used zero times.**
- Roboto is loaded at weights 100, 300, 400, 500, 700; the low weights are unused.
- Live desktop: Google Fonts third-party transfer was 91 KB.
- No `preconnect` to `fonts.gstatic.com` and no font `preload`.

### 3.3 Missing size hints (moderate)

Only `404.png` has width/height. Everything else omits dimensions, causing the `unsized-images` failure and keeping CLS from being provably stable.

### 3.4 Caching (moderate)

- Adapter 14 injects `_headers` giving `/_astro/*` `Cache-Control: public, max-age=31536000, immutable`. Confirmed working.
- Public assets get Cloudflare's default `public, max-age=0, must-revalidate`, so `/images/*` is not cached at the edge (`cf-cache-status: MISS` confirmed on live files).
- The SSR HTML has no cache header.

### 3.5 Architecture: SSR for fully static content (moderate)

- `astro.config.mjs` sets `output: 'server'` and `[slug].astro` sets `prerender = false`.
- Honest measurement: live TTFB for the HTML (~0.6 s) matched a static asset (~0.6 s), so prerendering is not a latency silver bullet.
- The real gains: images can be transformed once at build time with `imageService: { build: 'compile' }` (currently the default `cloudflare-binding` transforms at request time through the Cloudflare Images binding, which costs money and adds latency), and HTML becomes edge-cacheable.
- No server-side features are used. `SESSION` KV and `IMAGES` bindings are provisioned but unnecessary.

### 3.6 JavaScript and third parties (low)

- ClientRouter (view transitions): 16.3 KB raw, ~5 KB brotli. The only real client JS.
- Clarity: 726 B loader plus a 28 KB runtime. Deferred.
- Cloudflare beacon: 10 KB.
- TBT is 0 ms everywhere, so none of this currently costs score.

### 3.7 Accessibility (from Lighthouse, low but real)

- `landmark-one-main` fails in 12 of 15 runs (no `<main>` on most pages).
- Color contrast failures in 5 runs.

### 3.8 Hygiene and drift

- **No favicon.** `favicon.ico` 404s on every page, the only console error in 14 of 15 runs.
- Dead assets shipped: `public/images/blog-header1.png` (1.1 MB, referenced nowhere), `public/logo.svg`, `public/logo-white.svg`, `public/images/front-image.svg`.
- Two sitemaps generated: custom `/sitemap.xml` endpoint and `@astrojs/sitemap`.
- Dependencies/docs drift: README, TECHNICAL_SPEC, and `docs/deployment.md` say "Astro 6"; lockfile is Astro 7.2.4. `docs/deployment.md` references `wrangler-action@v3` while `ci.yml` uses v4.
- `bun run preview` runs `wrangler pages dev`, but adapter v14 removed Cloudflare Pages support. Use `astro preview`.
- `astro check` reports 1 hint: the inline `set:html` script in `Layout.astro` should be marked `is:inline`.

---

## 4. Remediation plan

### Phase 0: quick wins (hours)

1. Add a favicon and a `<link rel="icon">`.
2. Add `public/_headers` for unhashed public assets, for example:
   ```txt
   /images/*
     Cache-Control: public, max-age=604800, stale-while-revalidate=86400
   ```
3. Remove dead assets (`blog-header1.png`, `logo.svg`, `logo-white.svg`, `front-image.svg`).
4. Remove the Roboto Slab request and unused Roboto weights.

### Phase 1: images (the big one)

1. Move `public/images/*` into `src/assets/images/`.
2. Adopt `<Picture>` / `<Image>` with `formats={["avif","webp"]}`, `widths`, `sizes`, `width`/`height`, `decoding="async"`, and `loading="lazy"` below the fold.
3. Mark the LCP image `loading="eager"` and `fetchpriority="high"`.
4. Render the homepage hero once with a responsive layout instead of two copies, or lazy-load the hidden copy.
5. Lazy-load the blog header so the mobile-hidden copy is never fetched.
6. Add Cloudinary transforms (`f_auto,q_auto,dpr_auto,w_1600`; `w_96` for the avatar), or configure `image.domains` / `image.remotePatterns` and route them through `<Image>`.

### Phase 2: fonts

1. Replace the CSS `@import` with the Astro Fonts API (`fontProviders.google()`), declaring only the weights actually used, `subsets: ["latin"]`, and optimized fallbacks.
2. Add `<Font cssVariable="--font-roboto" preload />` (and the other families) in the layout head.
3. Register the font variables in Tailwind's `@theme`.
4. Remove Roboto Slab entirely.

### Phase 3: prerender and caching

1. Make content routes static (`output: 'static'`, or keep server mode and set `prerender = true`).
2. Set `imageService: { build: 'compile' }` so images are optimized at build time.
3. Remove unused `SESSION` / `IMAGES` bindings where possible (`session: false`).
4. Consider a cache header for HTML.

### Phase 4: polish and guardrails

1. Evaluate whether ClientRouter is worth ~5 KB brotli; keep it and add `prefetch` for nav, or drop it.
2. Defer Clarity until after interaction or a timeout.
3. Fix the `<main>` landmark and contrast issues.
4. Remove the duplicate sitemap.
5. Update README, TECHNICAL_SPEC, DEPLOY, and `docs/deployment.md` to Astro 7, `wrangler-action@v4`, and `astro preview`. Add a performance ADR.
6. Add Lighthouse CI budgets to the quality gate: mobile Performance >= 90, LCP < 2.5 s, page weight < 300 KB, no render-blocking third-party requests.

---

## 5. Verification

- Re-run Lighthouse for 5 pages x 3 views after each phase.
- Assert budgets in CI so regressions fail the build.
- Verify on a throttled mobile profile, since that is where the images dominate.

---

## 6. Appendix

### Commands used

```bash
bun install
bun run build
bunx wrangler dev --port 8788 --ip 127.0.0.1
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  bunx lighthouse http://127.0.0.1:8788/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output-path=./report --chrome-flags="--headless=new"
```

### Key header observations

| Path | Cache-Control |
|---|---|
| `/_astro/*` | `public, max-age=31536000, immutable` |
| `/images/*` | `public, max-age=0, must-revalidate` |
| `/` (HTML) | none (SSR) |

### Font weights and usage

| Family | Loaded | Used in source |
|---|---|---|
| Roboto | 100, 300, 400, 500, 700 | yes (400, 500, 700 meaningful) |
| Bebas Neue | 400 | yes (1 use) |
| Bad Script | 400 | yes (1 use) |
| Dosis | 400 | yes (7 uses) |
| Roboto Slab | 400 | **zero uses** |

---

*This audit was produced by static analysis of the repository, a production build, Lighthouse 13.5 across three viewports, and a live production cross-check. No source files were modified.*
