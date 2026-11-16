"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { site } from "@/data/site";
import { wiiSound } from "@/lib/wiiSound";

type Props = {
  open: boolean;
  onClose: () => void;
  onRead: () => void;
};

export function MessageBoard({ open, onClose, onRead }: Props) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) return;
    onRead();
    setSent(false);
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
  }, [open, onClose, onRead]);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Portfolio message from ${name || "someone"}`);
    const body = encodeURIComponent(message);
    wiiSound.confirm();
    setSent(true);
    window.location.href = `mailto:${site.contact.email}?subject=${subject}&body=${body}`;
  };

  return (
    <AnimatePresence>
      {open ? (
        <div className="wii-dialog-root" role="presentation">
          <m.button
            type="button"
            aria-label="Close message board"
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
            style={{ width: "min(100%, 30rem)" }}
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 360, damping: 26 }}
          >
            <h2 id={titleId} className="wii-dialog-title">
              Message Board
            </h2>
            <p style={{ margin: "0 0 0.75rem", textAlign: "center", fontWeight: 700, color: "#6a7580" }}>
              {site.contact.email}
            </p>
            <ul className="wii-panel-list">
              <li>
                <a href={site.contact.github} target="_blank" rel="noopener noreferrer">
                  GitHub <span>→</span>
                </a>
              </li>
              <li>
                <a href={site.contact.linkedin} target="_blank" rel="noopener noreferrer">
                  LinkedIn <span>→</span>
                </a>
              </li>
            </ul>
            <form className="wii-message-form" onSubmit={onSubmit}>
              <label htmlFor="wii-msg-name">Your name</label>
              <input id="wii-msg-name" name="name" autoComplete="name" />
              <label htmlFor="wii-msg-body">Send me a message</label>
              <textarea id="wii-msg-body" name="message" rows={4} required />
              <div className="wii-dialog-actions">
                <button type="submit" className="wii-pill wii-pill--primary">
                  {sent ? "Opening mail…" : "Send"}
                </button>
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
            </form>
          </m.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
