import type { Metadata } from "next";
import { WiiExperienceBoard } from "@/components/wii/WiiExperienceBoard";
import { WiiPage } from "@/components/wii/WiiPage";

export const metadata: Metadata = {
  title: "Work",
  description: "Professional work experience - companies, teams, and impact.",
};

export default function ExperiencePage() {
  return (
    <WiiPage
      title="Work"
      thumb="/logos/nokia.jpg"
      accent="#fce8d8"
      channelId="experience"
    >
      <WiiExperienceBoard />
    </WiiPage>
  );
}
