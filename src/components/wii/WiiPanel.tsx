"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
import { m, useReducedMotion } from "motion/react";
import { useInterfaceMode } from "@/components/InterfaceModeProvider";

type PanelCtx = { takeIndex: () => number };
const WiiPanelContext = createContext<PanelCtx | null>(null);

export function WiiPanelProvider({ children }: { children: ReactNode }) {
  const indexRef = useRef(0);
  const api = useRef<PanelCtx>({
    takeIndex: () => {
      const i = indexRef.current;
      indexRef.current += 1;
      return i;
    },
  }).current;
  indexRef.current = 0;
  return <WiiPanelContext.Provider value={api}>{children}</WiiPanelContext.Provider>;
}

type Props = {
  children: ReactNode;
  className?: string;
  index?: number;
};

/** Glossy Wii content panel. Pass-through wrapper in Modern mode. */
export function WiiPanel({ children, className = "", index }: Props) {
  const { mode } = useInterfaceMode();
  const reduce = useReducedMotion();
  const ctx = useContext(WiiPanelContext);
  const slot = index ?? ctx?.takeIndex() ?? 0;

  if (mode !== "wii") {
    return <div className={className || undefined}>{children}</div>;
  }

  return (
    <m.section
      className={`wii-panel ${className}`.trim()}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduce
          ? { duration: 0.28, delay: slot * 0.04 }
          : { type: "spring", stiffness: 280, damping: 28, delay: slot * 0.06 }
      }
    >
      {children}
    </m.section>
  );
}
