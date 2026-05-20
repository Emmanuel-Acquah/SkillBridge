import React, { createContext, useContext, useState, useMemo } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { LightTheme, DarkTheme, type ThemeType } from "../../constants/Theme";

type ThemeMode = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  themeMode: ThemeMode;
  isDark: boolean;
  setThemeMode: (mode: ThemeMode) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: LightTheme,
  themeMode: "system",
  isDark: false,
  setThemeMode: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const systemScheme = useSystemColorScheme();
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");

  const isDark = useMemo(() => {
    if (themeMode === "system") return systemScheme === "dark";
    return themeMode === "dark";
  }, [themeMode, systemScheme]);

  const theme = isDark ? DarkTheme : LightTheme;

  const toggleTheme = () => {
    setThemeMode((prev) => {
      if (prev === "system") return isDark ? "light" : "dark";
      return prev === "dark" ? "light" : "dark";
    });
  };

  return (
    <ThemeContext.Provider
      value={{ theme, themeMode, isDark, setThemeMode, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeContext;
