import type { Metadata } from "next";
import { WiiPage } from "@/components/wii/WiiPage";
import { WiiPanel } from "@/components/wii/WiiPanel";
import { WiiProjectGrid } from "@/components/wii/WiiProjectGrid";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Projects I’ve built outside of professional roles.",
};

export default function WorkPage() {
  return (
    <WiiPage
      title="Projects"
      subtitle="case studies for each project to be added soon!"
      thumb="/logos/yard365.png"
      accent="#fde0d2"
      channelId="projects"
    >
      <WiiPanel>
        <WiiProjectGrid projects={projects} />
      </WiiPanel>
    </WiiPage>
  );
}
