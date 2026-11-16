"use client";

import { m } from "motion/react";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";

/**
 * Persistent Wii ↔ Modern switch. Top-right in both shells;
 * styling adapts to the active interface.
 */
export function ModeToggle({ variant = "auto" }: { variant?: "auto" | "wii" | "modern" }) {
  const { mode, setMode, ready } = useInterfaceMode();
  const look = variant === "auto" ? mode : variant;

  if (!ready) {
    return <div className="h-9 w-[9.5rem]" aria-hidden />;
  }

  if (look === "wii") {
    return (
      <div
        role="group"
        aria-label="Interface mode"
        className="relative grid grid-cols-2 rounded-full border border-[#9eb6c8] bg-gradient-to-b from-white to-[#e4ebf2] p-0.5 shadow-[0_2px_4px_rgb(0_0_0/0.12)]"
      >
        <m.span
          aria-hidden
          className="pointer-events-none absolute top-0.5 bottom-0.5 rounded-full bg-gradient-to-b from-[#5ec8f0] to-[#1a9ed0] shadow-[inset_0_1px_0_rgb(255_255_255/0.45)]"
          style={{ width: "calc(50% - 2px)" }}
          animate={{ left: mode === "wii" ? 2 : "calc(50%)" }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
        <Seg active={mode === "wii"} onClick={() => setMode("wii")} wii label="Wii" />
        <Seg active={mode === "modern"} onClick={() => setMode("modern")} wii label="Modern" />
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Interface mode"
      className="flex items-center gap-0.5 rounded-full border border-navy/30 bg-white p-0.5"
    >
      <Seg active={mode === "wii"} onClick={() => setMode("wii")} label="Wii" />
      <Seg active={mode === "modern"} onClick={() => setMode("modern")} label="Modern" />
    </div>
  );
}

function Seg({
  active,
  onClick,
  label,
  wii = false,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  wii?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={
        wii
          ? `relative z-[1] rounded-full px-2.5 py-1 text-center text-[0.7rem] font-semibold tracking-wide transition-colors ${
              active ? "text-white" : "text-[#5a6a78] hover:text-[#1e3a6e]"
            }`
          : `rounded-full px-2.5 py-1 text-[0.7rem] font-medium tracking-[0.04em] uppercase transition ${
              active ? "bg-navy text-snow" : "text-charcoal-muted hover:text-navy"
            }`
      }
    >
      {label}
    </button>
  );
}
