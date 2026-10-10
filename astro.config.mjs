import { defineConfig, fontProviders } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://stbensonimoh.com',
  output: 'server',
  build: { format: 'file' },
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: { build: 'compile' },
  }),
  session: false,
  // Issue #181: keep <ClientRouter /> (Layout.astro) and its soft navigation for
  // speed. Router: 16,338 B raw / 4,962 B brotli; the pin below documents
  // ClientRouter's default and adds 187 B raw / 358 B brotli. Hover is pinned,
  // so a touch device on a fast connection does not prefetch: tap only fires
  // with an explicit tap strategy or a slow connection. Mobile warm-up needs
  // `viewport` and a byte measurement first, it prefetches every in-view link
  // on a phone. Soft nav costs: theme reset (#209), Clarity page views (#210).
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  integrations: [mdx(), sitemap()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Roboto',
      cssVariable: '--astro-font-roboto',
      weights: [400, 500, 700],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Bebas Neue',
      cssVariable: '--astro-font-bebas',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
    {
      provider: fontProviders.google(),
      name: 'Bad Script',
      cssVariable: '--astro-font-badscript',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['cursive'],
    },
    {
      provider: fontProviders.google(),
      name: 'Dosis',
      cssVariable: '--astro-font-dosis',
      weights: [400],
      styles: ['normal'],
      subsets: ['latin'],
      fallbacks: ['sans-serif'],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
