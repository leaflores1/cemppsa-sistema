// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import ConsolaPage from './pages/ConsolaPage';
import BandejaPage from './pages/BandejaPage';
import FuentesPage from './pages/FuentesPage';
import ConsultasPage from './pages/ConsultasPage';
import LaboratorioPage from './pages/LaboratorioPage';
import PublicarPage from './pages/PublicarPage';
import ConfiguracionPage from './pages/ConfiguracionPage';

// Visualización
import MapaPage from './pages/visualizacion/MapaPage';
import FotosPage from './pages/visualizacion/FotosPage';
import SaludPage from './pages/visualizacion/SaludPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout><HomePage /></MainLayout>} />
        <Route path="/consola" element={<MainLayout><ConsolaPage /></MainLayout>} />
        <Route path="/bandeja" element={<MainLayout><BandejaPage /></MainLayout>} />
        <Route path="/fuentes" element={<MainLayout><FuentesPage /></MainLayout>} />
        <Route path="/consultas" element={<MainLayout><ConsultasPage /></MainLayout>} />
        <Route path="/laboratorio" element={<MainLayout><LaboratorioPage /></MainLayout>} />
        <Route path="/publicar" element={<MainLayout><PublicarPage /></MainLayout>} />
        <Route path="/configuracion" element={<MainLayout><ConfiguracionPage /></MainLayout>} />



        {/* Visualización */}
        <Route path="/visualizacion/mapa" element={<MainLayout><MapaPage /></MainLayout>} />
        <Route path="/visualizacion/fotos" element={<MainLayout><FotosPage /></MainLayout>} />
        <Route path="/visualizacion/salud" element={<MainLayout><SaludPage /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;