import MainLayout from "../components/layout/MainLayout";
import SectionPublicar from "../components/publicar/SectionPublicar";

export default function PublicarPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Publicar / Reportes (GOLD)</h1>
      <SectionPublicar />
    </MainLayout>
  );
}
