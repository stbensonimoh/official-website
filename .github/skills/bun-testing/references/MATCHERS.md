# Bun Test Matchers Reference

Complete reference of all available matchers for Bun's test runner.

## Core Matchers (from bun:test)

### Equality

| Matcher | Description | Example |
|---------|-------------|---------|
| `toBe(value)` | Strict equality (===) | `expect(1 + 1).toBe(2)` |
| `toEqual(value)` | Deep equality (objects/arrays) | `expect({a: 1}).toEqual({a: 1})` |
| `toStrictEqual(value)` | Deep equality + type checking | `expect([1]).toStrictEqual([1])` |

### Truthiness

| Matcher | Description | Example |
|---------|-------------|---------|
| `toBeTruthy()` | Value is truthy | `expect(1).toBeTruthy()` |
| `toBeFalsy()` | Value is falsy | `expect(0).toBeFalsy()` |
| `toBeNull()` | Value is null | `expect(null).toBeNull()` |
| `toBeUndefined()` | Value is undefined | `expect(undefined).toBeUndefined()` |
| `toBeDefined()` | Value is not undefined | `expect("a").toBeDefined()` |
| `toBeNaN()` | Value is NaN | `expect(NaN).toBeNaN()` |

### Numbers

| Matcher | Description | Example |
|---------|-------------|---------|
| `toBeGreaterThan(n)` | Value > n | `expect(5).toBeGreaterThan(3)` |
| `toBeGreaterThanOrEqual(n)` | Value >= n | `expect(5).toBeGreaterThanOrEqual(5)` |
| `toBeLessThan(n)` | Value < n | `expect(3).toBeLessThan(5)` |
| `toBeLessThanOrEqual(n)` | Value <= n | `expect(3).toBeLessThanOrEqual(3)` |
| `toBeCloseTo(n, digits?)` | Floating point equality | `expect(0.1 + 0.2).toBeCloseTo(0.3)` |

### Strings

| Matcher | Description | Example |
|---------|-------------|---------|
| `toContain(str)` | String contains substring | `expect("hello").toContain("ell")` |
| `toMatch(regex\|str)` | String matches regex/string | `expect("hello").toMatch(/^hel/)` |
| `toStartWith(str)` | String starts with | `expect("hello").toStartWith("hel")` |
| `toEndWith(str)` | String ends with | `expect("hello").toEndWith("llo")` |

### Arrays & Iterables

| Matcher | Description | Example |
|---------|-------------|---------|
| `toContain(item)` | Array contains item | `expect([1, 2]).toContain(1)` |
| `toContainEqual(item)` | Array contains equal object | `expect([{a: 1}]).toContainEqual({a: 1})` |
| `toHaveLength(n)` | Array/string has length | `expect([1, 2]).toHaveLength(2)` |

### Objects

| Matcher | Description | Example |
|---------|-------------|---------|
| `toHaveProperty(key, value?)` | Object has property | `expect({a: 1}).toHaveProperty("a")` |
| `toMatchObject(obj)` | Object contains subset | `expect({a: 1, b: 2}).toMatchObject({a: 1})` |

### Functions & Exceptions

| Matcher | Description | Example |
|---------|-------------|---------|
| `toThrow(msg?\|regex?)` | Function throws | `expect(() => { throw Error() }).toThrow()` |
| `toThrowError(msg?\|regex?)` | Alias for toThrow | Same as above |

### Type Checking

| Matcher | Description | Example |
|---------|-------------|---------|
| `toBeInstanceOf(Class)` | Value is instance of | `expect(new Date()).toBeInstanceOf(Date)` |
| `toBeTypeOf(type)` | typeof check | `expect("hi").toBeTypeOf("string")` |

### Snapshots

| Matcher | Description | Example |
|---------|-------------|---------|
| `toMatchSnapshot()` | Match stored snapshot | `expect(obj).toMatchSnapshot()` |
| `toMatchInlineSnapshot()` | Match inline snapshot | `expect(obj).toMatchInlineSnapshot()` |

---

## Mock Matchers

