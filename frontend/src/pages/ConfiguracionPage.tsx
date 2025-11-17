import MainLayout from "../components/layout/MainLayout";

export default function ConfiguracionPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Configuración del Sistema</h1>

      <div className="grid gap-6 max-w-xl">
        <div className="p-6 bg-white rounded-xl shadow">Usuarios</div>
        <div className="p-6 bg-white rounded-xl shadow">Alertas</div>
        <div className="p-6 bg-white rounded-xl shadow">Permisos</div>
      </div>
    </MainLayout>
  );
}
