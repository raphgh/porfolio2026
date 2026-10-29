const stickerTone = {
  powder: "bg-powder text-ink",
  berry: "bg-berry text-card",
  card: "bg-card text-ink",
  ink: "bg-ink text-paper",
} as const;

type Props = {
  children: React.ReactNode;
  tone?: keyof typeof stickerTone;
  rotate?: number;
  pixel?: boolean;
  className?: string;
  as?: "span" | "li" | "p";
};

export function Sticker({ children, tone = "powder", rotate = 0, pixel = false, className = "", as: El = "span" }: Props) {
  return (
    <El
      style={rotate ? { rotate: `${rotate}deg` } : undefined}
      className={`inline-flex items-center gap-1.5 border-[1.5px] border-ink px-2 py-1 shadow-hard-sm ${
        pixel ? "font-pixel text-[0.8rem] leading-none tracking-wide uppercase" : "label"
      } ${stickerTone[tone]} ${className}`}
    >
      {children}
    </El>
  );
}
