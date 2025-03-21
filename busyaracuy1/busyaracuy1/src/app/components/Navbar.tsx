"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <>
      {/* Botón para abrir el menú en dispositivos móviles */}
      <button
        className="md:hidden fixed top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      {/* Menú lateral */}
      <nav
        className={`fixed top-0 left-0 h-screen bg-blue-600 text-white p-4 transition-transform duration-300
        ${menuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:w-64 md:block`}
      >
        <div className="flex flex-col space-y-4">
          <button className="text-xl font-bold mb-4 block" onClick={() => setMenuOpen(false)}>
            INICIO
          </button>

          {/* ALMACEN */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("almacen")}>
              ALMACEN ▼
            </button>
            {openDropdown === "almacen" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/almacen" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Almacen
                </Link>
              </div>
            )}
          </div>

          {/* DATA */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("data")}>
              DATA ▼
            </button>
            {openDropdown === "data" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/data" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Data
                </Link>
                <Link href="" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Scanner
                </Link>
                <Link href="" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Cleandesp
                </Link>
              </div>
            )}
          </div>

          {/* ESTACION */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("estacion")}>
              ESTACION ▼
            </button>
            {openDropdown === "estacion" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/estacion" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Estacion
                </Link>
              </div>
            )}
          </div>

          {/* OPCIONES AVANZADAS */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("menu")}>
              Opciones avanzadas ▼
            </button>
            {openDropdown === "menu" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/menu" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Crear menú
                </Link>
              </div>
            )}
          </div>

          {/* PERSONAL */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("personal")}>
              PERSONAL ▼
            </button>
            {openDropdown === "personal" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/personal" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Usuarios
                </Link>
              </div>
            )}
          </div>

          {/* PROVEEDOR */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("proveedor")}>
              PROVEEDOR ▼
            </button>
            {openDropdown === "proveedor" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/proveedor" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Proveedor
                </Link>
              </div>
            )}
          </div>

          {/* UNIDADES */}
          <div className="relative">
            <button className="w-full text-left px-4 py-2 bg-blue-700 rounded-md" onClick={() => toggleDropdown("unidades")}>
              UNIDADES ▼
            </button>
            {openDropdown === "unidades" && (
              <div className="ml-4 mt-2 space-y-2">
                <Link href="/flota" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
                  Flota
                </Link>
                <Link href="/mantenimiento" className="block px-4 py-2 hover:bg-gray-200 text-black rounded-md">
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
