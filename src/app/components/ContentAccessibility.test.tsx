import { test, expect, describe } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const htmlDir = join(import.meta.dir, "../../../.next/server/app");

describe("Content Accessibility", () => {
  test("blog listing page has no generic alt text", async () => {
    const html = await readFile(join(htmlDir, "blog.html"), "utf-8");
    expect(html).not.toContain('alt="Featured Image"');
  });

  test("blog listing page has descriptive alt text from post titles", async () => {
    const html = await readFile(join(htmlDir, "blog.html"), "utf-8");
    // Post titles appear as alt text
    expect(html).toContain('alt="From Technical Debt to Technical Direction');
    expect(html).toContain('alt="Hello World! I finally beat procrastination"');
  });

  test("read more links have descriptive aria-label", async () => {
    const html = await readFile(join(htmlDir, "blog.html"), "utf-8");
    expect(html).toContain('aria-label="Read more: From Technical Debt');
    expect(html).toContain('aria-label="Read more: Hello World');
  });

  test("not-found page has descriptive alt text", async () => {
    const html = await readFile(join(htmlDir, "_not-found.html"), "utf-8");
    expect(html).toContain('alt="Page not found illustration"');
    expect(html).not.toContain('alt="404 Image"');
  });
});
