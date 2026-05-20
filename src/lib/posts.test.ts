import { test, expect, describe } from "bun:test";
import { getReadingTime, createSlug } from "./posts";

describe("getReadingTime", () => {
  test("returns correct minutes for known word count", () => {
    const words = Array.from({ length: 400 }, () => "word").join(" ");
    const result = getReadingTime(words);

    expect(result.minutes).toBe(2);
    expect(result.text).toBe("2 min read");
  });

  test("returns 1 min for short content", () => {
    const result = getReadingTime("Hello world");

    expect(result.minutes).toBe(1);
    expect(result.text).toBe("1 min read");
  });

  test("returns 0 minutes for empty string", () => {
    const result = getReadingTime("");

    expect(result.minutes).toBe(0);
    expect(result.text).toBe("0 min read");
  });

  test("handles whitespace-only content", () => {
    const result = getReadingTime("   \n  \t  ");

    expect(result.minutes).toBe(0);
  });
});

describe("createSlug", () => {
  test("converts title to URL-safe slug", () => {
    const slug = createSlug("Hello World! I Finally Beat Procrastination");
    expect(slug).toBe("hello-world-i-finally-beat-procrastination");
  });

  test("removes special characters", () => {
    const slug = createSlug("What's new in TypeScript 5.0?");
    expect(slug).toBe("what-s-new-in-typescript-5-0");
  });

  test("trims leading and trailing hyphens", () => {
    const slug = createSlug("  --Hello World--  ");
    expect(slug).toBe("hello-world");
  });

  test("collapses multiple hyphens", () => {
    const slug = createSlug("foo---bar___baz");
    expect(slug).toBe("foo-bar-baz");
  });
});
