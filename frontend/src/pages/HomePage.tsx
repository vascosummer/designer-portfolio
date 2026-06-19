import { HeroSectionV3 as HeroSection } from "@/components/hero/HeroSectionV3";
// ↑ Hybrid: V1 full 3D scene + V2 fragmented typography. No photo backdrop.
//   To revert to V1 (clean 3D + left-aligned thesis):     HeroSection from "@/components/hero/HeroSection"
//   To use V2 (Obsidian — photo backdrop + framed scene): HeroSectionV2 from "@/components/hero/HeroSectionV2"
import { ReelSection } from "@/components/reel/ReelSection";
import { WorkSection } from "@/components/work/WorkSection";
import { PracticeSection } from "@/components/practice/PracticeSection";
import { RecognitionSection } from "@/components/recognition/RecognitionSection";
import { ClosingSection } from "@/components/contact/ClosingSection";

export default function HomePage() {
  return (
    <main data-testid="home-page" className="relative">
      <HeroSection />
      <ReelSection />
      <WorkSection />
      <PracticeSection />
      <RecognitionSection />
      <ClosingSection />
    </main>
  );
}
