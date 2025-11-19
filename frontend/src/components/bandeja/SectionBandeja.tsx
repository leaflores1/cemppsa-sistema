// src/components/bandeja/SectionBandeja.tsx
import { useEffect } from "react";
import { useApi } from "../../hooks/useApi";
import { batchService } from "../../services/batch.service";
import type { BatchSummary } from "../../types/api.types";

export default function SectionBandeja() {
  const { data, loading, error, execute } = useApi<BatchSummary[]>(
    batchService.listBatches
  );

  // Llamamos a la API apenas se monta el componente
  useEffect(() => {
    execute();
  }, [execute]);

  if (loading) {
    return <p className="text-slate-500">Cargando planillas...</p>;
  }

  if (error) {
    return (
      <div className="text-red-600">
        Error al cargar planillas: {error.message}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="text-slate-500">
        No hay planillas recibidas todavía. Enviá una desde la app móvil o
        cargá una manualmente.
      </p>
    );
  }

  return (
    <div className="border rounded-xl bg-white shadow-sm overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-50 text-left text-xs uppercase text-slate-500">
          <tr>
            <th className="px-4 py-2">Batch UUID</th>
            <th className="px-4 py-2">Estado</th>
            <th className="px-4 py-2">Fuente</th>
            <th className="px-4 py-2">Creado</th>
            <th className="px-4 py-2">Recibido</th>
          </tr>
        </thead>
        <tbody>
          {data.map((b) => (
            <tr key={b.batch_uuid} className="border-t">
              <td className="px-4 py-2 font-mono text-xs">
                {b.batch_uuid}
              </td>
              <td className="px-4 py-2">{b.status}</td>
              <td className="px-4 py-2">{b.source}</td>
              <td className="px-4 py-2">{b.created_at}</td>
              <td className="px-4 py-2">{b.server_received_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}