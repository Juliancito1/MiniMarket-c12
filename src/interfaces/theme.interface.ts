import type { Theme } from "../context/ThemeContext";

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}