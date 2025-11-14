import React from "react";

function SectionFuentes() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold">Fuentes</h2>

      <p className="text-sm text-slate-600 max-w-3xl">
        Todas las fuentes de ingesta del sistema: dispositivos automáticos,
        planillas cargadas manualmente, watchers que monitorean directorios
        locales o de red, y archivos CSV provenientes de terceros como ORSEP.
      </p>

      {/* GRID DE FUENTES */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* CARD — CR1000 */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-semibold">
            CR
          </div>
          <div>
            <p className="text-sm font-medium">CR1000 – Meteorología</p>
            <p className="text-xs text-slate-500">Sensores automáticos</p>
            <p className="mt-1 text-xs text-slate-600">
              Última lectura: 12:04 hs
            </p>
          </div>
        </div>

        {/* CARD — CR800 */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-semibold">
            C8
          </div>
          <div>
            <p className="text-sm font-medium">CR800 – Hidráulica</p>
            <p className="text-xs text-slate-500">Canales + caudalímetro</p>
            <p className="mt-1 text-xs text-slate-600">
              Última lectura: 11:48 hs
            </p>
          </div>
        </div>

        {/* CARD — CSV ORSEP */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex items-center gap-4">
          <div className="p-3 bg-emerald-700 text-white rounded-xl text-xs font-semibold">
            OR
          </div>
          <div>
            <p className="text-sm font-medium">ORSEP – CSV mensual</p>
            <p className="text-xs text-slate-500">Lecturas externas</p>
            <p className="mt-1 text-xs text-slate-600">
              Última importación: 3 octubre
            </p>
          </div>
        </div>

        {/* CARD — FTP/Folder */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex items-center gap-4">
          <div className="p-3 bg-slate-900 text-white rounded-xl text-xs font-semibold">
            FD
          </div>
          <div>
            <p className="text-sm font-medium">Folder interno</p>
            <p className="text-xs text-slate-500">CSV auto-detectados</p>
            <p className="mt-1 text-xs text-slate-600">
              Último archivo: hace 12 min
            </p>
          </div>
        </div>

        {/* CARD — Manual App Móvil */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex items-center gap-4">
          <div className="p-3 bg-amber-600 text-white rounded-xl text-xs font-semibold">
            AP
          </div>
          <div>
            <p className="text-sm font-medium">App móvil</p>
            <p className="text-xs text-slate-500">Planillas en campo</p>
            <p className="mt-1 text-xs text-slate-600">
              Última carga: 10:22 hs
            </p>
          </div>
        </div>

        {/* CARD — Manual Escritorio */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex items-center gap-4">
          <div className="p-3 bg-indigo-700 text-white rounded-xl text-xs font-semibold">
            PC
          </div>
          <div>
            <p className="text-sm font-medium">Carga manual escritorio</p>
            <p className="text-xs text-slate-500">Planillas CSV</p>
            <p className="mt-1 text-xs text-slate-600">
              Última carga: 9:11 hs
            </p>
          </div>
        </div>

      </div>

      {/* WATCHERS */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-4">
        <h3 className="text-base font-semibold">Watchers activos</h3>

        {/* Watcher 1 */}
        <div className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
          <div>
            <p className="font-medium">Watcher – CR1000</p>
            <p className="text-xs text-slate-500">Monitoreo cada 60 s</p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            OK
          </span>
        </div>

        {/* Watcher 2 */}
        <div className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
          <div>
            <p className="font-medium">Watcher – Carpeta interna</p>
            <p className="text-xs text-slate-500">Escaneo cada 30 s</p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            OK
          </span>
        </div>

        {/* Watcher 3 */}
        <div className="p-4 border rounded-xl flex justify-between items-center hover:bg-slate-50 transition">
          <div>
            <p className="font-medium">Watcher – App móvil</p>
            <p className="text-xs text-slate-500">
              Sincronización activa
            </p>
          </div>
          <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">
            OK
          </span>
        </div>
      </div>

    </div>
  );
}

export default SectionFuentes;
