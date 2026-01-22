# Benson Imoh's Personal Website - AI Agent Instructions

A Next.js 16 personal website/blog built with React 19 and Bun, featuring MDX blog posts, theme switching, and analytics integration.

**Quick Start**: `bun install` → `bun run dev` (starts on :3000 in ~1.4s)

## Architecture & Key Concepts

### Next.js App Router Structure

- **Route organization**: Pages in `src/app/` directories (`about/`, `blog/`, `contact/`)
- **Dynamic routing**: Blog posts use `src/app/[slug]/page.tsx` with `generateStaticParams()` for static generation
- **Layout pattern**: Single root layout in `src/app/layout.tsx` wraps all pages with theme provider
- **Metadata generation**: Each page exports `generateMetadata()` for SEO (using `next-seo` config)

### Blog System (File-based CMS)

- **Content location**: MDX files in `/blog` directory (not in `src/`)
- **Frontmatter schema**:
  ```yaml
  title: string # Auto-converted to slug via slugify
  date: YYYY-DD-MM # Note: Non-standard format (day before month)
  featured_image: url # Cloudinary CDN URLs
  tags: array # For categorization
  excerpt: string # For blog listing cards
  ```
- **Rendering pipeline**: `src/lib/posts.ts` reads MDX → `gray-matter` parses frontmatter → `reading-time` calculates duration → `react-markdown` with `rehype-raw` renders HTML
- **Slug generation**: Uses `slugify` package with `{lower: true, strict: true}` to create URL-safe slugs from titles

### Theme System (3-State with System Preference)

- **Implementation**: `src/app/context/ThemeContext.tsx` manages `"light" | "dark" | "system"`
- **System theme detection**: Listens to `(prefers-color-scheme: dark)` media query
- **Persistence**: Stores preference in `localStorage`, sets `data-theme` attribute on `<html>`
- **Toggle cycle**: Light → Dark → System → Light (via `ThemeToggle` component)

### Font Management Strategy

- **Primary fonts**: Google Fonts via `next/font/google` in `src/app/fonts.ts`
  - Roboto (5 weights), Bebas Neue, Bad Script, Dosis, Roboto Slab
  - CSS variables: `--font-roboto`, `--font-bebas`, etc.
- **Integration**: Fonts loaded in `layout.tsx` via `className={${bebas.variable} ${roboto.variable}...}`
- **Build requirement**: Requires network access to fetch from Google Fonts API during build

### Tailwind CSS v4 Custom Configuration

- **Theme file**: `src/app/tailwind.css` (not root `tailwind.css` which is empty)
- **Custom colors**: `--color-bensonpink`, `--color-bensonblack`, `--color-bensongrey`
- **Font utilities**: `.font-roboto`, `.font-bebas`, etc. with `!important` to override defaults
- **Typography plugin**: `@tailwindcss/typography` for prose content (blog posts)

### Analytics Integration

