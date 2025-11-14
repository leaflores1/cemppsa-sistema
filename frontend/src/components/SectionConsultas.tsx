import React from "react";

function SectionConsultas() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Consultas</h2>

      <p className="text-sm text-slate-600 max-w-3xl">
        Consultá datos de la capa Silver o Gold, realizá pruebas rápidas sobre el
        API, descargá resultados en CSV y generá consultas filtradas por
        instrumento, fecha, técnico o tipo de dato.
      </p>

      {/* GRID PRINCIPAL */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* CARD — API Explorer */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">API</p>
            <p className="text-sm font-medium">Explorador rápido</p>
            <p className="text-xs text-slate-500">GET /silver / gold</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            API
          </div>
        </div>

        {/* CARD — Query Builder */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Consultas</p>
            <p className="text-sm font-medium">Constructor visual</p>
            <p className="text-xs text-slate-500">Filtros avanzados</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            QB
          </div>
        </div>

        {/* CARD — CSV Export */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Exportar</p>
            <p className="text-sm font-medium">Descarga CSV</p>
            <p className="text-xs text-slate-500">Silver &amp; Gold</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            CSV
          </div>
        </div>

      </div>

      {/* BLOQUE: EXPLORACIÓN */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-base font-semibold">Exploración de datos</h3>

        <p className="text-sm text-slate-600 max-w-2xl">
          Probá consultas directamente desde esta interfaz. Elegí un rango de fechas,
          un instrumento o una capa (Bronze/Silver/Gold) y obtené una tabla previa.
        </p>

        {/* Filtros */}
        <div className="grid sm:grid-cols-3 gap-4">

          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Fecha inicio</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 bg-white text-slate-700"
            />
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Fecha fin</label>
            <input
              type="date"
              className="border rounded-lg px-3 py-2 bg-white text-slate-700"
            />
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Instrumento</label>
            <select className="border rounded-lg px-3 py-2 bg-white text-slate-700">
              <option>Piezómetros</option>
              <option>Freatímetros</option>
              <option>Acelerómetros</option>
              <option>Caudalímetros</option>
            </select>
          </div>
        </div>

        {/* Botón Ejecutar */}
        <button className="px-4 py-2 rounded-xl bg-slate-900 text-slate-50 text-sm font-semibold hover:bg-slate-800">
          Ejecutar consulta
        </button>

        {/* Tabla previa */}
        <div className="border rounded-xl p-4 bg-slate-50">
          <p className="text-sm text-slate-500 mb-2">Vista previa:</p>
          <div className="overflow-x-auto">
            <table className="text-sm w-full">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="p-2">Fecha</th>
                  <th className="p-2">Valor</th>
                  <th className="p-2">Unidad</th>
                  <th className="p-2">Instrumento</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t">
                  <td className="p-2">2024-10-02 12:01</td>
                  <td className="p-2">234.1</td>
                  <td className="p-2">kPa</td>
                  <td className="p-2">PZ-3B</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">2024-10-02 11:58</td>
                  <td className="p-2">233.5</td>
                  <td className="p-2">kPa</td>
                  <td className="p-2">PZ-3B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SectionConsultas;
