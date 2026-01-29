# References

This folder contains detailed reference materials for the Bun testing skill.

## Files

| File | Description |
|------|-------------|
| [EXAMPLES.md](EXAMPLES.md) | Comprehensive test examples for utilities, components, context, and pages |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues and their solutions |
| [MATCHERS.md](MATCHERS.md) | Complete reference of all available test matchers |

## Official Documentation

- [Bun Test Runner](https://bun.sh/docs/cli/test) - Official Bun testing documentation
- [Bun Mocking](https://bun.sh/docs/test/mocking) - How to use mocks in Bun
- [Testing Library](https://testing-library.com/docs/react-testing-library/intro) - React Testing Library docs
- [jest-dom Matchers](https://github.com/testing-library/jest-dom#custom-matchers) - Custom DOM matchers

## Quick Reference

### Bun Test CLI Options

| Option | Description |
|--------|-------------|
| `--watch` | Run tests in watch mode |
| `--coverage` | Generate coverage report |
| `--verbose` | Show verbose output |
| `--timeout <ms>` | Set test timeout |
| `--bail` | Stop on first failure |
| `--update-snapshots` | Update snapshot files |
| `--rerun-each=N` | Rerun tests N times (detect flaky tests) |
| `--randomize` | Randomize test order |

### Testing Library Query Priority

1. `getByRole` - Most preferred (accessibility)
2. `getByLabelText` - Form fields
3. `getByPlaceholderText` - Input placeholders
4. `getByText` - Text content
5. `getByDisplayValue` - Current form values
6. `getByAltText` - Images
7. `getByTitle` - Title attribute
8. `getByTestId` - Last resort

### AI Agent Environment Variables

```bash
AGENT=1 bun test      # Quieter output
CLAUDECODE=1 bun test # Same as above
```
