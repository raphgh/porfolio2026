"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav } from "@/data/site";

/** Compact overflow menu for non-home pages. */
export function SiteMenu() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    document.documentElement.style.overflow = "hidden";
    firstLinkRef.current?.focus();
    const toggle = toggleRef.current;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      toggle?.focus({ preventScroll: true });
    };
  }, [open]);

  if (isHome) return null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setOpen((v) => !v)}
        className="flex h-9 items-center gap-2 rounded-full border border-navy/40 bg-white px-3.5 text-sm text-navy transition-colors hover:border-navy hover:bg-navy-tint"
      >
        <span className="max-sm:sr-only">{open ? "Close" : "Menu"}</span>
        <span aria-hidden className="relative block h-2.5 w-4">
          <span
            className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
              open ? "top-1/2 rotate-45" : "top-0"
            }`}
          />
          <span
            className={`absolute left-0 h-[1.5px] w-full bg-current transition-transform duration-300 ${
              open ? "top-1/2 -rotate-45" : "bottom-0"
            }`}
          />
        </span>
      </button>

      <div
        id="site-menu"
        hidden={!open}
        className="fixed inset-x-0 top-14 bottom-0 z-40 overflow-y-auto bg-white md:top-16"
      >
        <ul className="shell flex flex-col pt-6 pb-10">
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
      </div>
    </>
  );
}
