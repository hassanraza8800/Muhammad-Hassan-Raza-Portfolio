import { useState } from 'react';
import { MotionConfig } from 'motion/react';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { VelocityMarquee } from './components/VelocityMarquee';
import { WorkShowcase } from './components/WorkShowcase';
import { CraftTimeline } from './components/CraftTimeline';
import { BackgroundLedger } from './components/BackgroundLedger';
import { ContactSection } from './components/ContactSection';
import { ProjectLightbox } from './components/ProjectLightbox';
import type { ProjectItem } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#F6F5F0] text-[#111216]">
        <Header />

        <main>
          <HeroSection onSelectProject={setSelectedProject} />
          <VelocityMarquee />
          <WorkShowcase onSelectProject={setSelectedProject} />
          <CraftTimeline />
          <BackgroundLedger />
        </main>

        <ContactSection />

        <ProjectLightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </MotionConfig>
  );
}
