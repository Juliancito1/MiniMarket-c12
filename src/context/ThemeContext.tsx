import { createContext } from "react";
import type { ThemeContextType } from "../interfaces/theme.interface";

export type Theme = 'light' | 'dark';

export const ThemeContext = createContext<ThemeContextType | null>(null);