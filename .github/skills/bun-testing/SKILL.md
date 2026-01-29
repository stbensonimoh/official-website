---
name: bun-testing
description: Comprehensive guide for writing tests using Bun's built-in test runner for Next.js TypeScript projects. Use when writing, debugging, or maintaining tests in this workspace.
license: MIT
compatibility: Bun 1.0+, Next.js 15+, React 19+, TypeScript 5+
metadata:
  version: 1.0.0
  author: AI Agent
  tags: bun testing nextjs typescript jest-dom react-testing-library
---

# Bun Testing Guide for Next.js TypeScript Projects

## Overview

This skill provides comprehensive guidelines for writing tests using Bun's built-in test runner for Next.js 16+ TypeScript projects. It covers testing utilities, React components, context providers, and Next.js pages with a focus on diagnostic testing that validates actual functionality.

**Key Principles:**

- Tests are diagnostic tools, not code modifiers
- Never modify source code to make tests pass
- Report failures with clear analysis and recommendations
- Test behavior, not implementation details

## Installation & Setup

### Install Dependencies

```bash
bun add -d @testing-library/react @testing-library/jest-dom @happy-dom/global-registrator
```

### Configure Bun

Create `bunfig.toml` in project root:

```toml
[test]
preload = ["./test-setup.ts"]

[test.coverage]
enabled = false
reporter = ["text", "lcov"]
coverageDir = "./coverage"
coverageThreshold = { lines = 70, functions = 70, branches = 70 }
```

Create `test-setup.ts`:

```typescript
import { GlobalRegistrator } from "@happy-dom/global-registrator";
import { expect, afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";

// Register happy-dom globals (window, document, etc.)
GlobalRegistrator.register();

// Add jest-dom matchers
expect.extend(matchers);

// Cleanup after each test to prevent test pollution
afterEach(() => {
  cleanup();
});
```

### Package.json Scripts

```json
{
  "scripts": {
    "test": "bun test",
    "test:watch": "bun test --watch",
    "test:coverage": "bun test --coverage",
    "test:ci": "AGENT=1 bun test --bail --coverage"
  }
}
```

## Core Testing APIs

```typescript
import { describe, test, it, expect, beforeAll, beforeEach, afterAll, afterEach, mock, spyOn } from "bun:test";

describe("Feature Name", () => {
  test("should do something specific", () => {
    expect(actual).toBe(expected);
  });

  it("works as an alias for test", () => {
    expect(true).toBe(true);
  });

  test("async operations", async () => {
    const result = await fetchData();
    expect(result).toBeDefined();
  });

  // Lifecycle hooks
  beforeAll(() => { /* run once before all tests */ });
  beforeEach(() => { /* run before each test */ });
  afterEach(() => { /* run after each test */ });
  afterAll(() => { /* run once after all tests */ });
});
```

### Test Modifiers

```typescript
test.skip("not ready yet", () => {});           // Skip this test
test.todo("implement later");                    // Placeholder
test.only("debug this one", () => {});          // Run only this test
test.if(condition)("conditional", () => {});     // Run if condition true
test.skipIf(condition)("skip if", () => {});    // Skip if condition true

// Parameterized tests
test.each([
  [1, 2, 3],
  [2, 3, 5],
  [0, 0, 0],
])("add(%i, %i) = %i", (a, b, expected) => {
  expect(a + b).toBe(expected);
});

// Test options
test("slow operation", async () => { /* ... */ }, 10000);      // Custom timeout
test("flaky test", async () => { /* ... */ }, { retry: 3 });   // Retry on failure
```

### Mocking Functions

```typescript
import { mock, spyOn } from "bun:test";

// Create a mock function
const mockFn = mock((arg: string) => `result: ${arg}`);
mockFn("hello");

expect(mockFn).toHaveBeenCalledWith("hello");
expect(mockFn).toHaveBeenCalledTimes(1);

// Mock return values
const mockFn2 = mock();
mockFn2.mockReturnValue("default");
mockFn2.mockReturnValueOnce("first call only");
mockFn2.mockResolvedValue("async result");

// Spy on object methods (tracks calls without replacing)
const obj = { greet: (name: string) => `Hello, ${name}` };
const spy = spyOn(obj, "greet");
obj.greet("World");
expect(spy).toHaveBeenCalledWith("World");

// Reset/restore mocks
mockFn.mockClear();    // Clear call history only
mockFn.mockReset();    // Clear history + remove implementation
spy.mockRestore();     // Restore original implementation
mock.restore();        // Restore ALL mocks globally
```

### Mocking Modules

