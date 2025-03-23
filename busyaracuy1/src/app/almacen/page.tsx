"use client";
import React, { useState } from "react";
import Navbar from "../components/Navbar";

const ArticuloPage: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("nuevo");

    // Estado para Nuevo Artículo
    const [nombreArticulo, setNombreArticulo] = useState("");
    const [estado, setEstado] = useState("");
    const [unidad, setUnidad] = useState("");
    const [cantidad, setCantidad] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Artículo agregado");
        setNombreArticulo("");
        setEstado("");
        setUnidad("");
        setCantidad("");
    };

    return (
        <div className="flex">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className={`flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>

                {/* Tabs de selección */}
                <div className="flex border-b">
                    <button 
                        className={`px-4 py-2 text-sm font-semibold ${activeTab === "nuevo" ? "bg-blue-600 text-white" : "bg-white text-black border"}`} 
                        onClick={() => setActiveTab("nuevo")}
                    >
                        NUEVO ARTICULO
                    </button>
                    <button 
                        className={`px-4 py-2 text-sm font-semibold ${activeTab === "existente" ? "bg-blue-600 text-white" : "bg-white text-black border"}`} 
                        onClick={() => setActiveTab("existente")}
                    >
                        ARTICULO EXISTENTE
                    </button>
                </div>

                {/* Contenido según la pestaña seleccionada */}
                <div className="bg-white p-4 rounded-lg shadow-md mt-4">
                    {activeTab === "nuevo" ? (
                        <>
                            <h4 className="text-lg font-semibold text-gray-900 mb-4">Agregar Artículo</h4>
                            <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-lg shadow-lg mt-4">
    <h4 className="text-lg font-bold text-gray-800 mb-4 uppercase tracking-wide">Agregar Artículo</h4>
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
        <input type="text" 
            className="p-3 border rounded-lg text-sm w-56 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Nombre Artículo" 
            value={nombreArticulo} 
            onChange={(e) => setNombreArticulo(e.target.value)} 
        />
        <select className="p-3 border rounded-lg text-sm w-56 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={estado} onChange={(e) => setEstado(e.target.value)}>
            <option value="">Estado</option>
            <option value="ACTIVOS">ACTIVOS</option>
            <option value="CONSUMIBLES">CONSUMIBLES</option>
            <option value="DESCONTINUADO">DESCONTINUADO</option>
        </select>
        <select className="p-3 border rounded-lg text-sm w-56 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            value={unidad} onChange={(e) => setUnidad(e.target.value)}>
            <option value="">Unidad</option>
            <option value="Litro">Litro</option>
            <option value="Kilo">Kilo</option>
            <option value="Metro">Metro</option>
        </select>
        <input type="number" 
            className="p-3 border rounded-lg text-sm w-56 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400" 
            placeholder="Cantidad" 
            value={cantidad} 
            onChange={(e) => setCantidad(e.target.value)} 
        />
        <button type="submit" 
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs w-32 hover:shadow-md transition-all">
            + Agregar
        </button>
    </div>
</form>

                        </>
                    ) : (
                        <>
                            <h4 className="text-lg font-bold text-gray-800 mb-4 tracking-wide">
    Artículo Existente
</h4>
<div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50 p-6 rounded-lg shadow-lg">
    <select className="p-3 border rounded-lg text-sm w-56 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
        <option>Nothing selected</option>
        <option>Artículo 1</option>
        <option>Artículo 2</option>
    </select>
    <input type="text" 
        className="p-3 border rounded-lg text-sm w-56 bg-gray-300 font-bold text-gray-700" 
        placeholder="ACTUAL" disabled 
    />
    <input type="text" 
        className="p-3 border rounded-lg text-sm w-56 bg-gray-300 font-bold text-gray-700" 
        placeholder="CANTIE" disabled 
    />
    <input type="text" 
        className="p-3 border rounded-lg text-sm w-56 bg-gray-300 font-bold text-gray-700" 
        placeholder="PROVEEDOR" disabled 
    />
    <input type="text" 
        className="p-3 border rounded-lg text-sm w-56 bg-gray-300 font-bold text-gray-700" 
        placeholder="UBICACION" disabled 
    />
    <button className="bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold px-4 py-2 rounded-lg text-xs w-32 hover:shadow-md transition-all">
        + Agregar
    </button>
</div>

                        </>
                    )}
                </div>

                {/* TABLA DE ARTÍCULOS */}
                <div className="mt-6 bg-white p-6 rounded-xl shadow-lg">
    {/* Controles de la tabla */}
    <div className="flex justify-between items-center mb-4">
        <label className="text-sm font-semibold text-gray-700">Mostrar:
            <select className="ml-2 p-2 border rounded-md text-sm font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option>10</option>
                <option>25</option>
                <option>50</option>
            </select>
        </label>
        <input 
            type="text" 
            placeholder="Buscar..." 
            className="p-2 border rounded-md text-sm font-bold text-gray-900 w-40 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
    </div>

    {/* Tabla mejorada */}
    <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 text-sm">
            <thead className="bg-gray-800 text-white text-lg font-bold uppercase">
                <tr>
                    {["COD", "ARTICULO", "MODELO", "PROVEEDOR", "UBICACION", "STOCK", "ACCION"].map((header, index) => (
                        <th key={index} className="border p-3">{header}</th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-300">
                <tr className="text-center hover:bg-gray-100 transition-all">
                    <td className="border p-3 text-gray-900 font-semibold">123</td>
                    <td className="border p-3 text-gray-900 font-semibold">Artículo 1</td>
                    <td className="border p-3 text-gray-900 font-semibold">Modelo 1</td>
                    <td className="border p-3 text-gray-900 font-semibold">Proveedor 1</td>
                    <td className="border p-3 text-gray-900 font-semibold">Ubicación 1</td>
                    <td className="border p-3 text-green-700 font-bold">100</td>
                    <td className="border p-3 flex justify-center gap-2">
                        <button className="bg-blue-500 text-white px-3 py-1 rounded-md text-xs hover:shadow-md transition">
                            ✏️
                        </button>
                        <button className="bg-red-500 text-white px-3 py-1 rounded-md text-xs hover:shadow-md transition">
                            🗑
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</div>



            </div>
        </div>
    );
};

export default ArticuloPage;
