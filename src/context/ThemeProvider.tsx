import type React from "react";
import { useEffect, useState } from "react";
import { type Theme, ThemeContext } from "./ThemeContext";

export function ThemeProvider({children}: {children: React.ReactNode}){
  const [theme, setTheme] = useState<Theme>(localStorage.getItem("tema") as Theme || 'light');

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");

    localStorage.setItem("tema", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}