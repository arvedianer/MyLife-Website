import { FloatingNavbar } from "@/components/FloatingNavbar";
import HeroSection from "@/components/HeroSection";
import EcosystemSection from "@/components/EcosystemSection";
import TrainingSection from "@/components/TrainingSection";
import NutritionSection from "@/components/NutritionSection";
import LifeSection from "@/components/LifeSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;

  return (
    <>
      <FloatingNavbar />
      <main>
        <HeroSection />
        <EcosystemSection />
        <TrainingSection />
        <NutritionSection />
        <LifeSection />
        <StatsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