```typescript
import { mock } from "bun:test";

mock.module("./path/to/module", () => ({
  someFunction: mock(() => "mocked"),
  someValue: 42,
}));

// Mock Next.js modules
mock.module("next/navigation", () => ({
  useRouter: () => ({ push: mock(), back: mock() }),
  usePathname: () => "/current-path",
  useSearchParams: () => new URLSearchParams(),
}));

mock.module("next/headers", () => ({
  cookies: () => ({ get: mock((name: string) => ({ name, value: "test" })) }),
  headers: () => new Headers({ "x-custom": "value" }),
}));
```

### Snapshot Testing

```typescript
test("component structure", () => {
  const output = { type: "button", props: { className: "btn-primary" } };
  expect(output).toMatchSnapshot();
});

// Inline snapshots (writes expected value into test file)
test("inline snapshot", () => {
  expect({ name: "test" }).toMatchInlineSnapshot();
});
```

Update snapshots: `bun test --update-snapshots`

### Assertion Counting

```typescript
test("async callback assertions", async () => {
  expect.assertions(2);  // Exactly 2 assertions must be called
  
  await fetchData((result) => {
    expect(result).toBeDefined();
    expect(result.status).toBe("ok");
  });
});

test("at least one assertion", () => {
  expect.hasAssertions();  // At least 1 assertion must be called
  // ...
});
```

## File Organization

**Recommended structure for Next.js App Router:**

```
src/
├── __tests__/                    ← Main test directory
│   ├── components/
│   │   ├── Button.test.tsx
│   │   ├── Header.test.tsx
│   │   └── ThemeToggle.test.tsx
│   ├── context/
│   │   └── ThemeContext.test.tsx
│   ├── pages/
│   │   ├── about.test.tsx
│   │   └── blog.test.tsx
│   └── integration/
│       └── navigation.test.tsx
├── lib/
│   ├── posts.ts
│   ├── posts.test.ts             ← Co-located (allowed for lib/)
│   ├── clarity.ts
│   └── clarity.test.ts           ← Co-located (allowed for lib/)
└── app/
    └── ... (no test files here)  ← Keep app/ clean for routing
```

**Why this structure:**

- Next.js App Router uses file system for routing; `page.test.tsx` next to `page.tsx` can cause conflicts
- `src/lib/` is safe for co-location since it's not part of the router
- `src/__tests__/` mirrors app structure for easy navigation

**Naming convention:** `*.test.ts` or `*.test.tsx`

## Testing Next.js App Router

### Testing generateMetadata

```typescript
// src/__tests__/pages/about.test.ts
import { describe, test, expect } from "bun:test";
import { generateMetadata } from "@/app/about/page";

describe("About page metadata", () => {
  test("should return correct title and description", async () => {
    const metadata = await generateMetadata();
    
    expect(metadata.title).toContain("About");
    expect(metadata.description).toBeDefined();
    expect(metadata.openGraph?.title).toBe(metadata.title);
  });
});
```

### Testing generateStaticParams

```typescript
// src/__tests__/pages/blog-slug.test.ts
import { describe, test, expect, mock } from "bun:test";
import { generateStaticParams } from "@/app/[slug]/page";

mock.module("fs", () => ({
  readdirSync: mock(() => ["post-one.mdx", "post-two.mdx"]),
  readFileSync: mock(() => "---\ntitle: Test\n---\nContent"),
}));

describe("Blog slug static params", () => {
  test("should return all post slugs", async () => {
    const params = await generateStaticParams();
    
    expect(params).toBeInstanceOf(Array);
    expect(params.length).toBeGreaterThan(0);
    params.forEach(p => expect(p).toHaveProperty("slug"));
  });
});
```

### Testing Route Handlers

```typescript
// src/__tests__/api/feed.test.ts
import { describe, test, expect } from "bun:test";
import { GET } from "@/app/feed.xml/route";

describe("RSS Feed route", () => {
  test("should return valid XML response", async () => {
    const response = await GET();
    
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("xml");
    
    const text = await response.text();
    expect(text).toContain("<?xml");
    expect(text).toContain("<rss");
  });
});
```

### Server Components Limitation

⚠️ **Server Components cannot be tested with React Testing Library.** They run on the server and don't produce DOM output in the test environment.

**Strategies for Server Components:**

1. Test the data-fetching functions separately
2. Test `generateMetadata()` and `generateStaticParams()`
3. Use E2E tests (Playwright) for full page rendering
4. Extract logic into testable utility functions

## Async Testing Patterns

### Using waitFor

```typescript
import { render, screen, waitFor } from "@testing-library/react";

test("async content appears", async () => {
  render(<AsyncComponent />);
  
  // Wait for element to appear (polls until found or timeout)
  await waitFor(() => {
    expect(screen.getByText("Loaded")).toBeInTheDocument();
  });
});
```

