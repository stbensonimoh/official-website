# Changelog

## [1.4.3](https://github.com/stbensonimoh/official-website/compare/v1.4.2...v1.4.3) (2026-04-07)


### Bug Fixes

* **ci:** add explicit permissions block to workflow ([769658c](https://github.com/stbensonimoh/official-website/commit/769658c9317b26337e6028f5fd530ec5e6001f37))
* **ci:** use bun run to execute opennextjs-cloudflare ([2dbb8a6](https://github.com/stbensonimoh/official-website/commit/2dbb8a665739a4f430fed133b901b2ccfffe1def))
* **ci:** use bun run to execute opennextjs-cloudflare ([5b2c1c1](https://github.com/stbensonimoh/official-website/commit/5b2c1c121c9477cb96ca3e333d3f79e0d3e5ccae))

## [1.4.2](https://github.com/stbensonimoh/official-website/compare/v1.4.1...v1.4.2) (2026-04-01)


### Bug Fixes

* ensure posts.data.ts is generated before dev server starts ([6a3f59d](https://github.com/stbensonimoh/official-website/commit/6a3f59d1d7d1b03b90a0adaf05db16b3713a8dc2))
* remove generated posts.data.ts from version control and update CI/CD ([296d4c7](https://github.com/stbensonimoh/official-website/commit/296d4c7463b1ff90e10825e38ecb35e996fd15f9))
* remove generated posts.data.ts from version control and update CI/CD ([fa2fe30](https://github.com/stbensonimoh/official-website/commit/fa2fe306c6c556bf0a87bf5729e2c668088ae1cf))
* reorder CI steps to run Build before Test ([1cca89f](https://github.com/stbensonimoh/official-website/commit/1cca89f96fca453b0023c63a677670f54f9067d2))

## [1.4.1](https://github.com/stbensonimoh/official-website/compare/v1.4.0...v1.4.1) (2026-03-21)


### Bug Fixes

* bundle blog content for Cloudflare runtime ([d8b9a5a](https://github.com/stbensonimoh/official-website/commit/d8b9a5a3d6ed2edcc00dc551fd687df045a9d56d))
* bundle blog content for Cloudflare runtime ([569e8b4](https://github.com/stbensonimoh/official-website/commit/569e8b4afdffee59c9f41c91f15160e4ffc36258))
* correct lint script and ESLint config ([543e542](https://github.com/stbensonimoh/official-website/commit/543e542598a403654944b92fb66f268ab6d202d9))
* use npm on cloudflare build ([2e30a8f](https://github.com/stbensonimoh/official-website/commit/2e30a8fbc97311bf341852e0cd57c33fbb6512e3))
* use npm on cloudflare build ([ddb17fa](https://github.com/stbensonimoh/official-website/commit/ddb17fa4bb29afc030c0548119f4bd2aef424db1))

## [1.4.0](https://github.com/stbensonimoh/official-website/compare/v1.3.0...v1.4.0) (2026-02-07)


### Features

* **deploy:** add vercel-ignore script for tag-based deployments ([74d1bb8](https://github.com/stbensonimoh/official-website/commit/74d1bb8bebd755c01d8a13a647a6d064c6dc8920))
* **deploy:** implement tag-based production deployments ([f6f02dc](https://github.com/stbensonimoh/official-website/commit/f6f02dc6247e7d39afa950864af7caa3a547ac78))


### Bug Fixes

* **deploy:** allow preview builds ([b5d7f14](https://github.com/stbensonimoh/official-website/commit/b5d7f14be54bcf64bdec37ff1ce4405b7f5da9dc))
* **deploy:** allow preview builds while restricting production to tags ([cf75959](https://github.com/stbensonimoh/official-website/commit/cf759597dac9da4f2cdb531cafe04f6d83a9607c))

## [1.3.0](https://github.com/stbensonimoh/official-website/compare/v1.2.0...v1.3.0) (2026-02-07)


### Features

* add CI pipeline for linting and testing ([c176ee2](https://github.com/stbensonimoh/official-website/commit/c176ee2f6c65c07b2230855d3bf546b3a57f62a3))
* add CI pipeline for linting and testing ([85f5ef3](https://github.com/stbensonimoh/official-website/commit/85f5ef3a4f8608e79f19ac4920203841c3c8500a))
* **blog:** add 350.org journey post and fix markdown list styling ([#84](https://github.com/stbensonimoh/official-website/issues/84)) ([28e0210](https://github.com/stbensonimoh/official-website/commit/28e0210448d640894128b8f4cd84e1840ffdb07f))
* **branding:** replace Twitter logo with X logo ([acf2a00](https://github.com/stbensonimoh/official-website/commit/acf2a00a417571a20d9e193a3705100afa66d3ce))
* **branding:** replace Twitter logo with X logo ([2a04d8a](https://github.com/stbensonimoh/official-website/commit/2a04d8aedb4e9af02e571bb23ae41c4fbf4896db))
* **testing:** add Bun testing skill documentation ([253d532](https://github.com/stbensonimoh/official-website/commit/253d5327944dde6a6b130a85d96fad24d0976a16))
* **testing:** Add comprehensive Bun testing skill and infrastructure ([17fa64c](https://github.com/stbensonimoh/official-website/commit/17fa64c69d79ea41ca2bc64767298ddb3edb5c81))
* **testing:** add test automation scripts ([2932c27](https://github.com/stbensonimoh/official-website/commit/2932c2711b92c5716b56f152cf61c603d2d5eee3))


### Bug Fixes

* **blog:** update featured image URL in journey post ([c083b14](https://github.com/stbensonimoh/official-website/commit/c083b14fb0590768431b6e260bc26d21f72cedeb))
* **config:** remove duplicate typedRoutes setting in next.config.mjs ([34ff085](https://github.com/stbensonimoh/official-website/commit/34ff085b7a8f86b1963e760183201aafd90df768))
* **seo:** dynamic x handle and namespace clarification ([7d335e4](https://github.com/stbensonimoh/official-website/commit/7d335e43962ca42af53a9d06eba74d59e7e189b4))
* **seo:** fix unterminated template string in seo config ([0c4f38d](https://github.com/stbensonimoh/official-website/commit/0c4f38da64d8cb4d635afc471c647aca406fb42f))
