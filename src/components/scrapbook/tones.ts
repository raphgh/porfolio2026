export type Tone = "berry" | "powder" | "ink" | "card";

export const tones: Record<Tone, { surface: string; text: string; soft: string; rule: string }> = {
  berry: { surface: "bg-berry", text: "text-card", soft: "text-berry-soft", rule: "border-card/35" },
  powder: { surface: "bg-powder", text: "text-ink", soft: "text-ink/75", rule: "border-ink/25" },
  ink: { surface: "bg-ink", text: "text-paper", soft: "text-night-soft", rule: "border-paper/25" },
  card: { surface: "bg-card", text: "text-ink", soft: "text-ink-soft", rule: "border-rule" },
};

export const toneCycle: Tone[] = ["berry", "powder", "card"];
export const toneAt = (i: number, cycle: Tone[] = toneCycle) => cycle[i % cycle.length];

const tilts = [-1.6, 1.1, -0.7, 1.8, -1.2, 0.6];
export const tiltAt = (i: number, scale = 1) => tilts[i % tilts.length] * scale;
