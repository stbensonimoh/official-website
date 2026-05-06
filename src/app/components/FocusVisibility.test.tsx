import { test, expect, describe } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const compDir = join(import.meta.dir);

describe("Focus Visibility", () => {
  test("Button internal variant has focus-visible styles", async () => {
    const src = await readFile(join(compDir, "Button.tsx"), "utf-8");
    expect(src).toContain("focus-visible:outline-none");
    expect(src).toContain("focus-visible:ring-2");
    expect(src).toContain("focus-visible:ring-primary");
  });

  test("All three Button variants have focus-visible styles", async () => {
    const src = await readFile(join(compDir, "Button.tsx"), "utf-8");
    const focusCount = (src.match(/focus-visible:ring-2/g) || []).length;
    // Three variants: internal Link, external anchor, button element
    expect(focusCount).toBe(3);
  });

  test("tailwind.css nav links have focus-visible styles", async () => {
    const src = await readFile(
      join(import.meta.dir, "../tailwind.css"),
      "utf-8"
    );
    expect(src).toContain("focus-visible:outline-none");
    expect(src).toContain("focus-visible:ring-2");
    expect(src).toContain("focus-visible:ring-primary");
  });
});
