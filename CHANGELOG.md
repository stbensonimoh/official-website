# Changelog

## [1.5.3](https://github.com/stbensonimoh/official-website/compare/v1.5.2...v1.5.3) (2026-10-10)


### Performance Improvements

* **images:** size residual images and prioritise LCP images ([#200](https://github.com/stbensonimoh/official-website/issues/200)) ([71ad127](https://github.com/stbensonimoh/official-website/commit/71ad1279060f65e5cf92b088176b67fea73eab56)), closes [#177](https://github.com/stbensonimoh/official-website/issues/177)

## [1.5.2](https://github.com/stbensonimoh/official-website/compare/v1.5.1...v1.5.2) (2026-10-09)


### Performance Improvements

* **cache:** cache unhashed public assets and document the HTML policy ([#196](https://github.com/stbensonimoh/official-website/issues/196)) ([4bc0c54](https://github.com/stbensonimoh/official-website/commit/4bc0c542b564588e8efaeea9bf41a422862741a3)), closes [#178](https://github.com/stbensonimoh/official-website/issues/178)
* **fonts:** self-host web fonts and drop render-blocking Google Fonts ([#192](https://github.com/stbensonimoh/official-website/issues/192)) ([66a6a89](https://github.com/stbensonimoh/official-website/commit/66a6a89dcc090764e4420a26c20057b9e30adaeb)), closes [#176](https://github.com/stbensonimoh/official-website/issues/176)
* **icons:** add a favicon and the cache rules for it ([#199](https://github.com/stbensonimoh/official-website/issues/199)) ([5adfff4](https://github.com/stbensonimoh/official-website/commit/5adfff42d1f59b409cdb6f055c66c553d237fe42)), closes [#180](https://github.com/stbensonimoh/official-website/issues/180)
* **images:** serve remote Cloudinary images at delivery sizes ([#194](https://github.com/stbensonimoh/official-website/issues/194)) ([dff3e3d](https://github.com/stbensonimoh/official-website/commit/dff3e3d921a2d4d02884c99f5d332df8f70faf56))
* **render:** prerender all routes and optimize images at build time ([#195](https://github.com/stbensonimoh/official-website/issues/195)) ([df964d7](https://github.com/stbensonimoh/official-website/commit/df964d704f101dbebbc1a913f62abf170eccba86)), closes [#179](https://github.com/stbensonimoh/official-website/issues/179)

## [1.5.1](https://github.com/stbensonimoh/official-website/compare/v1.5.0...v1.5.1) (2026-09-28)


### Performance Improvements

* **images:** ship local images as optimized AVIF/WebP ([#190](https://github.com/stbensonimoh/official-website/issues/190)) ([4eb9bd4](https://github.com/stbensonimoh/official-website/commit/4eb9bd40b94b12dffc5e10cccef124ee65de4e02)), closes [#173](https://github.com/stbensonimoh/official-website/issues/173)

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
