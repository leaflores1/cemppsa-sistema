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
             <section
                id="inicio"
                className="
                  relative 
                  overflow-hidden 
                  rounded-[2.5rem] 
                  bg-gradient-to-br 
                  from-[#0f1a2b] 
                  via-[#0f1e33] 
                  to-[#1b2538]
                  text-white
                  shadow-xl">
                <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-[1.2fr_1fr] gap-10 items-center">
                  <HeroInicio />
                </div>

                {/* Esferas decorativas como el diseño original */}
                <div className="absolute top-[-120px] right-[-80px] h-[360px] w-[360px] rounded-full bg-gradient-to-br from-indigo-400 via-blue-300 to-transparent opacity-30 blur-[120px]" />

                <div className="absolute bottom-[-140px] left-[-100px] h-[300px] w-[300px] rounded-full bg-gradient-to-br from-teal-300 via-cyan-200 to-transparent opacity-20 blur-[120px]" />
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
