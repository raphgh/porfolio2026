"use client";

import { AnimatePresence, m } from "motion/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/data/site";
import { StickerArt, stickers } from "./stickers";

/**
 * Scroll-triggered sticker hunt. Each sticker hides on one page and peeks in
 * from a screen edge once you've scrolled a bit there (or after a few seconds
 * on pages too short to scroll). Click it to keep it. Progress persists in
 * localStorage, so the hunt spans the whole site.
 */
const KEY = "rg-sticker-hunt";
const SCROLL_TO_REVEAL = 500;
const SHORT_PAGE_DELAY_MS = 4000;
const VISIBLE_MS = 9000;

const listeners = new Set<() => void>();
const read = () => {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
};
const write = (ids: string[]) => {
  try {
    localStorage.setItem(KEY, ids.join(","));
  } catch {}
  listeners.forEach((l) => l());
};
const subscribe = (l: () => void) => {
  listeners.add(l);
  window.addEventListener("storage", l);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", l);
  };
};

type Popup = { id: string; page: string; side: "left" | "right"; top: number };

export function StickerHunt() {
  const pathname = usePathname();
  const raw = useSyncExternalStore(subscribe, read, () => "");
  const found = useMemo(() => raw.split(",").filter((id) => stickers.some((s) => s.id === id)), [raw]);
  const [popup, setPopup] = useState<Popup | null>(null);
  const [open, setOpen] = useState(false);
  const foundRef = useRef(found);
  const popupRef = useRef(popup);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    foundRef.current = found;
    popupRef.current = popup;
  });

  useEffect(() => {
    const hidden = stickers.find((s) => s.page === pathname);
    if (!hidden) return;
    let lastY = window.scrollY;
    let travelled = 0;
    const scrollable = () => document.documentElement.scrollHeight - window.innerHeight;
    const reveal = () => {
      if (foundRef.current.includes(hidden.id) || popupRef.current?.page === pathname) return;
      travelled = 0;
      setPopup({
        id: hidden.id,
        page: pathname,
        side: Math.random() > 0.5 ? "right" : "left",
        top: 22 + Math.random() * 46,
      });
    };
    const onScroll = () => {
      travelled += Math.abs(window.scrollY - lastY);
      lastY = window.scrollY;
      if (travelled >= Math.min(SCROLL_TO_REVEAL, scrollable() * 0.4)) reveal();
    };
    const timer = scrollable() < 200 ? setTimeout(reveal, SHORT_PAGE_DELAY_MS) : undefined;
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!popup) return;
    const t = setTimeout(() => setPopup(null), VISIBLE_MS);
    return () => clearTimeout(t);
  }, [popup]);

  useEffect(() => {
    const d = dialogRef.current;
    if (open && d && !d.open) d.showModal();
    if (!open && d?.open) d.close();
  }, [open]);

  const collect = (id: string) => {
    const next = [...new Set([...found, id])];
    write(next);
    setPopup(null);
    if (next.length === stickers.length) setOpen(true);
  };

  const sticker = popup?.page === pathname ? stickers.find((s) => s.id === popup.id) : undefined;
  const complete = found.length === stickers.length;
  const links = [
    { label: "LinkedIn", href: site.contact.linkedin },
    site.contact.github && { label: "GitHub", href: site.contact.github },
    site.contact.email && { label: "Email", href: `mailto:${site.contact.email}` },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <>
      <AnimatePresence>
        {popup && sticker && (
          <m.button
            key={popup.id}
            type="button"
            aria-label="You found a hidden sticker — collect it"
            onClick={() => collect(popup.id)}
            initial={{ scale: 0, rotate: popup.side === "right" ? 50 : -50, x: popup.side === "right" ? 60 : -60 }}
            animate={{ scale: 1, rotate: popup.side === "right" ? -12 : 12, x: 0 }}
            exit={{ scale: 0, rotate: 0, opacity: 0 }}
            whileHover={{ scale: 1.12, rotate: 0 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 380, damping: 16 }}
            style={{ top: `${popup.top}%` }}
            className={`fixed z-50 size-16 cursor-pointer md:size-20 ${popup.side === "right" ? "right-3 md:right-6" : "left-3 md:left-6"}`}
          >
            <StickerArt sticker={sticker} className="size-full" />
          </m.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {found.length > 0 && (
          <m.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center"
          >
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={`Sticker collection: ${found.length} of ${stickers.length} found`}
              className="pointer-events-auto flex h-10 items-center gap-2.5 rounded-full border border-rule bg-card/95 pr-1.5 pl-4 text-sm text-ink-soft shadow-[0_8px_24px_-12px_rgb(0_0_0/0.4)] backdrop-blur transition-transform hover:-translate-y-0.5"
            >
              <span aria-live="polite">
                {found.length} of {stickers.length}
              </span>
              <span className="flex -space-x-2">
                {stickers
                  .filter((s) => found.includes(s.id))
                  .map((s) => (
                    <m.span key={s.id} initial={{ scale: 0 }} animate={{ scale: 1 }} className="block size-7">
                      <StickerArt sticker={s} className="size-full" />
                    </m.span>
                  ))}
              </span>
            </button>
          </m.div>
        )}
      </AnimatePresence>

      <dialog
        ref={dialogRef}
        onClose={() => setOpen(false)}
        onClick={(e) => e.target === e.currentTarget && setOpen(false)}
        aria-labelledby="sticker-hunt-title"
        className="m-auto w-[min(40rem,calc(100%-2rem))] overflow-visible bg-transparent p-0 backdrop:bg-ink/40 backdrop:backdrop-blur-sm"
      >
        <div className="relative pb-7">
          <div aria-hidden className="absolute inset-x-[5%] bottom-3 h-10 rounded-b-xl bg-paper-deep" />
          <div aria-hidden className="absolute inset-x-[10%] bottom-0 h-10 rounded-b-xl bg-berry-soft" />
          <div className="relative rounded-xl bg-berry px-6 py-10 text-center text-card md:px-12 md:py-12">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-3 right-3 grid size-9 place-items-center rounded-full text-berry-soft transition-colors hover:bg-card/10 hover:text-card"
            >
              ✕
            </button>
            <h2 id="sticker-hunt-title" className="text-xl font-semibold tracking-tight md:text-2xl">
              {complete ? "Thanks for stopping by!" : "You found a secret!"}
            </h2>
            <p className="mt-1 text-berry-soft">
              {complete ? "Here’s a sticker :)" : `${found.length} of ${stickers.length} — the rest are hiding on other pages.`}
            </p>

            <ul className="mx-auto mt-9 grid w-fit grid-cols-3 gap-5 md:gap-7">
              {stickers.map((s) => (
                <li key={s.id} className="size-16 md:size-20">
                  {found.includes(s.id) ? (
                    <StickerArt sticker={s} className="size-full" />
                  ) : (
                    <span className="block size-full rounded-full border-2 border-dashed border-card/35" />
                  )}
                  <span className="sr-only">{found.includes(s.id) ? s.name : "Not found yet"}</span>
                </li>
              ))}
            </ul>

            <p className="mt-10 flex flex-wrap justify-center gap-x-3 gap-y-1 text-sm text-berry-soft">
              {links.map((l, i) => (
                <span key={l.label} className="flex items-center gap-3">
                  {i > 0 && (
                    <span aria-hidden className="text-card/30">
                      |
                    </span>
                  )}
                  {l.href ? (
                    <a
                      href={l.href}
                      {...(!l.href.startsWith("mailto:") && { target: "_blank", rel: "noopener noreferrer" })}
                      className="transition-colors hover:text-card"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <span>{l.label}</span>
                  )}
                </span>
              ))}
            </p>
            {complete && (
              <button
                type="button"
                onClick={() => {
                  write([]);
                  setOpen(false);
                }}
                className="mt-6 text-xs text-card/50 underline-offset-4 hover:text-card hover:underline"
              >
                Hide them again
              </button>
            )}
          </div>
        </div>
      </dialog>
    </>
  );
}
