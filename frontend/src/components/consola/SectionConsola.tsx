import React from "react";

function SectionConsola() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Consola</h2>

      {/* GRID PRINCIPAL */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* CARD 1 — Pendientes */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Pendientes</p>
            <p className="text-xl font-semibold">3</p>
            <p className="text-xs text-slate-500">1 planilla · 1 excepción</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white font-semibold text-xs">
            IN
          </div>
        </div>

        {/* CARD 2 — Nivel estación */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Nivel estación</p>
            <p className="text-xl font-semibold">353.2 m</p>
            <p className="text-xs text-slate-500">+0.8 vs ayer</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white font-semibold text-xs">
            LV
          </div>
        </div>

        {/* CARD 3 — Watchers */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Watchers</p>
            <p className="text-xl font-semibold">5 activos</p>
            <p className="text-xs text-emerald-600">OK</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white font-semibold text-xs">
            WT
          </div>
        </div>

        {/* CARD 4 — Mes */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs uppercase text-slate-500">Mes</p>
            <p className="text-xl font-semibold">14 planillas</p>
            <p className="text-xs text-slate-500">4 con observaciones</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white font-semibold text-xs">
            MO
          </div>
        </div>

      </div>

      {/* CONTENEDOR SECUNDARIO */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-3">

        <h3 className="text-base font-semibold">Panel de control</h3>
        <p className="text-sm text-slate-600">
          Aquí podrás visualizar el estado del sistema, la ingesta de datos,
          y las operaciones recientes.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">

          {/* Sub-card 1 */}
          <div className="bg-slate-50 border rounded-xl p-4">
            <p className="text-sm font-medium">Calidad de datos</p>
            <p className="text-xs text-slate-500">Últimas 24 h</p>
            <p className="text-lg font-semibold mt-1">98.4%</p>
          </div>

          {/* Sub-card 2 */}
          <div className="bg-slate-50 border rounded-xl p-4">
            <p className="text-sm font-medium">Ingestas</p>
            <p className="text-xs text-slate-500">Automáticas</p>
            <p className="text-lg font-semibold mt-1">87 registros</p>
          </div>

          {/* Sub-card 3 */}
          <div className="bg-slate-50 border rounded-xl p-4">
            <p className="text-sm font-medium">Excepciones</p>
            <p className="text-xs text-slate-500">Detectadas</p>
            <p className="text-lg font-semibold mt-1 text-red-600">2</p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default SectionConsola;
