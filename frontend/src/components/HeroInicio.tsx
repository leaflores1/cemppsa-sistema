import React from "react";
import HeroWaterSvg from "../lib/heroWaterSvg";

function HeroInicio() {
  return (
    <>
      {/* TEXTO */}
      <div className="space-y-4">
        
        <p className="pill bg-emerald-50 text-emerald-700 inline-flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Monitoreo, Análisis, Reportes, Consola CEMPPSA
        </p>

        <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
          Consola de Auscultación de Presa Potrerillos
        </h2>

        <p className="text-slate-600 max-w-xl">
          Desde esta consola podés seguir el estado de la auscultación,
          validar planillas, monitorear la ingesta de datos y preparar
          reportes para ORSEP y para la operación diaria.
        </p>

        {/* QUICK ACTION BUTTONS */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#consola" className="px-4 py-2.5 rounded-xl bg-slate-900 text-slate-50 font-medium hover:bg-slate-800">
            Ir a Consola
          </a>
          <a href="#bandeja" className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-50 hover:bg-slate-700">
            Bandeja
          </a>
          <a href="#fuentes" className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-50 hover:bg-slate-700">
            Fuentes
          </a>
          <a href="#consultas" className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-50 hover:bg-slate-700">
            Consultas
          </a>
        </div>

        {/* KPI CARDS */}
        <div className="mt-6 grid grid-cols-3 gap-3 max-w-md text-xs">
          
          <div className="bg-white border rounded-2xl p-3 shadow-sm">
            <p className="text-slate-500 uppercase">Nivel embalse</p>
            <p className="text-lg font-semibold">1368.4 msnm</p>
            <p className="text-emerald-600">+0.2 m vs ayer</p>
          </div>

          <div className="bg-white border rounded-2xl p-3 shadow-sm">
            <p className="text-slate-500 uppercase">Planillas mes</p>
            <p className="text-lg font-semibold">48</p>
            <p className="text-slate-500">4 con observaciones</p>
          </div>

          <div className="bg-white border rounded-2xl p-3 shadow-sm">
            <p className="text-slate-500 uppercase">Watchers</p>
            <p className="text-lg font-semibold">5 activos</p>
            <p className="text-emerald-600">OK</p>
          </div>

        </div>
      </div>

      {/* SVG */}
      <div className="relative grid place-items-center">
        <div className="relative h-64 w-64 lg:h-72 lg:w-72">
          <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-sm border border-white/10" />
          <HeroWaterSvg />
        </div>
      </div>
    </>
  );
}

export default HeroInicio;
