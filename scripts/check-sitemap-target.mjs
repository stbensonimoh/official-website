#!/usr/bin/env node
// Fail when robots.txt advertises a sitemap that is not in the build.
//
// Reads robots.txt from the directory argument (default dist/client), takes
// every `Sitemap:` line, resolves each advertised URL to a file under that
// directory, and fails when the file is missing, is not a file, or is empty.
// A robots.txt with no usable `Sitemap:` line fails too: a crawler that finds
// no pointer is as unserved as one that finds a broken pointer.
//
// The advertised host must match the `site` value in astro.config.mjs. A
// mismatch is fatal, not a warning: crawlers fetch the URL exactly as
// advertised, so a wrong host loses the sitemap the same way a wrong path
// does. The config is imported as a module, the same way Astro reads it,
// instead of being pattern-matched, so quote style, comments, or a computed
// value cannot fool the comparison. The check runs after a successful build in
// the same job, and that build imports the same file, so an import failure is
// a real failure rather than a new way to go red.
//
// Relative values resolve from the directory root. Query strings and fragments
// are stripped before the file lookup: a file on disk has neither, and static
// hosts ignore both.
//
// Known limits, all fail-closed:
// - Percent-encoded path segments are matched literally, not decoded.
// - A sitemap index is not followed. The advertised file itself must be
//   non-empty; its contents are the sitemap integration's business.
// - Hostnames are compared, so a scheme or port difference is not reported.
//   This site advertises https on the default port.
//
// Pass a directory to check a fixture, or run it with no argument to check
// dist/client. ASTRO_CONFIG_PATH overrides the config location for tests.

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = resolve(process.argv[2] ?? "dist/client");
const CONFIG_PATH = resolve(
  process.env.ASTRO_CONFIG_PATH ?? fileURLToPath(new URL("../astro.config.mjs", import.meta.url)),
);

function fail(message) {
  console.error(`sitemap-target check failed: ${message}`);
  process.exit(1);
}

// Every `Sitemap:` line counts, not just the first: a second broken pointer
// would otherwise pass silently.
function readSitemapValues(robotsPath) {
  const values = [];
  let sawLine = false;
  for (const line of readFileSync(robotsPath, "utf8").split(/\r?\n/)) {
    const match = /^\s*sitemap\s*:\s*(.*)$/i.exec(line);
    if (!match) continue;
    sawLine = true;
    const value = match[1].trim();
    if (value !== "") values.push(value);
  }
  if (!sawLine) fail("robots.txt has no Sitemap: line. Add one that points at the built sitemap.");
  if (values.length === 0) fail("robots.txt has a Sitemap: line with no URL.");
  return values;
}

// Split an advertised value into its host and path. Absolute URLs keep their
// host; relative values have none, so the host comparison is skipped for them.
function splitValue(value) {
  try {
    const url = new URL(value);
    return { host: url.hostname.toLowerCase(), pathname: url.pathname };
  } catch {
    return { host: null, pathname: value.split(/[?#]/)[0] };
  }
}

if (!existsSync(ROOT) || !statSync(ROOT).isDirectory()) {
  fail(`no build output directory at ${ROOT}. Run the build first.`);
}

const robotsPath = join(ROOT, "robots.txt");
if (!existsSync(robotsPath)) {
  fail(`no robots.txt under ${ROOT}. The build copies it from public/.`);
}

const values = readSitemapValues(robotsPath);

let config;
try {
  config = await import(pathToFileURL(CONFIG_PATH).href);
} catch (error) {
  fail(`could not load ${CONFIG_PATH}: ${error.message}`);
}
const site = config.default?.site;
if (typeof site !== "string" || site === "") {
  fail(`${CONFIG_PATH} has no site value. The sitemap integration needs one.`);
}
let siteHost;
try {
  siteHost = new URL(site).hostname.toLowerCase();
} catch {
  fail(`${CONFIG_PATH} site is not an absolute URL: ${site}`);
}

const rootWithSep = ROOT.endsWith(sep) ? ROOT : ROOT + sep;
for (const value of values) {
  const { host, pathname } = splitValue(value);
  if (host !== null && host !== siteHost) {
    fail(
      `robots.txt advertises ${value} on host ${host}, but astro.config.mjs site is ${siteHost}.`,
    );
  }
  const target = resolve(ROOT, pathname.startsWith("/") ? `.${pathname}` : `./${pathname}`);
  if (target !== ROOT && !target.startsWith(rootWithSep)) {
    fail(`robots.txt advertises ${value}, which resolves outside ${ROOT}.`);
  }
  if (!existsSync(target)) {
    fail(`robots.txt advertises ${value}, but ${target} does not exist under ${ROOT}.`);
  }
  const stats = statSync(target);
  if (!stats.isFile()) {
    fail(`robots.txt advertises ${value}, but ${target} is not a file.`);
  }
  if (stats.size === 0) {
    fail(`robots.txt advertises ${value}, but ${target} is empty.`);
  }
}

console.log(`Checked ${values.length} sitemap URL(s): each exists under ${ROOT} and is not empty.`);
