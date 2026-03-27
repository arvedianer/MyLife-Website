import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import EcosystemOverview from "@/components/EcosystemOverview";
import TrainingSection from "@/components/TrainingSection";
import NutritionSection from "@/components/NutritionSection";
import ImprovementSection from "@/components/ImprovementSection";
import ComparisonTable from "@/components/ComparisonTable";
import VisionRoadmap from "@/components/VisionRoadmap";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <Navbar locale={locale} />
      <main>
        <HeroSection />
        <EcosystemOverview />
        <TrainingSection />
        <NutritionSection />
        <ImprovementSection />
        <ComparisonTable />
        <VisionRoadmap />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
