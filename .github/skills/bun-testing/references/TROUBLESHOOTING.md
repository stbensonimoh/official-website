# Troubleshooting Guide

Common issues and solutions when testing with Bun in Next.js projects.

## Environment Issues

### "window is not defined"

**Cause**: Testing code that accesses browser APIs in a non-browser environment.

**Solutions**:

1. **Use `@happy-dom/global-registrator`** (recommended):

```typescript
// test-setup.ts
import { GlobalRegistrator } from "@happy-dom/global-registrator";
GlobalRegistrator.register();
```

1. **Mock specific browser APIs**:

```typescript
Object.defineProperty(global, "window", {
  value: { localStorage: mockLocalStorage },
  writable: true,
});
```

1. **Guard browser-only code**:

```typescript
if (typeof window !== "undefined") {
  // Browser-only code
}
```

---

### "document is not defined"

**Cause**: Same as above - DOM APIs not available.

**Solution**: Ensure `@happy-dom/global-registrator` is registered in your test setup preload.

---

### "Cannot find module 'bun:test'"

**Cause**: Running tests with Node.js instead of Bun.

**Solution**: Always use `bun test`, never:

- `node test.js`
- `npx jest`
- `npm test` (unless it's configured to use `bun test`)

---

## Module Resolution Issues

### Module not found errors (path aliases)

**Cause**: Path aliases like `@/lib/...` not resolved in tests.

**Solution**: Ensure `tsconfig.json` has paths configured:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### "Cannot find module 'next/navigation'"

**Cause**: Next.js modules need to be mocked in unit tests.

**Solution**: Mock Next.js modules:

```typescript
import { mock } from "bun:test";

mock.module("next/navigation", () => ({
  useRouter: () => ({
    push: mock(),
    back: mock(),
    forward: mock(),
    refresh: mock(),
    replace: mock(),
    prefetch: mock(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useParams: () => ({}),
}));
```

---

### "Cannot find module 'next/link'"

**Solution**: Mock the Link component:

```typescript
mock.module("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));
```

---

### "Cannot find module 'next/image'"

**Solution**: Mock the Image component:

```typescript
mock.module("next/image", () => ({
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  ),
}));
```

---

## Test Isolation Issues

### Tests pass individually but fail together

**Cause**: Shared state or mocks not properly cleaned up between tests.

**Solutions**:

1. **Reset all mocks in beforeEach**:

```typescript
import { beforeEach, mock } from "bun:test";

beforeEach(() => {
  mock.restore();  // Restore all mocks
});
```

1. **Clear specific mocks**:

```typescript
beforeEach(() => {
  mockFunction.mockClear();  // Clear call history
  mockFunction.mockReset();  // Clear history + implementation
});
```

1. **Use cleanup from Testing Library**:

```typescript
import { afterEach } from "bun:test";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
});
```

---

### State persists between tests

**Cause**: Global variables or module-level state not reset.

**Solution**: Isolate state in test setup:

```typescript
describe("feature", () => {
  let state: any;

  beforeEach(() => {
    state = createFreshState();  // Create new instance each test
  });

  test("test 1", () => { /* uses fresh state */ });
  test("test 2", () => { /* uses fresh state */ });
});
```

---

## Async Testing Issues

### Test completes before async operation

**Cause**: Not awaiting async operations.

**Solution**: Use async/await properly:

```typescript
// ❌ Wrong
test("async test", () => {
  fetchData().then(result => {
    expect(result).toBeDefined();
  });
});

// ✅ Correct
test("async test", async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});
```

---

### "Unable to find element" after async render

**Cause**: Element hasn't rendered yet when assertion runs.

**Solutions**:

1. **Use findBy queries** (wait for element):

```typescript
const element = await screen.findByText("Loaded");
```

1. **Use waitFor**:

```typescript
await waitFor(() => {
  expect(screen.getByText("Loaded")).toBeInTheDocument();
});
```

1. **Use act for state updates**:

```typescript
import { act } from "@testing-library/react";

await act(async () => {
  fireEvent.click(button);
});
```

---

### Timeout errors in async tests

**Cause**: Operation takes longer than default timeout.

**Solution**: Increase timeout:

```typescript
// Per-test timeout
test("slow test", async () => {
  // ...
}, 10000);  // 10 second timeout

// Or globally in bunfig.toml
// [test]
// timeout = 10000
```

---

## React Testing Library Issues

### "Not wrapped in act(...)" warnings

**Cause**: State updates happening outside of act().

**Solutions**:

1. **Use userEvent** (automatically wraps in act):

```typescript
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();
await user.click(button);
```

1. **Wrap in act explicitly**:

```typescript
import { act } from "@testing-library/react";

await act(async () => {
  fireEvent.click(button);
});
```

1. **Use findBy instead of getBy for async**:

```typescript
// After action that triggers async state update
const element = await screen.findByText("Updated");
```

---

### Multiple elements found

**Cause**: Query matches more than one element.

**Solutions**:

1. **Be more specific with queries**:

```typescript
// ❌ Too broad
screen.getByText("Submit");

// ✅ More specific
screen.getByRole("button", { name: "Submit" });
```

1. **Use getAllBy when multiple expected**:

```typescript
const buttons = screen.getAllByRole("button");
expect(buttons).toHaveLength(3);
```

1. **Use within to scope queries**:

```typescript
import { within } from "@testing-library/react";

const form = screen.getByRole("form");
const submitButton = within(form).getByRole("button");
```

---

## Mocking Issues

### Mock not being used

**Cause**: Import order - module imported before mock.module() called.

**Solution**: Call mock.module() before imports:

```typescript
import { mock } from "bun:test";

// ✅ Mock BEFORE importing the module that uses it
mock.module("./dependency", () => ({ fn: mock() }));

// Then import the module under test
import { functionThatUsesDependency } from "./module";
```

---

### Mock implementation not resetting

**Cause**: mockReturnValueOnce exhausted or mock not cleared.

**Solution**:

```typescript
beforeEach(() => {
  mockFn.mockClear();  // Clear history
  mockFn.mockReset();  // Clear history + implementation
  mockFn.mockReturnValue("default");  // Re-set default
});
```

---

### Spied function not being called

**Cause**: The spy was created on the wrong object instance.

**Solution**: Ensure you're spying on the actual object used:

```typescript
// ❌ Wrong - spying on a different object
const obj = { method: () => {} };
const spy = spyOn(obj, "method");
const anotherObj = { method: () => {} };
anotherObj.method();  // spy not called!

// ✅ Correct - spy on the object actually used
const spy = spyOn(actualModule, "method");
```

---

## Coverage Issues

### Coverage not generating

**Cause**: Coverage flag not passed or misconfigured.

**Solution**:

```bash
# Run with coverage
bun test --coverage

# Or configure in bunfig.toml
[test.coverage]
enabled = true
reporter = ["text", "lcov"]
```

---

### Files missing from coverage

**Cause**: Files not imported by any test.

**Solution**: Import files in tests even if not directly testing them, or configure coverage to include all source files.

---

## Performance Issues

### Tests running slowly

**Solutions**:

1. **Run tests in parallel** (default):

```bash
bun test --concurrency 4
```

1. **Bail on first failure in CI**:

```bash
bun test --bail
```

1. **Only run affected tests**:

```bash
bun test Button  # Only files matching "Button"
```

1. **Use test.skip for slow tests during development**:

```typescript
test.skip("slow integration test", () => {});
```

---

## Quick Diagnostic Checklist

When tests fail unexpectedly:

- [ ] Are you using `bun test` (not node/npm)?
- [ ] Is `@happy-dom/global-registrator` registered in test-setup.ts?
- [ ] Are Next.js modules mocked?
- [ ] Are async operations properly awaited?
- [ ] Are mocks being cleared between tests?
- [ ] Is cleanup() called after each test?
- [ ] Are path aliases configured in tsconfig.json?
