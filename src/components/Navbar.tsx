import { useState } from "react"
import { NavLink } from "react-router"
import { CiSun } from "react-icons/ci";
import { FiMenu, FiX } from "react-icons/fi";


export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-slate-300">
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
          <button className="text-3xl border p-0.5 bg-black rounded-4xl">
            <CiSun className="text-amber-400"/>
          </button>
          <NavLink to={'/'} className='lg:mx-2' onClick={() => setIsMenuOpen(false)}>Inicio</NavLink>
          <NavLink to={'/login'} onClick={() => setIsMenuOpen(false)}>Iniciar sesión</NavLink>
        </div>
      </nav>
    </header>
  )
}
