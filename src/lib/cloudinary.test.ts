import { expect, test } from "bun:test";
import { cloudinaryUrl } from "./cloudinary";

const base = "https://res.cloudinary.com/stbensonimoh/image/upload/v1769086968/good-bye.jpg";

test("inserts transforms before the version segment", () => {
  expect(cloudinaryUrl(base, { width: 800 })).toBe(
    "https://res.cloudinary.com/stbensonimoh/image/upload/f_auto,q_auto,dpr_auto,w_800/v1769086968/good-bye.jpg",
  );
});

test("keeps a folder in the public id intact", () => {
  const url = "https://res.cloudinary.com/stbensonimoh/image/upload/v1692657775/blog-content/photo_ixp347.jpg";
  expect(cloudinaryUrl(url, { width: 96 })).toBe(
    "https://res.cloudinary.com/stbensonimoh/image/upload/f_auto,q_auto,dpr_auto,w_96/v1692657775/blog-content/photo_ixp347.jpg",
  );
});

test("autoFormat false emits q_auto only", () => {
  expect(cloudinaryUrl(base, { width: 1200, autoFormat: false })).toBe(
    "https://res.cloudinary.com/stbensonimoh/image/upload/q_auto,w_1200/v1769086968/good-bye.jpg",
  );
});

test("supports height and crop", () => {
  expect(cloudinaryUrl(base, { width: 1200, height: 630, crop: "fill", autoFormat: false })).toBe(
    "https://res.cloudinary.com/stbensonimoh/image/upload/q_auto,w_1200,h_630,c_fill/v1769086968/good-bye.jpg",
  );
});

test("passes through non-Cloudinary and empty values", () => {
  expect(cloudinaryUrl("https://example.com/hero.jpg", { width: 800 })).toBe("https://example.com/hero.jpg");
  expect(cloudinaryUrl("", { width: 800 })).toBe("");
  expect(cloudinaryUrl(undefined, { width: 800 })).toBe("");
});

test("is idempotent for already-transformed URLs", () => {
  const transformed = "https://res.cloudinary.com/stbensonimoh/image/upload/f_auto,q_auto,dpr_auto,w_800/v1/hero.jpg";
  expect(cloudinaryUrl(transformed, { width: 1600 })).toBe(transformed);
  const autoWidth = "https://res.cloudinary.com/stbensonimoh/image/upload/w_auto/v1/hero.jpg";
  expect(cloudinaryUrl(autoWidth, { width: 1600 })).toBe(autoWidth);
});
