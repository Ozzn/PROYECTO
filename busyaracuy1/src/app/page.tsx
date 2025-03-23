export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Bienvenido a BUSYARACUY
      </h1>
      <p className="text-lg text-gray-600 mb-6">
        Por favor, inicia sesión o regístrate
      </p>
      <div className="space-x-4">
        <a
          href="/login"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition"
        >
          Iniciar sesión
        </a>
        <a
          href="/register"
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
        >
          Registrarse
        </a>
      </div>
    </main>
  );
}
