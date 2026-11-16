import type { Metadata } from "next";
import { WiiLabBoard } from "@/components/wii/WiiLabBoard";
import { WiiPage } from "@/components/wii/WiiPage";

export const metadata: Metadata = {
  title: "Lab",
  description: "Small experiments, prototypes and half-finished ideas.",
};

export default function LabPage() {
  return (
    <WiiPage
      title="Lab"
      subtitle="prototypes, hackathon projects, and other experiments."
      thumb="/lab/emoji-blast.png"
      accent="#f9d6e4"
      channelId="lab"
    >
      <WiiLabBoard />
    </WiiPage>
  );
}
