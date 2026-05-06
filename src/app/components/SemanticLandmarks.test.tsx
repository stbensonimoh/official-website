import { test, expect, describe } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const htmlDir = join(import.meta.dir, "../../../.next/server/app");

describe("Semantic Landmarks", () => {
  test("homepage has exactly one main landmark", async () => {
    const html = await readFile(join(htmlDir, "index.html"), "utf-8");
    const mainMatches = html.match(/<main\b/g);
    expect(mainMatches).toBeTruthy();
    expect(mainMatches!.length).toBe(1);
  });

  test("main element has an id for skip link targeting", async () => {
    const html = await readFile(join(htmlDir, "index.html"), "utf-8");
    expect(html).toContain('<main id="main-content"');
  });

  test("skip-to-content link text is present", async () => {
    const html = await readFile(join(htmlDir, "index.html"), "utf-8");
    expect(html).toContain("Skip to main content");
  });

  test("skip link targets main-content id", async () => {
    const html = await readFile(join(htmlDir, "index.html"), "utf-8");
    expect(html).toContain('href="#main-content"');
  });

  test("skip link has sr-only class", async () => {
    const html = await readFile(join(htmlDir, "index.html"), "utf-8");
    expect(html).toContain("sr-only");
  });

  test("blog post page uses one main landmark", async () => {
    const html = await readFile(
      join(htmlDir, "from-technical-debt-to-technical-direction-my-journey-at-350org.html"),
      "utf-8"
    );
    const mainMatches = html.match(/<main\b/g);
    expect(mainMatches).toBeTruthy();
    expect(mainMatches!.length).toBe(1);
  });

  test("about page uses layout main landmark", async () => {
    const html = await readFile(join(htmlDir, "about.html"), "utf-8");
    expect(html).toContain('<main id="main-content"');
    const mainMatches = html.match(/<main\b/g);
    expect(mainMatches!.length).toBe(1);
  });
});
