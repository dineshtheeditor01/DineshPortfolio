import HeroSection from "../sections/HeroSection";
import MarqueeSection from "../sections/MarqueeSection";
import WorksPreview from "../sections/WorksPreview";
import AboutSection from "../sections/AboutSection";
import SkillsSection from "../sections/SkillsSection";
import ContactSection from "../sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <WorksPreview />
      <div id="about">
        <AboutSection />
      </div>
      <div id="skills">
        <SkillsSection />
      </div>
      <div id="contact">
        <ContactSection />
      </div>
    </>
  );
}
