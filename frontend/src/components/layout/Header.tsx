// src/components/layout/Header.tsx
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b bg-white/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        
        {/* LOGO / TÍTULO */}
        <Link to="/" className="flex items-center gap-3">
          <div className="h-9 w-9 grid place-items-center rounded-xl bg-slate-900 text-white">
            <span className="text-xs font-bold">C</span>
          </div>
          <h1 className="text-lg font-semibold hidden md:block">
            CEMPPSA · Consola de Auscultación
          </h1>
        </Link>

        {/* NAV DESKTOP */}
        <nav className="hidden md:flex items-center gap-3 text-sm">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              isActive 
                ? "px-3 py-1.5 rounded-lg bg-slate-900 text-white" 
                : "navbtn"
            }
          >
            Inicio
          </NavLink>

          <NavLink 
            to="/consola" 
            className={({ isActive }) => 
              isActive 
                ? "px-3 py-1.5 rounded-lg bg-slate-900 text-white" 
                : "navbtn"
            }
          >
            Consola
          </NavLink>

          {/* OPERACIONES */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Operaciones <span className="text-xs">▼</span>
            </summary>
            <div className="menu">
              <NavLink to="/bandeja">Bandeja</NavLink>
              <NavLink to="/laboratorio">Laboratorio (Silver)</NavLink>
              <NavLink to="/publicar">Publicar & Reportes</NavLink>
            </div>
          </details>

          {/* DATOS */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Datos <span className="text-xs">▼</span>
            </summary>
            <div className="menu">
              <NavLink to="/fuentes">Fuentes & Watchers</NavLink>
              <NavLink to="/consultas">Consultas / API</NavLink>
            </div>
          </details>

          {/* VISUALIZACIÓN */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Visualización <span className="text-xs">▼</span>
            </summary>
            <div className="menu">
              <NavLink to="/visualizacion/mapa">Mapa 3D</NavLink>
              <NavLink to="/visualizacion/fotos">Fotos</NavLink>
              <NavLink to="/visualizacion/salud">Salud</NavLink>
            </div>
          </details>

          {/* CONFIG */}
          <details className="relative">
            <summary className="cursor-pointer navbtn flex items-center gap-1">
              Configuración <span className="text-xs">▼</span>
            </summary>
            <div className="menu">
              <NavLink to="/configuracion">Configuración</NavLink>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}