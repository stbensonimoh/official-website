import { test, expect, describe } from "bun:test";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

const compDir = join(import.meta.dir);

describe("Icon Accessibility", () => {
  test("Header hamburger button icons have aria-hidden", async () => {
    const src = await readFile(join(compDir, "Header.tsx"), "utf-8");
    expect(src).toContain('FiX aria-hidden="true"');
    expect(src).toContain('FiMenu aria-hidden="true"');
  });

  test("SocialIcons all have aria-hidden on icon components", async () => {
    const src = await readFile(join(compDir, "SocialIcons.tsx"), "utf-8");
    expect(src).toContain('FaGithub aria-hidden="true"');
    expect(src).toContain('FaLinkedinIn aria-hidden="true"');
    expect(src).toContain('FaXTwitter aria-hidden="true"');
    expect(src).toContain('FaInstagram aria-hidden="true"');
  });

  test("ThemeToggle SVG icons have aria-hidden", async () => {
    const src = await readFile(join(compDir, "ThemeToggle.tsx"), "utf-8");
    const ariaHiddenCount = (src.match(/aria-hidden="true"/g) || []).length;
    expect(ariaHiddenCount).toBe(3);
  });

  test("SocialIcons link elements retain their aria-label", async () => {
    const src = await readFile(join(compDir, "SocialIcons.tsx"), "utf-8");
    expect(src).toContain('aria-label="GitHub Profile"');
    expect(src).toContain('aria-label="LinkedIn Profile"');
    expect(src).toContain('aria-label="X Profile"');
    expect(src).toContain('aria-label="Instagram Profile"');
  });
});
