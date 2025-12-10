import { defineConfig, globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig([globalIgnores([
    "**/node_modules/",
    "**/.next/",
    "**/out/",
    "**/coverage/",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/test-utils.*",
    "**/test-setup.ts",
    "**/scripts/",
    "**/node_modules/",
    "**/.next/",
    "**/out/",
    "**/coverage/",
    "**/*.test.ts",
    "**/*.test.tsx",
    "**/test-utils.*",
    "**/test-setup.ts",
    "**/scripts/",
    "**/__mocks__/",
    "**/bun.lock",
    "**/*.config.*",
]), {
    extends: [...nextCoreWebVitals],

    rules: {
        "react/no-unescaped-entities": "off",
        "@next/next/no-page-custom-font": "off",
    },
}]);