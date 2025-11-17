import MainLayout from "../components/layout/MainLayout";
import SectionConsultas from "../components/consultas/SectionConsultas";

export default function ConsultasPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Consultas</h1>
      <SectionConsultas />
    </MainLayout>
  );
}
