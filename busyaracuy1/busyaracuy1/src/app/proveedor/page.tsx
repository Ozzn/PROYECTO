"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Navbar from "../components/Navbar";

interface Proveedor {
  id: number;
  rif: string;
  empresa: string;
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  status: string;
}

const Proveedor: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [proveedores, setProveedores] = useState<Proveedor[]>([]);
  const [rif, setRif] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetchProveedores();
  }, []);

  const fetchProveedores = async () => {
    try {
      const response = await fetch("/api/proveedores");
      const data = await response.json();
      setProveedores(data);
    } catch (error) {
      console.error("Error al obtener proveedores:", error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const nuevoProveedor = { rif, empresa, nombre, apellido, telefono, email, status: "Activo" };

    try {
      const response = await fetch("/api/proveedores", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoProveedor),
      });

      if (response.ok) {
        fetchProveedores();
        alert("Proveedor agregado exitosamente");
        setRif("");
        setEmpresa("");
        setNombre("");
        setApellido("");
        setTelefono("");
        setEmail("");
      } else {
        alert("Error al agregar proveedor");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={`flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        <h4 className="text-lg font-semibold mb-4">Agregar Proveedor</h4>

        {/* FORMULARIO */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
          {/* Primera fila: 4 inputs más pequeños */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-4">
            <input type="text" className="p-2 border rounded text-sm w-40" placeholder="RIF" value={rif} onChange={(e) => setRif(e.target.value)} />
            <input type="text" className="p-2 border rounded text-sm w-40" placeholder="Empresa" value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
            <input type="text" className="p-2 border rounded text-sm w-40" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <input type="text" className="p-2 border rounded text-sm w-40" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
          </div>

          {/* Segunda fila: 2 inputs más pequeños + botón más compacto */}
          <div className="flex items-center gap-2">
            <input type="text" className="p-2 border rounded text-sm w-32" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
            <input type="email" className="p-2 border rounded text-sm w-32" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <button type="submit" className="bg-blue-500 text-white px-3 py-1 rounded text-xs w-24 hover:bg-blue-600">
              + Agregar
            </button>
          </div>
        </form>

        {/* TABLA */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm">Mostrar: 
              <select className="ml-2 p-1 border rounded text-sm">
                <option>10</option>
                <option>25</option>
                <option>50</option>
              </select>
            </label>
            <input type="text" placeholder="Buscar..." className="p-1 border rounded text-sm w-40" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
          </div>

          <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-800 text-white">
              <tr>
                {["COD", "RIF", "EMPRESA", "NOMBRE, APELLIDO", "TELÉFONO", "EMAIL", "STATUS", "ACCIONES"].map((header, index) => (
                  <th key={index} className="border p-2">{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {proveedores.filter(p => p.empresa.toLowerCase().includes(busqueda.toLowerCase())).map((prov, index) => (
                <tr key={prov.id} className="text-center">
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2">{prov.rif}</td>
                  <td className="border p-2">{prov.empresa}</td>
                  <td className="border p-2">{`${prov.nombre} ${prov.apellido}`}</td>
                  <td className="border p-2">{prov.telefono}</td>
                  <td className="border p-2">{prov.email}</td>
                  <td className="border p-2">
                    <span className={`px-2 py-1 rounded text-xs ${prov.status === "Activo" ? "bg-green-500 text-white" : "bg-gray-500 text-white"}`}>
                      {prov.status}
                    </span>
                  </td>
                  <td className="border p-2">
                    <button onClick={() => alert("Eliminar proveedor")} className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600">
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* PAGINACIÓN */}
          <div className="flex justify-between items-center mt-4 text-sm">
            <p>Total de {proveedores.length} Registros</p>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded bg-gray-300 hover:bg-gray-400">Anterior</button>
              <span className="px-3 py-1 border rounded bg-blue-500 text-white">1</span>
              <button className="px-3 py-1 border rounded bg-gray-300 hover:bg-gray-400">Siguiente</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Proveedor;
