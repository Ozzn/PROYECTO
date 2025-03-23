"use client";

import React, { useState, useEffect, FormEvent } from "react";
import Navbar from "../components/Navbar";

interface Personal {
    id: number;
    nick: string;
    nombres: string;
    apellidos: string;
    email: string;
    telefono: string;
    rol: string;
    status: string;
}

const Personal: React.FC = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [personal, setPersonal] = useState<Personal[]>([]);
    const [idPersonal, setIdPersonal] = useState("");
    const [departamento, setDepartamento] = useState("");
    const [rol, setRol] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [email, setEmail] = useState("");
    const [busqueda, setBusqueda] = useState("");

    useEffect(() => {
        fetchPersonal();
    }, []);

    const fetchPersonal = async () => {
        try {
            const response = await fetch("/api/personal");
            const data = await response.json();
            setPersonal(data);
        } catch (error) {
            console.error("Error al obtener personal:", error);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        const nuevoPersonal = { idPersonal, departamento, rol, nombre, apellido, telefono, email, status: "Activo" };

        try {
            const response = await fetch("/api/personal", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(nuevoPersonal),
            });

            if (response.ok) {
                fetchPersonal();
                alert("Personal agregado exitosamente");
                setIdPersonal("");
                setDepartamento("");
                setRol("");
                setNombre("");
                setApellido("");
                setTelefono("");
                setEmail("");
            } else {
                alert("Error al agregar personal");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex">
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
            <div className={`flex-1 bg-gray-100 min-h-screen p-6 transition-all duration-300 ${menuOpen ? "ml-64" : "ml-0 md:ml-64"}`}>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Agregar Personal</h4>

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                        <input type="text" className="p-3 border rounded text-gray-900 text-sm" placeholder="ID Personal" value={idPersonal} onChange={(e) => setIdPersonal(e.target.value)} />
                        <select className="p-3 border rounded text-gray-900 text-sm" value={departamento} onChange={(e) => setDepartamento(e.target.value)}>
                            <option value="">DEPARTAMENTO</option>
                            <option value="IT">IT</option>
                            <option value="Recursos Humanos">Recursos Humanos</option>
                        </select>
                        <select className="p-3 border rounded text-gray-900 text-sm" value={rol} onChange={(e) => setRol(e.target.value)}>
                            <option value="">ROLES</option>
                            <option value="Empleado">Empleado</option>
                            <option value="Encargado">Encargado</option>
                        </select>
                        <input type="text" className="p-3 border rounded text-gray-900 text-sm" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="flex items-center gap-4">
                        <input type="text" className="p-3 border rounded text-gray-900 text-sm" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} />
                        <input type="text" className="p-3 border rounded text-gray-900 text-sm" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} />
                        <input type="email" className="p-3 border rounded text-gray-900 text-sm" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded text-sm font-semibold hover:bg-opacity-80">+ Agregar</button>
                    </div>
                </form>

                <div className="mt-6">
                    <table className="w-full border-collapse border border-gray-300 text-sm">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                {["ID", "Nick", "Nombres", "Apellidos", "Email", "Teléfono", "Rol", "Status", "Acciones"].map((header, index) => (
                                    <th key={index} className="border p-2 text-gray-100">{header}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {personal.map((p) => (
                                <tr key={p.id} className="text-center text-gray-900">
                                    <td className="border p-2">{p.id}</td>
                                    <td className="border p-2">{p.nick}</td>
                                    <td className="border p-2">{p.nombres}</td>
                                    <td className="border p-2">{p.apellidos}</td>
                                    <td className="border p-2">{p.email}</td>
                                    <td className="border p-2">{p.telefono}</td>
                                    <td className="border p-2">{p.rol}</td>
                                    <td className="border p-2"><span className="px-2 py-1 rounded text-xs bg-teal-500 text-white">{p.status}</span></td>
                                    <td className="border p-2"><button className="bg-red-500 text-white px-2 py-1 rounded text-xs">🗑</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Personal;
