# Contributing to Benson Imoh's Official Website

## Development Setup

```bash
bun install                       # Install dependencies
bun run dev                       # Start dev server at http://localhost:4321
bun run lint                      # Run ESLint
bun astro check                   # TypeScript type checking
bun run test                      # Run Bun tests
bun run build                     # Production build
```

## Commit Conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` — New feature
- `fix:` — Bug fix
- `ci:` — CI/CD changes
- `docs:` — Documentation
- `style:` — CSS/styling changes
- `refactor:` — Code changes without behavior change
- `test:` — Test additions or changes

## Development Workflow

1. Fork or clone the repository
2. Create a branch (`git checkout -b feat/your-feature`)
3. Make your changes
4. Run `bun astro check` and `bun run test` to verify
5. Run `bun run dev` and visually verify in browser at http://localhost:4321
6. Commit with conventional commit format
7. Push and open a Pull Request

## Adding Blog Posts

1. Create `src/content/blog/your-title.mdx`
2. Frontmatter: `title`, `pubDate`, `description`, `heroImage` (optional), `tags` (optional), `slug` (optional)
3. The post appears on `/blog` listing and `/your-slug` automatically

## Testing

```bash
bun test           # Run all tests
bun test --watch   # Watch mode
```

Tests use Bun's native test runner (`bun:test`). Utilities in `src/lib/` should have corresponding tests.

## License

By contributing, you agree that your contributions will be licensed under the project's MIT License.
