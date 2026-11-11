"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { megaMenuColumns, type MegaMenuItem } from "@/data/megaMenu";
import { site } from "@/data/site";
import { ResumeLink } from "./ResumeLink";

/**
 * Sticky header with mega menu that expands down from the bar itself
 * (not a floating panel).
 */
export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [active, setActive] = useState<MegaMenuItem | null>(null);
  const [hash, setHash] = useState("");
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuId = useId();
  const columns = megaMenuColumns();

  useEffect(() => {
    setMounted(true);
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) {
      setActive(null);
      return;
    }

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
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

  const isSectionActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const backdrop =
    open && mounted
      ? createPortal(
          <button
            type="button"
            aria-label="Close menu"
            className="fixed inset-x-0 bottom-0 z-[35] top-14 bg-charcoal/15 animate-overlay-in md:top-16"
            onClick={() => setOpen(false)}
          />,
          document.body,
        )
      : null;

  return (
    <header className="sticky top-0 z-40">
      <div
        className={`bg-white/95 supports-[backdrop-filter]:bg-white/90 supports-[backdrop-filter]:backdrop-blur-md ${
          open
            ? "border-b border-silver-soft"
            : "border-b border-transparent transition-[border-color,box-shadow] duration-300 hover:border-silver-soft hover:shadow-[0_8px_24px_-20px_rgb(30_58_110/0.35)]"
        }`}
      >
        <nav aria-label="Primary" className="shell flex h-14 items-center justify-between gap-4 md:h-16">
          <Link
            href="/"
            className="group flex shrink-0 items-center gap-2.5"
            aria-label={`${site.name} — home`}
          >
            <span
              aria-hidden
              className="size-8 shrink-0 overflow-hidden transition-transform duration-300 ease-(--ease-out-soft) group-hover:-rotate-6"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/me.jpg" alt="" className="size-full object-cover" />
            </span>
            <span className="display text-[1.15rem] leading-none text-navy max-[380px]:sr-only">
              {site.name.toLowerCase()}
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <ResumeLink plain />
            <button
              ref={toggleRef}
              type="button"
              aria-expanded={open}
              aria-controls={open ? menuId : undefined}
              onClick={() => setOpen((v) => !v)}
              className="flex h-9 items-center gap-2 rounded-full border border-navy/40 bg-white px-3.5 text-sm text-navy transition-colors hover:border-[#d4a017] hover:text-[#d4a017]"
            >
              <span className="max-sm:sr-only">Menu</span>
              <span aria-hidden className="relative block h-2.5 w-4">
                {open ? (
                  <>
                    <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 rotate-45 bg-current" />
                    <span className="absolute top-1/2 left-0 h-[1.5px] w-full -translate-y-1/2 -rotate-45 bg-current" />
                  </>
                ) : (
                  <>
                    <span className="absolute top-0 left-0 h-[1.5px] w-full bg-current" />
                    <span className="absolute bottom-0 left-0 h-[1.5px] w-full bg-current" />
                  </>
                )}
              </span>
            </button>
          </div>
        </nav>

        {open && (
          <div
            id={menuId}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="border-t border-silver-soft animate-overlay-in"
          >
            <div className="max-h-[min(70dvh,36rem)] overflow-y-auto">
              <div className="shell grid grid-cols-1 gap-0 px-0 sm:grid-cols-2 lg:grid-cols-4">
                {columns.map((column, colIndex) => (
                  <section
                    key={column.href}
                    className={`flex flex-col gap-3 px-4 py-5 md:px-8 md:py-6 ${
                      colIndex > 0 ? "border-t border-silver-soft sm:border-l sm:border-t-0" : ""
                    }`}
                  >
                    <h2>
                      <Link
                        ref={colIndex === 0 ? firstLinkRef : undefined}
                        href={column.href}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() =>
                          setActive({
                            label: column.label,
                            href: column.href,
                            description: column.description,
                          })
                        }
                        className={`text-[0.95rem] font-semibold tracking-[-0.02em] text-charcoal transition-colors hover:text-navy ${
                          isSectionActive(column.href) ? "text-navy" : ""
                        }`}
                      >
                        {column.label}
                      </Link>
                    </h2>

                    <ul className="flex flex-col gap-0.5">
                      {column.items.map((item) => {
                        const current = `${pathname}${hash}`;
                        const on = active?.href === item.href || current === item.href;
                        const className = `rounded-lg px-2.5 py-2 text-left text-[0.92rem] leading-snug transition-colors ${
                          on
                            ? "bg-[#f5e6b8] text-[#a87b0a]"
                            : "text-charcoal-soft hover:bg-[#f5e6b8] hover:text-[#d4a017]"
                        }`;

                        return (
                          <li key={`${column.href}-${item.label}-${item.href}`}>
                            {item.external ? (
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setActive(item)}
                                onFocus={() => setActive(item)}
                                className={`block ${className}`}
                              >
                                {item.label}
                                <span className="sr-only"> (opens in a new tab)</span>
                              </a>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() => setOpen(false)}
                                onMouseEnter={() => setActive(item)}
                                onFocus={() => setActive(item)}
                                className={`block ${className}`}
                              >
                                {item.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {backdrop}
    </header>
  );
}
