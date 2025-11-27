// frontend/src/pages/ConsultasPage.tsx
import { useState } from 'react';
import type { ConsultaRequest, ConsultaResponse } from '../services/consultas.service';
import { consultasService } from '../services/consultas.service';
import { catalogService } from '../services/catalog.service';
import { useApi } from '../hooks/useApi';

export default function ConsultasPage() {
  const { data: catalog } = useApi(catalogService.getCatalog);
  
  const [filtros, setFiltros] = useState<ConsultaRequest>({
    capa: 'silver',
    fecha_inicio: '',
    fecha_fin: '',
    instrument_codes: [],
    limit: 100
  });

  const [resultado, setResultado] = useState<ConsultaResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEjecutarConsulta = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await consultasService.explorarDatos(filtros);
      setResultado(data);
    } catch (err: any) {
      setError(err.message || 'Error al ejecutar consulta');
    } finally {
      setLoading(false);
    }
  };

  const handleExportar = async () => {
    try {
      const blob = await consultasService.exportarCSV(filtros);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `consulta_${new Date().toISOString().slice(0,10)}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert('Error al exportar CSV');
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Consultas de Datos</h1>
        <p className="text-sm text-slate-600">
          Consultá datos de Bronze, Silver o Gold. Filtrá por instrumento, fecha o parámetro.
        </p>
      </header>

      {/* Filtros */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold">Filtros de Consulta</h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Capa */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Capa de Datos</label>
            <select
              className="border rounded-lg px-3 py-2 bg-white"
              value={filtros.capa}
              onChange={(e) => setFiltros({ ...filtros, capa: e.target.value as any })}
            >
              <option value="bronze">Bronze (Crudo)</option>
              <option value="silver">Silver (Limpio)</option>
              <option value="gold">Gold (Analítico)</option>
            </select>
          </div>

          {/* Instrumento */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Instrumento</label>
            <select
              className="border rounded-lg px-3 py-2 bg-white"
              onChange={(e) => {
                const codes = e.target.value ? [e.target.value] : [];
                setFiltros({ ...filtros, instrument_codes: codes });
              }}
            >
              <option value="">Todos</option>
              {catalog?.instruments.map((inst) => (
                <option key={inst.instrument_code} value={inst.instrument_code}>
                  {inst.name} ({inst.instrument_code})
                </option>
              ))}
            </select>
          </div>

          {/* Fecha Inicio */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Fecha inicio</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 bg-white"
              value={filtros.fecha_inicio}
              onChange={(e) => setFiltros({ ...filtros, fecha_inicio: e.target.value })}
            />
          </div>

          {/* Fecha Fin */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Fecha fin</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 bg-white"
              value={filtros.fecha_fin}
              onChange={(e) => setFiltros({ ...filtros, fecha_fin: e.target.value })}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleEjecutarConsulta}
            disabled={loading}
            className="px-4 py-2 rounded-xl bg-slate-900 text-slate-50 text-sm font-semibold hover:bg-slate-800 disabled:opacity-50"
          >
            {loading ? 'Consultando...' : 'Ejecutar consulta'}
          </button>

          {resultado && (
            <button
              onClick={handleExportar}
              className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50"
            >
              Exportar CSV
            </button>
          )}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <p className="text-sm text-red-700">Error: {error}</p>
        </div>
      )}

      {/* Resultados */}
      {resultado && (
        <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-base font-semibold">
              Resultados ({resultado.total} registros)
            </h3>
            <span className="text-xs text-slate-500">
              Mostrando {resultado.lecturas.length} de {resultado.total}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="text-sm w-full">
              <thead>
                <tr className="text-left text-slate-600 border-b">
                  <th className="p-2">Instrumento</th>
                  <th className="p-2">Parámetro</th>
                  <th className="p-2">Valor</th>
                  <th className="p-2">Unidad</th>
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Notas</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {resultado.lecturas.map((lectura) => (
                  <tr key={lectura.id} className="border-b hover:bg-slate-50">
                    <td className="p-2 font-medium">{lectura.instrument_code}</td>
                    <td className="p-2">{lectura.parameter}</td>
                    <td className="p-2 font-semibold">{lectura.value.toFixed(2)}</td>
                    <td className="p-2">{lectura.unit}</td>
                    <td className="p-2">
                      {new Date(lectura.measured_at).toLocaleString('es-AR')}
                    </td>
                    <td className="p-2 text-xs text-slate-500">
                      {lectura.notes || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}