"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";

type Theme = "light" | "dark" | "system";
type ActualTheme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  actualTheme: ActualTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Function to get system theme
  const getSystemTheme = (): ActualTheme => {
    if (typeof window === "undefined") return "light";
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Initialize theme from localStorage or default to system
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "system";
    return (localStorage.getItem("theme") as Theme) || "system";
  });

  // Track system theme preference
  const [systemTheme, setSystemTheme] = useState<ActualTheme>(getSystemTheme);

  // Compute actual theme using useMemo (derived state)
  const actualTheme = useMemo<ActualTheme>(() => {
    return theme === "system" ? systemTheme : (theme as ActualTheme);
  }, [theme, systemTheme]);

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    
    const handleChange = () => {
      setSystemTheme(getSystemTheme());
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    // Update data-theme attribute on document
    document.documentElement.setAttribute("data-theme", actualTheme);
    
    // Store theme preference
    localStorage.setItem("theme", theme);
  }, [theme, actualTheme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      if (prevTheme === "light") return "dark";
      if (prevTheme === "dark") return "system";
      return "light";
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, actualTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
