import HeroWaterSvg from "../../lib/heroWaterSvg";

function HeroInicio() {

  const abrirModelo3D = () => {
    window.open("http://localhost:3000", "_blank");
  };

  return (
    <>
      {/* LADO IZQUIERDO */}
      <div className="space-y-6 text-white">

        <h2 className="text-3xl md:text-4xl font-semibold leading-tight text-white">
          Control de Auscultación
        </h2>

        <p className="text-slate-300 max-w-xl">
          Todo el sistema en una vista: fuentes, estado, alarmas y accesos rápidos. 
          Empezá por la <strong className="text-white">Consola</strong> o explorá los módulos.
        </p>

        {/* BOTONES */}
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="consola"
            className="px-4 py-2.5 rounded-xl bg-white text-slate-900 font-medium hover:bg-slate-100 shadow"
          >
            Ir a Consola
          </a>

          <a href="bandeja"
            className="px-4 py-2.5 rounded-xl bg-slate-800/70 text-white hover:bg-slate-700/80 border border-white/10"
          >
            Bandeja
          </a>

          <a href="fuentes"
            className="px-4 py-2.5 rounded-xl bg-slate-800/70 text-white hover:bg-slate-700/80 border border-white/10"
          >
            Fuentes
          </a>

          <a href="consultas"
            className="px-4 py-2.5 rounded-xl bg-slate-800/70 text-white hover:bg-slate-700/80 border border-white/10"
          >
            Consultas
          </a>
        </div>

        {/* KPIs */}
        <div className="mt-8 grid grid-cols-4 gap-4 text-xs">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="uppercase text-slate-300">Pendientes</p>
            <p className="text-lg font-semibold text-white">2</p>
            <p className="text-slate-400">1 planilla · 1 dura</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="uppercase text-slate-300">Cambios en Silver</p>
            <p className="text-lg font-semibold text-white">3</p>
            <p className="text-slate-400">sin publicar</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="uppercase text-slate-300">Últimos datos</p>
            <p className="text-lg font-semibold text-white">09:58</p>
            <p className="text-slate-400">cada 2 h</p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
            <p className="uppercase text-slate-300">Embalse</p>
            <p className="text-lg font-semibold text-white">1335.4 m</p>
            <p className="text-emerald-300">+0.2 m</p>
          </div>
        </div>
      </div>

      {/* LADO DERECHO — CÍRCULO CLICKEABLE */}
      <div className="relative grid place-items-center">
        <div
          className="relative h-72 w-72 hover:scale-105 transition cursor-pointer"
          onClick={abrirModelo3D}
          title="Abrir Modelo 3D"
        >
          <HeroWaterSvg />
        </div>
      </div>
    </>
  );
}

export default HeroInicio;
