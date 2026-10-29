type Variant = "underline" | "circle" | "arrow" | "sparkle" | "squiggle";

const paths: Record<Variant, { viewBox: string; d: string; fill?: boolean }> = {
  underline: { viewBox: "0 0 100 12", d: "M2 8 C 20 2, 40 11, 58 6 S 88 10, 98 5" },
  squiggle: { viewBox: "0 0 100 10", d: "M1 6 C 12 1, 22 9, 34 5 S 56 10, 68 4 S 88 9, 99 5" },
  circle: { viewBox: "0 0 100 60", d: "M12 30 C 8 8, 40 2, 62 10 S 98 28, 88 44 S 40 62, 16 48 S 6 38, 12 30" },
  arrow: { viewBox: "0 0 48 32", d: "M4 22 C 14 8, 28 6, 40 12 M32 6 L40 12 L33 20" },
  sparkle: { viewBox: "0 0 24 24", d: "M12 2 L13.4 10.6 L22 12 L13.4 13.4 L12 22 L10.6 13.4 L2 12 L10.6 10.6 Z", fill: true },
};

type Props = { variant: Variant; className?: string; strokeWidth?: number };

export function Scribble({ variant, className = "", strokeWidth = 3 }: Props) {
  const p = paths[variant];
  return (
    <svg
      viewBox={p.viewBox}
      aria-hidden
      focusable="false"
      className={`pointer-events-none overflow-visible ${className}`}
      preserveAspectRatio={variant === "sparkle" || variant === "arrow" ? "xMidYMid meet" : "none"}
    >
      <path
        d={p.d}
        fill={p.fill ? "currentColor" : "none"}
        stroke={p.fill ? "none" : "currentColor"}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
