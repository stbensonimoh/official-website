# Changelog

## [1.5.0](https://github.com/stbensonimoh/official-website/compare/v1.4.5...v1.5.0) (2026-08-21)


### Features

* upgrade astro to 7 with coordinated integration bumps ([#164](https://github.com/stbensonimoh/official-website/issues/164)) ([539331d](https://github.com/stbensonimoh/official-website/commit/539331d503e198367eafb07ad7dc1a094b2a32a9))

## [1.4.5](https://github.com/stbensonimoh/official-website/compare/v1.4.4...v1.4.5) (2026-05-21)


### Bug Fixes

* remove environment restriction from deploy job ([982bc2a](https://github.com/stbensonimoh/official-website/commit/982bc2a40d28e793a4c28ff6502565d3547ec599))

## [2.0.0](https://github.com/stbensonimoh/official-website) (2026-05-21)

### BREAKING CHANGES

* migrate from Next.js to Astro 6 with Cloudflare Workers deployment

### Features

* **framework:** replace Next.js/React with Astro 6 + vanilla JS
* **routing:** SPA client-side navigation via `<ClientRouter />`
* **content:** Astro Content Collections replace gray-matter pipeline
* **blog:** `getReadingTime()` and `createSlug()` reimplemented natively
* **components:** 8 Astro components (Header, Logo, SocialIcons, ThemeToggle, etc.)
* **theme:** vanilla JS theme store with FOUC prevention
* **seo:** `@astrojs/rss` and `@astrojs/sitemap` replace next-seo/sitemap.ts
* **analytics:** Clarity via inline script (no npm dependency)
* **deploy:** consolidated CI + deploy workflow gated behind quality checks
* **deps:** removed react, react-dom, react-icons, react-markdown, gray-matter, reading-time, slugify, sweetalert2, next-seo, @microsoft/clarity, @opennextjs/cloudflare, eslint-config-next (13 packages removed)

## [1.4.4](https://github.com/stbensonimoh/official-website/compare/v1.4.3...v1.4.4) (2026-05-05)

### Bug Fixes

* correct Open Graph URL and Twitter metadata on blog index page
* upgrade @opennextjs/cloudflare to 1.19.6 for Next.js 16.2 compatibility

(Previous releases omitted for brevity — see git history)
