// src/pages/BandejaPage.tsx
import SectionBandeja from "../components/bandeja/SectionBandeja";

export default function BandejaPage() {
  return (
    <div className="space-y-8">
      <header>
        <p className="text-sm text-slate-500">
          CEMPPSA · Consola de Auscultación
        </p>
        <h1 className="text-2xl font-semibold">Bandeja de Planillas</h1>
        <p className="text-slate-500 mt-2 max-w-2xl">
          Aquí llegan las planillas generadas desde la app móvil o cargadas
          manualmente. Podés revisarlas, validar datos y decidir si pasan a la
          capa Silver o quedan pendientes.
        </p>
      </header>

      <SectionBandeja />
    </div>
  );
}