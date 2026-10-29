/** `page` is the route the sticker hides on. */
export type StickerDef = {
  id: string;
  name: string;
  page: string;
  color: string;
  shape: React.ReactNode;
  detail?: React.ReactNode;
};

const star = "M32 7 39.3 22.8 56.5 24.8 43.8 36.6 47.2 53.6 32 45 16.8 53.6 20.2 36.6 7.5 24.8 24.7 22.8Z";

export const stickers: StickerDef[] = [
  {
    id: "powder",
    name: "Powder dot",
    page: "/",
    color: "#9cc4e8",
    shape: <circle cx="32" cy="32" r="23" />,
  },
  {
    id: "star",
    name: "Sakura star",
    page: "/work",
    color: "#e58fb4",
    shape: <path d={star} strokeLinejoin="round" />,
  },
  {
    id: "code",
    name: "Code block",
    page: "/experience",
    color: "#6a1b43",
    shape: <rect x="10" y="10" width="44" height="44" rx="9" />,
    detail: (
      <path d="M26 24 18 32l8 8M38 24l8 8-8 8" fill="none" stroke="#b8d4ec" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    ),
  },
  {
    id: "clover",
    name: "Blueberry clover",
    page: "/extracurriculars",
    color: "#6d8fd0",
    shape: (
      <>
        <circle cx="21" cy="21" r="12" />
        <circle cx="43" cy="21" r="12" />
        <circle cx="21" cy="43" r="12" />
        <circle cx="43" cy="43" r="12" />
        <circle cx="32" cy="32" r="12" />
      </>
    ),
  },
  {
    id: "play",
    name: "Play gem",
    page: "/lab",
    color: "#4a1030",
    shape: <path d="M32 7 54 19.5v25L32 57 10 44.5v-25Z" strokeLinejoin="round" />,
    detail: <path d="M28 24v16l12-8Z" fill="#e9c6d6" opacity="0.9" />,
  },
  {
    id: "heart",
    name: "Berry heart",
    page: "/about",
    color: "#b23a6f",
    shape: <path d="M32 54C15 43 8 33 8 24a12 12 0 0 1 24-4 12 12 0 0 1 24 4c0 9-7 19-24 30Z" strokeLinejoin="round" />,
  },
];

export function StickerArt({ sticker, className = "" }: { sticker: StickerDef; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={`drop-shadow-[0_3px_4px_rgb(0_0_0/0.22)] ${className}`} aria-hidden focusable="false">
      <g fill="#fff" stroke="#fff" strokeWidth="8">
        {sticker.shape}
      </g>
      <g fill={sticker.color}>{sticker.shape}</g>
      {sticker.detail}
      <ellipse cx="23" cy="20" rx="7" ry="4" fill="#fff" opacity="0.55" transform="rotate(-30 23 20)" />
    </svg>
  );
}
