
import HeroInicio from '../components/home/HeroInicio';

export default function HomePage() {
  return (

<div className="min-h-screen bg-slate-50 text-slate-900">

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

    </div>
  );
}
