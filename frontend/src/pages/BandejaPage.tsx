// ✅ src/pages/BandejaPage.tsx
// Solo orquesta componentes y maneja el estado de la página

import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import { batchService } from '../services/batch.service';
import BandejaContent from '../components/bandeja/BandejaContent';

export default function BandejaPage() {
  // La página solo maneja la carga de datos
  const { data: batches, loading, error, execute } = useApi(batchService.listBatches);

  useEffect(() => {
    execute();
  }, [execute]);

  return (
    <div className="space-y-8">
      {/* Header de la página */}
      <header>
        <p className="text-sm text-slate-500">CEMPPSA · Consola de Auscultación</p>
        <h1 className="text-2xl font-semibold">Bandeja de Planillas</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Aquí llegan las planillas generadas desde la app móvil o cargadas manualmente.
        </p>
      </header>

      {/* El componente maneja toda la presentación */}
      <BandejaContent 
        batches={batches} 
        loading={loading} 
        error={error}
      />
    </div>
  );
}