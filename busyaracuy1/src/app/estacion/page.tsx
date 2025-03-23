"use client";

import { useState, useEffect } from "react";

const Page = () => {
  const [tasa, setTasa] = useState("00.00");
  const [hora, setHora] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateHora = () => {
        const now = new Date();
        setHora(now.toLocaleTimeString());
      };
      updateHora();
      const interval = setInterval(updateHora, 1000);
      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="flex min-h-screen overflow-auto bg-gray-100">
      {/* Menú Lateral */}
      <div className="w-[250px] bg-gray-900 text-white hidden md:block p-4">
        {/* Aquí iría el menú lateral */}
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 p-6 ml-0 md:ml-[250px]">
        <div className="flex justify-between space-x-6">
          {/* Formulario y Tasa */}
          <div className="w-3/4 space-y-6">
            {/* Tasa del Día */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <h5 className="font-bold text-gray-900 text-lg">TASA DEL DÍA</h5>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-4xl font-extrabold text-gray-700">EJ</span>
                <input
                  type="text"
                  className="border p-3 text-3xl font-bold w-32 text-center rounded-md focus:ring-2 focus:ring-blue-400"
                  value={tasa}
                  onChange={(e) => setTasa(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-5 py-3 rounded-md text-sm font-semibold hover:bg-opacity-80">
                  ACTUALIZAR
                </button>
              </div>
            </div>

            {/* Formulario de Venta */}
            <div className="bg-white shadow-lg rounded-lg p-6">
              <div className="grid grid-cols-4 gap-6">
                {[
                  { label: "NOMBRE", type: "text", placeholder: "Nombre" },
                  { label: "CI", type: "text", placeholder: "Cédula" },
                  { label: "PLACA", type: "text", placeholder: "Placa" },
                ].map(({ label, type, placeholder }, index) => (
                  <div key={index}>
                    <label className="font-semibold text-gray-900">{label}</label>
                    <input type={type} className="border w-full p-3 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-400" placeholder={placeholder} />
                  </div>
                ))}

                <div>
                  <label className="font-semibold text-gray-900">TIPO VEHÍCULO</label>
                  <select className="border w-full p-3 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-400">
                    <option>SELECCIONE</option>
                    <option>CARRO</option>
                    <option>CAMIÓN</option>
                    <option>MOTO</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mt-6">
                {[
                  { label: "LITROS", placeholder: "Litros" },
                  { label: "MONTO", placeholder: "Monto a pagar" },
                ].map(({ label, placeholder }, index) => (
                  <div key={index}>
                    <label className="font-semibold text-gray-900">{label}</label>
                    <input type="text" className="border w-full p-3 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-400" placeholder={placeholder} />
                  </div>
                ))}

                <div>
                  <label className="font-semibold text-gray-900">TIPO PAGO</label>
                  <select className="border w-full p-3 rounded-md text-gray-900 focus:ring-2 focus:ring-blue-400">
                    <option>SELECCIONE</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-gray-900">FECHA</label>
                  <input type="text" className="border w-full p-3 rounded-md bg-gray-100 text-gray-900" value="18-03-25" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-6 mt-6">
                <div>
                  <label className="font-semibold text-gray-900">HORA</label>
                  <input type="text" className="border w-full p-3 rounded-md bg-gray-100 text-gray-900" value={hora} readOnly />
                </div>
              </div>

              <div className="mt-6 flex justify-between items-center">
                <p className="text-blue-700 font-medium">
                  Atendido por: <span className="font-semibold">Admin</span> -{" "}
                  <span className="font-semibold">E/S Táchira</span>
                </p>
                <div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-opacity-80">ACEPTAR</button>
                  <button className="bg-red-600 text-white px-6 py-3 rounded-md text-sm font-semibold hover:bg-opacity-80 ml-3">CANCELAR</button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenedor Tickets Recientes */}
          <div className="w-1/4">
            <div className="bg-white shadow-lg rounded-lg p-6 text-sm">
              <h5 className="font-bold text-gray-900 text-lg">Tickets recientes</h5>
              <div className="flex items-center mt-3">
                <span className="mr-2 text-gray-900 font-semibold">Buscar:</span>
                <input type="text" className="border p-2 w-full rounded-md text-gray-900 focus:ring-2 focus:ring-blue-400" placeholder="" />
              </div>
              <table className="border w-full mt-3 text-sm">
                <thead>
                  <tr>
                    <th className="border p-3 text-left text-gray-900 font-semibold bg-gray-200">TICKETS RECIENTES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 text-center text-gray-500">Ningún dato disponible</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-gray-500 text-xs mt-3">Registros 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
