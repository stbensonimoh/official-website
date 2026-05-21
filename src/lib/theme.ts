export type Theme = "light" | "dark" | "system";
export type ActualTheme = "light" | "dark";

interface ThemeState {
  theme: Theme;
}

export function themeStore(state: ThemeState) {
  const cycle: Theme[] = ["light", "dark", "system"];

  function getTheme(): Theme {
    return state.theme;
  }

  function setTheme(theme: Theme): void {
    state.theme = theme;
  }

  function toggle(): void {
    const currentIndex = cycle.indexOf(state.theme);
    const nextIndex = (currentIndex + 1) % cycle.length;
    state.theme = cycle[nextIndex];
  }

  function getNextTheme(): Theme {
    const currentIndex = cycle.indexOf(state.theme);
    const nextIndex = (currentIndex + 1) % cycle.length;
    return cycle[nextIndex];
  }

  function getActualTheme(systemTheme: ActualTheme): ActualTheme {
    if (state.theme === "system") return systemTheme;
    return state.theme as ActualTheme;
  }

  return { getTheme, setTheme, toggle, getNextTheme, getActualTheme };
}
