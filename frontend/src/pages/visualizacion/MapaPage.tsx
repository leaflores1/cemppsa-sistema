// src/pages/visualizacion/MapaPage.tsx
import HeroWaterSvg from '../../lib/heroWaterSvg';

export default function MapaPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Mapa 3D de Potrerillos</h1>
          <p className="text-sm text-slate-600">
            Explora la presa, el embalse y los instrumentos en un modelo 3D interactivo.
          </p>
        </div>
        <div className="hidden sm:block h-20 w-20">
          <HeroWaterSvg />
        </div>
      </header>

      <div className="bg-slate-900 rounded-2xl overflow-hidden h-[520px]">
        {/* iframe por ahora, luego integrás directo Three.js si querés */}
        <iframe
          src="http://cemppsa.local/modelo3d"
          className="w-full h-full border-0"
          title="Modelo 3D CEMPPSA"
        />
      </div>
    </div>
  );
}
