import { HeroSectionV2 as HeroSection } from "@/components/hero/HeroSectionV2";
// ↑ Experiment: Obsidian Assembly-inspired hero (material backdrop + fragmented type).
//   To revert: change line above to `import { HeroSection } from "@/components/hero/HeroSection";`
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