- **Provider**: Microsoft Clarity via `@microsoft/clarity` package
- **Implementation**: Client-side only component (`src/app/components/Analytics.tsx`)
- **Environment variable**: `NEXT_PUBLIC_CLARITY_TRACKING_ID` (won't load if unset)
- **Privacy pattern**: Checks for valid ID before initializing

### RSS Feed Generation

- **Route**: `src/app/feed.xml/route.ts` generates RSS 2.0 feed at `/feed.xml`
- **Content rendering**: Uses `markdown-it` to convert MDX content to HTML for feed readers
- **Featured images**: Automatically prepended to feed items if specified in frontmatter
- **URL handling**: Converts relative image paths to absolute URLs using `siteMetadata.siteUrl`
- **Sorting**: Posts sorted by date (newest first) using frontmatter dates
- **Namespaces**: Includes `content:encoded` for full HTML content and Atom self-link

## Development Workflows

### Quick Start

```bash
bun install      # ~22s, includes postinstall hooks
bun run dev      # ~1.4s to start on :3000
bun run lint     # ~2s, expect img element warnings (allowed in config)
bun run build    # ~20-25s, generates static site
bun run start    # ~370ms, requires build first
bun test         # Runs Bun's native test runner
```

### Adding Blog Posts

1. Create `/blog/your-title.mdx` with required frontmatter (title, date, excerpt)
2. Slug auto-generated from title (e.g., "Hello World!" → `hello-world`)
3. Visit `http://localhost:3000/hello-world` to preview
4. Post appears on `/blog` listing automatically (no manual imports needed)

### Component Development Pattern

- **Client components**: Use `"use client"` directive for hooks/state (e.g., `ThemeToggle`, `Analytics`)
- **Server components**: Default for pages and non-interactive components
- **Import alias**: `@/*` maps to `src/*` (configured in `tsconfig.json`)
- **Styling**: Tailwind utility classes with custom color variables

### Linting Configuration

- **ESLint v9**: Uses new flat config (`eslint.config.mjs`)
- **Ignored patterns**: `.next/`, `out/`, `coverage/`, config files
- **Disabled rules**:
  - `react/no-unescaped-entities` (allows apostrophes in JSX)
  - `@next/next/no-page-custom-font` (using Google Fonts is intentional)

## Build & Deployment Considerations

### Production Build Process

1. Next.js pre-renders all routes at build time (SSG)
2. Fetches Google Fonts during build (ensure network connectivity)
3. Generates `.next/` static output optimized for Vercel
4. Static assets copied from `public/` to output directory

### External Dependencies

- **Cloudinary CDN**: Images hosted externally (featured images in blog posts)
- **Microsoft Clarity**: Requires `NEXT_PUBLIC_CLARITY_TRACKING_ID` env var
- **Google Fonts**: Fetched at build time via Next.js font optimization

### CI/CD Pipeline (`.github/workflows/ci.yml`)

```yaml
# Runs on: push to main/develop, PRs to main
# Steps: Checkout → Setup Bun → Install → Lint → Build → Codecov
# Note: Test step intentionally removed - testing framework being rebuilt from scratch
```

## Testing Strategy

**Current Status**: Testing infrastructure is being rebuilt from scratch using Bun's native test runner.

**Requirements for new tests**:

- Use Bun's built-in test runner (NOT Jest)
- Test actual functionality and implementation, not just passing tests
- Avoid excessive mocking - test real behavior
- Focus on component contracts, user interactions, and data flow
- No test files currently exist - clean slate approach

**When writing tests**:

```bash
bun test                    # Run tests
bun test --watch           # Watch mode
bun test --coverage        # Generate coverage
```

## Conventions & Patterns

### Metadata Pattern (SEO)

Every page exports `generateMetadata()` async function:

```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Page Title - Benson Imoh,ST",
    description: "...",
    openGraph: { ... },  // Defined in next-seo.config.ts
  };
}
```

### Component Organization

- **Tracker components**: Analytics event wrappers (e.g., `BlogPostTracker`, `PageTracker`)
- **UI components**: Self-contained with no external state dependencies
- **Testing**: No test files currently exist - clean slate for Bun-based testing

### Data Flow

1. **Blog data**: File system → `getAllPosts()` → Static params → Page component
2. **Theme state**: Context provider → `useTheme()` hook → DOM attribute + localStorage
3. **Metadata**: Static site config (`siteMetadata.ts` + `next-seo.config.ts`) → `generateMetadata()`

### TypeScript Patterns

- **Strict mode enabled**: All type checking rules active
- **Bun types**: Includes `bun-types` in compiler options
- **Next.js typed routes**: Enabled via `typedRoutes: true` in `next.config.mjs`

## Common Pitfalls

1. **Don't edit root `tailwind.css`** (empty file) → Use `src/app/tailwind.css`
2. **Blog dates use DD-MM format** not MM-DD (e.g., `2023-14-10` = Oct 14)
3. **Slugs generated from titles** not filenames (changing title changes URL)
4. **Theme toggle needs client component** (uses hooks/browser APIs)
5. **Images in blog MDX** need full Cloudinary URLs (no relative paths)
6. **Build requires network access** for Google Fonts (Next.js optimization)
7. **Tailwind v4 syntax**: Uses `@theme` block and CSS variables, not traditional config

## Project-Specific Knowledge

### Why Bun Instead of Node.js?

- Migrated from npm for 2-10x faster installations
- All scripts use `bun --bun` prefix for Next.js compatibility
- Native test runner preferred over Jest (testing infrastructure being rebuilt)

### Tailwind CSS v4 Migration

- Uses new `@theme` block syntax in `src/app/tailwind.css`
- Custom colors defined as CSS variables: `--color-bensonpink`, `--color-bensonblack`, `--color-bensongrey`
- Font utilities use `!important` to override Next.js defaults
- Configuration in CSS file, not `tailwind.config.ts`

### Site Identity Details

- **Author**: Benson Imoh, ST (Software Technologist certification)
- **Domain**: stbensonimoh.com
- **Social handles**: All platforms use `stbensonimoh` username
- **Brand colors**: Pink (`#ec2c7c`), Black, Grey (`#666666`)

---

**Quick Reference**: This is a statically-generated personal site/blog. Blog posts are MDX files, routing is file-based, theme cycles through 3 states, and builds need Google Fonts access. Start with `bun run dev` after `bun install`.
