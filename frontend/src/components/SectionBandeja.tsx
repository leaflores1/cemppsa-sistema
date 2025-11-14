import React from "react";

function SectionBandeja() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Bandeja</h2>

      <p className="text-sm text-slate-600 max-w-2xl">
        Aquí llegan las planillas generadas desde la aplicación móvil o cargadas
        manualmente. Podés revisarlas, validar datos, ver observaciones y
        decidir si pasan a la capa Silver o quedan pendientes de corrección.
      </p>

      {/* GRID PRINCIPAL */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* En revisión */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center group hover:bg-slate-50 transition">
          <div>
            <p className="text-xs uppercase text-slate-500">En revisión</p>
            <p className="text-xl font-semibold">3</p>
            <p className="text-xs text-slate-500">2 de octubre</p>
          </div>
          <div className="p-3 bg-slate-900 text-white rounded-xl font-semibold text-xs">
            RV
          </div>
        </div>

        {/* Publicadas */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center group hover:bg-slate-50 transition">
          <div>
            <p className="text-xs uppercase text-slate-500">Publicadas</p>
            <p className="text-xl font-semibold">14</p>
            <p className="text-xs text-slate-500">Este mes</p>
          </div>
          <div className="p-3 bg-slate-900 text-white rounded-xl font-semibold text-xs">
            PB
          </div>
        </div>

        {/* Observaciones */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex justify-between items-center group hover:bg-slate-50 transition">
          <div>
            <p className="text-xs uppercase text-slate-500">Observaciones</p>
            <p className="text-xl font-semibold">4</p>
            <p className="text-xs text-slate-500">No críticas</p>
          </div>
          <div className="p-3 bg-red-600 text-white rounded-xl font-semibold text-xs">
            OB
          </div>
        </div>

      </div>

      {/* LISTA DE PLANILLAS */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold">Últimas planillas</h3>

        {/* Ítem 1 */}
        <div className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
          <div>
            <p className="font-medium">Piezómetros — Planilla #482</p>
            <p className="text-xs text-slate-500">Enviada por Fede · 13:42 hs · 12 puntos cargados</p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-amber-100 text-amber-700">
            En revisión
          </span>
        </div>

        {/* Ítem 2 */}
        <div className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
          <div>
            <p className="font-medium">Freatímetros — Planilla #479</p>
            <p className="text-xs text-slate-500">Enviada por Víctor · 11:20 hs · 7 puntos cargados</p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            Publicada
          </span>
        </div>

        {/* Ítem 3 */}
        <div className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
          <div>
            <p className="font-medium">Acelerómetros — Planilla #475</p>
            <p className="text-xs text-slate-500">Enviada por Romina · 10:03 hs · 15 lecturas</p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
            Observaciones
          </span>
        </div>

      </div>
    </div>
  );
}

export default SectionBandeja;
