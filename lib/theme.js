import { createContext, useContext, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

export const themes = {
  light: {
    background: "#F6F7F8",
    card: "#FFFFFF",
    cardPressed: "#F0F0F0",
    navPressed: "#E5E7EB",
    text: "#111111",
    textMuted: "#5B5B5B",
    textSubtle: "#7A7A7A",
    border: "#E2E2E2",
    header: "#FFFFFF",
    headerText: "#111111",
    accent: "#2563EB",
    accentText: "#FFFFFF",
    metaBg: "#F1F1F1",
  },
  dark: {
    background: "#000000",
    card: "#1E1E1E",
    cardPressed: "#333333",
    navPressed: "#2A2A2A",
    text: "#FFFFFF",
    textMuted: "#CCCCCC",
    textSubtle: "#AAAAAA",
    border: "#222222",
    header: "#000000",
    headerText: "#FFFFFF",
    accent: "#3A145E",
    accentText: "#FFFFFF",
    metaBg: "#1A1A1A",
  },
};

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const systemScheme = useColorScheme();
  const [mode, setMode] = useState("system");

  const resolvedScheme = mode === "system" ? systemScheme : mode;
  const isDark = resolvedScheme === "dark";
  const colors = isDark ? themes.dark : themes.light;

  const toggleMode = () => {
    setMode((prev) => {
      if (prev === "system") {
        return isDark ? "light" : "dark";
      }
      return prev === "dark" ? "light" : "dark";
    });
  };

  const value = useMemo(
    () => ({ colors, isDark, mode, toggleMode, setMode }),
    [colors, isDark, mode]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  const systemScheme = useColorScheme();
  const isDark = systemScheme === "dark";
  const colors = isDark ? themes.dark : themes.light;

  if (!context) {
    return {
      colors,
      isDark,
      mode: "system",
      toggleMode: () => {},
      setMode: () => {},
    };
  }

  return context;
}
