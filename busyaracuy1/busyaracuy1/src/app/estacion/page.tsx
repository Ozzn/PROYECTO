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
    <div className="flex min-h-screen overflow-auto">
      {/* Ajuste para el menú lateral */}
      <div className="w-[250px] bg-gray-800 text-white hidden md:block">
        {/* Aquí iría el menú lateral */}
      </div>

      {/* Contenedor Principal */}
      <div className="flex-1 p-4 ml-0 md:ml-[250px]">
        <div className="flex justify-between space-x-4">
          {/* Formulario y Tasa */}
          <div className="w-3/4 space-y-4">
            {/* Tasa del Día */}
            <div className="bg-white shadow rounded p-4">
              <h5 className="font-semibold">TASA DEL DÍA</h5>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-3xl font-bold text-gray-600">EJ</span>
                <input
                  type="text"
                  className="border p-2 text-3xl font-semibold w-32 text-center"
                  value={tasa}
                  onChange={(e) => setTasa(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-4 py-2 rounded">
                  ACTUALIZAR
                </button>
              </div>
            </div>

            {/* Formulario de Venta */}
            <div className="bg-white shadow rounded p-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <label className="font-semibold">NOMBRE</label>
                  <input type="text" className="border w-full p-2" placeholder="Nombre" />
                </div>
                <div>
                  <label className="font-semibold">CI</label>
                  <input type="text" className="border w-full p-2" placeholder="Cédula" />
                </div>
                <div>
                  <label className="font-semibold">TIPO VEHÍCULO</label>
                  <select className="border w-full p-2">
                    <option>SELECCIONE</option>
                    <option>CARRO</option>
                    <option>CAMIÓN</option>
                    <option>MOTO</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold">PLACA</label>
                  <input type="text" className="border w-full p-2" placeholder="Placa" />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="font-semibold">LITROS</label>
                  <input type="text" className="border w-full p-2" placeholder="Litros" />
                </div>
                <div>
                  <label className="font-semibold">TIPO PAGO</label>
                  <select className="border w-full p-2">
                    <option>SELECCIONE</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold">MONTO</label>
                  <input type="text" className="border w-full p-2" placeholder="Monto a pagar" />
                </div>
                <div>
                  <label className="font-semibold">FECHA</label>
                  <input type="text" className="border w-full p-2 bg-gray-100" value="18-03-25" readOnly />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <div>
                  <label className="font-semibold">HORA</label>
                  <input type="text" className="border w-full p-2 bg-gray-100" value={hora} readOnly />
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <p className="text-blue-600">
                  Atendido por: <span className="font-semibold">Admin</span> -{" "}
                  <span className="font-semibold">E/S Táchira</span>
                </p>
                <div>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded">ACEPTAR</button>
                  <button className="bg-red-600 text-white px-4 py-2 rounded ml-2">CANCELAR</button>
                </div>
              </div>
            </div>
          </div>

          {/* Contenedor Tickets Recientes */}
          <div className="w-1/4">
            <div className="bg-white shadow rounded p-4 text-sm">
              <h5 className="font-semibold text-lg">Tickets recientes</h5>
              <div className="flex items-center mt-2">
                <span className="mr-2">Buscar:</span>
                <input type="text" className="border p-1 w-full" placeholder="" />
              </div>
              <table className="border w-full mt-2 text-sm">
                <thead>
                  <tr>
                    <th className="border p-1 text-left">TICKETS RECIENTES</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-1 text-center text-gray-500">
                      Ningún dato disponible
                    </td>
                  </tr>
                </tbody>
              </table>
              <p className="text-gray-500 text-xs mt-2">Registros 0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
