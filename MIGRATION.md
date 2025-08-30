# Migration from NPM to Bun

This guide covers the migration from NPM to Bun for the official-website project.

## What Changed

### Package Management
- **Before**: `npm install` → **After**: `bun install`
- **Before**: `npm run <script>` → **After**: `bun run <script>`

### Test Runner
- **Before**: Jest → **After**: Bun's built-in test runner
- Test syntax remains mostly the same, but imports change slightly

### Configuration Files
- **Removed**: `jest.config.js`, `jest.setup.js`
- **Added**: `bunfig.toml`, `test-setup.ts`

## Installation Steps

1. **Install Bun** (if not already installed):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   ```

2. **Remove node_modules and package-lock.json**:
   ```bash
   rm -rf node_modules package-lock.json
   ```

3. **Install dependencies with Bun**:
   ```bash
   bun install
   ```

## Updated Scripts

All scripts now use Bun instead of NPM:

| Script | Before | After |
|--------|--------|--------|
| Development | `npm run dev` | `bun run dev` |
| Build | `npm run build` | `bun run build` |
| Start | `npm run start` | `bun run start` |
| Test | `npm run test` | `bun run test` |
| Test Watch | `npm run test:watch` | `bun run test:watch` |
| Test Coverage | `npm run test:coverage` | `bun run test:coverage` |

## Test Migration

### Import Changes
For test files that you want to use Bun's native test runner:

```typescript
// Before (Jest)
import { describe, it, expect, beforeAll } from 'jest'

// After (Bun)
import { describe, test, expect, beforeAll } from 'bun:test'
```

### Mock Changes
```typescript
// Before (Jest)
jest.fn()

// After (Bun)
import { mock } from 'bun:test'
mock()
```

**Note**: For easier migration, we've kept the existing test files using Jest-compatible syntax. The testing-library imports work the same way.

## Performance Benefits

- **Faster dependency installation**: Bun can be 2-10x faster than NPM
- **Faster test execution**: Built-in test runner is significantly faster
- **Faster script execution**: Native runtime performance
- **Smaller bundle sizes**: Better tree-shaking and optimization

## Troubleshooting

### If you encounter TypeScript errors:
1. Make sure `bun-types` is installed: `bun add -d bun-types`
2. Ensure TypeScript can find Bun types in `tsconfig.json`

### If tests fail:
1. Ensure the test setup file is properly loaded
2. Check that all mocks are properly configured
3. Verify that native DOM assertions are working properly

### If Next.js doesn't start:
1. Try using `bun --bun next dev` for better compatibility
2. Check that all dependencies are properly installed

## Rollback Plan

If you need to rollback to NPM:

1. Restore the old `package.json` scripts
2. Remove `bunfig.toml` and `test-setup.ts`
3. Restore `jest.config.js` and `jest.setup.js`
4. Run `npm install`

## Questions?

If you encounter any issues with the migration, please create an issue in the repository.
