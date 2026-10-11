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
//
// Counting walks the markup with indexOf, not regexes. The scan skips comment
// blocks, template contents, and the bodies of raw-text and RCDATA elements
// (script, style, textarea, title, iframe, noembed, noframes, xmp), and it
// skips each tag as a unit, so a `<main>` written inside a quoted attribute
// value is never counted. Bogus comments (`<!` not followed by `--` or
// `doctype`), doctypes, and processing instructions (`<?`) end at the first
// `>`, with no quote tracking. That matches browsers: a doctype with a public
// or system identifier also ends at the first `>`, because a `>` inside those
// quotes is an abrupt parse error that emits the doctype and resumes normal
// parsing, so a `<main>` after it counts in both. Build output emits only
// `<!doctype html>`. A `<` that cannot start a tag, such as the one in
// `1 < 2`, is treated as text. Tag names compare case-insensitively.
//
// Known limits, all fail-closed or absent from this site's build output:
// - An unquoted attribute value containing a quote character reads the quote
//   as opening a value. The scan then fails on the missing tag end, or, when a
//   later quoted value contains `>`, closes the tag early and miscounts. Such
//   markup is already non-conforming HTML.
// - A script body that contains both `<!--` and a literal script tag sequence
//   can make a browser delay the real end tag past the first `</script`; the
//   scan closes at the first one. Build output escapes those sequences.
// - Foreign content (svg, math) and noscript bodies are scanned as markup, so a
//   main written there would count. The built pages do not do this.
// Any unterminated comment, tag, raw-text body, or template body exits
// non-zero: a page that cannot be scanned completely never passes.

import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.argv[2] ?? "dist/client";
const WHITESPACE = " \t\n\r\f";

// Elements whose bodies a browser reads as text, not markup: raw text (script,
// style, xmp, iframe, noembed, noframes) and RCDATA (title, textarea). A
// `<main>` written inside one of them is text and must not count.
const TEXT_BODY_ELEMENTS = new Set([
  "script",
  "style",
  "textarea",
  "title",
  "iframe",
  "noembed",
  "noframes",
  "xmp",
]);

class ScanError extends Error {}

// Match `name` at `index` case-insensitively and require a tag boundary after
// it, so `<mainish>` is not a main tag and `<scriptx>` is not a script tag.
function tagNameAt(html, index, name) {
  for (let i = 0; i < name.length; i += 1) {
    if ((html[index + i] ?? "").toLowerCase() !== name[i]) return false;
  }
  const next = html[index + name.length];
  return next === undefined || next === ">" || next === "/" || WHITESPACE.includes(next);
}

// Read the tag name after `<` or `</`. Returns "" for `<!doctype` and `<?xml`.
function readTagName(html, index) {
  let name = "";
  for (let i = index; i < html.length; i += 1) {
    const ch = html[i].toLowerCase();
    if (ch < "a" || ch > "z") break;
    name += ch;
  }
  return name;
}

// True when the `<` at `lt` opens a tag a browser would parse: the next
// character is a letter, `/`, `!`, or `?`. Anything else, such as the `<` in
// `1 < 2` or `a <= b`, is text and must not swallow later markup.
function startsTag(html, lt) {
  const after = html[lt + 1] ?? "";
  return (
    (after >= "a" && after <= "z") ||
    (after >= "A" && after <= "Z") ||
    after === "/" ||
    after === "!" ||
    after === "?"
  );
}

// Return the index just after the comment that starts at `lt` (`<!--`).
// Browsers close comments with `-->` or `--!>`, and read `<!-->` and `<!--->`
// as empty comments. Throws ScanError with `message` when the comment never
// ends.
function skipComment(html, lt, message) {
  if (html.startsWith("<!-->", lt)) return lt + 5;
  if (html.startsWith("<!--->", lt)) return lt + 6;
  const dash = html.indexOf("-->", lt + 4);
  const bang = html.indexOf("--!>", lt + 4);
  if (dash === -1 && bang === -1) throw new ScanError(message);
  if (dash === -1) return bang + 4;
  if (bang === -1) return dash + 3;
  return Math.min(dash + 3, bang + 4);
}

// True when browsers end the construct at `lt` at the first `>` with no quote
// tracking: a bogus comment (`<!` not followed by `--`), a doctype, or a
// processing instruction (`<?`). Comments are read by skipComment before this
// check, so a `<!--` never reaches it.
function endsAtFirstGt(html, lt) {
  const after = html[lt + 1];
  return after === "!" || after === "?";
}

// Find the `>` that ends the tag starting at `lt`, ignoring `>` inside quoted
// attribute values. Returns -1 when the tag never ends.
function findTagEnd(html, lt) {
  let quote = "";
  for (let i = lt + 1; i < html.length; i += 1) {
    const ch = html[i];
    if (quote !== "") {
      if (ch === quote) quote = "";
    } else if (ch === '"' || ch === "'") {
      quote = ch;
    } else if (ch === ">") {
      return i;
    }
  }
  return -1;
}

