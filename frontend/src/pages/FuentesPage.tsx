import MainLayout from "../components/layout/MainLayout";
import SectionFuentes from "../components/fuentes/SectionFuentes";

export default function FuentesPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Fuentes de Datos</h1>
      <SectionFuentes />
    </MainLayout>
  );
}
