"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import type { WiiChannel } from "@/data/wiiChannels";
import { wiiSound } from "@/lib/wiiSound";

type Props = {
  channel: WiiChannel | null;
  onConfirm: (channel: WiiChannel) => void;
  onCancel: () => void;
};

export function ChannelDialog({ channel, onConfirm, onCancel }: Props) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const startRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!channel) return;
    startRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        wiiSound.back();
        onCancel();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [channel, onCancel]);

  return (
    <AnimatePresence>
      {channel ? (
        <div className="wii-dialog-root" role="presentation">
          <m.button
            type="button"
            aria-label="Close dialog"
            className="wii-dialog-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              wiiSound.back();
              onCancel();
            }}
          />
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="wii-dialog-panel"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.86 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 26 }}
          >
            <h2 id={titleId} className="wii-dialog-title">
              Start {channel.label}?
            </h2>
            <div className="wii-dialog-actions">
              <button
                ref={startRef}
                type="button"
                className="wii-pill wii-pill--primary"
                onClick={() => {
                  wiiSound.confirm();
                  onConfirm(channel);
                }}
              >
                Start
              </button>
              <button
                type="button"
                className="wii-pill"
                onClick={() => {
                  wiiSound.back();
                  onCancel();
                }}
              >
                Cancel
              </button>
            </div>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
