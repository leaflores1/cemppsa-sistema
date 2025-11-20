import { useState } from "react";

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        
        {/* LOGO / TÍTULO */}
        <div className="flex items-center gap-3">

          <div className="h-15 w-15 grid place-items-center rounded-xl">
            <img
                src="/cemppsa_logo.png"
                alt="Logo CEMPPSA"
                className="h-14 w-auto object-contain"
              />
          </div>

        </div>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-3 text-sm">

          <a href="/" className="px-3 py-1.5 rounded-lg bg-slate-900 text-white">
            Inicio
          </a>

          <a href="consola" className="px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50">
            Consola
          </a>

          {/* OPERACIONES */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Operaciones 
            </summary>
            <div className="menu">
              <a href="bandeja">Bandeja</a>
              <a href="laboratorio">Laboratorio (Silver)</a>
              <a href="publicar">Publicar & Reportes</a>
            </div>
          </details>

          {/* DATOS */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Datos 
            </summary>
            <div className="menu">
              <a href="fuentes">Fuentes & Watchers</a>
              <a href="consultas">Consultas / API</a>
            </div>
          </details>

          {/* SALUD */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Salud 
            </summary>
            <div className="menu">
              <a href="salud">Salud (futuro)</a>
            </div>
          </details>

          {/* CONFIG */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Configuración 
            </summary>
            <div className="menu">
              <a href="config">Catálogos</a>
            </div>
          </details>
        </nav>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden px-3 py-2 rounded-lg border"
        >
          Menú
        </button>
      </div>

      {/* NAV MOBILE */}
      {mobileOpen && (
        <div className="md:hidden border-t">
          <nav className="max-w-7xl mx-auto px-4 py-3 space-y-2 text-sm">

            <a href="inicio" className="block px-3 py-2 rounded-lg bg-slate-900 text-white">
              Inicio
            </a>

            <a href="consola" className="block px-3 py-2 rounded-lg border">
              Consola
            </a>

            {/* OPERACIONES */}
            <details className="rounded-lg bg-white border">
              <summary className="px-3 py-2 cursor-pointer rounded-lg">
                Operaciones
              </summary>
              <div className="px-3 pb-2 space-y-1">
                <a href="bandeja" className="block px-2 py-1 rounded hover:bg-slate-50">Bandeja</a>
                <a href="laboratorio" className="block px-2 py-1 rounded hover:bg-slate-50">Laboratorio</a>
                <a href="publicar" className="block px-2 py-1 rounded hover:bg-slate-50">Publicar</a>
              </div>
            </details>

            {/* DATOS */}
            <details className="rounded-lg bg-white border">
              <summary className="px-3 py-2 cursor-pointer rounded-lg">Datos</summary>
              <div className="px-3 pb-2 space-y-1">
                <a href="fuentes" className="block px-2 py-1 rounded hover:bg-slate-50">Fuentes</a>
                <a href="consultas" className="block px-2 py-1 rounded hover:bg-slate-50">Consultas</a>
              </div>
            </details>

          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;