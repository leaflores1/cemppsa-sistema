// ✅ src/components/bandeja/BandejaContent.tsx
// Maneja SOLO la presentación de la bandeja

import type { BatchSummary } from '../../types/api.types';

interface Props {
  batches: BatchSummary[] | null;
  loading: boolean;
  error: Error | null;
}

export default function BandejaContent({ batches, loading, error }: Props) {
  // Lógica de filtrado/cálculos
  const pending = batches?.filter(b => b.status === 'received') || [];
  const processed = batches?.filter(b => b.status === 'processed') || [];
  const duplicates = batches?.filter(b => b.status === 'duplicate') || [];

  if (loading) {
    return <p className="text-sm text-slate-500">Cargando planillas...</p>;
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-sm text-red-700">Error: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">En revisión</p>
          <p className="text-xl font-semibold">{pending.length}</p>
          <p className="text-xs text-slate-500">Pendientes de procesar</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Procesadas</p>
          <p className="text-xl font-semibold">{processed.length}</p>
          <p className="text-xs text-slate-500">Este mes</p>
        </div>

        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <p className="text-xs uppercase text-slate-500">Duplicados</p>
          <p className="text-xl font-semibold">{duplicates.length}</p>
          <p className="text-xs text-slate-500">Rechazados</p>
        </div>
      </div>

      {/* Lista de planillas */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold">Últimas planillas</h3>

        {!batches || batches.length === 0 ? (
          <p className="text-sm text-slate-500">No hay planillas registradas</p>
        ) : (
          batches.map((batch) => (
            <div 
              key={batch.batch_uuid}
              className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition"
            >
              <div>
                <p className="font-medium">Planilla {batch.batch_uuid.slice(0, 8)}</p>
                <p className="text-xs text-slate-500">
                  Creada: {new Date(batch.created_at).toLocaleString('es-AR')}
                </p>
                <p className="text-xs text-slate-500">
                  Fuente: {batch.source || 'app'}
                </p>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${
                batch.status === 'received' 
                  ? 'bg-amber-100 text-amber-700'
                  : batch.status === 'processed'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-red-100 text-red-700'
              }`}>
                {batch.status}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}