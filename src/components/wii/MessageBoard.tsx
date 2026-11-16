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

type Status = "idle" | "sending" | "sent" | "error";

/** Sends a real email to your inbox via `/api/contact` (Resend). */
export function MessageBoard({ open, onClose, onRead }: Props) {
  const reduce = useReducedMotion();
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    onRead();
    setStatus("idle");
    setError(null);
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

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const website = String(data.get("website") ?? "");
    if (!message || status === "sending") return;

    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message, website }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        throw new Error(json.error || "Could not send email.");
      }
      wiiSound.confirm();
      setStatus("sent");
      form.reset();
    } catch (err) {
      wiiSound.back();
      setStatus("error");
      setError(err instanceof Error ? err.message : "Could not send email.");
    }
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
            <p
              style={{
                margin: "0 0 0.85rem",
                textAlign: "center",
                fontSize: "0.75rem",
                fontWeight: 600,
                color: "#8a95a0",
              }}
            >
              Messages go to {site.contact.email}
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
              {/* Honeypot — leave empty */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                style={{ position: "absolute", left: "-9999px", opacity: 0, height: 0, width: 0 }}
              />
              <label htmlFor="wii-msg-name">Your name</label>
              <input id="wii-msg-name" name="name" autoComplete="name" disabled={status === "sending"} />
              <label htmlFor="wii-msg-body">Message</label>
              <textarea
                id="wii-msg-body"
                name="message"
                rows={4}
                required
                disabled={status === "sending"}
              />
              {error ? (
                <p role="alert" style={{ margin: 0, color: "#b42318", fontSize: "0.82rem", fontWeight: 700 }}>
                  {error}
                </p>
              ) : null}
              {status === "sent" ? (
                <p style={{ margin: 0, color: "#1a8fc0", fontSize: "0.82rem", fontWeight: 700 }}>
                  Sent — check your inbox.
                </p>
              ) : null}
              <div className="wii-dialog-actions">
                <button
                  type="submit"
                  className="wii-pill wii-pill--primary"
                  disabled={status === "sending"}
                >
                  {status === "sending" ? "Sending…" : status === "sent" ? "Send another" : "Send"}
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