// Read the construct that starts at the `<` at `lt`. Returns null when that
// `<` is text, such as the one in `1 < 2`. A comment returns
// `{ kind: "comment", end }`; a tag returns
// `{ kind: "tag", tagEnd, closing, name, wholeName }`. Throws ScanError when
// the construct never ends, with `suffix` appended to the message.
function readTag(html, lt, suffix = "") {
  if (html.startsWith("<!--", lt)) {
    return { kind: "comment", end: skipComment(html, lt, `unterminated comment${suffix}`) };
  }
  if (!startsTag(html, lt)) return null;
  const tagEnd = endsAtFirstGt(html, lt)
    ? html.indexOf(">", lt + 2)
    : findTagEnd(html, lt);
  if (tagEnd === -1) throw new ScanError(`unterminated tag${suffix}`);
  const closing = html[lt + 1] === "/";
  const nameIndex = closing ? lt + 2 : lt + 1;
  const name = readTagName(html, nameIndex);
  return { kind: "tag", tagEnd, closing, name, wholeName: tagNameAt(html, nameIndex, name) };
}

// Find the `<` of the next `</name ...>` after `from`. Returns -1 when absent.
function findClosingTag(html, from, name) {
  let i = from;
  for (;;) {
    const lt = html.indexOf("</", i);
    if (lt === -1) return -1;
    if (tagNameAt(html, lt + 2, name)) return lt;
    i = lt + 2;
  }
}

// Skip the body of the raw-text or RCDATA element whose opening tag ends at
// `tagEnd`. Returns the index of the element's closing tag. Throws when the
// body never closes.
function findTextBodyEnd(html, tagEnd, name, suffix) {
  const close = findClosingTag(html, tagEnd + 1, name);
  if (close === -1) throw new ScanError(`unterminated ${name} body${suffix}`);
  return close;
}

// Skip a template body and return the index just after its closing tag.
// Nested templates and raw-text bodies inside the template are skipped, so a
// commented-out or stringified tag cannot close the body early.
function skipTemplateBody(html, from) {
  let depth = 1;
  let i = from;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) break;
    const construct = readTag(html, lt, " inside template");
    if (construct === null) {
      i = lt + 1;
      continue;
    }
    if (construct.kind === "comment") {
      i = construct.end;
      continue;
    }
    const { tagEnd, closing, name, wholeName } = construct;
    if (!closing && wholeName && TEXT_BODY_ELEMENTS.has(name)) {
      i = findTextBodyEnd(html, tagEnd, name, " inside template");
      continue;
    }
    if (wholeName && name === "template") {
      depth += closing ? -1 : 1;
      if (depth === 0) return tagEnd + 1;
    }
    i = tagEnd + 1;
  }
  throw new ScanError("unterminated template body");
}

// Count opening main tags outside comments, raw-text bodies, and template
// contents. Throws ScanError when the markup cannot be walked fully.
function countMainTags(html) {
  let count = 0;
  let i = 0;
  while (i < html.length) {
    const lt = html.indexOf("<", i);
    if (lt === -1) break;
    const construct = readTag(html, lt);
    if (construct === null) {
      i = lt + 1;
      continue;
    }
    if (construct.kind === "comment") {
      i = construct.end;
      continue;
    }
    const { tagEnd, closing, name, wholeName } = construct;
    if (!closing && wholeName && TEXT_BODY_ELEMENTS.has(name)) {
      i = findTextBodyEnd(html, tagEnd, name, "");
      continue;
    }
    if (!closing && wholeName && name === "template") {
      i = skipTemplateBody(html, tagEnd + 1);
      continue;
    }
    if (!closing && wholeName && name === "main") count += 1;
    i = tagEnd + 1;
  }
  return count;
}

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
const unreadable = [];
for (const page of pages) {
  try {
    const count = countMainTags(readFileSync(page, "utf8"));
    if (count !== 1) offenders.push(`${relative(ROOT, page)} (found ${count})`);
  } catch (error) {
    if (error instanceof ScanError) unreadable.push(`${relative(ROOT, page)}: ${error.message}`);
    else throw error;
  }
}

if (unreadable.length > 0) {
  console.error(`single-main check failed: ${unreadable.length} page(s) could not be scanned cleanly:`);
  for (const page of unreadable) console.error(`  - ${page}`);
  process.exit(1);
}

if (offenders.length > 0) {
  console.error(`single-main check failed: ${offenders.length} page(s) without exactly one <main>:`);
  for (const offender of offenders) console.error(`  - ${offender}`);
  process.exit(1);
}

console.log(`Checked ${pages.length} page(s): exactly one <main> each.`);
