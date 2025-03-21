"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaPlusCircle, FaTrash, FaEdit } from "react-icons/fa";
import Navbar from "../components/Navbar";

interface Unidad {
  id: number;
  id_unidad: string;
  marca: string;
  modelo: string;
  transmision: string;
  vim: string;
  fecha: string;
  capacidad: string;
  combustible: string;
  status: string;
}

interface Marca {
  id: number;
  nombre: string;
}

interface Modelo {
  id: number;
  nombre: string;
}

interface Status {
  id: number;
  nombre: string;
}

function Unidades() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const [formData, setFormData] = useState({
    idUnidad: "",
    marcaId: "",
    modeloId: "",
    vim: "",
    fecha: "",
    capacidad: "",
    combustible: "",
    transmision: "",
    statusId: "",
  });

  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [statuses, setStatuses] = useState<Status[]>([]);
  const [unidades, setUnidades] = useState<Unidad[]>([]);

  const fetchData = async (endpoint: string, setter: (data: any) => void) => {
    try {
      const response = await fetch(`/api/${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (error) {
      console.error(`Error al obtener ${endpoint}:`, error);
    }
  };

  useEffect(() => {
    fetchData("marcas", setMarcas);
    fetchData("modelos", setModelos);
    fetchData("status", setStatuses);
    fetchData("unidades", setUnidades);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) {
      alert("Todos los campos son obligatorios");
      return;
    }

    try {
      const response = await fetch("/api/add-unidad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Unidad registrada exitosamente");
        setFormData({
          idUnidad: "",
          marcaId: "",
          modeloId: "",
          vim: "",
          fecha: "",
          capacidad: "",
          combustible: "",
          transmision: "",
          statusId: "",
        });
        fetchData("unidades", setUnidades);
      } else {
        const result = await response.json();
        alert(result.message || "Error al registrar la unidad");
      }
    } catch (error) {
      console.error("Error al registrar la unidad:", error);
      alert("Hubo un error al enviar los datos");
    }
  };

  return (
    <div className="flex">
      {/* Menú lateral */}
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* Contenido principal */}
      <div className={`flex-1 bg-gray-100 min-h-screen transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        <div className="container mx-auto p-6">
          <h4 className="text-lg font-semibold mb-4">AGREGAR NUEVA UNIDAD</h4>

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md">
            <div className="grid grid-cols-4 gap-2">
              <input type="text" name="idUnidad" placeholder="Id Unidad" className="p-2 border rounded-md text-center" value={formData.idUnidad} onChange={handleChange} />

              <div className="flex items-center">
                <select name="marcaId" className="p-2 border rounded-md text-center" value={formData.marcaId} onChange={handleChange}>
                  <option value="">MARCA</option>
                  {marcas.map((marca) => (
                    <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                  ))}
                </select>
                <FaPlusCircle className="ml-2 text-blue-500 cursor-pointer" size={20} />
              </div>

              <div className="flex items-center">
                <select name="modeloId" className="p-2 border rounded-md text-center" value={formData.modeloId} onChange={handleChange}>
                  <option value="">MODELO</option>
                  {modelos.map((modelo) => (
                    <option key={modelo.id} value={modelo.id}>{modelo.nombre}</option>
                  ))}
                </select>
                <FaPlusCircle className="ml-2 text-blue-500 cursor-pointer" size={20} />
              </div>

              <input type="text" name="vim" placeholder="VIM" className="p-2 border rounded-md text-center" value={formData.vim} onChange={handleChange} />

              <input type="text" name="fecha" placeholder="AÑO" className="p-2 border rounded-md text-center" value={formData.fecha} onChange={handleChange} />
              <input type="text" name="capacidad" placeholder="CAPACIDAD" className="p-2 border rounded-md text-center" value={formData.capacidad} onChange={handleChange} />

              <select name="combustible" className="p-2 border rounded-md text-center" value={formData.combustible} onChange={handleChange}>
                <option value="">COMBUSTIBLE</option>
                <option value="Gasolina">Gasolina</option>
                <option value="Diesel">Diesel</option>
              </select>

              <select name="transmision" className="p-2 border rounded-md text-center" value={formData.transmision} onChange={handleChange}>
                <option value="">TRANSMISIÓN</option>
                <option value="Automática">Automática</option>
                <option value="Manual">Manual</option>
              </select>

              <select name="statusId" className="p-2 border rounded-md text-center" value={formData.statusId} onChange={handleChange}>
                <option value="">STATUS</option>
                {statuses.map((status) => (
                  <option key={status.id} value={status.id}>{status.nombre}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
              +Agregar
            </button>
          </form>

          {/* TABLA DE UNIDADES */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold mb-2">LISTA DE UNIDADES</h4>
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-800 text-white">
                  {["ID", "Marca", "Modelo", "Transmisión", "VIM", "Año", "Acciones"].map((header, index) => (
                    <th key={index} className="px-4 py-2 border border-gray-400">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidad) => (
                  <tr key={unidad.id} className="text-center">
                    <td className="border border-gray-300 p-2">{unidad.id_unidad}</td>
                    <td className="border border-gray-300 p-2">{unidad.marca}</td>
                    <td className="border border-gray-300 p-2">{unidad.modelo}</td>
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

export default Unidades;
