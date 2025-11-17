// src/components/layout/Header.tsx
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-semibold">
          <span className="h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center">C</span>
          <span>CEMPPSA · Consola de Auscultación</span>
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          <NavLink to="/" className="navbtn">
            Inicio
          </NavLink>
          <NavLink to="/consola" className="navbtn">
            Consola
          </NavLink>

          {/* Operaciones & Datos los podés detallar después */}
          <details className="relative">
            <summary className="navbtn cursor-pointer">Operaciones ▾</summary>
            <div className="menu">
              <NavLink to="/bandeja">Bandeja</NavLink>
              <NavLink to="/fuentes">Fuentes</NavLink>
            </div>
          </details>

          <details className="relative">
            <summary className="navbtn cursor-pointer">Datos ▾</summary>
            <div className="menu">
              <NavLink to="/consultas">Consultas</NavLink>
              <NavLink to="/laboratorio">Laboratorio</NavLink>
              <NavLink to="/publicar">Publicar / Reportes</NavLink>
            </div>
          </details>

          {/* 🔥 NUEVO: VISUALIZACIÓN */}
          <details className="relative">
            <summary className="navbtn cursor-pointer">Visualización ▾</summary>
            <div className="menu">
              <NavLink to="/visualizacion/mapa">Mapa 3D</NavLink>
              <NavLink to="/visualizacion/fotos">Fotos</NavLink>
              <NavLink to="/visualizacion/salud">Salud del sistema</NavLink>
            </div>
          </details>

          <details className="relative">
            <summary className="navbtn cursor-pointer">Configuración ▾</summary>
            <div className="menu">
              <NavLink to="/configuracion">Configuración general</NavLink>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
