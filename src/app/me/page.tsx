import type { Metadata } from "next";
import { WiiMeBoard } from "@/components/wii/WiiMeBoard";
import { WiiPage } from "@/components/wii/WiiPage";
import { about } from "@/data/about";

export const metadata: Metadata = {
  title: "Me",
  description: "About Raphaelle Ghanem — software engineering, art, music, and culture.",
};

export default function MePage() {
  return (
    <WiiPage
      title="Me"
      subtitle={about.intro || undefined}
      thumb="/logos/me.jpg"
      accent="#f5d0d4"
      channelId="about"
    >
      <WiiMeBoard />
    </WiiPage>
  );
}
