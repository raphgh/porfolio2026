import { LandingCanvas } from "@/components/LandingCanvas";
import { NavStack } from "@/components/NavStack";

/**
 * Sticky landing name stays put while the intro + nav cards
 * scroll up over it — reads as holding still while content arrives.
 */
export default function Home() {
  return (
    <div className="relative">
      <div className="sticky top-14 z-0 md:top-16">
        <LandingCanvas />
      </div>
      <div className="relative z-10 bg-white">
        <NavStack />
      </div>
    </div>
  );
}
