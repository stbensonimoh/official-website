#!/usr/bin/env bun
// Tests for scripts/check-sitemap-target.mjs.
//
// Every case spawns the real script with node against a fixture written to a
// fresh temporary directory, so the advertised-sitemap property stays covered
// without committing fixture files. Each fixture carries its own
// astro.config.mjs, passed through ASTRO_CONFIG_PATH, so the host comparison
// never depends on the repository's real site value.

import { afterAll, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(new URL("./check-sitemap-target.mjs", import.meta.url));
const SITE = "https://example.com";
const SITEMAP =
  '<?xml version="1.0"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></sitemapindex>\n';
const fixtureDirs = [];

function makeFixtureDir() {
  const dir = mkdtempSync(join(tmpdir(), "sitemap-target-check-"));
  fixtureDirs.push(dir);
  return dir;
}

// Write a fixture build directory. `config` holds the config body; pass null
// for a config that should not exist. `files` maps names to contents, `dirs`
// creates empty directories.
function makeFixture({
  robots,
  files = {},
  dirs = [],
  config = `export default { site: "${SITE}" };\n`,
  configName = "astro.config.mjs",
} = {}) {
  const dir = makeFixtureDir();
  if (robots !== undefined) writeFileSync(join(dir, "robots.txt"), robots);
  if (config !== null) writeFileSync(join(dir, configName), config);
  for (const name of dirs) mkdirSync(join(dir, name), { recursive: true });
  for (const [name, contents] of Object.entries(files)) writeFileSync(join(dir, name), contents);
  return dir;
}

function runCheck(dir, configPath = join(dir, "astro.config.mjs")) {
  const result = spawnSync("node", [SCRIPT, dir], {
    encoding: "utf8",
    env: { ...process.env, ASTRO_CONFIG_PATH: configPath },
  });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

function expectPass(dir) {
  const { status, stdout } = runCheck(dir);
  expect(status).toBe(0);
  expect(stdout).toContain("sitemap URL(s)");
}

function expectFail(dir, message, configPath) {
  const { status, stderr } = runCheck(dir, configPath);
  expect(status).toBe(1);
  expect(stderr).toContain(message);
}

const okRobots = (url) => `User-agent: *\nAllow: /\n\nSitemap: ${url}\n`;

afterAll(() => {
  for (const dir of fixtureDirs) rmSync(dir, { recursive: true, force: true });
});

describe("advertised sitemap", () => {
  test("passes when the advertised sitemap exists", () => {
    expectPass(
      makeFixture({
        robots: okRobots(`${SITE}/sitemap-index.xml`),
        files: { "sitemap-index.xml": SITEMAP },
      }),
    );
  });

  test("fails when the advertised sitemap is missing", () => {
    expectFail(makeFixture({ robots: okRobots(`${SITE}/sitemap-index.xml`) }), "does not exist");
  });

  test("fails when the advertised sitemap is empty", () => {
    expectFail(
      makeFixture({
        robots: okRobots(`${SITE}/sitemap-index.xml`),
        files: { "sitemap-index.xml": "" },
      }),
      "is empty",
    );
  });

  test("fails when the advertised path is a directory", () => {
    expectFail(
      makeFixture({ robots: okRobots(`${SITE}/sitemap-index.xml`), dirs: ["sitemap-index.xml"] }),
      "is not a file",
    );
  });

  test("fails when a relative advertised path escapes the build directory", () => {
    expectFail(makeFixture({ robots: okRobots("../secret.xml") }), "resolves outside");
  });
});

describe("robots.txt", () => {
  test("fails when robots.txt is missing", () => {
    expectFail(makeFixture(), "no robots.txt");
  });

  test("fails when robots.txt is a directory", () => {
    expectFail(makeFixture({ dirs: ["robots.txt"] }), "robots.txt is not a readable file");
  });

  test("fails when robots.txt has no Sitemap: line", () => {
    expectFail(makeFixture({ robots: "User-agent: *\nAllow: /\n" }), "no Sitemap: line");
  });

  test("fails when the Sitemap: line has no URL", () => {
    expectFail(makeFixture({ robots: "User-agent: *\nSitemap:\n" }), "no URL");
  });

  test("accepts a lowercase sitemap: field", () => {
    expectPass(
      makeFixture({
        robots: `sitemap: ${SITE}/sitemap-index.xml\n`,
        files: { "sitemap-index.xml": SITEMAP },
      }),
    );
  });

  test("checks every Sitemap: line, not just the first", () => {
    expectFail(
      makeFixture({
        robots: okRobots(`${SITE}/sitemap-index.xml`) + `Sitemap: ${SITE}/missing.xml\n`,
        files: { "sitemap-index.xml": SITEMAP },
      }),
      "missing.xml",
    );
  });
});

describe("relative and decorated paths", () => {
  test("passes for a root-relative path", () => {
    expectPass(
      makeFixture({ robots: okRobots("/sitemap-index.xml"), files: { "sitemap-index.xml": SITEMAP } }),
    );
  });

  test("passes for a relative path without a leading slash", () => {
    expectPass(
      makeFixture({ robots: okRobots("sitemap-index.xml"), files: { "sitemap-index.xml": SITEMAP } }),
    );
  });

  test("passes when the advertised path carries a query string", () => {
    expectPass(
      makeFixture({
        robots: okRobots("/sitemap-index.xml?v=2"),
        files: { "sitemap-index.xml": SITEMAP },
      }),
    );
    expectPass(
      makeFixture({
        robots: okRobots(`${SITE}/sitemap-index.xml?v=2`),
        files: { "sitemap-index.xml": SITEMAP },
      }),
    );
  });

  test("passes when the advertised path carries a fragment", () => {
    expectPass(
      makeFixture({
        robots: okRobots("/sitemap-index.xml#top"),
        files: { "sitemap-index.xml": SITEMAP },
      }),
    );
  });
});

describe("origin comparison", () => {
  test("fails when the advertised host differs from the config site", () => {
    expectFail(
      makeFixture({
        robots: okRobots("https://other.example/sitemap-index.xml"),
        files: { "sitemap-index.xml": SITEMAP },
      }),
      "but astro.config.mjs site is https://example.com",
    );
  });

  test("fails when the advertised scheme differs from the config site", () => {
    expectFail(
      makeFixture({
        robots: okRobots("http://example.com/sitemap-index.xml"),
        files: { "sitemap-index.xml": SITEMAP },
      }),
      "on http://example.com",
    );
  });

  test("fails when the advertised port is not the site port", () => {
    expectFail(
      makeFixture({
        robots: okRobots("https://example.com:8443/sitemap-index.xml"),
        files: { "sitemap-index.xml": SITEMAP },
      }),
      "on https://example.com:8443",
    );
  });

  test("passes when the advertised URL spells out the default port", () => {
    expectPass(
      makeFixture({
        robots: okRobots("https://example.com:443/sitemap-index.xml"),
        files: { "sitemap-index.xml": SITEMAP },
      }),
    );
  });

  test("fails when the config cannot be loaded", () => {
    const dir = makeFixture({
      robots: okRobots(`${SITE}/sitemap-index.xml`),
      files: { "sitemap-index.xml": SITEMAP },
    });
    expectFail(dir, "could not load", join(dir, "missing-config.mjs"));
  });

  test("fails when the config has no site", () => {
    expectFail(
      makeFixture({
        robots: okRobots(`${SITE}/sitemap-index.xml`),
        files: { "sitemap-index.xml": SITEMAP },
        config: "export default {};\n",
      }),
      "has no site value",
    );
  });

  test("fails when the config site is not an absolute URL", () => {
    expectFail(
      makeFixture({
        robots: okRobots(`${SITE}/sitemap-index.xml`),
        files: { "sitemap-index.xml": SITEMAP },
        config: 'export default { site: "not-a-url" };\n',
      }),
      "site is not an absolute URL",
    );
  });
});

describe("build directory guards", () => {
  test("fails when the build directory is missing", () => {
    const missing = join(makeFixtureDir(), "missing");
    const { status, stderr } = runCheck(missing, join(missing, "astro.config.mjs"));
    expect(status).toBe(1);
    expect(stderr).toContain("no build output directory");
  });
});
