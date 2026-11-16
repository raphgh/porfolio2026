/**
 * Original Web Audio blips for Wii Mode — not Nintendo audio.
 * Muted by default; preference stored in localStorage.
 */

const STORAGE_KEY = "wii-sound-enabled";

let ctx: AudioContext | null = null;
let enabled = false;

function getCtx() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function isWiiSoundEnabled() {
  return enabled;
}

export function loadWiiSoundPreference() {
  if (typeof window === "undefined") return false;
  enabled = window.localStorage.getItem(STORAGE_KEY) === "1";
  return enabled;
}

export function setWiiSoundEnabled(next: boolean) {
  enabled = next;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  }
}

/** Call on first user gesture so AudioContext can resume. */
export async function unlockWiiSound() {
  const audio = getCtx();
  if (!audio) return;
  if (audio.state === "suspended") await audio.resume();
}

function tone(freq: number, duration: number, type: OscillatorType, gain = 0.04) {
  if (!enabled) return;
  const audio = getCtx();
  if (!audio) return;
  const now = audio.currentTime;
  const osc = audio.createOscillator();
  const g = audio.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, now);
  g.gain.setValueAtTime(0.0001, now);
  g.gain.exponentialRampToValueAtTime(gain, now + 0.01);
  g.gain.exponentialRampToValueAtTime(0.0001, now + duration);
  osc.connect(g);
  g.connect(audio.destination);
  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export const wiiSound = {
  hover: () => tone(880, 0.04, "triangle", 0.025),
  confirm: () => {
    tone(520, 0.08, "sine", 0.05);
    setTimeout(() => tone(780, 0.1, "sine", 0.04), 60);
  },
  back: () => tone(320, 0.07, "triangle", 0.035),
  page: () => {
    tone(440, 0.06, "sine", 0.03);
    setTimeout(() => tone(660, 0.08, "sine", 0.025), 50);
  },
  ding: () => {
    tone(660, 0.12, "sine", 0.045);
    setTimeout(() => tone(990, 0.18, "sine", 0.035), 90);
  },
};
