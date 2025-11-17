// src/pages/ConsolaPage.tsx
import SectionConsola from '../components/consola/SectionConsola';

export default function ConsolaPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Consola de Auscultación</h1>
        <p className="text-slate-600 text-sm">
          Desde aquí podés acceder a todos los módulos: bandeja, fuentes, laboratorio, reportes y visualización.
        </p>
      </header>

      <SectionConsola />
      {/* Aquí después podés agregar cards que lleven a cada módulo */}
    </div>
  );
}
