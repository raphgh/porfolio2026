"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import Link from "next/link";
import { site } from "@/data/site";
import { isWiiSoundEnabled, setWiiSoundEnabled, wiiSound } from "@/lib/wiiSound";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function SettingsPanel({ open, onClose }: Props) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSoundOn(isWiiSoundEnabled());
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        wiiSound.back();
        onClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="wii-dialog-root" role="presentation">
          <m.button
            type="button"
            aria-label="Close settings"
            className="wii-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              wiiSound.back();
              onClose();
            }}
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="wii-dialog-panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
          >
            <h2 id={titleId} className="wii-dialog-title">
              Settings
            </h2>
            <ul className="wii-panel-list">
              <li>
                <Link href="/me" onClick={onClose}>
                  About me <span>→</span>
                </Link>
              </li>
              <li>
                <a href={site.resume} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                  Resume <span>→</span>
                </a>
              </li>
              <li>
                <a href={site.contact.github} target="_blank" rel="noopener noreferrer" onClick={onClose}>
                  GitHub <span>→</span>
                </a>
              </li>
              <li>
                <a
                  href={site.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                >
                  LinkedIn <span>→</span>
                </a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    const next = !soundOn;
                    setWiiSoundEnabled(next);
                    setSoundOn(next);
                    if (next) wiiSound.confirm();
                  }}
                >
                  Sound effects <span>{soundOn ? "On" : "Off"}</span>
                </button>
              </li>
            </ul>
            <div className="wii-dialog-actions" style={{ marginTop: "1rem" }}>
              <button
                ref={closeRef}
                type="button"
                className="wii-pill"
                onClick={() => {
                  wiiSound.back();
                  onClose();
                }}
              >
                Close
              </button>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
