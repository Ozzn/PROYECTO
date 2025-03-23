"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Navbar from "../components/Navbar";

interface Unidad {
  id: number;
  nombre: string;
}

interface Operador {
  id: number;
  nombre: string;
}

interface Mecanico {
  id: number;
  nombre: string;
}

interface Mantenimiento {
  id: number;
  fechaEntrada: string;
  mecanico: string;
  kilometraje: string;
  tipo: string;
  diagnostico: string;
  recomendacion: string;
  fechaSalida?: string;
}

const MaintenanceForm: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [unidad, setUnidad] = useState<string>("");
  const [rutaUnidad, setRutaUnidad] = useState<string>("");
  const [operador, setOperador] = useState<string>("");
  const [mecanico, setMecanico] = useState<string>("");
  const [kilometraje, setKilometraje] = useState<string>("");
  const [tipo, setTipo] = useState<"p" | "c">("p");
  const [fechaEntrada, setFechaEntrada] = useState<string>("");
  const [diagnostico, setDiagnostico] = useState<string>("");
  const [recomendacion, setRecomendacion] = useState<string>("");
  const [mantenimientos, setMantenimientos] = useState<Mantenimiento[]>([]);
  const [unidades, setUnidades] = useState<Unidad[]>([]);
  const [operadores, setOperadores] = useState<Operador[]>([]);
  const [mecanicos, setMecanicos] = useState<Mecanico[]>([]);

  useEffect(() => {
    const fetchData = async (endpoint: string, setter: (data: any) => void) => {
      try {
        const response = await fetch(`/api/${endpoint}`);
        const data = await response.json();
        setter(data);
      } catch (error) {
        console.error(`Error al obtener ${endpoint}:`, error);
      }
    };

    fetchData("unidades", setUnidades);
    fetchData("operadores", setOperadores);
    fetchData("mecanicos", setMecanicos);
    fetchData("mantenimientos", setMantenimientos);
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = {
      unidad,
      rutaUnidad,
      operador,
      mecanico,
      kilometraje,
      tipo,
      fechaEntrada,
      diagnostico,
      recomendacion,
    };

    try {
      const response = await fetch("/api/mantenimiento", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert("Mantenimiento ingresado exitosamente");
        const updatedMantenimientos = await response.json();
        setMantenimientos(updatedMantenimientos);
      } else {
        alert("Error al ingresar mantenimiento");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error en la solicitud");
    }
  };

  return (
    <div className="flex">
      {/* Menú lateral */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Contenido principal */}
      <div className={`flex-1 bg-gray-100 min-h-screen transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        <div className="container mx-auto p-6">
          <h4 className="text-lg font-semibold mb-4">Mantenimiento de Unidades</h4>

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md grid grid-cols-2 gap-4">
            <select value={unidad} onChange={(e) => setUnidad(e.target.value)} className="p-2 border rounded text-gray-700">
              <option value="">Seleccionar Unidad</option>
              {unidades.map((unidad) => (
                <option key={unidad.id} value={unidad.id}>
                  {unidad.nombre}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="p-2 border rounded text-gray-700"
              placeholder="Ruta de la Unidad"
              value={rutaUnidad}
              onChange={(e) => setRutaUnidad(e.target.value)}
            />

            <select value={operador} onChange={(e) => setOperador(e.target.value)} className="p-2 border rounded text-gray-700">
              <option value="">Seleccionar Operador</option>
              {operadores.map((operador) => (
                <option key={operador.id} value={operador.id}>
                  {operador.nombre}
                </option>
              ))}
            </select>

            <select value={mecanico} onChange={(e) => setMecanico(e.target.value)} className="p-2 border rounded text-gray-700">
              <option value="">Seleccionar Mecánico</option>
              {mecanicos.map((mecanico) => (
                <option key={mecanico.id} value={mecanico.id}>
                  {mecanico.nombre}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="p-2 border rounded text-gray-700"
              placeholder="Kilometraje"
              value={kilometraje}
              onChange={(e) => setKilometraje(e.target.value)}
            />

            <div className="flex space-x-4 text-gray-700  ">
              <label className="flex items-center">
                <input type="radio" name="tipo" value="p" checked={tipo === "p"} onChange={() => setTipo("p")} className="mr-2 " />
                Preventivo
              </label>
              <label className="flex items-center">
                <input type="radio" name="tipo" value="c" checked={tipo === "c"} onChange={() => setTipo("c")} className="mr-2 " />
                Correctivo
              </label>
            </div>

            <input
              type="date"
              className="p-2 border rounded text-gray-700"
              value={fechaEntrada}
              onChange={(e) => setFechaEntrada(e.target.value)}
            />

            <input
              type="text"
              className="p-2 border rounded text-gray-700"
              placeholder="Diagnóstico"
              value={diagnostico}
              onChange={(e) => setDiagnostico(e.target.value)}
            />

            <input
              type="text"
              className="p-2 border rounded text-gray-700"
              placeholder="Recomendación"
              value={recomendacion}
              onChange={(e) => setRecomendacion(e.target.value)}
            />

            <button
              type="submit"
              className="col-span-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm"
            >
              Ingresar Mantenimiento
            </button>
          </form>

          {/* TABLA DE MANTENIMIENTOS */}
          <div className="mt-6">
            <h5 className="text-lg font-semibold mb-2">Mantenimientos Registrados</h5>
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-800 text-white">
                <tr>
                  {["ID", "Entrada", "Mecánico", "KM", "Tipo", "Diagnóstico", "Recomendación", "Salida"].map((header, index) => (
                    <th key={index} className="border p-2">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {mantenimientos.map((mantenimiento, index) => (
                  <tr key={index} className="text-center">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{mantenimiento.fechaEntrada}</td>
                    <td className="border p-2">{mantenimiento.mecanico}</td>
                    <td className="border p-2">{mantenimiento.kilometraje}</td>
                    <td className="border p-2">{mantenimiento.tipo === "p" ? "Preventivo" : "Correctivo"}</td>
                    <td className="border p-2">{mantenimiento.diagnostico}</td>
                    <td className="border p-2">{mantenimiento.recomendacion}</td>
                    <td className="border p-2">{mantenimiento.fechaSalida || "Pendiente"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceForm;
