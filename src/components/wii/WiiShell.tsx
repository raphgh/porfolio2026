"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { ModeToggle } from "@/components/ModeToggle";
import { WiiCursor } from "@/components/wii/WiiCursor";
import { site } from "@/data/site";

/**
 * Lightweight Wii chrome for internal pages — channel framing without
 * drowning portfolio content. Homepage uses the full `WiiHome` instead.
 */
/** Routes that render their own full `<WiiPage>` chrome. */
const SELF_CONTAINED = new Set(["/work", "/lab", "/experience", "/me"]);

export function WiiShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome || SELF_CONTAINED.has(pathname)) return <>{children}</>;

  return (
    <div className="wii-channel-page">
      <WiiCursor />
      <header className="wii-channel-page__bar">
        <Link href="/" className="wii-channel-page__back">
          ← Channels
        </Link>
        <p className="wii-channel-page__mark">{site.shortName}</p>
        <ModeToggle variant="wii" />
      </header>
      <div className="wii-channel-page__stage">{children}</div>
    </div>
  );
}
