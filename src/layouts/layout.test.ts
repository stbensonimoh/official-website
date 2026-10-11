import { test, expect, describe } from "bun:test";

// These tests run the real inline scripts from Layout.astro against a minimal
// DOM mock. They cover the behaviour the browser tests verify end to end:
// the theme reapply on soft navigation (#209) and the Clarity loader that the
// page-view decision depends on (#210).

const layoutSource = await Bun.file(new URL("./Layout.astro", import.meta.url)).text();

function extractInlineScript(source: string, marker: string): string {
  const blocks = [...source.matchAll(/<script is:inline[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  const block = blocks.find((b) => b.includes(marker));
  if (!block) throw new Error(`No inline script containing: ${marker}`);
  return block;
}

const themeScript = extractInlineScript(layoutSource, "// Prevent FOUC");
const clarityScript = extractClarityScript(layoutSource);

function extractClarityScript(source: string): string {
  const match = source.match(/<script is:inline set:html=\{`([\s\S]*?)`\} \/>/);
  if (!match) throw new Error("No Clarity inline script found in Layout.astro");
  return match[1].replaceAll("${clarityId}", "test-project-id");
}

type Listener = (event?: unknown) => void;

function createThemeHarness(storedTheme: string, systemDark: boolean) {
  const attrs = new Map<string, string>();
  const listeners = new Map<string, Set<Listener>>();
  const documentElement = {
    setAttribute(name: string, value: string) {
      attrs.set(name, value);
    },
    getAttribute(name: string) {
      return attrs.get(name) ?? null;
    },
  };
  const document = {
    documentElement,
    addEventListener(type: string, fn: Listener) {
      const set = listeners.get(type) ?? new Set<Listener>();
      set.add(fn);
      listeners.set(type, set);
    },
    dispatch(type: string) {
      for (const fn of listeners.get(type) ?? []) fn();
    },
  };
  const store = new Map<string, string>([["theme", storedTheme]]);
  const localStorage = {
    getItem(key: string) {
      return store.get(key) ?? null;
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
  const window = {
    matchMedia() {
      return { matches: systemDark };
    },
  };
  new Function("window", "document", "localStorage", themeScript)(window, document, localStorage);
  return {
    attrs,
    document,
    // Lets a test change the stored theme after the initial load, the way the
    // toggle does between a load and the next soft navigation.
    setStoredTheme(theme: string) {
      store.set("theme", theme);
    },
  };
}

function createClarityHarness(options: { readyState?: string; requestIdleCallback?: boolean } = {}) {
  const windowListeners = new Map<string, Listener[]>();
  const documentListeners = new Map<string, Listener[]>();
  const timers: Array<{ fn: Listener; delay: number }> = [];
  const inserted: Array<Record<string, unknown>> = [];
  const anchor = {
    parentNode: {
      insertBefore(node: Record<string, unknown>) {
        inserted.push(node);
      },
    },
  };

  function register(map: Map<string, Listener[]>, type: string, fn: Listener) {
    const list = map.get(type) ?? [];
    list.push(fn);
    map.set(type, list);
  }

  function dispatch(map: Map<string, Listener[]>, type: string) {
    for (const fn of map.get(type) ?? []) fn();
  }

  const window: Record<string, unknown> = {
    addEventListener(type: string, fn: Listener) {
      register(windowListeners, type, fn);
    },
    setTimeout(fn: Listener, delay: number) {
      timers.push({ fn, delay });
      return timers.length;
    },
  };
  if (options.requestIdleCallback) {
    window.requestIdleCallback = (fn: Listener) => {
      fn();
      return 1;
    };
  }
  const document = {
    readyState: options.readyState ?? "loading",
    createElement(tag: string) {
      return { tag };
    },
    getElementsByTagName(tag: string) {
      return tag === "script" ? [anchor] : [];
    },
    addEventListener(type: string, fn: Listener) {
      register(documentListeners, type, fn);
    },
  };

  const run = () => new Function("window", "document", clarityScript)(window, document);
  return {
    window,
    run,
    inserted,
    dispatchWindow: (type: string) => dispatch(windowListeners, type),
    dispatchDocument: (type: string) => dispatch(documentListeners, type),
    flushTimers: () => {
      while (timers.length > 0) {
        const timer = timers.shift();
        timer?.fn();
      }
    },
  };
}

describe("Layout theme script (#209)", () => {
  test("applies the stored dark theme before first paint", () => {
    const harness = createThemeHarness("dark", false);
    expect(harness.attrs.get("data-theme")).toBe("dark");
  });

  test("applies the stored light theme before first paint", () => {
    const harness = createThemeHarness("light", true);
    expect(harness.attrs.get("data-theme")).toBe("light");
  });

  test("resolves the system theme to dark when the system prefers dark", () => {
    const harness = createThemeHarness("system", true);
    expect(harness.attrs.get("data-theme")).toBe("dark");
  });

  test("resolves the system theme to light when the system prefers light", () => {
    const harness = createThemeHarness("system", false);
    expect(harness.attrs.get("data-theme")).toBe("light");
  });

  test("reapplies the stored theme after the router swap clears it", () => {
    const harness = createThemeHarness("dark", false);
    // The ClientRouter swap drops root attributes and the inline script does
    // not re-run. astro:after-swap fires after the swap, before paint.
    harness.attrs.delete("data-theme");
    harness.document.dispatch("astro:after-swap");
    expect(harness.attrs.get("data-theme")).toBe("dark");
  });

  test("reapplies the resolved system theme after a swap", () => {
    const harness = createThemeHarness("system", true);
    harness.attrs.delete("data-theme");
    harness.document.dispatch("astro:after-swap");
    expect(harness.attrs.get("data-theme")).toBe("dark");
  });

  test("reapplies a theme stored after the initial load, not the one cached at load", () => {
    const harness = createThemeHarness("dark", false);
    // The toggle can change localStorage between the load and the next swap;
    // the reapply must read the current value, not reuse one read at load.
    harness.setStoredTheme("light");
    harness.attrs.delete("data-theme");
    harness.document.dispatch("astro:after-swap");
    expect(harness.attrs.get("data-theme")).toBe("light");
  });
});

describe("Layout Clarity loader (#210)", () => {
  test("installs a queue function before the runtime loads", () => {
    const harness = createClarityHarness();
    harness.run();
    expect(typeof harness.window.clarity).toBe("function");
    const clarity = harness.window.clarity as (...args: unknown[]) => void;
    clarity("event", "before-load");
    clarity("event", "before-load-again");
    expect((harness.window.clarity as { q?: unknown[] }).q?.length).toBe(2);
    expect(harness.inserted.length).toBe(0);
  });

  test("loads the tag on the first interaction, exactly once", () => {
    const harness = createClarityHarness();
    harness.run();
    harness.dispatchWindow("pointerdown");
    expect(harness.inserted.length).toBe(1);
    expect(harness.inserted[0].src).toBe("https://www.clarity.ms/tag/test-project-id");
    harness.dispatchWindow("keydown");
    harness.dispatchWindow("touchstart");
    expect(harness.inserted.length).toBe(1);
  });

  test("loads the tag from the idle window when there is no interaction", () => {
    const harness = createClarityHarness({ readyState: "complete", requestIdleCallback: true });
    harness.run();
    expect(harness.inserted.length).toBe(0);
    harness.flushTimers();
    expect(harness.inserted.length).toBe(1);
  });

  test("does not install a second loader when the inline script re-runs", () => {
    const harness = createClarityHarness();
    harness.run();
    harness.run();
    harness.dispatchWindow("pointerdown");
    expect(harness.inserted.length).toBe(1);
  });
});
