import MainLayout from "../components/layout/MainLayout";
import SectionLaboratorio from "../components/laboratorio/SectionLaboratorio";

export default function LaboratorioPage() {
  return (
    <MainLayout>
      <h1 className="text-2xl font-bold mb-6">Laboratorio (SILVER)</h1>
      <SectionLaboratorio />
    </MainLayout>
  );
}
