# Comprehensive Test Examples

This file contains detailed test examples for the Bun testing skill. Reference these patterns when writing tests for this project.

## Testing Utility Functions

### Posts Library

```typescript
// src/__tests__/lib/posts.test.ts
import { describe, test, expect, mock, beforeEach } from "bun:test";
import { getAllPosts, getPostBySlug } from "@/lib/posts";

// Mock file system
mock.module("fs", () => ({
  readdirSync: mock(() => ["hello-world.mdx", "second-post.mdx"]),
  readFileSync: mock((path: string) => {
    if (path.includes("hello-world")) {
      return `---
title: "Hello World!"
date: "2024-01-15"
excerpt: "My first blog post"
tags: ["intro", "welcome"]
---
This is the content of the first post.`;
    }
    return `---
title: "Second Post"
date: "2024-02-20"
excerpt: "Another great post"
tags: ["tutorial"]
---
Content of the second post.`;
  }),
}));

describe("posts utilities", () => {
  test("getAllPosts returns all posts with parsed frontmatter", () => {
    const posts = getAllPosts();

    expect(posts).toHaveLength(2);
    expect(posts[0]).toHaveProperty("frontmatter");
    expect(posts[0]).toHaveProperty("slug");
    expect(posts[0]).toHaveProperty("content");
  });

  test("posts are sorted by date (newest first)", () => {
    const posts = getAllPosts();
    
    const dates = posts.map(p => new Date(p.frontmatter.date));
    for (let i = 1; i < dates.length; i++) {
      expect(dates[i - 1].getTime()).toBeGreaterThanOrEqual(dates[i].getTime());
    }
  });

  test("slug is generated from title", () => {
    const posts = getAllPosts();
    const helloPost = posts.find(p => p.frontmatter.title === "Hello World!");
    
    expect(helloPost?.slug).toBe("hello-world");
  });

  test("getPostBySlug returns correct post", () => {
    const post = getPostBySlug("hello-world");
    
    expect(post).toBeDefined();
    expect(post?.frontmatter.title).toBe("Hello World!");
  });

  test("getPostBySlug returns undefined for non-existent slug", () => {
    const post = getPostBySlug("non-existent-post");
    expect(post).toBeUndefined();
  });

  test("reading time is calculated", () => {
    const posts = getAllPosts();
    
    posts.forEach(post => {
      expect(post).toHaveProperty("readingTime");
      expect(typeof post.readingTime).toBe("string");
    });
  });
});
```

### Analytics Library (Clarity)

```typescript
// src/__tests__/lib/clarity.test.ts
import { describe, test, expect, beforeEach, mock } from "bun:test";

const mockClarityEvent = mock();
const mockClaritySetTag = mock();
const mockClarityUpgrade = mock();

mock.module("@microsoft/clarity", () => ({
  default: {
    event: mockClarityEvent,
    setTag: mockClaritySetTag,
    upgrade: mockClarityUpgrade,
  },
}));

// Import after mocking
import { trackEvent, trackNavigation, trackBlogClick } from "@/lib/clarity";

describe("clarity analytics", () => {
  beforeEach(() => {
    mockClarityEvent.mockClear();
    mockClaritySetTag.mockClear();
    // Reset window
    global.window = { clarity: () => {} } as any;
  });

  describe("trackEvent", () => {
    test("calls Clarity.event when window.clarity exists", () => {
      trackEvent("test_event");
      expect(mockClarityEvent).toHaveBeenCalledWith("test_event");
    });

    test("does not throw when window is undefined (SSR)", () => {
      global.window = undefined as any;
      expect(() => trackEvent("test_event")).not.toThrow();
      expect(mockClarityEvent).not.toHaveBeenCalled();
    });
  });

  describe("trackNavigation", () => {
    test("normalizes navigation name to lowercase with prefix", () => {
      trackNavigation("About");
      expect(mockClarityEvent).toHaveBeenCalledWith("nav_click_about");
    });

    test("handles special characters in name", () => {
      trackNavigation("Contact Us!");
      expect(mockClarityEvent).toHaveBeenCalledWith("nav_click_contact_us");
    });
  });

  describe("trackBlogClick", () => {
    test("tracks blog click and sets tag", () => {
      trackBlogClick("my-awesome-post");
      
      expect(mockClarityEvent).toHaveBeenCalledWith("blog_click_my_awesome_post");
      expect(mockClaritySetTag).toHaveBeenCalledWith("last_blog_clicked", "my-awesome-post");
    });
  });
});
```

## Testing React Components

### Button Component

