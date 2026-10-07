#!/usr/bin/env node
// Fail the build when a render-blocking request comes from a third-party host.
//
// LHCI bundles its own Lighthouse. Lighthouse 12 emits `render-blocking-resources`;
// Lighthouse 13 replaced it with `render-blocking-insight`. This script accepts
// either id and fails loudly when neither is present, so a version bump cannot
// turn the guard into a silent no-op. It also fails on a short or malformed
// report set, for the same reason.

import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const REPORT_DIR = process.env.LHCI_DIR ?? ".lighthouseci";
const FIRST_PARTY_HOSTS = new Set([
  "localhost",
  "127.0.0.1",
  "stbensonimoh.com",
  "www.stbensonimoh.com",
]);
// Async third parties (Clarity, the Cloudflare beacon) never appear in the
// render-blocking audit. Add a host here only if a blocking request is accepted.
const ALLOWED_THIRD_PARTY_HOSTS = new Set([]);
const RENDER_BLOCKING_AUDIT_IDS = ["render-blocking-resources", "render-blocking-insight"];

function fail(message) {
  console.error(`render-blocking check failed: ${message}`);
  process.exit(1);
}

if (!existsSync(REPORT_DIR)) {
  fail(`no Lighthouse report directory at ${REPORT_DIR}. Run Lighthouse CI first.`);
}

const reports = readdirSync(REPORT_DIR).filter((name) => /^lhr-.*\.json$/.test(name));
if (reports.length === 0) {
  fail(`no lhr-*.json reports in ${REPORT_DIR}.`);
}

// Expect one report per URL per run. `LHCI_MIN_REPORTS` overrides the value for
// synthetic tests and for partial local runs.
let minReports = Number(process.env.LHCI_MIN_REPORTS ?? Number.NaN);
if (Number.isNaN(minReports)) {
  try {
    const config = JSON.parse(readFileSync("lighthouserc.json", "utf8"));
    const urls = config.ci?.collect?.url ?? [];
    const runs = config.ci?.collect?.numberOfRuns ?? 1;
    minReports = urls.length * runs;
  } catch {
    minReports = 1;
  }
}
if (reports.length < minReports) {
  fail(`${REPORT_DIR} holds ${reports.length} report(s); expected at least ${minReports}.`);
}

const problems = new Set();

for (const name of reports) {
  const report = JSON.parse(readFileSync(join(REPORT_DIR, name), "utf8"));
  const auditId = RENDER_BLOCKING_AUDIT_IDS.find((id) => report.audits?.[id]);
  if (!auditId) {
    fail(
      `${name}: no ${RENDER_BLOCKING_AUDIT_IDS.join(" or ")} audit in the report (Lighthouse ${report.lighthouseVersion}). Update the audit id list.`,
    );
  }

  const items = report.audits[auditId].details?.items;
  if (!Array.isArray(items)) {
    fail(`${name}: ${auditId} has no items array. The report shape changed.`);
  }

  for (const item of items) {
    if (!item.url) {
      fail(`${name}: a render-blocking item has no URL. The report shape changed.`);
    }
    let host;
    try {
      host = new URL(item.url).hostname;
    } catch {
      fail(`${name}: unparseable render-blocking URL: ${item.url}`);
    }
    if (FIRST_PARTY_HOSTS.has(host) || ALLOWED_THIRD_PARTY_HOSTS.has(host)) continue;
    problems.add(`${host} (${item.url})`);
  }
}

if (problems.size > 0) {
  console.error("render-blocking third-party requests found:");
  for (const problem of problems) console.error(`  - ${problem}`);
  process.exit(1);
}

console.log(`Checked ${reports.length} report(s): no render-blocking third-party requests.`);
