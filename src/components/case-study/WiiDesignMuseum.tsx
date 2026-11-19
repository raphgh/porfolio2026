"use client";

import { useEffect, useState } from "react";
import { m, useReducedMotion } from "motion/react";
import { unlockWiiSound, wiiSound } from "@/lib/wiiSound";

const classicPalette = [
  { name: "Menu mist", hex: "#eef0f3" },
  { name: "Tile border", hex: "#c9ced6" },
  { name: "Wii blue", hex: "#3fa9e0" },
  { name: "Blue deep", hex: "#1a8fc0" },
  { name: "Soft ink", hex: "#5a6570" },
];

const modernPalette = [
  { name: "Mustard", hex: "#d4a017" },
  { name: "Coral", hex: "#f07a45" },
  { name: "Rose", hex: "#e85a8a" },
  { name: "Navy", hex: "#1e3a6e" },
];

const sounds = [
  { id: "hover", label: "Hover", play: () => wiiSound.hover() },
  { id: "confirm", label: "Confirm", play: () => wiiSound.confirm() },
  { id: "back", label: "Back", play: () => wiiSound.back() },
  { id: "page", label: "Page", play: () => wiiSound.page() },
  { id: "ding", label: "Ding", play: () => wiiSound.ding() },
] as const;

/**
 * Live specimens for Classic + Modern — no captions, just the parts.
 */
