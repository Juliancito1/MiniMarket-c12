import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { CiSun } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { BiMoon } from "react-icons/bi";
import { AuthContext } from "../context/AuthContext";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const themeContext = useContext(ThemeContext);
  const authContext = useContext(AuthContext);

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
          {authContext?.user ? (
            <>
              {authContext.user.role === "admin" ? (
                <NavLink
                  to="/admin"
                  className="w-max text-slate-700 hover:text-emerald-700 dark:text-slate-200 dark:hover:text-emerald-300 lg:mx-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Panel de Administración
                </NavLink>
              ) : (
                <span className="me-2 max-w-48 truncate text-sm text-slate-600 dark:text-slate-300">
                  Hola "{authContext.user.name}"
                </span>
              )}
              <button
                type="button"
                className="w-max text-slate-700 hover:text-blue-600 dark:text-slate-200"
                onClick={() => {
                  authContext.logout();
                  setIsMenuOpen(false);
                }}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink
              className="w-max border-b-transparent hover:border-b-2 hover:border-b-blue-500 hover:text-blue-600"
              to="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              Iniciar Sesión
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
