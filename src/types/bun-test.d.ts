// Extend Bun's expect matchers with jest-dom
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers'

declare module 'bun:test' {
  interface Matchers<T = unknown> extends TestingLibraryMatchers<T, void> {}
}
