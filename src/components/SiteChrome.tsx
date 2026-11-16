"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";
import { Navbar } from "@/components/Navbar";
import { ThreadTrail } from "@/components/ThreadTrail";
import { WiiHome } from "@/components/wii/WiiHome";
import { WiiShell } from "@/components/wii/WiiShell";

/**
 * Swaps chrome between Wii Mode and Modern Mode without a full reload.
 * Same routes and content; only the shell and home presentation change.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  const { mode, ready } = useInterfaceMode();
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (!ready) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-[#d8dee6] text-[#5c6b78]">
        <span className="font-mono text-sm tracking-wide">loading channels…</span>
      </div>
    );
  }

  if (mode === "wii") {
    if (isHome) return <WiiHome />;
    return (
      <div className="wii-root flex min-h-dvh flex-col">
        <WiiShell>
          <main id="main" className="relative z-10 flex-1">
            {children}
          </main>
        </WiiShell>
      </div>
    );
  }

  return (
    <>
      <ThreadTrail />
      <Navbar />
      <main id="main" className="relative z-10 flex-1">
        {children}
      </main>
      <Footer />
    </>
  );
}