export function WiiDesignMuseum() {
  const reduce = useReducedMotion();
  const [fist, setFist] = useState(false);
  const [tileHot, setTileHot] = useState(false);
  const [pressed, setPressed] = useState<"info" | "mail" | null>(null);
  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [motionOn, setMotionOn] = useState(true);

  useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => setFist((v) => !v), 1600);
    return () => window.clearInterval(id);
  }, [reduce]);

  useEffect(() => {
    if (reduce || !motionOn) {
      setTileHot(false);
      return;
    }
    const id = window.setInterval(() => setTileHot((v) => !v), 2200);
    return () => window.clearInterval(id);
  }, [reduce, motionOn]);

  const play = async (id: string, fn: () => void) => {
    await unlockWiiSound();
    fn();
    setActiveSound(id);
    window.setTimeout(() => setActiveSound((cur) => (cur === id ? null : cur)), 420);
  };

  return (
    <section className="wii-museum" aria-label="Design details">
      <figure className="wii-museum__artifact">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/projects/this-website/wii-menu-reference.png"
          alt="Classic System Menu channel grid with pointing-hand cursor and dock"
          className="wii-museum__artifact-img"
        />
      </figure>

      <div className="wii-museum__group">
        <p className="wii-museum__group-label">classic</p>
        <ul className="wii-museum__grid">
          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--pointer">
              <m.div
                className="wii-museum__pointer"
                animate={
                  reduce
                    ? undefined
                    : {
                        y: [0, -3, 0, 2, 0],
                        rotate: [0, -2, 0, 1.5, 0],
                      }
                }
                transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={fist ? "/wii/cursor-fist.png" : "/wii/cursor-pointer.png"}
                  alt=""
                  draggable={false}
                />
              </m.div>
              <span className="wii-museum__pointer-label" aria-hidden>
                {fist ? "Press" : "Point"}
              </span>
            </div>
            <p className="wii-museum__label">pointer</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--orbs">
              <button
                type="button"
                className={`wii-orb wii-orb--info${pressed === "info" ? " is-demo-press" : ""}`}
                aria-label="Demo info button"
                onPointerDown={() => {
                  setPressed("info");
                  void play("orb-info", () => wiiSound.confirm());
                }}
                onPointerUp={() => setPressed(null)}
                onPointerLeave={() => setPressed(null)}
              >
                <InfoGlyph />
              </button>
              <button
                type="button"
                className={`wii-orb wii-orb--mail${pressed === "mail" ? " is-demo-press" : ""}`}
                aria-label="Demo mail button"
                onPointerDown={() => {
                  setPressed("mail");
                  void play("orb-mail", () => wiiSound.ding());
                }}
                onPointerUp={() => setPressed(null)}
                onPointerLeave={() => setPressed(null)}
              >
                <MailGlyph />
              </button>
            </div>
            <p className="wii-museum__label">buttons</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--colour">
              {classicPalette.map((swatch) => (
                <div key={swatch.hex} className="wii-museum__swatch">
                  <span style={{ background: swatch.hex }} />
                  <em>{swatch.name}</em>
                  <code>{swatch.hex}</code>
                </div>
              ))}
            </div>
            <p className="wii-museum__label">colour</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--tile">
              <m.button
                type="button"
                className={`wii-museum__tile${tileHot ? " is-hot" : ""}`}
                aria-label="Channel tile"
                onHoverStart={() => {
                  setMotionOn(false);
                  setTileHot(true);
                  wiiSound.hover();
                }}
                onHoverEnd={() => {
                  setTileHot(false);
                  setMotionOn(true);
                }}
                onFocus={() => {
                  setMotionOn(false);
                  setTileHot(true);
                }}
                onBlur={() => {
                  setTileHot(false);
                  setMotionOn(true);
                }}
                animate={reduce ? undefined : { scale: tileHot ? 1.07 : 1 }}
                transition={{ type: "spring", stiffness: 420, damping: 24 }}
              >
                <span className="wii-museum__tile-face">
                  <span className="wii-museum__tile-disc" aria-hidden />
                  <span className="wii-museum__tile-shine" aria-hidden />
                </span>
                <span className={`wii-museum__tile-tip${tileHot ? " is-on" : ""}`} aria-hidden>
                  Disc Channel
                </span>
              </m.button>
            </div>
            <p className="wii-museum__label">channels</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--motion" aria-hidden>
              <div className="wii-museum__motion-stage">
                <m.span
                  className="wii-museum__motion-orb"
                  animate={
                    reduce
                      ? undefined
                      : {
                          scale: [1, 1.08, 1],
                          boxShadow: [
                            "0 0 0 3px rgb(63 169 224 / 0.45)",
                            "0 0 0 5px rgb(63 169 224 / 0.8), 0 0 22px rgb(63 169 224 / 0.45)",
                            "0 0 0 3px rgb(63 169 224 / 0.45)",
                          ],
                        }
                  }
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <m.span
                  className="wii-museum__motion-bar"
                  animate={reduce ? undefined : { scaleX: [0.35, 1, 0.35] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                />
                <m.span
                  className="wii-museum__motion-tip"
                  animate={reduce ? undefined : { opacity: [0.2, 1, 0.2], y: [6, 0, 6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  hover
                </m.span>
              </div>
            </div>
            <p className="wii-museum__label">motion</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--sound">
              {sounds.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  className={`wii-museum__sound-btn${activeSound === s.id ? " is-live" : ""}`}
                  onClick={() => void play(s.id, s.play)}
                >
                  <span className="wii-museum__sound-wave" aria-hidden>
                    <i />
                    <i />
                    <i />
                  </span>
                  {s.label}
                </button>
              ))}
            </div>
            <p className="wii-museum__label">sound</p>
          </li>
        </ul>
      </div>

      <div className="wii-museum__group">
        <p className="wii-museum__group-label">modern</p>
        <ul className="wii-museum__grid">
          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--modern wii-museum__glass--colour">
              {modernPalette.map((swatch) => (
                <div key={swatch.hex} className="wii-museum__swatch">
                  <span style={{ background: swatch.hex }} />
                  <em>{swatch.name}</em>
                  <code>{swatch.hex}</code>
                </div>
              ))}
            </div>
            <p className="wii-museum__label">colour</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--modern wii-museum__glass--trail" aria-hidden>
              <svg className="wii-museum__trail" viewBox="0 0 220 90" fill="none">
                <defs>
                  <linearGradient id="museum-trail" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#e6b422" />
                    <stop offset="35%" stopColor="#f07a45" />
                    <stop offset="70%" stopColor="#e85a8a" />
                    <stop offset="100%" stopColor="#d94f5c" />
                  </linearGradient>
                </defs>
                <path
                  className="wii-museum__trail-shadow"
                  d="M12 62 C 48 18, 72 78, 110 40 S 168 12, 208 48"
                />
                <path
                  className="wii-museum__trail-strand"
                  d="M12 62 C 48 18, 72 78, 110 40 S 168 12, 208 48"
                />
                <path
                  className="wii-museum__trail-stitch"
                  d="M12 62 C 48 18, 72 78, 110 40 S 168 12, 208 48"
                />
                <circle className="wii-museum__trail-knot" cx="48" cy="38" r="2.2" fill="#e6b422" />
                <circle className="wii-museum__trail-knot" cx="110" cy="40" r="2.2" fill="#f07a45" />
                <circle className="wii-museum__trail-knot" cx="168" cy="28" r="2.2" fill="#e85a8a" />
              </svg>
            </div>
            <p className="wii-museum__label">trail</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--modern wii-museum__glass--type">
              <p className="wii-museum__type-display">
                work <span>→</span>
              </p>
              <p className="wii-museum__type-label">project file</p>
              <div className="wii-museum__type-tags">
                <span>UI/UX</span>
                <span>PRODUCT</span>
              </div>
            </div>
            <p className="wii-museum__label">type</p>
          </li>

          <li className="wii-museum__case">
            <div className="wii-museum__glass wii-museum__glass--modern wii-museum__glass--toggle">
              <div className="wii-museum__toggle" aria-hidden>
                <span>Classic</span>
                <span className="is-on">Modern</span>
              </div>
            </div>
            <p className="wii-museum__label">toggle</p>
          </li>
        </ul>
      </div>
    </section>
  );
}

function InfoGlyph() {
  return (
    <svg className="wii-orb__info-svg" viewBox="0 0 64 64" aria-hidden>
      <circle cx="32" cy="18" r="5.5" fill="currentColor" />
      <rect x="27" y="28" width="10" height="24" rx="5" fill="currentColor" />
    </svg>
  );
}

function MailGlyph() {
  return (
    <svg viewBox="0 0 48 36" aria-hidden>
      <rect
        x="2"
        y="2"
        width="44"
        height="32"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
      />
      <path
        d="M4 6 L24 22 L44 6"
        fill="none"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
