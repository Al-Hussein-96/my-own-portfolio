import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import AISection from "@/components/AISection";
import BlogSection from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";

const Divider = () => (
  <div className="sec-divider" aria-hidden="true" />
);

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <Divider />
      <SkillsSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <AISection />
      <Divider />
      <BlogSection />
      <Divider />
      <ContactSection />
    </main>
  );
}
