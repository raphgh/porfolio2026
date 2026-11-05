"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { nav } from "@/data/site";

/** Compact overflow menu for non-home pages. Portaled to body so sticky/blur headers don't trap it. */
export function SiteMenu() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const scrollY = window.scrollY;
    const { body, documentElement } = document;
    const prev = {
      bodyOverflow: body.style.overflow,
      htmlOverflow: documentElement.style.overflow,
      bodyPosition: body.style.position,
      bodyTop: body.style.top,
      bodyWidth: body.style.width,
    };

    body.style.overflow = "hidden";
    documentElement.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    firstLinkRef.current?.focus();
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);

    return () => {
      body.style.overflow = prev.bodyOverflow;
      documentElement.style.overflow = prev.htmlOverflow;
      body.style.position = prev.bodyPosition;
      body.style.top = prev.bodyTop;
      body.style.width = prev.bodyWidth;
      window.scrollTo(0, scrollY);
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  if (isHome) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  const panel =
    open && mounted
      ? createPortal(
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[90] flex flex-col bg-white animate-overlay-in"
          >
            <div className="shell flex h-14 shrink-0 items-center justify-end md:h-16">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 items-center gap-2 rounded-full border border-navy/40 bg-white px-3.5 text-sm text-navy transition-colors hover:border-navy hover:bg-navy-tint"
              >
                <span>Close</span>
                <span aria-hidden className="relative block h-2.5 w-4">
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-current" />
                  <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-current" />
                </span>
              </button>
            </div>

            <ul className="shell flex flex-1 flex-col overflow-y-auto pt-2 pb-10">
              <li className="border-b border-silver-soft">
                <Link
                  ref={firstLinkRef}
                  href="/"
                  onClick={() => setOpen(false)}
                  className="display flex items-center justify-between py-4 text-[2rem] leading-none text-navy lowercase"
                >
                  home
                  <span aria-hidden className="font-mono text-sm text-charcoal-muted">
                    00
                  </span>
                </Link>
              </li>
              {nav.map((item, i) => (
                <li key={item.href} className="border-b border-silver-soft">
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    onClick={() => setOpen(false)}
                    className="display flex items-center justify-between py-4 text-[2rem] leading-none text-navy lowercase aria-[current=page]:text-mustard-deep"
                  >
                    {item.label.toLowerCase()}
                    <span aria-hidden className="font-mono text-sm text-charcoal-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 rounded-full border border-navy/40 bg-white px-3.5 text-sm text-navy transition-colors hover:border-navy hover:bg-navy-tint"
      >
        <span className="max-sm:sr-only">Menu</span>
        <span aria-hidden className="relative block h-2.5 w-4">
          <span className="absolute top-0 left-0 h-[1.5px] w-full bg-current" />
          <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current" />
        </span>
      </button>
      {panel}
    </>
  );
}
