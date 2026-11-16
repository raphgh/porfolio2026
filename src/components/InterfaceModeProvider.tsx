"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  applyInterfaceMode,
  getPreferredInterfaceMode,
  type InterfaceMode,
} from "@/lib/interfaceMode";

type Ctx = {
  mode: InterfaceMode;
  setMode: (mode: InterfaceMode) => void;
  ready: boolean;
};

const InterfaceModeContext = createContext<Ctx>({
  mode: "wii",
  setMode: () => {},
  ready: false,
});

export function InterfaceModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<InterfaceMode>("wii");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = getPreferredInterfaceMode();
    applyInterfaceMode(initial);
    setModeState(initial);
    setReady(true);
  }, []);

  const setMode = useCallback((next: InterfaceMode) => {
    applyInterfaceMode(next);
    setModeState(next);
  }, []);

  const value = useMemo(() => ({ mode, setMode, ready }), [mode, setMode, ready]);

  return (
    <InterfaceModeContext.Provider value={value}>{children}</InterfaceModeContext.Provider>
  );
}

export function useInterfaceMode() {
  return useContext(InterfaceModeContext);
}
