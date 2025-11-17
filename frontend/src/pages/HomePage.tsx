// src/pages/HomePage.tsx
import HeroInicio from '../components/home/HeroInicio';
import SectionConsola from '../components/consola/SectionConsola';

export default function HomePage() {
  return (
    <div className="space-y-8">
      <HeroInicio />
      {/* Pequeño resumen de consola en la home */}
      <section>
        <h2 className="text-lg font-semibold mb-3">Resumen rápido</h2>
        <SectionConsola />
      </section>
    </div>
  );
}
