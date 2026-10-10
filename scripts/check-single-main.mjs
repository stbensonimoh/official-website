#!/usr/bin/env node
// Fail when a built page does not contain exactly one <main> landmark.
//
// The Lighthouse `landmark-one-main` assertion cannot enforce this. Lighthouse
// 12.6.1 reports the audit as `notApplicable` with a null score when a main is
// present, and as `informative` with a normalised score of 1 when it is missing.
// LHCI 0.15.1 maps `notApplicable` to 1 and reads a numeric score before the
// display mode, so `minScore: 1` passes either way. This script reads the built
// HTML instead. Pass a directory to check a fixture, or run it with no argument
// to check dist/client.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.argv[2] ?? "dist/client";
const MAIN_TAG = /<main[\s>]/g;
// Script, style, and comment bodies can mention `<main>` without rendering a
// landmark, so strip them before counting.
const NON_MARKUP = [
  /<script\b[\s\S]*?<\/script>/gi,
  /<style\b[\s\S]*?<\/style>/gi,
  /<!--[\s\S]*?-->/g,
];

function fail(message) {
  console.error(`single-main check failed: ${message}`);
  process.exit(1);
}

if (!existsSync(ROOT) || !statSync(ROOT).isDirectory()) {
  fail(`no build output directory at ${ROOT}. Run the build first.`);
}

const pages = [];
function collectHtml(dir) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) collectHtml(path);
    else if (entry.isFile() && entry.name.endsWith(".html")) pages.push(path);
  }
}
collectHtml(ROOT);

if (pages.length === 0) {
  fail(`no .html files under ${ROOT}. Run the build first.`);
}

const offenders = [];
for (const page of pages) {
  let html = readFileSync(page, "utf8");
  for (const pattern of NON_MARKUP) html = html.replace(pattern, "");
  const count = (html.match(MAIN_TAG) ?? []).length;
  if (count !== 1) offenders.push(`${relative(ROOT, page)} (found ${count})`);
}

if (offenders.length > 0) {
  console.error(`single-main check failed: ${offenders.length} page(s) without exactly one <main>:`);
  for (const offender of offenders) console.error(`  - ${offender}`);
  process.exit(1);
}

console.log(`Checked ${pages.length} page(s): exactly one <main> each.`);
