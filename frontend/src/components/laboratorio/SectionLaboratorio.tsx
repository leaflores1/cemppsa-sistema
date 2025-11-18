
function SectionLaboratorio() {
  return (
    <div className="space-y-6">

      <p className="text-sm text-slate-600 max-w-3xl">
        Aquí podés probar transformaciones de la capa Silver antes de publicar
        datos a la capa Gold. Visualizá cómo cambian los valores, revisá
        inconsistencias, aplicá reglas y verificá resultados previos a la
        publicación.
      </p>

      {/* GRID PRINCIPAL */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

        {/* CARD — Transformaciones */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Silver</p>
            <p className="text-sm font-medium">Transformaciones</p>
            <p className="text-xs text-slate-500">Reglas &amp; limpieza</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            TR
          </div>
        </div>

        {/* CARD — Preview */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Preview</p>
            <p className="text-sm font-medium">Antes de publicar</p>
            <p className="text-xs text-slate-500">Validación final</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            PV
          </div>
        </div>

        {/* CARD — Reglas */}
        <div className="border rounded-2xl bg-white p-4 shadow-sm hover:bg-slate-50 transition flex justify-between items-center">
          <div>
            <p className="text-xs uppercase text-slate-500">Reglas</p>
            <p className="text-sm font-medium">Calidad &amp; coherencia</p>
            <p className="text-xs text-slate-500">Detección de outliers</p>
          </div>
          <div className="p-3 rounded-xl bg-slate-900 text-white text-xs font-semibold">
            RG
          </div>
        </div>

      </div>

      {/* BLOQUE: TRANSFORMACIONES */}
      <div className="bg-white border rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-base font-semibold">Transformaciones en Silver</h3>

        <p className="text-sm text-slate-600 max-w-2xl">
          Aplicá reglas de validación, conversiones de unidad, limpieza de outliers,
          redondeos o mapeos específicos para cada instrumento. El laboratorio te
          permite ver cómo se transformarán los valores antes de enviarlos a Gold.
        </p>

        {/* FORMULARIO */}
        <div className="grid sm:grid-cols-3 gap-4">

          {/* Selector instrumento */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Instrumento</label>
            <select className="border rounded-lg px-3 py-2 bg-white text-slate-700">
              <option>Piezómetros</option>
              <option>Freatímetros</option>
              <option>Acelerómetros</option>
            </select>
          </div>

          {/* Reglas */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Regla</label>
            <select className="border rounded-lg px-3 py-2 bg-white text-slate-700">
              <option>Eliminar outliers</option>
              <option>Promedio móvil</option>
              <option>Corrección de unidad</option>
            </select>
          </div>

          {/* Parámetro */}
          <div className="flex flex-col text-sm">
            <label className="text-slate-600 mb-1">Parámetro</label>
            <input
              type="text"
              placeholder="p.ej. kPa"
              className="border rounded-lg px-3 py-2 bg-white text-slate-700"
            />
          </div>

        </div>

        {/* Botón aplicar */}
        <button className="px-4 py-2 rounded-xl bg-slate-900 text-slate-50 text-sm font-semibold hover:bg-slate-800">
          Aplicar transformación
        </button>

        {/* VISTA PREVIA */}
        <div className="border rounded-xl p-4 bg-slate-50 space-y-3">
          <p className="text-sm text-slate-500">Resultado previo:</p>
          <div className="overflow-x-auto">
            <table className="text-sm w-full">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="p-2">Valor original</th>
                  <th className="p-2">Transformado</th>
                  <th className="p-2">Unidad</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                <tr className="border-t">
                  <td className="p-2">243.3</td>
                  <td className="p-2">243.1</td>
                  <td className="p-2">kPa</td>
                </tr>
                <tr className="border-t">
                  <td className="p-2">242.9</td>
                  <td className="p-2">242.8</td>
                  <td className="p-2">kPa</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

export default SectionLaboratorio;