```typescript
// src/__tests__/components/Button.test.tsx
import { describe, test, expect, mock, beforeEach } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "@/app/components/Button";

// Mock Next.js Link
mock.module("next/link", () => ({
  default: ({ children, href, ...props }: any) => (
    <a href={href} {...props}>{children}</a>
  ),
}));

describe("Button component", () => {
  test("renders as button element by default", () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });

  test("handles click events", () => {
    const handleClick = mock();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("applies custom className", () => {
    render(<Button className="custom-class">Styled</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toHaveClass("custom-class");
  });

  test("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled</Button>);
    
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  test("renders as Next.js Link for internal navigation", () => {
    render(<Button type="internal" href="/about">Go to About</Button>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/about");
    expect(link).toHaveTextContent("Go to About");
  });

  test("renders as anchor for external links", () => {
    render(<Button type="external" href="https://example.com">Visit</Button>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "https://example.com");
  });

  test("external links open in new tab with security attributes", () => {
    render(<Button type="external" href="https://example.com">Visit</Button>);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
```

### Header Component

```typescript
// src/__tests__/components/Header.test.tsx
import { describe, test, expect, beforeEach, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/app/components/Header";

// Mock navigation
mock.module("next/navigation", () => ({
  usePathname: () => "/",
}));

// Mock analytics
const mockTrackNavigation = mock();
mock.module("@/lib/clarity", () => ({
  trackNavigation: mockTrackNavigation,
}));

describe("Header component", () => {
  beforeEach(() => {
    mockTrackNavigation.mockClear();
  });

  test("renders navigation with all menu items", () => {
    render(<Header />);
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  test("highlights current page in navigation", () => {
    render(<Header />);
    
    const homeLink = screen.getByText("Home").closest("a");
    expect(homeLink).toHaveClass("active"); // Adjust based on actual class
  });

  test("tracks navigation clicks", () => {
    render(<Header />);
    
    fireEvent.click(screen.getByText("About"));
    expect(mockTrackNavigation).toHaveBeenCalledWith("About");
  });

  test("renders logo", () => {
    render(<Header />);
    
    // Adjust based on actual logo implementation
    const logo = screen.getByRole("link", { name: /logo|home/i });
    expect(logo).toHaveAttribute("href", "/");
  });
});
```

### ThemeToggle Component

```typescript
// src/__tests__/components/ThemeToggle.test.tsx
import { describe, test, expect, beforeEach, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import ThemeToggle from "@/app/components/ThemeToggle";
import { ThemeProvider } from "@/app/context/ThemeContext";

// Helper to render with provider
const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider>{ui}</ThemeProvider>);
};

describe("ThemeToggle component", () => {
  beforeEach(() => {
    // Mock localStorage
    const store: Record<string, string> = {};
    global.localStorage = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => { store[key] = value; },
      removeItem: (key: string) => { delete store[key]; },
      clear: () => { Object.keys(store).forEach(k => delete store[k]); },
    } as Storage;
  });

  test("renders toggle button", () => {
    renderWithTheme(<ThemeToggle />);
    
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("cycles through themes on click: light → dark → system", () => {
    renderWithTheme(<ThemeToggle />);
    
    const button = screen.getByRole("button");
    
    // Initial state depends on localStorage/system preference
    // Click cycles through themes
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);
    
    // Should be back to initial state after 3 clicks
    expect(button).toBeInTheDocument();
  });

  test("has accessible label", () => {
    renderWithTheme(<ThemeToggle />);
    
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-label");
  });
});
```

## Testing Context Providers

### ThemeContext

```typescript
// src/__tests__/context/ThemeContext.test.tsx
import { describe, test, expect, beforeEach, mock } from "bun:test";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { ThemeProvider, useTheme } from "@/app/context/ThemeContext";

// Test consumer component
const TestConsumer = () => {
  const { theme, toggleTheme, setTheme } = useTheme();
  return (
    <div>
      <span data-testid="current-theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
      <button onClick={() => setTheme("dark")}>Set Dark</button>
      <button onClick={() => setTheme("light")}>Set Light</button>
      <button onClick={() => setTheme("system")}>Set System</button>
    </div>
  );
};

describe("ThemeContext", () => {
  let mockLocalStorage: Record<string, string>;

  beforeEach(() => {
    mockLocalStorage = {};
    global.localStorage = {
      getItem: (key: string) => mockLocalStorage[key] || null,
      setItem: (key: string, value: string) => { mockLocalStorage[key] = value; },
      removeItem: (key: string) => { delete mockLocalStorage[key]; },
      clear: () => { mockLocalStorage = {}; },
    } as Storage;

    // Mock matchMedia for system theme detection
    global.matchMedia = mock((query: string) => ({
      matches: query.includes("dark"),
      media: query,
      onchange: null,
      addListener: mock(),
      removeListener: mock(),
      addEventListener: mock(),
      removeEventListener: mock(),
      dispatchEvent: mock(() => true),
    })) as any;
  });

  test("provides theme context to children", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId("current-theme")).toBeInTheDocument();
  });

  test("toggleTheme cycles through light → dark → system", () => {
    mockLocalStorage.theme = "light";
    
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    
    const toggleButton = screen.getByText("Toggle");
    
    // light → dark
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    
    // dark → system
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("current-theme").textContent).toBe("system");
    
    // system → light
    fireEvent.click(toggleButton);
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
  });

  test("setTheme directly sets the theme", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    
    fireEvent.click(screen.getByText("Set Dark"));
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
    
    fireEvent.click(screen.getByText("Set Light"));
    expect(screen.getByTestId("current-theme").textContent).toBe("light");
  });

  test("persists theme to localStorage", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    
    fireEvent.click(screen.getByText("Set Dark"));
    expect(mockLocalStorage.theme).toBe("dark");
  });

  test("restores theme from localStorage on mount", () => {
    mockLocalStorage.theme = "dark";
    
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    
    expect(screen.getByTestId("current-theme").textContent).toBe("dark");
  });

  test("applies theme to document element", () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>
    );
    
    fireEvent.click(screen.getByText("Set Dark"));
    expect(document.documentElement.getAttribute("data-theme")).toBe("dark");
  });
});
```

