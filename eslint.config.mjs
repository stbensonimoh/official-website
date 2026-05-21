import tseslint from "typescript-eslint";
import astroPlugin from "eslint-plugin-astro";

export default [
  { ignores: ["dist/", ".astro/", "node_modules/", "**/bun.lock"] },
  ...tseslint.configs.recommended,
  ...astroPlugin.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "no-var": "off",
    },
  },
];
