"use client";

import { useState } from "react";
import Link from "next/link";

interface NavbarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}

export default function Navbar({ menuOpen, setMenuOpen }: NavbarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Botón para abrir el menú en dispositivos móviles */}
      <button
        className="md:hidden fixed top-4 left-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-full z-50 shadow-lg transform transition-all duration-300 hover:scale-110"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 transition-all duration-500 ease-in-out transform
        ${menuOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-60 md:block shadow-xl`}
        style={{
          zIndex: 50,
          height: "100%", // Mantiene la altura al 100% de la pantalla
        }}
      >
        <div className="flex flex-col space-y-6 overflow-y-auto" style={{ height: "100%" }}>
          {/* Icono de cierre */}
          <button
            className="text-3xl absolute top-6 right-6 text-gray-200 hover:text-white"
            onClick={() => setMenuOpen(false)}
          >
            ✖
          </button>

          {/* Logo o nombre */}
          <div className="text-2xl font-semibold text-center mb-6 text-gray-200">
            <h1>Mi Menú</h1>
          </div>

          {/* INICIO */}
          <button
            className="text-xl font-bold text-gray-100 py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            onClick={() => setMenuOpen(false)}
          >
            INICIO
          </button>

          {/* ALMACEN */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("almacen")}
            >
              ALMACEN <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "almacen" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/almacen"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Almacen
                </Link>
              </div>
            )}
          </div>

          {/* DATA */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("data")}
            >
              DATA <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "data" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/data"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Data
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Scanner
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Cleandesp
                </Link>
              </div>
            )}
          </div>

          {/* ESTACION */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("estacion")}
            >
              ESTACION <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "estacion" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/estacion"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Estacion
                </Link>
              </div>
            )}
          </div>

          {/* OPCIONES AVANZADAS */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("menu")}
            >
              Opciones avanzadas <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "menu" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/menu"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Crear menú
                </Link>
              </div>
            )}
          </div>

          {/* PERSONAL */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("personal")}
            >
              PERSONAL <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "personal" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/personal"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Usuarios
                </Link>
              </div>
            )}
          </div>

          {/* PROVEEDOR */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("proveedor")}
            >
              PROVEEDOR <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "proveedor" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/proveedor"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Proveedor
                </Link>
              </div>
            )}
          </div>

          {/* UNIDADES */}
          <div className="relative">
            <button
              className="w-full text-left py-2 px-4 bg-gradient-to-r from-blue-700 to-indigo-800 rounded-lg hover:bg-gradient-to-l transition-all duration-300"
              onClick={() => toggleDropdown("unidades")}
            >
              UNIDADES <span className="ml-2">&#9660;</span>
            </button>
            {openDropdown === "unidades" && (
              <div className="ml-4 mt-2 space-y-2 bg-blue-800 p-2 rounded-lg shadow-lg">
                <Link
                  href="/flota"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Flota
                </Link>
                <Link
                  href="/mantenimiento"
                  className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md"
                >
                  Mantenimiento
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Fondo oscuro cuando el menú está abierto en móvil */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
}
