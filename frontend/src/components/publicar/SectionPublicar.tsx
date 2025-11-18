function SectionPublicar() {
  return (
    <div className="space-y-6">
 
      <p className="text-sm text-slate-600 max-w-3xl">
        Desde aquí se publican los datos validados de la capa Silver hacia la
        capa Gold, se generan reportes periódicos y se preparan salidas para
        ORSEP y otros destinatarios.
      </p>

      {/* GRID PRINCIPAL */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* CARD — Publicar a Gold */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Gold</p>
            <p className="text-sm font-medium">Publicar lote</p>
            <p className="text-xs text-slate-500">Desde Silver validado</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            GD
          </div>
        </div>

        {/* CARD — Reportes ORSEP */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">ORSEP</p>
            <p className="text-sm font-medium">Reportes mensuales</p>
            <p className="text-xs text-slate-500">Formato requerido</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            RP
          </div>
        </div>

        {/* CARD — Exportaciones */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Exportar</p>
            <p className="text-sm font-medium">Excel / CSV / PDF</p>
            <p className="text-xs text-slate-500">Consultas &amp; reportes</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            EX
          </div>
        </div>

      </div>

      {/* BLOQUE: PUBLICACIÓN */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-base font-semibold">Publicación de datos Gold</h3>

        <p className="text-sm text-slate-600 max-w-2xl">
          Seleccioná el periodo, el tipo de dato y la fuente de origen (Silver
          validado) para publicar a la capa Gold. Esta acción genera versiones
          trazables, listas para análisis avanzado o reportes externos.
        </p>

        {/* FORMULARIO */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Periodo</label>
            <select className="border rounded-lg px-3 py-2 bg-white text-slate-700">
              <option>Última semana</option>
              <option>Último mes</option>
              <option>Personalizado</option>
            </select>
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Tipo de dato</label>
            <select className="border rounded-lg px-3 py-2 bg-white text-slate-700">
              <option>Piezómetros</option>
              <option>Freatímetros</option>
              <option>Acelerómetros</option>
              <option>Caudalímetros</option>
            </select>
          </div>

          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Destino</label>
            <select className="border rounded-lg px-3 py-2 bg-white text-slate-700">
              <option>Gold interno</option>
              <option>Reporte ORSEP</option>
              <option>Exportación manual</option>
            </select>
          </div>
        </div>

        {/* Botón publicar */}
        <button className="px-4 py-2 rounded-xl bg-slate-900 text-slate-50 text-sm font-semibold hover:bg-slate-800">
          Publicar a Gold
        </button>

        {/* Historial */}
        <div className="border rounded-xl p-4 bg-slate-50 space-y-3">
          <p className="text-sm text-slate-500">Historial de publicaciones recientes:</p>
          <ul className="text-sm text-slate-700 space-y-1">
            <li>• 02/10/2024 – Piezómetros · Gold interno · Usuario: Fede</li>
            <li>• 27/09/2024 – Freatímetros · Reporte ORSEP · Usuario: Víctor</li>
            <li>• 20/09/2024 – Acelerómetros · Exportación manual · Usuario: Romina</li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default SectionPublicar;