## Testing Next.js Pages

### About Page Metadata

```typescript
// src/__tests__/pages/about.test.ts
import { describe, test, expect } from "bun:test";
import { generateMetadata } from "@/app/about/page";

describe("About page", () => {
  describe("generateMetadata", () => {
    test("returns title containing 'About'", async () => {
      const metadata = await generateMetadata();
      expect(String(metadata.title)).toContain("About");
    });

    test("returns non-empty description", async () => {
      const metadata = await generateMetadata();
      expect(metadata.description).toBeDefined();
      expect(metadata.description?.length).toBeGreaterThan(10);
    });

    test("includes OpenGraph metadata", async () => {
      const metadata = await generateMetadata();
      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe(metadata.title);
    });
  });
});
```

### Blog Page

```typescript
// src/__tests__/pages/blog.test.ts
import { describe, test, expect, mock } from "bun:test";
import { generateMetadata } from "@/app/blog/page";

// Mock posts to control test data
mock.module("@/lib/posts", () => ({
  getAllPosts: mock(() => [
    {
      slug: "test-post",
      frontmatter: { title: "Test Post", date: "2024-01-01", excerpt: "Test" },
      readingTime: "1 min read",
    },
  ]),
}));

describe("Blog page", () => {
  describe("generateMetadata", () => {
    test("returns title containing 'Blog'", async () => {
      const metadata = await generateMetadata();
      expect(String(metadata.title)).toContain("Blog");
    });
  });
});
```

## Integration Test Example

```typescript
// src/__tests__/integration/navigation.test.tsx
import { describe, test, expect, mock } from "bun:test";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "@/app/components/Header";
import { ThemeProvider } from "@/app/context/ThemeContext";

// Mock navigation with dynamic pathname
let currentPath = "/";
mock.module("next/navigation", () => ({
  usePathname: () => currentPath,
}));

mock.module("@/lib/clarity", () => ({
  trackNavigation: mock(),
}));

describe("Navigation integration", () => {
  test("header renders with theme provider", () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("About")).toBeInTheDocument();
  });

  test("theme toggle works within header context", () => {
    render(
      <ThemeProvider>
        <Header />
      </ThemeProvider>
    );
    
    // Find theme toggle button (adjust selector based on implementation)
    const themeButton = screen.getByRole("button", { name: /theme/i });
    expect(themeButton).toBeInTheDocument();
  });
});
```

## Best Practices Demonstrated

### 1. Arrange-Act-Assert Pattern

```typescript
test("example of AAA pattern", () => {
  // Arrange - set up test data and conditions
  const input = { name: "test" };
  
  // Act - perform the action being tested
  const result = processInput(input);
  
  // Assert - verify the expected outcome
  expect(result).toBe("processed: test");
});
```

### 2. Testing Error States

```typescript
test("handles missing data gracefully", () => {
  // Arrange
  mock.module("fs", () => ({
    readdirSync: mock(() => { throw new Error("ENOENT"); }),
  }));
  
  // Act & Assert
  expect(() => getAllPosts()).toThrow("ENOENT");
});
```

### 3. Testing Edge Cases

```typescript
describe("edge cases", () => {
  test("handles empty array", () => {
    expect(processItems([])).toEqual([]);
  });
  
  test("handles null input", () => {
    expect(processItems(null)).toEqual([]);
  });
  
  test("handles special characters", () => {
    const result = slugify("Hello, World! @#$%");
    expect(result).toBe("hello-world");
  });
});
```
