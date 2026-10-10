import { test, expect, describe } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

/**
 * Regression guard for #213.
 *
 * The About hero image sat in a column flex container (`items-center`) whose
 * only width rules were `md:w-2/3 lg:w-2/5 xl:w-2/7`. Below `md` the picture
 * was a shrink-to-fit flex item, so its width depended on the image's
 * intrinsic size. Until the image bytes arrived, that intrinsic size was
 * unknown, the picture collapsed to its 80px padding with zero height, and
 * the image's `width`/`height` attributes could not reserve anything because
 * the used width was zero. When the bytes arrived the box grew to
 * 332x399 and pushed the heading and the pink panel below it down 399px,
 * which Lighthouse measured as CLS 0.323.
 *
 * `w-full` is the fix: a definite width at every breakpoint makes the
 * image's explicit `width`/`height` attributes reserve the box before the
 * bytes arrive.
 *
 * The test reads the source because the failure only shows up in a real
 * browser layout. The img's own `w-full h-auto` classes and the `priority`
 * and `sizes` props predate the fix and do not carry it: with a
 * shrink-to-fit picture the img has no definite width to fill, so its
 * explicit dimensions still reserve nothing. Tests that pinned those
 * passed on the broken markup and were removed rather than kept as
 * false coverage.
 */
const source = readFileSync(join(import.meta.dir, "about.astro"), "utf8");
const picture = source.match(/<Picture[\s\S]*?\/>/)?.[0] ?? "";

describe("about hero image space reservation", () => {
  test("the hero picture has a definite width at every breakpoint", () => {
    const classProp = picture.match(/pictureAttributes=\{\{\s*class:\s*"([^"]+)"/);
    expect(classProp).not.toBeNull();
    const classes = classProp![1].split(/\s+/);
    // `w-full` is the fix: below md the picture is a flex item and would
    // otherwise be shrink-to-fit, collapsing until the image bytes arrive.
    expect(classes).toContain("w-full");
    // The same widths the layout uses above md, kept definite so the box
    // stays reserved at every breakpoint.
    expect(classes).toContain("md:w-2/3");
    expect(classes).toContain("lg:w-2/5");
    expect(classes).toContain("xl:w-2/7");
  });
});
