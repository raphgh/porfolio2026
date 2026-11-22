"use client";

import type { ChannelThumbVariant } from "@/data/wiiChannels";

export type ChannelThumbProps = {
  variant: ChannelThumbVariant;
  title: string;
  accent?: string;
  hovered?: boolean;
  preview?: string;
};

const LAB_ICONS = [
  { src: "/lab/figma.svg", alt: "Figma", left: "8%", top: "22%", size: "28%" },
  { src: "/lab/lumiere-studio.jpg", alt: "Lumiere", left: "36%", top: "14%", size: "30%" },
  { src: "/lab/blossom-blocks.jpg", alt: "Blossom Blocks", left: "62%", top: "24%", size: "26%" },
  { src: "/lab/emoji-blast.png", alt: "Emoji Blast", left: "18%", top: "52%", size: "29%" },
  { src: "/lab/hackbibis.png", alt: "Hackbibis", left: "48%", top: "48%", size: "32%" },
] as const;

const EXP_TICKER = "Nokia · CICS · CCSN · La Rotonde · Carleton · Nokia · CICS · CCSN · ";

const PROJECT_SHOTS = {
  a: ["/logos/yard365.png", "/projects/this-website/cover.png"],
  b: ["/logos/insite.jpg", "/logos/newomelet.png"],
} as const;

/**
 * Channel face art. Prefer real <img> over CSS background-image - Safari
 * often blanks backgrounds under overflow + radius + transform stacks.
 */
export function ChannelThumb({ variant, title, accent, hovered = false }: ChannelThumbProps) {
  const lightTitle = variant === "resume" || variant === "comingSoon";

  return (
    <span className={`wii-thumb wii-thumb--${variant}`} data-hovered={hovered ? "true" : "false"}>
      <ThumbArt variant={variant} hovered={hovered} accent={accent} />
      {/* Overlays stay out of the art stacking context */}
      <span className="wii-thumb__scan" aria-hidden />
      <span className="wii-thumb__gloss" aria-hidden />
      {variant !== "comingSoon" ? (
        <span className={`wii-thumb__title${lightTitle ? " is-dark" : ""}`} aria-hidden>
          {title}
        </span>
      ) : (
        <span className="wii-thumb__coming" aria-hidden>
          Coming soon
        </span>
      )}
    </span>
  );
}

function ThumbArt({
  variant,
  hovered,
  accent,
}: {
  variant: ChannelThumbVariant;
  hovered: boolean;
  accent?: string;
}) {
  switch (variant) {
    case "projects":
      return <ProjectsThumb hovered={hovered} />;
    case "lab":
      return <LabThumb hovered={hovered} />;
    case "experience":
      return <ExperienceThumb hovered={hovered} />;
    case "me":
      return <MeThumb hovered={hovered} />;
    case "blog":
      return <BlogThumb hovered={hovered} />;
    case "resume":
      return <ResumeThumb hovered={hovered} />;
    case "awards":
      return <AwardsThumb hovered={hovered} />;
    case "contact":
      return <IconThumb kind="mail" accent={accent} />;
    case "github":
      return <IconThumb kind="github" accent={accent} />;
    case "linkedin":
      return <IconThumb kind="linkedin" accent={accent} />;
    case "comingSoon":
    default:
      return <ComingSoonThumb />;
  }
}

function ProjectsThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-projects" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-projects__lawn" aria-hidden />
      <span className="wii-thumb-projects__phones">
        {(["a", "b"] as const).map((slot) => (
          <span key={slot} className={`wii-thumb-phone-tilt wii-thumb-phone-tilt--${slot}`}>
            <span className="wii-thumb-phone">
              <img
                className="wii-thumb-phone__shot wii-thumb-phone__shot--a"
                src={PROJECT_SHOTS[slot][0]}
                alt=""
                decoding="async"
                draggable={false}
              />
              <img
                className={`wii-thumb-phone__shot wii-thumb-phone__shot--b${hovered ? " is-on" : ""}`}
                src={PROJECT_SHOTS[slot][1]}
                alt=""
                decoding="async"
                draggable={false}
              />
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

function LabThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-lab" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-lab__crowd">
        {LAB_ICONS.map((icon, i) => (
          <span
            key={icon.alt}
            className="wii-thumb-lab__bubble-wrap"
            style={{
              left: icon.left,
              top: icon.top,
              width: icon.size,
              zIndex: i + 1,
            }}
          >
            <span className="wii-thumb-lab__bubble">
              <img src={icon.src} alt="" decoding="async" draggable={false} />
            </span>
          </span>
        ))}
      </span>
    </span>
  );
}

function ExperienceThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-exp" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-exp__logo">
        <img src="/logos/nokia.jpg" alt="" decoding="async" draggable={false} />
      </span>
      <span className="wii-thumb-exp__ticker-wrap">
        <span className="wii-thumb-exp__ticker">
          {EXP_TICKER}
          {EXP_TICKER}
        </span>
      </span>
    </span>
  );
}

function MeThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-me" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-me__checker" aria-hidden />
      <span className="wii-thumb-me__avatar-wrap">
        <span className="wii-thumb-me__avatar">
          <img src="/scrapbook/fundraiser.jpg" alt="" decoding="async" draggable={false} />
        </span>
      </span>
    </span>
  );
}

const BLOG_POSTCARDS = [
  "/scrapbook/fundraiser-setup.jpg",
  "/scrapbook/fundraiser-band.jpg",
] as const;

function BlogThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-blog" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-blog__stack">
        {BLOG_POSTCARDS.map((src, i) => (
          <span
            key={src}
            className={`wii-thumb-blog__card wii-thumb-blog__card--${i === 0 ? "front" : "back"}`}
          >
            <img src={src} alt="" decoding="async" draggable={false} />
          </span>
        ))}
      </span>
    </span>
  );
}

function ResumeThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-resume" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-resume__doc">
        <span className="wii-thumb-resume__lines" aria-hidden />
      </span>
    </span>
  );
}

function AwardsThumb({ hovered }: { hovered: boolean }) {
  return (
    <span className="wii-thumb__art wii-thumb-awards" data-hot={hovered ? "true" : "false"}>
      <span className="wii-thumb-awards__medal">
        <MedalGlyph />
      </span>
    </span>
  );
}

function IconThumb({
  kind,
}: {
  kind: "mail" | "github" | "linkedin";
  accent?: string;
}) {
  return (
    <span className={`wii-thumb__art wii-thumb-icon wii-thumb-icon--${kind}`}>
      <span className="wii-thumb-icon__glyph" aria-hidden>
        {kind === "mail" ? <MailGlyph /> : null}
        {kind === "github" ? <GitHubGlyph /> : null}
        {kind === "linkedin" ? <LinkedInGlyph /> : null}
      </span>
    </span>
  );
}

function ComingSoonThumb() {
  return (
    <span className="wii-thumb__art wii-thumb-soon">
      <span className="wii-thumb-soon__glow" aria-hidden />
    </span>
  );
}

function MedalGlyph() {
  return (
    <svg viewBox="0 0 64 72" width="48" height="54" aria-hidden>
      <path d="M18 4h10l4 22H22L18 4zm28 0H36l-4 22h10l4-22z" fill="#c45a28" />
      <path d="M22 4h6l3 22h-9L22 4zm20 0h-6l-3 22h9l3-22z" fill="#e07a45" />
      <circle cx="32" cy="46" r="18" fill="#f0c14a" stroke="#fff" strokeWidth="3" />
      <circle cx="32" cy="46" r="12" fill="#d4a017" stroke="#fff8e0" strokeWidth="2" />
      <path
        d="M32 36.5l2.4 4.9 5.4.8-3.9 3.8.9 5.4L32 48.8l-4.8 2.6.9-5.4-3.9-3.8 5.4-.8z"
        fill="#fff8e0"
      />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 48 36" width="42" height="32">
      <rect x="2" y="4" width="44" height="28" rx="4" fill="#e8eef2" stroke="#fff" strokeWidth="2" />
      <path d="M4 8l20 14L44 8" fill="none" stroke="#fff" strokeWidth="2.4" />
    </svg>
  );
}

function GitHubGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="36" height="36" fill="#fff">
      <path d="M12 2C6.48 2 2 6.58 2 12.26c0 4.52 2.87 8.35 6.84 9.71.5.1.68-.22.68-.49 0-.24-.01-.87-.01-1.71-2.78.62-3.37-1.37-3.37-1.37-.46-1.2-1.12-1.52-1.12-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.85.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.08 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.32.1-2.75 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.84c.85 0 1.7.12 2.5.34 1.9-1.33 2.74-1.05 2.74-1.05.55 1.43.2 2.49.1 2.75.64.72 1.03 1.64 1.03 2.76 0 3.95-2.34 4.81-4.57 5.07.36.32.68.94.68 1.9 0 1.37-.01 2.47-.01 2.81 0 .27.18.6.69.49A10.03 10.03 0 0 0 22 12.26C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function LinkedInGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="34" height="34" fill="#fff">
      <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.73c0-1.84-.03-4.21-2.57-4.21-2.57 0-2.96 2-2.96 4.08V24H8.34V8.25z" />
    </svg>
  );
}
