import Header from "./components/Header";
import HeroInicio from "./components/HeroInicio";
import SectionConsola from "./components/SectionConsola";
import SectionBandeja from "./components/SectionBandeja";
import SectionFuentes from "./components/SectionFuentes";
import SectionConsultas from "./components/SectionConsultas";
import SectionLaboratorio from "./components/SectionLaboratorio";
import SectionPublicar from "./components/SectionPublicar";

function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-16">
        {/* INICIO */}
        <section id="inicio" className="grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-10 items-center">
          <HeroInicio />
        </section>

        {/* CONSOLA */}
        <section id="consola" className="space-y-4">
          <SectionConsola />
        </section>

        {/* BANDEJA */}
        <section id="bandeja" className="space-y-4">
          <SectionBandeja />
        </section>

        {/* FUENTES */}
        <section id="fuentes" className="space-y-4">
          <SectionFuentes />
        </section>

        {/* CONSULTAS */}
        <section id="consultas" className="space-y-4">
          <SectionConsultas />
        </section>

        {/* LABORATORIO */}
        <section id="laboratorio" className="space-y-4">
          <SectionLaboratorio />
        </section>

        {/* PUBLICAR */}
        <section id="publicar" className="space-y-4 mb-16">
          <SectionPublicar />
        </section>
      </main>
    </div>
  );
}

export default App;
