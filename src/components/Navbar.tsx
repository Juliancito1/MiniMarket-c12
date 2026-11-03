import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { CiSun } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { BiMoon } from "react-icons/bi";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeContext = useContext(ThemeContext);

  return (
    <header className="bg-slate-200 dark:bg-slate-800">
      <nav className="flex flex-wrap items-center justify-between p-3">
        <div>
          <h1 className="text-2xl text-emerald-500">MiniMarket</h1>
        </div>
        <button
          type="button"
          className="text-3xl lg:hidden hover:cursor-pointer"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
          aria-controls="navbar-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
        <div
          id="navbar-menu"
          className={`${isMenuOpen ? "flex" : "hidden"} w-full flex-col items-start gap-3 pt-3 lg:flex lg:w-auto lg:flex-row lg:items-center lg:gap-0 lg:pt-0`}
        >
          <button
            className="rounded-4xl border border-slate-500 bg-slate-800 p-0.5 text-3xl dark:border-slate-400 dark:bg-slate-200"
            onClick={themeContext?.toggleTheme}
          >
            {themeContext?.theme === "light" ? (
              <CiSun className="text-amber-400" />
            ) : (
              <BiMoon className="text-slate-300 dark:text-slate-800" />
            )}
          </button>
          <NavLink
            to={"/"}
            className="text-slate-900 hover:text-emerald-700 dark:text-slate-100 dark:hover:text-emerald-300 lg:mx-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Inicio
          </NavLink>
          <NavLink
            to={"/login"}
            className="text-slate-900 hover:text-emerald-700 dark:text-slate-100 dark:hover:text-emerald-300"
            onClick={() => setIsMenuOpen(false)}
          >
            Iniciar sesión
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
