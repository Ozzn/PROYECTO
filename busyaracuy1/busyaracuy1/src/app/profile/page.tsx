"use client";

import { useState } from "react";
import Navbar from "../components/Navbar"; // Asegúrate de que este es el menú lateral

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="flex">
      {/* Menú lateral */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Contenido principal */}
      <div className={`flex-1 bg-gray-100 min-h-screen transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        <div className="p-6">
          {/* Tarjetas de estado de unidades */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {[
              { count: 56, text: "37% UNIDADES OPERATIVAS", bg: "bg-green-500" },
              { count: 13, text: "9% UNIDADES MANTENIMIENTO", bg: "bg-yellow-500" },
              { count: 54, text: "36% UNIDADES INOPERATIVAS", bg: "bg-gray-600" },
              { count: 29, text: "19% UNIDADES DESINCORPORADAS", bg: "bg-red-600" },
            ].map((item, index) => (
              <div key={index} className={`${item.bg} p-4 rounded-md text-white`}>
                <h3 className="text-2xl font-bold">{item.count}</h3>
                <p className="text-sm">{item.text}</p>
              </div>
            ))}
          </div>

          {/* Tabla de modelos */}
          <div className="mt-8 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">MODELOS</h2>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {[
                    "MODELO",
                    "TRANSMISIÓN",
                    "COMBUSTIBLE",
                    "CANTIDAD",
                    "OPERATIVO",
                    "INOPERATIVO",
                    "CRÍTICAS",
                  ].map((header, index) => (
                    <th key={index} className="px-4 py-2 border border-gray-400">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { modelo: "ZK689646A", transmision: "AUTOMÁTICO", combustible: "DIESEL", cantidad: 18, operativo: 3, inoperativo: 4, criticas: 8 },
                  { modelo: "ZK689646A", transmision: "SINCRÓNICO", combustible: "DIESEL", cantidad: 5, operativo: 3, inoperativo: 1, criticas: 0 },
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                    <td className="px-4 py-2 border border-gray-300">{row.modelo}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.transmision}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.combustible}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.cantidad}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.operativo}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.inoperativo}</td>
                    <td className="px-4 py-2 border border-gray-300">{row.criticas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