| Matcher | Description | Example |
|---------|-------------|---------|
| `toHaveBeenCalled()` | Mock was called | `expect(mockFn).toHaveBeenCalled()` |
| `toHaveBeenCalledTimes(n)` | Called exactly n times | `expect(mockFn).toHaveBeenCalledTimes(2)` |
| `toHaveBeenCalledWith(...args)` | Called with arguments | `expect(mockFn).toHaveBeenCalledWith("a", 1)` |
| `toHaveBeenLastCalledWith(...args)` | Last call had arguments | `expect(mockFn).toHaveBeenLastCalledWith("b")` |
| `toHaveBeenNthCalledWith(n, ...args)` | Nth call had arguments | `expect(mockFn).toHaveBeenNthCalledWith(1, "a")` |
| `toHaveReturned()` | Mock returned (didn't throw) | `expect(mockFn).toHaveReturned()` |
| `toHaveReturnedTimes(n)` | Returned n times | `expect(mockFn).toHaveReturnedTimes(2)` |
| `toHaveReturnedWith(value)` | Returned specific value | `expect(mockFn).toHaveReturnedWith("result")` |
| `toHaveLastReturnedWith(value)` | Last call returned value | `expect(mockFn).toHaveLastReturnedWith("last")` |

---

## jest-dom Matchers (DOM Testing)

Install: `bun add -d @testing-library/jest-dom`

Configure in `test-setup.ts`:

```typescript
import { expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";
expect.extend(matchers);
```

### Presence & Visibility

| Matcher | Description | Example |
|---------|-------------|---------|
| `toBeInTheDocument()` | Element exists in DOM | `expect(el).toBeInTheDocument()` |
| `toBeVisible()` | Element is visible | `expect(el).toBeVisible()` |
| `toBeEmpty()` | Element has no content | `expect(el).toBeEmpty()` |
| `toBeEmptyDOMElement()` | Element has no children | `expect(el).toBeEmptyDOMElement()` |

### Content

| Matcher | Description | Example |
|---------|-------------|---------|
| `toHaveTextContent(text)` | Element has text | `expect(el).toHaveTextContent("Hello")` |
| `toContainHTML(html)` | Element contains HTML | `expect(el).toContainHTML("<span>")` |
| `toContainElement(element)` | Contains another element | `expect(parent).toContainElement(child)` |

### Attributes

| Matcher | Description | Example |
|---------|-------------|---------|
| `toHaveAttribute(attr, value?)` | Has attribute | `expect(el).toHaveAttribute("href", "/")` |
| `toHaveClass(...classes)` | Has CSS class(es) | `expect(el).toHaveClass("btn", "primary")` |
| `toHaveStyle(css)` | Has inline style | `expect(el).toHaveStyle({ color: "red" })` |

### Forms

| Matcher | Description | Example |
|---------|-------------|---------|
| `toBeDisabled()` | Form element is disabled | `expect(button).toBeDisabled()` |
| `toBeEnabled()` | Form element is enabled | `expect(button).toBeEnabled()` |
| `toBeRequired()` | Input is required | `expect(input).toBeRequired()` |
| `toBeValid()` | Input passes validation | `expect(input).toBeValid()` |
| `toBeInvalid()` | Input fails validation | `expect(input).toBeInvalid()` |
| `toHaveValue(value)` | Input has value | `expect(input).toHaveValue("text")` |
| `toHaveDisplayValue(value)` | Select shows value | `expect(select).toHaveDisplayValue("Option")` |
| `toBeChecked()` | Checkbox is checked | `expect(checkbox).toBeChecked()` |
| `toBePartiallyChecked()` | Checkbox is indeterminate | `expect(checkbox).toBePartiallyChecked()` |

### Focus

| Matcher | Description | Example |
|---------|-------------|---------|
| `toHaveFocus()` | Element has focus | `expect(input).toHaveFocus()` |

### Accessibility

| Matcher | Description | Example |
|---------|-------------|---------|
| `toHaveAccessibleName(name)` | Has accessible name | `expect(button).toHaveAccessibleName("Submit")` |
| `toHaveAccessibleDescription(desc)` | Has description | `expect(el).toHaveAccessibleDescription("...")` |
| `toHaveAccessibleErrorMessage(msg)` | Has error message | `expect(input).toHaveAccessibleErrorMessage("...")` |
| `toHaveErrorMessage(msg)` | Alias | Same as above |

---

## Negation

All matchers can be negated with `.not`:

```typescript
expect(value).not.toBe(other);
expect(element).not.toBeInTheDocument();
expect(mockFn).not.toHaveBeenCalled();
```

---

## Asymmetric Matchers

Use in place of exact values:

```typescript
expect(obj).toEqual({
  name: expect.any(String),
  id: expect.any(Number),
  data: expect.anything(),
  items: expect.arrayContaining([1, 2]),
  config: expect.objectContaining({ key: "value" }),
  message: expect.stringContaining("error"),
  code: expect.stringMatching(/^ERR_/),
});
```

| Matcher | Description |
|---------|-------------|
| `expect.any(Constructor)` | Any instance of type |
| `expect.anything()` | Any value except null/undefined |
| `expect.arrayContaining([...])` | Array with at least these items |
| `expect.objectContaining({...})` | Object with at least these properties |
| `expect.stringContaining(str)` | String containing substring |
| `expect.stringMatching(regex)` | String matching pattern |
| `expect.not.arrayContaining([...])` | Array without these items |
| `expect.not.objectContaining({...})` | Object without these properties |

---

## Assertion Count

```typescript
test("ensures correct number of assertions", () => {
  expect.assertions(3);  // Exactly 3 assertions must run
  
  expect(a).toBe(1);
  expect(b).toBe(2);
  expect(c).toBe(3);
});

test("ensures at least one assertion", () => {
  expect.hasAssertions();  // At least 1 assertion must run
  
  items.forEach(item => {
    expect(item).toBeDefined();
  });
});
```

---

## Custom Matchers

Extend expect with custom matchers:

```typescript
import { expect } from "bun:test";

expect.extend({
  toBeWithinRange(received: number, floor: number, ceiling: number) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () =>
        `expected ${received} ${pass ? "not " : ""}to be within range ${floor} - ${ceiling}`,
    };
  },
});

// Usage
test("custom matcher", () => {
  expect(100).toBeWithinRange(90, 110);
});
```

TypeScript declaration:

```typescript
declare module "bun:test" {
  interface Matchers<T> {
    toBeWithinRange(floor: number, ceiling: number): void;
  }
}
```
