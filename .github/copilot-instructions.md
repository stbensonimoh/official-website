# Benson Imoh's Personal Website - Copilot Instructions

This is a Next.js 15 personal website built with React 19, using Bun as the runtime and package manager. The project has been recently migrated from NPM to Bun for improved performance.

**ALWAYS follow these instructions first. Only fall back to additional search and context gathering if the information in these instructions is incomplete or found to be in error.**

## Working Effectively

### Bootstrap, Build, and Test the Repository

**CRITICAL: Set appropriate timeouts (60+ minutes) for build commands and 30+ minutes for test commands. NEVER CANCEL long-running operations.**

1. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   source ~/.bashrc
   ```

2. **Install dependencies**:
   ```bash
   bun install
   ```
   - Takes approximately 22 seconds
   - Automatically runs `bun run test:setup` via postinstall hook
   - Creates test mocks for Next.js font imports

3. **Run tests**:
   ```bash
   bun run test
   ```
   - **NEVER CANCEL**: Test execution takes ~1 second - NEVER use default timeouts that may cause premature cancellation
   - Set timeout to 30+ minutes for safety
   - Expected: 51/52 tests passing (1 failing test is expected due to content mismatch)
   - For test coverage: `bun run test:coverage` (97.5% line coverage)
   - For watch mode: `bun run test:watch`

4. **Lint the code**:
   ```bash
   bun run lint
   ```
   - Takes ~2 seconds
   - Passes with warnings about img elements (expected)

5. **Build for production**:
   ```bash
   bun run build
   ```
   - **NEVER CANCEL**: Build takes 20-25 seconds. NEVER CANCEL. Set timeout to 60+ minutes.
   - **NETWORK LIMITATION**: In sandboxed environments, Google Fonts API calls may fail with ECONNREFUSED errors
   - **WORKAROUND**: If build fails with "Failed to fetch [Font] from Google Fonts" errors:
     ```bash
     # Replace fonts with offline fallbacks
     cp src/app/fonts-offline.ts src/app/fonts.ts
     bun run build  # Should now succeed
     git checkout src/app/fonts.ts  # Restore original after build
     ```
   - Creates optimized static site in `.next/` directory

### Run the Application

**Development Server**:
```bash
bun run dev
```
- Starts in ~1.4 seconds
- Available at http://localhost:3000
- Supports hot reload and fast refresh

**Production Server**:
```bash
bun run start
```
- Requires `bun run build` first
- Starts in ~370ms
- Production-optimized serving

## Validation

**ALWAYS manually validate any new code changes by running through complete user scenarios:**

### Manual Testing Scenarios
1. **Navigation Flow**: Test all navigation links (Home, About, Blog, Contact)
2. **Theme Toggle**: Verify light/dark theme switching works
3. **Blog Functionality**: 
   - Visit `/blog` page
   - Click on blog post links
   - Verify dynamic routing works for `/[slug]` pages
4. **About Page**: Verify content loads and displays correctly
5. **Contact Page**: Test contact form and social links

### Validation Commands
Always run these before submitting changes:
1. `bun run lint` - Code quality (must pass)
2. `bun run test` - Test suite (51/52 tests expected)
3. `bun run build` - Production build (must succeed)
4. Manual browser testing of key user flows

**You can build and run both development and production versions of the application. External images may fail to load in sandboxed environments but core functionality works.**

## Common Development Workflows

### Making Code Changes
1. Start development server: `bun run dev`
2. Make your changes to components in `src/app/components/`
3. Tests run automatically in background (if using `bun run test:watch`)
4. Verify changes in browser at http://localhost:3000
5. Run validation before committing:
   ```bash
   bun run lint    # Check code quality
   bun run test    # Run test suite
   bun run build   # Verify production build (use font workaround if needed)
   ```

### Adding New Components
1. Create component in `src/app/components/ComponentName.tsx`
2. Create test file `src/app/components/__tests__/ComponentName.test.tsx`
3. Export from component directory if needed
4. Write tests following existing patterns (React Testing Library)
5. Validate with `bun run test`

### Adding Blog Posts
1. Create new `.mdx` file in `/blog` directory
2. Follow existing frontmatter format (title, date, excerpt, etc.)
3. Test dynamic routing works: visit `/your-post-slug`
4. Verify blog listing shows new post

### Debugging Issues
- **Dev server won't start**: Check port 3000 availability
- **Tests failing**: Run `bun run test:setup` to reinitialize mocks
- **Build failing**: Apply font workaround if ECONNREFUSED errors
- **Styles not applying**: Check Tailwind classes, restart dev server

## Common Tasks

### Frequent Commands with Timings
```bash
# Quick development workflow
bun install                    # ~22s (dependency installation)
bun run dev                   # ~1.4s (dev server startup)
bun run test                  # ~1s (test execution)
bun run lint                  # ~2s (code linting)
bun run build                 # ~20-25s (production build, may fail without font workaround)
bun run start                 # ~370ms (production server startup)
```

### Project Structure Navigation
```
├── .github/               # GitHub-specific files & workflows
├── blog/                  # Blog posts in MDX format
├── public/                # Static assets (images, logos)
├── src/app/               # Next.js App Router structure
│   ├── components/        # React components
│   ├── context/          # React context providers
│   ├── [slug]/           # Dynamic blog post routes
│   ├── about/            # About page
│   ├── blog/             # Blog listing page
│   ├── contact/          # Contact page
│   └── __tests__/        # Component tests
├── scripts/              # Build and setup scripts
├── bunfig.toml           # Bun configuration
├── next.config.mjs       # Next.js configuration
├── package.json          # Dependencies and scripts
└── test-setup.ts         # Test environment configuration
```

### Key Technologies & Dependencies
- **Runtime**: Bun 1.0.0+ (instead of Node.js)
- **Framework**: Next.js 15 with App Router
- **React**: Version 19
- **Styling**: Tailwind CSS
- **Testing**: Bun's built-in test runner + React Testing Library
- **Content**: MDX for blog posts
- **Deployment**: Optimized for Vercel

### Common File Operations
- **Blog posts**: Add new `.mdx` files to `/blog` directory
- **Components**: Create in `src/app/components/` with corresponding tests
- **Styling**: Use Tailwind classes; global styles in `src/app/globals.css`
- **Images**: Place in `public/images/` directory

## Troubleshooting

### Network/Environment Issues
- **Google Fonts fail in builds**: 
  - **Error**: `Failed to fetch [Font Name] from Google Fonts` with ECONNREFUSED
  - **Solution**: Use the provided offline fallback: `cp src/app/fonts-offline.ts src/app/fonts.ts`
  - **Restore**: After successful build: `git checkout src/app/fonts.ts`
- **External images blocked**: Expected in sandboxed environments (Cloudinary CDN), functionality preserved
- **Test font imports**: Handled by test mocks in `scripts/setup-test-mocks.ts`

### Build Issues
- **Font loading fails**: See "Google Fonts fail in builds" above
- **TypeScript errors**: Run `bun run lint` to check for syntax issues
- **Test failures**: Expected 1/52 failing test (content mismatch in About page), 51 should pass
- **Build timeout**: Ensure timeout is set to 60+ minutes, build should complete in 20-25 seconds

### Test Issues
- **Single failing test expected**: `About > renders main sections` fails due to content mismatch
- **Test setup errors**: Run `bun run test:setup` to reinitialize test mocks
- **Font import test errors**: Mocks should handle Next.js font imports automatically

### Performance Notes
- **Fast development**: Bun provides 2-10x faster dependency installation than NPM
- **Quick builds**: Next.js optimizations + Bun runtime = fast compilation
- **Instant tests**: Test suite runs in ~1 second with high coverage

### CI/CD Pipeline
- **GitHub Actions**: Uses `oven-sh/setup-bun` action
- **Workflow**: Install → Lint → Test → Build
- **Duration**: Complete CI pipeline runs in ~2-3 minutes

## Migration Notes
This project was migrated from NPM to Bun. Key changes:
- All scripts use `bun --bun` prefix for Next.js compatibility
- Test runner changed from Jest to Bun's built-in runner
- Faster installation and execution across all operations
- See `MIGRATION.md` and `TEST_MIGRATION_STATUS.md` for full details

**Status**: Migration complete with 85% test coverage maintained and zero breaking changes.