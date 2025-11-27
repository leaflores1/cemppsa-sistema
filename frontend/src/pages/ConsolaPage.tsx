// src/pages/ConsolaPage.tsx
import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { batchService } from '../services/batch.service';
import { healthService } from '../services/health.service';

export default function ConsolaPage() {
  const { data: batches, loading, error, execute } = useApi(batchService.listBatches);
  const { data: health, execute: checkHealth } = useApi(healthService.checkHealth);

  useEffect(() => {
    execute();
    checkHealth();
  }, [execute, checkHealth]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Consola de Auscultación</h1>
        <p className="text-slate-600 text-sm">
          Desde aquí podés acceder a todos los módulos: bandeja, fuentes, laboratorio, reportes y visualización.
        </p>
      </header>

      {/* Estado del Backend */}
      <div className="bg-white border rounded-2xl p-4 shadow-sm">
        <h2 className="text-sm font-semibold mb-2">Estado del Backend</h2>
        {health ? (
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-emerald-500"></div>
            <span className="text-sm text-slate-600">API: {health.status}</span>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-red-500"></div>
            <span className="text-sm text-slate-600">API: Sin conexión</span>
          </div>
        )}
      </div>

      {/* KPIs principales */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Batches totales</p>
          <p className="text-xl font-semibold">
            {loading ? '...' : batches?.length || 0}
          </p>
          <p className="text-xs text-slate-500">Registros en DB</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Pendientes</p>
          <p className="text-xl font-semibold">3</p>
          <p className="text-xs text-slate-500">1 planilla · 1 excepción</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Watchers</p>
          <p className="text-xl font-semibold">5 activos</p>
          <p className="text-xs text-emerald-600">OK</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Mes</p>
          <p className="text-xl font-semibold">14 planillas</p>
          <p className="text-xs text-slate-500">4 con observaciones</p>
        </div>
      </div>

      {/* Lista de batches desde la API */}
      {loading && <p className="text-sm text-slate-500">Cargando datos...</p>}
      
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">Error al conectar con el backend:</p>
          <p className="text-xs text-red-600 mt-1">{error.message}</p>
        </div>
      )}

      {batches && batches.length > 0 && (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="text-base font-semibold">Últimos batches (desde API)</h3>
          
          {batches.slice(0, 5).map((batch) => (
            <div 
              key={batch.batch_uuid}
              className="p-4 border rounded-xl hover:bg-slate-50 transition"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">Batch {batch.batch_uuid}</p>
                  <p className="text-xs text-slate-500">
                    Creado: {new Date(batch.created_at).toLocaleString('es-AR')}
                  </p>
                  <p className="text-xs text-slate-500">
                    Fuente: {batch.source || 'N/A'}
                  </p>
                </div>
                <span className={`px-3 py-1 text-xs rounded-full ${
                  batch.status === 'received' 
                    ? 'bg-emerald-100 text-emerald-700'
                    : batch.status === 'duplicate'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-slate-100 text-slate-700'
                }`}>
                  {batch.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}