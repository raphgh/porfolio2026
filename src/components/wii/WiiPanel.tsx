"use client";

import { createContext, useContext, useRef, type ReactNode } from "react";
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

/**
 * Glossy Wii content panel. Plain element (no Motion) so Safari paints cover images.
 * Pass-through wrapper in Modern mode.
 */
export function WiiPanel({ children, className = "", index: _index }: Props) {
  const { mode } = useInterfaceMode();

  if (mode !== "wii") {
    return <div className={className || undefined}>{children}</div>;
  }

  return <section className={`wii-panel ${className}`.trim()}>{children}</section>;
}