### Using findBy Queries

```typescript
test("findBy combines getBy + waitFor", async () => {
  render(<AsyncComponent />);
  
  // findBy* returns a promise that resolves when element found
  const element = await screen.findByText("Loaded");
  expect(element).toBeInTheDocument();
  
  // With timeout option
  const slowElement = await screen.findByRole("button", {}, { timeout: 5000 });
});
```

### Testing User Events

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("user interactions", async () => {
  const user = userEvent.setup();
  render(<Form />);
  
  await user.type(screen.getByLabelText("Email"), "test@example.com");
  await user.click(screen.getByRole("button", { name: "Submit" }));
  
  await waitFor(() => {
    expect(screen.getByText("Success")).toBeInTheDocument();
  });
});
```

## AI Agent Environment Variables

Bun provides quieter output modes for AI agents and CI:

```bash
# Enable quiet output (less noise for agents)
AGENT=1 bun test
CLAUDECODE=1 bun test
REPL_ID=1 bun test

# Useful CI flags
bun test --bail              # Stop on first failure
bun test --bail=5            # Stop after 5 failures
bun test --rerun-each=3      # Detect flaky tests
bun test --randomize         # Randomize test order
```

## Testing Philosophy

### Strict Rules for AI Agents

**🚫 NEVER DO THIS:**

- Modify source code files to make tests pass
- Change component logic, props, or behavior
- Delete or rename source files to fix test failures
- Alter TypeScript interfaces to match test assumptions

**✅ ALWAYS DO THIS:**

- Report test failures with clear explanations
- Explain expected vs. actual behavior
- Identify root cause of failures
- Suggest fixes, but let user decide
- Fix test code (not source code) if test is wrong

### Test Failure Report Format

```
❌ TEST FAILED: <test-name>

Expected: <what the test expected>
Actual:   <what actually happened>

Location: <file path and line number>

Analysis:
- The code does X because of Y
- This appears to be a bug because Z
- Suggested fix: <specific recommendation>

Decision: User should review and fix the source code
```

## Coverage Configuration

### Thresholds by File Type

| File Type | Recommended Coverage | Rationale |
|-----------|---------------------|-----------|
| `src/lib/*.ts` | 80% | Core utilities, high impact |
| `src/app/context/*.tsx` | 80% | Shared state, critical |
| `src/app/components/*.tsx` | 70% | UI components |
| Overall | 70% | Baseline |

### Running Coverage

```bash
bun test --coverage                    # Text report
bun test --coverage --coverage-reporter=lcov  # For CI/Codecov
```

## Quick Reference

### CLI Commands

| Command | Description |
|---------|-------------|
| `bun test` | Run all tests |
| `bun test --watch` | Watch mode |
| `bun test Button` | Filter by pattern |
| `bun test --coverage` | With coverage |
| `bun test --bail` | Stop on first failure |
| `bun test --update-snapshots` | Update snapshots |
| `bun test --timeout 10000` | Set timeout (ms) |

### Common Matchers

| Matcher | Description |
|---------|-------------|
| `toBe(value)` | Strict equality (===) |
| `toEqual(obj)` | Deep equality |
| `toBeDefined()` | Not undefined |
| `toContain(item)` | Array/string contains |
| `toThrow(msg?)` | Throws exception |
| `toBeInTheDocument()` | DOM: element exists |
| `toHaveTextContent(text)` | DOM: text content |

See [references/MATCHERS.md](references/MATCHERS.md) for complete matcher reference.

## Additional Resources

- **Examples**: [references/EXAMPLES.md](references/EXAMPLES.md) - Comprehensive test examples
- **Troubleshooting**: [references/TROUBLESHOOTING.md](references/TROUBLESHOOTING.md) - Common issues and fixes
- **Matchers**: [references/MATCHERS.md](references/MATCHERS.md) - Full matcher reference

## Summary Checklist

Before writing tests:

- [ ] Understand source code behavior
- [ ] Identify public API (exports, props)
- [ ] Plan happy path and edge cases

When writing tests:

- [ ] Place test in `src/__tests__/` (or co-locate in `src/lib/`)
- [ ] Name: `*.test.ts` or `*.test.tsx`
- [ ] Mock external dependencies
- [ ] Test behavior, not implementation
- [ ] Use `afterEach` cleanup

When tests fail:

- [ ] Analyze if test bug or code bug
- [ ] Fix test bugs immediately
- [ ] **DO NOT FIX SOURCE CODE BUGS - REPORT THEM**

---

**Remember**: Tests are diagnostic tools. They validate code behavior without authorizing modifications to working code.
