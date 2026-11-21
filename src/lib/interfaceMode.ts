export type InterfaceMode = "wii" | "modern";

export const INTERFACE_STORAGE_KEY = "interface-mode";

/** First visit defaults to Wii Mode. */
export function getPreferredInterfaceMode(): InterfaceMode {
  if (typeof window === "undefined") return "wii";
  try {
    const stored = localStorage.getItem(INTERFACE_STORAGE_KEY);
    if (stored === "wii" || stored === "modern") return stored;
  } catch {
    /* Safari private / blocked storage */
  }
  return "wii";
}

export function applyInterfaceMode(mode: InterfaceMode) {
  const root = document.documentElement;
  root.dataset.interface = mode;
  try {
    localStorage.setItem(INTERFACE_STORAGE_KEY, mode);
  } catch {
    /* Safari private / blocked storage - mode still applies for this session */
  }
}

export function toggleInterfaceMode(current: InterfaceMode): InterfaceMode {
  const next = current === "wii" ? "modern" : "wii";
  applyInterfaceMode(next);
  return next;
}

/** Runs before paint so the first frame isn't the wrong shell. */
export const interfaceBootScript = `(function(){try{var k=${JSON.stringify(INTERFACE_STORAGE_KEY)};var t=localStorage.getItem(k);var m=(t==='modern')?'modern':'wii';document.documentElement.dataset.interface=m;}catch(e){document.documentElement.dataset.interface='wii';}try{var ua=navigator.userAgent||'';var safari=/safari/i.test(ua)&&!/chrome|chromium|crios|fxios|edg/i.test(ua);var webkit=/applewebkit/i.test(ua)&&!/chrome|chromium|crios|fxios|edg/i.test(ua);document.documentElement.dataset.engine=(safari||webkit)?'safari':'other';}catch(e2){document.documentElement.dataset.engine='other';}})();`;
