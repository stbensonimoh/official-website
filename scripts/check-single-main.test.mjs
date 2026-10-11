#!/usr/bin/env bun
// Tests for scripts/check-single-main.mjs.
//
// Every case spawns the real script with node against a fixture written to a
// fresh temporary directory, so the single-main property stays covered without
// committing fixture files.

import { afterAll, describe, expect, test } from "bun:test";
import { spawnSync } from "node:child_process";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const SCRIPT = fileURLToPath(new URL("./check-single-main.mjs", import.meta.url));
const fixtureDirs = [];

function runCheck(html) {
  const dir = mkdtempSync(join(tmpdir(), "single-main-check-"));
  fixtureDirs.push(dir);
  writeFileSync(join(dir, "index.html"), html);
  const result = spawnSync("node", [SCRIPT, dir], { encoding: "utf8" });
  return { status: result.status, stdout: result.stdout, stderr: result.stderr };
}

function expectPass(html) {
  const { status, stdout } = runCheck(html);
  expect(status).toBe(0);
  expect(stdout).toContain("exactly one <main>");
}

function expectFail(html, message) {
  const { status, stderr } = runCheck(html);
  expect(status).toBe(1);
  expect(stderr).toContain(message);
}

afterAll(() => {
  for (const dir of fixtureDirs) rmSync(dir, { recursive: true, force: true });
});

describe("counting", () => {
  test("passes with exactly one main", () => {
    expectPass("<html><body><main>content</main></body></html>");
  });

  test("fails with no main", () => {
    expectFail("<html><body><p>no landmark</p></body></html>", "found 0");
  });

  test("fails with two mains", () => {
    expectFail("<main>one</main><main>two</main>", "found 2");
  });

  test("passes with an uppercase main", () => {
    expectPass("<MAIN>content</MAIN>");
  });

  test("ignores a main inside a comment before the real main", () => {
    expectPass("<!-- <main> --><main>content</main>");
    expectPass("<!-- comment --><main>content</main>");
  });

  test("accepts <!--> and <!---> as empty comments", () => {
    expectPass("<!--><main>content</main>");
    expectPass("<!---><main>content</main>");
  });

  test("accepts --!> as a comment close", () => {
    expectPass("<!-- hidden --!><main>content</main>");
  });

  test("counts two mains around a script body containing a comment opener", () => {
    expectFail('<main>one</main><script>const s = "<!--";</script><main>two</main>', "found 2");
  });

  test("ignores a main inside an attribute value", () => {
    expectFail('<div title="<main>"></div>', "found 0");
    expectPass('<div title="<main>"></div><main>content</main>');
  });

  test("ignores a main inside a template", () => {
    expectFail("<template><main>stamped</main></template>", "found 0");
    expectPass("<template><main>stamped</main></template><main>content</main>");
  });

  test("ignores a main inside a nested template", () => {
    expectFail("<template><template><main>stamped</main></template></template>", "found 0");
    expectPass(
      "<template><template><main>stamped</main></template></template><main>content</main>",
    );
  });

  test("tracks template depth when a main sits between levels", () => {
    expectPass(
      "<template><template><main>stamped</main></template><main>between</main></template><main>content</main>",
    );
    expectFail(
      "<template><template><main>stamped</main></template><main>between</main></template>",
      "found 0",
    );
  });

  test("fails on an unterminated comment", () => {
    expectFail("<!-- <main>", "unterminated comment");
  });

  test("fails on an unterminated script body", () => {
    expectFail("<script>const x = 1;", "unterminated script body");
  });
});

describe("bogus comments and processing instructions", () => {
  test("ends a bogus comment at the first > with no quote tracking", () => {
    expectFail('<!x ">" <main>a</main><main>b</main>', "found 2");
    expectPass('<!x ">" <main>a</main>');
  });

  test("ends a processing instruction at the first > with no quote tracking", () => {
    expectFail('<?x ">" <main>a</main><main>b</main>', "found 2");
    expectPass('<?x ">" <main>a</main>');
  });

  test("ends a doctype at the first > with no quote tracking", () => {
    expectFail('<!doctype html ">" <main>a</main><main>b</main>', "found 2");
    expectPass('<!doctype html ">" <main>a</main>');
  });
});

describe("tag name boundaries", () => {
  test("does not count <mainish>", () => {
    expectFail("<mainish>content</mainish>", "found 0");
  });

  test("does not count <main-x>", () => {
    expectFail("<main-x>content</main-x>", "found 0");
  });

  test("does not count <main-x> next to a real main", () => {
    expectPass("<main-x>content</main-x><main>content</main>");
  });
});

describe("stray less-than signs", () => {
  test("treats a stray < as text", () => {
    expectPass("<p>1 < 2<main>content</main></p>");
    expectPass("<p>a <= b<main>content</main></p>");
  });

  test("does not let a stray < hide a second main", () => {
    expectFail("<p>1 < 2<main>one</main><main>two</main></p>", "found 2");
  });
});

describe("raw-text and RCDATA bodies", () => {
  for (const tag of ["script", "style", "textarea", "title", "iframe", "noembed", "noframes", "xmp"]) {
    test(`ignores a main inside <${tag}>`, () => {
      expectFail(`<${tag}><main>stamped</main></${tag}>`, "found 0");
      expectPass(`<${tag}><main>stamped</main></${tag}><main>content</main>`);
    });
  }
});
