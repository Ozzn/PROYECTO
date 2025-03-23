"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { FaPlusCircle } from "react-icons/fa";
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

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"marca" | "modelo" | "status">("marca");
  const [nombre, setNombre] = useState("");

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
      const response = await fetch("/api/auth/flota", {
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

  const handleModalSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const endpoint = modalType === "marca" ? "marcas" : modalType === "modelo" ? "modelos" : "status";
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre }),
      });

      if (response.ok) {
        alert(`${modalType.charAt(0).toUpperCase() + modalType.slice(1)} agregado exitosamente`);
        setNombre("");
        setModalOpen(false);
        fetchData(endpoint, modalType === "marca" ? setMarcas : modalType === "modelo" ? setModelos : setStatuses);
      } else {
        const result = await response.json();
        alert(result.message || `Error al agregar ${modalType}`);
      }
    } catch (error) {
      console.error(`Error al agregar ${modalType}:`, error);
      alert("Hubo un error al enviar los datos");
    }
  };

  return (
    <div className="flex">
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <div className={`flex-1 bg-gray-50 min-h-screen transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
        <div className="container mx-auto p-6">
          <h4 className="text-2xl font-semibold text-gray-800 mb-6">AGREGAR NUEVA UNIDAD</h4>

          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <input
                  type="text"
                  name="idUnidad"
                  placeholder="ID Unidad"
                  className="p-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.idUnidad}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <select
                    name="marcaId"
                    className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    value={formData.marcaId}
                    onChange={handleChange}
                  >
                    <option value="">Marca</option>
                    {marcas.map((marca) => (
                      <option key={marca.id} value={marca.id}>{marca.nombre}</option>
                    ))}
                  </select>
                  <FaPlusCircle
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                    onClick={() => {
                      setModalType("marca");
                      setModalOpen(true);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <select
                    name="modeloId"
                    className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                    value={formData.modeloId}
                    onChange={handleChange}
                  >
                    <option value="">Modelo</option>
                    {modelos.map((modelo) => (
                      <option key={modelo.id} value={modelo.id}>{modelo.nombre}</option>
                    ))}
                  </select>
                  <FaPlusCircle
                    className="ml-2 text-blue-500 cursor-pointer"
                    size={20}
                    onClick={() => {
                      setModalType("modelo");
                      setModalOpen(true);
                    }}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="vim"
                  placeholder="VIM"
                  className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.vim}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="fecha"
                  placeholder="Año"
                  className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.fecha}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <input
                  type="text"
                  name="capacidad"
                  placeholder="Capacidad"
                  className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.capacidad}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <select
                  name="combustible"
                  className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.combustible}
                  onChange={handleChange}
                >
                  <option value="">Combustible</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diesel">Diesel</option>
                </select>
              </div>

              <div className="space-y-2">
                <select
                  name="transmision"
                  className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.transmision}
                  onChange={handleChange}
                >
                  <option value="">Transmisión</option>
                  <option value="Automática">Automática</option>
                  <option value="Manual">Manual</option>
                </select>
              </div>

              <div className="space-y-2">
                <select
                  name="statusId"
                  className="p-3 border-2 border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                  value={formData.statusId}
                  onChange={handleChange}
                >
                  <option value="">Status</option>
                  {statuses.map((status) => (
                    <option key={status.id} value={status.id}>{status.nombre}</option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
              + Agregar Unidad
            </button>
          </form>

          <div className="mt-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">Lista de Unidades</h4>
            <table className="w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-600 text-white">
                  {["ID", "Marca", "Modelo", "Transmisión", "VIM", "Año", "Acciones"].map((header, index) => (
                    <th key={index} className="px-4 py-2 border border-gray-400">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {unidades.map((unidad) => (
                  <tr key={unidad.id} className="text-center text-gray-700">
                    <td className="border p-2">{unidad.id_unidad}</td>
                    <td className="border p-2">{unidad.marca}</td>
                    <td className="border p-2">{unidad.modelo}</td>
                    <td className="border p-2">{unidad.transmision}</td>
                    <td className="border p-2">{unidad.vim}</td>
                    <td className="border p-2">{unidad.fecha}</td>
                    <td className="border p-2">
                      <button className="text-red-500 hover:text-red-700">
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-25">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-lg font-semibold mb-4">Agregar {modalType.charAt(0).toUpperCase() + modalType.slice(1)}</h2>
            <form onSubmit={handleModalSubmit}>
              <input
                type="text"
                placeholder="Nombre"
                className="p-3 border-2 border-gray-300 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <div className="flex justify-end">
                <button type="button" className="text-gray-600 mr-4" onClick={() => setModalOpen(false)}>Cancelar</button>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition">
                  Agregar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Unidades;
