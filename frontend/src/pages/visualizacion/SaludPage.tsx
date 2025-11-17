// src/pages/visualizacion/SaludPage.tsx
export default function SaludPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Salud del Sistema</h1>
        <p className="text-sm text-slate-600">
          Estado de la red, servidores, watchers, ingestión de datos y calidad de registros.
        </p>
      </header>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        <div className="bg-white rounded-xl border p-4">
          <h2 className="text-sm font-semibold mb-1">Red y servidores</h2>
          <p className="text-xs text-slate-500 mb-3">
            Latencia, disponibilidad y estado de las VMs.
          </p>
          <div className="text-3xl font-bold text-emerald-500">OK</div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <h2 className="text-sm font-semibold mb-1">Watchers</h2>
          <p className="text-xs text-slate-500 mb-3">
            Procesos que monitorean y cargan datos automáticamente.
          </p>
          <div className="text-sm">
            <span className="font-semibold">5 activos</span> · 0 fallas últimas 24h
          </div>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <h2 className="text-sm font-semibold mb-1">Calidad de datos</h2>
          <p className="text-xs text-slate-500 mb-3">
            Registros válidos vs. inválidos en las últimas 24 horas.
          </p>
          <div className="text-3xl font-bold text-sky-500">98.4%</div>
        </div>
      </div>
    </div>
  );
}
