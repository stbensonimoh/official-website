import { test, expect, describe } from "bun:test";
import { themeStore } from "./theme";

describe("themeStore", () => {
  test("cycles through themes: light -> dark -> system -> light", () => {
    const store = themeStore({ theme: "light" });
    expect(store.getTheme()).toBe("light");

    store.toggle();
    expect(store.getTheme()).toBe("dark");

    store.toggle();
    expect(store.getTheme()).toBe("system");

    store.toggle();
    expect(store.getTheme()).toBe("light");
  });

  test("setTheme sets a specific theme", () => {
    const store = themeStore({ theme: "system" });
    expect(store.getTheme()).toBe("system");

    store.setTheme("dark");
    expect(store.getTheme()).toBe("dark");

    store.setTheme("light");
    expect(store.getTheme()).toBe("light");
  });

  test("getActualTheme returns correct value based on system preference", () => {
    // With theme set to "light", actual should be "light" regardless of system
    const lightStore = themeStore({ theme: "light" });
    expect(lightStore.getActualTheme("dark")).toBe("light");
    expect(lightStore.getActualTheme("light")).toBe("light");

    // With theme set to "dark", actual should be "dark"
    const darkStore = themeStore({ theme: "dark" });
    expect(darkStore.getActualTheme("dark")).toBe("dark");

    // With theme set to "system", actual should match system preference
    const systemStore = themeStore({ theme: "system" });
    expect(systemStore.getActualTheme("dark")).toBe("dark");
    expect(systemStore.getActualTheme("light")).toBe("light");
  });

  test("getNextTheme returns the next in cycle", () => {
    const store = themeStore({ theme: "light" });
    expect(store.getNextTheme()).toBe("dark");

    store.toggle();
    expect(store.getNextTheme()).toBe("system");

    store.toggle();
    expect(store.getNextTheme()).toBe("light");
  });
});
